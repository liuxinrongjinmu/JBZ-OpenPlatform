# 文档格式修复与内容恢复 - 验收报告

## 任务目标
- 修复文档格式问题：标题序号、接口说明块样式、标题层级统一
- 优化表格行高列宽，提升阅读体验
- 恢复被篡改的文档内容，确保与语雀平台一致
- 完成 Docker 部署并验证页面可正常访问

## 验证结果

### 1. Docker 部署状态
- 容器 `jbz-open-platform` 运行中
- 端口映射：`0.0.0.0:8080 -> 80/tcp`
- 访问地址：`http://localhost:8080`

### 2. 构建产物完整性
- 生成 HTML 文件：221 个
- 空 HTML 文件：0 个
- 零字节文件：1 个（`vp-icons.css`，不影响页面渲染）

### 3. 关键页面 HTTP 抽样检查
| 页面 | 状态 | 大小 |
| --- | --- | --- |
| /merchant/qg65rnmf5aqyimg3.html | 200 | 105766 bytes |
| /merchant/base9kyvch90qu3k.html | 200 | 106760 bytes |
| /merchant/hafwuiroo6q44v80.html | 200 | 193164 bytes |
| /merchant/ictum3v4xk0mkgb3.html | 200 | 105448 bytes |
| /merchant/wyz0vu0r6nhygy2s.html | 200 | 138955 bytes |
| /merchant/uegsyxczkmsp6lbv.html | 200 | - |
| /merchant/vwa3yalblzbp3x5t.html | 200 | - |
| /merchant/viw6pcao0xmmw3cs.html | 200 | - |
| /supplier/index.html | 200 | 59139 bytes |
| /merchant/index.html | 200 | 100963 bytes |

### 4. 浏览器渲染验证
- `7.1.消息订阅(新)`：标题、接口说明块、表格均正常显示
- `7.8.优选联盟订单消息`：标题正确，订单 msg 示例为空 `{}`，与语雀一致
- `3.2.省市区信息`：下载链接与数据预览表格正常显示
- `3.3.商品类目`：下载链接与数据预览表格正常显示

### 5. Sidebar 标题一致性
- 已检查 sidebar 中 202 个带 link 的条目
- 分组标题（如"解决方案"）与具体文档 H1 不同属于预期结构
- 叶子节点文档标题与 sidebar text 一致

## 6. 本次全面检查与修复验证（2026-07-09）

### 6.1 综合检查脚本结果
- 死链：0 个问题
- 无效 JSON 代码块：0 个问题
- 接口说明分行：0 个问题
- Excel 文件缺失：0 个问题
- 内容缺失短文件：26 个（均为语雀平台原始空文档或 401 授权文档，属于预期状态）

### 6.2 重新构建与部署
- 执行 `docker compose up --build -d` 成功
- 容器 `jbz-open-platform` 健康运行，端口 `8080 -> 80`
- 生成 HTML 文件：222 个，空 HTML 文件：0 个

### 6.3 关键问题浏览器验证

| 检查项 | 验证结果 |
| --- | --- |
| 图一 2.3/2.4 链接跳转 | 首页链接指向 `/merchant/hh4z3853qofi295w` 与 `/merchant/atmz5o9aw6pitqsm`，点击后正常跳转，无 404 |
| 3.2 省市区信息 Excel | 下载链接指向 `/files/area-list.xlsx`，HTTP 200；预览表头为「省份/城市/区县/区域编码」，共 30 行 |
| 3.3 商品类目 Excel | 下载链接指向 `/files/goods-category.xlsx`，HTTP 200；预览表头为「一级类目/二级类目/三级类目/类目编码」，共 37 行 |
| 3.4 订单类型代码块 | JSON 对象格式，键带引号，Shiki 高亮正常 |
| 10.15 查询用户列表 | 接口说明单行显示，2 个 JSON 代码块高亮正常（50 行 + 6 行） |
| 10.16 查询会员卡权益等级 | 接口说明单行显示，2 个 JSON 代码块高亮正常（30 行 + 6 行） |
| 10.17 查询用户会员卡等级 | 接口说明单行显示，2 个 JSON 代码块高亮正常（4 行 + 6 行） |
| 4.10 新增积分商品 | 内容完整加载，接口说明与代码块正常 |
| 4.12 查询积分商品 | 内容完整加载，接口说明与代码块正常 |

### 6.4 全局可用性
- 首页 `/`、商家版 `/merchant/`、供应商版 `/supplier/` 均返回 200
- Excel 静态文件 `/files/area-list.xlsx`、`/files/goods-category.xlsx` 均返回 200
- Nginx 已配置 `absolute_redirect off;`，避免端口映射时丢失端口号

## 7. 本次全面检查与修复验证（2026-07-10）

### 7.1 新发现并修复的普遍性问题

#### 表格分隔行空单元格导致整张表无法渲染
- 问题特征：部分文档（如 10.5、10.6 等）的响应参数表使用了空列做缩进，但分隔行（`| --- |  | --- | ...`）第二列留空，导致 markdown-it 无法识别为合法表格，页面显示为纯文本 `| response | | 否 | object | ...`。
- 修复方式：新增脚本 `tools/yuque-migrator/fix_separator_empty_cells.py`，扫描 `docs/merchant` 与 `docs/supplier` 下所有 `.md` 文件，自动将分隔行中的空单元格补为 `---`。
- 修复范围：共 13 个文件
  - merchant: `gmr68eb344op1ggl.md`, `ho7tkh2n64eee99z.md`, `rt6cn276dwghuels.md`, `td78n9c9e6mgh944.md`, `vra379x4xhxyy0tf.md`, `yiwmb8efxl1z6hrr.md`, `ymv61c1uk3m7n3c1.md`
  - supplier: `foffig2hlto5for3.md`, `gzsyo29w7x8z38t5.md`, `ktwigfetg7odz79h.md`, `mv3dl2n5gm55gvq4.md`, `nsd001exbq114bos.md`, `xutfdu0fpt125ghw.md`

### 7.2 重新构建与部署
- 执行 `docker compose up --build -d` 成功
- 容器 `jbz-open-platform` 健康运行，端口 `8080 -> 80`
- VitePress 构建完成，无报错

### 7.3 浏览器验证关键问题

| 检查项 | 验证结果 |
| --- | --- |
| 3.2 省市区信息 Excel | 链接 `/files/area-list.xlsx` 已添加 `download` 与 `target="_blank"`，HTTP 200，点击可下载 |
| 3.3 商品类目 Excel | 链接 `/files/goods-category.xlsx` 已添加 `download` 与 `target="_blank"`，HTTP 200，点击可下载 |
| 标题悬停 # 符号 | CSS 已全局隐藏 `.header-anchor`，所有页面标题悬停不再出现 `#` |
| 10.5 会员余额修改 | 请求/响应参数表均正常渲染，无空行，缩进层级 `─code` / `─msg` 显示正确 |
| 10.6 会员余额变动查询 | 响应参数表 24 行正常渲染，嵌套层级 `─result` / `─records` / `─id` 等显示正确 |
| 10.13 会员余额批量修改 | 请求/响应参数表均正常渲染，`─errorInfos` 下数组对象层级 `─userId` / `─errorDesc` / `─errorCode` 显示正确 |

### 7.4 批量脚本检查结果
- `analyze_table_issues_v2.py`：0 个文件存在表格问题
- `comprehensive_check.py`：死链 0、无效 JSON 0、接口说明分行 0、Excel 缺失 0；短文件 26 个（为语雀原始空文档或 401 授权文档，属预期状态）

## 8. 本次全面检查与修复验证（2026-07-10 晚）

### 8.1 重新构建与部署
- 执行 `docker compose up --build -d` 成功
- 容器 `jbz-open-platform` 健康运行，端口 `8080 -> 80`
- VitePress 构建完成，无报错
- 生成 HTML 文件：223 个

### 8.2 文档表格格式修复验证

#### 树形层级符号统一
- 修复脚本 `tools/yuque-migrator/restore_tree_symbols.py` 对全站涉及层级缩进的表格进行统一恢复
- 将错误符号「─」统一恢复为语雀风格树形符号（├ / └ / │）
- `analyze_table_issues_v2.py` 扫描结果：0 个文件存在表格问题

#### 关键页面浏览器验证
| 检查项 | 验证结果 |
| --- | --- |
| 10.5 会员余额修改 | 请求/响应参数表均正常渲染，无空行；响应参数中 `├ code`、`└ msg` 树形层级显示正确 |
| 10.6 会员余额变动查询 | 响应参数表 24 行正常渲染；`response` 下 `├ code`、`├ msg`、`└ result` 及 `result` 下 `├ records` / `├ total` / `├ size` / `└ current` 层级关系正确 |
| 10.13 会员余额批量修改 | 请求/响应参数表均正常渲染；`errorInfos` 数组对象下 `├ userId`、`├ errorDesc`、`└ errorCode` 层级关系正确 |

### 8.3 Excel 表格功能优化验证
- 文件一致性校验：
  - `area-list.xlsx` 与 `省市区列表.xlsx` MD5 一致（`0399591976da4b87a78ef224d4577e23`）
  - `goods-category.xlsx` 与 `商品类目.xlsx` MD5 一致（`f798da552711d01711b81f9b7f64f1d3`）
- 3.2 省市区信息页面仅保留「省市区列表.xlsx」下载链接，无多余说明文字和预览表格
- 3.3 商品类目页面仅保留「商品类目.xlsx」下载链接，无多余说明文字和预览表格
- Excel 静态文件 HTTP 200，Content-Type 为 `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`

### 8.4 导航链接与菜单功能调整验证

#### 供应商版错误链接修正
| 菜单项 | 链接目标 | 验证结果 |
| --- | --- | --- |
| 接入须知 | `/supplier/eg2pz23q9s72ldg8` | 点击后正常跳转，页面标题「接入须知」 |
| 认证鉴权 | `/supplier/afyud5gcw8gn6i19` | 点击后正常跳转，页面标题「认证鉴权」 |

#### 左侧菜单栏交互优化
- 供应商版「概述」、「接口列表」等上层菜单已移除 `link` 属性，显示为展开/折叠按钮
- 商家版所有带子菜单的上层菜单（如「解决方案」、「接入指南」、「通用接口」等）同样为展开/折叠按钮
- 点击上层菜单直接展开/折叠子菜单，不再跳转空内容页，与商家版交互逻辑一致

### 8.5 批量脚本复查
- `comprehensive_check.py`：死链 0、无效 JSON 0、接口说明分行 0、Excel 缺失 0
- 内容缺失短文件 28 个（含语雀原始空文档、401 授权文档、以及简化后的 3.2/3.3 下载页，属预期状态）

### 8.6 浏览器二次验证（问题复测）

针对用户再次反馈的「供应商版接入须知/认证鉴权跳转错误」和「左侧父菜单无法展开/收起」进行复测：

| 检查项 | 实际状态 | 验证结果 |
| --- | --- | --- |
| 侧边栏「接入须知」 | `href="/supplier/eg2pz23q9s72ldg8"` | 点击后进入「接入须知」页面，标题正确 |
| 侧边栏「认证鉴权」 | `href="/supplier/afyud5gcw8gn6i19"` | 点击后进入「认证鉴权」页面，标题正确 |
| 首页快速开始「接入须知」 | `href="./eg2pz23q9s72ldg8"` | 点击后进入「接入须知」页面 |
| 首页快速开始「认证鉴权」 | `href="./afyud5gcw8gn6i19"` | 点击后进入「认证鉴权」页面 |
| 供应商「概述」父菜单 | 无 `link`，`collapsed: false` | 显示为展开/折叠按钮，点击可收起子菜单 |
| 供应商「接口列表」父菜单 | 无 `link`，`collapsed: false` | 显示为展开/折叠按钮，点击可收起子菜单 |
| 供应商「商品相关接口」等二级父菜单 | 无 `link`，`collapsed: false` | 均可点击展开/收起 |

复测结论：当前部署版本功能正常。如本地仍看到旧现象，通常为浏览器缓存了旧的 VitePress SPA 构建产物导致。

### 8.7 防止缓存导致旧版本菜单不生效

- 修改 `nginx.conf.template`，为所有 `.html` 页面添加 `Cache-Control: no-cache, no-store, must-revalidate` 与 `Pragma: no-cache`
- 重新执行 `docker compose down && docker compose build --no-cache && docker compose up -d` 完成无缓存构建部署
- 容器 `jbz-open-platform` 健康运行，端口 `8080 -> 80`

## 结论
- 所有用户反馈的格式问题已修复
- 7.8 等被篡改内容已恢复，与语雀平台保持一致
- 图一、图二、图四、图五等涉及问题已全部解决
- 新增并修复了表格分隔行空单元格导致的普遍性格式问题
- 全站表格树形层级符号已统一恢复为语雀风格（├ / └ / │）
- Excel 下载功能正常，页面风格与语雀平台保持一致
- 供应商版导航链接与侧边栏菜单交互已修复并验证
- Docker 部署成功，全站链接、下载、代码展示、表格渲染等功能正常
- 任务完成

## 9. 侧边栏菜单统一为标准树形格式（2026-07-10）

### 9.1 修复内容

1. **统一 `docs/.vitepress/sidebar.js` 节点格式**
   - 父节点统一为 `{ text, collapsed, items }` 顺序，必须带 `collapsed`，禁止带 `link`
   - 叶子节点统一为 `{ text, link }`，禁止带 `items`
   - 运行 `node tools/fix-sidebar-standard.js` 后，商家版与供应商版全部节点已标准化

2. **admin 后端持久化时自动标准化**
   - 在 `admin/server/services/sidebarService.js` 的 `serializeSidebar` 中增加 `standardizeNodes`
   - 后续通过管理后台新增/修改/删除菜单时，都会自动保持同样的父/叶子节点规范

3. **左侧菜单栏统一树形样式**
   - 在 `docs/.vitepress/theme/style.css` 中新增侧边栏样式：
     - 消除 h2/h3 默认边距，统一行高与字号
     - 一级菜单加粗深色，二/三级菜单统一字重与颜色
     - 父节点统一手型光标与展开箭头尺寸
     - 所有子级统一左侧 1px 引导线，缩进一致
     - 当前激活叶子节点高亮

### 9.2 重新构建与部署

- 执行 `docker compose down && docker compose build --no-cache && docker compose up -d` 成功
- 容器 `jbz-open-platform` 健康运行，端口 `8080 -> 80`
- VitePress 构建完成，无报错

### 9.3 浏览器验证

| 检查项 | 商家版 `/merchant/` | 供应商版 `/supplier/` |
| --- | --- | --- |
| 一级菜单（如「解决方案」/「概述」） | 仅展开/收起，不可点击 | 仅展开/收起，不可点击 |
| 二级父菜单（如「1.2 第三方商城接入」/「商品相关接口」） | 仅展开/收起，不可点击 | 仅展开/收起，不可点击 |
| 三级父菜单（如「运费相关接口」/「消息订阅(新)」） | 仅展开/收起，不可点击 | 仅展开/收起，不可点击 |
| 叶子菜单（如「1.1 第三方 ERP 接入」/「接入须知」） | 可点击跳转 | 可点击跳转 |
| DOM 中父节点 | `<div role="button">` / 纯文本 | `<div role="button">` / 纯文本 |
| DOM 中叶子节点 | `<a class="link">` | `<a class="link">` |
| 左侧引导线与缩进 | 统一 | 统一 |

### 9.4 结论

- 商家版与供应商版左侧菜单栏现在使用同一套数据结构规范与视觉样式
- 仅末级菜单可点击查看文档，所有上级菜单点击均为展开/收起
- 已通过浏览器 DOM 检查确认无父节点带 `link`、无叶子节点缺失 `link`

## 10. 表格显示异常问题修复（2026-07-10）

### 10.1 问题排查

- 用户反馈 `SUPPLIER_TRADE_ORDER_REFUND-售后消息事件参数` 与 `SUPPLIER_TRADE_ORDER_STATE-订单消息事件参数` 两个文档表格显示异常
- 运行 `tools/find_inverted_table_headers.py` 扫描全部文档，发现 6 个文件共 12 处存在「分隔行在前、表头行在后」的倒置表格
- 新增 `tools/check_all_table_issues.py` 全面检查：倒置表头、分隔行空单元格、列数不一致、分隔行缺失
- 新增 `tools/check_inline_tables.py` 检查表格语法与其他内容位于同一行的情况
- 新增 `tools/check_html_tables.py` 扫描构建产物 HTML，确认无未渲染的 Markdown 表格语法残留

### 10.2 修复文件

| 文件 | 问题 | 修复内容 |
| --- | --- | --- |
| `docs/supplier/sgtx5qch9tl63e7e.md` | 2 处倒置表头 | 交换分隔行与表头行位置 |
| `docs/supplier/dn6fevbnfap7gll1.md` | 1 处倒置表头 | 交换分隔行与表头行位置 |
| `docs/supplier/gffweww3cufk3g0k.md` | 3 处倒置表头 | 交换分隔行与表头行位置 |
| `docs/merchant/gkq6v87nv8d9kwhh.md` | 1 处倒置表头 | 交换分隔行与表头行位置 |
| `docs/merchant/gvxe6iazdowhkpzx.md` | 3 处倒置表头 | 交换分隔行与表头行位置 |
| `docs/merchant/tymnf6bymfnbinvv.md` | 2 处倒置表头 | 交换分隔行与表头行位置 |
| `docs/merchant/wyz0vu0r6nhygy2s.md` | 1 处行内表格 | 将 `### 推送消息响应` 与表格分行，表格独立成行 |

### 10.3 批量脚本检查结果

- `find_inverted_table_headers.py`：0 个文件存在倒置表格
- `check_all_table_issues.py`：0 个文件存在表格问题
- `check_inline_tables.py`：0 个文件存在行内表格问题
- `check_html_tables.py`：0 个 HTML 文件存在未渲染表格语法

### 10.4 重新构建与部署

- 执行 `docker compose down && docker compose build --no-cache && docker compose up -d` 成功
- 容器 `jbz-open-platform` 健康运行，端口 `8080 -> 80`
- VitePress 构建完成，无报错

### 10.5 浏览器验证

| 检查项 | 验证结果 |
| --- | --- |
| `/supplier/sgtx5qch9tl63e7e` 售后消息事件参数 | 表格正常渲染，参数/类型/示例/必传/说明列显示正确 |
| `/supplier/dn6fevbnfap7gll1` 订单消息事件参数 | 表格正常渲染，参数/类型/示例/必传/说明列显示正确 |
| `/merchant/wyz0vu0r6nhygy2s` 第三方订单推送 | 状态流转表、参数说明表、推送消息响应表均正常渲染 |

### 10.6 结论

- 已全面排查并修复所有文档中的表格显示异常问题
- 新增多种自动化检查脚本，便于后续持续监控表格格式
- Docker 部署成功，关键页面表格渲染均正常
