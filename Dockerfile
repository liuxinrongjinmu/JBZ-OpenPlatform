# 多阶段构建 Dockerfile
# Stage 1: 构建 VitePress 静态站点
FROM docker.m.daocloud.io/library/node:20-alpine AS builder
WORKDIR /app

RUN apk add --no-cache git

COPY package.json package-lock.json ./
RUN npm ci

COPY docs/ docs/
RUN npm run docs:build

# Stage 2: 运行环境 (Node.js + Nginx + supervisord)
FROM docker.m.daocloud.io/library/node:20-alpine
WORKDIR /app

# 安装 nginx 和 supervisor
RUN apk add --no-cache nginx supervisor gettext git

# 创建数据持久化目录
RUN mkdir -p /app/data/sessions

# 复制 VitePress 构建产物
COPY --from=builder /app/docs/.vitepress/dist/ /usr/share/nginx/html/

# 复制文档源文件（管理后台需要 .md 源文件做 CRUD）
COPY --from=builder /app/docs/ /app/docs/

# 复制管理后台代码
COPY admin/ admin/
COPY package.json package-lock.json ./
# 安装所有依赖（管理后台需要 vitepress 用于重新构建）
RUN npm ci

# 复制 Nginx 配置模板和启动脚本
COPY nginx.conf.template /etc/nginx/nginx.conf.template
COPY docker-entrypoint.sh /docker-entrypoint.sh
COPY supervisord.conf /etc/supervisord.conf

# 确保 nginx 运行时目录
RUN mkdir -p /run/nginx /var/log/nginx

RUN chmod +x /docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]
