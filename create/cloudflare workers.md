> 要在 VS Code 里写 JS 直接获得 Cloudflare Workers 的类型提示，最省事的方法是结合 JSDoc 和 官方类型包。  
> 按照以下步骤操作，不需要切换到 TypeScript 也能有完整的代码补全：

## 第一步：安装类型定义（本地开发依赖）

在你的项目根目录下运行（这只是为了给 VS Code 提供参考文件，不影响运行）：

```bash
npm install --save-dev @cloudflare/workers-types
```

---

## 第二步：在 `worker.js` 顶部添加类型引用

在文件最上方加入 `/// <reference types="@cloudflare/workers-types" />` ，  
它会告诉 VS Code 从哪个包加载全局类型（如 `KVNamespace` , `D1Database` 等）：

```js
/// <reference types="@cloudflare/workers-types" />
export default {
    /**
     * @param {Request} request
     * @param {Env} env
     * @param {ExecutionContext} ctx
     */
    async fetch(request, env, ctx) {
        return new Response("Hello!");
    },
};
```

> ### 进阶：全局开启（推荐）

如果你不想在每个文件顶都写 `/// <reference...` ，可以在项目根目录创建一个 `jsconfig.json` 文件：

```json
{
	"compilerOptions": {
		"types": [
			"@cloudflare/workers-types"
		]
	}
}
```

---

## 第三步：让 env (环境变量/KV/数据库) 也有提示

### 方法 A：在 JS 文件中定义（最直接）

```js
/**
 * @typedef {Object} Env
 * @property {KVNamespace} KV - 你的 KV 绑定
 * @property {D1Database} DB - 你的 D1 数据库
 * @property {string} KEY - 环境变量
 */
export default {}
```

### 方法 B：利用 Wrangler 自动生成（最专业）

如果你的 `wrangler.toml` 里已经配置了 KV 或 D1，运行：

```bash
npx wrangler types
```

这会生成一个 `worker-configuration.d.ts` 文件。只要这个文件在项目里，VS Code 就会自动把这些类型应用到你的 env 参数上。

---
