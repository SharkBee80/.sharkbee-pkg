## create

### create tauri

```bash
npm create tauri-app@latest
```

### init proect

```sh
cd "demo"
npm install
```

### init git hub

```bash
git init && git add -A && git commit -m "initial commit"
```

## mod

### install plugin<br>

os fs window-state

```bash
npm run tauri add os
npm run tauri add fs
npm run tauri add window-state
npm run tauri add http
```

### 添加路径别名 `@`

 `tsconfig.json`

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

 `vite.config.ts`

```ts
import { join } from "node:path";
export default defineConfig(async () => ({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      "@": join(__dirname, "src")
    },
  },
}));
```

### 添加类型提示

 `tsconfig.json`

```json
{
  "compilerOptions": {
      "types": [
          "element-plus/global"
      ],
  },
}
```
