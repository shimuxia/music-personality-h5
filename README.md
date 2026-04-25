# 音乐人格测试 / 天命音符 MVP

一个基于 `React + TypeScript + Vite + Tailwind CSS` 的静态 H5 MVP。

目标是先做出一个可运行、可部署、结构清晰、方便继续迭代审美与玩法的前端项目，不接数据库、不做登录、不做伪复杂功能。

## 为什么选这套技术栈

- `React`：组件化表达清晰，后续接正式产品时容易继续拆分首页、测试流程、结果页和活动页。
- `TypeScript`：题库、结果映射、计分逻辑都能类型约束，后续加题或改人格设定不容易出错。
- `Vite`：本地启动快、打包简单，适合 H5/活动页快速迭代。
- `Tailwind CSS`：适合快速搭出统一视觉语言，也方便后续持续微调审美细节。

## 已实现内容

- 首页
  - 钩子文案
  - 开始测试入口
  - 产品定位说明
  - 7 个音符人格预览
- 测试页
  - 8 道题
  - 单选逐题切换
  - 进度条
  - 返回首页重测
- 结果页
  - 天命音符
  - 人格标题、副标题、描述、关键词
  - 结果视觉卡片
  - 复制分享文案
  - 截图保存引导
  - 未来正式版玩法引导
- 数据与逻辑
  - 独立题库数据
  - 独立结果映射数据
  - 可扩展计分逻辑
  - 清晰类型定义

## 项目结构

```text
music-personality-h5
├─ public
├─ src
│  ├─ components
│  │  ├─ result
│  │  │  └─ ResultCard.tsx
│  │  └─ shared
│  │     ├─ GlassPanel.tsx
│  │     └─ Tag.tsx
│  ├─ data
│  │  ├─ questions.ts
│  │  └─ results.ts
│  ├─ lib
│  │  └─ quiz.ts
│  ├─ pages
│  │  ├─ HomePage.tsx
│  │  ├─ QuizPage.tsx
│  │  └─ ResultPage.tsx
│  ├─ types
│  │  └─ quiz.ts
│  ├─ App.tsx
│  ├─ index.css
│  └─ main.tsx
├─ index.html
├─ tailwind.config.js
├─ postcss.config.js
└─ package.json
```

## 本地运行

```bash
npm install
npm run dev
```

打开浏览器访问本地开发地址即可。

## 打包

```bash
npm run build
```

打包产物会输出到 `dist/` 目录。

## 本地预览打包结果

```bash
npm run preview
```

## 部署建议

这是纯前端静态项目，适合直接部署到：

- Vercel
- Netlify
- Cloudflare Pages
- 任意 Nginx 静态站点

构建命令：

```bash
npm run build
```

发布目录：

```bash
dist
```

## 后续建议

- 继续打磨结果卡的视觉层次，比如更细的光感、噪点、音波细节。
- 增加结果卡导出图片能力，提升传播完整度。
- 增加更多题库和隐藏分支，让人格分布更细腻。
- 接入埋点前先补一层本地事件设计，方便未来分析转化漏斗。
- 把“未来正式版引导”做成更强 CTA，比如预约入口或玩法预告页。
