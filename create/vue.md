## 创建 vue 项目

```bash
npm create vue@latest
```

```sh
# npx degit <你的用户名>/<仓库名> <新项目名称>
npx degit sharkbee80/vue-template vue-app
# cd vue-app
# npx npm-check-updates -u
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
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [tailwindcss()],
});
```

`main.css`

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
/*@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));*/
```

## router

`router/index.ts`

```ts
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      name: "home",
      component: "@/views/Home.vue",
    },
    {
      path: "/set",
      name: "set",
      component: () => import("@/views/Set.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/404.vue"),
    },
  ],
});

export default router;
```
