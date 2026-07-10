#!/bin/sh
set -e

# 替换 nginx 配置模板中的环境变量，输出到 Alpine nginx 的 http.d 目录
export DEEPSEEK_API_KEY="${DEEPSEEK_API_KEY:-}"
envsubst '${DEEPSEEK_API_KEY}' < /etc/nginx/nginx.conf.template > /etc/nginx/http.d/default.conf

# 确保运行时目录存在
mkdir -p /run/nginx /var/log/nginx

# 初始化或更新 Git 仓库（用于管理后台的版本历史）
cd /app
if [ ! -d ".git" ]; then
  git init
  git config user.email "admin@open-platform.local"
  git config user.name "Admin"
  git add -A docs/
  git commit -m "Initial commit" || true
fi

# 启动 supervisord (管理 nginx + Express)
exec supervisord -c /etc/supervisord.conf
