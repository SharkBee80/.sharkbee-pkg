# tampermonkey 脚本

## 创建项目

```sh
pnpm create monkey
// or
pnpm install vite-plugin-monkey --save-dev
```

## 配置 vite.config.ts

```ts
export default defineConfig({
  plugins: [
    monkey({
      entry: "src/main.ts",
      userscript: {},
    }),
  ],
});
```

## 配置 main.ts

```ts
import { App, createApp } from "vue";
import "./style.css";
import A from "./App.vue";
import { GM_registerMenuCommand } from "$";

// 注册到油猴菜单中
GM_registerMenuCommand("打开脚本设置", () => {
  toggleSettings();
});

let app: App | null = null;
let container: HTMLDivElement | null = null;

const toggleSettings = () => {
  if (app) {
    app.unmount();
    container?.remove();
    app = null;
    container = null;
  } else {
    container = document.createElement("div");
    document.body.appendChild(container);

    // 使用 Shadow DOM 隔离样式（防止被原网页样式弄乱）
    const shadow = container.attachShadow({ mode: "open" });
    const root = document.createElement("div");
    shadow.appendChild(root);
    app = createApp(A);
    app.mount(root);
  }
};
```
