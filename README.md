# Macaber.github.io

Macaber 的个人博客与 Markdown 文档站。

## 写一篇文档

在 `docs/`（支持子目录）中新建 `.md` 文件。建议添加：

```yaml
---
title: 文档标题
description: 显示在主页目录中的简介
date: 2026-09-01
tags: [Tag1, Tag2]
---
```

推送至 `main` 或 `master` 后，GitHub Actions 会自动构建并发布。文档会出现在主页目录，并生成 `/docs/文件名/` 页面。

## 本地预览

```bash
node scripts/build.mjs
python3 -m http.server 4173 -d _site
```
