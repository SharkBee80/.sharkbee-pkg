## 创建 vue 项目

```bash
npm create vue@latest
```

## 初始化 项目 

```bash
cd "vue demo"
npm install
```

## 初始化 git 仓库

```bash
git init && git add -A && git commit -m "initial commit"
```

## vue-路由

```bash
npm install vue-router@4
```

## tailwindcss

```bash
npm install tailwindcss @tailwindcss/vite
```

 `vite.config.ts`

```ts
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

 `main.css`

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
/*@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));*/
```
