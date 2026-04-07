import { useState } from "react";
import { Link } from "react-router";
import {
  Menu, X, Play, BookOpen, IndianRupee, Video, Sparkles,
  BrainCircuit, CheckCircle2, XCircle, Star, Brain, Zap, Compass,
  MessageSquare, Moon, Mic, Smartphone, TrendingDown, Target,
  BarChart2, FileText, Activity, Phone, Search, Award, Globe,
  Share2, Lock, Shield, RefreshCw, Trophy, Users, Mail,
  Instagram, Linkedin, MapPin, Flame, Briefcase, Calendar
} from "lucide-react";
import logo from "../../assets/logo.png";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "../components/ui/accordion";

import { motion, AnimatePresence } from "motion/react";

import { ThemeToggle } from "../components/ThemeToggle";

// ─── Design tokens ────────────────────────────────────────────
const C = {
  bg: "var(--bg-main)",
  surface: "var(--bg-surface)",
  elevated: "var(--bg-elevated)",
  sidebar: "var(--bg-sidebar)",
  emerald: "var(--c-emerald)",
  saffron: "var(--c-saffron)",
  violet: "var(--c-violet)",
  rose: "var(--c-rose)",
  textPrimary: "var(--text-primary)",
  textSecondary: "var(--text-secondary)",
  textTertiary: "var(--text-tertiary)",
  border: "var(--border-default)",
};

const cardStyle: React.CSSProperties = {
  backgroundColor: C.surface,
  border: `1px solid ${C.border}`,
  borderRadius: 12,
  boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
};

// ─── Shared fade-up wrapper ───────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── ArcGauge ─────────────────────────────────────────────────
function ArcGauge({ value, max, label, dark = false }: { value: number; max: number; label: string; dark?: boolean }) {
  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  const sweepAngle = 270;
  const startAngle = 135;
  const cx = 140, cy = 140;
  const toCoord = (angle: number) => ({
    x: cx + radius * Math.cos((angle * Math.PI) / 180),
    y: cy + radius * Math.sin((angle * Math.PI) / 180),
  });
  const start = toCoord(startAngle);
  const end = toCoord(startAngle + sweepAngle);
  const pathData = `M ${start.x} ${start.y} A ${radius} ${radius} 0 1 1 ${end.x} ${end.y}`;
  const length = circumference * 0.75;
  const offset = length * (1 - value / max);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[280px] h-[280px]">
        <svg className="w-full h-full" viewBox="0 0 280 280">
          <defs>
            <linearGradient id="arc-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={C.emerald} />
              <stop offset="50%" stopColor={C.violet} />
              <stop offset="100%" stopColor={C.saffron} />
            </linearGradient>
          </defs>
          <path d={pathData} fill="none" stroke={dark ? "rgba(255,255,255,0.1)" : C.border} strokeWidth="18" strokeLinecap="round" />
          <motion.path
            d={pathData}
            fill="none"
            stroke="url(#arc-grad)"
            strokeWidth="18"
            strokeLinecap="round"
            strokeDasharray={length}
            initial={{ strokeDashoffset: length }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
          <span className="font-mono text-[64px] font-bold leading-none" style={{ color: dark ? "#fff" : C.textPrimary }}>{value}</span>
          <span className="font-mono text-sm mt-1" style={{ color: dark ? "rgba(255,255,255,0.5)" : C.textSecondary }}>/ {max}</span>
          <span className="mt-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border" style={{ backgroundColor: `${C.emerald}18`, color: C.emerald, borderColor: `${C.emerald}40` }}>{label}</span>
        </div>
      </div>
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const alreadyLoggedIn = !!localStorage.getItem('access_token');
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10" style={{ backgroundColor: C.sidebar, borderBottom: "1px solid rgba(255,255,255,0.06)", height: 100 }}>
        <Link to="/" className="flex items-center gap-5 shrink-0 group">
          <img 
            src={logo} 
            alt="Manzil AI Logo" 
            className="w-[100px] h-[100px] object-contain transition-transform group-hover:scale-105" 
            style={{ filter: "invert(1) hue-rotate(180deg) contrast(1.2)", mixBlendMode: "screen" }}
          />
          <span className="font-display font-bold text-4xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-indigo-400">
            Manzil AI
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(l => <a key={l.label} href={l.href} className="text-[#9CA3AF] hover:text-white text-sm font-medium transition-colors">{l.label}</a>)}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          {alreadyLoggedIn ? (
            <Link to="/app" className="px-5 py-2 rounded-lg text-sm font-semibold text-white transition-colors" style={{ backgroundColor: C.violet }}>Go to Dashboard →</Link>
          ) : (
            <>
              <Link to="/onboarding" className="border border-white/20 text-white/80 hover:text-white hover:border-white/40 px-4 py-2 rounded-lg text-sm font-medium transition-all">Log in</Link>
              <Link to="/onboarding" className="px-5 py-2 rounded-lg text-sm font-semibold text-white transition-colors" style={{ backgroundColor: C.violet }}>Get Started Free →</Link>
            </>
          )}
        </div>
        <button className="md:hidden text-white p-2" onClick={() => setOpen(true)}><Menu className="w-6 h-6" /></button>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-[100] flex flex-col" style={{ backgroundColor: C.sidebar }}>
            <div className="flex items-center justify-between h-[68px] px-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
                <img src={logo} alt="Manzil AI Logo" className="w-8 h-8 object-contain" />
                <span className="font-heading font-bold text-white text-xl tracking-wide">Manzil AI</span>
              </Link>
              <button className="text-white p-2" onClick={() => setOpen(false)}><X className="w-6 h-6" /></button>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.3 }} className="flex-1 flex flex-col items-center justify-center gap-8">
              {NAV_LINKS.map((l, i) => (
                <motion.a key={l.label} href={l.href} onClick={() => setOpen(false)} className="text-[#9CA3AF] hover:text-white text-2xl font-heading font-medium transition-colors" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>{l.label}</motion.a>
              ))}
              <div className="flex flex-col items-center gap-4 mt-4">
                {alreadyLoggedIn ? (
                  <Link to="/app" onClick={() => setOpen(false)} className="px-8 py-3 rounded-lg text-base font-semibold text-white" style={{ backgroundColor: C.violet }}>Go to Dashboard →</Link>
                ) : (
                  <>
                    <Link to="/onboarding" onClick={() => setOpen(false)} className="border border-white/20 text-white/80 hover:text-white px-8 py-3 rounded-lg text-base font-medium transition-all">Log in</Link>
                    <Link to="/onboarding" onClick={() => setOpen(false)} className="px-8 py-3 rounded-lg text-base font-semibold text-white" style={{ backgroundColor: C.violet }}>Get Started Free →</Link>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── SECTION 2: HERO ─────────────────────────────────────────
function Hero() {
  return (
    <section style={{ backgroundColor: C.bg, padding: "100px 40px 80px" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }} className="flex flex-col items-center">
        <FadeUp>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6" style={{ backgroundColor: "#EEF2FF", color: C.violet, border: `1px solid ${C.violet}33` }}>
            🇮🇳&nbsp; Built for 15 million Indian students
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h1 className="font-display text-center leading-[1.05] tracking-tight" style={{ fontSize: 72, color: C.textPrimary }}>
            <span>Study </span><span style={{ color: C.emerald }}>smarter</span>.<br />
            <span>Spend </span><span style={{ color: C.saffron }}>wiser</span>.<br />
            <span>Interview </span><span style={{ color: C.violet }}>better</span>.
          </h1>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="font-sans text-center mt-6 leading-relaxed" style={{ fontSize: 18, color: C.textSecondary, maxWidth: 560 }}>
            The only app where your study performance, money habits, and interview readiness share the same AI brain. Built for Indian college students preparing for placements.
          </p>
        </FadeUp>
        <FadeUp delay={0.3}>
          <div className="flex gap-4 justify-center mt-10 flex-wrap">
            <Link to="/onboarding" className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white transition-all text-[15px]" style={{ backgroundColor: C.violet }}>Start for free →</Link>
          </div>
        </FadeUp>


        {/* Hero visual */}
        <FadeUp delay={0.5} className="w-full mt-16">
          <div className="relative" style={{ maxWidth: 960, margin: "0 auto" }}>
            <div className="rounded-2xl overflow-hidden pointer-events-none" style={{ ...cardStyle, boxShadow: "0 20px 60px -15px rgba(0,0,0,0.12)" }}>
              <div className="p-6 bg-[#F7F6F2]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  <div className="lg:col-span-1 flex justify-center"><ArcGauge value={712} max={1000} label="Top 18% This Week" /></div>
                  <div className="lg:col-span-2 grid grid-cols-3 gap-4 content-start">
                    {[
                      { label: "Topics Strong", val: "12", color: C.emerald, icon: <BookOpen className="w-6 h-6" style={{ color: C.emerald }} /> },
                      { label: "Remaining this week", val: "₹3.2k", color: C.saffron, icon: <IndianRupee className="w-6 h-6" style={{ color: C.saffron }} /> },
                      { label: "Avg Session Score", val: "74", color: C.violet, icon: <Video className="w-6 h-6" style={{ color: C.violet }} /> },
                    ].map((card, i) => (
                      <div key={i} className="p-5 rounded-xl" style={{ ...cardStyle, borderTop: `3px solid ${card.color}` }}>
                        {card.icon}
                        <div className="font-display text-3xl mt-4" style={{ color: C.textPrimary }}>{card.val}</div>
                        <div className="text-xs mt-1" style={{ color: C.textSecondary }}>{card.label}</div>
                      </div>
                    ))}
                    <div className="col-span-3 p-5 rounded-xl flex items-start gap-4" style={{ ...cardStyle, borderLeft: `3px solid ${C.saffron}` }}>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${C.saffron}18` }}>
                        <BrainCircuit className="w-5 h-5" style={{ color: C.saffron }} />
                      </div>
                      <p className="text-sm font-medium leading-relaxed" style={{ color: C.textPrimary }}>Interview Friday. You've spent 40% of budget. <span style={{ color: C.saffron }} className="font-bold">Skip Zomato today</span> and revise OS.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Floating top-right */}
            <div className="absolute top-6 right-6 rounded-xl p-3 flex items-center gap-3 shadow-lg" style={{ ...cardStyle }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${C.emerald}18` }}>
                <span className="font-mono font-bold text-xs" style={{ color: C.emerald }}>712</span>
              </div>
              <div>
                <div className="font-mono font-bold text-sm" style={{ color: C.textPrimary }}>Manzil Score: 712</div>
                <div className="text-xs" style={{ color: C.emerald }}>Top 18% this week</div>
              </div>
            </div>
            {/* Floating bottom-left */}
            <div className="absolute bottom-6 left-6 rounded-xl p-3 flex items-start gap-3 shadow-lg" style={{ backgroundColor: C.sidebar, maxWidth: 260 }}>
              <BrainCircuit className="w-5 h-5 mt-0.5 shrink-0" style={{ color: C.saffron }} />
              <p className="text-xs leading-relaxed" style={{ color: "#E8E6DF" }}>Interview Friday. Skip Zomato. Revise OS tonight.</p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── SECTION 3: PROBLEM ──────────────────────────────────────
function Problem() {
  return (
    <section style={{ backgroundColor: C.surface, padding: "80px 40px" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <FadeUp><p className="text-xs font-semibold uppercase tracking-[0.12em] mb-4 font-heading" style={{ color: C.emerald }}>THE PROBLEM</p></FadeUp>
        <FadeUp delay={0.1}><h2 className="font-display leading-tight" style={{ fontSize: 48, color: C.textPrimary }}>Students use 4 apps.<br />None of them talk to each other.</h2></FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            { icon: <BookOpen className="w-5 h-5" style={{ color: C.textTertiary }} />, title: "Your study app", desc: "Knows you're weak in OS. Doesn't know your interview is in 3 days." },
            { icon: <IndianRupee className="w-5 h-5" style={{ color: C.textTertiary }} />, title: "Your finance app", desc: "Knows you overspent on Zomato. Doesn't know it's killing your focus." },
            { icon: <Video className="w-5 h-5" style={{ color: C.textTertiary }} />, title: "Your interview app", desc: "Knows you scored 68. Doesn't know stress and bad sleep caused it." },
          ].map((c, i) => (
            <FadeUp key={i} delay={0.1 + i * 0.1}>
              <div className="p-6 h-full" style={cardStyle}>
                <div className="flex gap-2">{c.icon}</div>
                <h3 className="font-heading font-semibold text-[15px] mt-4" style={{ color: C.textPrimary }}>{c.title}</h3>
                <p className="font-sans text-sm mt-2 leading-relaxed" style={{ color: C.textSecondary }}>{c.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
        <FadeUp delay={0.4}>
          <div className="mt-8 rounded-xl p-6 flex items-center gap-4" style={{ backgroundColor: C.elevated, borderLeft: `4px solid ${C.violet}`, borderRadius: 12 }}>
            <Sparkles className="w-6 h-6 shrink-0" style={{ color: C.violet }} />
            <span className="font-heading font-semibold text-[17px]" style={{ color: C.textPrimary }}>Manzil connects all three. One brain. One score. One plan.</span>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── SECTION 4: HOW IT WORKS ─────────────────────────────────
function HowItWorks() {
  const cards = [
    {
      color: C.emerald, icon: <BookOpen className="w-8 h-8" style={{ color: C.emerald }} />,
      title: "Study smarter, not harder",
      desc: "AI-powered tools that adapt to your retention, summarize lectures, and quiz you exactly where you need it.",
      features: ["Spaced Repetition Engine", "Lecture Audio to Notes", "Smart PDF Summarizer", "Code Mentor", "Weak Topic Radar Chart", "Study Streaks"],
    },
    {
      color: C.saffron, icon: <IndianRupee className="w-8 h-8" style={{ color: C.saffron }} />,
      title: "Own your money",
      desc: "Easily track expenses, set countdowns for dream purchases, and get brutally roasted by AI on your spending habits.",
      features: ["Real-time spending donut", "Savings Goal Countdown", "AI Budget Roast", "Category Budgeting", "Expense History", "CGPA to Package Estimator"],
    },
    {
      color: C.violet, icon: <Video className="w-8 h-8" style={{ color: C.violet }} />,
      title: "Walk in confident",
      desc: "Live AI mock interviews, resume gap analysis, and tailored scholarship finding to prep you for the real thing.",
      features: ["Live AI interview simulator", "Resume Gap Detector", "Roast My Resume", "Scholarship Radar", "Weekly Mock Sessions", "Performance History"],
    },
  ];

  return (
    <section id="how-it-works" style={{ backgroundColor: C.bg, padding: "80px 40px" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <FadeUp><p className="text-xs font-semibold uppercase tracking-[0.12em] mb-4 font-heading" style={{ color: C.emerald }}>HOW IT WORKS</p></FadeUp>
        <FadeUp delay={0.1}><h2 className="font-display leading-tight" style={{ fontSize: 48, color: C.textPrimary }}>Three modules. One intelligence.</h2></FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {cards.map((card, i) => (
            <FadeUp key={i} delay={0.1 + i * 0.1}>
              <div className="p-8 h-full" style={{ ...cardStyle, borderTop: `4px solid ${card.color}` }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${card.color}18` }}>{card.icon}</div>
                <h3 className="font-heading font-bold text-[18px]" style={{ color: C.textPrimary }}>{card.title}</h3>
                <p className="font-sans text-sm mt-2 leading-relaxed" style={{ color: C.textSecondary }}>{card.desc}</p>
                <ul className="mt-4 space-y-2">
                  {card.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm" style={{ color: C.textSecondary }}>
                      <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: card.color }} />{f}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          ))}
        </div>
        {/* AI Nudge showcase */}
        <FadeUp delay={0.5}>
          <div className="mt-8 rounded-xl p-8 flex flex-col md:flex-row gap-8" style={cardStyle}>
            <div className="flex-[3] flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] font-heading mb-3" style={{ color: C.violet }}>THIS IS THE DIFFERENCE</p>
              <h3 className="font-display text-[28px] leading-tight" style={{ color: C.textPrimary }}>The AI nudge no other app can send.</h3>
              <p className="font-sans text-sm mt-4 leading-relaxed" style={{ color: C.textSecondary }}>When Manzil sees that your interview is Friday, you've spent 40% of your budget, and OS is your weakest topic — it connects the dots instantly.</p>
            </div>
            <div className="flex-[2]">
              <div className="rounded-xl p-5" style={{ backgroundColor: C.sidebar }}>
                <BrainCircuit className="w-6 h-6 mb-3" style={{ color: C.saffron }} />
                <p className="text-sm leading-relaxed" style={{ color: "#E8E6DF" }}>Interview Friday. You've spent 40% of budget. Skip Zomato today and revise OS tonight.</p>
                <div className="flex gap-2 mt-4 flex-wrap">
                  {[{ label: "📚 Study data", color: C.emerald }, { label: "💰 Finance data", color: C.saffron }, { label: "🎯 Interview data", color: C.violet }].map((c, i) => (
                    <span key={i} className="px-2 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: `${c.color}33`, color: c.color }}>{c.label}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── SECTION 5: MANZIL SCORE ────────────────────────────────
function ScoreSection() {
  const bars = [
    { label: "Academic Growth", pct: 74, color: C.emerald },
    { label: "Financial Health", pct: 61, color: C.saffron },
    { label: "Interview Readiness", pct: 81, color: C.violet },
  ];
  return (
    <section style={{ backgroundColor: C.sidebar, padding: "80px 40px" }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center" style={{ maxWidth: 1160, margin: "0 auto" }}>
        <FadeUp className="flex flex-col">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] mb-4 font-heading" style={{ color: C.emerald }}>THE MANZIL SCORE</p>
          <h2 className="font-display text-[48px] leading-tight text-white">One number that tells your whole story.</h2>
          <p className="mt-4 text-[16px] leading-relaxed" style={{ color: "#9CA3AF" }}>712 out of 1000. Updated every day. Combines academic growth, financial discipline, and interview readiness into a single verified score — like a credit score for your student life.</p>
          <div className="mt-8 space-y-4">
            {bars.map((b, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium" style={{ color: "#9CA3AF" }}>{b.label}</span>
                  <span className="font-mono text-sm text-white">{b.pct}%</span>
                </div>
                <div className="h-2 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                  <motion.div className="h-full rounded-full" style={{ backgroundColor: b.color }} initial={{ width: 0 }} whileInView={{ width: `${b.pct}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 + i * 0.15 }} />
                </div>
              </div>
            ))}
          </div>
          <Link to="/onboarding" className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-colors self-start" style={{ backgroundColor: C.emerald }}>See your score →</Link>
        </FadeUp>
        <FadeUp delay={0.2} className="flex justify-center">
          <ArcGauge value={712} max={1000} label="Top 18% This Week" dark />
        </FadeUp>
      </div>
    </section>
  );
}

// ─── SECTION 6: FEATURES GRID ────────────────────────────────
function FeaturesGrid() {
  const features = [
    // Emerald (Study)
    { icon: <Mic />, color: C.emerald, title: "Lecture Recorder", desc: "Record 10 mins → get notes + quiz" },
    { icon: <FileText />, color: C.emerald, title: "Smart Notes", desc: "Upload PDF → flashcards + summary" },
    { icon: <RefreshCw />, color: C.emerald, title: "Spaced Repetition", desc: "AI re-asks your wrong answers later" },
    { icon: <MessageSquare />, color: C.emerald, title: "Code Mentor", desc: "Paste broken code → AI explains fixes" },
    // Saffron (Finance)
    { icon: <IndianRupee />, color: C.saffron, title: "CGPA Estimator", desc: "Enter CGPA + tier → likely package" },
    { icon: <Target />, color: C.saffron, title: "Savings Goals", desc: "Daily save target + progress bar" },
    { icon: <BarChart2 />, color: C.saffron, title: "Expense Tracking", desc: "See where your money goes instantly" },
    { icon: <Flame />, color: C.saffron, title: "AI Budget Roast", desc: "Weekly savage spending feedback" },
    // Violet (Interview & Career)
    { icon: <Video />, color: C.violet, title: "Mock Interviews", desc: "Real-time mock interview simulator" },
    { icon: <Briefcase />, color: C.violet, title: "Resume Gap Detector", desc: "Upload resume → find missing skills" },
    { icon: <Star />, color: C.violet, title: "Roast My Resume", desc: "Actionable AI feedback on your CV" },
    { icon: <Search />, color: C.violet, title: "Scholarship Radar", desc: "Find scholarships based on your profile" },
    // Platform
    { icon: <Calendar />, color: C.textTertiary, title: "Monthly Wrap", desc: "Spotify-style monthly shareable recap" },
    { icon: <Share2 />, color: C.textTertiary, title: "Shareable Cards", desc: "Instantly share scores on WhatsApp" },
  ];

  return (
    <section id="features" style={{ backgroundColor: C.surface, padding: "80px 40px" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <FadeUp><p className="text-xs font-semibold uppercase tracking-[0.12em] mb-4 font-heading" style={{ color: C.saffron }}>EVERYTHING YOU NEED</p></FadeUp>
        <FadeUp delay={0.1}><h2 className="font-display leading-tight" style={{ fontSize: 48, color: C.textPrimary }}>Built for the Indian placement grind.</h2></FadeUp>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {features.map((f, i) => (
            <FadeUp key={i} delay={0.05 * (i % 4)}>
              <div className="p-5 flex flex-col gap-3 h-full" style={cardStyle}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${f.color}18` }}>
                  <span style={{ color: f.color, width: 20, height: 20, display: "flex" }}>{f.icon}</span>
                </div>
                <h4 className="font-heading font-semibold text-[14px]" style={{ color: C.textPrimary }}>{f.title}</h4>
                <p className="font-sans text-[12px] leading-relaxed" style={{ color: C.textSecondary }}>{f.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 7: INDIA FIRST ──────────────────────────────────
function IndiaFirst() {
  const list = [
    { title: "CGPA to Package Estimator", desc: "Real salary ranges mapped to Indian college tiers" },
    { title: "AI Budget Roast", desc: "Get brutally roasted for spending all your pocket money on Zomato" },
    { title: "Indian Scholarship Radar", desc: "Find live scholarships actually relevant to Indian students" },
    { title: "WhatsApp Shareable Cards", desc: "Instantly share your Manzil stats as an Instagram or WhatsApp story" },
    { title: "Resume Roast", desc: "Direct, no-nonsense feedback on your ATS score before placements" },
  ];

  return (
    <section style={{ backgroundColor: C.bg, padding: "80px 40px" }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center" style={{ maxWidth: 1160, margin: "0 auto" }}>
        <FadeUp>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] mb-4 font-heading" style={{ color: C.saffron }}>🇮🇳&nbsp; MADE FOR BHARAT</p>
          <h2 className="font-display text-[48px] leading-tight" style={{ color: C.textPrimary }}>Not adapted for India.<br />Born here.</h2>
          <p className="font-sans text-[16px] mt-4 leading-relaxed" style={{ color: C.textSecondary }}>Every feature was designed knowing your user gets ₹5,000 pocket money on the 1st, lives in a hostel, talks in Hinglish, pays via GPay, and is preparing for TCS — not Google.</p>
          <ul className="mt-8 space-y-4">
            {list.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" style={{ color: C.emerald }} />
                <div>
                  <span className="font-heading font-semibold text-[15px]" style={{ color: C.textPrimary }}>{item.title}</span>
                  <span className="text-sm" style={{ color: C.textSecondary }}> — {item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </FadeUp>
        <FadeUp delay={0.2} className="flex justify-center">
          <div className="w-[320px] rounded-[32px] p-4" style={{ backgroundColor: C.sidebar, boxShadow: "0 30px 80px -20px rgba(0,0,0,0.2)" }}>
            <div className="flex flex-col items-center gap-4 py-8 px-4">
              <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: `${C.saffron}20`, border: `2px solid ${C.saffron}40` }}>
                <Flame className="w-9 h-9" style={{ color: C.saffron }} />
              </div>
              <div className="w-full rounded-xl p-3 mt-2" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                <p className="text-sm font-sans" style={{ color: "#E8E6DF" }}>AI Budget Roast</p>
              </div>
              <div className="w-full rounded-lg p-3 flex items-center gap-3" style={{ backgroundColor: `${C.saffron}20` }}>
                <span className="text-sm italic" style={{ color: "#E8E6DF" }}>"Another order from Swiggy? You're not the CEO of Reliance yet. Save some money for that placement suit."</span>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}



// ─── SECTION 9: PRICING ──────────────────────────────────────
function Pricing() {
  const freeFeatures = ["Spaced Repetition & Study Tools", "Resume & AI Mock Interviews", "CGPA & Salary Estimators", "Expense Tracking & Budgets", "Manzil Life Score", "Monthly Shareable Wrap"];

  return (
    <section id="pricing" style={{ backgroundColor: C.bg, padding: "80px 40px" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <FadeUp><p className="text-xs font-semibold uppercase tracking-[0.12em] mb-4 font-heading" style={{ color: C.saffron }}>PRICING</p></FadeUp>
        <FadeUp delay={0.1}><h2 className="font-display leading-tight" style={{ fontSize: 48, color: C.textPrimary }}>Built by students, for students.</h2></FadeUp>
        <FadeUp delay={0.15}><p className="text-[16px] mt-3" style={{ color: C.textSecondary }}>100% Free forever. No hidden fees. No credit card required.</p></FadeUp>
        
        <div className="flex justify-center mt-10">
          <FadeUp delay={0.2} className="w-full max-w-lg">
            <div className="p-8 relative" style={{ ...cardStyle, border: `2px solid ${C.violet}`, boxShadow: `0 8px 30px -8px rgba(91,71,224,0.25)` }}>
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: C.violet }}>All Inclusive</span>
              <div className="font-mono text-[40px] font-bold text-center" style={{ color: C.violet }}>
                ₹0 <span className="text-sm font-sans font-normal" style={{ color: C.textSecondary }}>/month</span>
              </div>
              <h3 className="font-heading font-bold text-[18px] mt-2 text-center" style={{ color: C.textPrimary }}>Community Edition</h3>
              <p className="text-sm mt-1 text-center" style={{ color: C.textSecondary }}>Full power, unlimited access.</p>
              <ul className="mt-6 space-y-3">{freeFeatures.map(f => <li key={f} className="flex items-center justify-center gap-2 text-sm" style={{ color: C.textSecondary }}><CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: C.violet }} />{f}</li>)}</ul>
              <Link to="/onboarding" className="w-full mt-8 py-3 rounded-xl font-semibold text-sm text-center block text-white transition-colors" style={{ backgroundColor: C.violet }}>Get Started for Free →</Link>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 10: COMPARISON TABLE ────────────────────────────
function ComparisonTable() {
  const rows = [
    { feature: "AI Spaced Repetition", manzil: true, finalRound: false, studyApp: true, budgetApp: false },
    { feature: "Resume & Career Roasts", manzil: true, finalRound: true, studyApp: false, budgetApp: false },
    { feature: "Expense & Goal Tracking", manzil: true, finalRound: false, studyApp: false, budgetApp: true },
    { feature: "Actionable Shareable Cards", manzil: true, finalRound: false, studyApp: false, budgetApp: false },
    { feature: "Built for Indian Placements", manzil: true, finalRound: false, studyApp: false, budgetApp: false },
    { feature: "Manzil Life Score", manzil: true, finalRound: false, studyApp: false, budgetApp: false },
    { feature: "Unified Dashboard", manzil: true, finalRound: false, studyApp: false, budgetApp: false },
    { feature: "Free forever", manzil: true, finalRound: false, studyApp: true, budgetApp: true },
  ];

  const Check = () => <CheckCircle2 className="w-5 h-5 mx-auto" style={{ color: C.emerald }} />;
  const Cross = () => <XCircle className="w-5 h-5 mx-auto" style={{ color: C.textTertiary }} />;

  const renderCell = (val: boolean | string) => {
    if (val === true) return <Check />;
    if (val === false) return <Cross />;
    return <span className="font-mono text-sm" style={{ color: C.textPrimary }}>{val}</span>;
  };

  return (
    <section style={{ backgroundColor: C.surface, padding: "80px 40px" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <FadeUp><h2 className="font-display text-[40px]" style={{ color: C.textPrimary }}>How Manzil stacks up.</h2></FadeUp>
        <FadeUp delay={0.1}>
          <div className="mt-10 w-full overflow-hidden rounded-2xl border" style={{ borderColor: C.border }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: C.bg }}>
                  <th className="text-left px-6 py-4 font-heading font-semibold" style={{ color: C.textPrimary }}>Feature</th>
                  <th className="px-6 py-4 font-heading font-bold text-center" style={{ color: C.violet, backgroundColor: `${C.violet}08` }}>Manzil</th>
                  <th className="px-6 py-4 font-heading font-semibold text-center" style={{ color: C.textSecondary }}>Final Round AI</th>
                  <th className="px-6 py-4 font-heading font-semibold text-center" style={{ color: C.textSecondary }}>Study Apps</th>
                  <th className="px-6 py-4 font-heading font-semibold text-center" style={{ color: C.textSecondary }}>Budget Apps</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? C.surface : C.bg, borderTop: `1px solid ${C.border}` }}>
                    <td className="px-6 py-4 font-sans" style={{ color: C.textPrimary }}>{row.feature}</td>
                    <td className="px-6 py-4 text-center" style={{ backgroundColor: `${C.violet}04` }}>{renderCell(row.manzil)}</td>
                    <td className="px-6 py-4 text-center">{renderCell(row.finalRound)}</td>
                    <td className="px-6 py-4 text-center">{renderCell(row.studyApp)}</td>
                    <td className="px-6 py-4 text-center">{renderCell(row.budgetApp)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── SECTION 11: FAQ ─────────────────────────────────────────
function FAQ() {
  const items = [
    { q: "Is Manzil really free?", a: "Yes. The platform is entirely free right now as we build out features for the Indian student community. You get full access to spaced repetition, mock interviews, and AI budget roasts. No credit card needed." },
    { q: "Does the AI connect my data from different modules?", a: "Manzil stores your study performance, spending patterns, and interview scores in a shared profile. This fuels the Manzil Score which gives you a high-level view of your life." },
    { q: "Does it work for non-engineering students?", a: "Yes. The finance tools, study dashboards, and core resume feedback modules work for any stream." },
    { q: "Is my financial data safe?", a: "Your data is encrypted and stored securely. We never sell or share personal data." },
    { q: "How is Manzil different from just using ChatGPT?", a: "ChatGPT doesn't track your exam dates, your spending this month, or your past mock interview scores. Manzil does — and acts as a unified platform specifically for placement preparation." },
    { q: "What is the Manzil Life Score based on?", a: "It combines your academic growth (flashcard accuracy, study streaks), financial disciple (budget adherence), and interview readiness (mock performance) into one verifiable number." },
  ];
  return (
    <section id="faq" style={{ backgroundColor: C.bg, padding: "80px 40px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <FadeUp><p className="text-xs font-semibold uppercase tracking-[0.12em] mb-4 font-heading text-center" style={{ color: C.emerald }}>FAQ</p></FadeUp>
        <FadeUp delay={0.1}><h2 className="font-display text-center leading-tight mb-10" style={{ fontSize: 48, color: C.textPrimary }}>Common questions.</h2></FadeUp>
        <FadeUp delay={0.2}>
          <Accordion type="single" collapsible className="space-y-3">
            {items.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="rounded-xl px-6" style={{ ...cardStyle }}>
                <AccordionTrigger className="font-heading font-semibold text-[15px] py-5 hover:no-underline" style={{ color: C.textPrimary }}>{item.q}</AccordionTrigger>
                <AccordionContent className="font-sans text-sm leading-relaxed pb-5" style={{ color: C.textSecondary }}>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── SECTION 12: ABOUT ───────────────────────────────────────
function About() {
  const team = [
    { initials: "HA", color: C.violet, name: "Hardik Agarwal", role: "Co-Founder" },
    { initials: "SP", color: C.emerald, name: "Samay Parashar", role: "Co-Founder" },
    { initials: "AJ", color: C.saffron, name: "Aditya Jain", role: "Co-Founder" },
  ];
  const milestones = [
    { icon: <Trophy className="w-5 h-5" style={{ color: C.saffron }} />, bg: `${C.saffron}18`, title: "Built at a Hackathon", desc: "Born from a 36-hour sprint, solving a real problem we faced" },
    { icon: <BrainCircuit className="w-5 h-5" style={{ color: C.violet }} />, bg: `${C.violet}18`, title: "AI-first from Day 1", desc: "Cross-module intelligence that no single-purpose app can match" },
    { icon: <Globe className="w-5 h-5" style={{ color: C.emerald }} />, bg: `${C.emerald}18`, title: "Made for Bharat", desc: "Designed around how Indian students actually live, spend, and prepare" },
  ];
  return (
    <section id="about" style={{ backgroundColor: C.surface, padding: "80px 40px" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <FadeUp><p className="text-xs font-semibold uppercase tracking-[0.12em] mb-4 font-heading" style={{ color: C.violet }}>ABOUT US</p></FadeUp>
        <FadeUp delay={0.1}><h2 className="font-display leading-tight" style={{ fontSize: 48, color: C.textPrimary }}>We were the students this app was built for.</h2></FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mt-12">
          <FadeUp delay={0.15}>
            <div className="space-y-4 text-[16px] leading-relaxed" style={{ color: C.textSecondary }}>
              <p>Manzil AI started at a hackathon. We were three students — juggling placement pressure, a shrinking bank balance, and the anxiety of not knowing if we were actually ready. We used 4 different apps. None of them talked to each other.</p>
              <p>So we built the app we wished existed — one AI brain that connects your study performance, your spending habits, and your interview readiness into a single score and a single plan. Built in India, for India.</p>
              <p>Every feature was shaped by the real frustrations of tier-2 college life: UPI payments, Hinglish conversations, hostel budgets, and TCS interviews. This isn't an app adapted for India — it was born here.</p>
            </div>
            <div className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] mb-5 font-heading" style={{ color: C.textTertiary }}>THE TEAM</p>
              <div className="grid grid-cols-1 gap-4">
                {team.map((m, i) => (
                  <div key={i} className="p-5 flex items-center gap-4" style={cardStyle}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-base shrink-0 text-white" style={{ backgroundColor: m.color }}>{m.initials}</div>
                    <div>
                      <div className="font-heading font-semibold text-[15px]" style={{ color: C.textPrimary }}>{m.name}</div>
                      <div className="text-xs mt-0.5" style={{ color: C.textSecondary }}>{m.role} · Manzil AI</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="rounded-2xl p-8 space-y-4" style={{ backgroundColor: C.bg }}>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] mb-2 font-heading" style={{ color: C.textTertiary }}>WHY WE BUILT THIS</p>
              {milestones.map((m, i) => (
                <div key={i} className="p-5" style={cardStyle}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: m.bg }}>{m.icon}</div>
                    <span className="font-heading font-semibold text-[15px]" style={{ color: C.textPrimary }}>{m.title}</span>
                  </div>
                  <p className="text-sm pl-12" style={{ color: C.textSecondary }}>{m.desc}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 13: CONTACT ─────────────────────────────────────
function Contact() {
  const members = [
    {
      initials: "HA",
      color: C.violet,
      name: "Hardik Agarwal",
      role: "Co-Founder",
      email: "hardikagarwal10feb@gmail.com",
      linkedin: "https://www.linkedin.com/in/hardik-agarwal-85a90a382/",
    },
    {
      initials: "SP",
      color: C.emerald,
      name: "Samay Parashar",
      role: "Co-Founder",
      email: "Samayparashar@gmail.com",
      linkedin: "https://www.linkedin.com/in/samay-parashar-95833b382/",
    },
    {
      initials: "AJ",
      color: C.saffron,
      name: "Aditya Jain",
      role: "Co-Founder",
      email: "adityaalba27@gmail.com",
      linkedin: "https://www.linkedin.com/in/adityajain-dev/",
    },
  ];

  return (
    <section id="contact" style={{ backgroundColor: C.bg, padding: "80px 40px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <FadeUp><p className="text-xs font-semibold uppercase tracking-[0.12em] mb-4 font-heading text-center" style={{ color: C.saffron }}>CONTACT US</p></FadeUp>
        <FadeUp delay={0.1}><h2 className="font-display text-center leading-tight" style={{ fontSize: 48, color: C.textPrimary }}>Talk to the team.</h2></FadeUp>
        <FadeUp delay={0.15}><p className="text-center mt-3 font-sans" style={{ color: C.textSecondary, maxWidth: 520, margin: "12px auto 0" }}>Got a question, partnership idea, or want to bring Manzil to your college? Reach out directly to any of our co-founders.</p></FadeUp>
        <FadeUp delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {members.map((m, i) => (
              <div key={i} className="p-7 flex flex-col items-center text-center rounded-2xl" style={{ ...cardStyle, borderTop: `4px solid ${m.color}` }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl text-white mb-4" style={{ backgroundColor: m.color }}>{m.initials}</div>
                <div className="font-heading font-bold text-[17px]" style={{ color: C.textPrimary }}>{m.name}</div>
                <div className="text-xs mt-1 mb-5" style={{ color: C.textSecondary }}>{m.role} · Manzil AI</div>
                <a href={`mailto:${m.email}`} className="flex items-center gap-2 text-sm w-full px-4 py-2.5 rounded-lg mb-3 transition-colors" style={{ backgroundColor: `${m.color}10`, color: m.color, border: `1px solid ${m.color}30` }}>
                  <Mail className="w-4 h-4 shrink-0" />
                  <span className="truncate text-xs font-medium">{m.email}</span>
                </a>
                <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm w-full px-4 py-2.5 rounded-lg transition-colors" style={{ backgroundColor: `${m.color}10`, color: m.color, border: `1px solid ${m.color}30` }}>
                  <Linkedin className="w-4 h-4 shrink-0" />
                  <span className="text-xs font-medium">LinkedIn Profile</span>
                </a>
              </div>
            ))}
          </div>
        </FadeUp>
        <FadeUp delay={0.3}>
          <div className="mt-10 p-6 rounded-2xl flex items-center gap-4 justify-center" style={{ backgroundColor: C.elevated, border: `1px solid ${C.border}` }}>
            <MapPin className="w-5 h-5 shrink-0" style={{ color: C.violet }} />
            <span className="text-sm font-medium" style={{ color: C.textSecondary }}>Based in India · Open to college partnerships, recruiter tie-ups & press inquiries</span>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── SECTION 14: FINAL CTA BANNER ────────────────────────────
function FinalCTA() {
  return (
    <section style={{ backgroundColor: C.sidebar, padding: "80px 40px" }}>
      <div className="text-center">
        <FadeUp>
          <h2 className="font-display text-white leading-tight" style={{ fontSize: 56 }}>Your placement story starts today.</h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="mt-4 text-[18px] mx-auto" style={{ color: "#9CA3AF", maxWidth: 480 }}>Free to start. Takes 2 minutes to set up. Zero excuses.</p>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div className="flex gap-4 justify-center mt-10 flex-wrap">
            <Link to="/onboarding" className="px-8 py-4 rounded-xl font-bold text-[16px] text-white transition-colors" style={{ backgroundColor: C.emerald }}>Start for free →</Link>
            <Link to="/app" className="px-8 py-4 rounded-xl font-medium text-[16px] text-white/80 hover:text-white border border-white/20 hover:border-white/40 transition-all">See the dashboard →</Link>
          </div>
        </FadeUp>
        <FadeUp delay={0.3}>
          <p className="font-mono text-sm mt-12" style={{ color: "#3D4260" }}>Your Manzil Score: _ _ _ /1000 · Start now to find out</p>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── SECTION 15: FOOTER ──────────────────────────────────────
function Footer() {
  const productLinks = ["Features", "How It Works", "Pricing", "AI Tools", "Rewards", "Shareable Cards"];
  const companyLinks = ["About", "Blog", "Careers", "Press", "Contact"];
  const collegeLinks = ["Campus Plan", "College Analytics", "LMS Integration", "Request Demo", "Partner With Us"];

  return (
    <footer style={{ backgroundColor: C.sidebar, borderTop: "1px solid rgba(255,255,255,0.06)", padding: "48px 40px 32px" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Col 1 */}
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <img src={logo} alt="Manzil AI Logo" className="w-8 h-8 object-contain" />
              <span className="font-heading font-bold text-white text-xl tracking-wide">Manzil AI</span>
            </Link>
            <p className="text-sm mt-3 leading-relaxed" style={{ color: "#6B7080" }}>Study. Save. Get placed.</p>
            <div className="flex gap-3 mt-4">
              {[Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="transition-colors" style={{ color: "#6B7080" }}><Icon className="w-5 h-5 hover:text-white" /></a>
              ))}
            </div>
          </div>
          {/* Col 2 */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] mb-4" style={{ color: "#9CA3AF" }}>Product</p>
            <ul className="space-y-3">
              {productLinks.map(l => <li key={l}><a href="#" className="text-sm transition-colors hover:text-white" style={{ color: "#6B7080" }}>{l}</a></li>)}
            </ul>
          </div>
          {/* Col 3 */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] mb-4" style={{ color: "#9CA3AF" }}>Company</p>
            <ul className="space-y-3">
              {companyLinks.map(l => <li key={l}><a href="#" className="text-sm transition-colors hover:text-white" style={{ color: "#6B7080" }}>{l}</a></li>)}
            </ul>
          </div>
          {/* Col 4 */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] mb-4" style={{ color: "#9CA3AF" }}>For Colleges</p>
            <ul className="space-y-3">
              {collegeLinks.map(l => <li key={l}><a href="#" className="text-sm transition-colors hover:text-white" style={{ color: "#6B7080" }}>{l}</a></li>)}
            </ul>
          </div>
        </div>
        {/* Bottom bar */}
        <div className="mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <span className="text-xs" style={{ color: "#3D4260" }}>© 2025 Manzil AI. All rights reserved.</span>
          <div className="flex gap-6 text-xs" style={{ color: "#3D4260" }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(l => <a key={l} href="#" className="hover:text-white/40 transition-colors">{l}</a>)}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── ROOT PAGE ────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: C.bg, color: C.textPrimary }}>
      <Navbar />
      <main className="pt-[68px]">
        <Hero />
        <Problem />
        <HowItWorks />
        <ScoreSection />
        <FeaturesGrid />
        <IndiaFirst />

        <Pricing />
        <ComparisonTable />
        <FAQ />
        <About />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
