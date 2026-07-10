# TODO - 待办事项

> 阶段6: Assess 评估阶段产出
> 创建时间: 2026-07-07

---

## 一、待解决问题

### 1. Docker部署（高优先级）
**问题**: Docker Hub不可达，`docker compose up -d --build` 拉取 `node:20-alpine` 和 `nginx:alpine` 镜像失败

**解决方式**（任选其一）:
- **方案A: 配置Docker Desktop镜像加速器**
  1. 打开 Docker Desktop → Settings → Docker Engine
  2. 在JSON配置中添加:
     ```json
     "registry-mirrors": [
       "https://docker.mirrors.ustc.edu.cn",
       "https://hub-mirror.c.163.com",
       "https://docker.m.daocloud.io"
     ]
     ```
  3. 点击 Apply & Restart
  4. 执行 `make deploy`

- **方案B: 手动拉取镜像（需VPN）**
  ```bash
  docker pull node:20-alpine
  docker pull nginx:alpine
  make deploy
  ```

- **方案C: 使用preview模式（无需Docker）**
  ```bash
  npm run docs:build
  npm run docs:preview
  # 访问 http://localhost:4173
  ```

**验证**: `make deploy` 后访问 http://localhost:8080

---

### 2. 10篇401私有文档（中优先级）
**问题**: 以下文档返回401 Unauthorized，已生成占位文件

**商家版（8篇）**:
- doc_id=222207575、275293768、241712245、272296166、272296168、272296170、272296172、272296174

**供应商版（2篇）**:
- doc_id=147841261（消息推送-作废）
- doc_id=148298272（取消消息推送-作废）

**解决方式**（任选其一）:
- **方案A: 提供语雀Cookie认证**
  1. 在浏览器登录语雀，F12获取Cookie中的 `_yuque_session` 值
  2. 在 `tools/yuque-migrator/main.py` 的 `SESSION.headers` 中添加:
     ```python
     SESSION.headers.update({"Cookie": "_yuque_session=xxx"})
     ```
  3. 重新执行 `make migrate`

- **方案B: 手动复制内容**
  1. 浏览器访问语雀对应文档
  2. 复制内容到占位文件中

**验证**: `make verify` 显示0个失败

---

### 3. 9处相对路径图片（低优先级）
**问题**: 以下文件中原有 `images/xxx.png` 相对路径图片引用已删除（无对应本地文件）

**涉及文件**:
- `docs/merchant/gm2pmx0gzw4vfewr.md`（2处）
- `docs/merchant/on8qv3vu68kf2gwf.md`（1处）
- `docs/merchant/dt4qxypbqglk16tr.md`（1处）
- `docs/merchant/va5vo8g8rfud9nge.md`（3处）
- `docs/merchant/hh4z3853qofi295w.md`（1处）
- `docs/merchant/gl3l9mwo4cr1nbu0.md`（1处）

**说明**: 这些相对路径图片在原始语雀文档中均有对应的CDN图片（已下载），删除不影响内容完整性

**解决方式**: 如需补充，可在语雀文档页面右键图片→复制图片地址，手动下载到 `docs/public/images/merchant/` 并更新引用

---

## 二、后续优化建议

### 1. 自动化CI/CD
- 配置GitLab CI：代码推送后自动执行 `make build` + `make deploy`
- 定期重新爬取语雀文档，保持同步

### 2. 搜索功能
- VitePress已内置本地搜索，如需更强搜索可接入Algolia

### 3. 自定义域名
- 修改 `nginx.conf` 和DNS配置，绑定正式域名

### 4. 访问统计
- 集成Google Analytics或百度统计

---

## 三、快速命令参考

| 命令 | 说明 |
|------|------|
| `make migrate` | 重新从语雀爬取文档 |
| `make verify` | 验证迁移完整性 |
| `make build` | 构建VitePress静态站点 |
| `make deploy` | Docker一键部署 |
| `make dev` | 开发模式（热更新） |
| `make stop` | 停止Docker服务 |
| `make logs` | 查看Docker日志 |
| `make clean` | 清理迁移产物 |

### 后处理工具（构建前执行）
```bash
python3 tools/yuque-migrator/escape_generics.py      # 转义Java泛型
python3 tools/yuque-migrator/escape_interpolation.py # 转义Vue插值
python3 tools/yuque-migrator/cleanup_rel_images.py   # 清理失效图片引用
```

---

## 四、当前可用状态

- **preview模式**: ✓ 可用（`npm run docs:preview`，访问 http://localhost:4173）
- **Docker部署**: ⚠ 需配置镜像加速器
- **文档内容**: ✓ 216篇完整，10篇占位待补充
