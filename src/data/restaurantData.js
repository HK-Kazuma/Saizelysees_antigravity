// サイゼリーゼ 経営データ (設備・スタッフ・装飾・拡張・レベル)

export const INITIAL_EQUIPMENT = [
  {
    id: 'pasta_boiler',
    name: '特製パスタ茹で麺器',
    level: 1,
    maxLevel: 5,
    baseCost: 800,
    costMultiplier: 1.8,
    speedBonus: 0.15, // 15%短縮/Lv
    steamPower: 1,
    desc: '常にぐつぐつお湯が沸き、もくもく湯気が出る茹で麺器。パスタの茹で時間が短縮！',
    icon: '♨️'
  },
  {
    id: 'oven',
    name: '2段コンベア式オーブン',
    level: 1,
    maxLevel: 5,
    baseCost: 1000,
    costMultiplier: 1.8,
    speedBonus: 0.15,
    heatGlow: 1,
    desc: 'ドリアやピザ、ハンバーグを連続でこんがり焼き上げる高火力オーブン。',
    icon: '🔥'
  },
  {
    id: 'salad_station',
    name: '保冷サラダ仕込み台',
    level: 1,
    maxLevel: 5,
    baseCost: 600,
    costMultiplier: 1.7,
    speedBonus: 0.2,
    desc: 'シャキシャキのレタスや小エビを素早く盛り付けられる冷蔵仕込みカウンター。',
    icon: '🥗'
  },
  {
    id: 'drink_bar',
    name: 'サイゼ風ドリンクバー',
    level: 0, // 未購入からスタート
    maxLevel: 3,
    baseCost: 1500,
    costMultiplier: 2.0,
    revenueBonus: 50, // 来店客全員から+50円
    satisfactionBonus: 10,
    desc: 'ティーバッグや炭酸ジュース、メロンソーダを自由に楽しめる人気設備。客単価UP！',
    icon: '🥤'
  },
  {
    id: 'pos_register',
    name: '高速タッチパネルレジ',
    level: 1,
    maxLevel: 4,
    baseCost: 1200,
    costMultiplier: 1.8,
    speedBonus: 0.25,
    desc: 'スマートな伝票読み取りで、退店時の会計待ち時間を劇的に短縮。',
    icon: '📟'
  }
];

export const STAFF_TYPES = [
  {
    id: 'waiter',
    name: 'フロアスタッフ（給仕係）',
    role: 'floor',
    baseSalary: 1200, // 雇用費
    speed: 1.0,
    desc: '元気にお客様を案内し、注文を取り、熱々の料理を笑顔でお席へ運びます。',
    icon: '🧑‍🍳',
    spriteColor: '#008f39' // サイゼグリーンエプロン
  },
  {
    id: 'chef',
    name: 'キッチンシェフ（調理係）',
    role: 'kitchen',
    baseSalary: 1500,
    speed: 1.0,
    desc: '厨房で茹で麺器やオーブンをフル稼働させて、次々とオーダーを完成させます。',
    icon: '👨‍🍳',
    spriteColor: '#d12b2b' // イタリアンレッドバンダナ
  }
];

export const DECORATIONS = [
  {
    id: 'poster_original_framed',
    name: 'サイゼリーゼ原点の絵画ポスター',
    cost: 500,
    purchased: true, // 最初から壁に飾られている！
    effect: '客の満足度 +15%',
    satisfactionMultiplier: 1.15,
    desc: '「楽しい食卓 La Buona Tavola!」が描かれた象徴的なポスター。タップでじっくり鑑賞できます。',
    icon: '🖼️'
  },
  {
    id: 'italian_flag',
    name: 'イタリア国旗のタペストリー',
    cost: 800,
    purchased: false,
    effect: '客の来店頻度 +10%',
    spawnRateMultiplier: 1.10,
    desc: '緑・白・赤のトリコローレが店内を明るく華やかに引き立てます。',
    icon: '🇮🇹'
  },
  {
    id: 'antique_lamp',
    name: 'アンティーク真鍮ペンダントライト',
    cost: 1200,
    purchased: false,
    effect: '料理の見た目評価UP（売上 +10%）',
    revenueMultiplier: 1.10,
    desc: 'テーブルを温かく照らす電球色のライト。料理が一層美味しそうに見えます。',
    icon: '💡'
  },
  {
    id: 'olive_tree',
    name: '地中海のオリーブ鉢植え',
    cost: 1500,
    purchased: false,
    effect: '待機客の忍耐力 +25%',
    patienceMultiplier: 1.25,
    desc: '緑豊かな観葉植物。満席で並んでいるお客様を心穏やかに癒やします。',
    icon: '🌿'
  },
  {
    id: 'wine_shelf',
    name: 'イタリア産ワインウッドラック',
    cost: 2500,
    purchased: false,
    effect: '白マグナムの注文率 +50%',
    wineBoost: true,
    desc: '直輸入ワインのボトルがずらりと並ぶ、本格イタリアンらしい木製飾り棚。',
    icon: '🍷'
  }
];

export const EXPANSIONS = [
  {
    id: 'floor_1',
    level: 1,
    name: 'オープン当初（2席）',
    cost: 0,
    tables: 2,
    maxWait: 3,
    floorSize: 6,
    desc: '小さく温かい街角のスタート店舗。'
  },
  {
    id: 'floor_2',
    level: 2,
    name: '店舗拡張：フロア拡大（4席）',
    cost: 3000,
    tables: 4,
    maxWait: 5,
    floorSize: 8,
    desc: '壁を取り払って客席を2席増設！より多くのお客様を迎えられます。'
  },
  {
    id: 'floor_3',
    level: 3,
    name: '店舗拡張：中型レストラン（6席）',
    cost: 8000,
    tables: 6,
    maxWait: 7,
    floorSize: 10,
    desc: '広々としたフロア。ロードサイドの繁盛店並みの客席を確保。'
  },
  {
    id: 'floor_4',
    level: 4,
    name: '店舗拡張：大型フラッグシップ（8席）',
    cost: 20000,
    tables: 8,
    maxWait: 10,
    floorSize: 12,
    desc: 'サイゼリーゼの最高峰！大人数のファミリーや宴会にも対応する圧巻の広さ。'
  }
];

export const RESTAURANT_RANKS = [
  { level: 1, title: '街角の小さなサイゼ', expNeeded: 0 },
  { level: 2, title: '評判のトラットリア', expNeeded: 500 },
  { level: 3, title: '大人気のロードサイド店', expNeeded: 1800 },
  { level: 4, title: '行列のできる旗艦店', expNeeded: 5000 },
  { level: 5, title: '伝説のサイゼリーゼ本店', expNeeded: 12000 }
];
