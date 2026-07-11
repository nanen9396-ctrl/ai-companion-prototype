import { useEffect, useRef, useState } from "react";
import { Check, Play, RotateCcw, Sparkles, Timer, Volume2 } from "lucide-react";
import {
  createMemoryDeck,
  evaluateRhythmInput,
  evaluateTimingAttempt,
  miniGameConfigs,
} from "./livingGame.js";

const TIMING_CYCLE_MS = 2200;

function GameHeading({ config, icon: Icon }) {
  return (
    <header className="mini-game-heading">
      <span><Icon size={16} /></span>
      <div>
        <strong>{config.title}</strong>
        <p>{config.instruction}</p>
      </div>
    </header>
  );
}

function TimingGame({ config, onComplete }) {
  const startedAt = useRef(performance.now());
  const completed = useRef(false);
  const [feedback, setFeedback] = useState("看准金色区域，和他一起落下最后一步。");
  const [success, setSuccess] = useState(false);

  function tryTiming() {
    if (completed.current) return;
    const elapsed = (performance.now() - startedAt.current) % TIMING_CYCLE_MS;
    const phase = elapsed / TIMING_CYCLE_MS;
    const progress = phase <= 0.5 ? phase * 2 : (1 - phase) * 2;

    if (!evaluateTimingAttempt(progress)) {
      setFeedback(progress < 0.42 ? "早了一点，再等光点靠近他。" : "慢了一点，再试一次就好。");
      return;
    }

    completed.current = true;
    setSuccess(true);
    setFeedback("刚刚好。你们的动作几乎落在同一拍。 ");
    window.setTimeout(onComplete, 420);
  }

  return (
    <section className="living-mini-game timing" aria-label={config.title}>
      <GameHeading config={config} icon={Timer} />
      <div className="timing-track" aria-hidden="true">
        <span className="timing-target" />
        <span className={`timing-marker ${success ? "success" : ""}`} />
      </div>
      <button className="timing-hit" type="button" onClick={tryTiming} disabled={success}>
        {success ? <Check size={18} /> : <Sparkles size={18} />}
        {success ? "默契正好" : "就是现在"}
      </button>
      <p className={success ? "mini-game-feedback success" : "mini-game-feedback"} aria-live="polite">{feedback}</p>
    </section>
  );
}

function MemoryGame({ config, onComplete }) {
  const [deck] = useState(() => createMemoryDeck(config.items));
  const [openIds, setOpenIds] = useState([]);
  const [matchedValues, setMatchedValues] = useState([]);
  const [locked, setLocked] = useState(false);
  const [feedback, setFeedback] = useState("翻开两张，试着记住他留给你的印记。");
  const timers = useRef([]);
  const completed = useRef(false);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  function finishMatch(nextMatchedValues) {
    setMatchedValues(nextMatchedValues);
    setOpenIds([]);
    setLocked(false);
    if (nextMatchedValues.length !== config.items.length || completed.current) return;
    completed.current = true;
    setFeedback("全都记住了。他看你的眼神像是早有预料。");
    timers.current.push(window.setTimeout(onComplete, 520));
  }

  function flipCard(card) {
    if (locked || completed.current || openIds.includes(card.id) || matchedValues.includes(card.value)) return;
    if (openIds.length === 0) {
      setOpenIds([card.id]);
      setFeedback("再翻一张，看看是不是同一个印记。");
      return;
    }

    const firstCard = deck.find((item) => item.id === openIds[0]);
    setOpenIds([openIds[0], card.id]);
    setLocked(true);

    if (firstCard.value === card.value) {
      setFeedback(`找到一对「${card.value}」。`);
      timers.current.push(window.setTimeout(() => finishMatch([...matchedValues, card.value]), 360));
      return;
    }

    setFeedback("这两张不一样，他替你悄悄记下位置了。");
    timers.current.push(window.setTimeout(() => {
      setOpenIds([]);
      setLocked(false);
    }, 620));
  }

  return (
    <section className="living-mini-game memory" aria-label={config.title}>
      <GameHeading config={config} icon={Sparkles} />
      <div className="memory-board">
        {deck.map((card) => {
          const revealed = openIds.includes(card.id) || matchedValues.includes(card.value);
          return (
            <button
              className={`${revealed ? "memory-card revealed" : "memory-card"} ${matchedValues.includes(card.value) ? "matched" : ""}`}
              key={card.id}
              type="button"
              onClick={() => flipCard(card)}
              aria-label={revealed ? `印记 ${card.value}` : "未翻开的印记"}
            >
              <span className="memory-card-front">{card.value}</span>
              <span className="memory-card-back"><Sparkles size={17} /></span>
            </button>
          );
        })}
      </div>
      <p className={completed.current ? "mini-game-feedback success" : "mini-game-feedback"} aria-live="polite">{feedback}</p>
    </section>
  );
}

function RhythmGame({ config, onComplete }) {
  const [phase, setPhase] = useState("idle");
  const [activePad, setActivePad] = useState(-1);
  const [input, setInput] = useState([]);
  const [feedback, setFeedback] = useState("先听他弹一遍，再把四个节拍还给他。");
  const timers = useRef([]);
  const completed = useRef(false);

  function clearTimers() {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  }

  useEffect(() => clearTimers, []);

  function playDemo() {
    if (phase === "playing" || completed.current) return;
    clearTimers();
    setPhase("playing");
    setInput([]);
    setFeedback("听好，他只示范这一小段。");
    config.pattern.forEach((padIndex, index) => {
      timers.current.push(window.setTimeout(() => setActivePad(padIndex), index * 480));
      timers.current.push(window.setTimeout(() => setActivePad(-1), index * 480 + 280));
    });
    timers.current.push(window.setTimeout(() => {
      setPhase("input");
      setFeedback("轮到你了。按刚才亮起的顺序回应他。");
    }, config.pattern.length * 480 + 80));
  }

  function tapPad(padIndex) {
    if (phase !== "input" || completed.current) return;
    setActivePad(padIndex);
    timers.current.push(window.setTimeout(() => setActivePad(-1), 180));
    const nextInput = [...input, padIndex];
    const result = evaluateRhythmInput(config.pattern, nextInput);

    if (result.status === "reset") {
      setInput([]);
      setFeedback("节拍偏了一点。别急，他还在等你重新接上。");
      return;
    }

    setInput(nextInput);
    if (result.status === "continue") {
      setFeedback(`已经接住 ${result.nextIndex} 拍，还差 ${config.pattern.length - result.nextIndex} 拍。`);
      return;
    }

    completed.current = true;
    setPhase("complete");
    setFeedback("最后一拍重合时，他偏过头，低低笑了一声。");
    timers.current.push(window.setTimeout(onComplete, 520));
  }

  return (
    <section className="living-mini-game rhythm" aria-label={config.title}>
      <GameHeading config={config} icon={Volume2} />
      <div className="rhythm-status" aria-hidden="true">
        {config.pattern.map((_, index) => <span className={index < input.length ? "filled" : ""} key={index} />)}
      </div>
      <div className="rhythm-pads">
        {config.pads.map((pad, index) => (
          <button
            className={activePad === index ? "active" : ""}
            key={pad}
            type="button"
            onClick={() => tapPad(index)}
            disabled={phase !== "input"}
          >
            {pad}
          </button>
        ))}
      </div>
      <button className="rhythm-demo" type="button" onClick={playDemo} disabled={phase === "playing" || phase === "complete"}>
        {phase === "idle" ? <Play size={16} /> : <RotateCcw size={16} />}
        {phase === "idle" ? "听他的示范" : phase === "playing" ? "正在示范" : phase === "complete" ? "合奏完成" : "再听一遍"}
      </button>
      <p className={phase === "complete" ? "mini-game-feedback success" : "mini-game-feedback"} aria-live="polite">{feedback}</p>
    </section>
  );
}

export function LivingMiniGame({ missionId, onComplete }) {
  const config = miniGameConfigs[missionId];
  if (!config) return null;
  if (config.type === "timing") return <TimingGame config={config} onComplete={onComplete} />;
  if (config.type === "memory") return <MemoryGame config={config} onComplete={onComplete} />;
  return <RhythmGame config={config} onComplete={onComplete} />;
}
