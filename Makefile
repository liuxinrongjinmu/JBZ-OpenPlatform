.PHONY: install migrate dev build verify deploy clean

# 安装依赖
install:
	npm install
	pip install -r tools/yuque-migrator/requirements.txt

# 执行语雀文档迁移
migrate:
	python tools/yuque-migrator/main.py

# 验证迁移结果
verify:
	python tools/yuque-migrator/verifier.py

# 开发模式（热更新）
dev:
	npm run docs:dev

# 构建静态站点
build:
	npm run docs:build

# 预览构建产物（标准 vitepress preview，不支持 API 代理）
preview:
	npm run docs:preview

# 预览构建产物（带 AI 代理的完整预览，使用自建 Node 服务器）
preview-full:
	npm run docs:serve

# Docker一键部署
deploy:
	docker compose up -d --build
	@echo "部署完成，访问 http://localhost:8080"

# 停止服务
stop:
	docker compose down

# 查看日志
logs:
	docker compose logs -f

# 清理构建产物（不删除源代码和文档）
clean:
	rm -rf docs/.vitepress/dist docs/.vitepress/cache
