import { useEffect, useMemo, useState } from "react";
import {
  Archive,
  ArrowClockwise,
  ArrowUpRight,
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
  Sparkle,
  Storefront,
  SunHorizon,
  Tree,
  TreeStructure,
  Waves,
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
];

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

function LandmarkIcon({ name, size = 32, weight = "regular" }) {
  const Icon = iconMap[name] || MapPinLine;
  return <Icon aria-hidden="true" size={size} weight={weight} />;
}

function HexBadge({ landmark, city, unlocked, featured = false, celebrating = false }) {
  const serial = String(landmarks.indexOf(landmark) + 1).padStart(2, "0");

  return (
    <div
      className={`hex-badge ${featured ? "hex-badge--featured" : ""} ${unlocked ? "is-unlocked" : ""} ${celebrating ? "is-celebrating" : ""}`}
      style={{ "--badge-accent": city.accent, "--badge-accent-soft": city.accentSoft, "--badge-accent-ink": city.accentInk }}
    >
      <div className="hex-badge__core">
        <div className="hex-badge__topline"><span>{city.short}</span><span>{unlocked ? "OPEN" : "LOCKED"}</span></div>
        <div className="hex-badge__art-wrap">
          <img className="hex-badge__art" src={`./badges/${landmark.id}.png`} alt="" aria-hidden="true" draggable="false" />
          {!unlocked && <span className="hex-badge__lock"><LockKey aria-hidden="true" size={featured ? 20 : 15} weight="bold" /></span>}
        </div>
        <div className="hex-badge__serial">CITY STAMP · {serial}</div>
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

  const activeCity = cities.find((city) => city.id === activeCityId) || cities[0];
  const selectedLandmark = landmarks.find((landmark) => landmark.id === selectedId) || landmarks[0];
  const selectedCity = cities.find((city) => city.id === selectedLandmark.city) || cities[0];
  const selectedRecord = progress[selectedLandmark.id];
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

  useEffect(() => {
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    if (!notice) return undefined;
    const timeout = window.setTimeout(() => setNotice(null), 4200);
    return () => window.clearTimeout(timeout);
  }, [notice]);

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
      setNotice({ type: "info", title: `${landmark.title} 已在你的档案里`, detail: `记录于 ${formatDate(progress[landmark.id].checkedAt)}` });
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

  const activeFilters = [
    { id: "all", label: "全部", count: landmarks.filter((landmark) => landmark.city === activeCity.id).length },
    { id: "unlocked", label: "已点亮", count: cityUnlocked },
    { id: "locked", label: "待发现", count: 10 - cityUnlocked },
  ];

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
            <a className="site-nav__link" href="#journal">足迹</a>
          </nav>
          <div className="header-progress" aria-label={`已点亮 ${totalUnlocked} 枚徽章，共 30 枚`}>
            <span className="header-progress__label">ARCHIVE</span>
            <span className="header-progress__value"><b>{String(totalUnlocked).padStart(2, "0")}</b> / 30</span>
            <Medal aria-hidden="true" size={24} weight="duotone" />
          </div>
        </header>

        <main>
          <section className="hero-section" aria-labelledby="hero-title">
            <div className="hero-copy">
              <div className="hero-copy__rule" aria-hidden="true"><span /><Hexagon size={17} weight="regular" /><span /></div>
              <h1 id="hero-title">把城市，<span>收进一枚徽章。</span></h1>
              <p className="hero-copy__lede">走过一处地标，就为自己的城市档案点亮一枚印记。三座城，三十个值得被记住的瞬间。</p>
              <div className="hero-copy__meta">
                <span><ListChecks aria-hidden="true" size={17} weight="bold" /> 30 PLACES TO DISCOVER</span>
                <span><Clock aria-hidden="true" size={17} weight="bold" /> 本地时间记录</span>
              </div>
              <a className="text-link" href="#collection" onClick={() => trackEvent("start-collecting")}>开始收集 <ArrowUpRight aria-hidden="true" size={17} weight="bold" /></a>
            </div>

            <div className="spotlight-panel" style={{ "--spotlight-accent": selectedCity.accent }}>
              <div className="spotlight-panel__topline"><span>FEATURED IMPRESSION</span><span>NO. {String(landmarks.indexOf(selectedLandmark) + 1).padStart(2, "0")} / 30</span></div>
              <div className="spotlight-panel__art">
                <div className="spotlight-panel__orbit spotlight-panel__orbit--one" aria-hidden="true" />
                <div className="spotlight-panel__orbit spotlight-panel__orbit--two" aria-hidden="true" />
                <button className="spotlight-panel__badge-button" type="button" onClick={() => handleLandmarkClick(selectedLandmark)} aria-label={selectedRecord ? `查看已点亮的${selectedLandmark.title}徽章` : `点亮${selectedLandmark.title}徽章`}>
                  <HexBadge landmark={selectedLandmark} city={selectedCity} unlocked={Boolean(selectedRecord)} featured celebrating={celebratingId === selectedLandmark.id} />
                </button>
                <span className="spotlight-panel__caption">{selectedRecord ? "YOUR RECORDED MOMENT" : "TAP TO RECORD YOUR MOMENT"}</span>
              </div>
              <div className="spotlight-panel__bottomline">
                <div><span>{selectedCity.name} · {selectedCity.english}</span><strong>{selectedLandmark.title}</strong></div>
                <div className="spotlight-panel__status">
                  {selectedRecord ? <><SealCheck aria-hidden="true" size={22} weight="duotone" /><span>已点亮<br /><small>{formatDate(selectedRecord.checkedAt)}</small></span></> : <><LockKey aria-hidden="true" size={21} weight="duotone" /><span>尚未打卡<br /><small>点击徽章点亮</small></span></>}
                </div>
              </div>
            </div>
          </section>

          <section className="collection-section" id="collection" aria-labelledby="collection-title">
            <div className="section-heading">
              <div><div className="section-heading__index">01 · COLLECTION INDEX</div><h2 id="collection-title">三座城，三十枚印记。</h2></div>
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
                  <button className="badge-record__button" type="button" onClick={() => handleLandmarkClick(landmark)} aria-label={isUnlocked ? `查看已点亮的${landmark.title}徽章` : `点亮${landmark.title}徽章`}>
                    <HexBadge landmark={landmark} city={activeCity} unlocked={isUnlocked} celebrating={celebratingId === landmark.id} />
                  </button>
                  <div className="badge-record__copy"><div className="badge-record__serial"><span>{String(landmarks.indexOf(landmark) + 1).padStart(2, "0")}</span><span>{isUnlocked ? "ARCHIVED" : "UNDISCOVERED"}</span></div><h3>{landmark.title}</h3><p>{landmark.district}</p><span className={`badge-record__date ${isUnlocked ? "is-unlocked" : ""}`}>{isUnlocked ? `已于 ${formatDate(progress[landmark.id].checkedAt)} 记录` : "点击徽章 · 记录到访"}</span></div>
                </article>;
              })}
            </div>
            {visibleLandmarks.length === 0 && <div className="empty-state"><Compass aria-hidden="true" size={38} weight="duotone" /><strong>{filter === "unlocked" ? "这座城还没有点亮的徽章" : "这座城的十枚徽章都已收入档案"}</strong><span>{filter === "unlocked" ? "去发现一处地标，让第一枚印记开始发光。" : "换一个筛选，或继续回味你的城市足迹。"}</span></div>}
          </section>

          <section className="journal-section" id="journal" aria-labelledby="journal-title">
            <div className="journal-section__main">
              <div className="section-heading section-heading--compact"><div><div className="section-heading__index">02 · MEMORY LOG</div><h2 id="journal-title">最近点亮的地方。</h2></div><span className="journal-section__count">{String(totalUnlocked).padStart(2, "0")} MOMENTS</span></div>
              {recentLandmarks.length > 0 ? <div className="journal-list">{recentLandmarks.map((landmark) => {
                const city = cities.find((item) => item.id === landmark.city) || cities[0];
                return <button className="journal-entry" key={landmark.id} type="button" onClick={() => { setActiveCityId(city.id); setSelectedId(landmark.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}><span className="journal-entry__icon" style={{ "--entry-accent": city.accent }}><LandmarkIcon name={landmark.icon} size={22} weight="duotone" /></span><span className="journal-entry__copy"><strong>{landmark.title}</strong><small>{city.name} · {landmark.district}</small></span><time dateTime={progress[landmark.id].checkedAt}>{formatDate(progress[landmark.id].checkedAt)}</time><ArrowUpRight aria-hidden="true" size={19} weight="bold" /></button>;
              })}</div> : <div className="journal-empty"><Clock aria-hidden="true" size={23} weight="duotone" /><span>你的第一枚徽章，会在这里留下时间。</span></div>}
            </div>
            <aside className="archive-card" aria-labelledby="archive-card-title">
              <div className="archive-card__topline"><span>ARCHIVE STATUS</span><Medal aria-hidden="true" size={21} weight="duotone" /></div>
              <div className="archive-card__number"><strong>{String(totalUnlocked).padStart(2, "0")}</strong><span>/ 30</span></div>
              <h3 id="archive-card-title">你的城市档案</h3><p>{totalUnlocked === 0 ? "从第一枚徽章开始，留下属于你的城市顺序。" : `已经把 ${totalUnlocked} 个瞬间收入档案，继续向前走。`}</p>
              <div className="archive-card__cities">{cities.map((city) => { const count = landmarks.filter((landmark) => landmark.city === city.id && progress[landmark.id]).length; return <div className="archive-card__city" key={city.id}><span><i style={{ backgroundColor: city.accent }} />{city.name}</span><strong>{count}/10</strong></div>; })}</div>
              <button className="reset-button" type="button" onClick={resetProgress} disabled={totalUnlocked === 0}><ArrowClockwise aria-hidden="true" size={16} weight="bold" /> 重置档案</button>
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
    </div>
  );
}

export { App };
