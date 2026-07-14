# JBZ-OpenPlatform 部署手册

> 本文档用于指导内部同事将“聚宝赞开放平台 API 文档站点”部署到生产环境。  
> 适用人群：运维人员 / 后端开发 / 项目负责人  
> 最后更新：2026-07-14

---

## 目录

- [1. 系统架构概览](#1-系统架构概览)
- [2. 部署前置条件](#2-部署前置条件)
- [3. 环境配置](#3-环境配置)
- [4. 一行命令部署](#4-一行命令部署)
- [5. 部署验证](#5-部署验证)
- [6. 配置 HTTPS 反向代理（生产必做）](#6-配置-https-反向代理生产必做)
- [7. 日常运维](#7-日常运维)
- [8. 故障排查](#8-故障排查)
- [9. 备份与恢复](#9-备份与恢复)
- [10. 附录](#10-附录)

---

## 1. 系统架构概览

```
用户浏览器
    │
    ▼
宿主机 Nginx/Apache（可选反向代理，建议）
    │
    ▼ :8080
┌─────────────────────────────────────────┐
│              Docker 容器                  │
│  ┌───────────────────────────────────┐   │
│  │  Nginx (:80)                      │   │
│  │  ├─ / → VitePress 静态站点         │   │
│  │  ├─ /admin → Express 管理后台 SPA   │   │
│  │  ├─ /api/admin/* → 管理后台 API     │   │
│  │  ├─ /api/chat → AI 聊天 (RAG+SSE)  │   │
│  │  └─ /health → 健康检查             │   │
│  └───────────────────────────────────┘   │
│  ┌───────────────────────────────────┐   │
│  │  Express (:3001)                  │   │
│  │  ├─ TF-IDF 全文检索（194篇文档）    │   │
│  │  ├─ 文档 CRUD + 侧边栏管理         │   │
│  │  ├─ Session 认证登录              │   │
│  │  └─ DeepSeek API 代理             │   │
│  └───────────────────────────────────┘   │
│  ┌───────────────────────────────────┐   │
│  │  supervisord（进程守护）           │   │
│  │  ├─ nginx                        │   │
│  │  └─ node admin/server            │   │
│  └───────────────────────────────────┘   │
│                                            │
│  持久化卷：                                │
│  ├─ ./docs:/app/docs（文档源文件）          │
│  └─ ./data/sessions:/app/data/sessions     │
└─────────────────────────────────────────┘
```

**技术栈：** VitePress + Express + Vue 3 + Nginx + Docker + DeepSeek AI

---

## 2. 部署前置条件

### 2.1 服务器要求

| 项目 | 最低配置 | 推荐配置 |
| --- | --- | --- |
| 操作系统 | Linux (Ubuntu 20.04+ / CentOS 8+) | Ubuntu 22.04 LTS |
| CPU | 2 核 | 4 核 |
| 内存 | 2 GB | 4 GB |
| 磁盘 | 10 GB | 20 GB（预留文档增长空间） |
| 网络 | 可访问公网（DeepSeek API） | 独立公网 IP |

### 2.2 软件依赖

| 软件 | 版本要求 | 安装命令（Ubuntu） |
| --- | --- | --- |
| Docker | ≥ 20.10 | `apt install docker.io` |
| Docker Compose | ≥ v2.0 | `apt install docker-compose-v2` |
| Git | ≥ 2.0 | `apt install git` |

### 2.3 端口要求

| 端口 | 用途 | 开放范围 |
| --- | --- | --- |
| `8080` | Docker 容器 HTTP 服务 | 内网（或通过反向代理对外暴露 443） |
| `443` | HTTPS（若配置反向代理） | 公网 |

---

## 3. 环境配置

### 3.1 克隆项目

```bash
git clone https://git.jubaozan.cn/liuxinrong/JBZ-OpenPlatform.git
cd JBZ-OpenPlatform
```

### 3.2 创建 .env 文件

```bash
cp .env.example .env
```

编辑 `.env`，填入真实值：

```ini
# ========== 必填 ==========

# 管理员后台登录密码（新部署务必修改，不要使用弱密码！）
# 要求：至少 8 位，含大小写字母 + 数字 + 特殊字符
ADMIN_PASSWORD=在此填入生产环境强密码

# 会话加密密钥（重要！缺失会导致服务器重启时所有管理员登出）
# 生成方式：openssl rand -hex 32
SESSION_SECRET=在此填入随机32字节十六进制字符串

# ========== 可选 ==========

# DeepSeek API Key（AI 聊天机器人功能依赖）
# 获取地址：https://platform.deepseek.com/api_keys
# 不填则 AI 聊天机器人功能不可用（不影响文档浏览和管理后台）
DEEPSEEK_API_KEY=

# 日志级别（可选，默认只输出错误日志）
# 设为 debug 可查看完整请求日志（调试用，生产环境建议留空）
LOG_LEVEL=
```

> **安全提示：**
> - `.env` 已在 `.gitignore` 中，不会被提交到 Git 仓库
> - 不要在聊天工具中明文传输密码
> - `ADMIN_PASSWORD` 和 `SESSION_SECRET` 必须填写真实值，docker-compose 会检查

---

## 4. 一行命令部署

### 4.1 部署

```bash
docker compose up -d --build
# 或使用 Makefile 快捷命令
make deploy
```

首次构建约 3-5 分钟（含 npm install + VitePress 静态站点构建），后续构建约 30 秒。

### 4.2 查看日志

```bash
docker compose logs -f
# 或
make logs
```

### 4.3 停止/重启

```bash
# 停止
docker compose down

# 重启
docker compose up -d

# 重建并重启（代码有变更时）
docker compose up -d --build
```

---

## 5. 部署验证

### 5.1 健康检查

```bash
curl -s http://localhost:8080/health
# 预期输出：{"status":"ok"}
```

### 5.2 页面验证

| 页面 | URL | 预期状态 |
| --- | --- | --- |
| 文档首页 | `http://localhost:8080/` | 显示聚宝赞开放平台首页 |
| 商家版文档 | `http://localhost:8080/merchant/` | 显示商家版接口列表 |
| 供应商版文档 | `http://localhost:8080/supplier/` | 显示供应商版接口列表 |
| 管理后台 | `http://localhost:8080/admin/` | 显示登录页面 |
| 文档索引 | `http://localhost:8080/doc-index.json` | 返回 JSON，约 23KB |
| Excel 下载 | `http://localhost:8080/files/area-list.xlsx` | 触发文件下载 |

### 5.3 管理后台登录

访问 `http://localhost:8080/admin/`，使用 `.env` 中配置的 `ADMIN_PASSWORD` 登录。登录后可以进行：
- 文档增删改查
- 侧边栏菜单管理（拖拽排序）
- 图片上传管理
- 一键重新构建站点

### 5.4 AI 聊天机器人验证

打开任意文档页面，点击右下角浮动 AI 按钮，测试：
1. 点击预设问题（如“如何获取 access_token?”）
2. 提问具体接口参数（如“批量商品发货接口有哪些必传参数？”）
3. 确认回答中包含可点击的文档链接（📖 参考文档）

### 5.5 容器状态检查

```bash
# 查看容器运行状态
docker ps | grep jbz-open-platform

# 查看容器资源占用
docker stats jbz-open-platform --no-stream
```

---

## 6. 配置 HTTPS 反向代理（生产必做）

**推荐方案：宿主机 Nginx + Let's Encrypt 免费 SSL 证书**

### 6.1 安装 Certbot

```bash
# Ubuntu/Debian
apt install certbot python3-certbot-nginx

# CentOS/RHEL
yum install certbot python3-certbot-nginx
```

### 6.2 获取 SSL 证书

```bash
certbot certonly --standalone -d your-domain.com
```

### 6.3 宿主机 Nginx 配置

```nginx
# /etc/nginx/sites-available/open-platform
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate     /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # 安全头
    add_header Strict-Transport-Security "max-age=63072000" always;

    # SSE 支持（AI 聊天流式响应需要）
    proxy_buffering off;
    proxy_cache off;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    # 所有请求转发到 Docker 容器
    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 300s;
        proxy_connect_timeout 30s;
        proxy_send_timeout 300s;
    }
}
```

```bash
# 启用站点
ln -s /etc/nginx/sites-available/open-platform /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

### 6.4 自动续期

```bash
# Certbot 默认会创建定时任务，手动验证一下
certbot renew --dry-run
```

---

## 7. 日常运维

### 7.1 常用命令速查

```bash
# 部署/更新
docker compose up -d --build

# 查看日志（实时跟踪）
docker compose logs -f

# 查看最近 100 行日志
docker compose logs --tail 100

# 进入容器
docker exec -it jbz-open-platform sh

# 重启服务
docker compose restart

# 停止
docker compose down

# 查看磁盘占用
du -sh docs/ data/

# 查看容器内存占用
docker stats jbz-open-platform --no-stream
```

### 7.2 代码更新部署流程

```bash
# 1. 拉取最新代码
git pull origin main

# 2. 重建并部署
docker compose up -d --build

# 3. 验证
curl -s http://localhost:8080/health
```

### 7.3 文档内容更新

文档内容更新请通过**管理后台**操作（`/admin/`），变更会自动 Git 提交并记录版本历史，无需重新构建 Docker 镜像。

> **重要：** 管理后台修改的文档存储在 `./docs/` 目录（Docker volume 挂载），容器重建不会丢失。

### 7.4 日志管理

```bash
# 查看错误日志
docker compose logs | grep -i error

# 清理旧的构建缓存
docker builder prune -f
```

### 7.5 磁盘空间监控

建议配置定期清理策略，`./docs/` 目录随文档增加会持续增长：

```bash
watch -n 60 'du -sh docs/ data/'
```

---

## 8. 故障排查

### 8.1 容器无法启动

```bash
# 查看完整启动日志
docker compose logs

# 常见原因：
# 1. 端口 8080 被占用 → lsof -i :8080 查看并释放
# 2. .env 文件缺失 → ls -la .env 确认
# 3. ADMIN_PASSWORD 或 SESSION_SECRET 为空 → 检查 .env
```

### 8.2 管理后台无法登录

| 现象 | 可能原因 | 解决方法 |
| --- | --- | --- |
| 登录无反应 | 使用了错误密码 | 检查 `.env` 中 `ADMIN_PASSWORD` 的实际值 |
| 频繁被锁定 | 5 次错误尝试触发 15 分钟锁定 | 等待 15 分钟或用正确密码重试 |
| 刷新后需重新登录 | `SESSION_SECRET` 在容器重启后变化 | 在 `.env` 中设置固定的 `SESSION_SECRET` |

### 8.3 AI 聊天无响应

| 现象 | 可能原因 | 解决方法 |
| --- | --- | --- |
| 聊天无回复 | `DEEPSEEK_API_KEY` 未配置或无效 | 检查 `.env`，在 [platform.deepseek.com](https://platform.deepseek.com) 获取有效 Key |
| 回答没有文档链接 | 文档索引未正确加载 | 访问 `/doc-index.json` 确认返回 194 篇索引 |
| SSE 连接中断 | Nginx 超时配置不足 | 检查 `proxy_read_timeout` 是否 ≥ 300s |

### 8.4 页面 404

| 现象 | 解决方法 |
| --- | --- |
| 新创建的页面 404 | 在管理后台点击“一键重建” |
| 所有页面 404 | 检查 VitePress 是否构建成功：`docker compose logs | grep "build complete"` |
| 某个具体页面错误 | 在管理后台找到该文档，点击编辑确认内容正常 |

### 8.5 强制重建（完全干净构建）

```bash
# 清除所有缓存后重建
docker compose down
docker builder prune -af
docker compose build --no-cache
docker compose up -d
```

---

## 9. 备份与恢复

### 9.1 备份

```bash
# 创建备份目录
mkdir -p /backup/open-platform

# 备份文档源文件（核心数据）
tar -czf /backup/open-platform/docs-$(date +%Y%m%d).tar.gz docs/

# 备份 Session 数据（管理员登录状态）
tar -czf /backup/open-platform/sessions-$(date +%Y%m%d).tar.gz data/sessions/

# 备份 .env 配置
cp .env /backup/open-platform/env-$(date +%Y%m%d).bak
```

**建议配置 Cron 定期备份：**

```bash
# /etc/cron.d/open-platform-backup
0 2 * * * root tar -czf /backup/open-platform/docs-$(date +\%Y\%m\%d).tar.gz /opt/JBZ-OpenPlatform/docs/
0 3 * * 0 root find /backup/open-platform/ -name '*.tar.gz' -mtime +30 -delete
```

### 9.2 恢复

```bash
# 恢复文档源文件
tar -xzf /backup/open-platform/docs-20260714.tar.gz -C /opt/JBZ-OpenPlatform/
docker compose restart
```

---

## 10. 附录

### 10.1 AI 聊天功能说明

- **技术支持：** TF-IDF 全文检索 + DeepSeek Chat API
- **文档覆盖：** 194 篇（商家版 142 篇 + 供应商版 46 篇 + 首页 6 篇）
- **响应模式：** SSE 流式输出
- **功能限制：** 仅回答已有文档中的内容，不会编造不存在的接口参数

### 10.2 管理后台功能

| 功能 | 说明 |
| --- | --- |
| 文档管理 | 查看/创建/编辑/删除 Markdown 文档，自动 Git 版本历史 |
| 侧边栏管理 | 拖拽排序菜单节点，增删改菜单项，自动标准化树形结构 |
| 图片管理 | 上传/查看/删除图片资源 |
| 一键重建 | 重新构建 VitePress 静态站点，SSE 实时显示构建进度 |

### 10.3 相关链接

| 资源 | 地址 |
| --- | --- |
| GitLab 仓库 | `https://git.jubaozan.cn/liuxinrong/JBZ-OpenPlatform` |
| DeepSeek API 控制台 | `https://platform.deepseek.com/api_keys` |
| VitePress 文档 | `https://vitepress.dev/` |
| Docker 文档 | `https://docs.docker.com/` |

### 10.4 部署检查清单

上线前请逐项确认：

```
☐ 服务器满足推荐配置（4核 / 4GB / 20GB）
☐ Docker ≥ 20.10、Docker Compose v2 已安装
☐ 仓库代码已拉取到服务器
☐ .env 文件已创建并填入真实值
☐ ADMIN_PASSWORD 已更换为强密码（非 admin123）
☐ SESSION_SECRET 已设置为随机字符串
☐ DEEPSEEK_API_KEY 已配置（如需 AI 聊天功能）
☐ 端口 8080 未被占用（或已修改 docker-compose.yml 端口映射）
☐ docker compose up -d --build 成功启动
☐ /health 返回 {"status":"ok"}
☐ 首页、商家版、供应商版、管理后台均可正常访问
☐ 管理后台能够登录成功
☐ AI 聊天机器人正常回复
☐ SSL/HTTPS 证书已配置（生产环境）
☐ 备份策略已制定
```
