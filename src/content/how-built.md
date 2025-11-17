这整个页面，本身就是一次「我 + Codex GPT‑5 + Chrome DevTools MCP」协作完成的实验。

大致流程可以拆成几步：

1. **起服务 & 让 Codex 打开页面**  
   本地跑 `bun run dev`，然后让 Codex 通过 Chrome DevTools MCP 打开 `http://localhost:5173/`，顺便看 console / network 里有没有明显报错。

2. **用截图和快照对齐「哪里不好看」**  
   我用手机 / PC 的截图标出不满意的地方（hero 遮挡、GDG 重叠、About 太长等），Codex 用 DevTools MCP 的截图、快照和 `evaluate_script` 看 DOM / CSS 的真实状态，再提具体修改方案。

3. **边看真实页面边改代码**  
   每次调整布局或样式时，Codex 会先在浏览器里试（通过 DevTools MCP），确认视觉 OK 后，再把对应的 HTML / CSS / Tailwind / DaisyUI 改回项目代码里。

4. **把内容从 HTML 抽出来，用 Markdown 重新组织**  
   我提需求「想用 Markdown 真正写 Workshop 日志」，Codex 就把原来写死在 `index.html` 里的段落拆成 `src/content/*.md`，由 `main.js` 统一渲染。之后我只要改 md 文件就能调整整页文案。

5. **围绕 DevTools MCP 做一节「功能 + 提示词」**  
   在我说「想更具体介绍 MCP 能力」之后，我们把 MCP Server 的功能整理成 6 大类，并为每一类写了真实可用的中文提示词——现在你可以直接复制那一节的内容在 Codex 里用。

6. **收尾细节：个人介绍、GitHub 入口和 footer 声明**  
   最后是关于我、GitHub 入口和页脚的小心思：头像可以点击、GitHub 用 Icon 按钮呈现，footer 明确写着「由 Codex GPT‑5、Chrome DevTools MCP 和我共同完成」。

对我来说，这一整套体验非常像在和一个「住在 DevTools 里的搭档」配合：  
我负责说需求和主观感受，  
Codex + DevTools MCP 负责看页面、动浏览器、改代码，  
最后这份页面就既是 Workshop 记录，也是一次协作过程的快照。

