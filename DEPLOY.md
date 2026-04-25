# 部署指南 - Vercel 部署

本指南将详细介绍如何将"音乐人格测试 / 天命音符"项目部署到 Vercel 平台。

## 前置准备

1. **确保项目构建成功**
   ```bash
   npm run build
   ```
   确认没有错误输出。

2. **将代码推送到 GitHub**
   确保你的项目代码已经上传到 GitHub 仓库。

## 第一步：注册并登录 Vercel

1. 访问 [https://vercel.com](https://vercel.com)
2. 点击右上角 **"Sign Up"** 或 **"Login"**
3. 选择 **"Continue with GitHub"** （推荐）
4. 授权 Vercel 访问你的 GitHub 账户

## 第二步：连接 GitHub 仓库

1. 登录成功后，点击 **"New Project"** 或 **"Add New..."** → **"Project"**
2. 在 **"Import Git Repository"** 区域找到你的项目仓库
3. 如果没看到，点击 **"Adjust GitHub App Permissions"** 添加仓库权限
4. 找到 `music-personality-h5` 仓库，点击 **"Import"**

## 第三步：配置部署设置

在项目配置页面，按以下方式填写：

### 基础设置
- **Project Name**: `music-personality-test`（或你喜欢的名字）
- **Framework Preset**: 选择 **"Vite"**
- **Root Directory**: 保持默认 `./`（除非你的项目在子目录）

### 构建设置
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: 保持默认 `npm install`

### 环境变量
目前项目不需要环境变量，跳过此步骤。

## 第四步：开始部署

1. 确认所有设置正确后，点击 **"Deploy"**
2. Vercel 会自动：
   - 克隆你的仓库
   - 安装依赖 (`npm install`)
   - 运行构建 (`npm run build`)
   - 部署到 CDN
3. 等待 2-5 分钟，部署完成后会显示成功页面
4. 记录你的部署域名，类似：`https://music-personality-test.vercel.app`

## 第五步：验证部署

1. 点击 Vercel 提供的域名链接
2. 测试网站各个功能：
   - 首页加载正常
   - 开始测试按钮能点击
   - 测试流程能正常走完
   - 结果页能正常显示
   - 复制分享功能正常

## 如何重新部署

### 自动部署（推荐）
每次你向 GitHub 推送代码，Vercel 会自动重新部署：
```bash
git add .
git commit -m "更新内容"
git push origin main
```

### 手动重新部署
1. 登录 Vercel Dashboard
2. 找到你的项目
3. 点击项目名称进入详情页
4. 点击 **"Deployments"** 标签页
5. 点击最新部署旁的 **"..."** 菜单
6. 选择 **"Redeploy"**

## 自定义域名（可选）

如果你有自己的域名：

1. 在项目 Dashboard 点击 **"Settings"**
2. 点击 **"Domains"**
3. 点击 **"Add"** 输入你的域名
4. 根据提示配置 DNS 记录

## 常见问题

### 构建失败
- 检查 `npm run build` 在本地是否能成功运行
- 查看 Vercel 构建日志中的错误信息
- 确认 `package.json` 中的依赖版本正确

### 页面显示空白
- 检查构建输出目录是否正确设置为 `dist`
- 确认 `index.html` 文件在 `dist` 目录中

### 刷新页面 404
- Vite 项目通常不会有这个问题
- 如果遇到，在 Vercel 项目设置中添加 `vercel.json` 重定向规则

## 监控和分析

1. Vercel Dashboard 提供：
   - 部署状态和历史
   - 访问日志
   - 性能分析
   - 错误监控

2. 建议启用：
   - **Vercel Analytics** - 访问量统计
   - **Speed Insights** - 性能监控

## 联系支持

如果遇到部署问题：
1. 查看 [Vercel 文档](https://vercel.com/docs)
2. 访问 [Vercel 社区](https://github.com/vercel/vercel/discussions)
3. 检查项目构建日志获取详细错误信息

---

## 小贴士

- **预览部署**: 每个 Pull Request 都会创建预览部署，方便测试
- **环境分支**: `main` 分支自动部署到生产环境
- **回滚**: 可以随时回滚到任何历史版本
- **CDN 缓存**: Vercel 自动提供全球 CDN 加速