# 城市印记 · City Stamp

把走过的城市地标，收进一枚会发光的六边形徽章。

这是一个自包含的 React + Vite 静态站原型，从上海、苏州、北京开始，每座城市收录 10 个地标。徽章默认处于灰色的待发现状态，点击后会变色、发光，并将本地时间写入浏览器档案；记录会保存在 `localStorage`，不需要账号、GPS 或后端。

每枚徽章的中心图像都对应一个真实地标主题，素材位于 `public/badges/`，使用透明背景的纸雕 / 版画风插画；锁定时灰度显示，打卡后恢复城市色彩。

## 本地运行

```bash
npm install
npm run dev
```

## 构建与测试

```bash
npm run build
npm run test:sites
```

推送到 `main` 后，`.github/workflows/pages.yml` 会构建 `dist/client` 并发布到 GitHub Pages。仓库的 Pages 设置需要选择 **GitHub Actions** 作为发布来源。
