import { useEffect, useMemo, useRef, useState } from "react";
import {
  Archive,
  ArrowClockwise,
  ArrowUpRight,
  ArrowsOut,
  Boat,
  Books,
  Bridge,
  Building,
  Buildings,
  CastleTurret,
  Check,
  Church,
  Clock,
  Compass,
  Hexagon,
  ListChecks,
  LockKey,
  MapPinLine,
  Medal,
  Mountains,
  MusicNotes,
  Palette,
  Park,
  Planet,
  Radio,
  SealCheck,
  ShareNetwork,
  DownloadSimple,
  Copy,
  Sparkle,
  Storefront,
  SunHorizon,
  Tree,
  TreeStructure,
  Waves,
  X,
} from "@phosphor-icons/react";
import "@fontsource-variable/ibm-plex-sans";
import "@fontsource/ibm-plex-mono";

const STORAGE_KEY = "city-stamp-progress-v1";

const cities = [
  {
    id: "shanghai",
    name: "上海",
    english: "SHANGHAI",
    short: "沪",
    countLabel: "海派十章",
    phrase: "江与天际线在这里相遇",
    accent: "#df705d",
    accentSoft: "#743a35",
    accentInk: "#ffb29a",
  },
  {
    id: "suzhou",
    name: "苏州",
    english: "SUZHOU",
    short: "苏",
    countLabel: "园林十章",
    phrase: "一转身，水巷就入了画",
    accent: "#65b8a6",
    accentSoft: "#315f58",
    accentInk: "#b3ead6",
  },
  {
    id: "beijing",
    name: "北京",
    english: "BEIJING",
    short: "京",
    countLabel: "城脉十章",
    phrase: "古老的秩序，仍在风里回响",
    accent: "#d2a258",
    accentSoft: "#6b4b2e",
    accentInk: "#f5d497",
  },
  {
    id: "hangzhou",
    name: "杭州",
    english: "HANGZHOU",
    short: "杭",
    countLabel: "湖山十章",
    phrase: "西湖、茶山与运河，慢慢收好一城春色",
    accent: "#76b8a4",
    accentSoft: "#35695d",
    accentInk: "#bdebd8",
  },
];

const iconMap = {
  archive: Archive,
  boat: Boat,
  books: Books,
  bridge: Bridge,
  building: Building,
  buildings: Buildings,
  castle: CastleTurret,
  church: Church,
  map: MapPinLine,
  mountains: Mountains,
  music: MusicNotes,
  palette: Palette,
  park: Park,
  planet: Planet,
  radio: Radio,
  sun: SunHorizon,
  tree: Tree,
  garden: TreeStructure,
  waves: Waves,
};

const landmarks = [
  { id: "shanghai-bund", city: "shanghai", title: "外滩", english: "THE BUND", district: "黄浦 · 江岸", description: "沿着黄浦江看一座城市的两种天际线。", icon: "buildings" },
  { id: "shanghai-oriental-pearl", city: "shanghai", title: "东方明珠", english: "ORIENTAL PEARL", district: "陆家嘴 · 塔影", description: "在江面和霓虹之间，找到上海的垂直坐标。", icon: "radio" },
  { id: "shanghai-yuyuan", city: "shanghai", title: "豫园", english: "YU GARDEN", district: "城隍庙 · 园林", description: "曲桥、漏窗与一方池水，收拢老城的尺度。", icon: "garden" },
  { id: "shanghai-wukang", city: "shanghai", title: "武康路", english: "WUKANG ROAD", district: "徐汇 · 梧桐", description: "梧桐树影把旧建筑的故事一页页翻开。", icon: "tree" },
  { id: "shanghai-museum", city: "shanghai", title: "上海博物馆", english: "SHANGHAI MUSEUM", district: "人民广场 · 文脉", description: "在青铜、陶瓷与书画之间，遇见时间的重量。", icon: "archive" },
  { id: "shanghai-tianzifang", city: "shanghai", title: "田子坊", english: "TIANZIFANG", district: "泰康路 · 巷弄", description: "旧里弄里藏着工作室、香气和不期而遇。", icon: "storefront" },
  { id: "shanghai-zhujiajiao", city: "shanghai", title: "朱家角", english: "ZHUJIAJIAO", district: "青浦 · 水乡", description: "一桨划开水面，明清街巷沿河慢慢展开。", icon: "boat" },
  { id: "shanghai-disney", city: "shanghai", title: "上海迪士尼", english: "SHANGHAI DISNEY", district: "浦东 · 乐园", description: "把一整天交给城堡、烟火和童心。", icon: "castle" },
  { id: "shanghai-astronomy", city: "shanghai", title: "上海天文馆", english: "ASTRONOMY MUSEUM", district: "临港 · 星轨", description: "向上看，城市的边缘连接到更大的夜空。", icon: "planet" },
  { id: "shanghai-library", city: "shanghai", title: "徐家汇书院", english: "XUJIAHUI LIBRARY", district: "徐汇 · 阅读", description: "从一张长桌出发，把午后的安静带回家。", icon: "books" },
  { id: "suzhou-humble-garden", city: "suzhou", title: "拙政园", english: "HUMBLE ADMINISTRATOR'S GARDEN", district: "姑苏 · 园林", description: "借一片水面，把远山和季节留在窗里。", icon: "garden" },
  { id: "suzhou-lion-grove", city: "suzhou", title: "狮子林", english: "LION GROVE", district: "姑苏 · 叠石", description: "太湖石的迷宫，让每个转角都像一次探险。", icon: "mountains" },
  { id: "suzhou-pingjiang", city: "suzhou", title: "平江路", english: "PINGJIANG ROAD", district: "姑苏 · 水巷", description: "沿着平江河走，白墙黛瓦和日常并肩。", icon: "map" },
  { id: "suzhou-shantang", city: "suzhou", title: "山塘街", english: "SHANTANG STREET", district: "姑苏 · 古街", description: "一河一街七里，灯影把晚风照成了旧色。", icon: "bridge" },
  { id: "suzhou-hanshan", city: "suzhou", title: "寒山寺", english: "HANSHAN TEMPLE", district: "姑苏 · 钟声", description: "一声钟响穿过夜色，落在运河的水面上。", icon: "church" },
  { id: "suzhou-museum", city: "suzhou", title: "苏州博物馆", english: "SUZHOU MUSEUM", district: "姑苏 · 贝聿铭", description: "几何屋顶借来天光，园林从室外延伸进室内。", icon: "archive" },
  { id: "suzhou-lingering", city: "suzhou", title: "留园", english: "LINGERING GARDEN", district: "姑苏 · 留白", description: "一扇月洞门，框住一段恰到好处的风景。", icon: "tree" },
  { id: "suzhou-eslite", city: "suzhou", title: "诚品书店", english: "ESLITE SPECTRUM", district: "金鸡湖 · 文化", description: "书页与湖光相邻，夜晚也可以慢慢逛。", icon: "books" },
  { id: "suzhou-tongli", city: "suzhou", title: "同里古镇", english: "TONGLI", district: "吴江 · 水乡", description: "退思园外，船橹声把古镇的时间划得很慢。", icon: "boat" },
  { id: "suzhou-jinji", city: "suzhou", title: "金鸡湖", english: "JINJI LAKE", district: "园区 · 湖畔", description: "在湖边等一场日落，看城市把自己倒映完整。", icon: "waves" },
  { id: "beijing-forbidden-city", city: "beijing", title: "故宫", english: "FORBIDDEN CITY", district: "东城 · 宫墙", description: "穿过一道道门，红墙把六百年的秩序展开。", icon: "castle" },
  { id: "beijing-tiananmen", city: "beijing", title: "天安门广场", english: "TIANANMEN SQUARE", district: "东城 · 中轴", description: "站在中轴线上，看一座城如何面向天空。", icon: "building" },
  { id: "beijing-great-wall", city: "beijing", title: "八达岭长城", english: "THE GREAT WALL", district: "延庆 · 山脊", description: "沿着山脊走，让烽火台把视线送到更远处。", icon: "mountains" },
  { id: "beijing-summer-palace", city: "beijing", title: "颐和园", english: "SUMMER PALACE", district: "海淀 · 昆明湖", description: "长廊、湖面与万寿山，组成一幅可行走的画。", icon: "park" },
  { id: "beijing-temple-of-heaven", city: "beijing", title: "天坛", english: "TEMPLE OF HEAVEN", district: "东城 · 祈年", description: "蓝色穹顶之下，古人的天地方圆仍有回声。", icon: "sun" },
  { id: "beijing-798", city: "beijing", title: "798 艺术区", english: "798 ART DISTRICT", district: "朝阳 · 艺术", description: "红砖厂房里，展览和城市灵感彼此点亮。", icon: "palette" },
  { id: "beijing-hutongs", city: "beijing", title: "胡同漫游", english: "HUTONG WALK", district: "东城 · 巷陌", description: "绕过一棵老槐树，四合院的日常就在门后。", icon: "map" },
  { id: "beijing-ncp", city: "beijing", title: "国家大剧院", english: "NATIONAL GRAND THEATRE", district: "西城 · 水院", description: "一枚漂浮在水面的穹顶，收纳整座城市的声音。", icon: "music" },
  { id: "beijing-lama-temple", city: "beijing", title: "雍和宫", english: "LAMA TEMPLE", district: "东城 · 香火", description: "金色屋檐和檀香，让闹市忽然慢下半拍。", icon: "church" },
  { id: "beijing-jingshan", city: "beijing", title: "景山公园", english: "JINGSHAN PARK", district: "西城 · 城眺", description: "登上山顶回望，故宫的轴线一览无余。", icon: "tree" },
  { id: "hangzhou-west-lake", city: "hangzhou", title: "西湖", english: "WEST LAKE", district: "西湖 · 湖光", description: "一片湖水收拢山色、柳影与城市的晚风。", icon: "waves" },
  { id: "hangzhou-lingyin", city: "hangzhou", title: "灵隐寺", english: "LINGYIN TEMPLE", district: "西湖 · 禅意", description: "古木与山门之间，香火把喧闹留在远处。", icon: "church" },
  { id: "hangzhou-leifeng", city: "hangzhou", title: "雷峰塔", english: "LEIFENG PAGODA", district: "西湖 · 夕照", description: "登塔望湖，夕阳把雷峰的轮廓染成一枚金印。", icon: "castle" },
  { id: "hangzhou-broken-bridge", city: "hangzhou", title: "断桥残雪", english: "BROKEN BRIDGE", district: "西湖 · 冬景", description: "断桥不是终点，雪意沿着湖面慢慢铺开。", icon: "bridge" },
  { id: "hangzhou-xixi", city: "hangzhou", title: "西溪湿地", english: "XIXI WETLAND", district: "西溪 · 湿地", description: "一支橹、一片芦苇，水巷把时间划得很慢。", icon: "boat" },
  { id: "hangzhou-grand-canal", city: "hangzhou", title: "京杭大运河", english: "GRAND CANAL", district: "拱宸桥 · 运河", description: "桥影与灯火一起落进京杭大运河的水面。", icon: "bridge" },
  { id: "hangzhou-liuhe", city: "hangzhou", title: "六和塔", english: "LIUHE PAGODA", district: "滨江 · 钱塘", description: "六和塔守着江潮，远山与帆影在天边并行。", icon: "building" },
  { id: "hangzhou-hefang", city: "hangzhou", title: "河坊街", english: "HEFANG STREET", district: "上城 · 老城", description: "沿着青石街走，灯笼、木窗和湖光在这里相遇。", icon: "building" },
  { id: "hangzhou-longjing", city: "hangzhou", title: "龙井村", english: "LONGJING VILLAGE", district: "西湖 · 茶山", description: "茶坡沿着山势起伏，晨雾里只听见一城茶香。", icon: "tree" },
  { id: "hangzhou-liangzhu", city: "hangzhou", title: "良渚古城遗址公园", english: "LIANGZHU ANCIENT CITY", district: "余杭 · 玉琮", description: "水网与土台留下五千年前的良渚回声。", icon: "mountains" },
];

const totalLandmarks = landmarks.length;
const PUBLIC_SHARE_URL = "https://holynova.github.io/city-stamp/";

function getStoredProgress() {
  if (typeof window === "undefined") return {};
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function trackEvent(name, data) {
  if (typeof window === "undefined") return;
  window.umami?.track?.(name, data);
}

function formatDate(value) {
  if (!value) return "尚未记录";
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(value)).replace(/\//g, ".");
}

function getWallRows(items) {
  const rowCapacities = [];
  let capacity = 0;
  while (capacity < items.length) {
    const rowCapacity = rowCapacities.length % 2 === 0 ? 5 : 4;
    rowCapacities.push(rowCapacity);
    capacity += rowCapacity;
  }

  const rowCounts = rowCapacities.map(() => 0);
  let remaining = items.length;
  rowCapacities.forEach((rowCapacity, rowIndex) => {
    const rowsLeft = rowCapacities.length - rowIndex;
    const targetCount = Math.ceil(remaining / rowsLeft);
    rowCounts[rowIndex] = Math.min(rowCapacity, targetCount);
    remaining -= rowCounts[rowIndex];
  });

  const rows = [];
  let cursor = 0;
  rowCounts.forEach((rowCount) => {
    rows.push(items.slice(cursor, cursor + rowCount));
    cursor += rowCount;
  });
  return rows;
}

function drawHexPath(context, x, y, width, height) {
  context.beginPath();
  context.moveTo(x + width / 2, y);
  context.lineTo(x + width, y + height * 0.25);
  context.lineTo(x + width, y + height * 0.75);
  context.lineTo(x + width / 2, y + height);
  context.lineTo(x, y + height * 0.75);
  context.lineTo(x, y + height * 0.25);
  context.closePath();
}

function loadShareArtwork(landmark) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = new URL(`./badges/${landmark.id}.png`, document.baseURI).href;
  });
}

async function createShareCardDataUrl({ checkedLandmarks, progress }) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is not available");

  const width = 1200;
  const margin = 72;
  const tileWidth = 126;
  const tileHeight = tileWidth / 0.8660254;
  const rowStep = tileHeight * 0.75;
  const wallRows = getWallRows(checkedLandmarks);
  const wallTop = 528;
  const wallHeight = wallRows.length ? tileHeight + (wallRows.length - 1) * rowStep : 168;
  const footerTop = wallTop + wallHeight + 80;
  const height = Math.max(1500, footerTop + 128);
  canvas.width = width;
  canvas.height = height;

  const background = context.createRadialGradient(width * 0.5, 160, 20, width * 0.5, 470, 720);
  background.addColorStop(0, "#182322");
  background.addColorStop(0.48, "#0d1314");
  background.addColorStop(1, "#080a0b");
  context.fillStyle = background;
  context.fillRect(0, 0, width, height);

  context.strokeStyle = "rgba(202, 169, 124, 0.74)";
  context.lineWidth = 2;
  context.strokeRect(28, 28, width - 56, height - 56);
  context.strokeStyle = "rgba(202, 169, 124, 0.18)";
  context.lineWidth = 1;
  context.strokeRect(42, 42, width - 84, height - 84);

  context.fillStyle = "#a99d8e";
  context.font = '500 16px "IBM Plex Mono", monospace';
  context.fillText("CITY STAMP · FIELD ARCHIVE", margin, 86);
  context.textAlign = "right";
  context.fillStyle = "#c9a87a";
  context.fillText("SHARE CARD / MY CITY ARCHIVE", width - margin, 86);
  context.textAlign = "left";
  context.strokeStyle = "rgba(202, 169, 124, 0.22)";
  context.beginPath();
  context.moveTo(margin, 115);
  context.lineTo(width - margin, 115);
  context.stroke();

  context.fillStyle = "#f3eadb";
  context.font = '650 58px "IBM Plex Sans", "PingFang SC", sans-serif';
  context.fillText("我的城市印记", margin, 195);
  context.fillStyle = "#c9a87a";
  context.font = '500 19px "IBM Plex Mono", monospace';
  context.fillText("MY CHECK-IN ARCHIVE", margin, 232);

  context.fillStyle = "#f2d2a0";
  context.font = '600 92px "IBM Plex Mono", monospace';
  context.fillText(String(checkedLandmarks.length).padStart(2, "0"), margin, 344);
  context.fillStyle = "#a99d8e";
  context.font = '400 21px "IBM Plex Mono", monospace';
  context.fillText(`/ ${totalLandmarks} PLACES`, margin + 182, 340);
  context.fillStyle = "#766d62";
  context.font = '400 17px "IBM Plex Sans", "PingFang SC", sans-serif';
  context.fillText(checkedLandmarks.length ? "我走过的地方，正在变成一面墙。" : "点亮第一枚徽章，开始收集自己的城市顺序。", margin + 182, 371);

  const cityWidth = (width - margin * 2) / cities.length;
  cities.forEach((city, index) => {
    const cityLandmarks = landmarks.filter((landmark) => landmark.city === city.id);
    const cityCount = cityLandmarks.filter((landmark) => progress[landmark.id]).length;
    const x = margin + cityWidth * index;
    const barWidth = cityWidth - 24;
    context.fillStyle = city.accent;
    context.fillRect(x, 410, 42, 3);
    context.fillStyle = "#f3eadb";
    context.font = '600 20px "IBM Plex Sans", "PingFang SC", sans-serif';
    context.fillText(city.name, x, 448);
    context.fillStyle = "#766d62";
    context.font = '400 12px "IBM Plex Mono", monospace';
    context.fillText(city.english, x, 469);
    context.textAlign = "right";
    context.fillStyle = city.accentInk;
    context.font = '400 16px "IBM Plex Mono", monospace';
    context.fillText(`${cityCount} / ${cityLandmarks.length}`, x + cityWidth - 12, 448);
    context.textAlign = "left";
    context.fillStyle = "rgba(202, 169, 124, 0.16)";
    context.fillRect(x, 483, barWidth, 4);
    context.fillStyle = city.accent;
    context.fillRect(x, 483, barWidth * (cityCount / cityLandmarks.length), 4);
  });

  context.fillStyle = "#a99d8e";
  context.font = '500 15px "IBM Plex Mono", monospace';
  context.fillText("CHECK-IN WALL", margin, 516);
  context.textAlign = "right";
  context.fillStyle = "#c9a87a";
  context.fillText(`${checkedLandmarks.length} STAMPS ARCHIVED`, width - margin, 516);
  context.textAlign = "left";

  if (checkedLandmarks.length === 0) {
    const emptyWidth = 188;
    const emptyHeight = emptyWidth / 0.8660254;
    const emptyX = (width - emptyWidth) / 2;
    const emptyY = wallTop + 8;
    context.strokeStyle = "rgba(202, 169, 124, 0.38)";
    context.lineWidth = 2;
    drawHexPath(context, emptyX, emptyY, emptyWidth, emptyHeight);
    context.stroke();
    context.fillStyle = "#766d62";
    context.font = '400 16px "IBM Plex Sans", "PingFang SC", sans-serif';
    context.textAlign = "center";
    context.fillText("待你点亮第一枚徽章", width / 2, emptyY + emptyHeight + 42);
    context.textAlign = "left";
  } else {
    const artwork = await Promise.all(checkedLandmarks.map(loadShareArtwork));
    wallRows.forEach((row, rowIndex) => {
      const rowWidth = row.length * tileWidth + (rowIndex % 2 === 1 ? tileWidth / 2 : 0);
      const startX = (width - rowWidth) / 2;
      const y = wallTop + rowIndex * rowStep;
      row.forEach((landmark, itemIndex) => {
        const x = startX + itemIndex * tileWidth;
        const city = cities.find((item) => item.id === landmark.city) || cities[0];
        const image = artwork[checkedLandmarks.indexOf(landmark)];
        context.save();
        context.shadowColor = city.accent;
        context.shadowBlur = 14;
        context.fillStyle = city.accentSoft;
        drawHexPath(context, x, y, tileWidth, tileHeight);
        context.fill();
        context.restore();
        context.save();
        drawHexPath(context, x, y, tileWidth, tileHeight);
        context.clip();
        if (image) {
          context.drawImage(image, x, y, tileWidth, tileHeight);
        } else {
          context.fillStyle = "#252b2b";
          context.fillRect(x, y, tileWidth, tileHeight);
        }
        context.restore();
      });
    });
  }

  context.strokeStyle = "rgba(202, 169, 124, 0.22)";
  context.beginPath();
  context.moveTo(margin, footerTop);
  context.lineTo(width - margin, footerTop);
  context.stroke();
  context.fillStyle = "#766d62";
  context.font = '400 14px "IBM Plex Sans", "PingFang SC", sans-serif';
  context.fillText("把走过的城市，收进一张可以分享的档案。", margin, footerTop + 48);
  context.fillStyle = "#c9a87a";
  context.font = '400 14px "IBM Plex Mono", monospace';
  context.textAlign = "right";
  context.fillText("holynova.github.io/city-stamp", width - margin, footerTop + 48);
  context.textAlign = "left";
  context.fillStyle = "#5f5a52";
  context.font = '400 12px "IBM Plex Mono", monospace';
  context.fillText(`CITY STAMP · ${new Date().toLocaleDateString("zh-CN")}`, margin, footerTop + 82);

  return canvas.toDataURL("image/png");
}

function LandmarkIcon({ name, size = 32, weight = "regular" }) {
  const Icon = iconMap[name] || MapPinLine;
  return <Icon aria-hidden="true" size={size} weight={weight} />;
}

function HexBadge({ landmark, city, unlocked, featured = false, detail = false, celebrating = false }) {
  const badgeRef = useRef(null);
  const pointerRef = useRef({ x: 0.5, y: 0.5, active: false });
  const frameRef = useRef(0);

  function requestMotionFrame() {
    if (frameRef.current) return;
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = 0;
      const badge = badgeRef.current;
      if (!badge) return;
      const { x, y, active } = pointerRef.current;
      const offsetX = x - 0.5;
      const offsetY = y - 0.5;
      badge.style.setProperty("--tilt-x", `${active ? offsetY * 8 : 0}deg`);
      badge.style.setProperty("--tilt-y", `${active ? -offsetX * 10 : 0}deg`);
      badge.style.setProperty("--sheen-shift-x", `${active ? -offsetX * 20 : 0}px`);
      badge.style.setProperty("--sheen-shift-y", `${active ? -offsetY * 15 : 0}px`);
      badge.style.setProperty("--glare-x", `${50 + (active ? offsetX * 38 : 0)}%`);
      badge.style.setProperty("--glare-y", `${50 + (active ? offsetY * 32 : 0)}%`);
      badge.style.setProperty("--sheen-opacity", active ? "1" : "0");
    });
  }

  function handlePointerMove(event) {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerRef.current = {
      x: Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width)),
      y: Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height)),
      active: true,
    };
    requestMotionFrame();
  }

  function handlePointerLeave() {
    pointerRef.current = { x: 0.5, y: 0.5, active: false };
    requestMotionFrame();
  }

  useEffect(() => () => {
    if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <div
      ref={badgeRef}
      className={`hex-badge ${featured ? "hex-badge--featured" : ""} ${detail ? "hex-badge--detail" : ""} ${unlocked ? "is-unlocked" : ""} ${celebrating ? "is-celebrating" : ""}`}
      style={{ "--badge-accent": city.accent, "--badge-accent-soft": city.accentSoft, "--badge-accent-ink": city.accentInk }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="hex-badge__core">
        <div className="hex-badge__glass" aria-hidden="true" />
        <div className="hex-badge__art-wrap">
          <img className="hex-badge__art" src={`./badges/${landmark.id}.png`} alt="" aria-hidden="true" draggable="false" />
        </div>
        <div className="hex-badge__sheen" aria-hidden="true" />
      </div>
    </div>
  );
}

function App() {
  const [activeCityId, setActiveCityId] = useState("shanghai");
  const [filter, setFilter] = useState("all");
  const [progress, setProgress] = useState(getStoredProgress);
  const [selectedId, setSelectedId] = useState(landmarks[0].id);
  const [celebratingId, setCelebratingId] = useState(null);
  const [notice, setNotice] = useState(null);
  const [wallSelectedId, setWallSelectedId] = useState(null);
  const [wallZoom, setWallZoom] = useState(1);
  const [detailLandmarkId, setDetailLandmarkId] = useState(null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareCardState, setShareCardState] = useState({ status: "idle", dataUrl: "" });
  const [shareFeedback, setShareFeedback] = useState("");
  const detailDialogRef = useRef(null);
  const detailCloseRef = useRef(null);
  const shareDialogRef = useRef(null);
  const shareCloseRef = useRef(null);

  const activeCity = cities.find((city) => city.id === activeCityId) || cities[0];
  const selectedLandmark = landmarks.find((landmark) => landmark.id === selectedId) || landmarks[0];
  const selectedCity = cities.find((city) => city.id === selectedLandmark.city) || cities[0];
  const selectedRecord = progress[selectedLandmark.id];
  const detailLandmark = landmarks.find((landmark) => landmark.id === detailLandmarkId) || null;
  const detailCity = detailLandmark ? cities.find((city) => city.id === detailLandmark.city) || cities[0] : null;
  const totalUnlocked = landmarks.filter((landmark) => progress[landmark.id]).length;
  const cityUnlocked = landmarks.filter((landmark) => landmark.city === activeCity.id && progress[landmark.id]).length;

  const visibleLandmarks = useMemo(() => landmarks.filter((landmark) => {
    if (landmark.city !== activeCity.id) return false;
    if (filter === "unlocked") return Boolean(progress[landmark.id]);
    if (filter === "locked") return !progress[landmark.id];
    return true;
  }), [activeCity.id, filter, progress]);

  const recentLandmarks = useMemo(() => landmarks.filter((landmark) => progress[landmark.id])
    .sort((a, b) => new Date(progress[b.id].checkedAt) - new Date(progress[a.id].checkedAt)).slice(0, 4), [progress]);
  const checkedLandmarks = useMemo(() => landmarks.filter((landmark) => progress[landmark.id])
    .sort((a, b) => new Date(progress[b.id].checkedAt) - new Date(progress[a.id].checkedAt)), [progress]);
  const wallRows = useMemo(() => getWallRows(checkedLandmarks), [checkedLandmarks]);
  const wallSelectedLandmark = checkedLandmarks.find((landmark) => landmark.id === wallSelectedId) || checkedLandmarks[0];

  useEffect(() => {
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    if (!notice) return undefined;
    const timeout = window.setTimeout(() => setNotice(null), 4200);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  useEffect(() => {
    setWallSelectedId((current) => (current && checkedLandmarks.some((landmark) => landmark.id === current) ? current : checkedLandmarks[0]?.id || null));
  }, [checkedLandmarks]);

  useEffect(() => {
    if (!detailLandmarkId) return undefined;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => detailCloseRef.current?.focus());

    function handleDetailKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeBadgeDetail();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = detailDialogRef.current?.querySelectorAll("button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])");
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleDetailKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleDetailKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [detailLandmarkId]);

  useEffect(() => {
    if (!shareDialogOpen) return undefined;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => shareCloseRef.current?.focus());

    function handleShareKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeShareCard();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = shareDialogRef.current?.querySelectorAll("button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])");
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleShareKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleShareKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [shareDialogOpen]);

  useEffect(() => {
    if (!shareDialogOpen) return undefined;
    let cancelled = false;
    setShareCardState({ status: "loading", dataUrl: "" });
    setShareFeedback("");
    createShareCardDataUrl({ checkedLandmarks, progress })
      .then((dataUrl) => {
        if (!cancelled) setShareCardState({ status: "ready", dataUrl });
      })
      .catch(() => {
        if (!cancelled) setShareCardState({ status: "error", dataUrl: "" });
      });
    return () => {
      cancelled = true;
    };
  }, [shareDialogOpen, checkedLandmarks, progress]);

  function selectCity(cityId) {
    const city = cities.find((item) => item.id === cityId);
    setActiveCityId(cityId);
    const firstLandmark = landmarks.find((landmark) => landmark.city === cityId);
    if (firstLandmark) setSelectedId(firstLandmark.id);
    setFilter("all");
    if (city) trackEvent("city-select", { city: city.id });
  }

  function handleLandmarkClick(landmark) {
    const city = cities.find((item) => item.id === landmark.city) || cities[0];
    setSelectedId(landmark.id);
    if (progress[landmark.id]) {
      setProgress((current) => {
        const next = { ...current };
        delete next[landmark.id];
        return next;
      });
      setCelebratingId(null);
      trackEvent("landmark-uncheckin", { city: city.id, landmark: landmark.id });
      setNotice({ type: "info", title: `${city.name} · ${landmark.title} 已取消打卡`, detail: "已从城市档案和打卡墙移除，可随时再次点亮" });
      return;
    }
    const checkedAt = new Date().toISOString();
    setProgress((current) => ({ ...current, [landmark.id]: { checkedAt } }));
    setCelebratingId(landmark.id);
    trackEvent("landmark-checkin", { city: city.id, landmark: landmark.id });
    setNotice({ type: "success", title: `${city.name} · ${landmark.title} 已点亮`, detail: `记录于 ${formatDate(checkedAt)} · 这枚徽章属于你了` });
    window.setTimeout(() => setCelebratingId(null), 1500);
  }

  function resetProgress() {
    setProgress({});
    setSelectedId(landmarks[0].id);
    setActiveCityId("shanghai");
    setFilter("all");
    trackEvent("archive-reset");
    setNotice({ type: "info", title: "档案已归零", detail: "所有徽章回到待发现状态。" });
  }

  function selectWallLandmark(landmark) {
    setWallSelectedId(landmark.id);
    trackEvent("wall-badge-select", { city: landmark.city, landmark: landmark.id });
  }

  function openBadgeDetail(landmark) {
    setDetailLandmarkId(landmark.id);
    trackEvent("badge-detail-open", { city: landmark.city, landmark: landmark.id });
  }

  function closeBadgeDetail() {
    setDetailLandmarkId(null);
  }

  function openShareCard() {
    setShareDialogOpen(true);
    setShareCardState({ status: "loading", dataUrl: "" });
    setShareFeedback("");
    trackEvent("share-card-open", { total: totalUnlocked, totalAvailable: totalLandmarks });
  }

  function closeShareCard() {
    setShareDialogOpen(false);
  }

  function retryShareCard() {
    setShareCardState({ status: "loading", dataUrl: "" });
    setShareFeedback("");
    createShareCardDataUrl({ checkedLandmarks, progress })
      .then((dataUrl) => setShareCardState({ status: "ready", dataUrl }))
      .catch(() => setShareCardState({ status: "error", dataUrl: "" }));
  }

  function getShareUrl() {
    return PUBLIC_SHARE_URL;
  }

  async function copyShareUrl() {
    const shareUrl = getShareUrl();
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const input = document.createElement("input");
        input.value = shareUrl;
        input.setAttribute("readonly", "true");
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        input.remove();
      }
      setShareFeedback("链接已复制，可以粘贴给朋友继续查看。");
      trackEvent("share-link-copy", { total: totalUnlocked });
    } catch {
      setShareFeedback(`复制失败，请手动复制：${shareUrl}`);
    }
  }

  function downloadShareCard() {
    if (shareCardState.status !== "ready" || !shareCardState.dataUrl) return;
    const link = document.createElement("a");
    link.href = shareCardState.dataUrl;
    link.download = `city-stamp-${totalUnlocked}-of-${totalLandmarks}.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setShareFeedback("分享卡片已下载，进度已经写进图片。");
    trackEvent("share-card-download", { total: totalUnlocked });
  }

  async function shareProgress() {
    if (!navigator.share) {
      await copyShareUrl();
      return;
    }
    try {
      const shareData = {
        title: "我的城市印记",
        text: `我已经点亮 ${totalUnlocked} / ${totalLandmarks} 枚城市徽章。`,
        url: getShareUrl(),
      };
      if (shareCardState.status === "ready" && shareCardState.dataUrl) {
        const response = await fetch(shareCardState.dataUrl);
        const blob = await response.blob();
        const file = new File([blob], "city-stamp-progress.png", { type: "image/png" });
        if (navigator.canShare?.({ files: [file] })) shareData.files = [file];
      }
      await navigator.share(shareData);
      setShareFeedback("已打开系统分享面板。");
      trackEvent("share-progress", { total: totalUnlocked, sharedImage: Boolean(shareData.files?.length) });
    } catch (error) {
      if (error?.name !== "AbortError") setShareFeedback("分享没有完成，可以先下载图片或复制链接。");
    }
  }

  function changeWallZoom(delta) {
    setWallZoom((current) => Math.min(1.6, Math.max(0.75, Number((current + delta).toFixed(2)))));
  }

  const activeFilters = [
    { id: "all", label: "全部", count: landmarks.filter((landmark) => landmark.city === activeCity.id).length },
    { id: "unlocked", label: "已点亮", count: cityUnlocked },
    { id: "locked", label: "待发现", count: 10 - cityUnlocked },
  ];
  const nativeShareAvailable = typeof navigator !== "undefined" && typeof navigator.share === "function";

  return (
    <div className="app-shell">
      <div className="page-frame" id="top">
        <header className="site-header">
          <a className="brand" href="#top" aria-label="城市印记，回到顶部">
            <span className="brand__mark"><Hexagon aria-hidden="true" size={32} weight="regular" /><span>印</span></span>
            <span className="brand__text"><strong>城市印记</strong><small>CITY STAMP · FIELD ARCHIVE</small></span>
          </a>
          <nav className="site-nav" aria-label="主导航">
            <a className="site-nav__link is-active" href="#collection">藏品</a>
            <a className="site-nav__link" href="#wall">打卡墙</a>
            <a className="site-nav__link" href="#journal">足迹</a>
          </nav>
          <div className="header-progress" aria-label={`已点亮 ${totalUnlocked} 枚徽章，共 ${totalLandmarks} 枚`}>
            <span className="header-progress__label">ARCHIVE</span>
            <span className="header-progress__value"><b>{String(totalUnlocked).padStart(2, "0")}</b> / {totalLandmarks}</span>
            <Medal aria-hidden="true" size={24} weight="duotone" />
          </div>
        </header>

        <main>
          <section className="hero-section" aria-labelledby="hero-title">
            <div className="hero-copy">
              <div className="hero-copy__rule" aria-hidden="true"><span /><Hexagon size={17} weight="regular" /><span /></div>
              <h1 id="hero-title">把城市，<span>收进一枚徽章。</span></h1>
              <p className="hero-copy__lede">走过一处地标，就为自己的城市档案点亮一枚印记。四座城，四十个值得被记住的瞬间。</p>
              <div className="hero-copy__meta">
                <span><ListChecks aria-hidden="true" size={17} weight="bold" /> {totalLandmarks} PLACES TO DISCOVER</span>
                <span><Clock aria-hidden="true" size={17} weight="bold" /> 本地时间记录</span>
              </div>
              <a className="text-link" href="#collection" onClick={() => trackEvent("start-collecting")}>开始收集 <ArrowUpRight aria-hidden="true" size={17} weight="bold" /></a>
            </div>

            <div className="spotlight-panel" style={{ "--spotlight-accent": selectedCity.accent }}>
              <div className="spotlight-panel__topline"><span>FEATURED IMPRESSION</span><span>NO. {String(landmarks.indexOf(selectedLandmark) + 1).padStart(2, "0")} / {totalLandmarks}</span></div>
              <div className="spotlight-panel__art">
                <div className="spotlight-panel__orbit spotlight-panel__orbit--one" aria-hidden="true" />
                <div className="spotlight-panel__orbit spotlight-panel__orbit--two" aria-hidden="true" />
                <button className="spotlight-panel__badge-button" type="button" onClick={() => handleLandmarkClick(selectedLandmark)} aria-label={selectedRecord ? `取消${selectedLandmark.title}打卡` : `点亮${selectedLandmark.title}徽章`}>
                  <HexBadge landmark={selectedLandmark} city={selectedCity} unlocked={Boolean(selectedRecord)} featured celebrating={celebratingId === selectedLandmark.id} />
                </button>
                <button className="spotlight-panel__detail-button" type="button" onClick={() => openBadgeDetail(selectedLandmark)} aria-label={`查看${selectedLandmark.title}的3D大图`}><ArrowsOut aria-hidden="true" size={14} weight="bold" /> 查看 3D 大图</button>
                <span className="spotlight-panel__caption">{selectedRecord ? "YOUR RECORDED MOMENT" : "TAP TO RECORD YOUR MOMENT"}</span>
              </div>
              <div className="spotlight-panel__bottomline">
                <div><span>{selectedCity.name} · {selectedCity.english}</span><strong>{selectedLandmark.title}</strong></div>
                <div className="spotlight-panel__status">
                  {selectedRecord ? <><SealCheck aria-hidden="true" size={22} weight="duotone" /><span>已点亮<br /><small>{formatDate(selectedRecord.checkedAt)} · 再点取消</small></span></> : <><LockKey aria-hidden="true" size={21} weight="duotone" /><span>尚未打卡<br /><small>点击徽章点亮</small></span></>}
                </div>
              </div>
            </div>
          </section>

          <section className="collection-section" id="collection" aria-labelledby="collection-title">
            <div className="section-heading">
              <div><div className="section-heading__index">01 · COLLECTION INDEX</div><h2 id="collection-title">四座城，四十枚印记。</h2></div>
              <p>选择一座城，沿着徽章的轮廓，记录你真正走到过的地方。</p>
            </div>
            <div className="city-switcher" role="tablist" aria-label="选择城市">
              {cities.map((city) => {
                const count = landmarks.filter((landmark) => landmark.city === city.id && progress[landmark.id]).length;
                return <button className={`city-tab ${activeCity.id === city.id ? "is-active" : ""}`} key={city.id} type="button" role="tab" aria-selected={activeCity.id === city.id} onClick={() => selectCity(city.id)} style={{ "--tab-accent": city.accent }}><span className="city-tab__index">{city.short}</span><span className="city-tab__copy"><strong>{city.name}</strong><small>{city.english}</small></span><span className="city-tab__count">{count} / 10</span></button>;
              })}
            </div>
            <div className="collection-toolbar">
              <div className="collection-toolbar__city"><span className="collection-toolbar__dot" style={{ backgroundColor: activeCity.accent }} /><div><strong>{activeCity.name} · {activeCity.countLabel}</strong><span>{activeCity.phrase}</span></div></div>
              <div className="collection-toolbar__filters" aria-label="筛选徽章">
                {activeFilters.map((item) => <button className={`filter-button ${filter === item.id ? "is-active" : ""}`} key={item.id} type="button" onClick={() => setFilter(item.id)}>{item.label} <span>{String(item.count).padStart(2, "0")}</span></button>)}
              </div>
            </div>
            <div className="badge-grid" aria-live="polite">
              {visibleLandmarks.map((landmark) => {
                const isUnlocked = Boolean(progress[landmark.id]);
                return <article className={`badge-record ${selectedId === landmark.id ? "is-selected" : ""}`} key={landmark.id}>
                  <button className="badge-record__button" type="button" onClick={() => handleLandmarkClick(landmark)} aria-label={isUnlocked ? `取消${landmark.title}打卡` : `点亮${landmark.title}徽章`}>
                    <HexBadge landmark={landmark} city={activeCity} unlocked={isUnlocked} celebrating={celebratingId === landmark.id} />
                  </button>
                  <div className="badge-record__copy"><div className="badge-record__serial"><span>{String(landmarks.indexOf(landmark) + 1).padStart(2, "0")}</span><span>{isUnlocked ? "ARCHIVED" : "UNDISCOVERED"}</span></div><h3>{landmark.title}</h3><p>{landmark.district}</p><span className={`badge-record__date ${isUnlocked ? "is-unlocked" : ""}`}>{isUnlocked ? `已于 ${formatDate(progress[landmark.id].checkedAt)} 记录 · 再点取消` : "点击徽章 · 记录到访"}</span><button className="badge-record__detail" type="button" onClick={() => openBadgeDetail(landmark)} aria-label={`查看${landmark.title}的3D大图`}><ArrowsOut aria-hidden="true" size={13} weight="bold" /> 查看 3D 大图</button></div>
                </article>;
              })}
            </div>
            {visibleLandmarks.length === 0 && <div className="empty-state"><Compass aria-hidden="true" size={38} weight="duotone" /><strong>{filter === "unlocked" ? "这座城还没有点亮的徽章" : "这座城的十枚徽章都已收入档案"}</strong><span>{filter === "unlocked" ? "去发现一处地标，让第一枚印记开始发光。" : "换一个筛选，或继续回味你的城市足迹。"}</span></div>}
          </section>

          <section className="wall-section" id="wall" aria-labelledby="wall-title">
            <div className="section-heading section-heading--wall">
              <div><div className="section-heading__index">02 · CHECK-IN WALL</div><h2 id="wall-title">把走过的地方，拼成一面墙。</h2></div>
              <p>所有已点亮的徽章会以正六边形边缘相接。点击一枚，放大查看它留下的城市细节。</p>
            </div>
            {checkedLandmarks.length > 0 ? <div className="wall-layout">
              <div className="wall-stage" aria-label="已打卡徽章墙">
                <div className="wall-stage__topline"><span>{String(checkedLandmarks.length).padStart(2, "0")} STAMPS ARCHIVED</span><div className="wall-stage__topline-actions"><span>HEXAGONAL MOSAIC</span><button className="wall-stage__share-button" type="button" onClick={openShareCard}><ShareNetwork aria-hidden="true" size={13} weight="bold" /> 分享进度</button></div></div>
                <div className="wall-stage__viewport">
                  <div className="wall-stage__mosaic" style={{ "--wall-scale": wallZoom }}>
                    {wallRows.map((row, rowIndex) => <div className={`wall-stage__row ${rowIndex % 2 === 1 ? "is-offset" : ""}`} key={row.map((landmark) => landmark.id).join("-")}>
                      {row.map((landmark) => {
                        const city = cities.find((item) => item.id === landmark.city) || cities[0];
                        return <button className={`wall-stage__tile ${wallSelectedLandmark?.id === landmark.id ? "is-selected" : ""}`} key={landmark.id} type="button" onClick={() => { selectWallLandmark(landmark); openBadgeDetail(landmark); }} aria-label={`全屏查看${landmark.title}徽章详情`}>
                          <HexBadge landmark={landmark} city={city} unlocked />
                        </button>;
                      })}
                    </div>)}
                  </div>
                </div>
              </div>
              <aside className="wall-inspector" aria-live="polite" aria-label="徽章详情">
                <div className="wall-inspector__topline"><span>DETAIL VIEW</span><span>{wallSelectedLandmark ? String(landmarks.indexOf(wallSelectedLandmark) + 1).padStart(2, "0") : "--"} / {totalLandmarks}</span></div>
                <div className="wall-inspector__preview">
                  {wallSelectedLandmark && (() => {
                    const city = cities.find((item) => item.id === wallSelectedLandmark.city) || cities[0];
                    return <HexBadge landmark={wallSelectedLandmark} city={city} unlocked featured />;
                  })()}
                </div>
                {wallSelectedLandmark && (() => {
                  const city = cities.find((item) => item.id === wallSelectedLandmark.city) || cities[0];
                  return <><div className="wall-inspector__copy"><span>{city.name} · {city.english}</span><strong>{wallSelectedLandmark.title}</strong><small>{wallSelectedLandmark.description}</small><time dateTime={progress[wallSelectedLandmark.id].checkedAt}>已记录 · {formatDate(progress[wallSelectedLandmark.id].checkedAt)}</time><button className="wall-inspector__detail-button" type="button" onClick={() => openBadgeDetail(wallSelectedLandmark)}><ArrowsOut aria-hidden="true" size={14} weight="bold" /> 全屏查看 3D 徽章</button></div><div className="wall-inspector__controls"><span>墙面缩放 · {Math.round(wallZoom * 100)}%</span><div><button type="button" onClick={() => changeWallZoom(-0.15)} disabled={wallZoom <= 0.75} aria-label="缩小徽章墙">−</button><button type="button" onClick={() => setWallZoom(1)} aria-label="重置徽章墙缩放">100%</button><button type="button" onClick={() => changeWallZoom(0.15)} disabled={wallZoom >= 1.6} aria-label="放大徽章墙">＋</button></div></div></>;
                })()}
              </aside>
            </div> : <div className="wall-empty"><Hexagon aria-hidden="true" size={42} weight="duotone" /><strong>打卡墙还是一张空白底纸。</strong><span>点亮第一枚徽章，它会成为这面墙的起点。</span><a className="text-link" href="#collection">去发现第一处地标 <ArrowUpRight aria-hidden="true" size={17} weight="bold" /></a></div>}
          </section>

          <section className="journal-section" id="journal" aria-labelledby="journal-title">
            <div className="journal-section__main">
              <div className="section-heading section-heading--compact"><div><div className="section-heading__index">03 · MEMORY LOG</div><h2 id="journal-title">最近点亮的地方。</h2></div><span className="journal-section__count">{String(totalUnlocked).padStart(2, "0")} MOMENTS</span></div>
              {recentLandmarks.length > 0 ? <div className="journal-list">{recentLandmarks.map((landmark) => {
                const city = cities.find((item) => item.id === landmark.city) || cities[0];
                return <button className="journal-entry" key={landmark.id} type="button" onClick={() => { setActiveCityId(city.id); setSelectedId(landmark.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}><span className="journal-entry__icon" style={{ "--entry-accent": city.accent }}><LandmarkIcon name={landmark.icon} size={22} weight="duotone" /></span><span className="journal-entry__copy"><strong>{landmark.title}</strong><small>{city.name} · {landmark.district}</small></span><time dateTime={progress[landmark.id].checkedAt}>{formatDate(progress[landmark.id].checkedAt)}</time><ArrowUpRight aria-hidden="true" size={19} weight="bold" /></button>;
              })}</div> : <div className="journal-empty"><Clock aria-hidden="true" size={23} weight="duotone" /><span>你的第一枚徽章，会在这里留下时间。</span></div>}
            </div>
            <aside className="archive-card" aria-labelledby="archive-card-title">
              <div className="archive-card__topline"><span>ARCHIVE STATUS</span><Medal aria-hidden="true" size={21} weight="duotone" /></div>
              <div className="archive-card__number"><strong>{String(totalUnlocked).padStart(2, "0")}</strong><span>/ {totalLandmarks}</span></div>
              <h3 id="archive-card-title">你的城市档案</h3><p>{totalUnlocked === 0 ? "从第一枚徽章开始，留下属于你的城市顺序。" : `已经把 ${totalUnlocked} 个瞬间收入档案，继续向前走。`}</p>
              <div className="archive-card__cities">{cities.map((city) => { const count = landmarks.filter((landmark) => landmark.city === city.id && progress[landmark.id]).length; return <div className="archive-card__city" key={city.id}><span><i style={{ backgroundColor: city.accent }} />{city.name}</span><strong>{count}/10</strong></div>; })}</div>
              <div className="archive-card__actions"><button className="archive-card__share-button" type="button" onClick={openShareCard}><ShareNetwork aria-hidden="true" size={16} weight="bold" /><span>分享我的徽章墙</span><ArrowUpRight aria-hidden="true" size={15} weight="bold" /></button><button className="reset-button" type="button" onClick={resetProgress} disabled={totalUnlocked === 0}><ArrowClockwise aria-hidden="true" size={16} weight="bold" /> 重置档案</button></div>
            </aside>
          </section>
        </main>
        <footer className="site-footer">
          <span>城市印记 · 城市不是清单，是你走过的顺序。</span>
          <div className="site-footer__links">
            <span>LOCAL ARCHIVE · v1.0</span>
            <a className="site-footer__repo" href="https://github.com/holynova/city-stamp" target="_blank" rel="noreferrer" onClick={() => trackEvent("github-repo-click")}>
              GitHub Repo <ArrowUpRight aria-hidden="true" size={13} weight="bold" />
            </a>
          </div>
        </footer>
      </div>
      {notice && <div className={`toast toast--${notice.type}`} role="status" aria-live="polite"><span className="toast__icon">{notice.type === "success" ? <Sparkle aria-hidden="true" size={20} weight="fill" /> : <Check aria-hidden="true" size={19} weight="bold" />}</span><span className="toast__copy"><strong>{notice.title}</strong><small>{notice.detail}</small></span></div>}
      {detailLandmark && detailCity && (() => {
        const detailRecord = progress[detailLandmark.id];
        return <div className="badge-detail" role="dialog" aria-modal="true" aria-labelledby="badge-detail-title" aria-describedby="badge-detail-description" onMouseDown={(event) => { if (event.target === event.currentTarget) closeBadgeDetail(); }}>
          <div className="badge-detail__panel" ref={detailDialogRef}>
            <header className="badge-detail__header">
              <div><span>3D BADGE DETAIL</span><span>NO. {String(landmarks.indexOf(detailLandmark) + 1).padStart(2, "0")} / {totalLandmarks}</span></div>
              <button className="badge-detail__close" ref={detailCloseRef} type="button" onClick={closeBadgeDetail} aria-label="关闭徽章大图"><X aria-hidden="true" size={20} weight="regular" /></button>
            </header>
            <div className="badge-detail__body">
              <section className="badge-detail__stage" aria-label={`${detailLandmark.title} 3D 徽章预览`}>
                <div className="badge-detail__badge"><HexBadge landmark={detailLandmark} city={detailCity} unlocked={Boolean(detailRecord)} featured detail celebrating={celebratingId === detailLandmark.id} /></div>
              </section>
              <section className="badge-detail__copy" style={{ "--badge-accent-ink": detailCity.accentInk }}>
                <span>{detailCity.name} · {detailCity.english}</span>
                <h2 id="badge-detail-title">{detailLandmark.title}</h2>
                <p id="badge-detail-description">{detailLandmark.description}</p>
                <div className={`badge-detail__status ${detailRecord ? "is-unlocked" : ""}`}>
                  {detailRecord ? <SealCheck aria-hidden="true" size={22} weight="duotone" /> : <LockKey aria-hidden="true" size={21} weight="duotone" />}
                  <span>{detailRecord ? <>已点亮<br /><small>{formatDate(detailRecord.checkedAt)} · 再点取消</small></> : <>尚未打卡<br /><small>点亮后会记录到你的城市档案</small></>}</span>
                </div>
                <button className="badge-detail__checkin" type="button" onClick={() => handleLandmarkClick(detailLandmark)} aria-label={detailRecord ? `取消${detailLandmark.title}打卡` : `点亮${detailLandmark.title}徽章`}>
                  {detailRecord ? "取消打卡" : "点亮徽章"} <ArrowUpRight aria-hidden="true" size={15} weight="bold" />
                </button>
                <small className="badge-detail__footnote">ESC 关闭 · 点击外部区域也可关闭</small>
              </section>
            </div>
          </div>
        </div>;
      })()}
      {shareDialogOpen && <div className="share-dialog" role="dialog" aria-modal="true" aria-labelledby="share-dialog-title" aria-describedby="share-dialog-description" onMouseDown={(event) => { if (event.target === event.currentTarget) closeShareCard(); }}>
        <div className="share-dialog__panel" ref={shareDialogRef}>
          <header className="share-dialog__header">
            <div><span>SHARE CARD</span><span>{String(totalUnlocked).padStart(2, "0")} / {totalLandmarks} ARCHIVED</span></div>
            <button className="share-dialog__close" ref={shareCloseRef} type="button" onClick={closeShareCard} aria-label="关闭分享卡片"><X aria-hidden="true" size={20} weight="regular" /></button>
          </header>
          <div className="share-dialog__body">
            <section className="share-dialog__preview" aria-label="我的城市印记分享卡预览">
              {shareCardState.status === "ready" ? <img src={shareCardState.dataUrl} alt={`我的城市印记分享卡，已点亮 ${totalUnlocked} / ${totalLandmarks} 枚徽章`} /> : shareCardState.status === "error" ? <div className="share-dialog__message"><ShareNetwork aria-hidden="true" size={32} weight="duotone" /><strong>分享卡暂时没有生成</strong><span>图片资源加载失败，可以重试。</span><button type="button" onClick={retryShareCard}>重新生成</button></div> : <div className="share-dialog__message"><ShareNetwork aria-hidden="true" size={32} weight="duotone" /><strong>正在绘制你的徽章墙</strong><span>把已打卡的地标和城市进度写进一张图片。</span></div>}
            </section>
            <section className="share-dialog__copy">
              <span className="share-dialog__eyebrow">YOUR PROGRESS</span>
              <h2 id="share-dialog-title">把自己的墙，带走。</h2>
              <p id="share-dialog-description">分享卡会把当前已打卡的徽章拼成一面墙，并把四座城市的完成进度保留在图片里。</p>
              <div className="share-dialog__summary"><strong>{String(totalUnlocked).padStart(2, "0")}</strong><span>/ {totalLandmarks}<small>枚徽章已点亮</small></span></div>
              <div className="share-dialog__cities">{cities.map((city) => { const count = landmarks.filter((landmark) => landmark.city === city.id && progress[landmark.id]).length; return <div className="share-dialog__city" key={city.id}><span><i style={{ backgroundColor: city.accent }} />{city.name}</span><strong>{count} / 10</strong></div>; })}</div>
              <div className="share-dialog__actions"><button className="share-dialog__download" type="button" onClick={downloadShareCard} disabled={shareCardState.status !== "ready"}><DownloadSimple aria-hidden="true" size={17} weight="bold" /> {shareCardState.status === "loading" ? "正在生成图片…" : "下载分享卡片"}</button>{nativeShareAvailable && <button className="share-dialog__share" type="button" onClick={shareProgress} disabled={shareCardState.status === "loading"}><ShareNetwork aria-hidden="true" size={17} weight="bold" /> 分享进度</button>}<button className="share-dialog__copy-link" type="button" onClick={copyShareUrl}><Copy aria-hidden="true" size={15} weight="bold" /> 复制分享链接</button></div>
              <small className="share-dialog__feedback" role="status" aria-live="polite">{shareFeedback || "图片会包含当前进度，适合直接发给朋友。"}</small>
              <small className="share-dialog__footnote">分享链接 · {PUBLIC_SHARE_URL.replace(/^https?:\/\//, "")}</small>
            </section>
          </div>
        </div>
      </div>}
    </div>
  );
}

export { App };
