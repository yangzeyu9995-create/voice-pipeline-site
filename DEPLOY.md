# 部署与更新说明

Voice Pipeline Tooling 展示页的线上部署与后续更新流程记录。

## 基本信息

| 项 | 值 |
| --- | --- |
| Production 链接 | https://voice-pipeline-site.vercel.app |
| GitHub 仓库 | voice-pipeline-site |
| Vercel 项目 | voice-pipeline-site |
| 本地项目目录 | D:\vscode\2026\_ui_reference\voice-pipeline-site |
| 部署方式 | Vercel（GitHub push 后自动构建部署） |
| 主分支 | main |
| Build Command | npm run build |
| Output Directory | dist |

> 贴到绩效系统 / 对外分享时，只使用上面的 **Production 链接**。
> 不要贴 Vercel 每次部署生成的 deployment preview 链接（带随机字符那种），那是临时地址。

## 后续更新流程

在本地项目目录改完内容后，执行：

```
git add .
git commit -m "update content"
git push
```

只要继续 push 到 `main` 分支，Vercel 会自动重新构建并更新**同一个** Production 链接，地址保持不变。

- 不要新建 Vercel 项目，否则链接会变。
- 不要新建 GitHub 仓库，一直 push 到 `voice-pipeline-site` 即可。

## 关键配置（已就位，勿随意改动）

- `vercel.json`：配置了 SPA rewrite，保证详情页（如 `/project/voice-finder`）刷新不 404。
- `.gitignore`：已排除 `node_modules/` 和 `dist/`，不会把依赖和构建产物提交进仓库。
- 路由使用 `createBrowserRouter`（HTML5 history），依赖上面的 rewrite 才能正常刷新。
