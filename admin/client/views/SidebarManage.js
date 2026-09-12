/**
 * 侧边栏管理 - 树形结构可视化编辑
 */
import { api } from '../api/index.js'

export default {
  name: 'SidebarManage',
  props: { dir: String },
  template: `
    <div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
        <span style="font-size:13px;color:#6b7280;">管理「{{ dir === 'merchant' ? '商家版' : '供应商版' }}」侧边栏菜单</span>
        <button @click="addRootNode" style="padding:8px 16px;background:#3b82f6;color:#fff;border:none;border-radius:6px;font-size:13px;cursor:pointer;">+ 添加根节点</button>
      </div>

      <!-- 校验错误提示 -->
      <div v-if="sidebarErrors.length" style="background:#fffbeb;border:1px solid #fcd34d;border-radius:8px;padding:16px;margin-bottom:12px;">
        <div style="font-weight:700;color:#92400e;font-size:14px;margin-bottom:8px;">
          ⚠️ 侧边栏保存失败：有 {{ sidebarErrors.length }} 个链接指向不存在的文档
        </div>
        <div v-for="(err, i) of sidebarErrors" :key="i" style="background:#fef3c7;border-radius:6px;padding:10px 14px;margin-bottom:8px;"
             :style="i === sidebarErrors.length - 1 ? 'margin-bottom:0;' : ''">
          <div style="color:#92400e;font-size:13px;font-weight:600;margin-bottom:4px;">{{ err.message }}</div>
          <div style="font-size:12px;color:#a16207;line-height:1.6;">
            💡 <strong>怎么改：</strong>{{ err.fix }}
          </div>
        </div>
      </div>

      <div v-if="loading" style="text-align:center;padding:40px;color:#9ca3af;">加载中...</div>

      <div v-else style="background:#fff;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,.06);padding:16px;">
        <sidebar-node v-for="node of tree" :key="node.id"
                      :node="node" :dir="dir" :depth="0"
                      @edit="editNode" @delete="deleteNode" @add-child="addChildNode" @move="moveNode" />
        <div v-if="tree.length === 0" style="text-align:center;padding:20px;color:#9ca3af;">暂无菜单项</div>
      </div>

      <!-- 编辑弹窗 -->
      <div v-if="showModal" style="position:fixed;inset:0;background:rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center;z-index:100;">
        <div style="background:#fff;border-radius:12px;padding:24px;width:420px;box-shadow:0 20px 60px rgba(0,0,0,.3);">
          <h3 style="font-size:16px;font-weight:600;margin-bottom:16px;">{{ modalTitle }}</h3>
          <div style="margin-bottom:12px;">
            <label style="display:block;font-size:13px;font-weight:500;margin-bottom:4px;">节点名称</label>
            <input v-model="modalForm.text" placeholder="例如：接口列表"
                   style="width:100%;padding:8px 12px;border:1px solid #d1d5db;border-radius:6px;font-size:14px;outline:none;" />
          </div>
          <div style="margin-bottom:12px;">
            <label style="display:block;font-size:13px;font-weight:500;margin-bottom:4px;">关联文档</label>
            <select v-model="modalDocId" @change="onDocSelect"
                    style="width:100%;padding:8px 12px;border:1px solid #d1d5db;border-radius:6px;font-size:14px;outline:none;background:#fff;">
              <option value="">不关联文档（仅作为菜单分组）</option>
              <option v-for="doc of docs" :key="doc.id" :value="doc.id">{{ doc.title }} ({{ doc.id }})</option>
            </select>
          </div>
          <div v-if="!modalDocId" style="margin-bottom:16px;">
            <label style="display:block;font-size:13px;font-weight:500;margin-bottom:4px;">自定义链接（可选）</label>
            <input v-model="modalForm.link" placeholder="例如：/merchant/xxx.md"
                   style="width:100%;padding:8px 12px;border:1px solid #d1d5db;border-radius:6px;font-size:14px;outline:none;" />
          </div>
          <div style="display:flex;gap:8px;justify-content:flex-end;">
            <button @click="showModal = false" style="padding:8px 16px;border:1px solid #d1d5db;border-radius:6px;background:#fff;font-size:13px;cursor:pointer;">取消</button>
            <button @click="confirmModal" style="padding:8px 16px;background:#3b82f6;color:#fff;border:none;border-radius:6px;font-size:13px;cursor:pointer;">确定</button>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      tree: [],
      loading: true,
      showModal: false,
      modalTitle: '',
      modalForm: { text: '', link: '' },
      modalAction: null, // 'add-root' | 'add-child' | 'edit'
      modalParentId: null,
      modalNodeId: null,
      docs: [],
      modalDocId: '',
      sidebarErrors: [],
      moving: false, // 防止并发点击导致排序错乱
    }
  },
  async mounted() {
    await this.loadTree()
  },
  methods: {
    async loadTree() {
      this.loading = true
      try {
        const result = await api.getSidebar(this.dir)
        this.tree = result.tree
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    async loadDocs() {
      try {
        const result = await api.getDocuments({ dir: this.dir, page: '1', size: '1000' })
        this.docs = result.items || []
      } catch (err) {
        console.error(err)
      }
    },

    docLink(docId) {
      return `/${this.dir}/${docId}.md`
    },

    parseDocId(link) {
      const match = String(link).match(new RegExp(`^/${this.dir}/([^/]+)\\.md$`))
      return match ? match[1] : ''
    },

    onDocSelect() {
      if (this.modalDocId) {
        this.modalForm.link = this.docLink(this.modalDocId)
      }
    },

    // 新增根节点
    addRootNode() {
      this.modalTitle = '新增根节点'
      this.modalForm = { text: '', link: '' }
      this.modalDocId = ''
      this.modalAction = 'add-root'
      this.loadDocs()
      this.showModal = true
    },

    // 编辑节点
    editNode(node) {
      this.modalTitle = '编辑节点'
      this.modalForm = { text: node.text, link: node.link || '' }
      this.modalDocId = this.parseDocId(node.link)
      this.modalAction = 'edit'
      this.modalNodeId = node.id
      this.loadDocs()
      this.showModal = true
    },

    // 删除节点
    async deleteNode(node) {
      if (!confirm(`确认删除节点「${node.text}」？`)) return
      try {
        await api.deleteSidebarNode(node.id, this.dir)
        await this.loadTree()
      } catch (err) { alert('删除失败: ' + err.message) }
    },

    // 上移/下移节点（调用后端实时保存，成功后刷新树）
    async moveNode(node, direction) {
      if (this.moving) return
      this.moving = true
      try {
        await api.moveSidebarNode(node.id, this.dir, direction)
        await this.loadTree()
      } catch (err) {
        alert('移动失败: ' + err.message)
      } finally {
        this.moving = false
      }
    },

    // 新增子节点
    addChildNode(parentId) {
      this.modalTitle = '新增子节点'
      this.modalForm = { text: '', link: '' }
      this.modalDocId = ''
      this.modalAction = 'add-child'
      this.modalParentId = parentId
      this.loadDocs()
      this.showModal = true
    },

    // 确认弹窗
    async confirmModal() {
      if (!this.modalForm.text.trim()) {
        alert('请输入节点名称')
        return
      }
      if (this.modalDocId) {
        this.modalForm.link = this.docLink(this.modalDocId)
      } else if (!this.modalForm.link) {
        this.modalForm.link = ''
      }
      this.sidebarErrors = []
      try {
        if (this.modalAction === 'add-root') {
          await api.addSidebarNode({ dir: this.dir, parentId: null, node: this.modalForm })
        } else if (this.modalAction === 'add-child') {
          await api.addSidebarNode({ dir: this.dir, parentId: this.modalParentId, node: this.modalForm })
        } else if (this.modalAction === 'edit') {
          await api.updateSidebarNode(this.modalNodeId, { dir: this.dir, patch: this.modalForm })
        }
        this.showModal = false
        await this.loadTree()
      } catch (err) {
        if (err.status === 422 && err.details) {
          this.sidebarErrors = err.details
        } else {
          alert('操作失败: ' + err.message)
        }
      }
    },
  },
}

// 递归节点组件
export const SidebarNode = {
  name: 'SidebarNode',
  props: ['node', 'dir', 'depth'],
  emits: ['edit', 'delete', 'add-child', 'move'],
  template: `
    <div>
      <div style="display:flex;align-items:center;gap:8px;padding:6px 8px;margin:2px 0;border-radius:6px;transition:background .15s;"
           :style="'padding-left:' + (depth * 24 + 8) + 'px;'"
           @mouseover="e => e.currentTarget.style.background='#f9fafb'"
           @mouseleave="e => e.currentTarget.style.background=''">
        <span v-if="node.items && node.items.length" style="cursor:pointer;font-size:12px;user-select:none;" @click="$emit('add-child', node.id)">
          📁
        </span>
        <span v-else style="font-size:12px;">📄</span>
        <span style="flex:1;font-size:14px;">{{ node.text }}</span>
        <span v-if="node.link" style="font-size:11px;color:#9ca3af;font-family:monospace;">{{ node.link }}</span>
        <button @click="$emit('move', node, 'up')" title="上移（与上一项交换位置，实时保存）"
                style="background:none;border:none;cursor:pointer;font-size:13px;color:#6b7280;padding:2px 4px;">↑</button>
        <button @click="$emit('move', node, 'down')" title="下移（与下一项交换位置，实时保存）"
                style="background:none;border:none;cursor:pointer;font-size:13px;color:#6b7280;padding:2px 4px;">↓</button>
        <button @click="$emit('add-child', node.id)" title="添加子节点"
                style="background:none;border:none;cursor:pointer;font-size:14px;color:#9ca3af;padding:2px 4px;">+</button>
        <button @click="$emit('edit', node)" title="编辑"
                style="background:none;border:none;cursor:pointer;font-size:13px;color:#6b7280;padding:2px 4px;">✎</button>
        <button @click="$emit('delete', node)" title="删除"
                style="background:none;border:none;cursor:pointer;font-size:13px;color:#ef4444;padding:2px 4px;">✕</button>
      </div>
      <sidebar-node v-for="child of (node.items || [])" :key="child.id"
                    :node="child" :dir="dir" :depth="depth + 1"
                    @edit="e => $emit('edit', e)"
                    @delete="e => $emit('delete', e)"
                    @add-child="e => $emit('add-child', e)"
                    @move="(n, d) => $emit('move', n, d)" />
    </div>
  `,
}

// 注册递归组件
SidebarManage.components = { SidebarNode }
