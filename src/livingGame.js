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
    prompt: "选一块最适合月下展览的主布料。",
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
    prompt: "按完成顺序整理这张海报。",
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
    prompt: "选出能和深蓝房间相衬的两种花材。",
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
    prompt: "这盏灯该留下怎样的光？",
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
    prompt: "选出与今晚曲目最相衬的两枚。",
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
    prompt: "把它放进哪一格？",
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
    prompt: "选出今晚该留下的两样东西。",
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
    prompt: "你想在纸条上留下什么？",
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
    prompt: "选两盆留下来照顾。",
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
    prompt: "你们该先去哪里？",
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
    prompt: "替他选出两种适合带回家的花。",
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
    prompt: "按顺序安排你们的参观。",
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
    prompt: "路上想做哪件小事？",
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
    prompt: "按顺序让灯重新亮起来。",
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
    prompt: "替他选一句结尾。",
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
    prompt: "先去看哪一处？",
    options: ["白蔷薇架", "雾气玻璃", "长椅边的灯"],
    answer: 0,
    memory: "冬庭的白蔷薇，是我们先一起看见的。",
    keepsake: "温室钥匙扣",
  },
];

export const livingShopItems = [
  { id: "moon-coat", category: "外观", name: "月白长外套", price: "¥12", detail: "换上一套只在深夜小屋出现的月白外观。", reaction: "他低头理好衣袖，说这身是为你留的。", memory: "你为他选了一件月白长外套。" },
  { id: "silver-hairpin", category: "外观", name: "银羽发饰", price: "¥6", detail: "为他的白发添上一枚低调的银羽发饰。", reaction: "他抬手碰了碰发饰，别开脸说还算合适。", memory: "你替他别上了一枚银羽发饰。" },
  { id: "evening-suit", category: "外观", name: "暮色礼服", price: "¥18", detail: "解锁晚间展览与特别约会的礼服外观。", reaction: "他在镜前停了一瞬，回头问你是不是喜欢。", memory: "他穿上了你挑的暮色礼服。" },
  { id: "white-roses", category: "礼物", name: "一束白玫瑰", price: "¥6", detail: "赠予花束，触发一封简短回信。", reaction: "他把花放到窗边，替你写了一封只有三行的信。", memory: "你送给他一束白玫瑰。" },
  { id: "music-box", category: "礼物", name: "口袋音乐盒", price: "¥12", detail: "赠予音乐盒，触发专属旋律片段。", reaction: "他转动发条，让旋律在夜里慢慢响完。", memory: "你送给他一只口袋音乐盒。" },
  { id: "ink-pen", category: "礼物", name: "星墨钢笔", price: "¥8", detail: "赠予钢笔，触发一首即兴短诗。", reaction: "他用新钢笔写下一句诗，却不肯让你立刻看完。", memory: "你送给他一支星墨钢笔。" },
  { id: "window-lamp", category: "布置", name: "窗边琥珀灯", price: "¥8", detail: "让共同小屋多一盏可在晚间点亮的灯。", reaction: "他把灯调得很暗，说这样你回来时不会刺眼。", memory: "我们在窗边添了一盏琥珀灯。" },
  { id: "blue-wallpaper", category: "布置", name: "深海壁纸", price: "¥12", detail: "为小屋换上一面深蓝色的静谧墙面。", reaction: "他站在新墙面前，说这颜色像一段不被打扰的海。", memory: "我们给小屋换上了深海壁纸。" },
  { id: "reading-chair", category: "布置", name: "共读单椅", price: "¥18", detail: "解锁靠窗共读角落与夜间对话。", reaction: "他把书摊在扶手上，示意你坐近一点。", memory: "靠窗的位置多了一把我们一起选的单椅。" },
];

export const premiumBenefits = [
  "每日一则专属共同生活委托",
  "限定服饰、发型与小屋外观",
  "来信、旋律片段与节日事件",
];

export function chooseLivingMission(missions = livingMissions, recentIds = [], random = Math.random) {
  const freshMissions = missions.filter((mission) => !recentIds.includes(mission.id));
  const pool = freshMissions.length ? freshMissions : missions;
  return pool[Math.floor(random() * pool.length)];
}

export function applyMissionMove(mission, selection, optionIndex) {
  if (mission.kind === "choice") {
    return { completed: true, reset: false, selection: [optionIndex] };
  }

  if (mission.kind === "sequence") {
    const expectedOption = mission.answer[selection.length];

    if (optionIndex !== expectedOption) {
      return { completed: false, reset: true, selection: [] };
    }

    const nextSelection = [...selection, optionIndex];
    return {
      completed: nextSelection.length === mission.answer.length,
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

  const selectedPair = [...nextSelection].sort((first, second) => first - second);
  const answerPair = [...mission.answer].sort((first, second) => first - second);
  const completed = selectedPair.every((index, position) => index === answerPair[position]);

  return {
    completed,
    reset: !completed,
    selection: completed ? nextSelection : [],
  };
}
