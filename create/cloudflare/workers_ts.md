# 创建 Cloudflare Worker typescript

## 创建 Cloudflare Worker

```bash
pnpm create cloudflare@latest my-first-worker
```

## 构建js

```bash
# 安装构建工具
pnpm install --save-dev esbuild

# 执行构建
npx esbuild src/index.ts \
  --bundle \
  --minify \
  --format=esm \
  --target=esnext \
  --outfile=dist/index.js \
  --platform=browser

```
