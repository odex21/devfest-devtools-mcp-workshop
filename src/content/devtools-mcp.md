MCP（Model Context Protocol）是一种让工具、服务和模型之间互通的协议。  
**Chrome DevTools MCP Server** 是由 Chrome 团队提供的 MCP Server，  
把 Chrome DevTools 的调试能力封装成一组可以远程调用的「能力节点」。

> 下面这些功能，都是我在 DevFest Workshop 中，实际通过 Codex + Chrome DevTools MCP 玩过的一圈。

---

## 1. 输入自动化：点、填、拖、传文件

典型工具：`click`、`drag`、`hover`、`fill` / `fill_form`、`press_key`、`handle_dialog`、`upload_file`

- 适用场景
  - 表单自动填充 / 回归测试（登录、搜索、下单流程）
  - 复杂 UI 操作：拖拽卡片、悬停展开菜单、处理弹窗 / confirm
  - 提前把页面「摆好姿势」——比如准备截图、录制 Demo

- 我常用的提示词示例
  - 「打开 `https://example.com/login`，帮我填写邮箱 `foo@bar.com` 和密码 `****`，点击登录按钮，登录成功后截一张图。」
  - 「在当前页面里，把第一个看起来像『提交』的蓝色按钮点一下，如果有弹窗就点击确认，然后告诉我 URL 是否发生了变化。」
  - 「帮我上传 `./assets/demo.png` 到页面上的『选择文件』输入框，上传完成后截图首屏。」

---

## 2. 导航自动化：多页、多标签的流程控制

典型工具：`new_page`、`navigate_page`、`close_page`、`select_page`、`list_pages`、`wait_for`

- 适用场景
  - 跑一遍完整的用户流程：首页 → 登录 → 控制台
  - 检查重定向、路由守卫是否按预期生效
  - 一次性打开多个 Demo 页进行对比

- 提示词示例
  - 「新开一个标签页，打开 `https://developers.chrome.com`，等页面加载完成后帮我检查 console 里有没有报错。」
  - 「在当前 tab 中依次访问 `/login` → `/dashboard`，每一步都等到主内容区域出现，再分别截图保存。」
  - 「列出当前所有已打开的页面，把标题里包含『DevFest』的那个选中，然后截一张首屏图。」

---

## 3. 模拟与设备适配：移动端 / 慢网体验

典型工具：`emulate`（网络 / CPU）、`resize_page`

- 适用场景
  - 模拟 iPhone / Pixel 等设备宽度，调响应式布局
  - 模拟 3G / 慢网，观察骨架屏、首屏 FMP 的体验
  - 在弱机环境下看动画 / 交互是否明显掉帧

- 提示词示例
  - 「把当前窗口调整到 iPhone 14 Pro 的宽高，刷新页面后截一张首屏图，帮我看看导航和 hero 有没有挤坏。」
  - 「模拟慢 3G 网络，然后重新加载当前页面，记录一下大概多少秒能看到主要内容。」
  - 「把 CPU 降速到 4×，滚动到 About 区块，观察滚动和 hover 动画是否卡顿，并写一段主观体验。」

---

## 4. 性能分析：trace + 自动 insight

典型工具：`performance_start_trace`、`performance_stop_trace`、`performance_analyze_insight`

- 适用场景
  - 快速跑一遍 trace，找出首屏的主要瓶颈
  - 对比改动前后某个页面的性能（实验 / A/B）
  - 看哪些脚本 / 资源拖慢了加载或交互响应

- 提示词示例
  - 「帮我对当前页面跑一遍性能 trace，重点看 LCP / CLS / JS 执行时间，按优先级给出 3 个最值得优化的点。」
  - 「分别在 `/` 和 `/devtools-mcp` 页面各采集一次 trace，对比哪个页面的 JS 执行时间更长，以及主要差异来自哪些文件。」
  - 「用 DevTools MCP 的性能分析能力，给 `https://developers.chrome.com` 提一份『1 小时内可以尝试的优化 TODO 列表』。」

---

## 5. 网络调试：API、缓存与第三方脚本

典型工具：`list_network_requests`、`get_network_request`

- 适用场景
  - 排查 API 失败、CORS、鉴权 header 是否带上
  - 看缓存策略（`cache-control`、`etag`），有没有明显重复请求
  - 分析第三方脚本、字体、图片对加载的影响

- 提示词示例
  - 「重新加载当前页面，列出所有返回 4xx / 5xx 的请求，告诉我 URL、状态码和大致错误。」
  - 「帮我过滤出所有 `/api/*` 请求，按响应时间从慢到快排序，列出最慢的 3 个。」
  - 「找出首屏加载过程中体积最大的三个图片资源，说明它们的大小、格式以及是否合理使用了缓存。」

---

## 6. 调试与可视化：console + JS 执行 + 截图 / 快照

典型工具：`evaluate_script`、`list_console_messages`、`get_console_message`、`take_screenshot`、`take_snapshot`

- 适用场景
  - 在真实页面上下文里执行 JS，读取全局状态 / store
  - 收集 console 报错 / warn，快速定位问题模块
  - 截图或生成语义快照，用于 Workshop 笔记或对比改动

- 提示词示例
  - 「检查当前页面的 console，列出所有 `error` 和 `warn`，按模块帮我归纳一下可能的问题来源。」
  - 「在页面上下文执行脚本，读取 `window.__APP_STATE__` 里的当前路由和用户信息，用中文解释给我听。」
  - 「帮我截一张当前页面首屏的 PNG 截图，用于 DevFest Workshop 记录；再生成一份 `take_snapshot` 的结构，列出主要的 header / main / footer 区块。」

---

## 本页面：一次真实的 DevTools MCP 协作记录

这份 DevFest Workshop Log，本身就是一次「我 + Codex GPT‑5 + Chrome DevTools MCP」协作完成的例子，大致流程是这样走下来的：

1. **打开页面 & 初步体检**  
   我在本地跑 `bun run dev`，让 Codex 通过 DevTools MCP 打开 `http://localhost:5173/`，用截图 / 快照看整体结构和是否有报错。

2. **发现布局问题 → MCP 协助排查**  
   先看 hero 区的遮挡、GDG 区块的重叠，我通过截图告诉 Codex 哪里「怪怪的」，它在浏览器里用 `evaluate_script` + `getBoundingClientRect()` 看实际布局，再给出 CSS / 组件层面的调整方案，我挑喜欢的那种落到 `index.html`。

3. **移动端适配：iPhone 尺寸调试**  
   用 DevTools MCP 模拟 iPhone 宽度，让 Codex 滚动到对应 section 截图，我们一起看导航、hero、About 在手机上是否挤在一起，然后迭代 CSS。

4. **内容结构重构：从 HTML 文案到 Markdown**  
   我提需求「希望用 Markdown 真正记录经历」，Codex 把 `index.html` 里的几块大段内容拆成 `src/content/*.md`，在 `main.js` 里用 `marked` 渲染回页面 —— 之后我就可以直接改 md，而不是在一堆标签里找文案。

5. **DevTools MCP 章节：从概念到「能直接用的提示词」**  
   在我说「想更具体讲功能」之后，Codex 先列出 MCP server 暴露的能力，再按功能块（输入、导航、模拟、性能、网络、调试）重写这一节，并给出一堆可以直接复制到对话里的中文提示词。

6. **个人介绍 & GitHub 入口微调**  
   我觉得关于我的那块太长 / 布局不好看，Codex 帮忙压缩文案、用 DaisyUI hero / card / avatar / 按钮重排 About 区，并用 DevTools MCP 看桌面和手机视图，确保这块也不会「凸出来」。

从我的视角，这一整套流程更像是：  
我用自然语言说「哪里不顺眼」和「想要什么效果」，  
Codex + DevTools MCP 负责「看页面、动 DevTools、改代码」，  
最后再由我自己来决定文案和故事要怎么讲。

---

### 我自己的总结

对我来说，DevTools MCP 不是一个「新的框架」，  
而是一种把已有浏览器调试能力 **结构化、可组合、可远程调用** 的方式。  
当它和 GitHub Pages、CI/CD、自动化脚本甚至 AI Agent 结合时，
就变成了一套「可以被对话式调用的 DevTools」，  
调试 / 自动化 / 记录 Workshop 的边界都会被拉大很多。 
