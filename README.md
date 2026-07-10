# 聚宝赞开放平台

聚宝赞开放平台API文档站点，由语雀平台迁移而来。

## 访问地址

| 入口 | 地址 | 说明 |
|------|------|------|
| 文档首页 | `/` | API 文档站点首页 |
| 商家版 | `/merchant/` | 开放平台商家版（161篇） |
| 供应商版 | `/supplier/` | 供应商开放平台（57篇） |
| 管理后台 | `/admin/` | 文档管理后台（需登录） |

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run docs:dev

# 构建静态站点
npm run docs:build
```

## 管理员后台

访问 `/admin/` 进入管理后台，默认密码 `admin123`（可在 `.env` 中修改 `ADMIN_PASSWORD`）。

功能：
- 文档增删改查 + Git 版本历史
- 侧边栏菜单管理
- 图片上传
- 一键重构建（编辑后同步到网站）

首次使用请复制 `.env.example` 为 `.env` 并配置：

```bash
cp .env.example .env
# 编辑 .env:
#   ADMIN_PASSWORD=你的密码
#   SESSION_SECRET=随机字符串
#   VITE_DEEPSEEK_API_KEY=sk-xxx (可选，AI助手需要)
```

## 迁移工具

```bash
# 安装Python依赖
pip install -r tools/yuque-migrator/requirements.txt

# 执行迁移
python tools/yuque-migrator/main.py

# 验证迁移结果
python tools/yuque-migrator/verifier.py
```

## 部署

```bash
# 一键Docker部署
make deploy
# 访问 http://localhost:8080
```

## 目录结构

```
docs/
├── merchant/          # 开放平台商家版（161篇）
├── supplier/          # 供应商开放平台（57篇）
├── public/
│   ├── images/        # 图片资源
│   └── files/         # 可下载文件(.xlsx)
└── .vitepress/        # VitePress配置

admin/
├── server/            # Express 管理后台
│   ├── routes/        # API路由
│   └── services/      # 业务逻辑
└── client/            # Vue 3 前端 SPA
    └── vendor/        # Vue/VueRouter 本地依赖

tools/
└── yuque-migrator/    # 语雀迁移工具（Python）
```
