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
};

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
  const [draft, setDraft] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  const activeMood = moods[mood];
  const completedCount = useMemo(() => tasks.filter((task) => task.done).length, [tasks]);
  const pageClass = `tab-${activeTab}`;
  const modelState = useMemo(() => {
    const text = `${draft} ${messages.map((message) => message.text).slice(-3).join(" ")}`;
    if (mood <= 1 || /累|难过|焦虑|害怕|烦|压力|哭|不开心|生病/.test(text)) {
      return {
        src: "/assets/model-noble-hero.png",
        label: "关切地靠近你",
        line: "我在听。先把呼吸放慢一点，剩下的我们一起拆开。",
      };
    }
    if (/谢谢|好多了|喜欢|开心|想你|陪|晚安|早安/.test(text) || messages.at(-1)?.from === "me") {
      return {
        src: "/assets/model-noble-hero.png",
        label: "温柔地回应你",
        line: "嗯，我收到你的心情了。今天也会站在你这边。",
      };
    }
    return {
      src: "/assets/model-noble-hero.png",
      label: "认真听你说话",
      line: "今天想先说哪一件事？我会记得你的节奏。",
    };
  }, [draft, messages, mood]);

  useEffect(() => {
    localStorage.setItem(storageKeys.messages, JSON.stringify(messages.slice(-80)));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(storageKeys.memories, JSON.stringify(memoryItems.slice(0, 30)));
  }, [memoryItems]);

  function rememberMessage(text) {
    const memory = memoryFromText(text);
    if (!memory) return;
    setMemoryItems((current) => {
      if (current.some((item) => item.text === memory)) return current;
      return [{ date: `刚刚 ${nowLabel()}`, text: memory }, ...current].slice(0, 12);
    });
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

  function requestScene(sceneId) {
    if (sceneId === "away") {
      setPendingScene(sceneId);
      return;
    }
    setActiveScene(sceneId);
  }

  function confirmScene() {
    if (pendingScene) {
      setActiveScene(pendingScene);
      setPendingScene(null);
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

  return (
    <main className="app-shell">
      <section className={`app-home ${pageClass}`} aria-label="AI 陪伴助手首页">
        <header className="hero">
          <div className="portrait-wrap">
            <img src="/assets/companion-avatar.png" alt="原创 AI 角色陆闻澈头像" />
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

        <section className="model-stage" aria-label={`模型状态：${modelState.label}`}>
          <img src={modelState.src} alt={`原创 AI 模型半身：${modelState.label}`} />
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
              <button className="link-button" type="button">
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
              <button type="button" onClick={() => sendMessage("想听你的声音")}>
                <Phone size={18} />
                <span>想听你的声音</span>
              </button>
              <button type="button" onClick={() => sendMessage("抱抱我")}>
                <Heart size={18} />
                <span>抱抱我</span>
              </button>
            </div>
          )}
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={isReplying ? "等他回复中..." : "有什么想对他说..."}
            aria-label="输入给陆闻澈的消息"
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
              <img src="/assets/companion-avatar.png" alt="原创 AI 角色陆闻澈头像" />
            </div>
            <div>
              <p className="profile-kicker">一对一陪伴服务</p>
              <h2 id="personal-title">个人中心</h2>
              <span>{redeemedCode ? "已激活专属席位" : "等待激活码绑定"}</span>
            </div>
          </div>

          <div className="profile-actions" aria-label="个人功能">
            <button type="button">
              <Bell size={18} />
              <span>通知</span>
            </button>
            <button type="button">
              <SlidersHorizontal size={18} />
              <span>偏好</span>
            </button>
          </div>

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
      </section>
    </main>
  );
}
