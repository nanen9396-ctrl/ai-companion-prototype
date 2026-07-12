export const livingMissions = [
  {
    id: "midnight-pasta",
    category: "料理",
    kind: "sequence",
    title: "深夜奶油意面",
    scene: "夜已经很深，他却把围裙递给了你。",
    prompt: "把这份临时起意的晚餐按顺序完成。",
    options: ["擦干香草", "拌入热酱", "把面盛进盘里"],
    answer: [0, 1, 2],
    memory: "我们在深夜一起做了一份奶油意面。",
    keepsake: "银匙菜谱",
  },
  {
    id: "sea-salt-stew",
    category: "料理",
    kind: "pair",
    title: "海盐炖汤",
    scene: "他在窗边等水沸腾，问你想留下哪两样香气。",
    prompt: "选出最适合这一锅汤的两样材料。",
    options: ["海盐", "迷迭香", "冰块", "咖啡豆"],
    answer: [0, 1],
    memory: "他把海盐炖汤的第一口留给了你。",
    keepsake: "蓝釉汤匙",
  },
  {
    id: "strawberry-tart",
    category: "料理",
    kind: "choice",
    title: "草莓挞的最后一笔",
    scene: "甜香漫出来时，他把盘子推到你面前。",
    prompt: "你想怎样完成最后的装饰？",
    options: ["覆一层薄糖霜", "放一片薄荷", "留一张手写便签"],
    answer: 2,
    memory: "我们给草莓挞留了一句只属于彼此的话。",
    keepsake: "红莓便签",
  },
  {
    id: "rainy-tea",
    category: "料理",
    kind: "pair",
    title: "雨声里的热茶",
    scene: "窗上落着细雨，他把茶罐一一打开。",
    prompt: "替他挑出今晚最合适的两种香气。",
    options: ["伯爵茶", "桂花", "辣椒", "薄荷糖"],
    answer: [0, 1],
    memory: "下雨的晚上，他为你泡了一杯带桂花香的茶。",
    keepsake: "金边茶签",
  },
  {
    id: "silk-swatch",
    category: "设计",
    kind: "choice",
    title: "礼服的布料",
    scene: "设计台上铺着三块布料，他难得有些拿不定主意。",
    prompt: "月下展览的主布料，由你决定它要呈现怎样的气质。",
    options: ["雾银缎面", "暖橘绒布", "纯白亚麻"],
    answer: 0,
    memory: "他把展览礼服的第一块布料交给你决定。",
    keepsake: "雾银布样",
  },
  {
    id: "poster-layout",
    category: "设计",
    kind: "sequence",
    title: "演出的海报",
    scene: "他把草图摊开，等你一起把杂乱的灵感理顺。",
    prompt: "按你喜欢的创作节奏，安排这张海报的完成顺序。",
    options: ["确定留白", "放入主标题", "压上最后的印章"],
    answer: [0, 1, 2],
    memory: "我们把一张演出海报从草图完成到了最后。",
    keepsake: "烫银票根",
  },
  {
    id: "window-vase",
    category: "设计",
    kind: "pair",
    title: "窗边花器",
    scene: "午后的光落在空花器上，他让你替房间挑两样颜色。",
    prompt: "从花材中自由搭配两种，留下你喜欢的窗边色彩。",
    options: ["白玫瑰", "浅紫鸢尾", "荧光塑料花", "黑色丝带"],
    answer: [0, 1],
    memory: "他把窗边的花器留成了我们一起挑的颜色。",
    keepsake: "鸢尾压花",
  },
  {
    id: "lamp-shade",
    category: "设计",
    kind: "choice",
    title: "一盏新的灯",
    scene: "他想让小屋的夜晚再暖一点。",
    prompt: "你希望这盏灯为房间留下怎样的光？",
    options: ["清冷月白", "柔和琥珀", "明亮晨光"],
    answer: 1,
    memory: "我们替小屋选了一盏柔和的琥珀灯。",
    keepsake: "灯影草图",
  },
  {
    id: "demo-take",
    category: "音乐",
    kind: "sequence",
    title: "未公开的小样",
    scene: "录音室只亮着一盏灯，他把耳机轻轻扣到你头上。",
    prompt: "陪他完成这段旋律的录制顺序。",
    options: ["校准节拍", "录下主旋律", "听回放并标记"],
    answer: [0, 1, 2],
    memory: "你听到了他还没给任何人听过的旋律。",
    keepsake: "录音室通行贴",
  },
  {
    id: "piano-night",
    category: "音乐",
    kind: "choice",
    title: "夜里的钢琴",
    scene: "他问你，今晚想听哪一种开场。",
    prompt: "选出第一段旋律的情绪。",
    options: ["像雨后的石阶", "像远处的海", "像清晨的窗"],
    answer: 1,
    memory: "他为你弹了一段像远处海面的旋律。",
    keepsake: "手写小节",
  },
  {
    id: "concert-corsage",
    category: "音乐",
    kind: "pair",
    title: "登台前的胸针",
    scene: "演出前，他把三枚胸针放在掌心等你挑选。",
    prompt: "自由搭配两枚胸针，决定他今晚登台时的样子。",
    options: ["银月胸针", "深蓝宝石", "塑料笑脸", "荧光星星"],
    answer: [0, 1],
    memory: "登台前，他把你挑的胸针别在了衣襟上。",
    keepsake: "银月别针",
  },
  {
    id: "vinyl-shelf",
    category: "音乐",
    kind: "choice",
    title: "唱片架的一格",
    scene: "他把新唱片放到你手里，说该由你来决定它的位置。",
    prompt: "你想把它放进哪一格？每个位置都会成为共同记忆。",
    options: ["最常听的那一排", "靠窗的留白处", "旅行纪念的旁边"],
    answer: 2,
    memory: "他把新唱片放进了我们的旅行纪念旁。",
    keepsake: "深蓝唱片标",
  },
  {
    id: "bookshelf-order",
    category: "居家",
    kind: "sequence",
    title: "书架整理日",
    scene: "他嘴上说随便放，手却一直停在你选中的那一摞书旁。",
    prompt: "按顺序把书架的一角整理好。",
    options: ["擦拭木格", "按主题归类", "放入书签"],
    answer: [0, 1, 2],
    memory: "我们一起把书架的一角整理得很安静。",
    keepsake: "银灰书签",
  },
  {
    id: "blanket-fort",
    category: "居家",
    kind: "pair",
    title: "沙发角落",
    scene: "他想把沙发角落布置成不想出门的样子。",
    prompt: "自由挑两样东西，布置成你们今晚想待着的样子。",
    options: ["柔软毛毯", "小夜灯", "会议文件", "冷风扇"],
    answer: [0, 1],
    memory: "我们把沙发角落布置成了谁都不想离开的样子。",
    keepsake: "琥珀夜灯",
  },
  {
    id: "laundry-note",
    category: "居家",
    kind: "choice",
    title: "口袋里的纸条",
    scene: "整理衣物时，你从他的外套口袋里摸到一张空白便签。",
    prompt: "这张纸条没有标准写法，你想留下什么？",
    options: ["今晚早些回来", "记得照顾自己", "下次一起散步"],
    answer: 1,
    memory: "他在外套口袋里留着你写的提醒。",
    keepsake: "折角便签",
  },
  {
    id: "balcony-herbs",
    category: "居家",
    kind: "pair",
    title: "阳台香草",
    scene: "他把小盆栽排成一列，认真得像在安排一场仪式。",
    prompt: "从中自由搭配两盆，作为你们想一起照顾的香草。",
    options: ["迷迭香", "罗勒", "干枯纸花", "空花盆"],
    answer: [0, 1],
    memory: "阳台上多了两盆我们一起照顾的香草。",
    keepsake: "香草标签",
  },
  {
    id: "night-market",
    category: "出行",
    kind: "choice",
    title: "夜市绕路",
    scene: "回家的路上，他忽然停住脚步，说不如再走一会儿。",
    prompt: "今晚没有既定路线，你想先带他去哪里？",
    options: ["买一串烤栗子", "看看旧书摊", "去桥边吹风"],
    answer: 1,
    memory: "回家路上，我们在旧书摊前停了很久。",
    keepsake: "旧书票签",
  },
  {
    id: "station-flowers",
    category: "出行",
    kind: "pair",
    title: "车站的花束",
    scene: "他站在花店前，难得坦白说自己不太会挑花。",
    prompt: "自由搭配两种花，把你喜欢的颜色带回家。",
    options: ["白郁金香", "浅粉玫瑰", "塑料气球", "干枝"],
    answer: [0, 1],
    memory: "车站边的花束，是他和你一起挑回家的。",
    keepsake: "车站花卡",
  },
  {
    id: "museum-route",
    category: "出行",
    kind: "sequence",
    title: "展馆的下午",
    scene: "他把地图折好，等你决定这段安静的下午该怎样开始。",
    prompt: "按你自己的兴趣安排参观顺序。",
    options: ["从小展厅进入", "停在喜欢的画前", "在纪念册写下日期"],
    answer: [0, 1, 2],
    memory: "我们在展馆纪念册上写下了同一个日期。",
    keepsake: "展览入场券",
  },
  {
    id: "morning-train",
    category: "出行",
    kind: "choice",
    title: "清晨的列车",
    scene: "窗外刚亮，他把靠窗的位置留给你。",
    prompt: "靠窗的这段路，你想和他怎样度过？",
    options: ["听一张旧唱片", "读完一封信", "看窗外的云"],
    answer: 2,
    memory: "清晨的列车上，我们一起看着窗外的云。",
    keepsake: "车窗剪影",
  },
  {
    id: "tide-lantern",
    category: "异境",
    kind: "sequence",
    title: "潮汐灯的修理",
    scene: "海风掠过长廊，他把一盏熄灭的潮汐灯交给你。",
    prompt: "用你认为合适的顺序尝试唤醒这盏灯。",
    options: ["擦净灯罩", "放入月光石", "轻轻转动底座"],
    answer: [0, 1, 2],
    memory: "我们让海边长廊的一盏潮汐灯重新亮起。",
    keepsake: "月光石碎片",
  },
  {
    id: "royal-letter",
    category: "异境",
    kind: "choice",
    title: "未寄出的信",
    scene: "他把一封写到一半的信压在书下，问你该用哪一种结尾。",
    prompt: "这封信可以有不同结尾，你想替他留下哪一句？",
    options: ["愿你安然", "等我归来", "今晚见"],
    answer: 2,
    memory: "他把一封未寄出的信，用“今晚见”作了结尾。",
    keepsake: "王室火漆印",
  },
  {
    id: "star-map",
    category: "异境",
    kind: "pair",
    title: "星图旁的约定",
    scene: "他把星图摊在桌上，说只允许你挑两颗星留下记号。",
    prompt: "选出今晚的两颗星。",
    options: ["北方微光", "海面晨星", "褪色墨点", "空白圆孔"],
    answer: [0, 1],
    memory: "星图上多了两颗只属于我们的记号。",
    keepsake: "双星书签",
  },
  {
    id: "winter-garden",
    category: "异境",
    kind: "choice",
    title: "冬庭的温室",
    scene: "风雪被隔在玻璃外，他把温室的钥匙放到你手里。",
    prompt: "温室没有规定路线，你想先和他停在哪一处？",
    options: ["白蔷薇架", "雾气玻璃", "长椅边的灯"],
    answer: 0,
    memory: "冬庭的白蔷薇，是我们先一起看见的。",
    keepsake: "温室钥匙扣",
  },
];

export const houseRooms = [
  { id: "living", label: "客厅", note: "音乐与共读", quadrant: "top-left" },
  { id: "kitchen", label: "厨房", note: "料理与夜茶", quadrant: "top-right" },
  { id: "wardrobe", label: "衣帽间", note: "换装与设计", quadrant: "bottom-left" },
  { id: "balcony", label: "阳台", note: "花草与夜空", quadrant: "bottom-right" },
  { id: "bedroom", label: "卧室", note: "休息与衣橱", quadrant: "bottom-center" },
];

export const missionLocations = {
  "midnight-pasta": { room: "kitchen", objectId: "stove-pot", label: "灶台上的锅", x: 49, y: 43 },
  "sea-salt-stew": { room: "kitchen", objectId: "spice-board", label: "香料盘", x: 82, y: 65 },
  "strawberry-tart": { room: "kitchen", objectId: "oven", label: "烤箱", x: 84, y: 42 },
  "rainy-tea": { room: "kitchen", objectId: "tea-set", label: "茶具", x: 44, y: 64 },
  "silk-swatch": { room: "wardrobe", objectId: "fabric-table", label: "布料台", x: 88, y: 61 },
  "poster-layout": { room: "wardrobe", objectId: "design-desk", label: "设计桌", x: 88, y: 49 },
  "window-vase": { room: "balcony", objectId: "flower-vase", label: "窗边花器", x: 69, y: 68 },
  "lamp-shade": { room: "bedroom", objectId: "bedside-lamp", label: "床头灯", x: 12, y: 40 },
  "demo-take": { room: "living", objectId: "music-console", label: "录音台", x: 43, y: 46 },
  "piano-night": { room: "living", objectId: "piano", label: "钢琴", x: 60, y: 47 },
  "concert-corsage": { room: "wardrobe", objectId: "jewel-box", label: "首饰盒", x: 38, y: 52 },
  "vinyl-shelf": { room: "living", objectId: "record-player", label: "唱片机", x: 84, y: 43 },
  "bookshelf-order": { room: "living", objectId: "bookshelf", label: "书架", x: 24, y: 27 },
  "blanket-fort": { room: "bedroom", objectId: "bed", label: "床边毛毯", x: 43, y: 67 },
  "laundry-note": { room: "bedroom", objectId: "bedroom-closet", label: "卧室衣柜", x: 55, y: 34 },
  "balcony-herbs": { room: "balcony", objectId: "herb-planter", label: "香草盆", x: 73, y: 72 },
  "night-market": { room: "balcony", objectId: "ticket-bowl", label: "纪念小碟", x: 39, y: 73 },
  "station-flowers": { room: "balcony", objectId: "flower-rack", label: "花架", x: 85, y: 50 },
  "museum-route": { room: "wardrobe", objectId: "memory-board", label: "纪念板", x: 94, y: 30 },
  "morning-train": { room: "balcony", objectId: "window-seat", label: "窗边长椅", x: 25, y: 68 },
  "tide-lantern": { room: "balcony", objectId: "tide-lantern", label: "潮汐灯", x: 14, y: 75 },
  "royal-letter": { room: "bedroom", objectId: "letter-desk", label: "床边书桌", x: 82, y: 62 },
  "star-map": { room: "balcony", objectId: "star-map", label: "星图", x: 49, y: 27 },
  "winter-garden": { room: "balcony", objectId: "rose-planter", label: "白蔷薇", x: 89, y: 68 },
};

export const livingShopItems = [
  { id: "moon-coat", category: "外观", sceneRoom: "bedroom", name: "月白长外套", price: "¥12", detail: "收进卧室衣橱，之后可以随时换上这套月白外观。", reaction: "他低头理好衣袖，说这身是为你留的。", memory: "你为他选了一件月白长外套。" },
  { id: "silver-hairpin", category: "外观", sceneRoom: "bedroom", name: "银羽发饰", price: "¥6", detail: "收进卧室衣橱，在穿衣镜前随时为他戴上。", reaction: "他抬手碰了碰发饰，别开脸说还算合适。", memory: "你替他别上了一枚银羽发饰。" },
  { id: "evening-suit", category: "外观", sceneRoom: "bedroom", name: "暮色礼服", price: "¥18", detail: "收进卧室衣橱，为晚间展览与特别约会准备。", reaction: "他在镜前停了一瞬，回头问你是不是喜欢。", memory: "他穿上了你挑的暮色礼服。" },
  { id: "white-roses", category: "礼物", sceneRoom: "balcony", name: "一束白玫瑰", price: "¥6", detail: "把花束放到阳台花架，触发一封简短回信。", reaction: "他把花放到窗边，替你写了一封只有三行的信。", memory: "你送给他一束白玫瑰。" },
  { id: "music-box", category: "礼物", sceneRoom: "living", name: "口袋音乐盒", price: "¥12", detail: "把音乐盒放到客厅茶几，触发专属旋律片段。", reaction: "他转动发条，让旋律在夜里慢慢响完。", memory: "你送给他一只口袋音乐盒。" },
  { id: "ink-pen", category: "礼物", sceneRoom: "wardrobe", name: "星墨钢笔", price: "¥8", detail: "把钢笔放到设计桌，触发一首即兴短诗。", reaction: "他用新钢笔写下一句诗，却不肯让你立刻看完。", memory: "你送给他一支星墨钢笔。" },
  { id: "window-lamp", category: "布置", sceneRoom: "living", name: "窗边琥珀灯", price: "¥8", detail: "让客厅窗边多一盏可在晚间点亮的灯。", reaction: "他把灯调得很暗，说这样你回来时不会刺眼。", memory: "我们在窗边添了一盏琥珀灯。" },
  { id: "blue-wallpaper", category: "布置", sceneRoom: "wardrobe", name: "深海壁纸", price: "¥12", detail: "为衣帽间换上一面深蓝色的静谧墙面。", reaction: "他站在新墙面前，说这颜色像一段不被打扰的海。", memory: "我们给小屋换上了深海壁纸。" },
  { id: "reading-chair", category: "布置", sceneRoom: "living", name: "共读单椅", price: "¥18", detail: "在客厅窗边布置一处共读角落。", reaction: "他把书摊在扶手上，示意你坐近一点。", memory: "靠窗的位置多了一把我们一起选的单椅。" },
];

export const premiumBenefits = [
  "每日一则专属共同生活委托",
  "限定服饰、发型与小屋外观",
  "来信、旋律片段与节日事件",
];

export const sharedFlower = {
  id: "shared-flower",
  room: "balcony",
  name: "月白蔷薇",
  label: "我们的花",
  x: 84,
  y: 48,
};

export const defaultPlantState = {
  hydration: 52,
  nutrition: 46,
  carePoints: 0,
  log: [],
};

export const miniGameConfigs = {
  "midnight-pasta": {
    type: "cooking",
    title: "深夜料理台",
    instruction: "从食材架自由挑选 2–5 种，再决定烹饪技法。没有标准配方。",
    ingredients: [
      { id: "pasta", name: "意面", tags: ["醇厚"] },
      { id: "cream", name: "淡奶油", tags: ["醇厚", "柔滑"] },
      { id: "mushroom", name: "口蘑", tags: ["鲜香"] },
      { id: "spinach", name: "嫩菠菜", tags: ["清新"] },
      { id: "sea-salt", name: "海盐", tags: ["咸鲜"] },
      { id: "lemon", name: "柠檬皮屑", tags: ["清新"] },
      { id: "pepper", name: "黑胡椒", tags: ["辛香"] },
      { id: "cheese", name: "帕玛森", tags: ["浓郁"] },
    ],
    techniques: [
      { id: "slow-simmer", name: "慢火收汁", texture: "柔滑绵长" },
      { id: "quick-toss", name: "大火翻拌", texture: "明亮利落" },
      { id: "oven-bake", name: "烤箱焗香", texture: "焦香浓郁" },
    ],
  },
  "sea-salt-stew": {
    type: "cooking",
    title: "海盐炖锅",
    instruction: "选出今晚想留下的味道，再决定这一锅该怎样慢慢熟成。",
    ingredients: [
      { id: "white-fish", name: "白身鱼", tags: ["咸鲜", "轻盈"] },
      { id: "potato", name: "小土豆", tags: ["醇厚"] },
      { id: "tomato", name: "番茄", tags: ["酸甜", "清新"] },
      { id: "rosemary", name: "迷迭香", tags: ["辛香"] },
      { id: "onion", name: "甜洋葱", tags: ["甘甜"] },
      { id: "sea-salt", name: "海盐", tags: ["咸鲜"] },
      { id: "white-wine", name: "白葡萄汁", tags: ["清新", "果香"] },
      { id: "butter", name: "黄油", tags: ["浓郁", "柔滑"] },
    ],
    techniques: [
      { id: "clear-stew", name: "清炖", texture: "清澈温润" },
      { id: "cream-stew", name: "奶香慢炖", texture: "稠密柔和" },
      { id: "pan-roast", name: "先煎后炖", texture: "外焦内软" },
    ],
  },
  "strawberry-tart": {
    type: "cooking",
    title: "甜点工作台",
    instruction: "选 2–5 种材料做出你们自己的甜点，风味由搭配决定。",
    ingredients: [
      { id: "strawberry", name: "草莓", tags: ["酸甜", "果香"] },
      { id: "blueberry", name: "蓝莓", tags: ["酸甜"] },
      { id: "custard", name: "香草卡仕达", tags: ["柔滑", "甘甜"] },
      { id: "dark-chocolate", name: "黑巧", tags: ["微苦", "浓郁"] },
      { id: "mint", name: "薄荷", tags: ["清新"] },
      { id: "almond", name: "杏仁", tags: ["坚果香"] },
      { id: "lemon", name: "柠檬", tags: ["清新", "酸甜"] },
      { id: "sea-salt", name: "海盐", tags: ["咸鲜"] },
    ],
    techniques: [
      { id: "crisp-bake", name: "酥烤", texture: "酥脆轻盈" },
      { id: "cold-set", name: "冷藏凝固", texture: "冰凉柔滑" },
      { id: "sugar-torch", name: "炙烤糖面", texture: "薄脆焦香" },
    ],
  },
  "rainy-tea": {
    type: "cooking",
    title: "雨天调饮",
    instruction: "自由选择茶底与香气，调出只属于今天的一杯。",
    ingredients: [
      { id: "earl-grey", name: "伯爵茶", tags: ["茶香", "清新"] },
      { id: "oolong", name: "焙火乌龙", tags: ["茶香", "醇厚"] },
      { id: "osmanthus", name: "桂花", tags: ["花香", "甘甜"] },
      { id: "peach", name: "白桃", tags: ["果香", "甘甜"] },
      { id: "mint", name: "薄荷", tags: ["清新"] },
      { id: "honey", name: "蜂蜜", tags: ["甘甜"] },
      { id: "milk", name: "牛奶", tags: ["柔滑", "醇厚"] },
      { id: "lemon", name: "柠檬", tags: ["酸甜", "清新"] },
    ],
    techniques: [
      { id: "warm-steep", name: "温热冲泡", texture: "温润舒展" },
      { id: "cold-brew", name: "冷萃", texture: "清透轻盈" },
      { id: "milk-whisk", name: "奶沫调和", texture: "细腻绵密" },
    ],
  },
  "bookshelf-order": {
    type: "memory",
    title: "书签配对",
    instruction: "翻开六张书签，找出三组相同印记。",
    items: ["月", "海", "蔷薇"],
  },
  "star-map": {
    type: "memory",
    title: "双星记忆",
    instruction: "找出成对亮起的三组星象。",
    items: ["北星", "潮星", "晨星"],
  },
  "piano-night": {
    type: "harmony",
    title: "月色和声工坊",
    instruction: "在 C 大调中编排四个和弦。属功能需要回到主和弦，但有效路径不止一条。",
    keyLabel: "C 大调",
    tempo: 72,
    tonicIds: ["I"],
    dominantIds: ["V"],
    predominantIds: ["ii", "IV"],
    chords: [
      { id: "I", label: "I", name: "C 大三和弦", role: "主功能", notes: [261.63, 329.63, 392] },
      { id: "ii", label: "ii", name: "D 小三和弦", role: "下属功能", notes: [293.66, 349.23, 440] },
      { id: "IV", label: "IV", name: "F 大三和弦", role: "下属功能", notes: [349.23, 440, 523.25] },
      { id: "V", label: "V", name: "G 大三和弦", role: "属功能", notes: [392, 493.88, 587.33] },
      { id: "vi", label: "vi", name: "A 小三和弦", role: "主功能替代", notes: [440, 523.25, 659.25] },
    ],
  },
  "demo-take": {
    type: "harmony",
    title: "小调编曲台",
    instruction: "在 A 小调里写四和弦段落，用 V 级制造张力，再回到 i 级。",
    keyLabel: "A 小调",
    tempo: 66,
    tonicIds: ["i"],
    dominantIds: ["V"],
    predominantIds: ["ii°", "iv"],
    chords: [
      { id: "i", label: "i", name: "A 小三和弦", role: "主功能", notes: [220, 261.63, 329.63] },
      { id: "ii°", label: "ii°", name: "B 减三和弦", role: "下属功能", notes: [246.94, 293.66, 349.23] },
      { id: "iv", label: "iv", name: "D 小三和弦", role: "下属功能", notes: [293.66, 349.23, 440] },
      { id: "V", label: "V", name: "E 大三和弦", role: "属功能", notes: [329.63, 415.3, 493.88] },
      { id: "VI", label: "VI", name: "F 大三和弦", role: "主功能替代", notes: [349.23, 440, 523.25] },
    ],
  },
};

export function getHouseTimePhase(date = new Date()) {
  const hour = date.getHours();
  return hour >= 6 && hour < 18 ? "day" : "night";
}

export function createDishResult(config, ingredientIds, techniqueId) {
  const ingredientMap = new Map(config.ingredients.map((ingredient) => [ingredient.id, ingredient]));
  const ingredients = [...new Set(ingredientIds)].map((id) => ingredientMap.get(id)).filter(Boolean);
  const technique = config.techniques.find((item) => item.id === techniqueId);
  const min = config.minIngredients || 2;
  const max = config.maxIngredients || 5;

  if (!technique || ingredients.length < min || ingredients.length > max) {
    return { valid: false, message: `请选择 ${min}–${max} 种食材，并决定烹饪技法。` };
  }

  const tagCounts = new Map();
  ingredients.flatMap((ingredient) => ingredient.tags).forEach((tag) => tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1));
  const flavor = [...tagCounts.entries()].sort((first, second) => second[1] - first[1])[0]?.[0] || "平衡";
  const first = ingredients[0].name;
  const last = ingredients.at(-1).name;
  const name = `${first}与${last}的${technique.name}`;

  return {
    valid: true,
    name,
    flavor,
    texture: technique.texture,
    message: `${flavor}是主调，口感${technique.texture}。`,
    memory: `我们用${ingredients.map((item) => item.name).join("、")}，以${technique.name}做出了「${name}」。`,
  };
}

export function evaluateHarmonyProgression(config, chordIds) {
  if (chordIds.length !== 4) return { valid: false, score: 0, message: "先填满四个小节，再听它如何走向终点。" };
  const chordMap = new Map(config.chords.map((chord) => [chord.id, chord]));
  if (chordIds.some((id) => !chordMap.has(id))) return { valid: false, score: 0, message: "有一个和弦不属于当前调式。" };
  const finalId = chordIds.at(-1);
  if (!config.tonicIds.includes(finalId)) return { valid: false, score: 38, message: "最后还悬在空中：试着回到主和弦。" };
  const dominantIndex = chordIds.slice(0, -1).findLastIndex((id) => config.dominantIds.includes(id));
  if (dominantIndex < 0) return { valid: false, score: 52, message: "已经回家了，但少了属功能带来的张力。" };
  const hasPredominant = chordIds.slice(0, dominantIndex).some((id) => config.predominantIds.includes(id));
  const startsAtTonic = config.tonicIds.includes(chordIds[0]);
  const score = 74 + (hasPredominant ? 16 : 0) + (startsAtTonic ? 10 : 0);
  return {
    valid: true,
    score,
    message: hasPredominant ? "下属—属—主的方向很清楚，张力也被好好接住了。" : "属和弦顺利回到主和弦，这条进行成立。",
    memory: `我们在${config.keyLabel}里写下了 ${chordIds.join("–")} 的四和弦进行。`,
  };
}

export function getPlantStage(plant = defaultPlantState) {
  const points = Number(plant.carePoints) || 0;
  if (points >= 32) return { id: "bloom", label: "月白盛放", progress: 100 };
  if (points >= 18) return { id: "bud", label: "静静含苞", progress: Math.round((points / 32) * 100) };
  if (points >= 8) return { id: "leaf", label: "舒展新叶", progress: Math.round((points / 32) * 100) };
  return { id: "sprout", label: "初生嫩芽", progress: Math.round((points / 32) * 100) };
}

export function applyPlantCare(plant = defaultPlantState, action, now = new Date().toISOString()) {
  const actions = {
    water: { hydration: 24, nutrition: 0, points: 2, label: "浇水" },
    fertilize: { hydration: 0, nutrition: 22, points: 3, label: "施肥" },
    prune: { hydration: -3, nutrition: -2, points: 2, label: "修剪" },
    talk: { hydration: 0, nutrition: 0, points: 1, label: "陪它说话" },
  };
  const care = actions[action];
  if (!care) return { ...defaultPlantState, ...plant };
  const next = {
    ...defaultPlantState,
    ...plant,
    hydration: Math.max(0, Math.min(100, (Number(plant.hydration) || 0) + care.hydration)),
    nutrition: Math.max(0, Math.min(100, (Number(plant.nutrition) || 0) + care.nutrition)),
    carePoints: Math.min(40, (Number(plant.carePoints) || 0) + care.points),
    lastActionAt: now,
    [`last${action[0].toUpperCase()}${action.slice(1)}At`]: now,
  };
  next.log = [{ action, label: care.label, at: now }, ...(Array.isArray(plant.log) ? plant.log : [])].slice(0, 8);
  return next;
}

export function createMemoryDeck(items, random = Math.random) {
  const deck = items.flatMap((value, index) => [
    { id: `${index}-a`, value },
    { id: `${index}-b`, value },
  ]);

  for (let index = deck.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [deck[index], deck[swapIndex]] = [deck[swapIndex], deck[index]];
  }

  return deck;
}

export function chooseLivingMission(missions = livingMissions, recentIds = [], random = Math.random) {
  const freshMissions = missions.filter((mission) => !recentIds.includes(mission.id));
  const pool = freshMissions.length ? freshMissions : missions;
  return pool[Math.floor(random() * pool.length)];
}

export function chooseRoomMissions(
  missions = livingMissions,
  roomId = houseRooms[0].id,
  recentIds = [],
  random = Math.random,
  limit = 4,
) {
  const roomMissions = missions.filter((mission) => missionLocations[mission.id]?.room === roomId);
  const freshMissions = roomMissions.filter((mission) => !recentIds.includes(mission.id));
  const repeatedMissions = roomMissions.filter((mission) => recentIds.includes(mission.id));

  for (const pool of [freshMissions, repeatedMissions]) {
    for (let index = pool.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(random() * (index + 1));
      [pool[index], pool[swapIndex]] = [pool[swapIndex], pool[index]];
    }
  }

  const roomLimit = roomId === sharedFlower.room ? 3 : 4;
  return [...freshMissions, ...repeatedMissions].slice(0, Math.max(0, Math.min(roomLimit, limit)));
}

export function applyMissionMove(mission, selection, optionIndex) {
  if (mission.kind === "choice") {
    return { completed: true, reset: false, selection: [optionIndex] };
  }

  if (mission.kind === "sequence") {
    const nextSelection = selection.includes(optionIndex)
      ? selection.filter((index) => index !== optionIndex)
      : [...selection, optionIndex];
    const targetLength = Array.isArray(mission.answer) ? mission.answer.length : mission.options.length;
    return {
      completed: nextSelection.length === targetLength,
      reset: false,
      selection: nextSelection,
    };
  }

  const nextSelection = selection.includes(optionIndex)
    ? selection.filter((index) => index !== optionIndex)
    : [...selection, optionIndex].slice(-2);

  if (nextSelection.length < 2) {
    return { completed: false, reset: false, selection: nextSelection };
  }

  return {
    completed: true,
    reset: false,
    selection: nextSelection,
  };
}
