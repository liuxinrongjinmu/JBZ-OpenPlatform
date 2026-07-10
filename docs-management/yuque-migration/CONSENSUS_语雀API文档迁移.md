# CONSENSUS - 语雀API文档迁移至聚宝赞开放平台

> 阶段1: Align 对齐阶段最终产出
> 创建时间: 2026-07-07
> 状态: 待用户确认

---

## 一、需求描述

将语雀平台上2个公开知识库的API文档完整迁移至自建"聚宝赞开放平台"VitePress文档站点。

### 迁移源
| 知识库 | URL | book_id | 文档数 | namespace |
|---|---|---|---|---|
| 开放平台商家版 | https://jubaozan.yuque.com/staff-rq30em/api | 40874077 | 160篇 | staff-rq30em/api |
| 供应商开放平台 | https://jubaozan.yuque.com/staff-rq30em/di9gff | 44246655 | 56篇 | staff-rq30em/di9gff |
| **合计** | - | - | **216篇** | - |

### 迁移目标
- 自建"聚宝赞开放平台"文档站点
- 技术栈：VitePress
- 部署方式：Docker Compose
- 图片存储：本地静态资源

---

## 二、已确认的技术方案

### 2.1 数据提取方案（已验证可行）

**核心发现**：语雀内部API `https://jubaozan.yuque.com/api/docs/{doc_id}?book_id={book_id}` 的 `sourcecode` 字段返回完整Markdown正文，**无需任何认证**。

**提取流程**：
```
1. GET 知识库首页 HTML → 提取 window.appData JSON → 获取完整TOC（含doc_id、title、层级）
2. 遍历TOC中每个DOC节点 → GET /api/docs/{doc_id}?book_id={book_id} → 提取 sourcecode 字段（Markdown正文）
3. 正则提取Markdown中的图片URL → 下载到本地 → 替换为相对路径
4. 按TOC层级生成目录结构 → 保存为 .md 文件
```

**已验证**：
- ✅ 商家版首页HTML可获取，TOC完整（160个DOC节点）
- ✅ 供应商版首页HTML可获取，TOC完整（56个DOC节点）
- ✅ /api/docs/{doc_id} 接口返回sourcecode字段，内容为完整Markdown
- ✅ Markdown中包含文字、代码块、图片链接（cdn.nlark.com）、内嵌链接
- ✅ 无需Token/Cookie认证

### 2.2 目标平台技术栈

| 组件 | 选型 | 说明 |
|---|---|---|
| 文档框架 | VitePress | Vue生态，专为文档站设计 |
| 构建产物 | 静态HTML | 可部署至任意HTTP服务器 |
| 容器化 | Docker + Nginx | Docker Compose编排 |
| 图片存储 | 本地 public/images/ | 随仓库部署 |

### 2.3 内容转换规则

| 元素 | 处理方式 |
|---|---|
| 文字描述 | 保持原文，不做修改 |
| 代码块 | 保持原Markdown代码块语法 |
| 图片 | 下载到本地 `public/images/{book_slug}/`，替换Markdown中的URL为 `/images/{book_slug}/xxx.png` |
| 语雀内部链接 | 转换为VitePress相对路径 `./xxx.md` |
| 外部链接 | 保持原样 |
| 表格 | 保持Markdown表格语法 |
| 标题层级 | 保持原文档层级 |

### 2.4 目录结构映射

语雀TOC层级 → VitePress目录结构：
```
docs/
├── merchant/          # 商家版
│   ├── index.md       # 首页概述
│   ├── solution/      # 解决方案
│   ├── guide/         # 接入指南
│   └── api/           # 通用接口
├── supplier/          # 供应商版
│   ├── index.md       # 概述
│   ├── guide/         # 接入须知
│   └── api/           # 接口列表
└── .vitepress/
    └── config.ts      # VitePress配置（侧边栏、导航）
```

---

## 三、验收标准

### 3.1 内容完整性
- [ ] 商家版160篇文档全部迁移
- [ ] 供应商版56篇文档全部迁移
- [ ] 所有图片下载到本地并可正常显示
- [ ] 所有代码块格式正确
- [ ] 所有内嵌链接可达（内部链接转为相对路径，外部链接保留）

### 3.2 格式一致性
- [ ] 文档目录层级与语雀原始TOC一致
- [ ] 标题层级保持一致
- [ ] 排版风格一致

### 3.3 系统可用性
- [ ] VitePress站点可正常构建（`npm run build` 无错误）
- [ ] 侧边栏导航正确反映目录结构
- [ ] 搜索功能可用
- [ ] Docker Compose一键部署成功
- [ ] 容器内站点可正常访问

### 3.4 质量指标
- [ ] 文档覆盖率 100%（216/216）
- [ ] 图片显示率 100%
- [ ] 链接有效性 ≥ 99%
- [ ] 构建零错误

---

## 四、任务边界

### 包含
- Python爬虫脚本：提取语雀216篇文档+图片
- VitePress站点搭建：配置、首页、侧边栏、导航
- Docker部署配置：Dockerfile + docker-compose.yml
- 内容验证脚本：自动比对文档数量、图片完整性
- 迁移文档（docs/语雀API文档迁移/）

### 不包含
- 不修改API文档的业务内容
- 不实现评论/反馈功能
- 不实现访问统计
- 不做SEO优化
- 不做中英文双语

---

## 五、技术约束

- 敏感信息（如有）放 `.env`，不提交git
- Python函数必须有docstring注释
- 代码精简易读，复用现有工具
- 部署提供 `make deploy` 一键命令（符合用户偏好）

---

## 六、已解决的不确定性

| 原疑问 | 结论 |
|---|---|
| 供应商库是否可访问？ | ✅ 公开可访问，56篇文档 |
| 是否需要语雀Token？ | ❌ 不需要，sourcecode API无认证 |
| 目标技术栈？ | VitePress |
| 部署方式？ | Docker Compose |
| 图片如何处理？ | 下载本地化 |
| 内嵌链接如何处理？ | 内部链接转相对路径，外部保留 |
