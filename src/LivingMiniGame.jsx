import { useEffect, useRef, useState } from "react";
import { Check, ChefHat, Music2, RotateCcw, Sparkles, Volume2 } from "lucide-react";
import {
  createDishResult,
  createMemoryDeck,
  evaluateHarmonyProgression,
  miniGameConfigs,
} from "./livingGame.js";

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

function CookingGame({ config, onComplete }) {
  const [ingredientIds, setIngredientIds] = useState([]);
  const [techniqueId, setTechniqueId] = useState("");
  const [result, setResult] = useState(null);
  const [feedback, setFeedback] = useState("先挑食材。你选什么，他就和你做什么。");

  function toggleIngredient(id) {
    setResult(null);
    setIngredientIds((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      if (current.length >= 5) {
        setFeedback("料理台最多放五种食材，先拿走一样再试。");
        return current;
      }
      setFeedback("搭配会改变成品的主调与口感。");
      return [...current, id];
    });
  }

  function chooseTechnique(id) {
    setTechniqueId(id);
    setResult(null);
    setFeedback("食材和技法都定下后，就可以一起开火了。");
  }

  function createDish() {
    const nextResult = createDishResult(config, ingredientIds, techniqueId);
    if (!nextResult.valid) {
      setFeedback(nextResult.message);
      return;
    }
    setResult(nextResult);
    setFeedback("这不是标准答案，是你们今晚共同写下的配方。");
  }

  return (
    <section className="living-mini-game cooking" aria-label={config.title}>
      <GameHeading config={config} icon={ChefHat} />
      <div className="cooking-section-heading">
        <strong>食材架</strong>
        <span>{ingredientIds.length}/5</span>
      </div>
      <div className="cooking-ingredients">
        {config.ingredients.map((ingredient) => {
          const selected = ingredientIds.includes(ingredient.id);
          return (
            <button
              className={selected ? "cooking-ingredient selected" : "cooking-ingredient"}
              key={ingredient.id}
              type="button"
              onClick={() => toggleIngredient(ingredient.id)}
              aria-pressed={selected}
            >
              <span>{ingredient.name}</span>
              <small>{ingredient.tags.slice(0, 2).join(" · ")}</small>
            </button>
          );
        })}
      </div>

      <div className="cooking-section-heading technique-heading">
        <strong>烹饪技法</strong>
        <span>决定口感</span>
      </div>
      <div className="cooking-techniques">
        {config.techniques.map((technique) => (
          <button
            className={techniqueId === technique.id ? "cooking-technique selected" : "cooking-technique"}
            key={technique.id}
            type="button"
            onClick={() => chooseTechnique(technique.id)}
            aria-pressed={techniqueId === technique.id}
          >
            <strong>{technique.name}</strong>
            <small>{technique.texture}</small>
          </button>
        ))}
      </div>

      {result ? (
        <section className="cooking-result" aria-live="polite">
          <span><Sparkles size={18} /></span>
          <div>
            <small>今晚的成品</small>
            <strong>{result.name}</strong>
            <p>{result.message}</p>
          </div>
          <button className="cooking-finish" type="button" onClick={() => onComplete(result)}>
            一起尝尝
          </button>
        </section>
      ) : (
        <button className="cooking-create" type="button" onClick={createDish}>
          <ChefHat size={17} />
          和他一起开火
        </button>
      )}
      <p className="mini-game-feedback" aria-live="polite">{feedback}</p>
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
    timers.current.push(window.setTimeout(() => onComplete(), 520));
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

function HarmonyGame({ config, onComplete }) {
  const [chordIds, setChordIds] = useState([]);
  const [evaluation, setEvaluation] = useState(null);
  const [feedback, setFeedback] = useState("先读功能，再写出一条你自己的四和弦进行。");
  const audioContext = useRef(null);

  useEffect(() => () => {
    if (audioContext.current?.state !== "closed") audioContext.current?.close();
  }, []);

  function addChord(id) {
    if (chordIds.length >= 4) {
      setFeedback("四个小节已经填满。点上方任一小节可以撤回重写。");
      return;
    }
    setChordIds((current) => [...current, id]);
    setEvaluation(null);
    setFeedback("继续听它的方向：张力最终要落回主和弦。");
  }

  function removeChord(index) {
    setChordIds((current) => current.filter((_, position) => position !== index));
    setEvaluation(null);
    setFeedback("这一格已经腾出来，可以重新安排。");
  }

  function audition() {
    if (chordIds.length === 0) {
      setFeedback("先放入至少一个和弦，才能试听。");
      return;
    }
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
      setFeedback("当前设备暂时无法播放和弦，但仍可以完成编排。");
      return;
    }
    audioContext.current ||= new AudioContext();
    const context = audioContext.current;
    const chordMap = new Map(config.chords.map((chord) => [chord.id, chord]));
    const beatSeconds = 60 / config.tempo;
    chordIds.forEach((id, chordIndex) => {
      const chord = chordMap.get(id);
      chord.notes.forEach((frequency) => {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        const start = context.currentTime + chordIndex * beatSeconds;
        oscillator.type = "sine";
        oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(0.055, start + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + beatSeconds * 0.82);
        oscillator.connect(gain).connect(context.destination);
        oscillator.start(start);
        oscillator.stop(start + beatSeconds * 0.85);
      });
    });
    setFeedback(`正在以每分钟 ${config.tempo} 拍试听这条进行。`);
  }

  function checkProgression() {
    const nextEvaluation = evaluateHarmonyProgression(config, chordIds);
    setEvaluation(nextEvaluation);
    setFeedback(nextEvaluation.message);
  }

  const chordMap = new Map(config.chords.map((chord) => [chord.id, chord]));

  return (
    <section className="living-mini-game harmony" aria-label={config.title}>
      <GameHeading config={config} icon={Music2} />
      <div className="harmony-meta">
        <span>{config.keyLabel}</span>
        <span>♩ = {config.tempo}</span>
        <span>四小节</span>
      </div>
      <div className="harmony-slots" aria-label="和声进行">
        {[0, 1, 2, 3].map((index) => {
          const chord = chordMap.get(chordIds[index]);
          return (
            <button className={chord ? "harmony-slot filled" : "harmony-slot"} key={index} type="button" onClick={() => chord && removeChord(index)}>
              <small>{index + 1}</small>
              <strong>{chord?.label || "—"}</strong>
              <span>{chord?.role || ["起", "承", "转", "归"][index]}</span>
            </button>
          );
        })}
      </div>
      <div className="harmony-chords">
        {config.chords.map((chord) => (
          <button data-harmony-chord={chord.id} key={chord.id} type="button" onClick={() => addChord(chord.id)}>
            <strong>{chord.label}</strong>
            <span>{chord.name}</span>
            <small>{chord.role}</small>
          </button>
        ))}
      </div>
      <p className="harmony-theory">下属功能制造方向，属功能制造张力，主功能负责落地。你可以用不同和弦完成同一条逻辑。</p>
      <div className="harmony-actions">
        <button className="harmony-audition" type="button" onClick={audition}>
          <Volume2 size={16} />
          试听
        </button>
        <button className="harmony-check" type="button" onClick={checkProgression}>
          <Check size={16} />
          分析进行
        </button>
      </div>
      {evaluation && (
        <section className={evaluation.valid ? "harmony-result valid" : "harmony-result"} data-valid={evaluation.valid} aria-live="polite">
          <div>
            <small>和声分析 · {evaluation.score} 分</small>
            <strong>{evaluation.valid ? "这条进行成立" : "张力还没有落稳"}</strong>
            <p>{evaluation.message}</p>
          </div>
          {evaluation.valid && (
            <button className="harmony-finish" type="button" onClick={() => onComplete(evaluation)}>
              收下这段旋律
            </button>
          )}
        </section>
      )}
      {!evaluation && <p className="mini-game-feedback" aria-live="polite">{feedback}</p>}
      {evaluation && !evaluation.valid && (
        <button className="harmony-reset" type="button" onClick={() => { setChordIds([]); setEvaluation(null); }}>
          <RotateCcw size={15} />
          重新编排
        </button>
      )}
    </section>
  );
}

export function LivingMiniGame({ missionId, onComplete }) {
  const config = miniGameConfigs[missionId];
  if (!config) return null;
  if (config.type === "cooking") return <CookingGame config={config} onComplete={onComplete} />;
  if (config.type === "memory") return <MemoryGame config={config} onComplete={onComplete} />;
  if (config.type === "harmony") return <HarmonyGame config={config} onComplete={onComplete} />;
  return null;
}
