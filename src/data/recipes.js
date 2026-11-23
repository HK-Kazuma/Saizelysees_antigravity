// サイゼリーゼ レシピデータ (recipe.mdに完全準拠)

export const RECIPES = [
  // --- パスタ枠 ---
  {
    id: 'pasta_meat',
    name: 'ミートパスタ',
    category: 'pasta',
    categoryName: 'パスタ',
    price: 400,
    cost: 120,
    cookTime: 5,
    unlockLevel: 1,
    unlocked: true,
    equipment: 'pasta_boiler', // 茹で麺器/鍋
    desc: '特製ミートソースと茹でたて麺の王道パスタ。粉チーズとパセリがアクセント。',
    ingredients: ['麺', 'ミートソース 2杯', '粉チーズ 1杯', 'パセリ'],
    steps: [
      '鍋にミートソースを2杯入れて加熱する。',
      '茹で上がった麺を加熱した鍋に入れて混ぜる。',
      '皿に盛り、粉チーズ1杯とパセリを振る。'
    ],
    color: '#b23b23',
    icon: '🍝',
    popularity: 90
  },
  {
    id: 'pasta_parma',
    name: 'パルマ風パスタ',
    category: 'pasta',
    categoryName: 'パスタ',
    price: 400,
    cost: 130,
    cookTime: 5.5,
    unlockLevel: 2,
    unlocked: false,
    equipment: 'pasta_boiler',
    desc: 'トマトソースとパンチェッタの旨味が詰まった本格パルマ風パスタ。',
    ingredients: ['麺', 'トマトソース 1杯', 'パンチェッタ 1掴み', '粉チーズ 1杯'],
    steps: [
      '鍋にトマトソース1杯とパンチェッタ1掴みを入れて加熱する。',
      '茹で上がった麺を加熱した鍋に入れて混ぜる。',
      '皿に盛り、粉チーズ1杯を振る。'
    ],
    color: '#d64527',
    icon: '🍝',
    popularity: 85
  },
  {
    id: 'pasta_peperoncino',
    name: 'ペペロンチーノ',
    category: 'pasta',
    categoryName: 'パスタ',
    price: 300,
    cost: 80,
    cookTime: 4.5,
    unlockLevel: 1,
    unlocked: true,
    equipment: 'pasta_boiler',
    desc: 'ガーリックと唐辛子が香るシンプルながら癖になるオイルパスタ。',
    ingredients: ['麺', '塩オイルソース 1杯', 'ガーリックスライス 1杯', '唐辛子 1杯', 'パセリ'],
    steps: [
      '鍋に塩オイルソース、ガーリック、唐辛子を入れて加熱する。',
      '茹で上がった麺を皿に盛る。',
      '鍋のソースをかけ、パセリを振る。'
    ],
    color: '#e4b849',
    icon: '🧄',
    popularity: 92
  },
  {
    id: 'pasta_carbonara',
    name: 'カルボナーラ',
    category: 'pasta',
    categoryName: 'パスタ',
    price: 500,
    cost: 160,
    cookTime: 6,
    unlockLevel: 3,
    unlocked: false,
    equipment: 'pasta_boiler',
    desc: '湯煎した濃厚クリームパックとブラックペッパーが絶妙なサイゼ流カルボナーラ。',
    ingredients: ['麺', 'カルボナーラソース 1パック', '粉チーズ 1杯', 'ブラックペッパー'],
    steps: [
      'カルボナーラのパックを熱湯で3秒以上温める。',
      '温めたパックを鍋に入れ、加熱する。',
      '茹で上がった麺を皿に盛る。',
      '鍋のソースをかけ、粉チーズとブラックペッパーを振る。'
    ],
    color: '#f9e498',
    icon: '🍳',
    popularity: 95
  },
  {
    id: 'pasta_tarako',
    name: 'たらこのパスタ',
    category: 'pasta',
    categoryName: 'パスタ',
    price: 420,
    cost: 130,
    cookTime: 4,
    unlockLevel: 2,
    unlocked: false,
    equipment: 'pasta_boiler',
    desc: '老若男女に大人気のたらこパスタ。たっぷりの刻みのりが決め手。',
    ingredients: ['麺', 'たらこソース 1パック', '刻みのり'],
    steps: [
      '茹で上がった麺を皿に盛る。',
      'たらこソースを麺にかける。',
      '刻みのりをかける。'
    ],
    color: '#f38181',
    icon: '🥢',
    popularity: 98
  },
  {
    id: 'pasta_squid_ink',
    name: 'イカスミのパスタ',
    category: 'pasta',
    categoryName: 'パスタ',
    price: 500,
    cost: 170,
    cookTime: 6,
    unlockLevel: 5,
    unlocked: false,
    equipment: 'pasta_boiler',
    desc: '黒いソースの深いコクとイカの食感。お口が黒くなっても食べたい名物！',
    ingredients: ['麺', 'イカ墨のソース', 'イカ', 'パセリ 1杯'],
    steps: [
      '鍋にイカ墨のソースとイカを入れて加熱する。',
      '茹で上がった麺を加熱した鍋に入れて混ぜる。',
      '皿に盛り、パセリ1杯を振る。'
    ],
    color: '#2a2727',
    icon: '🦑',
    popularity: 88
  },
  {
    id: 'pasta_mushroom_cream',
    name: 'きのこのクリームパスタ',
    category: 'pasta',
    categoryName: 'パスタ',
    price: 500,
    cost: 160,
    cookTime: 6,
    unlockLevel: 4,
    unlocked: false,
    equipment: 'pasta_boiler',
    desc: 'ホワイトソースにきのこ、ほうれん草、パンチェッタが溶け合うリッチな味。',
    ingredients: ['麺', 'ホワイトソース', 'ほうれん草', 'パンチェッタ', 'きのこ', '塩オイルソース', '粉チーズ', 'ブラックペッパー'],
    steps: [
      '鍋にホワイトソース、具材、塩オイルソースを入れて加熱する。',
      '茹で上がった麺を皿に盛る。',
      '鍋のソースをかけ、粉チーズとブラックペッパーを振る。'
    ],
    color: '#eae2b7',
    icon: '🍄',
    popularity: 87
  },
  {
    id: 'pasta_arrabbiata',
    name: 'ペンネアラビアータ',
    category: 'pasta',
    categoryName: 'パスタ',
    price: 430,
    cost: 130,
    cookTime: 5.5,
    unlockLevel: 4,
    unlocked: false,
    equipment: 'pasta_boiler',
    desc: 'ピリッと辛いトマトソースがペンネの筋によく絡む大人のおつまみパスタ。',
    ingredients: ['ペンネ', 'トマトソース 1杯', 'ガーリックスライス 1杯', '唐辛子 1杯', 'パセリ'],
    steps: [
      'ペンネを茹でる。',
      '鍋にトマトソース、ガーリック、唐辛子を入れて加熱する。',
      '茹で上がったペンネを鍋に入れて混ぜる。',
      '皿に盛り、パセリを振る。'
    ],
    color: '#c92a2a',
    icon: '🌶️',
    popularity: 84
  },
  {
    id: 'side_spinach',
    name: 'ほうれん草のソテー',
    category: 'pasta',
    categoryName: 'パスタ・サイド',
    price: 200,
    cost: 60,
    cookTime: 3.5,
    unlockLevel: 1,
    unlocked: true,
    equipment: 'pan',
    desc: 'くたくたほうれん草とパンチェッタの塩気が最高の前菜サイドメニュー。',
    ingredients: ['ほうれん草 2掴み', 'パンチェッタ 1掴み', 'ソテーソース 1パック'],
    steps: [
      '鍋にほうれん草、パンチェッタ、ソテーソースを入れる。',
      '加熱して混ぜる。',
      '皿に盛る。'
    ],
    color: '#2b8a3e',
    icon: '🥬',
    popularity: 89
  },

  // --- ドリア＆グラタン枠 ---
  {
    id: 'doria_milano',
    name: 'ミラノ風ドリア',
    category: 'doria',
    categoryName: 'ドリア＆グラタン',
    price: 300,
    cost: 90,
    cookTime: 6,
    unlockLevel: 1,
    unlocked: true,
    equipment: 'oven', // オーブン
    desc: 'サイゼリーゼの絶対的看板メニュー！ターメリックライスとホワイト＆ミートソース。税込300円の奇跡。',
    ingredients: ['ミラノドリア（ベース）'],
    steps: [
      'ミラノドリアをオーブンで焼く。'
    ],
    color: '#e8590c',
    icon: '🥘',
    popularity: 100
  },
  {
    id: 'doria_cheese_milano',
    name: '焼きチーズミラノドリア',
    category: 'doria',
    categoryName: 'ドリア＆グラタン',
    price: 350,
    cost: 110,
    cookTime: 6.5,
    unlockLevel: 2,
    unlocked: false,
    equipment: 'oven',
    desc: 'ミラノドリアにとろ〜りチーズをたっぷり乗せて香ばしく焼き上げた逸品。',
    ingredients: ['焼きチーズミラノドリア（ベース）', 'パセリ'],
    steps: [
      '焼きチーズミラノドリアをオーブンで焼く。',
      '仕上げにパセリを振る。'
    ],
    color: '#f76707',
    icon: '🧀',
    popularity: 96
  },
  {
    id: 'doria_tarako',
    name: 'たらこのドリア',
    category: 'doria',
    categoryName: 'ドリア＆グラタン',
    price: 400,
    cost: 130,
    cookTime: 6.5,
    unlockLevel: 3,
    unlocked: false,
    equipment: 'oven',
    desc: 'たらこソースにポップコーンシュリンプ3つとグランモラビアをのせて焼き上げたドリア。',
    ingredients: ['たらこのドリアベース（たらこソース・シュリンプ3個・グランモラビア）'],
    steps: [
      'たらこのドリアをオーブンで焼く。'
    ],
    color: '#ff8787',
    icon: '🍤',
    popularity: 91
  },
  {
    id: 'gratin_tarako',
    name: 'たらこのグラタン',
    category: 'doria',
    categoryName: 'ドリア＆グラタン',
    price: 430,
    cost: 140,
    cookTime: 6.5,
    unlockLevel: 4,
    unlocked: false,
    equipment: 'oven',
    desc: 'マカロニとホワイトソース、たらこシュリンプの黄金コンビグラタン。',
    ingredients: ['たらこのグラタンベース（たらこソース・シュリンプ3個・グランモラビア・パセリ）'],
    steps: [
      'たらこのグラタンをオーブンで焼く。'
    ],
    color: '#fa5252',
    icon: '🥧',
    popularity: 90
  },

  // --- サラダ・スープ枠 ---
  {
    id: 'salad_shrimp',
    name: '小エビのサラダ',
    category: 'salad',
    categoryName: 'サラダ・スープ',
    price: 350,
    cost: 100,
    cookTime: 3,
    unlockLevel: 1,
    unlocked: true,
    equipment: 'salad_station', // サラダ台
    desc: '甘みのある小エビが山盛り！特製サイゼドレッシングとパプリカパウダーの調和。',
    ingredients: ['サラダベース（レタス・彩野菜・ミニトマト2個）', '小エビ 1杯', 'ドレッシング', 'パプリカパウダー'],
    steps: [
      'サラダベースに小エビ1杯を盛る。',
      'ドレッシングをかける。',
      'パプリカパウダーを振る。'
    ],
    color: '#ff922b',
    icon: '🥗',
    popularity: 99
  },
  {
    id: 'salad_chicken',
    name: 'チキンのサラダ',
    category: 'salad',
    categoryName: 'サラダ・スープ',
    price: 350,
    cost: 100,
    cookTime: 3,
    unlockLevel: 2,
    unlocked: false,
    equipment: 'salad_station',
    desc: 'ヘルシーなしっとりサラダチキンがたっぷり乗った高たんぱくサラダ。',
    ingredients: ['サラダベース', 'サラダチキン 1掴み', 'ドレッシング', 'パプリカパウダー'],
    steps: [
      'サラダベースにサラダチキン1掴みを盛る。',
      'ドレッシングをかける。',
      'パプリカパウダーを振る。'
    ],
    color: '#fab005',
    icon: '🥗',
    popularity: 88
  },
  {
    id: 'salad_wakame',
    name: 'わかめのサラダ',
    category: 'salad',
    categoryName: 'サラダ・スープ',
    price: 350,
    cost: 90,
    cookTime: 3,
    unlockLevel: 2,
    unlocked: false,
    equipment: 'salad_station',
    desc: '三陸産わかめのシャキシャキ食感。サイゼドレッシングとの相性抜群。',
    ingredients: ['サラダベース', 'わかめ 2掴み', 'ドレッシング', 'パプリカパウダー'],
    steps: [
      'サラダベースにわかめ2掴みを盛る。',
      'ドレッシングをかける。',
      'パプリカパウダーを振る。'
    ],
    color: '#51cf66',
    icon: '🥗',
    popularity: 85
  },
  {
    id: 'appetizer_shrimp_cocktail',
    name: '小エビのカクテル',
    category: 'salad',
    categoryName: 'サラダ・スープ',
    price: 280,
    cost: 80,
    cookTime: 2.5,
    unlockLevel: 3,
    unlocked: false,
    equipment: 'salad_station',
    desc: 'わかめと小エビ2杯のさわやか前菜。白ワインのお供に最適。',
    ingredients: ['わかめ 1掴み', '小エビ 2杯', 'ドレッシング', 'パプリカパウダー'],
    steps: [
      '器にわかめ1掴みと小エビ2杯を盛る。',
      'ドレッシングをかける。',
      'パプリカパウダーを振る。'
    ],
    color: '#ff6b6b',
    icon: '🦐',
    popularity: 86
  },
  {
    id: 'appetizer_steamed_chicken',
    name: '蒸し鶏の香味ソース',
    category: 'salad',
    categoryName: 'サラダ・スープ',
    price: 280,
    cost: 80,
    cookTime: 2.5,
    unlockLevel: 4,
    unlocked: false,
    equipment: 'salad_station',
    desc: '柔らか蒸し鶏に特製野菜ペーストとガルムソースをかけた人気の一皿。',
    ingredients: ['わかめ 1掴み', 'サラダチキン 2杯', '野菜ペースト', 'ガルムソース'],
    steps: [
      '器にわかめ1掴みとサラダチキン2杯を盛る。',
      '野菜ペーストをかける。',
      'ガルムソースをかける。'
    ],
    color: '#82c91e',
    icon: '🍗',
    popularity: 89
  },
  {
    id: 'soup_corn',
    name: 'コーンスープ',
    category: 'salad',
    categoryName: 'サラダ・スープ',
    price: 150,
    cost: 40,
    cookTime: 2,
    unlockLevel: 1,
    unlocked: true,
    equipment: 'pasta_boiler', // 熱湯温め
    desc: 'スーパースイートコーンの甘み。熱湯パックで温めたほっとする美味しさ。',
    ingredients: ['コーンスープ 1パック'],
    steps: [
      'コーンスープのパックを熱湯で5秒以上温める。',
      '温めたパックをスープ皿に注ぐ。'
    ],
    color: '#ffd43b',
    icon: '🥣',
    popularity: 94
  },

  // --- ピザ枠 ---
  {
    id: 'pizza_buffalo',
    name: 'バッファローピザ',
    category: 'pizza',
    categoryName: 'ピザ',
    price: 400,
    cost: 130,
    cookTime: 6,
    unlockLevel: 2,
    unlocked: false,
    equipment: 'oven',
    desc: '水牛のモッツァレラチーズがミルキーにとろける本格ナポリ風ピザ。',
    ingredients: ['ピザ生地', 'ピザソース 1杯', 'ピザチーズ 1杯', 'モッツァレラ 2個（6分割）'],
    steps: [
      'ピザ生地にソースを塗り、チーズを広げる。',
      '6つに分けたモッツァレラチーズを周囲にのせる。',
      'オーブンで焼く。'
    ],
    color: '#f03e3e',
    icon: '🍕',
    popularity: 97
  },
  {
    id: 'pizza_veggie_mushroom',
    name: '野菜ときのこのピザ',
    category: 'pizza',
    categoryName: 'ピザ',
    price: 400,
    cost: 120,
    cookTime: 6,
    unlockLevel: 3,
    unlocked: false,
    equipment: 'oven',
    desc: '彩り野菜ときのこがたっぷり。ヘルシーで香ばしいクリスピーピザ。',
    ingredients: ['ピザ生地', 'ピザソース', 'ピザチーズ', '野菜ときのこ 1杯'],
    steps: [
      'ピザ生地にピザソースを塗り、ピザチーズを広げる。',
      '野菜ときのこ1杯をのせる。',
      'オーブンで焼く。'
    ],
    color: '#2f9e44',
    icon: '🍕',
    popularity: 84
  },
  {
    id: 'pizza_sausage',
    name: 'ソーセージピザ',
    category: 'pizza',
    categoryName: 'ピザ',
    price: 400,
    cost: 120,
    cookTime: 6,
    unlockLevel: 3,
    unlocked: false,
    equipment: 'oven',
    desc: 'ジューシーなソーセージがゴロゴロ乗った子供にも大人気の一枚。',
    ingredients: ['ピザ生地', 'ピザソース', 'ピザチーズ', 'ソーセージ 1杯'],
    steps: [
      'ピザ生地にピザソースを塗り、ピザチーズを広げる。',
      'ソーセージ1杯をのせる。',
      'オーブンで焼く。'
    ],
    color: '#d9480f',
    icon: '🍕',
    popularity: 91
  },
  {
    id: 'pizza_corn',
    name: 'コーンピザ',
    category: 'pizza',
    categoryName: 'ピザ',
    price: 400,
    cost: 110,
    cookTime: 6,
    unlockLevel: 2,
    unlocked: false,
    equipment: 'oven',
    desc: 'スイートコーンの甘みとマヨ風味のコクがたまらないピザ。',
    ingredients: ['ピザ生地', 'ピザソース', 'ピザチーズ', 'コーン 1杯'],
    steps: [
      'ピザ生地にピザソースを塗り、ピザチーズを広げる。',
      'コーン1杯をのせる。',
      'オーブンで焼く。'
    ],
    color: '#fcc419',
    icon: '🍕',
    popularity: 90
  },

  // --- 前菜枠 ---
  {
    id: 'appetizer_popcorn_shrimp',
    name: 'ポップコーンシュリンプ',
    category: 'appetizer',
    categoryName: '前菜',
    price: 300,
    cost: 90,
    cookTime: 4,
    unlockLevel: 1,
    unlocked: true,
    equipment: 'oven',
    desc: 'サクサク衣のエビフライ9粒。特製サウザンソースにディップ！',
    ingredients: ['ポップコーンシュリンプ 9つ'],
    steps: [
      'ポップコーンシュリンプ9つをオーブンで焼く。'
    ],
    color: '#fd7e14',
    icon: '🍤',
    popularity: 95
  },
  {
    id: 'appetizer_grilled_potato',
    name: 'ポテトのグリル',
    category: 'appetizer',
    categoryName: '前菜',
    price: 250,
    cost: 60,
    cookTime: 4,
    unlockLevel: 1,
    unlocked: true,
    equipment: 'oven',
    desc: 'ホクホクの角切りポテト8個を横4×縦2に並べてカリッと焼き上げた定番。',
    ingredients: ['下調理したポテト 8個'],
    steps: [
      'ポテト8個（横4×縦2）を並べてオーブンで焼く。'
    ],
    color: '#e67700',
    icon: '🥔',
    popularity: 92
  },
  {
    id: 'appetizer_chorizo',
    name: 'チョリソー',
    category: 'appetizer',
    categoryName: '前菜',
    price: 400,
    cost: 120,
    cookTime: 4.5,
    unlockLevel: 3,
    unlocked: false,
    equipment: 'oven',
    desc: 'ピリ辛のソーセージ5本とポテト2個の鉄板グリル。お酒が進む！',
    ingredients: ['ソーセージ 5本', 'ポテト 2個'],
    steps: [
      'ソーセージ5本とポテト2個を並べてオーブンで焼く。'
    ],
    color: '#c92a2a',
    icon: '🌭',
    popularity: 91
  },
  {
    id: 'appetizer_spicy_chicken',
    name: '辛味チキン',
    category: 'appetizer',
    categoryName: '前菜',
    price: 300,
    cost: 90,
    cookTime: 4.5,
    unlockLevel: 1,
    unlocked: true,
    equipment: 'oven',
    desc: 'サイゼリヤを代表する超人気メニュー！カリッとした皮とジューシーな肉。',
    ingredients: ['辛味チキン 4つ', '脂取りシート'],
    steps: [
      '器に脂取りシートを敷き、辛味チキン4つをのせてオーブンで焼く。'
    ],
    color: '#e8590c',
    icon: '🍗',
    popularity: 100
  },

  // --- 焼きたてパン枠 ---
  {
    id: 'bread_focaccia',
    name: 'フォッカチオ',
    category: 'bread',
    categoryName: '焼きたてパン',
    price: 150,
    cost: 40,
    cookTime: 3.5,
    unlockLevel: 1,
    unlocked: true,
    equipment: 'oven',
    desc: 'もっちり焼き上げたイタリア伝統の平焼きパン。料理のソースをつけて召し上がれ。',
    ingredients: ['フォッカチオ 1つ'],
    steps: [
      'フォッカチオをオーブンで焼く。'
    ],
    color: '#d99b26',
    icon: '🍞',
    popularity: 93
  },
  {
    id: 'bread_cinnamon_focaccia',
    name: 'シナモンフォッカチオ',
    category: 'bread',
    categoryName: '焼きたてパン',
    price: 200,
    cost: 50,
    cookTime: 3.5,
    unlockLevel: 2,
    unlocked: false,
    equipment: 'oven',
    desc: 'アツアツのフォッカチオに甘いシナモンシュガーをたっぷり振りかけたデザートパン。',
    ingredients: ['フォッカチオ 1つ', 'シナモンパウダー'],
    steps: [
      'フォッカチオをオーブンで焼く。',
      '焼き上がりにシナモンパウダーを振る。'
    ],
    color: '#8c501e',
    icon: '🥐',
    popularity: 89
  },
  {
    id: 'bread_garlic_focaccia',
    name: 'ガーリックフォッカチオ',
    category: 'bread',
    categoryName: '焼きたてパン',
    price: 200,
    cost: 50,
    cookTime: 3.5,
    unlockLevel: 2,
    unlocked: false,
    equipment: 'oven',
    desc: '香ばしいガーリックソースが染み込んだ食欲そそる焼きたてフォッカチオ。',
    ingredients: ['フォッカチオ 1つ', 'ガーリックソース'],
    steps: [
      'フォッカチオをオーブンで焼く。',
      '焼き上がりにガーリックソースをかける。'
    ],
    color: '#b08922',
    icon: '🥖',
    popularity: 90
  },
  {
    id: 'bread_tarako_focaccia',
    name: 'たらこのフォッカチオ',
    category: 'bread',
    categoryName: '焼きたてパン',
    price: 250,
    cost: 70,
    cookTime: 4,
    unlockLevel: 3,
    unlocked: false,
    equipment: 'oven',
    desc: 'フォッカチオを逆さまにして平らな面にたらこソースとグランモラビアをのせて焼成。',
    ingredients: ['フォッカチオ 1つ', 'たらこソース', 'グランモラビア'],
    steps: [
      'フォッカチオを逆さまにして、平らな面にたらこソースとグランモラビアをのせる。',
      'オーブンで焼く。'
    ],
    color: '#e56f6f',
    icon: '🍞',
    popularity: 92
  },
  {
    id: 'bread_cheese_focaccia',
    name: 'チーズフォッカチオ',
    category: 'bread',
    categoryName: '焼きたてパン',
    price: 250,
    cost: 70,
    cookTime: 4,
    unlockLevel: 3,
    unlocked: false,
    equipment: 'oven',
    desc: '香ばしく焦げたチーズとグランモラビアのコクがたまらない裏面焼きフォッカチオ。',
    ingredients: ['フォッカチオ 1つ', 'ピザチーズ 1/2杯', 'グランモラビア'],
    steps: [
      'フォッカチオを逆さまにして、平らな面にピザチーズとグランモラビアをのせる。',
      'オーブンで焼く。'
    ],
    color: '#e69822',
    icon: '🧀',
    popularity: 93
  },

  // --- 肉料理枠 ---
  {
    id: 'meat_hamburg',
    name: 'ハンバーグ',
    category: 'meat',
    categoryName: '肉料理',
    price: 400,
    cost: 140,
    cookTime: 6.5,
    unlockLevel: 2,
    unlocked: false,
    equipment: 'oven',
    desc: 'ジューシーな牛肉100%パティにデミグラスソースと目玉焼き、ポテト・コーン付き。',
    ingredients: ['パティ 1枚', 'コーン 1杯', 'ポテト 1個', 'デミグラスソース 1杯', '目玉焼き 1つ'],
    steps: [
      'パティをオーブンで焼く。',
      '一度取り出してヘラではがし、コーンとポテトをのせて再度焼く。',
      'デミグラスソースをかけ、目玉焼きをのせる。'
    ],
    color: '#7f3f1d',
    icon: '🥩',
    popularity: 96
  },
  {
    id: 'meat_italian_hamburg',
    name: 'イタリアンハンバーグ',
    category: 'meat',
    categoryName: '肉料理',
    price: 500,
    cost: 170,
    cookTime: 7,
    unlockLevel: 3,
    unlocked: false,
    equipment: 'oven',
    desc: 'たっぷりとろけるチーズと特製トマトソースの相性が抜群のごちそうハンバーグ。',
    ingredients: ['パティ 1枚', 'コーン 1杯', 'ポテト 1個', 'チーズソース（ピザソース・チーズ）'],
    steps: [
      'パティをオーブンで焼く。',
      '一度取り出しヘラではがし、コーン・ポテト・チーズソース容器をのせて再焼成。',
      '焼き上がったらチーズソースをかける。'
    ],
    color: '#c92a2a',
    icon: '🧀',
    popularity: 98
  },
  {
    id: 'meat_diavola_hamburg',
    name: 'ディアボラ風ハンバーグ',
    category: 'meat',
    categoryName: '肉料理',
    price: 500,
    cost: 160,
    cookTime: 7,
    unlockLevel: 4,
    unlocked: false,
    equipment: 'oven',
    desc: '秘伝の刻み玉ねぎ野菜ペーストがたっぷり！サイゼファン熱狂の傑作ハンバーグ。',
    ingredients: ['パティ 1枚', 'コーン 1杯', 'ポテト 1個', '野菜ペースト', '目玉焼き 1つ'],
    steps: [
      'パティをオーブンで焼く。',
      'ヘラではがし、コーンとポテトをのせて再度オーブンで焼く。',
      '焼き上がったら野菜ペーストをかけ、目玉焼きをのせる。'
    ],
    color: '#5c940d',
    icon: '🧅',
    popularity: 99
  },
  {
    id: 'meat_mixed_grill',
    name: 'ミックスグリル',
    category: 'meat',
    categoryName: '肉料理',
    price: 650,
    cost: 230,
    cookTime: 8,
    unlockLevel: 5,
    unlocked: false,
    equipment: 'oven',
    desc: 'ハンバーグ、辛味チキン2つ、シュリンプ5つ、ポテト、コーンのオールスター鉄板！',
    ingredients: ['パティ 1枚', '辛味チキン 2つ', 'シュリンプ 5つ', 'ポテト 2個', 'コーン 1杯', 'デミグラス'],
    steps: [
      'パティ、辛味チキン2つ、シュリンプ5つ、ポテト2個、コーン1杯を並べて焼く。',
      '焼き上がったらハンバーグにデミグラスソースをかける。'
    ],
    color: '#491212',
    icon: '🍖',
    popularity: 99
  },
  {
    id: 'meat_chicken_diavola',
    name: '若鶏のディアボラ風',
    category: 'meat',
    categoryName: '肉料理',
    price: 500,
    cost: 160,
    cookTime: 7,
    unlockLevel: 3,
    unlocked: false,
    equipment: 'oven',
    desc: '皮パリパリ肉汁ジューシーなチキンソテーに、やみつき野菜ペーストを添えて。',
    ingredients: ['チキン 1枚', 'コーン 1杯', 'ポテト 1個', '野菜ペースト'],
    steps: [
      'チキンをオーブンで焼く。',
      'ヘラではがし、コーンとポテトをのせて再度焼成。',
      '焼き上がったら野菜ペーストをかける。'
    ],
    color: '#74b816',
    icon: '🍗',
    popularity: 97
  },
  {
    id: 'meat_chicken_cheese',
    name: '柔らかチキンのチーズ焼き',
    category: 'meat',
    categoryName: '肉料理',
    price: 500,
    cost: 165,
    cookTime: 7,
    unlockLevel: 4,
    unlocked: false,
    equipment: 'oven',
    desc: 'チキンの香ばしさとピザソース・とろけるチーズの最強コラボレーション。',
    ingredients: ['チキン 1枚', 'コーン 1杯', 'ポテト 1個', 'チーズソース'],
    steps: [
      'チキンをオーブンで焼く。',
      'ヘラではがし、コーン・ポテト・チーズソース容器をのせて再焼成。',
      '焼き上がったらチーズソースをかける。'
    ],
    color: '#d9480f',
    icon: '🧀',
    popularity: 95
  },
  {
    id: 'meat_fried_egg',
    name: '付け合わせ：目玉焼き',
    category: 'meat',
    categoryName: '肉料理・トッピング',
    price: 100,
    cost: 30,
    cookTime: 3,
    unlockLevel: 1,
    unlocked: true,
    equipment: 'oven',
    desc: '専用鉄板でオーブン焼きしたぷるぷる半熟目玉焼き。1回で2つ完成！トッピングに最適。',
    ingredients: ['卵 2個'],
    steps: [
      '専用の鉄板に卵を2個割り入れ、オーブンで焼く（1回で2つ完成）。'
    ],
    color: '#ffd43b',
    icon: '🍳',
    popularity: 92
  },

  // --- ドリンク・ワイン枠 (添付画像にあった「白マグナム 1500ml」等) ---
  {
    id: 'drink_magnum_white',
    name: '白マグナム (1500ml)',
    category: 'drink',
    categoryName: 'ワイン・ドリンク',
    price: 1100,
    cost: 400,
    cookTime: 1.5,
    unlockLevel: 4,
    unlocked: false,
    equipment: 'drink_bar',
    desc: '画像にも描かれた大迫力の1.5Lイタリア直輸入白ワイン！仲間と乾杯する楽しき食卓の友。',
    ingredients: ['白ワインマグナムボトル 1本', 'ワイングラス'],
    steps: [
      'ボトルを冷やし、グラスとともに席へお届け。'
    ],
    color: '#a9e34b',
    icon: '🍾',
    popularity: 99
  },
  {
    id: 'soup_onion_zuppa',
    name: 'たまねぎのズッパ',
    category: 'salad',
    categoryName: 'サラダ・スープ',
    price: 320,
    cost: 95,
    cookTime: 4.5,
    unlockLevel: 2,
    unlocked: false,
    equipment: 'oven',
    desc: '画像右下に大きく描かれたサイゼ名物！じっくり炒めた玉ねぎとチーズがとろける熱々スープ。',
    ingredients: ['玉ねぎスープベース', 'パン', 'とろけるチーズ'],
    steps: [
      'スープベースにパンとチーズをのせてオーブンで香ばしく焼き上げる。'
    ],
    color: '#d97706',
    icon: '🥣',
    popularity: 98
  }
];
