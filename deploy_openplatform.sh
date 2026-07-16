#!/bin/bash
# JBZ-OpenPlatform 部署脚本（本机跑，部署到远程 10.11.142.166）
# 用法：bash /data/hzx/deploy_openplatform.sh
set -e
REMOTE=10.11.142.166
PORT=5152
DIR=/data/JBZ-OpenPlatform

echo "=========================================="
echo "  JBZ-OpenPlatform 部署（$REMOTE）"
echo "=========================================="

echo "[1/3] 拉最新代码（保护管理后台文档修改）..."
# 策略：git stash 暂存管理员通过后台编辑的文档 → git pull 拉代码 → git stash pop 恢复
# 这样 git pull 不会因为文档未提交修改而 Aborting，管理员编辑的文档也不会丢失
ssh -p $PORT -o BatchMode=yes -o StrictHostKeyChecking=no $REMOTE "
  cd $DIR

  echo '  → 暂存文档修改（如有）...'
  git stash push -- docs/merchant/ docs/supplier/ docs/.vitepress/sidebar.js 2>/dev/null && echo '    已暂存' || echo '    无需暂存'

  echo '  → 拉取最新代码...'
  git pull origin main 2>&1 | tail -3

  echo '  → 恢复文档修改...'
  git stash pop 2>/dev/null && echo '    已恢复' || echo '    无需恢复'
"

echo
echo "[2/3] 重新部署（docker compose up -d --build）..."
ssh -p $PORT -o BatchMode=yes -o StrictHostKeyChecking=no $REMOTE "cd $DIR && docker compose down && docker compose up -d --build" 2>&1 | tail -5

echo
echo "[3/3] 验证..."
sleep 10
echo -n "  容器状态: "
ssh -p $PORT -o BatchMode=yes $REMOTE "docker ps --format '{{.Names}}: {{.Status}}' | grep jbz"
echo -n "  /health:  "
ssh -p $PORT -o BatchMode=yes $REMOTE "curl -s http://localhost:8080/health"
echo
echo -n "  公网访问: "
curl -s -o /dev/null -w "https://doc.jbzyun.cn/ -> HTTP %{http_code}\n" https://doc.jbzyun.cn/ --max-time 10
echo
echo "=========================================="
echo "  ✅  部署完成"
echo "  文档站：https://doc.jbzyun.cn/"
echo "  管理后台：https://doc.jbzyun.cn/admin/"
echo "=========================================="
