import React, { useState } from "react";

const C = {
  sageDark: "#5A6E58",
  sageLight: "#C8D8CC",
  cream: "#F5F0E8",
  forest: "#2E3832",
  accent: "#8FA68C",
  right: "#6A9B7A",
  wrong: "#C17A6F",
  gold: "#B8A060",
};

// --- DATA ARRAYS ---
const HISTORY = [
  { id: "h1", type: "mcq", difficulty: "easy", topic: "Joseph Pilates", q: "Where was Joseph Pilates born?", options: ["New York, USA", "Near Düsseldorf, Germany", "London, England", "Vienna, Austria"], correct: 1, explanation: "Joseph Pilates was born near Düsseldorf, Germany in 1883." },
  { id: "h2", type: "mcq", difficulty: "easy", topic: "Joseph Pilates", q: "In what year did Joseph and Clara Pilates open their first studio in New York City?", options: ["1912", "1918", "1926", "1934"], correct: 2, explanation: "Joseph and Clara Pilates set up their first studio in New York City in 1926." },
  // ... (Keeping your extensive data here)
];

const ANATOMY = [
  { id: "a1", type: "mcq", difficulty: "easy", topic: "Planes & Directions", q: "Which plane divides the body into left and right portions?", options: ["Coronal/Frontal plane", "Transverse plane", "Sagittal plane", "Median plane"], correct: 2, explanation: "The sagittal plane divides the body into left and right portions." },
  // ... (Keeping your extensive data here)
];

const MAT = [
  { id: "m1", type: "mcq", difficulty: "easy", theme: "Setup", level: "Foundation", q: "What is the starting position for Pelvic Curl?", options: ["Lying prone, arms by sides", "Lying supine, knees bent, feet flat, legs parallel, arms by sides", "Sitting upright, legs straight", "Kneeling in quadruped"], correct: 1, explanation: "Pelvic Curl starts lying supine with knees bent and feet flat." },
];

// --- CONFIG ---
const SECTION_CONFIG = {
  history: { label: "History & Principles", color: C.gold, emoji: "📜", desc: "Origins of Pilates, principles, pelvis, breathing" },
  anatomy: { label: "Anatomy", color: C.sageDark, emoji: "🦴", desc: "Planes, joints, muscles, movement terminology" },
  mat: { label: "Mat Exercises", color: C.accent, emoji: "🧘", desc: "Setup, cues, breathing, muscles, modifications" },
};

const HISTORY_TOPICS = ["All", "Joseph Pilates", "The 10 Principles", "Pelvis & Neutral Spine", "Breathing"];
const ANATOMY_TOPICS = ["All", "Planes & Directions", "Joints", "Joint Movements", "Muscles by Region", "Posture", "Muscle Types & Contractions"];
const MAT_THEMES = ["All", "Setup", "Breathing", "Cues", "Muscles", "Modifications"];
const MAT_LEVELS = ["All", "Foundation", "Intermediate", "Advanced"];
const DIFF_COLORS = { easy: C.right, medium: C.gold, hard: C.wrong };
const TOPIC_COLORS_H = { "Joseph Pilates": C.gold, "The 10 Principles": "#7A6E9A", "Pelvis & Neutral Spine": C.sageDark, "Breathing": C.accent };
const TOPIC_COLORS_A = { "Planes & Directions": C.gold, "Joints": "#7A6E9A", "Joint Movements": C.sageDark, "Muscles by Region": C.accent, "Posture": C.wrong, "Muscle Types & Contractions": C.right };
const LEVEL_COLORS = { Foundation: C.right, Intermediate: C.gold, Advanced: C.wrong };

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

// --- UI COMPONENTS ---
function Header() {
  return (
    <div style={{ padding: "20px 28px 16px", borderBottom: `1px solid ${C.sageLight}`, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
      <span style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: "1rem", color: C.sageDark, letterSpacing: "0.04em" }}>My Movement Lab</span>
      <span style={{ fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.accent, fontFamily: "sans-serif", fontWeight: 300 }}>Pilates Study Tool</span>
    </div>
  );
}

function Tag({ children, color }) {
  return <span style={{ fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: color || C.accent, fontFamily: "sans-serif", fontWeight: 300 }}>{children}</span>;
}

function SectionLabel({ label }) {
  return <p style={{ fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.accent, fontFamily: "sans-serif", fontWeight: 300, marginBottom: 8 }}>{label}</p>;
}

function Pill({ label, active, color, onClick }) {
  return (
    <button onClick={onClick} style={{ padding: "6px 13px", border: `1px solid ${active ? (color || C.forest) : C.sageLight}`, background: active ? (color || C.forest) : "transparent", cursor: "pointer", fontFamily: "sans-serif", fontWeight: 300, fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: active ? C.cream : C.forest, transition: "all 0.18s", marginRight: "4px", marginBottom: "4px" }}>{label}</button>
  );
}

function Btn({ children, onClick, variant = "primary", disabled, style = {} }) {
  const base = { border: "none", cursor: disabled ? "not-allowed" : "pointer", fontFamily: "sans-serif", fontWeight: 300, fontSize: "0.68rem", letterSpacing: "0.16em", textTransform: "uppercase", padding: "12px 28px", transition: "all 0.18s", opacity: disabled ? 0.4 : 1 };
  const v = { primary: { background: C.forest, color: C.cream }, ghost: { background: "transparent", color: C.forest, border: `1px solid ${C.sageLight}` }, sage: { background: C.sageDark, color: C.cream } };
  return <button onClick={disabled ? undefined : onClick} style={{ ...base, ...v[variant], ...style }}>{children}</button>;
}

// --- QUESTION RENDERERS ---
function MCQ({ q, onAnswer, answered, selected }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
      {q.options.map((opt, i) => {
        let bc = C.sageLight, bg = "transparent", col = C.forest;
        if (answered) {
          if (i === q.correct) { bc = C.right; bg = "rgba(106,155,122,0.12)"; col = C.right; }
          else if (i === selected) { bc = C.wrong; bg = "rgba(193,122,111,0.1)"; col = C.wrong; }
        }
        return <button key={i} onClick={() => !answered && onAnswer(i)} disabled={answered} style={{ border: `1px solid ${bc}`, background: bg, color: col, padding: "13px 16px", textAlign: "left", cursor: answered ? "default" : "pointer", fontFamily: "sans-serif", fontWeight: 300, fontSize: "0.78rem", transition: "all 0.18s" }}>{opt}</button>;
      })}
    </div>
  );
}

function TF({ q, onAnswer, answered, selected }) {
  return (
    <div style={{ display: "flex", gap: 12 }}>
      {[true, false].map(val => {
        let bc = C.sageLight, bg = "transparent", col = C.forest;
        if (answered) {
          if (val === q.correct) { bc = C.right; bg = "rgba(106,155,122,0.12)"; col = C.right; }
          else if (val === selected) { bc = C.wrong; bg = "rgba(193,122,111,0.1)"; col = C.wrong; }
        }
        return <button key={String(val)} onClick={() => !answered && onAnswer(val)} disabled={answered} style={{ flex: 1, border: `1px solid ${bc}`, background: bg, color: col, padding: "18px", cursor: answered ? "default" : "pointer", fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: "1.1rem", transition: "all 0.18s" }}>{val ? "True" : "False"}</button>;
      })}
    </div>
  );
}

function Flashcard({ q, onAnswer, answered }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div>
      <div onClick={() => setFlipped(f => !f)} style={{ border: `1px solid ${flipped ? C.sageDark : C.sageLight}`, background: flipped ? "rgba(90,110,88,0.06)" : "transparent", padding: "28px 22px", cursor: "pointer", minHeight: 110, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.25s", marginBottom: 14 }}>
        <p style={{ fontFamily: "Georgia,serif", fontStyle: "italic", textAlign: "center", fontSize: flipped ? "0.88rem" : "0.98rem", lineHeight: 1.65, color: C.forest }}>{flipped ? q.answer : "Tap to reveal the answer →"}</p>
      </div>
      {!answered && flipped && (
        <div style={{ display: "flex", gap: 10 }}>
          <Btn onClick={() => onAnswer(false)} variant="ghost" style={{ flex: 1 }}>Didn’t know it</Btn>
          <Btn onClick={() => onAnswer(true)} variant="sage" style={{ flex: 1 }}>Got it ✓</Btn>
        </div>
      )}
    </div>
  );
}

function Fill({ q, onAnswer, answered, input, setInput }) {
  return (
    <div>
      {q.hint && <p style={{ fontSize: "0.65rem", color: C.accent, fontFamily: "sans-serif", fontWeight: 300, letterSpacing: "0.08em", marginBottom: 10 }}>Hint: {q.hint}</p>}
      <input disabled={answered} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && !answered && input.trim() && onAnswer(input)} placeholder="Type your answer…" style={{ width: "100%", padding: "13px 14px", border: `1px solid ${C.sageLight}`, background: "transparent", fontFamily: "sans-serif", fontWeight: 300, fontSize: "0.78rem", color: C.forest, outline: "none", marginBottom: 10, boxSizing: "border-box" }} />
      {!answered && <Btn onClick={() => input.trim() && onAnswer(input)} disabled={!input.trim()}>Check →</Btn>}
      {answered && <div style={{ padding: "11px 14px", border: `1px solid ${C.right}`, background: "rgba(106,155,122,0.1)", fontSize: "0.75rem", color: C.right, fontFamily: "sans-serif", fontWeight: 300, marginTop: 8 }}>✓ Model answer: {q.answer}</div>}
    </div>
  );
}

// --- MAIN SCREENS ---
function Home({ onStart }) {
  const [section, setSection] = useState("history");
  const [difficulty, setDifficulty] = useState("all");
  const [historyTopic, setHistoryTopic] = useState("All");
  const [anatomyTopic, setAnatomyTopic] = useState("All");
  const [matTheme, setMatTheme] = useState("All");
  const [matLevel, setMatLevel] = useState("All");

  function getPool() {
    if (section === "history") {
      let p = historyTopic === "All" ? HISTORY : HISTORY.filter(q => q.topic === historyTopic);
      return difficulty === "all" ? p : p.filter(q => q.difficulty === difficulty);
    }
    if (section === "anatomy") {
      let p = anatomyTopic === "All" ? ANATOMY : ANATOMY.filter(q => q.topic === anatomyTopic);
      return difficulty === "all" ? p : p.filter(q => q.difficulty === difficulty);
    }
    return MAT.filter(q => {
      const tm = matTheme === "All" || q.theme === matTheme;
      const lm = matLevel === "All" || q.level === matLevel;
      return tm && lm;
    });
  }

  const pool = getPool();

  return (
    <div style={{ maxWidth: 620, margin: "0 auto", padding: "48px 24px 40px" }}>
      <Tag>Pilates Study Tool</Tag>
      <h1 style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.9rem,5vw,3rem)", lineHeight: 1.1, color: C.forest, margin: "12px 0 14px" }}>
        Study smarter,<br /><span style={{ color: C.sageDark }}>teach better.</span>
      </h1>
      <p style={{ fontSize: "0.76rem", lineHeight: 1.9, color: C.sageDark, maxWidth: 420, marginBottom: 36, fontFamily: "sans-serif", fontWeight: 300 }}>
        Because knowing <em>why</em> makes you a better teacher.
      </p>

      <SectionLabel label="Choose a section" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
        {Object.entries(SECTION_CONFIG).map(([key, cfg]) => (
          <button key={key} onClick={() => setSection(key)} style={{ border: `1px solid ${section === key ? cfg.color : C.sageLight}`, background: section === key ? "rgba(90,110,88,0.06)" : "transparent", padding: "14px 18px", textAlign: "left", cursor: "pointer", transition: "all 0.18s" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: "0.96rem", color: section === key ? cfg.color : C.forest }}>{cfg.emoji} {cfg.label}</span>
            </div>
            <p style={{ fontSize: "0.63rem", color: C.accent, fontFamily: "sans-serif", fontWeight: 300, marginTop: 3, letterSpacing: "0.06em" }}>{cfg.desc}</p>
          </button>
        ))}
      </div>

      {section === "history" && (
        <>
          <SectionLabel label="Topic" />
          <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
            {HISTORY_TOPICS.map(t => <Pill key={t} label={t} active={historyTopic === t} color={t === "All" ? C.forest : TOPIC_COLORS_H[t]} onClick={() => setHistoryTopic(t)} />)}
          </div>
          <SectionLabel label="Difficulty" />
          <div style={{ display: "flex", gap: 8, marginBottom: 36, flexWrap: "wrap" }}>
            {["all", "easy", "medium", "hard"].map(d => <Pill key={d} label={d === "all" ? "All levels" : d} active={difficulty === d} color={d === "all" ? C.forest : DIFF_COLORS[d]} onClick={() => setDifficulty(d)} />)}
          </div>
        </>
      )}

      {section === "anatomy" && (
        <>
          <SectionLabel label="Topic" />
          <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
            {ANATOMY_TOPICS.map(t => <Pill key={t} label={t} active={anatomyTopic === t} color={t === "All" ? C.forest : TOPIC_COLORS_A[t]} onClick={() => setAnatomyTopic(t)} />)}
          </div>
          <SectionLabel label="Difficulty" />
          <div style={{ display: "flex", gap: 8, marginBottom: 36, flexWrap: "wrap" }}>
            {["all", "easy", "medium", "hard"].map(d => <Pill key={d} label={d === "all" ? "All levels" : d} active={difficulty === d} color={d === "all" ? C.forest : DIFF_COLORS[d]} onClick={() => setDifficulty(d)} />)}
          </div>
        </>
      )}

      {section === "mat" && (
        <>
          <SectionLabel label="Theme" />
          <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
            {MAT_THEMES.map(t => <Pill key={t} label={t} active={matTheme === t} color={C.accent} onClick={() => setMatTheme(t)} />)}
          </div>
          <SectionLabel label="Exercise level" />
          <div style={{ display: "flex", gap: 8, marginBottom: 36, flexWrap: "wrap" }}>
            {MAT_LEVELS.map(l => <Pill key={l} label={l} active={matLevel === l} color={l === "All" ? C.forest : LEVEL_COLORS[l]} onClick={() => setMatLevel(l)} />)}
          </div>
        </>
      )}

      <Btn onClick={() => onStart({ section, difficulty, historyTopic, anatomyTopic, matTheme, matLevel, pool })} disabled={pool.length === 0}>
        Begin {pool.length} question{pool.length !== 1 ? "s" : ""} →
      </Btn>
    </div>
  );
}

function Quiz({ questions, config, onDone }) {
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState(null);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const q = questions[idx];
  const total = questions.length;
  const cfg = SECTION_CONFIG[config.section];

  function handleAnswer(val) {
    if (answered) return;
    setSelected(val); setAnswered(true);
    const correct = q.type === "fill" ? val.toLowerCase().trim().includes(q.answer.toLowerCase()) : q.type === "flashcard" ? val === true : val === q.correct;
    if (correct) setScore(s => s + 1);
  }

  function next() {
    if (idx + 1 >= total) { onDone(score, total); return; }
    setIdx(i => i + 1); setAnswered(false); setSelected(null); setInput("");
  }

  return (
    <div style={{ maxWidth: 620, margin: "0 auto", padding: "32px 24px 40px" }}>
      <div style={{ width: "100%", height: 2, background: C.sageLight, marginBottom: 32 }}>
        <div style={{ height: "100%", background: cfg.color, width: `${(idx / total) * 100}%`, transition: "width 0.4s ease" }} />
      </div>
      <p style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: "1.2rem", color: C.forest, marginBottom: 26 }}>{q.q}</p>
      {q.type === "mcq" && <MCQ q={q} onAnswer={handleAnswer} answered={answered} selected={selected} />}
      {q.type === "tf" && <TF q={q} onAnswer={handleAnswer} answered={answered} selected={selected} />}
      {q.type === "flashcard" && <Flashcard q={q} onAnswer={handleAnswer} answered={answered} />}
      {q.type === "fill" && <Fill q={q} onAnswer={handleAnswer} answered={answered} input={input} setInput={setInput} />}
      {answered && <div style={{ marginTop: 18, padding: "13px 16px", borderLeft: `2px solid ${cfg.color}`, background: "rgba(90,110,88,0.05)", fontSize: "0.8rem", color: C.forest }}>{q.explanation}</div>}
      {answered && <Btn onClick={next} style={{ marginTop: 20 }}>Next →</Btn>}
    </div>
  );
}

function Results({ score, total, section, onRetry, onHome }) {
  const cfg = SECTION_CONFIG[section];
  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: "56px 24px 40px" }}>
      <Tag color={cfg.color}>Complete</Tag>
      <div style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: "4rem", color: cfg.color }}>{score}/{total}</div>
      <div style={{ display: "flex", gap: 12, marginTop: 30 }}>
        <Btn onClick={onRetry}>Retry</Btn>
        <Btn onClick={onHome} variant="ghost">Home</Btn>
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [questions, setQuestions] = useState([]);
  const [quizConfig, setQuizConfig] = useState({});
  const [finalScore, setFinalScore] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);

  function startQuiz(config) {
    setQuestions(shuffle(config.pool));
    setQuizConfig(config);
    setScreen("quiz");
  }

  return (
    <div style={{ minHeight: "100vh", background: C.cream, display: "flex", flexDirection: "column" }}>
      <Header />
      <div style={{ flex: 1 }}>
        {screen === "home" && <Home onStart={startQuiz} />}
        {screen === "quiz" && <Quiz questions={questions} config={quizConfig} onDone={(s, t) => { setFinalScore(s); setFinalTotal(t); setScreen("results"); }} />}
        {screen === "results" && <Results score={finalScore} total={finalTotal} section={quizConfig.section} onRetry={() => startQuiz(quizConfig)} onHome={() => setScreen("home")} />}
      </div>
    </div>
  );
}
