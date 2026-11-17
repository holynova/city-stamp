<p align="center">
  <img src="./assets/readme/hero.svg" width="100%" alt="城市印记 · 徽章打卡档案 — 把走过的地方，收进会发光的六边形徽章与三维卡片；右侧三枚六边形徽章分别代表北京、上海、苏州">
</p>

<p align="center">
  <a href="https://xiaosang.cc/city-stamp/">▶ 在线体验 Play Online</a>
  ·
  <a href="https://github.com/holynova/city-stamp">GitHub 仓库</a>
</p>

城市印记是一座城市漫步打卡档案馆：收录上海、苏州、北京、杭州 4 座城市各 10 个地标，共 40 枚六边形金属徽章。未点亮时是深邃灰阶与金属哑光，点击点亮后即时激活霓虹辉光，并记录打卡时间；进度保存在浏览器本地，可随时生成分享卡片、拼成一面徽章墙。

City Stamp is a city-walk check-in archive: 40 hexagonal metal badges for 10 landmarks in each of Shanghai, Suzhou, Beijing and Hangzhou. Unlit badges are deep grayscale with a matte metal finish; tapping one lights it up with a neon glow and records the check-in time. Progress is saved in the browser, and your lit badges can be shared as a card or assembled into a check-in wall.

## 截图 / Screenshot

<p align="center">
  <img src="./assets/readme/screenshot.jpg" width="100%" alt="城市印记运行截图：上海 10 枚徽章，外滩、东方明珠等已点亮呈彩色，田子坊、朱家角未点亮呈灰阶；下方是把走过的地方拼成一面墙的徽章墙">
</p>

## 玩法 / How It Works

- **点亮打卡**：点击徽章点亮，记录到访时间；再点一次取消打卡。打卡记录保存在浏览器 localStorage，刷新不丢失。
- **三维视差**：徽章随指针移动产生多层视差，呈现金属质感与厚度；点开可全屏查看 3D 大图。
- **徽章墙**：所有已点亮的徽章拼成蜂窝马赛克墙，支持 75%–160% 缩放平移，一览四城探索进度。
- **打卡日志**：按时间倒序列出全部打卡记录，点击可回到对应徽章。
- **分享卡片**：一键生成包含已解锁徽章阵列、城市完成率与打卡日期的分享卡片图片。
- **重置档案**：可清空全部打卡记录（操作前二次确认）。

## 收录清单 / Collection

4 座城市，每城 10 枚徽章：

| 城市 | 地标 |
|---|---|
| 上海 | 外滩、东方明珠、豫园、武康路、上海博物馆、田子坊、朱家角、上海迪士尼、上海天文馆、徐家汇书院 |
| 苏州 | 拙政园、狮子林、平江路、山塘街、寒山寺、苏州博物馆、留园、诚品书店、同里古镇、金鸡湖 |
| 北京 | 故宫、天安门广场、八达岭长城、颐和园、天坛、798 艺术区、胡同漫游、国家大剧院、雍和宫、景山公园 |
| 杭州 | 西湖、灵隐寺、雷峰塔、断桥残雪、西溪湿地、京杭大运河、六和塔、河坊街、龙井村、良渚古城遗址公园 |

## 本地运行 / Run Locally

```bash
npm install
npm run dev      # 开发服务器
npm run build    # 构建生产版本
```

## 技术 / Tech

- Vite 6 + React 19，Phosphor 图标，IBM Plex Sans / Mono 字体。
- 徽章图以 PNG + WebP 双格式存放在 `public/badges/` 与 `public/badges-webp/`，共 40 枚。
- 打卡状态用 localStorage 持久化；分享卡片用 Canvas 绘制导出。

```
index.html              入口
src/App.jsx             全部界面与逻辑：徽章列表、徽章墙、日志、分享卡片
src/styles.css          深色档案馆风格样式
src/main.jsx            React 入口
public/badges/          40 枚徽章 PNG 原图
public/badges-webp/     40 枚徽章 WebP 图
scripts/prepare-sites-build.mjs   构建后处理
tests/sites-worker.test.mjs       站点测试（node --test）
```

## English

**City Stamp** is a city-walk check-in archive: 40 hexagonal metal badges covering 10 landmarks each in Shanghai, Suzhou, Beijing and Hangzhou. Tap a badge to light it up with a neon glow and record the visit time; tap again to undo. Progress persists in localStorage.

- **3D parallax**: badges tilt with the pointer, showing metal depth; tap to view a full-screen 3D close-up.
- **Check-in wall**: lit badges form a honeycomb mosaic wall, zoomable from 75% to 160%.
- **Journal & sharing**: all check-ins listed newest-first; generate a shareable card with your unlocked badges, per-city completion and dates. Reset is available with a confirmation step.
- **Run it**: `npm install && npm run dev` (Vite 6 + React 19). Build with `npm run build`.
- **Tech**: Vite 6 + React 19, Phosphor icons, IBM Plex fonts; 40 badge artworks in PNG + WebP under `public/badges/`.

## 许可 / License

MIT（`package.json` 声明；仓库内暂无 LICENSE 文件）。
