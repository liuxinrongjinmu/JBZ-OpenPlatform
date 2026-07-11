/**
 * 全文检索引擎 — 基于 TF-IDF 的文档搜索
 *
 * 启动时扫描所有 .md 文件，按章节分块，构建倒排索引。
 * 查询时通过 TF-IDF 余弦相似度排序，返回 Top-K 相关片段。
 *
 * Tokenization: 中文 → 字符二元组, 英文 → 单词分割, 数字/符号 → 保留原样
 */

import fs from 'node:fs'
import path from 'node:path'

// ─── 工具函数 ────────────────────────────────────────────

/** 读取文件前 N 行获取标题和首段摘要 */
function extractTitle(content) {
  const m = content.match(/^#\s+(.+)/m)
  return m ? m[1].trim() : 'Untitled'
}

/** 去除 Markdown 语法，保留纯文本 */
function stripMarkdown(text) {
  return text
    .replace(/```[\s\S]*?```/g, ' ')     // 代码块
    .replace(/`[^`]+`/g, ' ')             // 行内代码
    .replace(/!\[.*?\]\(.*?\)/g, ' ')     // 图片
    .replace(/\[([^\]]*)\]\(.*?\)/g, '$1')// 链接文本
    .replace(/^#{1,6}\s+/gm, ' ')        // 标题
    .replace(/\*\*([^*]+)\*\*/g, '$1')    // 加粗
    .replace(/\*([^*]+)\*/g, '$1')        // 斜体
    .replace(/~~([^~]+)~~/g, '$1')       // 删除线
    .replace(/\|/g, ' ')                  // 表格分隔符
    .replace(/^[-*+]\s/gm, ' ')           // 列表标记
    .replace(/\n+/g, ' ')                 // 换行
    .replace(/\s{2,}/g, ' ')              // 多余空格
    .trim()
}

/** 中文二元组分词 + 英文单词分割 */
function tokenize(text) {
  const tokens = []
  const cleaned = stripMarkdown(text).toLowerCase()

  // 分割英文单词和中文片段
  const segments = cleaned.split(/([a-z0-9]+)/i)

  for (const seg of segments) {
    if (!seg) continue
    if (/^[a-z0-9]+$/i.test(seg)) {
      // 英文单词或数字
      if (seg.length >= 2) tokens.push(seg)
    } else {
      // 中文: 二元组
      const chars = seg.replace(/\s+/g, '')
      for (let i = 0; i < chars.length - 1; i++) {
        tokens.push(chars[i] + chars[i + 1])
      }
      // 也保留单字符（停用词会影响精度但提升召回）
    }
  }
  return tokens
}

/** 计算向量点积 (TF-IDF × TF-IDF) */
function dotProduct(queryVec, chunkVec) {
  let dot = 0
  for (const [term, qWeight] of queryVec) {
    dot += qWeight * (chunkVec.get(term) || 0)
  }
  return dot
}

/** 向量 L2 范数 */
function norm(vec) {
  let sum = 0
  for (const [, w] of vec) sum += w * w
  return Math.sqrt(sum)
}

// ─── 主类 ────────────────────────────────────────────

class SearchService {
  constructor() {
    /** @type {Array<{id:number, docPath:string, title:string, heading:string, content:string, tokens:Map<string,number>}>} */
    this.chunks = []
    /** @type {Map<string, number>} term → number of docs containing it */
    this.docFreq = new Map()
    this.totalDocs = 0
    this._built = false
  }

  /**
   * 构建索引（应在服务启动时调用一次）
   * @param {string} docsDir - docs/ 根目录路径
   */
  buildIndex(docsDir) {
    const dirs = [
      { dir: path.join(docsDir, 'merchant'), prefix: '/merchant' },
      { dir: path.join(docsDir, 'supplier'), prefix: '/supplier' },
    ]

    const chunkIdCounter = { val: 0 }
    const docTokenSets = new Map() // docPath → Set<string> (用于 IDF)

    for (const { dir, prefix } of dirs) {
      if (!fs.existsSync(dir)) continue

      const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') && f !== 'index.md')
      for (const file of files) {
        const filePath = path.join(dir, file)
        const content = fs.readFileSync(filePath, 'utf-8')
        const title = extractTitle(content)
        const docPath = `${prefix}/${file.replace('.md', '')}`

        // 按 H2/H3 标题分块
        const sections = this._splitSections(content)
        if (sections.length === 0) {
          sections.push({ heading: '', text: content })
        }

        // 该文档的全量 token 集合（用于 IDF 去重）
        if (!docTokenSets.has(docPath)) docTokenSets.set(docPath, new Set())

        for (const { heading, text } of sections) {
          const tokens = tokenize(text)
          if (tokens.length === 0) continue

          const tf = new Map()
          for (const t of tokens) {
            tf.set(t, (tf.get(t) || 0) + 1)
            docTokenSets.get(docPath).add(t)
          }

          // 归一化 TF (除以最大词频)
          let maxFreq = 0
          for (const f of tf.values()) maxFreq = Math.max(maxFreq, f)
          for (const [t, f] of tf) tf.set(t, f / maxFreq)

          this.chunks.push({
            id: chunkIdCounter.val++,
            docPath,
            title,
            heading: heading || title,
            content: text.slice(0, 500), // 保留前500字符用于 snippet
            tokens: tf,
          })
        }
      }
    }

    // 计算 IDF: log(totalDocs / df)
    this.totalDocs = docTokenSets.size
    for (const [, tokenSet] of docTokenSets) {
      for (const t of tokenSet) {
        this.docFreq.set(t, (this.docFreq.get(t) || 0) + 1)
      }
    }

    this._built = true
  }

  /**
   * 按 H2/H3 标题分割文档
   */
  _splitSections(content) {
    const sections = []
    const lines = content.split('\n')
    let currentHeading = ''
    let currentText = []
    let inCodeBlock = false

    for (const line of lines) {
      // 跳过代码块内的内容
      if (line.trim().startsWith('```')) {
        inCodeBlock = !inCodeBlock
        continue
      }
      if (inCodeBlock) continue

      // 检测标题
      const headingMatch = line.match(/^#{2,3}\s+(.+)/)
      if (headingMatch) {
        // 保存上一个 section
        if (currentText.length > 0) {
          sections.push({ heading: currentHeading, text: currentText.join('\n') })
        }
        currentHeading = headingMatch[1].trim()
        currentText = []
        continue
      }

      // 跳过空行、分割线、表格行
      const trimmed = line.trim()
      if (
        !trimmed ||
        trimmed === '---' ||
        trimmed.startsWith('| ---') ||
        trimmed.startsWith('| :--')
      ) {
        continue
      }

      currentText.push(line)
    }

    // 最后一个 section
    if (currentText.length > 0) {
      sections.push({ heading: currentHeading, text: currentText.join('\n') })
    }

    return sections
  }

  /**
   * 搜索相关文档
   * @param {string} query - 用户查询
   * @param {number} topK - 返回数量
   * @returns {Array<{title:string, path:string, heading:string, snippet:string, score:number}>}
   */
  search(query, topK = 5) {
    if (!this._built || !query.trim()) return []

    const queryTokens = tokenize(query)
    if (queryTokens.length === 0) return []

    // 查询词 TF-IDF 向量
    const queryVec = new Map()
    const queryFreq = new Map()
    let maxFreq = 0
    for (const t of queryTokens) {
      queryFreq.set(t, (queryFreq.get(t) || 0) + 1)
      maxFreq = Math.max(maxFreq, queryFreq.get(t))
    }
    const N = this.totalDocs || 1
    for (const [t, tf] of queryFreq) {
      const idf = Math.log((N + 1) / ((this.docFreq.get(t) || 0) + 1)) + 1
      queryVec.set(t, (tf / maxFreq) * idf)
    }

    // 计算每个 chunk 的 TF-IDF 向量（带 IDF 权重）
    const chunkVecs = this.chunks.map(chunk => {
      const vec = new Map()
      for (const [t, tf] of chunk.tokens) {
        const idf = Math.log((N + 1) / ((this.docFreq.get(t) || 0) + 1)) + 1
        vec.set(t, tf * idf)
      }
      return vec
    })

    // 计算 Query × Chunk 的余弦相似度
    const queryNorm = norm(queryVec) || 1
    const scores = this.chunks.map((chunk, i) => {
      const chunkNorm = norm(chunkVecs[i]) || 1
      const dot = dotProduct(queryVec, chunkVecs[i])
      return {
        title: chunk.title,
        path: chunk.docPath,
        heading: chunk.heading,
        snippet: chunk.content.slice(0, 300),
        score: dot / (queryNorm * chunkNorm) || 0,
      }
    })

    // 去重：同一文档只保留得分最高的 chunk
    const seen = new Set()
    const deduped = []
    scores.sort((a, b) => b.score - a.score)
    for (const r of scores) {
      if (r.score < 0.05) continue // 过滤低相关度
      if (seen.has(r.path)) continue
      seen.add(r.path)
      deduped.push(r)
    }

    return deduped.slice(0, topK)
  }

  /** 获取统计信息 */
  stats() {
    return {
      chunks: this.chunks.length,
      totalDocs: this.totalDocs,
      uniqueTerms: this.docFreq.size,
      built: this._built,
    }
  }
}

// 单例
const searchService = new SearchService()

export default searchService
