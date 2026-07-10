# 聚宝赞开放平台

聚宝赞开放平台API文档站点，由语雀平台迁移而来。

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run docs:dev

# 构建静态站点
npm run docs:build
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
```

## 目录结构

```
docs/
├── merchant/    # 开放平台商家版（语雀 staff-rq30em/api，160篇）
├── supplier/    # 供应商开放平台（语雀 staff-rq30em/di9gff，56篇）
├── public/images/  # 本地化的图片资源
└── .vitepress/     # VitePress配置
tools/
└── yuque-migrator/ # 语雀迁移工具（Python）
```
