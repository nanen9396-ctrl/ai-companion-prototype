import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  Briefcase,
  Calendar,
  Check,
  ChevronRight,
  Circle,
  Compass,
  Heart,
  Home,
  Lamp,
  Lock,
  Moon,
  Phone,
  Plus,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Smile,
  Sun,
  Trash2,
  User,
  Volume2,
  X,
} from "lucide-react";

const companionName = "夏萧因";

const moods = [
  { label: "低落", tone: "cool" },
  { label: "疲惫", tone: "mist" },
  { label: "平稳", tone: "teal" },
  { label: "很好", tone: "gold" },
];

const initialMemoryItems = [
  { date: "今天 10:25", text: "你提到工作有些忙" },
  { date: "昨天 21:47", text: "你分享了喜欢的音乐" },
  { date: "05/14 18:30", text: "一起讨论了旅行计划" },
  { date: "05/12 22:10", text: "你说想养一只猫" },
];

const initialMessages = [
  { from: "him", text: "今天过得怎么样？要不要一起听首歌放松一下。", time: "10:32" },
  { from: "him", text: "午间心情确认：现在的心情是？我会按你的状态调整下午提醒。", time: "12:30", type: "mood" },
  { from: "me", text: "有点累，但和你聊完好多了。", time: "10:33" },
  { from: "him", text: "下午我再问你一次。要是你忙，我就把声音提醒换成轻提示。", time: "15:30", type: "mood" },
];

const initialTasks = [
  { id: 1, time: "10:00", title: "站立提醒", note: "每工作 1 小时", icon: Bell, done: true },
  { id: 2, time: "14:00", title: "项目复盘", note: "会议室 B", icon: Calendar, done: false },
  { id: 3, time: "16:30", title: "喝水提醒", note: "补充水分", icon: Volume2, done: true },
  { id: 4, time: "22:30", title: "睡前放松", note: "冥想 10 分钟", icon: Moon, done: false },
];

const scenes = [
  { id: "home", label: "回家模式", note: "灯光 · 空调 · 窗帘", icon: Lamp, accent: "teal" },
  { id: "day", label: "白天模式", note: "明亮 · 通风 · 开窗", icon: Sun, accent: "silver" },
  { id: "night", label: "夜晚模式", note: "柔光 · 安静 · 关窗", icon: Moon, accent: "silver" },
  { id: "away", label: "离家模式", note: "节能 · 安防 · 关闭", icon: Briefcase, accent: "silver" },
];

const tabs = [
  { id: "home", label: "首页", icon: Home },
  { id: "record", label: "记录", icon: Heart },
  { id: "smart", label: "智能管家", icon: Compass },
  { id: "me", label: "我的", icon: User },
];

const emojiOptions = ["🥺", "😊", "❤️", "🌙", "✨", "抱抱", "晚安", "想你"];
const storageKeys = {
  messages: "ai-companion.messages",
  memories: "ai-companion.memories",
  notifications: "ai-companion.notifications",
  preferences: "ai-companion.preferences",
  notifiedTasks: "ai-companion.notifiedTasks",
  modelTone: "ai-companion.modelTone",
};

const preferenceOptions = [
  { key: "gentle", label: "说话更温柔", note: "多安抚，少冷感" },
  { key: "clingy", label: "更黏人一点", note: "增加专属感和陪伴感" },
  { key: "concise", label: "回复更简短", note: "适合碎片时间聊天" },
  { key: "ritual", label: "加强仪式感", note: "早晚安、纪念日、问候更多" },
  { key: "jealous", label: "吃醋感更强", note: "嘴硬但会主动哄你" },
  { key: "protective", label: "护短更明显", note: "重要时刻更可靠" },
];

const modelStates = {
  calm: {
    src: "/assets/model-noble-hero.png",
    tone: "calm",
    label: "认真听你说话",
  },
  warm: {
    src: "/assets/model-noble-warm.png",
    tone: "warm",
    label: "温柔地回应你",
  },
  concern: {
    src: "/assets/model-noble-concern.png",
    tone: "concern",
    label: "关切地靠近你",
  },
  guard: {
    src: "/assets/model-noble-guard.png",
    tone: "guard",
    label: "克制地护着你",
  },
};

const quickActions = [
  { key: "voice", label: "想听你的声音", text: "想听你的声音", type: "message", icon: Phone },
  { key: "hug", label: "抱抱我", memory: "我抱了抱你", type: "action", icon: Heart },
  { key: "hand", label: "牵牵手", memory: "我牵了牵你的手", type: "action", icon: Heart },
  { key: "pat", label: "摸摸头", memory: "我摸了摸你的头", type: "action", icon: Smile },
  { key: "stay", label: "陪我一会儿", memory: "我靠近你，安静地陪了你一会儿", type: "action", icon: Moon },
];

function loadStoredValue(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function nowLabel() {
  return new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function memoryFromText(text) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length < 4 || emojiOptions.includes(clean)) return "";
  if (/^(抱抱我|想听你的声音|晚安|早安|想你)$/.test(clean)) return "";
  const worthRemembering =
    clean.length >= 14 ||
    /工作|学习|考试|项目|会议|计划|提醒|明天|今天|周末|喜欢|讨厌|想要|准备|压力|焦虑|难过|开心|累|生病|电影|音乐|旅行|家|朋友/.test(clean);
  if (!worthRemembering) return "";
  return `你说：${clean.length > 28 ? `${clean.slice(0, 28)}...` : clean}`;
}

function inferModelTone(text, moodValue) {
  if (moodValue <= 1 || /累|难过|焦虑|害怕|烦|压力|哭|不开心|生病/.test(text)) return "concern";
  if (/别人|同事|男|约|危险|门锁|燃气|摄像头|离家|回家|空调|灯|窗帘|智能|管家/.test(text)) {
    return "guard";
  }
  if (/谢谢|好多了|喜欢|开心|想你|陪|晚安|早安|抱抱|牵|摸摸头|声音/.test(text)) return "warm";
  return "calm";
}

function formatTaskTime(date) {
  return date.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: false });
}

function reminderLine(task) {
  const title = task?.title || "安排";
  if (/喝水|水/.test(title)) return `${companionName}提醒你，该喝点水了。`;
  if (/睡|放松|休息|冥想/.test(title)) return `${companionName}提醒你，该让自己放松一下了。`;
  if (/会议|复盘|项目|工作/.test(title)) return `${companionName}提醒你，${title}快开始了。`;
  return `${companionName}提醒你，该${title.replace(/提醒$/, "")}了。`;
}

function ChibiFigure({ mood = "hug", label = "Q 版动作" }) {
  return (
    <div className={`chibi-figure chibi-${mood}`} role="img" aria-label={`${companionName} ${label}`}>
      <span className="chibi-shadow" />
      <span className="chibi-cape" />
      <span className="chibi-body" />
      <span className="chibi-head">
        <span className="chibi-hair" />
        <span className="chibi-eye left" />
        <span className="chibi-eye right" />
        <span className="chibi-mouth" />
      </span>
      <span className="chibi-arm left" />
      <span className="chibi-arm right" />
      <span className="chibi-spark one" />
      <span className="chibi-spark two" />
    </div>
  );
}

export function App() {
  const [mood, setMood] = useState(3);
  const [tasks, setTasks] = useState(initialTasks);
  const [activeScene, setActiveScene] = useState("home");
  const [pendingScene, setPendingScene] = useState(null);
  const [activeTab, setActiveTab] = useState(() => {
    const tab = new URLSearchParams(window.location.search).get("tab");
    return ["home", "record", "smart", "me"].includes(tab) ? tab : "home";
  });
  const [recordView, setRecordView] = useState(() => {
    const view = new URLSearchParams(window.location.search).get("view");
    return view === "memory" ? "memory" : "schedule";
  });
  const [activationCode, setActivationCode] = useState("");
  const [redeemedCode, setRedeemedCode] = useState("");
  const [newTaskTime, setNewTaskTime] = useState("20:00");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskNote, setNewTaskNote] = useState("");
  const [messages, setMessages] = useState(() => loadStoredValue(storageKeys.messages, initialMessages));
  const [memoryItems, setMemoryItems] = useState(() => loadStoredValue(storageKeys.memories, initialMemoryItems));
  const [notifications, setNotifications] = useState(() => loadStoredValue(storageKeys.notifications, []));
  const [preferences, setPreferences] = useState(() => loadStoredValue(storageKeys.preferences, ["gentle"]));
  const [notifiedTaskKeys, setNotifiedTaskKeys] = useState(() => loadStoredValue(storageKeys.notifiedTasks, []));
  const [modelTone, setModelTone] = useState(() => loadStoredValue(storageKeys.modelTone, "calm"));
  const [profilePanel, setProfilePanel] = useState(null);
  const [actionEffect, setActionEffect] = useState(null);
  const [activeReminder, setActiveReminder] = useState(null);
  const [showConversation, setShowConversation] = useState(false);
  const [draft, setDraft] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  const activeMood = moods[mood];
  const completedCount = useMemo(() => tasks.filter((task) => task.done).length, [tasks]);
  const unreadCount = notifications.filter((item) => !item.read).length;
  const pageClass = `tab-${activeTab}`;
  const modelState = modelStates[modelTone] || modelStates.calm;

  useEffect(() => {
    localStorage.setItem(storageKeys.messages, JSON.stringify(messages.slice(-80)));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(storageKeys.memories, JSON.stringify(memoryItems.slice(0, 30)));
  }, [memoryItems]);

  useEffect(() => {
    localStorage.setItem(storageKeys.notifications, JSON.stringify(notifications.slice(0, 30)));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(storageKeys.preferences, JSON.stringify(preferences));
  }, [preferences]);

  useEffect(() => {
    localStorage.setItem(storageKeys.notifiedTasks, JSON.stringify(notifiedTaskKeys.slice(-80)));
  }, [notifiedTaskKeys]);

  useEffect(() => {
    localStorage.setItem(storageKeys.modelTone, JSON.stringify(modelTone));
  }, [modelTone]);

  useEffect(() => {
    function checkDueTasks() {
      const now = new Date();
      const today = now.toISOString().slice(0, 10);
      const current = now.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: false });
      tasks.forEach((task) => {
        const key = `${today}-${task.id}-${task.time}`;
        if (!task.done && task.time === current && !notifiedTaskKeys.includes(key)) {
          setActiveReminder(task);
          addNotification({
            title: "今日安排提醒",
            text: `${task.time} · ${task.title}`,
            tab: "record",
            view: "schedule",
          });
          setNotifiedTaskKeys((items) => [...items, key]);
        }
      });
    }

    checkDueTasks();
    const timer = window.setInterval(checkDueTasks, 30000);
    return () => window.clearInterval(timer);
  }, [notifiedTaskKeys, tasks]);

  function rememberMessage(text) {
    const memory = memoryFromText(text);
    if (!memory) return;
    setMemoryItems((current) => {
      if (current.some((item) => item.text === memory)) return current;
      return [{ date: `刚刚 ${nowLabel()}`, text: memory }, ...current].slice(0, 12);
    });
  }

  function addTimelineMemory(text) {
    setMemoryItems((current) => [{ date: `刚刚 ${nowLabel()}`, text }, ...current].slice(0, 12));
  }

  function addNotification(item) {
    setNotifications((current) => [
      {
        id: Date.now(),
        time: nowLabel(),
        read: false,
        ...item,
      },
      ...current,
    ].slice(0, 20));
  }

  function openNotification(item) {
    if (item.tab) setActiveTab(item.tab);
    if (item.view) setRecordView(item.view);
    setNotifications((current) =>
      current.map((notification) => (notification.id === item.id ? { ...notification, read: true } : notification)),
    );
  }

  function deleteNotification(id) {
    setNotifications((current) => current.filter((notification) => notification.id !== id));
  }

  function cancelNotificationAction(item) {
    if (item.actionType === "scene") {
      setActiveScene(item.previousScene || "home");
    }
    if (item.actionType === "pendingScene" && pendingScene === item.sceneId) {
      setPendingScene(null);
    }
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === item.id
          ? { ...notification, read: true, cancelable: false, title: "已取消操作", text: "已撤回刚刚的智能管家操作" }
          : notification,
      ),
    );
  }

  function togglePreference(key) {
    const option = preferenceOptions.find((item) => item.key === key);
    const enabled = !preferences.includes(key);
    setPreferences((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key],
    );
    if (option) {
      setMessages((current) => [
        ...current,
        {
          from: "him",
          text: enabled ? `我记住了。接下来我会${option.label}，但还是会好好听你说。` : `好，我会把「${option.label}」收一点，按你舒服的方式来。`,
          time: nowLabel(),
        },
      ]);
      setModelTone("warm");
    }
  }

  function toggleTask(taskId) {
    setTasks((current) =>
      current.map((task) => (task.id === taskId ? { ...task, done: !task.done } : task)),
    );
  }

  function addTask() {
    const title = newTaskTitle.trim();
    if (!title) return;

    setTasks((current) => [
      ...current,
      {
        id: Date.now(),
        time: newTaskTime || "20:00",
        title,
        note: newTaskNote.trim() || "自定义安排",
        icon: Calendar,
        done: false,
      },
    ]);
    setNewTaskTitle("");
    setNewTaskNote("");
  }

  function deleteTask(taskId) {
    setTasks((current) => current.filter((task) => task.id !== taskId));
  }

  function dismissReminder() {
    if (activeReminder) toggleTask(activeReminder.id);
    setActiveReminder(null);
  }

  function snoozeReminder() {
    if (!activeReminder) return;
    const next = new Date(Date.now() + 10 * 60 * 1000);
    setTasks((current) =>
      current.map((task) => (task.id === activeReminder.id ? { ...task, time: formatTaskTime(next), done: false } : task)),
    );
    setActiveReminder(null);
  }

  function requestScene(sceneId) {
    setModelTone("guard");
    if (sceneId === "away") {
      setPendingScene(sceneId);
      addNotification({
        title: "智能管家待确认",
        text: "离家模式需要你确认后才会执行",
        tab: "smart",
        actionType: "pendingScene",
        sceneId,
        cancelable: false,
      });
      return;
    }
    const previousScene = activeScene;
    setActiveScene(sceneId);
    const scene = scenes.find((item) => item.id === sceneId);
    addNotification({
      title: "智能管家已执行",
      text: scene ? `已切换到${scene.label}` : "场景已执行",
      tab: "smart",
      actionType: "scene",
      sceneId,
      previousScene,
      cancelable: true,
    });
  }

  function confirmScene() {
    if (pendingScene) {
      setModelTone("guard");
      const scene = scenes.find((item) => item.id === pendingScene);
      const previousScene = activeScene;
      setActiveScene(pendingScene);
      setPendingScene(null);
      addNotification({
        title: "智能管家已执行",
        text: scene ? `已确认并开启${scene.label}` : "已确认高风险场景",
        tab: "smart",
        actionType: "scene",
        sceneId: pendingScene,
        previousScene,
        cancelable: true,
      });
    }
  }

  async function typeAssistantReply(text) {
    const id = Date.now();
    const time = nowLabel();
    const chars = Array.from(text || "我在。你慢慢说。");
    setMessages((current) => [...current, { id, from: "him", text: "", time }]);

    for (let index = 0; index < chars.length; index += 2) {
      await wait(28);
      const nextText = chars.slice(0, index + 2).join("");
      setMessages((current) =>
        current.map((message) => (message.id === id ? { ...message, text: nextText } : message)),
      );
    }
  }

  async function sendMessage(forcedText) {
    const text = (forcedText ?? draft).trim();
    if (!text || isReplying) return;

    const outgoing = { from: "me", text, time: nowLabel() };
    const nextMessages = [...messages, outgoing];
    setModelTone(inferModelTone(text, mood));
    setMessages(nextMessages);
    rememberMessage(text);
    setDraft("");
    setShowTools(false);
    setShowEmoji(false);
    setIsReplying(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages
            .filter((message) => message.from === "me" || message.from === "him")
            .slice(-12)
            .map((message) => ({
              role: message.from === "him" ? "assistant" : "user",
              content: message.text,
            })),
          preferences,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "DeepSeek request failed");
      await typeAssistantReply(data.reply);
    } catch (error) {
      console.error(error);
      setMessages((current) => [
        ...current,
        { from: "system", text: `DeepSeek 未连接：${error.message}`, time: nowLabel() },
      ]);
    } finally {
      setIsReplying(false);
    }
  }

  function chooseEmoji(emoji) {
    setDraft((current) => `${current}${current ? " " : ""}${emoji}`);
    setShowEmoji(false);
  }

  async function handleQuickAction(action) {
    setShowTools(false);
    if (action.type === "message") {
      await sendMessage(action.text);
      return;
    }
    addTimelineMemory(`${nowLabel()}，${action.memory}`);
    setModelTone("warm");
    setActionEffect({ key: action.key, label: action.label, stamp: Date.now() });
    window.setTimeout(() => setActionEffect(null), 2400);
  }

  return (
    <main className="app-shell">
      <section className={`app-home ${pageClass}`} aria-label="AI 陪伴助手首页">
        <header className="hero">
          <div className="portrait-wrap">
            <img src="/assets/model-noble-warm.png" alt={`${companionName} 头像`} />
            <span className="presence-dot" aria-label="在线" />
          </div>

          <div className="relationship">
            <button className="ghost-button" type="button">
              关系记录
              <ChevronRight size={18} strokeWidth={1.8} />
            </button>
            <p className="relationship-days">
              <span>关系</span>
              <strong>127</strong>
              <span>天</span>
            </p>
            <div className="divider" />
            <div className="status-row">
              <span className="status-dot" />
              <span>在线 · 随时在你身边</span>
              <button className="icon-button" type="button" aria-label="偏好设置">
                <SlidersHorizontal size={22} />
              </button>
            </div>
            <p className="ai-notice">
              <ShieldCheck size={18} />
              AI 由算法生成，不具备人类意识。内容仅供参考，请理性使用。
            </p>
          </div>
        </header>

        <section className={`model-stage model-${modelState.tone}`} aria-label={`模型状态：${modelState.label}`}>
          <img src={modelState.src} alt={`${companionName} 模型半身：${modelState.label}`} />
        </section>

        <section className="today-panel" aria-labelledby="today-title">
          <div className="section-title">
            <span className="title-mark" />
            <h1 id="today-title">今日与他</h1>
          </div>

          <div className="today-grid">
            <div className="chat-preview">
              <div className="chat-window">
                {messages.slice(-6).map((message, index) => (
                  <div className={`message ${message.from}`} key={`${message.time}-${index}`}>
                    <p>{message.text}</p>
                    <span>{message.time}</span>
                    {message.type === "mood" && (
                      <div className="chat-mood-options" role="group" aria-label="聊天内选择心情">
                        {moods.map((item, moodIndex) => (
                          <button
                            className={mood === moodIndex ? "selected" : ""}
                            key={item.label}
                            type="button"
                            onClick={() => setMood(moodIndex)}
                            aria-label={item.label}
                          >
                            <Smile size={17} />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {isReplying && messages.at(-1)?.from !== "him" && (
                  <div className="message him typing">
                    <p>他正在回复...</p>
                  </div>
                )}
              </div>
              <button className="link-button" type="button" onClick={() => setShowConversation(true)}>
                查看全部对话
                <ChevronRight size={17} />
              </button>
            </div>

            <div className="mood-check">
              <h2>情绪 check-in</h2>
              <div className={`mood-orb ${activeMood.tone}`}>
                <Smile size={48} strokeWidth={1.8} />
              </div>
              <p>现在的心情是？</p>
              <div className="mood-options" role="group" aria-label="选择心情">
                {moods.map((item, index) => (
                  <button
                    className={mood === index ? "selected" : ""}
                    key={item.label}
                    type="button"
                    onClick={() => setMood(index)}
                    aria-label={item.label}
                  >
                    <Smile size={20} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="record-switch" role="tablist" aria-label="记录内容切换">
          <button
            className={recordView === "schedule" ? "active" : ""}
            type="button"
            onClick={() => setRecordView("schedule")}
          >
            今日安排
          </button>
          <button
            className={recordView === "memory" ? "active" : ""}
            type="button"
            onClick={() => setRecordView("memory")}
          >
            记忆时间线
          </button>
        </div>

        <div className={`content-grid record-${recordView}`}>
          <section className="surface memory" aria-labelledby="memory-title">
            <div className="section-heading">
              <div>
                <span className="title-mark" />
                <h2 id="memory-title">记忆时间线</h2>
              </div>
              <button className="tiny-link" type="button">
                全部
                <ChevronRight size={16} />
              </button>
            </div>
            <ol>
              {memoryItems.map((item) => (
                <li key={`${item.date}-${item.text}`}>
                  <span className="timeline-dot" />
                  <time>{item.date}</time>
                  <p>{item.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="surface schedule" aria-labelledby="schedule-title">
            <div className="section-heading">
              <div>
                <span className="title-mark" />
                <h2 id="schedule-title">今日安排</h2>
              </div>
              <button className="tiny-link" type="button">
                {completedCount}/{tasks.length}
                <ChevronRight size={16} />
              </button>
            </div>
            <form
              className="schedule-add"
              onSubmit={(event) => {
                event.preventDefault();
                addTask();
              }}
            >
              <input
                className="time-input"
                type="time"
                value={newTaskTime}
                onChange={(event) => setNewTaskTime(event.target.value)}
                aria-label="安排时间"
              />
              <input
                value={newTaskTitle}
                onChange={(event) => setNewTaskTitle(event.target.value)}
                placeholder="添加新的安排"
                aria-label="安排内容"
              />
              <input
                value={newTaskNote}
                onChange={(event) => setNewTaskNote(event.target.value)}
                placeholder="备注"
                aria-label="安排备注"
              />
              <button className="primary-button" type="submit">
                添加
              </button>
            </form>
            <div className="task-list">
              {tasks.map((task) => {
                const Icon = task.icon;
                return (
                  <div className="task-row" key={task.id}>
                    <button className="task-main" type="button" onClick={() => toggleTask(task.id)}>
                      <Icon size={26} />
                      <span className="task-time">{task.time}</span>
                      <span className="task-copy">
                        <strong>{task.title}</strong>
                        <small>{task.note}</small>
                      </span>
                      <span className={`task-check ${task.done ? "done" : ""}`}>
                        {task.done ? <Check size={18} /> : <Circle size={18} />}
                      </span>
                    </button>
                    <button
                      className="delete-task"
                      type="button"
                      onClick={() => deleteTask(task.id)}
                      aria-label={`删除${task.title}`}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <section className="surface smart-home" aria-labelledby="home-title">
          <div className="section-heading">
            <div>
              <span className="title-mark" />
              <h2 id="home-title">智能家居 · 快捷场景</h2>
            </div>
            <button className="tiny-link" type="button">
              全部
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="scene-grid">
            {scenes.map((scene) => {
              const Icon = scene.icon;
              const active = activeScene === scene.id;
              return (
                <button
                  className={`scene ${active ? "active" : ""} ${scene.accent}`}
                  key={scene.id}
                  type="button"
                  onClick={() => requestScene(scene.id)}
                >
                  <Icon size={31} />
                  <strong>{scene.label}</strong>
                  <span>{scene.note}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="risk-banner" aria-label="风险设备操作确认">
          <Lock size={30} />
          <div>
            <strong>风险设备操作确认</strong>
            <p>即将操作「电暖器」· 设置 28°C。确认周围环境安全，远离易燃物品。</p>
          </div>
          <button className="secondary-button" type="button" onClick={() => setPendingScene("warm")}>
            取消
          </button>
          <button className="primary-button" type="button" onClick={() => setPendingScene("warm")}>
            确认安全
          </button>
        </section>

        <form
          className="composer"
          onSubmit={(event) => {
            event.preventDefault();
            sendMessage();
          }}
        >
          <button
            className="voice-button"
            type="button"
            aria-label="更多对话选项"
            onClick={() => {
              setShowTools((value) => !value);
              setShowEmoji(false);
            }}
          >
            <Plus size={24} />
          </button>
          {showTools && (
            <div className="composer-popover tools-menu">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button key={action.key} type="button" onClick={() => handleQuickAction(action)}>
                    <Icon size={18} />
                    <span>{action.label}</span>
                  </button>
                );
              })}
            </div>
          )}
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={isReplying ? "等他回复中..." : "有什么想对他说..."}
            aria-label={`输入给${companionName}的消息`}
            disabled={isReplying}
          />
          <button
            className="icon-button"
            type="button"
            aria-label="表情"
            onClick={() => {
              setShowEmoji((value) => !value);
              setShowTools(false);
            }}
          >
            <Smile size={23} />
          </button>
          {showEmoji && (
            <div className="composer-popover emoji-menu">
              {emojiOptions.map((emoji) => (
                <button key={emoji} type="button" onClick={() => chooseEmoji(emoji)}>
                  {emoji}
                </button>
              ))}
            </div>
          )}
          <button className="send-button" type="submit" aria-label="发送" disabled={isReplying}>
            <Send size={22} />
          </button>
        </form>

        <section className="surface personal-center" aria-labelledby="personal-title">
          <div className="profile-card">
            <div className="profile-avatar">
              <img src="/assets/model-noble-warm.png" alt={`${companionName} 头像`} />
            </div>
            <div>
              <p className="profile-kicker">一对一陪伴服务</p>
              <h2 id="personal-title">个人中心</h2>
              <span>{redeemedCode ? "已激活专属席位" : "等待激活码绑定"}</span>
            </div>
          </div>

          <div className="profile-actions" aria-label="个人功能">
            <button
              className={profilePanel === "notifications" ? "active" : ""}
              type="button"
              onClick={() => setProfilePanel((panel) => (panel === "notifications" ? null : "notifications"))}
            >
              <Bell size={18} />
              <span>通知</span>
              {unreadCount > 0 && <strong>{unreadCount}</strong>}
            </button>
            <button
              className={profilePanel === "preferences" ? "active" : ""}
              type="button"
              onClick={() => setProfilePanel((panel) => (panel === "preferences" ? null : "preferences"))}
            >
              <SlidersHorizontal size={18} />
              <span>偏好</span>
            </button>
          </div>

          {profilePanel === "preferences" && (
            <section className="preference-panel" aria-label="对话偏好">
              <h3>他说话的方式</h3>
              <div className="preference-grid">
                {preferenceOptions.map((option) => (
                  <button
                    className={preferences.includes(option.key) ? "preference-option active" : "preference-option"}
                    key={option.key}
                    type="button"
                    onClick={() => togglePreference(option.key)}
                  >
                    <span>{option.label}</span>
                    <small>{option.note}</small>
                  </button>
                ))}
              </div>
            </section>
          )}

          {profilePanel === "notifications" && (
            <section className="notification-panel" aria-label="通知记录">
              <h3>通知</h3>
              {notifications.length === 0 ? (
                <p className="notification-empty">暂无通知，今日安排和智能管家会在这里提醒你。</p>
              ) : (
                <div className="notification-list">
                  {notifications.slice(0, 6).map((item) => (
                    <div className="notification-swipe" key={item.id}>
                      <button
                        className={item.read ? "notification-item" : "notification-item unread"}
                        type="button"
                        onClick={() => openNotification(item)}
                      >
                        <span>
                          <strong>{item.title}</strong>
                          <small>{item.text}</small>
                        </span>
                        <time>{item.time}</time>
                      </button>
                      <div className="notification-actions">
                        <button type="button" onClick={() => deleteNotification(item.id)}>
                          删除
                        </button>
                        {item.cancelable && (
                          <button className="cancel" type="button" onClick={() => cancelNotificationAction(item)}>
                            取消
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          <form
            className="redeem-box"
            onSubmit={(event) => {
              event.preventDefault();
              if (activationCode.trim()) {
                setRedeemedCode(activationCode.trim().toUpperCase());
              }
            }}
          >
            <label htmlFor="activation-code">激活码兑换</label>
            <div className="redeem-row">
              <input
                id="activation-code"
                value={activationCode}
                onChange={(event) => setActivationCode(event.target.value)}
                placeholder="输入你的专属激活码"
              />
              <button className="primary-button" type="submit">
                兑换
              </button>
            </div>
            <p>激活属于你的专属陪伴契约。</p>
            {redeemedCode && <strong className="redeem-success">已绑定：{redeemedCode}</strong>}
          </form>
        </section>

        <nav className="bottom-nav" aria-label="主导航">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                className={activeTab === tab.id ? "active" : ""}
                key={tab.label}
                type="button"
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={24} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {pendingScene && (
          <div className="modal-backdrop" role="presentation">
            <div className="confirm-modal" role="dialog" aria-modal="true" aria-label="确认高风险设备操作">
              <button className="modal-close" type="button" onClick={() => setPendingScene(null)} aria-label="关闭">
                <X size={22} />
              </button>
              <ShieldCheck size={42} />
              <h2>确认安全后再执行</h2>
              <p>
                涉及安防、加热或离家场景时，需要你主动确认。所有设备指令都会记录，可在「我的」中随时撤销授权。
              </p>
              <div className="modal-actions">
                <button className="secondary-button" type="button" onClick={() => setPendingScene(null)}>
                  暂不执行
                </button>
                <button className="primary-button" type="button" onClick={confirmScene}>
                  我已确认
                </button>
              </div>
            </div>
          </div>
        )}
        {showConversation && (
          <div className="modal-backdrop" role="presentation">
            <div className="conversation-modal" role="dialog" aria-modal="true" aria-label="全部对话">
              <button className="modal-close" type="button" onClick={() => setShowConversation(false)} aria-label="关闭">
                <X size={22} />
              </button>
              <h2>全部对话</h2>
              <div className="conversation-scroll">
                {messages.map((message, index) => (
                  <div className={`message ${message.from}`} key={`${message.time}-${index}-full`}>
                    <p>{message.text}</p>
                    <span>{message.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {activeReminder && (
          <div className="alarm-backdrop" role="presentation">
            <section className="alarm-card" role="dialog" aria-modal="true" aria-label="今日安排提醒">
              <div className="alarm-figure">
                <ChibiFigure mood="remind" label="Q 版提醒" />
              </div>
              <p>{reminderLine(activeReminder)}</p>
              <div className="alarm-actions">
                <button type="button" onClick={dismissReminder}>
                  我知道了
                </button>
                <button type="button" onClick={snoozeReminder}>
                  稍后再提醒
                </button>
              </div>
            </section>
          </div>
        )}
        {actionEffect && (
          <div className={`hug-layer action-${actionEffect.key}`} aria-live="polite" key={actionEffect.stamp}>
            <ChibiFigure mood={actionEffect.key} label={`Q 版${actionEffect.label}`} />
            <span>{actionEffect.label === "陪我一会儿" ? "他安静地靠近了你。" : "收到你的心意了。"}</span>
          </div>
        )}
      </section>
    </main>
  );
}
