import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail, ExternalLink, Code2, ChevronDown, FileText, Menu, X } from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const SKILLS = [
  { name: "C / C++", tag: "C", color: "#00599C" },
  { name: "HTML5 & CSS3", tag: "H5", color: "#E34F26" },
  { name: "JavaScript", tag: "JS", color: "#F7DF1E" },
  { name: "TypeScript", tag: "TS", color: "#3178c6" },
  { name: "Python", tag: "PY", color: "#3b82f6" },
  { name: "React", tag: "⚛", color: "#38bdf8" },
  { name: "React Router", tag: "RR", color: "#CA4245" },
  { name: "Node.js", tag: "N", color: "#22c55e" },
  { name: "Express.js", tag: "EX", color: "#404d59" },
  { name: "MongoDB", tag: "MDB", color: "#47A248" },
  { name: "PostgreSQL", tag: "PG", color: "#336791" },
  { name: "TailwindCSS", tag: "TW", color: "#38bdf8" },
  { name: "Bootstrap", tag: "BS", color: "#8511FA" },
  { name: "Vite", tag: "⚡", color: "#646CFF" },
  { name: "Vercel", tag: "▲", color: "#ffffff" },
  { name: "JWT", tag: "JWT", color: "#ffffff" },
  { name: "jQuery", tag: "jQ", color: "#0769AD" },
  { name: "Nodemon", tag: "NM", color: "#76d04b" },
  { name: "GitHub Actions", tag: "GA", color: "#2088FF" },
  { name: "Supabase", tag: "SB", color: "#3ECF8E" },
  { name: "Railway", tag: "RW", color: "#ffffff" },
];

type Project = {
  title: string;
  description: string;
  tech: string[];
  border: string;
  glow: string;
  github?: string;
  live?: string;
};

const PROJECTS: Project[] = [
  {
    title: "HostelSpot",
    description:
      "A full-stack student hostel booking platform featuring real-time updates, dual dashboards for students and owners, and comprehensive admin management.",
    tech: ["React", "TypeScript", "Supabase", "Tailwind CSS"],
    github: "https://github.com/ProgrammingWithRafay/HostelSpot",
    live: "https://hostel-spot.vercel.app/",
    border: "#38bdf8",
    glow: "rgba(56,189,248,0.12)",
  },
  {
    title: "Interactive 3D Portfolio",
    description:
      "Modern, visually rich 3D portfolio built with React and SVG animations. Features custom shaders, dynamic mouse tracking, and parallax effects.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    github: "https://github.com/ProgrammingWithRafay/Portfolio",
    border: "#818cf8",
    glow: "rgba(129,140,248,0.12)",
  },
  {
    title: "PakTravel AI System",
    description: "An AI-powered intercity bus travel system implementing classical search, propositional logic, CSP scheduling, neural networks, and K-Means clustering.",
    tech: ["Python", "scikit-learn", "Pandas", "NumPy"],
    github: "https://github.com/ProgrammingWithRafay/PakTravel-AI-System",
    border: "#10b981",
    glow: "rgba(16,185,129,0.12)",
  },
  {
    title: "CarInsight Pro",
    description: "A comprehensive MERN-stack car research platform featuring side-by-side spec comparisons, interactive matchmaking quizzes, and a custom built-in CMS.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    github: "https://github.com/ProgrammingWithRafay/CarInsightPro",
    live: "https://car-insight-pro-ten.vercel.app/",
    border: "#f59e0b",
    glow: "rgba(245,158,11,0.12)",
  },
  {
    title: "FestivAI",
    description: "An intelligent event management platform featuring RSVP-driven booking, dynamic QR check-ins, AI-generated e-cards, and comprehensive venue management.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/alif223571/Final-Year-Project-One",
    border: "#ec4899",
    glow: "rgba(236,72,153,0.12)",
  },
  {
    title: "MiniC Compiler",
    description: "A 7-phase C compiler built using Flex and Bison. Takes a subset of C code through lexical/syntax/semantic analysis, TAC generation, optimization, and x86 pseudo-assembly output.",
    tech: ["C", "Flex", "Bison", "Make"],
    github: "https://github.com/ProgrammingWithRafay/Mini-C-Language-Compiler",
    border: "#8b5cf6",
    glow: "rgba(139,92,246,0.12)",
  },
];

const NAV_LINKS = ["About", "Skills", "Projects", "Contact"];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function calcPupil(
  eyeSvgX: number,
  eyeSvgY: number,
  mouse: { x: number; y: number },
  rect: DOMRect | null,
  svgW: number,
  svgH: number,
  maxOffset: number
) {
  if (!rect || (mouse.x === 0 && mouse.y === 0)) return { x: 0, y: 0 };
  const scaleX = rect.width / svgW;
  const scaleY = rect.height / svgH;
  const ex = rect.left + eyeSvgX * scaleX;
  const ey = rect.top + eyeSvgY * scaleY;
  const dx = mouse.x - ex;
  const dy = mouse.y - ey;
  const angle = Math.atan2(dy, dx);
  const dist = Math.min(Math.sqrt(dx * dx + dy * dy) / 18, maxOffset);
  return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist };
}

// ─── Boy SVG Character ────────────────────────────────────────────────────────

function BoyCharacter({
  lp,
  rp,
}: {
  lp: { x: number; y: number };
  rp: { x: number; y: number };
}) {
  const LE = { x: 121, y: 163 };
  const RE = { x: 183, y: 163 };

  return (
    <svg
      viewBox="0 0 300 430"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Ambient glow */}
        <radialGradient id="bgGlow" cx="50%" cy="55%" r="50%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.18" />
          <stop offset="60%" stopColor="#818cf8" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#060b17" stopOpacity="0" />
        </radialGradient>
        {/* Skin gradient */}
        <radialGradient id="skinGrad" cx="45%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#fde9d5" />
          <stop offset="100%" stopColor="#f0b88c" />
        </radialGradient>
        {/* Ear shade */}
        <radialGradient id="earGrad" cx="60%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#f5c9a0" />
          <stop offset="100%" stopColor="#e8a87a" />
        </radialGradient>
        {/* Neck shade */}
        <linearGradient id="neckGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#e8a87a" />
          <stop offset="40%" stopColor="#fde9d5" />
          <stop offset="100%" stopColor="#e8a87a" />
        </linearGradient>
        {/* Shirt gradient */}
        <linearGradient id="shirtGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f2744" />
          <stop offset="100%" stopColor="#081729" />
        </linearGradient>
        {/* Shirt highlight */}
        <linearGradient id="shirtHi" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0a1e38" stopOpacity="0" />
          <stop offset="45%" stopColor="#1a3a6a" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0a1e38" stopOpacity="0" />
        </linearGradient>
        {/* Iris gradient */}
        <radialGradient id="irisL" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="55%" stopColor="#1d6fa4" />
          <stop offset="100%" stopColor="#0c4a7a" />
        </radialGradient>
        <radialGradient id="irisR" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="55%" stopColor="#1d6fa4" />
          <stop offset="100%" stopColor="#0c4a7a" />
        </radialGradient>
        {/* Hair gradient */}
        <linearGradient id="hairGrad" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#3d2009" />
          <stop offset="100%" stopColor="#1a0c04" />
        </linearGradient>
        {/* Drop shadow */}
        <filter id="shadow" x="-30%" y="-10%" width="160%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#38bdf8" floodOpacity="0.2" />
        </filter>
        {/* Soft inner shadow for eyes */}
        <filter id="eyeShadow">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.3" />
        </filter>
        {/* Laptop glow */}
        <radialGradient id="screenGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0369a1" stopOpacity="0.6" />
        </radialGradient>
      </defs>

      {/* Background ambient glow */}
      <ellipse cx="150" cy="280" rx="190" ry="170" fill="url(#bgGlow)" />

      {/* ── Body / shirt ── */}
      <g filter="url(#shadow)">
        {/* Main torso */}
        <path
          d="M 55 430 L 58 310 Q 62 285 95 270 L 126 258 C 138 266 150 268 150 268 C 150 268 162 266 174 258 L 205 270 Q 238 285 242 310 L 245 430 Z"
          fill="url(#shirtGrad)"
        />
        {/* Shirt sheen */}
        <path
          d="M 55 430 L 58 310 Q 62 285 95 270 L 126 258 C 138 266 150 268 150 268 C 150 268 162 266 174 258 L 205 270 Q 238 285 242 310 L 245 430 Z"
          fill="url(#shirtHi)"
        />
        {/* Collar V */}
        <path
          d="M 126 258 L 150 290 L 174 258"
          fill="none"
          stroke="#1e4a80"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Code tag on shirt */}
        <text
          x="150"
          y="370"
          textAnchor="middle"
          fill="#38bdf8"
          fontSize="22"
          fontFamily="'JetBrains Mono', monospace"
          fontWeight="600"
          opacity="0.55"
        >
          {"</>"}
        </text>
        {/* Shirt collar stitching */}
        <path
          d="M 110 268 Q 126 276 150 292 Q 174 276 190 268"
          fill="none"
          stroke="#0f3060"
          strokeWidth="1"
          strokeDasharray="3 3"
          opacity="0.6"
        />
      </g>

      {/* ── Neck ── */}
      <rect x="135" y="248" width="30" height="22" rx="5" fill="url(#neckGrad)" />

      {/* ── Head ── */}
      <g filter="url(#shadow)">
        <ellipse cx="150" cy="174" rx="79" ry="84" fill="url(#skinGrad)" />

        {/* Cheek blush */}
        <ellipse cx="98" cy="198" rx="14" ry="9" fill="#f4a0a0" opacity="0.22" />
        <ellipse cx="202" cy="198" rx="14" ry="9" fill="#f4a0a0" opacity="0.22" />
      </g>

      {/* ── Ears ── */}
      <ellipse cx="75" cy="180" rx="11" ry="15" fill="url(#earGrad)" />
      <path
        d="M 77 172 Q 80 180 77 188"
        fill="none"
        stroke="#d4905a"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <ellipse cx="225" cy="180" rx="11" ry="15" fill="url(#earGrad)" />
      <path
        d="M 223 172 Q 220 180 223 188"
        fill="none"
        stroke="#d4905a"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* ── Hair ── */}
      {/* Back layer - full coverage over top and sides of head */}
      <path
        d="M 76 178 Q 70 150 72 115 Q 76 82 98 62 Q 122 44 150 42 Q 178 44 202 62 Q 224 82 228 115 Q 230 150 224 178 L 220 170 Q 224 145 222 118 Q 218 90 200 74 Q 180 58 150 56 Q 120 58 100 74 Q 82 90 78 118 Q 76 145 80 170 Z"
        fill="url(#hairGrad)"
      />
      {/* Side volume left - extends down to ear level */}
      <path
        d="M 76 178 Q 72 160 72 140 Q 72 120 76 105 Q 80 92 86 84 Q 82 100 80 120 Q 78 145 80 170 Z"
        fill="#1a0c04"
      />
      {/* Side volume right */}
      <path
        d="M 224 178 Q 228 160 228 140 Q 228 120 224 105 Q 220 92 214 84 Q 218 100 220 120 Q 222 145 220 170 Z"
        fill="#1a0c04"
      />
      {/* Top hair - full stylish volume */}
      <path
        d="M 80 140 Q 88 95 120 70 Q 138 58 150 56 Q 162 58 180 70 Q 212 95 220 140 Q 205 105 180 88 Q 164 78 150 76 Q 136 78 120 88 Q 95 105 80 140 Z"
        fill="#241108"
      />
      {/* Styled quiff / front tuft */}
      <path
        d="M 108 82 Q 128 62 150 58 Q 172 62 192 82 Q 175 68 150 64 Q 125 68 108 82 Z"
        fill="#3d2009"
      />
      {/* Hair wave highlight */}
      <path
        d="M 100 98 Q 125 78 160 78"
        fill="none"
        stroke="#5a3015"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* ── Eyebrows ── */}
      <path
        d="M 100 138 Q 113 130 136 133"
        fill="none"
        stroke="#2c1810"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M 164 133 Q 187 130 200 138"
        fill="none"
        stroke="#2c1810"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* ── Left Eye ── */}
      <g filter="url(#eyeShadow)">
        {/* Eye white */}
        <ellipse cx={LE.x} cy={LE.y} rx="15.5" ry="13" fill="white" />
        {/* Iris */}
        <clipPath id="clipL">
          <ellipse cx={LE.x} cy={LE.y} rx="15.5" ry="13" />
        </clipPath>
        <circle cx={LE.x} cy={LE.y} r="10" fill="url(#irisL)" clipPath="url(#clipL)" />
        {/* Pupil */}
        <circle
          cx={LE.x + lp.x}
          cy={LE.y + lp.y}
          r="5.5"
          fill="#07090f"
          clipPath="url(#clipL)"
        />
        {/* Shine */}
        <circle
          cx={LE.x + lp.x - 2}
          cy={LE.y + lp.y - 3}
          r="2"
          fill="white"
          opacity="0.85"
          clipPath="url(#clipL)"
        />
        <circle
          cx={LE.x + lp.x + 2}
          cy={LE.y + lp.y + 2}
          r="1"
          fill="white"
          opacity="0.4"
          clipPath="url(#clipL)"
        />
        {/* Eye outline */}
        <ellipse
          cx={LE.x}
          cy={LE.y}
          rx="15.5"
          ry="13"
          fill="none"
          stroke="#8b6050"
          strokeWidth="0.8"
        />
        {/* Upper lash line */}
        <path
          d={`M ${LE.x - 15.5} ${LE.y} Q ${LE.x} ${LE.y - 16} ${LE.x + 15.5} ${LE.y}`}
          fill="none"
          stroke="#1a0f0a"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </g>

      {/* ── Right Eye ── */}
      <g filter="url(#eyeShadow)">
        <ellipse cx={RE.x} cy={RE.y} rx="15.5" ry="13" fill="white" />
        <clipPath id="clipR">
          <ellipse cx={RE.x} cy={RE.y} rx="15.5" ry="13" />
        </clipPath>
        <circle cx={RE.x} cy={RE.y} r="10" fill="url(#irisR)" clipPath="url(#clipR)" />
        <circle
          cx={RE.x + rp.x}
          cy={RE.y + rp.y}
          r="5.5"
          fill="#07090f"
          clipPath="url(#clipR)"
        />
        <circle
          cx={RE.x + rp.x - 2}
          cy={RE.y + rp.y - 3}
          r="2"
          fill="white"
          opacity="0.85"
          clipPath="url(#clipR)"
        />
        <circle
          cx={RE.x + rp.x + 2}
          cy={RE.y + rp.y + 2}
          r="1"
          fill="white"
          opacity="0.4"
          clipPath="url(#clipR)"
        />
        <ellipse
          cx={RE.x}
          cy={RE.y}
          rx="15.5"
          ry="13"
          fill="none"
          stroke="#8b6050"
          strokeWidth="0.8"
        />
        <path
          d={`M ${RE.x - 15.5} ${RE.y} Q ${RE.x} ${RE.y - 16} ${RE.x + 15.5} ${RE.y}`}
          fill="none"
          stroke="#1a0f0a"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </g>

      {/* ── Nose ── */}
      <path
        d="M 148 182 Q 143 200 145 208 Q 150 214 155 208 Q 157 200 152 182"
        fill="none"
        stroke="#d49070"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <ellipse cx="145" cy="208" rx="5" ry="3.5" fill="#e09070" opacity="0.5" />
      <ellipse cx="155" cy="208" rx="5" ry="3.5" fill="#e09070" opacity="0.5" />

      {/* ── Mouth ── */}
      <path
        d="M 128 224 Q 150 242 172 224"
        fill="none"
        stroke="#c47050"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Teeth hint */}
      <path
        d="M 133 224 Q 150 234 167 224 Q 150 238 133 224 Z"
        fill="white"
        opacity="0.6"
      />

      {/* ── Floating code snippets ── */}
      <text
        x="22"
        y="195"
        fill="#38bdf8"
        fontSize="9"
        fontFamily="'JetBrains Mono', monospace"
        opacity="0.3"
        transform="rotate(-15, 22, 195)"
      >
        {"def solve():"}
      </text>
      <text
        x="248"
        y="165"
        fill="#818cf8"
        fontSize="8"
        fontFamily="'JetBrains Mono', monospace"
        opacity="0.3"
        transform="rotate(12, 248, 165)"
      >
        {"01001"}
      </text>
      <text
        x="30"
        y="330"
        fill="#10b981"
        fontSize="8"
        fontFamily="'JetBrains Mono', monospace"
        opacity="0.25"
      >
        {"npm run build"}
      </text>
    </svg>
  );
}

// ─── Scroll Reveal Wrapper ──────────────────────────────────────────────────

function RevealOnScroll({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "-50px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── Custom Cursor ──────────────────────────────────────────────────────────

function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-[9999] rounded-full border border-primary/50 transition-all duration-75 ease-out backdrop-blur-sm hidden md:block"
      style={{
        left: pos.x,
        top: pos.y,
        width: "32px",
        height: "32px",
        transform: "translate(-50%, -50%)",
        backgroundColor: "rgba(56,189,248,0.05)",
      }}
    />
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────

export default function App() {
  const [loadingStage, setLoadingStage] = useState<"loading" | "opening" | "done">("loading");

  // Loading Screen Effect
  useEffect(() => {
    // Lock body scroll
    document.body.style.overflow = "hidden";

    // Hold loading screen for 2.5 seconds, then open curtains
    const openTimer = setTimeout(() => {
      setLoadingStage("opening");
    }, 2500);

    // After 1.5s of opening animation, remove from DOM and unlock scroll
    const doneTimer = setTimeout(() => {
      setLoadingStage("done");
      document.body.style.overflow = "auto";
    }, 4000);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = "auto";
    };
  }, []);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const svgWrapRef = useRef<HTMLDivElement>(null);
  const [svgRect, setSvgRect] = useState<DOMRect | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const update = () => {
      if (svgWrapRef.current) setSvgRect(svgWrapRef.current.getBoundingClientRect());
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // 3D card tilt from mouse position
  useEffect(() => {
    if (!svgRect) return;
    const cx = svgRect.left + svgRect.width / 2;
    const cy = svgRect.top + svgRect.height / 2;
    const ry = ((mouse.x - cx) / (svgRect.width / 2)) * 14;
    const rx = ((mouse.y - cy) / (svgRect.height / 2)) * -10;
    setTilt({ rx, ry });
  }, [mouse, svgRect]);

  const SVG_W = 300, SVG_H = 430;
  const L_EYE = { x: 121, y: 163 };
  const R_EYE = { x: 183, y: 163 };
  const lp = calcPupil(L_EYE.x, L_EYE.y, mouse, svgRect, SVG_W, SVG_H, 4.5);
  const rp = calcPupil(R_EYE.x, R_EYE.y, mouse, svgRect, SVG_W, SVG_H, 4.5);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground font-sans"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Cinematic Loading Screen ── */}
      {loadingStage !== "done" && (
        <div className="fixed inset-0 z-[100] flex flex-col pointer-events-none">
          {/* Top Curtain */}
          <div
            className={`w-full h-1/2 bg-[#090e17] transition-transform duration-[1500ms] ease-[cubic-bezier(0.76,0,0.24,1)] border-b border-primary/20 flex justify-center items-end pb-4 ${loadingStage === "opening" ? "-translate-y-full" : "translate-y-0"
              }`}
            style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}
          />
          {/* Bottom Curtain */}
          <div
            className={`w-full h-1/2 bg-[#090e17] transition-transform duration-[1500ms] ease-[cubic-bezier(0.76,0,0.24,1)] border-t border-primary/20 flex justify-center items-start pt-4 ${loadingStage === "opening" ? "translate-y-full" : "translate-y-0"
              }`}
            style={{ boxShadow: "0 -10px 30px rgba(0,0,0,0.5)" }}
          />

          {/* Glowing RAFAY. Text Centered overlay */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${loadingStage === "opening" ? "opacity-0" : "opacity-100"
              }`}
          >
            <div
              className="text-4xl md:text-5xl font-bold tracking-widest text-primary animate-pulse"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                textShadow: "0 0 20px rgba(56,189,248,0.5), 0 0 40px rgba(56,189,248,0.3)"
              }}
            >
              RAFAY<span className="text-accent">.</span>
            </div>
          </div>
        </div>
      )}

      <CustomCursor />
      {/* ── Navbar ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled || isMobileMenuOpen
            ? "rgba(6, 11, 23, 0.88)"
            : "transparent",
          backdropFilter: scrolled || isMobileMenuOpen ? "blur(16px)" : "none",
          borderBottom: scrolled || isMobileMenuOpen ? "1px solid rgba(56,189,248,0.12)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span
            className="text-primary font-bold text-lg tracking-widest z-50"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            RAFAY<span className="text-accent">.</span>
          </span>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase())}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 tracking-wide"
              >
                {link}
              </button>
            ))}
          </div>
          <a
            href="/Rafay_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 text-sm border border-primary/40 text-primary px-4 py-2 rounded-full hover:bg-primary/10 transition-all duration-200"
          >
            <FileText size={14} /> Resume
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            className="md:hidden text-primary p-2 z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-80 border-b border-primary/20 opacity-100" : "max-h-0 opacity-0"
            }`}
          style={{ background: "rgba(6, 11, 23, 0.95)", backdropFilter: "blur(16px)" }}
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  scrollTo(link.toLowerCase());
                }}
                className="text-left text-sm text-muted-foreground hover:text-primary transition-colors duration-200 tracking-wide py-2"
              >
                {link}
              </button>
            ))}
            <a
              href="/Rafay_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm border border-primary/40 text-primary px-4 py-2 rounded-full hover:bg-primary/10 transition-all duration-200 w-fit mt-2"
            >
              <FileText size={14} /> Resume
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section
        id="hero"
        className="min-h-screen flex items-center relative overflow-hidden pt-20 pb-24 lg:pb-0"
      >
        {/* Grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial spotlight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 65% 50%, rgba(56,189,248,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center">
          {/* Left: text */}
          <div className="space-y-6 order-2 lg:order-1">
            <div
              className="inline-flex items-center gap-2 text-xs text-primary border border-primary/30 px-3 py-1.5 rounded-full"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Available for opportunities
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              <span className="text-foreground">Rafay</span>
            </h1>

            <p
              className="text-base text-muted-foreground leading-relaxed max-w-md"
            >
              FULL STACK DEVELOPER | MACHINE LEARNING ENGINEER
            </p>

            <div
              className="flex items-center gap-3 flex-wrap"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px" }}
            >
              {["MERN", "Python", "PostgreSQL", "Deep Learning"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded text-primary/80"
                  style={{ background: "rgba(56,189,248,0.08)", border: "1px solid rgba(56,189,248,0.2)" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={() => scrollTo("projects")}
                className="px-6 py-3 rounded-full font-medium text-sm text-background transition-all duration-200 hover:scale-105 hover:shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #38bdf8, #818cf8)",
                  boxShadow: "0 0 20px rgba(56,189,248,0.25)",
                }}
              >
                View Projects
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="px-6 py-3 rounded-full font-medium text-sm text-primary border border-primary/40 hover:bg-primary/10 transition-all duration-200"
              >
                Contact Me
              </button>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 pt-1">
              {[
                { icon: <Github size={18} />, href: "https://github.com/ProgrammingWithRafay" },
                { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/syed-muhammad-rafay-ali-b78b5937a/" },
                { icon: <Mail size={18} />, href: "mailto:rafayalishah74@gmail.com" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target={s.href !== "#" ? "_blank" : undefined}
                  rel={s.href !== "#" ? "noopener noreferrer" : undefined}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right: 3D boy character */}
          <div className="flex items-center justify-center order-1 lg:order-2">
            <div
              ref={svgWrapRef}
              className="relative w-64 h-80 sm:w-80 sm:h-96 lg:w-96 lg:h-[440px]"
              style={{
                transform: `perspective(1200px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                transition: "transform 0.08s ease-out",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Glow ring behind character */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(56,189,248,0.15) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />
              {/* Character */}
              <div className="relative w-full h-full">
                <BoyCharacter lp={lp} rp={rp} />
              </div>
              {/* Floating badge: Fun Fact 1 (Top Right) */}
              <div
                className="absolute top-4 -right-2 sm:right-2 px-3 py-1.5 rounded-xl text-xs font-medium"
                style={{
                  background: "rgba(13,22,40,0.9)",
                  border: "1px solid rgba(56,189,248,0.3)",
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "#38bdf8",
                  backdropFilter: "blur(8px)",
                  transform: "translateZ(20px)",
                }}
              >
                Audiophile
              </div>
              {/* Floating badge: Fun Fact 2 (Bottom Left) */}
              <div
                className="absolute bottom-16 -left-2 sm:left-2 px-3 py-1.5 rounded-xl text-xs font-medium"
                style={{
                  background: "rgba(13,22,40,0.9)",
                  border: "1px solid rgba(129,140,248,0.3)",
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "#818cf8",
                  backdropFilter: "blur(8px)",
                  transform: "translateZ(20px)",
                }}
              >
                Avid Gamer
              </div>
              {/* Floating badge: Fun Fact 3 (Bottom Right) */}
              <div
                className="absolute bottom-8 -right-4 sm:right-0 px-3 py-1.5 rounded-xl text-xs font-medium"
                style={{
                  background: "rgba(13,22,40,0.9)",
                  border: "1px solid rgba(16,185,129,0.3)",
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "#10b981",
                  backdropFilter: "blur(8px)",
                  transform: "translateZ(30px)",
                }}
              >
                Cinephile
              </div>
              {/* Floating badge: Fun Fact 4 (Top Left) - Geography */}
              <div
                className="absolute top-16 -left-4 sm:-left-6 px-3 py-1.5 rounded-xl text-xs font-medium"
                style={{
                  background: "rgba(13,22,40,0.9)",
                  border: "1px solid rgba(245,158,11,0.3)",
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "#f59e0b",
                  backdropFilter: "blur(8px)",
                  transform: "translateZ(15px)",
                }}
              >
                Geography Nerd
              </div>
              {/* Floating badge: Fun Fact 5 (Middle Right) - Gen Knowledge */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -right-8 sm:-right-6 px-3 py-1.5 rounded-xl text-xs font-medium"
                style={{
                  background: "rgba(13,22,40,0.9)",
                  border: "1px solid rgba(168,85,247,0.3)",
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "#a855f7",
                  backdropFilter: "blur(8px)",
                  transform: "translateZ(25px)",
                }}
              >
                Trivia Master
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/50 hidden md:flex flex-col items-center gap-1">
          <span className="text-xs tracking-widest">SCROLL</span>
          <ChevronDown size={16} className="animate-bounce" />
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-28 relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 20% 50%, rgba(129,140,248,0.05) 0%, transparent 70%)",
          }}
        />
        <RevealOnScroll>
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "FAST", label: "University", suffix: "" },
                { num: "6", label: "Projects", suffix: "" },
                { num: "5", label: "Languages", suffix: "+" },
                { num: "2026", label: "Graduate", suffix: "" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="p-6 rounded-2xl"
                  style={{
                    background: "rgba(13,22,40,0.7)",
                    border: "1px solid rgba(56,189,248,0.1)",
                  }}
                >
                  <div
                    className="text-3xl font-bold text-primary"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    {s.num}
                    <span className="text-lg text-muted-foreground">{s.suffix}</span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Text */}
            <div className="space-y-5">
              <h2
                className="text-3xl font-bold"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                About{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #38bdf8, #818cf8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Me
                </span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                I am pursuing Computer Science at the <strong className="text-foreground">National University of Computer and Emerging Sciences (FAST)</strong>, one of Pakistan&apos;s premier CS institutions. Set to graduate in 2026, I am a passionate <strong className="text-foreground">Full Stack Developer</strong> and a <strong className="text-foreground">Machine Learning Engineer</strong>.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I love turning complex problems into clean software, whether
                that&apos;s building scalable MERN stack applications, designing robust PostgreSQL databases, or exploring the fascinating world of Deep Learning and Python. I&apos;m always eager to learn and tackle the next big challenge!
              </p>
              <div
                className="flex items-center gap-3 text-sm text-primary"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                <Code2 size={16} />
                <span>~/rafay $ echo "let&apos;s build something great"</span>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="py-28 relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(56,189,248,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.025) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <RevealOnScroll>
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-14 text-center space-y-3">
              <p
                className="text-xs text-primary tracking-widest"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                — TECHNICAL SKILLS —
              </p>
              <h2
                className="text-3xl font-bold"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                My Stack
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {SKILLS.map((skill) => (
                <div
                  key={skill.name}
                  className="group p-4 rounded-xl flex flex-col items-center gap-3 cursor-default transition-all duration-200 hover:scale-105"
                  style={{
                    background: "rgba(13,22,40,0.6)",
                    border: `1px solid rgba(255,255,255,0.06)`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.border = `1px solid ${skill.color}55`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 16px ${skill.color}22`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold"
                    style={{
                      background: `${skill.color}18`,
                      color: skill.color,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {skill.tag}
                  </div>
                  <span className="text-xs text-center text-muted-foreground group-hover:text-foreground transition-colors duration-200 leading-tight">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="py-28">
        <div className="max-w-6xl mx-auto px-6">
          <RevealOnScroll>
            <div className="mb-14 text-center space-y-3">
              <p
                className="text-xs text-primary tracking-widest"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                — PROJECTS —
              </p>
              <h2
                className="text-3xl font-bold"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                What I&apos;ve Built
              </h2>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROJECTS.map((proj, i) => (
              <RevealOnScroll key={proj.title} delay={i * 150} className="h-full">
                <div
                  className="group relative p-6 rounded-2xl flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 h-full"
                  style={{
                    background: `rgba(13,22,40,0.8)`,
                    border: `1px solid ${proj.border}30`,
                    boxShadow: `0 0 0 0 ${proj.border}00`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px ${proj.border}25, 0 0 0 1px ${proj.border}40`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  }}
                >
                  {/* Index */}
                  <div
                    className="text-xs font-bold"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      color: proj.border,
                      opacity: 0.5,
                    }}
                  >
                    0{i + 1}
                  </div>

                  <h3
                    className="text-xl font-bold text-foreground"
                    style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "18px" }}
                  >
                    {proj.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {proj.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          background: `${proj.border}12`,
                          color: proj.border,
                          border: `1px solid ${proj.border}30`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-1">
                    {proj.github && (
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        <Github size={13} /> Code
                      </a>
                    )}
                    {proj.live && (
                      <a
                        href={proj.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        <ExternalLink size={13} /> Live
                      </a>
                    )}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-28 relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(56,189,248,0.07) 0%, transparent 70%)",
          }}
        />
        <RevealOnScroll>
          <div className="max-w-2xl mx-auto px-6 text-center space-y-8">
            <div className="space-y-3">
              <p
                className="text-xs text-primary tracking-widest"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                — CONTACT —
              </p>
              <h2
                className="text-3xl font-bold"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                Let&apos;s Connect
              </h2>
              <p className="text-muted-foreground">
                Open to full-time roles, internships, and interesting collaborations.
                Drop me a line, I'll try to reply to everything.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <a
                href="mailto:rafayalishah74@gmail.com"
                className="inline-flex items-center gap-3 text-lg font-medium text-primary hover:text-foreground transition-colors duration-200"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                <Mail size={20} />
                Contact Me
              </a>
              <span
                className="text-sm text-muted-foreground/80 select-all"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                rafayalishah74@gmail.com
              </span>
            </div>

            <div className="flex items-center justify-center gap-6 pt-4">
              {[
                { icon: <Github size={20} />, label: "GitHub", href: "https://github.com/ProgrammingWithRafay" },
                { icon: <Linkedin size={20} />, label: "LinkedIn", href: "https://www.linkedin.com/in/syed-muhammad-rafay-ali-b78b5937a/" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href !== "#" ? "_blank" : undefined}
                  rel={s.href !== "#" ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary border border-border hover:border-primary/40 px-5 py-2.5 rounded-full transition-all duration-200"
                >
                  {s.icon} {s.label}
                </a>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* ── Footer ── */}
      <footer
        className="border-t py-8"
        style={{ borderColor: "rgba(56,189,248,0.1)" }}
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span
            className="text-primary font-bold tracking-widest text-sm"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            RAFAY<span className="text-accent">.</span>
          </span>
          <span
            className="text-xs text-muted-foreground"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Engineered with precision. Built for the future. | Rafay © {new Date().getFullYear()}
          </span>
        </div>
      </footer>

      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(56,189,248,0.3); border-radius: 2px; }
      `}</style>
    </div>
  );
}
