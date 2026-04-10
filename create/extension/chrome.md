# Chrome 扩展

## 创建项目

```sh
pnpm create vite@latest my-crx -- --template vue-ts
cd my-crx
```

## 安装 crxjs 插件（支持 MV3 且完美适配 Vite）

```sh
pnpm i @crxjs/vite-plugin@beta -D
```

## 配置 vite.config.ts

```ts
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json" assert { type: "json" };

export default defineConfig({
  plugins: [crx({ manifest })],
});
```

## 配置 manifest.json

[官方文档-manifest.json](https://developer.chrome.com/docs/extensions/reference/manifest)
