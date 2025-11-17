# DevFest DevTools MCP Workshop Log

> 记录我在 Google DevFest Workshop 中，围绕 **Chrome DevTools MCP Server** 的一次实践。

这个仓库是一份「活动官网风格」的单页网站，用来记录：

- GDG & DevFest 的社区氛围
- Chrome DevTools MCP 的概念和实操
- 我自己（odex）在这次 Workshop 中的收获与配置记录

> 特别说明：页面内容与布局是由 **Codex GPT‑5 + Chrome DevTools MCP + 我自己** 一起协作完成的。

线上版通过 **GitHub Pages** 发布。

---

## 技术栈

- **构建工具**：Vite 7
- **包管理 / 运行时**：Bun（推荐用 `bun` 而不是 `npm`）
- **样式**：
  - 手写 CSS（放在 `index.html`，偏 Google / DevFest / Material Design 风格）
  - Tailwind CSS + DaisyUI（通过 PostCSS 注入，方便后续扩展组件）
- **部署**：GitHub Actions → GitHub Pages（项目页）

---

## 本地开发

前置：本机安装了 Bun（1.2.x）。

```bash
# 安装依赖
bun install

# 启动开发服务器（默认 http://localhost:5173/）
bun run dev
```

然后可以通过浏览器访问 `http://localhost:5173/`，或者在 VS Code + DevTools MCP Server 中，让代理打开这个页面调试布局和样式。

---

## 构建 & 预览

```bash
# 生产构建
bun run build

# 本地预览构建产物
bun run preview
```

构建输出在 `dist/` 目录，GitHub Pages 也是部署这份产物。

---

## 部署（GitHub Pages + Actions）

仓库里已经配置好了工作流：`.github/workflows/deploy.yml`。

大致流程：

1. 当 push 到 `main`，或者手动触发 workflow 时：
   - 使用 `oven-sh/setup-bun@v2` 安装 Bun（版本目前固定为 `1.2.19`）
   - `bun install`
   - `bun run build`（Vite 构建到 `dist/`）
   - 上传 `dist/` 为 Pages artifact
2. 之后 `deploy` Job 调用 `actions/deploy-pages@v4`，发布到 GitHub Pages。

在仓库的 Settings → Pages 中，记得把 Source 设置为「GitHub Actions」。

---

## Chrome DevTools MCP 配置（VS Code + Codex）

在 DevFest Workshop 中，我使用 VS Code + Codex + Chrome DevTools MCP Server 来调这个页面。  
Codex 使用 **TOML** 格式来配置 MCP Server，大致配置示例（节选）：

```toml
# ~/.codex/config.toml 中的节选
[mcp_servers.chrome-devtools]
command = "npx"
args = ["-y", "chrome-devtools-mcp@latest"]
# 可按需加入环境变量，比如指定 Chrome 路径：
# env = { CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" }
```

配置完成后，在 VS Code 里打开 Codex：

- 选择 `chrome-devtools` 这个 MCP server
- 让它打开 `http://localhost:5173/` 或打包好的 `dist/index.html`
- 执行诸如：
  - 选择 / 高亮特定元素
  - 临时调整样式、检查布局
  - 截图整页，记录 Workshop 的阶段性成果

本仓库中的很多样式调整，都是通过 DevTools MCP 先在浏览器里试，再落回 `index.html` 的。

---

## 主要文件说明

- `index.html`  
  单页应用入口，包含：
  - 活动首页（Hero）+ GDG & DevFest + DevTools MCP + 关于我
  - 自定义 CSS（卡片、栅格、响应式布局等）
  - 简单的导航滚动脚本

- `src/main.css`  
  Tailwind CSS / DaisyUI 的入口，当前只引入了基础层，你可以按需添加组件类或工具类。

- `src/main.js`  
  通过 ES Module 引入 `main.css`，供 Vite 打包。

- `tailwind.config.cjs` / `postcss.config.cjs`  
  Tailwind + DaisyUI + PostCSS 配置。

- `vite.config.mjs`  
  Vite 配置，包含 GitHub Pages 所需的 `base` 路径。

- `.github/workflows/deploy.yml`  
  GitHub Actions 工作流，使用 Bun 进行依赖安装与构建，并发布到 GitHub Pages。

---

## 后续可以做的事

- 把部分手写卡片（比如 DevTools MCP 区）逐步替换为 DaisyUI 组件，统一一部分样式。
- 增加更多「真实记录」内容，例如：
  - 在 Workshop 中踩过的坑
  - 具体 MCP 调用场景的截图
  - 对 DevTools MCP 官方文档（Chrome 开发者博客）的个人理解笔记。
