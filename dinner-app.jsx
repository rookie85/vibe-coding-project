import { useState, useEffect, useRef } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Lato:wght@300;400;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #FFF8F0;
    --primary: #FF6B35;
    --primary-light: #FFE4D6;
    --primary-dark: #e05520;
    --secondary: #2EC4B6;
    --text: #1A1A2E;
    --text-muted: #888;
    --card-bg: #FFFFFF;
    --success: #06D6A0;
    --radius: 16px;
    --shadow: 0 4px 24px rgba(255,107,53,0.10);
    --shadow-lg: 0 8px 40px rgba(255,107,53,0.15);
  }

  body {
    font-family: 'Lato', sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #app-root {
    width: 100%;
    max-width: 480px;
    min-height: 100vh;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding: 0 0 32px 0;
    position: relative;
    overflow: hidden;
  }

  /* ── Progress Bar ─────────────────────────────── */
  .progress-wrap {
    padding: 20px 24px 0;
    position: sticky;
    top: 0;
    background: var(--bg);
    z-index: 10;
  }
  .progress-meta {
    display: flex;
    justify-content: space-between;
    font-family: 'Nunito', sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: var(--text-muted);
    margin-bottom: 8px;
  }
  .progress-bar {
    height: 6px;
    background: #F0E8E0;
    border-radius: 99px;
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--primary), #FF9F68);
    border-radius: 99px;
    transition: width 0.5s cubic-bezier(.4,0,.2,1);
  }

  /* ── Screen wrapper ───────────────────────────── */
  .screen {
    flex: 1;
    padding: 32px 24px 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  /* ── Welcome ──────────────────────────────────── */
  .welcome-emoji {
    font-size: 72px;
    text-align: center;
    animation: bounceIn .7s cubic-bezier(.4,0,.2,1) both;
  }
  .welcome-title {
    font-family: 'Nunito', sans-serif;
    font-size: 36px;
    font-weight: 900;
    text-align: center;
    line-height: 1.15;
    color: var(--text);
    animation: fadeInUp .5s .1s both;
  }
  .welcome-title span { color: var(--primary); }
  .welcome-sub {
    text-align: center;
    font-size: 16px;
    color: var(--text-muted);
    line-height: 1.6;
    animation: fadeInUp .5s .2s both;
  }
  .welcome-features {
    display: flex;
    flex-direction: column;
    gap: 12px;
    animation: fadeInUp .5s .3s both;
  }
  .feature-pill {
    display: flex;
    align-items: center;
    gap: 12px;
    background: var(--card-bg);
    border-radius: 12px;
    padding: 14px 16px;
    box-shadow: var(--shadow);
    font-size: 14px;
    color: var(--text-muted);
    font-weight: 600;
  }
  .feature-pill span:first-child { font-size: 22px; }

  /* ── Question ─────────────────────────────────── */
  .question-label {
    font-family: 'Nunito', sans-serif;
    font-size: 22px;
    font-weight: 800;
    line-height: 1.3;
    color: var(--text);
    animation: fadeInUp .3s both;
  }
  .question-hint {
    font-size: 13px;
    color: var(--text-muted);
    margin-top: 4px;
    animation: fadeInUp .3s .05s both;
  }

  /* ── Option Cards ─────────────────────────────── */
  .options-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    animation: fadeInUp .3s .1s both;
  }
  .options-grid.single-col { grid-template-columns: 1fr; }

  .option-card {
    background: var(--card-bg);
    border: 2.5px solid transparent;
    border-radius: var(--radius);
    padding: 16px 12px;
    text-align: center;
    cursor: pointer;
    transition: all .2s ease;
    box-shadow: 0 2px 12px rgba(0,0,0,.05);
    user-select: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    min-height: 80px;
    justify-content: center;
  }
  .option-card:active { transform: scale(.96); }
  .option-card.selected {
    border-color: var(--primary);
    background: var(--primary-light);
    box-shadow: 0 4px 20px rgba(255,107,53,.2);
    animation: cardPop .2s ease;
  }
  .option-emoji { font-size: 26px; line-height: 1; }
  .option-label {
    font-family: 'Nunito', sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: var(--text);
    line-height: 1.3;
  }
  .option-card.selected .option-label { color: var(--primary-dark); }

  /* ── Navigation ───────────────────────────────── */
  .nav {
    display: flex;
    gap: 12px;
    margin-top: auto;
    padding-top: 16px;
  }
  .btn {
    flex: 1;
    padding: 16px;
    border-radius: 50px;
    font-family: 'Nunito', sans-serif;
    font-size: 16px;
    font-weight: 800;
    cursor: pointer;
    border: none;
    transition: all .2s ease;
    min-height: 54px;
  }
  .btn-primary {
    background: var(--primary);
    color: white;
    box-shadow: 0 4px 16px rgba(255,107,53,.35);
  }
  .btn-primary:hover { background: var(--primary-dark); transform: scale(1.02); }
  .btn-primary:active { transform: scale(.97); }
  .btn-secondary {
    background: #F0E8E0;
    color: var(--text-muted);
    flex: 0 0 auto;
    padding: 16px 20px;
    width: auto;
  }
  .btn-secondary:hover { background: #E8DDD4; }
  .btn-wide { width: 100%; flex: none; }

  /* ── Loader ───────────────────────────────────── */
  .loader-screen {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 28px;
    padding: 48px 24px;
  }
  .loader-emoji {
    font-size: 64px;
    animation: cookSpin 1.2s ease-in-out infinite alternate;
  }
  .loader-dots {
    display: flex; gap: 8px;
  }
  .loader-dot {
    width: 10px; height: 10px;
    border-radius: 50%;
    background: var(--primary);
    animation: dotBounce 1s ease-in-out infinite;
  }
  .loader-dot:nth-child(2) { animation-delay: .15s; background: var(--secondary); }
  .loader-dot:nth-child(3) { animation-delay: .3s; }
  .loader-phrase {
    font-family: 'Nunito', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: var(--text);
    text-align: center;
    animation: fadePhrase .5s ease;
  }

  /* ── Recipe Card ──────────────────────────────── */
  .recipe-screen {
    padding: 20px 24px 32px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .recipe-header {
    text-align: center;
    animation: fadeInUp .4s both;
  }
  .recipe-emoji-big { font-size: 64px; display: block; margin-bottom: 12px; }
  .recipe-title {
    font-family: 'Nunito', sans-serif;
    font-size: 26px;
    font-weight: 900;
    color: var(--text);
    line-height: 1.2;
  }
  .recipe-badges {
    display: flex;
    gap: 8px;
    justify-content: center;
    margin-top: 12px;
    flex-wrap: wrap;
    animation: fadeInUp .4s .05s both;
  }
  .badge {
    background: var(--primary-light);
    color: var(--primary-dark);
    font-family: 'Nunito', sans-serif;
    font-size: 13px;
    font-weight: 700;
    padding: 6px 14px;
    border-radius: 99px;
  }
  .badge.teal { background: #D0F5F3; color: #1a9e96; }

  .recipe-desc {
    font-style: italic;
    font-size: 15px;
    color: var(--text-muted);
    text-align: center;
    line-height: 1.6;
    animation: fadeInUp .4s .1s both;
  }

  .recipe-section {
    background: var(--card-bg);
    border-radius: var(--radius);
    padding: 20px;
    box-shadow: var(--shadow);
    animation: fadeInUp .4s .15s both;
  }
  .section-title {
    font-family: 'Nunito', sans-serif;
    font-size: 15px;
    font-weight: 800;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: .08em;
    margin-bottom: 14px;
  }
  .ingredient-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
  .ingredient-item {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 15px;
  }
  .check-icon {
    width: 20px; height: 20px;
    background: var(--success);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    font-size: 11px; color: white;
  }

  .steps-list { list-style: none; display: flex; flex-direction: column; gap: 14px; }
  .step-item { display: flex; gap: 14px; align-items: flex-start; }
  .step-num {
    width: 28px; height: 28px;
    border-radius: 50%;
    background: var(--primary);
    color: white;
    font-family: 'Nunito', sans-serif;
    font-size: 14px;
    font-weight: 800;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .step-text { font-size: 15px; line-height: 1.6; color: var(--text); }

  .chef-tip {
    background: linear-gradient(135deg, #FFF3ED, #FFE4D6);
    border-left: 4px solid var(--primary);
    border-radius: var(--radius);
    padding: 18px 20px;
    animation: fadeInUp .4s .2s both;
  }
  .chef-tip-label {
    font-family: 'Nunito', sans-serif;
    font-size: 13px;
    font-weight: 800;
    color: var(--primary);
    margin-bottom: 6px;
    text-transform: uppercase;
    letter-spacing: .06em;
  }
  .chef-tip-text { font-size: 15px; line-height: 1.6; color: var(--text); }

  .recipe-actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
    animation: fadeInUp .4s .25s both;
  }
  .btn-outline {
    background: transparent;
    border: 2.5px solid var(--primary);
    color: var(--primary);
  }
  .btn-outline:hover { background: var(--primary-light); }

  /* ── Error ────────────────────────────────────── */
  .error-card {
    background: #FFF0EE;
    border: 2px solid #FFD5CC;
    border-radius: var(--radius);
    padding: 24px;
    text-align: center;
    animation: fadeInUp .3s both;
  }
  .error-emoji { font-size: 40px; margin-bottom: 12px; }
  .error-text {
    font-family: 'Nunito', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: #C0392B;
    margin-bottom: 8px;
  }
  .error-sub { font-size: 14px; color: var(--text-muted); margin-bottom: 20px; }

  /* ── Animations ───────────────────────────────── */
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes bounceIn {
    0%   { transform: scale(.3); opacity: 0; }
    60%  { transform: scale(1.1); }
    80%  { transform: scale(.95); }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes cardPop {
    0%   { transform: scale(1); }
    50%  { transform: scale(1.07); }
    100% { transform: scale(1); }
  }
  @keyframes dotBounce {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-12px); }
  }
  @keyframes cookSpin {
    from { transform: rotate(-15deg) scale(1); }
    to   { transform: rotate(15deg) scale(1.1); }
  }
  @keyframes fadePhrase {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* slide transitions */
  .slide-enter { animation: slideInRight .3s cubic-bezier(.4,0,.2,1) both; }
  .slide-exit  { animation: slideOutLeft .3s cubic-bezier(.4,0,.2,1) both; }
  .slide-back-enter { animation: slideInLeft .3s cubic-bezier(.4,0,.2,1) both; }
  .slide-back-exit  { animation: slideOutRight .3s cubic-bezier(.4,0,.2,1) both; }

  @keyframes slideInRight  { from { transform: translateX(60px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  @keyframes slideOutLeft  { from { transform: translateX(0); opacity: 1; } to { transform: translateX(-60px); opacity: 0; } }
  @keyframes slideInLeft   { from { transform: translateX(-60px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  @keyframes slideOutRight { from { transform: translateX(0); opacity: 1; } to { transform: translateX(60px); opacity: 0; } }
`;

const STEPS = [
  {
    id: 1,
    question: "Какое мясо/белок есть?",
    hint: "Можно выбрать несколько",
    multi: true,
    options: [
      { emoji: "🍗", label: "Курица" },
      { emoji: "🥩", label: "Говядина" },
      { emoji: "🐷", label: "Свинина" },
      { emoji: "🥚", label: "Яйца" },
      { emoji: "🐟", label: "Рыба" },
      { emoji: "🫘", label: "Бобовые" },
      { emoji: "🚫", label: "Ничего" },
    ],
  },
  {
    id: 2,
    question: "Что есть из круп и макарон?",
    hint: "Можно выбрать несколько",
    multi: true,
    options: [
      { emoji: "🍚", label: "Рис" },
      { emoji: "🍝", label: "Паста" },
      { emoji: "🥣", label: "Гречка" },
      { emoji: "🌾", label: "Овсянка" },
      { emoji: "🫓", label: "Хлеб/лаваш" },
      { emoji: "🚫", label: "Ничего" },
    ],
  },
  {
    id: 3,
    question: "Какие овощи в наличии?",
    hint: "Можно выбрать несколько",
    multi: true,
    options: [
      { emoji: "🧅", label: "Лук/чеснок" },
      { emoji: "🥕", label: "Морковь" },
      { emoji: "🥔", label: "Картофель" },
      { emoji: "🍅", label: "Томаты" },
      { emoji: "🥦", label: "Капуста/брокколи" },
      { emoji: "🫑", label: "Перец" },
      { emoji: "🚫", label: "Ничего" },
    ],
  },
  {
    id: 4,
    question: "Есть молочные продукты?",
    hint: "Можно выбрать несколько",
    multi: true,
    options: [
      { emoji: "🧀", label: "Сыр" },
      { emoji: "🥛", label: "Молоко/сливки" },
      { emoji: "🧈", label: "Масло" },
      { emoji: "🫙", label: "Сметана/йогурт" },
      { emoji: "🚫", label: "Ничего" },
    ],
  },
  {
    id: 5,
    question: "Сколько времени на готовку?",
    hint: "Выбери один вариант",
    multi: false,
    options: [
      { emoji: "⚡", label: "До 15 минут" },
      { emoji: "🕐", label: "30 минут" },
      { emoji: "🍲", label: "Час и больше" },
    ],
  },
  {
    id: 6,
    question: "Какое настроение ужина?",
    hint: "Выбери один вариант",
    multi: false,
    options: [
      { emoji: "😴", label: "Простое и сытное" },
      { emoji: "🌿", label: "Лёгкое и здоровое" },
      { emoji: "🎉", label: "Что-то необычное" },
      { emoji: "🍳", label: "Главное вкусно" },
    ],
  },
];

const PHRASES = [
  "Смотрю, что у тебя есть...",
  "Придумываю что-то вкусное...",
  "Добавляю немного магии...",
  "Почти готово! 🍽️",
];

export default function App() {
  const [phase, setPhase] = useState("welcome"); // welcome | step | loading | result | error
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [recipe, setRecipe] = useState(null);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [direction, setDirection] = useState("forward");
  const [animKey, setAnimKey] = useState(0);
  const phraseTimer = useRef(null);

  const currentStep = STEPS[step];
  const selectedForStep = answers[step] || [];

  function toggleOption(label) {
    const s = STEPS[step];
    if (!s.multi) {
      setAnswers((a) => ({ ...a, [step]: [label] }));
      return;
    }
    const cur = answers[step] || [];
    if (label === "Ничего") {
      setAnswers((a) => ({ ...a, [step]: cur.includes("Ничего") ? [] : ["Ничего"] }));
      return;
    }
    const without = cur.filter((x) => x !== "Ничего");
    if (without.includes(label)) {
      setAnswers((a) => ({ ...a, [step]: without.filter((x) => x !== label) }));
    } else {
      setAnswers((a) => ({ ...a, [step]: [...without, label] }));
    }
  }

  function goNext() {
    if (step < STEPS.length - 1) {
      setDirection("forward");
      setAnimKey((k) => k + 1);
      setStep((s) => s + 1);
    } else {
      generateRecipe();
    }
  }

  function goBack() {
    if (step > 0) {
      setDirection("back");
      setAnimKey((k) => k + 1);
      setStep((s) => s - 1);
    } else {
      setPhase("welcome");
    }
  }

  function startQuiz() {
    setStep(0);
    setAnswers({});
    setPhase("step");
    setDirection("forward");
    setAnimKey((k) => k + 1);
  }

  async function generateRecipe() {
    setPhase("loading");
    setPhraseIdx(0);
    phraseTimer.current = setInterval(() => {
      setPhraseIdx((i) => (i + 1) % PHRASES.length);
    }, 1600);

    const products = STEPS.slice(0, 4).map((s, i) => {
      const sel = answers[i] || [];
      return sel.length ? `${s.question.replace("?", "")}: ${sel.join(", ")}` : null;
    }).filter(Boolean);

    const time = (answers[4] || ["не указано"])[0];
    const mood = (answers[5] || ["не указано"])[0];

    const prompt = `Ты шеф-повар. На основе имеющихся продуктов придумай ОДИН конкретный рецепт ужина.
Учти: время приготовления — ${time}, настроение — ${mood}.
Имеющиеся продукты: ${products.join("; ") || "базовый набор специй и масла"}.

Ответь строго в формате JSON (без markdown, без лишнего текста):
{
  "name": "Название блюда",
  "emoji": "один эмодзи блюда",
  "time": "время приготовления",
  "difficulty": "Просто / Средне / Сложно",
  "description": "Одно предложение — почему это вкусно",
  "ingredients": ["ингредиент 1", "ингредиент 2"],
  "steps": ["Шаг 1: ...", "Шаг 2: ..."],
  "tip": "Один совет шефа"
}`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      clearInterval(phraseTimer.current);
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      const text = data.content.map((b) => b.text || "").join("");
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setRecipe(parsed);
      setPhase("result");
    } catch (e) {
      clearInterval(phraseTimer.current);
      setPhase("error");
    }
  }

  useEffect(() => () => clearInterval(phraseTimer.current), []);

  const slideClass =
    direction === "forward"
      ? "slide-enter"
      : "slide-back-enter";

  return (
    <>
      <style>{style}</style>
      <div id="app-root">

        {/* ── WELCOME ─────────────────────── */}
        {phase === "welcome" && (
          <div className="screen" style={{ justifyContent: "center" }}>
            <div className="welcome-emoji">🍽️</div>
            <div>
              <h1 className="welcome-title">
                Что сегодня<br /><span>на ужин?</span>
              </h1>
              <p className="welcome-sub" style={{ marginTop: 12 }}>
                Отвечай на вопросы — я придумаю рецепт из того, что есть
              </p>
            </div>
            <div className="welcome-features">
              {[
                ["🥗", "Только твои продукты"],
                ["⚡", "Рецепт за секунды"],
                ["🎲", "Каждый раз новое блюдо"],
              ].map(([e, t]) => (
                <div className="feature-pill" key={t}>
                  <span>{e}</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
            <button className="btn btn-primary btn-wide" onClick={startQuiz}
              style={{ marginTop: 8 }}>
              Начать 🚀
            </button>
          </div>
        )}

        {/* ── STEPS ───────────────────────── */}
        {phase === "step" && (
          <>
            <div className="progress-wrap">
              <div className="progress-meta">
                <span>Шаг {step + 1} из {STEPS.length}</span>
                <span>{Math.round(((step + 1) / STEPS.length) * 100)}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill"
                  style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
              </div>
            </div>

            <div className={`screen ${slideClass}`} key={animKey}>
              <div>
                <p className="question-label">{currentStep.question}</p>
                <p className="question-hint">{currentStep.hint}</p>
              </div>

              <div className={`options-grid${currentStep.options.length <= 3 ? " single-col" : ""}`}>
                {currentStep.options.map((opt) => (
                  <div
                    key={opt.label}
                    className={`option-card${selectedForStep.includes(opt.label) ? " selected" : ""}`}
                    onClick={() => toggleOption(opt.label)}
                  >
                    <div className="option-emoji">{opt.emoji}</div>
                    <div className="option-label">{opt.label}</div>
                  </div>
                ))}
              </div>

              <div className="nav">
                <button className="btn btn-secondary" onClick={goBack}>← Назад</button>
                <button className="btn btn-primary" onClick={goNext}>
                  {step === STEPS.length - 1 ? "Готовим! 🍳" : "Далее →"}
                </button>
              </div>
            </div>
          </>
        )}

        {/* ── LOADING ─────────────────────── */}
        {phase === "loading" && (
          <div className="loader-screen">
            <div className="loader-emoji">👨‍🍳</div>
            <div className="loader-dots">
              <div className="loader-dot" />
              <div className="loader-dot" />
              <div className="loader-dot" />
            </div>
            <p className="loader-phrase" key={phraseIdx}>{PHRASES[phraseIdx]}</p>
          </div>
        )}

        {/* ── RESULT ──────────────────────── */}
        {phase === "result" && recipe && (
          <div className="recipe-screen">
            <div className="recipe-header">
              <span className="recipe-emoji-big">{recipe.emoji}</span>
              <h2 className="recipe-title">{recipe.name}</h2>
              <div className="recipe-badges">
                <span className="badge">⏱ {recipe.time}</span>
                <span className="badge teal">📊 {recipe.difficulty}</span>
              </div>
            </div>

            <p className="recipe-desc">{recipe.description}</p>

            <div className="recipe-section" style={{ animationDelay: ".15s" }}>
              <p className="section-title">🛒 Ингредиенты</p>
              <ul className="ingredient-list">
                {recipe.ingredients.map((ing, i) => (
                  <li className="ingredient-item" key={i}>
                    <div className="check-icon">✓</div>
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="recipe-section" style={{ animationDelay: ".2s" }}>
              <p className="section-title">👨‍🍳 Приготовление</p>
              <ol className="steps-list">
                {recipe.steps.map((step, i) => (
                  <li className="step-item" key={i}>
                    <div className="step-num">{i + 1}</div>
                    <p className="step-text">{step.replace(/^Шаг \d+:\s*/i, "")}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="chef-tip">
              <p className="chef-tip-label">💡 Совет шефа</p>
              <p className="chef-tip-text">{recipe.tip}</p>
            </div>

            <div className="recipe-actions">
              <button className="btn btn-primary btn-wide" onClick={generateRecipe}>
                🎲 Придумай другой вариант
              </button>
              <button className="btn btn-outline btn-wide btn" onClick={() => { setPhase("welcome"); setAnswers({}); setStep(0); }}>
                🔄 Начать заново
              </button>
            </div>
          </div>
        )}

        {/* ── ERROR ───────────────────────── */}
        {phase === "error" && (
          <div className="screen" style={{ justifyContent: "center" }}>
            <div className="error-card">
              <div className="error-emoji">😅</div>
              <p className="error-text">Что-то пошло не так</p>
              <p className="error-sub">Кажется, шеф-повар отошёл. Попробуй ещё раз!</p>
              <button className="btn btn-primary btn-wide" onClick={generateRecipe}>
                Попробовать снова
              </button>
            </div>
            <button className="btn btn-secondary btn-wide btn"
              style={{ marginTop: 12 }}
              onClick={() => { setPhase("step"); }}>
              ← Вернуться к вопросам
            </button>
          </div>
        )}

      </div>
    </>
  );
}
