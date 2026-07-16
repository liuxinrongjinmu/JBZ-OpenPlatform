#!/bin/bash
# ================================================================
# 安全部署脚本 — 代码与文档内容分离
# ================================================================
# 核心策略:
#   1. 文档内容(docs/merchant/、docs/supplier/) 仅通过管理后台编辑
#   2. 代码部署时 git stash 暂存文档修改 → git pull → 恢复文档
#   3. 确保服务器上管理员编辑的文档不会因 git pull 冲突丢失
#
# 使用方式:
#   bash deploy-safe.sh
#   或作为 Jenkins 部署脚本
# ================================================================
set -e

PROJECT_DIR="/data/hzx/JBZ-OpenPlatform"
DOC_PATHS="docs/merchant/ docs/supplier/ docs/.vitepress/sidebar.js"

cd "$PROJECT_DIR"

echo "========================================"
echo "  [1/4] 保护文档编辑 (stash)"
echo "========================================"
# 将管理员通过后台编辑的文档暂存起来
git stash push -- $DOC_PATHS 2>/dev/null && echo "  ✅ 已暂存文档修改" || echo "  ℹ️  无需暂存（文档无修改）"

echo ""
echo "========================================"
echo "  [2/4] 同步最新代码"
echo "========================================"
git pull origin main
echo "  ✅ 代码已更新"

echo ""
echo "========================================"
echo "  [3/4] 恢复文档编辑 (stash pop)"
echo "========================================"
git stash pop 2>/dev/null && echo "  ✅ 已恢复文档修改" || echo "  ℹ️  无需恢复"

echo ""
echo "========================================"
echo "  [4/4] 重新部署 Docker"
echo "========================================"
docker compose down
docker compose up -d --build

echo ""
echo "========================================"
echo "  ✅ 部署完成"
echo "========================================"
docker ps --filter name=jbz-open-platform --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo ""
echo "📌 提示: 如需更新文档站点，请登录管理后台点击「重新构建」"
