import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SITE_CONFIG } from "@/lib/site-config";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

const NAV_LINKS = [
  { href: "#what", label: "What It Does" },
  { href: "#problems", label: "Problems Solved" },
  { href: "#about", label: "About Dre" },
  { href: "#pricing", label: "Pricing" },
];

const DRE_IMAGES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15].map(
  (n) => `/assets/dre/image-${n}.jpg`,
);

const PROBLEMS = [
  {
    n: "01",
    icon: "❌",
    color: "from-[#FF5A1F] to-[#FF8A3D]",
    title: "“I have a good score but still get denied”",
    img: "/assets/problems/p1.png",
    body: "Most people don’t understand why they’re getting denied.",
    intro: "The Score Machine breaks down real denial reasons & shows risk factors like:",
    tags: ["Utilization", "Account structure", "Profile depth"],
    outcome: "It removes guesswork completely",
  },
  {
    n: "02",
    icon: "🧠",
    color: "from-[#7C3AED] to-[#00D9FF]",
    title: "Lack of Understanding",
    img: "/assets/problems/p2.jpg",
    body: "Credit reports confuse people. They don't know what they're looking at.",
    intro: "The Score Machine turns a report into a clear analysis, highlighting:",
    bullets: ["Good vs bad accounts", "What’s helping vs hurting", "Gives a step-by-step roadmap"],
    outcome: "It educates while it fixes",
  },
  {
    n: "03",
    icon: "🏦",
    color: "from-[#00D9FF] to-[#7C3AED]",
    title: "Not Positioned for Funding",
    img: "/assets/problems/p3.png",
    body: "You can have decent credit… but still not be “fundable.”",
    intro: "The Score Machine aligns your profile with lender expectations:",
    bullets: ["If you qualify for funding", "What tier you’re in", "What needs to change before applying"],
    outcome: "The difference between approval vs instant denial",
  },
  {
    n: "04",
    icon: "🔍",
    color: "from-[#7C3AED] to-[#FF5A1F]",
    title: "No Direction on What to Do Next",
    img: "/assets/problems/p4.png",
    body: "Most tools tell you what’s wrong… but not what to do next.",
    intro: "The Score Machine gives a clear action plan & prioritizes:",
    bullets: ["What to fix first", "What to leave alone", "When to apply"],
    outcome: "It acts like a GPS for credit & funding",
  },
  {
    n: "05",
    icon: "💸",
    color: "from-[#FF5A1F] to-[#7C3AED]",
    title: "Wasting Time, Money & Apps",
    img: "/assets/problems/p5.png",
    body: "People apply too early, to the wrong lenders, and stack inquiries.",
    intro: "The Score Machine prevents this by:",
    bullets: [
      "Matching users to the right funding opportunities",
      "Preventing unnecessary inquiries",
      "Helping you apply only when ready",
    ],
    outcome: "Protects your profile and maximizes approvals",
  },
];

const PLAN_FEATURES = [
  "5 Users",
  "5 Clients",
  "Full Score Machine Elite Access",
  "Institutional-Style Credit Analysis",
  "Advanced Underwriting Evaluation",
  "Multi-Bureau Credit Breakdown",
  "Identification of Limiting Factors",
  "Credit Profile Dashboard",
  "Priority Support",
  "All Future Features Included",
];

declare global {
  interface Window { QRCode?: any }
}

function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const year = new Date().getFullYear();

  // Wire checkout buttons + generate QR + reveal animations
  useEffect(() => {
    // Assign checkout URLs to every [data-checkout] element
    document.querySelectorAll<HTMLAnchorElement>("a[data-checkout]").forEach((el) => {
      const type = el.getAttribute("data-checkout");
      el.href = type === "yearly" ? SITE_CONFIG.yearlyCheckoutUrl : SITE_CONFIG.monthlyCheckoutUrl;
    });

    // Generate QR code dynamically
    const renderQR = () => {
      const container = document.getElementById("qr-canvas-wrap");
      if (!container || !window.QRCode) return;
      container.innerHTML = "";
      const canvas = document.createElement("canvas");
      container.appendChild(canvas);
      window.QRCode.toCanvas(
        canvas,
        SITE_CONFIG.qrCodeUrl,
        { width: 320, margin: 2, color: { dark: "#050509", light: "#ffffff" } },
        (err: unknown) => {
          if (err) {
            container.innerHTML = `<img src="/assets/qr-fallback.png" alt="QR code" class="w-[320px] h-[320px]" />`;
          }
        },
      );
    };
    if (window.QRCode) renderQR();
    else {
      const t = setInterval(() => {
        if (window.QRCode) { clearInterval(t); renderQR(); }
      }, 200);
      setTimeout(() => clearInterval(t), 8000);
    }

    // Reveal on scroll
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ============ ANNOUNCEMENT BAR ============ */}
      <div className="fixed top-0 inset-x-0 z-[70] bg-[linear-gradient(90deg,#FF5A1F,#FF8A3D,#FF5A1F)] text-[#0a0a0a] text-center py-2 px-4 text-xs md:text-sm font-bold">
        <span className="mr-2">🔥</span>
        Dre the Dimer clients get exclusive Score Machine Elite access —
        <span className="mx-2 font-black">{SITE_CONFIG.monthlyPrice}/mo</span>
        or
        <span className="mx-2 font-black">{SITE_CONFIG.yearlyPrice}/yr</span>
        <a href="#pricing" className="ml-3 underline underline-offset-2 hover:no-underline">See plans →</a>
      </div>

      {/* ============ NAVIGATION ============ */}
      <nav className="fixed top-8 md:top-10 inset-x-0 z-[60] backdrop-blur-lg bg-background/60 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            <img src="/assets/logo.png" alt="The Score Machine" className="h-9 w-auto" />
            <span className="hidden sm:block font-display font-bold tracking-tight">
              Dre the Dimer <span className="text-muted-foreground">×</span> Score Machine
            </span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">{l.label}</a>
            ))}
            <a href="#pricing" className="btn-ember !py-2.5 !px-5 text-sm">
              Get Started <i className="fas fa-arrow-right" />
            </a>
          </div>
          <button
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="md:hidden text-2xl w-10 h-10 grid place-items-center rounded-lg border border-white/10"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className={`fas ${menuOpen ? "fa-xmark" : "fa-bars"}`} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-white/5 bg-background/95 backdrop-blur-xl px-5 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="text-lg font-semibold">
                {l.label}
              </a>
            ))}
            <a href="#pricing" onClick={() => setMenuOpen(false)} className="btn-ember justify-center">
              Get Started
            </a>
          </div>
        )}
      </nav>

      {/* ============ HERO ============ */}
      <section id="top" className="relative pt-32 md:pt-40 pb-24 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--grad-hero)" }} />
        <div className="max-w-7xl mx-auto px-5 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center relative">
          {/* LEFT */}
          <div className="lg:col-span-7 reveal">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold uppercase tracking-widest text-[#00D9FF]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] glow-pulse" />
              Exclusive Dre the Dimer × Score Machine Partnership
            </div>
            <h1 className="mt-6 font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-tight">
              Unlock Your Ultimate
              <br />
              <span className="text-grad-ember">Institutional</span>
              <br />
              <span className="shine-text">Funding Power.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              AI-powered credit analysis and institutional-readiness solutions.
              <span className="text-foreground font-semibold"> We don’t just check credit. We make you fundable.</span>
            </p>

            {/* Price preview */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="grad-border px-5 py-3 rounded-2xl">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Monthly</div>
                <div className="text-2xl font-display font-bold">{SITE_CONFIG.monthlyPrice}<span className="text-sm text-muted-foreground">/mo</span></div>
              </div>
              <div className="grad-border-ember px-5 py-3 rounded-2xl">
                <div className="text-[10px] uppercase tracking-widest text-[#FF8A3D]">Yearly · Best Value</div>
                <div className="text-2xl font-display font-bold text-grad-ember">{SITE_CONFIG.yearlyPrice}<span className="text-sm text-muted-foreground">/yr</span></div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#pricing" className="btn-ember">
                Claim Your Spot <i className="fas fa-arrow-right" />
              </a>
              <a href="#what" className="btn-ghost">
                See How It Works <i className="fas fa-chevron-down" />
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 max-w-xl">
              {[
                { i: "fa-shield-halved", c: "#00D9FF", t: "Institutional-Grade" },
                { i: "fa-bolt", c: "#FF8A3D", t: "AI-Powered" },
                { i: "fa-lock", c: "#7C3AED", t: "Client-Exclusive" },
              ].map((f) => (
                <div key={f.t} className="glass rounded-xl p-3 text-center">
                  <i className={`fas ${f.i} text-lg`} style={{ color: f.c }} />
                  <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">{f.t}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-5 relative reveal">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden grad-border shadow-[var(--shadow-neon)]">
              <video
                autoPlay muted loop playsInline poster="/assets/dre/image-14.jpg"
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/assets/dre/video.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <img src="/assets/logo.png" alt="" className="absolute top-4 left-4 h-10 opacity-90" />
            </div>

            {/* Floating cards */}
            <div className="hidden md:flex absolute -left-8 top-16 glass rounded-2xl p-4 float items-center gap-3 shadow-[var(--shadow-glass)]">
              <div className="w-10 h-10 rounded-xl grid place-items-center bg-[#7C3AED]/20 text-[#7C3AED]">
                <i className="fas fa-chart-line" />
              </div>
              <div>
                <div className="text-[10px] uppercase text-muted-foreground tracking-widest">Profile Score</div>
                <div className="font-display font-bold">Approvable</div>
              </div>
            </div>
            <div className="hidden md:flex absolute -right-6 bottom-14 glass rounded-2xl p-4 float items-center gap-3 shadow-[var(--shadow-glass)]" style={{ animationDelay: "-3s" }}>
              <div className="w-10 h-10 rounded-xl grid place-items-center bg-[#FF5A1F]/20 text-[#FF5A1F]">
                <i className="fas fa-university" />
              </div>
              <div>
                <div className="text-[10px] uppercase text-muted-foreground tracking-widest">Lender Match</div>
                <div className="font-display font-bold">Tier 1 Ready</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ THREE BENEFITS ============ */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-3 gap-6">
          {[
            { i: "fa-magnifying-glass", c: "#00D9FF", h: "Discover", p: "what lenders actually see" },
            { i: "fa-screwdriver-wrench", c: "#7C3AED", h: "Fix", p: "what’s blocking your approvals" },
            { i: "fa-building-columns", c: "#FF5A1F", h: "Get Matched", p: "with the right institutions & funding opportunities" },
          ].map((s, i) => (
            <div key={s.h} className="reveal glass rounded-2xl p-8 group hover:-translate-y-1 transition-transform" style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="w-14 h-14 rounded-2xl grid place-items-center mb-5"
                style={{ background: `${s.c}20`, color: s.c, boxShadow: `0 0 30px ${s.c}30` }}>
                <i className={`fas ${s.i} text-2xl`} />
              </div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Step {i + 1}</div>
              <h3 className="text-2xl font-display font-bold mt-1">{s.h}</h3>
              <p className="text-muted-foreground mt-2">{s.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ WHAT IS THE SCORE MACHINE ============ */}
      <section id="what" className="py-24 relative border-t border-white/5">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,.25), transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-5 grid lg:grid-cols-2 gap-14 items-start relative">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold uppercase tracking-widest text-[#7C3AED]">
              <i className="fas fa-microchip" /> The Platform
            </div>
            <h2 className="mt-5 text-4xl md:text-6xl font-display font-bold leading-[1.05]">
              What is <span className="text-grad-neon">The Score Machine</span>?
            </h2>
            <div className="mt-8 space-y-6 text-lg">
              <p className="text-2xl font-display font-bold border-l-4 border-[#FF5A1F] pl-5 py-1">
                It is not a credit repair software…
                <span className="block text-grad-ember">It’s an institutional readiness platform.</span>
              </p>
              <p className="text-muted-foreground">
                <span className="text-[#FF8A3D] font-bold">Meaning:</span> It prepares a person’s credit profile
                and financial identity to match what banks, lenders, and institutions are actually looking for —
                <span className="text-foreground font-semibold"> not just a “good score.”</span>
              </p>
              <div className="glass rounded-3xl p-7">
                <p className="text-muted-foreground italic mb-5">
                  Most people think: <span className="text-foreground not-italic font-semibold">“I have a 700 score, I should get approved.”</span>
                  <br />But banks don’t approve based on score alone.
                </p>
                <div className="text-xs font-bold uppercase tracking-widest text-[#00D9FF] mb-3">The Score Machine shows:</div>
                <ul className="grid sm:grid-cols-2 gap-3 text-sm">
                  {[
                    { i: "fa-eye", c: "#00D9FF", t: "What lenders see" },
                    { i: "fa-thumbs-down", c: "#FF5A1F", t: "What they don’t like" },
                    { i: "fa-magnifying-glass-minus", c: "#FF8A3D", t: "What’s missing" },
                    { i: "fa-screwdriver-wrench", c: "#7C3AED", t: "Exactly what to fix" },
                  ].map((it) => (
                    <li key={it.t} className="flex items-center gap-3">
                      <i className={`fas ${it.i}`} style={{ color: it.c }} /> {it.t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl p-6 grad-border-ember">
                <div className="text-xs font-bold uppercase tracking-widest text-[#FF8A3D] mb-2">
                  <i className="fas fa-bolt mr-2" /> Simple way to explain it
                </div>
                <p>If credit repair tools are about: <span className="text-[#FF5A1F] font-bold">“Fixing the past…”</span></p>
                <p className="mt-1">The Score Machine is about:
                  <span className="block text-grad-neon font-display font-bold text-xl mt-1">
                    “Positioning you for approvals and money.”
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="reveal lg:sticky lg:top-32">
            <div className="grad-border rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-grid" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#FF5A1F]" />
                    <span className="w-3 h-3 rounded-full bg-[#FF8A3D]" />
                    <span className="w-3 h-3 rounded-full bg-[#00D9FF]" />
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Profile Preview</div>
                </div>
                <div className="rounded-2xl overflow-hidden border border-white/10">
                  <img src="/assets/problems/p3.png" alt="Score Machine profile dashboard" className="w-full h-auto" loading="lazy" />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    { l: "Utilization", v: "12%", c: "#00D9FF" },
                    { l: "Profile Depth", v: "A+", c: "#7C3AED" },
                    { l: "Fundability", v: "Tier 1", c: "#FF5A1F" },
                  ].map((k) => (
                    <div key={k.l} className="glass rounded-xl p-3 text-center">
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{k.l}</div>
                      <div className="font-display font-bold text-lg" style={{ color: k.c }}>{k.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FIVE PROBLEMS (BENTO) ============ */}
      <section id="problems" className="py-24 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-5">
          <div className="max-w-3xl reveal">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold uppercase tracking-widest text-[#FF5A1F]">
              <i className="fas fa-fire" /> Problems Solved
            </div>
            <h2 className="mt-5 text-4xl md:text-6xl font-display font-bold leading-[1.05]">
              The 5 biggest problems <span className="text-grad-ember">it solves.</span>
            </h2>
          </div>

          <div className="mt-14 grid lg:grid-cols-6 gap-6">
            {PROBLEMS.map((p, idx) => {
              const spans = ["lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2"];
              return (
                <article key={p.n}
                  className={`reveal glass rounded-3xl p-7 flex flex-col group hover:-translate-y-1 transition-transform ${spans[idx]}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className={`inline-block text-xs font-bold uppercase tracking-widest bg-gradient-to-r ${p.color} bg-clip-text text-transparent`}>
                        Problem {p.n}
                      </div>
                      <h3 className="mt-1 text-xl md:text-2xl font-display font-bold leading-tight">
                        <span className="mr-2">{p.icon}</span>{p.title}
                      </h3>
                    </div>
                  </div>
                  <div className="mt-5 rounded-2xl overflow-hidden border border-white/10 bg-background">
                    <img src={p.img} alt={p.title} loading="lazy"
                      className="w-full h-auto object-cover object-top max-h-72" />
                  </div>
                  <p className="mt-5 text-muted-foreground">{p.body}</p>
                  <p className="mt-3 text-sm font-semibold">{p.intro}</p>
                  {p.tags && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span key={t} className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-muted-foreground">{t}</span>
                      ))}
                    </div>
                  )}
                  {p.bullets && (
                    <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                      {p.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <i className="fas fa-check text-[#00D9FF] mt-1" /> {b}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-auto pt-5 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#FF8A3D]">
                    <i className="fas fa-arrow-right" /> {p.outcome}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ PROCESS FLOW ============ */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grad-border rounded-3xl p-6 md:p-8">
            <div className="grid md:grid-cols-4 gap-6 md:gap-4 items-center">
              {[
                { i: "fa-brain", c: "#7C3AED", t: "AI-Powered Credit Analysis" },
                { i: "fa-shield-halved", c: "#00D9FF", t: "Institutional Readiness Strategy" },
                { i: "fa-rocket", c: "#FF8A3D", t: "Maximize Funding Potential" },
                { i: "fa-bullseye", c: "#FF5A1F", t: "Custom Funding Matching" },
              ].map((s, i, arr) => (
                <div key={s.t} className="flex md:block items-center gap-4 relative">
                  <div className="w-14 h-14 rounded-2xl grid place-items-center shrink-0"
                    style={{ background: `${s.c}20`, color: s.c }}>
                    <i className={`fas ${s.i} text-xl`} />
                  </div>
                  <div className="md:mt-4">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Step {i + 1}</div>
                    <div className="font-display font-bold">{s.t}</div>
                  </div>
                  {i < arr.length - 1 && (
                    <i className="fas fa-arrow-right hidden md:block absolute -right-2 top-5 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ EXCLUSIVE OFFER STRIP ============ */}
      <section className="py-24 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30"
          style={{ background: "radial-gradient(ellipse at center, rgba(255,90,31,.35), transparent 65%)" }} />
        <div className="max-w-6xl mx-auto px-5 relative text-center reveal">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full grad-border-ember text-xs font-bold uppercase tracking-widest text-[#FF8A3D]">
            <i className="fas fa-star" /> Exclusive Partnership Offer
          </div>
          <h2 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05]">
            Special access for <br className="hidden md:block" />
            <span className="text-grad-ember">Dre the Dimer clients.</span>
          </h2>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            As the owner of <span className="text-foreground font-semibold">The Score Machine</span>,{" "}
            <span className="text-foreground font-semibold">DeAndre “Dre” Ruffin</span> is granting
            <span className="font-bold text-foreground"> just and only </span>
            Dre the Dimer clients full platform access at
            <span className="text-grad-ember font-bold"> {SITE_CONFIG.monthlyPrice}/month</span>
            {" "}or <span className="text-grad-ember font-bold">{SITE_CONFIG.yearlyPrice}/year</span>.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#pricing" className="btn-ember">
              Claim Your Spot <i className="fas fa-lock-open" />
            </a>
          </div>
        </div>
      </section>

      {/* ============ ABOUT DRE ============ */}
      <section id="about" className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 reveal">
            <div className="relative">
              <div className="absolute -inset-6 rounded-3xl blur-2xl opacity-40"
                style={{ background: "var(--grad-neon)" }} />
              <img
                src="/assets/dre/image-14.jpg"
                alt="DeAndre “Dre” Ruffin"
                className="relative rounded-3xl w-full object-cover aspect-[4/5] border border-white/10"
                loading="lazy"
              />
            </div>
            <div className="mt-6 flex items-center justify-between glass rounded-2xl p-4">
              <div>
                <div className="font-display font-bold text-lg">DeAndre “Dre” Ruffin</div>
                <div className="text-xs uppercase tracking-widest text-[#FF8A3D] font-bold">
                  Co-Founder, The Score Machine
                </div>
              </div>
              <img src="/assets/logo.png" alt="" className="h-10 opacity-90" />
            </div>
          </div>
          <div className="lg:col-span-7 reveal">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold uppercase tracking-widest text-[#00D9FF]">
              About the Founder
            </div>
            <h2 className="mt-5 text-4xl md:text-6xl font-display font-bold leading-[1.05]">
              About <span className="text-grad-ember">DeAndre “Dre” Ruffin</span>
            </h2>
            <blockquote className="mt-8 border-l-4 border-[#FF5A1F] pl-6 text-xl italic text-muted-foreground">
              “In a space filled with noise, shortcuts, and surface-level information… DeAndre Ruffin,
              also known as Dre the Dimer, stands in a different lane.”
            </blockquote>
            <div className="mt-6 space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>Dre isn’t just another name in credit. He is a builder, a strategist, and a real operator who understands how the system actually works.</p>
              <p>Recognized as one of the top students of Smitty the Goat, Dre took high-level knowledge and turned it into real-world execution — helping individuals not just “fix” their credit, but position themselves for real funding and long-term financial leverage.</p>
              <p>His expertise goes beyond surface-level tactics. He understands credit structure, lender behavior, funding psychology, and profile positioning at a level most never reach. That’s what separates him.</p>
            </div>
            <div className="mt-6 glass rounded-2xl p-6">
              <div className="font-display font-bold text-foreground mb-3">Dre has built his name by helping people:</div>
              <ul className="grid sm:grid-cols-2 gap-2 text-muted-foreground">
                {[
                  "Turn broken profiles into fundable assets",
                  "Understand what lenders actually look for",
                  "Move with strategy instead of guesswork",
                  "Unlock opportunities most people never even know exist",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <i className="fas fa-check text-[#00D9FF] mt-1.5" /> {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>Today, Dre is not only a credit and funding expert, but also a Co-Founder of The Score Machine — a platform designed to bring clarity, structure, and institutional-level insight into how people approach their financial profile.</p>
              <p className="text-foreground font-semibold">He doesn’t just teach credit. He teaches how to move like the banks expect you to move. And that’s why his impact is different.</p>
            </div>
            <p className="mt-6 font-display font-bold uppercase tracking-wider text-grad-ember text-lg">
              This isn’t hype. This is positioning. This is strategy. This is execution. This is Dre.
            </p>
          </div>
        </div>
      </section>

      {/* ============ GALLERY MARQUEE ============ */}
      <section className="py-16 border-y border-white/5 overflow-hidden">
        <div className="mask-linear flex overflow-hidden">
          <div className="marquee-track flex gap-5 shrink-0 pr-5">
            {[...DRE_IMAGES, ...DRE_IMAGES].map((src, i) => (
              <img
                key={i} src={src} alt=""
                loading="lazy"
                className="h-72 md:h-96 w-auto object-cover object-top rounded-2xl border border-white/10 hover:border-[#00D9FF] transition-colors"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section id="pricing" className="py-24 border-t border-white/5 relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(60% 40% at 50% 0%, rgba(124,58,237,.25), transparent 60%)" }} />
        <div className="max-w-6xl mx-auto px-5 relative">
          <div className="text-center reveal">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass text-xs font-bold uppercase tracking-widest text-[#FF8A3D]">
              <i className="fas fa-crown text-[#FF8A3D]" /> Score Machine Elite
            </div>
            <h2 className="mt-5 text-4xl md:text-6xl font-display font-bold">
              Exclusive for <span className="text-grad-ember">Dre the Dimer clients.</span>
            </h2>
            <p className="mt-4 text-muted-foreground uppercase tracking-widest text-xs font-bold">
              Elite Access. Real Positioning. Real Results.
            </p>
          </div>

          <div className="mt-14 grid md:grid-cols-2 gap-6 items-stretch">
            {/* MONTHLY */}
            <div className="glass rounded-3xl p-8 flex flex-col reveal">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-display font-bold">Score Machine Elite</h3>
                  <div className="text-xs uppercase tracking-widest text-[#00D9FF] font-bold mt-1">Dre the Dimer</div>
                </div>
                <div className="w-12 h-12 rounded-2xl grid place-items-center bg-white/5 border border-white/10">
                  <i className="fas fa-bolt text-[#00D9FF]" />
                </div>
              </div>
              <div className="text-sm text-muted-foreground mt-3 border-b border-white/10 pb-6">
                Exclusive for Dre the Dimer Clients
              </div>
              <div className="mt-6 flex items-end gap-2">
                <span className="text-5xl md:text-6xl font-display font-bold">{SITE_CONFIG.monthlyPrice}</span>
                <span className="text-muted-foreground pb-2">/month</span>
              </div>
              <FeatureList />
              <PlanStats />
              <a href={SITE_CONFIG.monthlyCheckoutUrl} data-checkout="monthly"
                className="btn-ghost !w-full justify-center mt-6">
                Get Monthly Access <i className="fas fa-arrow-right" />
              </a>
            </div>

            {/* YEARLY */}
            <div className="grad-border-ember rounded-3xl p-8 flex flex-col relative reveal shadow-[var(--shadow-ember)]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-black uppercase tracking-widest text-[#0a0a0a]"
                style={{ background: "var(--grad-ember)" }}>
                Best Value
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-display font-bold">Score Machine Elite</h3>
                  <div className="text-xs uppercase tracking-widest text-[#FF8A3D] font-bold mt-1">Dre the Dimer</div>
                </div>
                <div className="w-12 h-12 rounded-2xl grid place-items-center bg-[#FF5A1F]/20 border border-[#FF5A1F]/30">
                  <i className="fas fa-crown text-[#FF8A3D]" />
                </div>
              </div>
              <div className="text-sm text-muted-foreground mt-3 border-b border-white/10 pb-6">
                Exclusive for Dre the Dimer Clients
              </div>
              <div className="mt-6 flex items-end gap-2">
                <span className="text-5xl md:text-6xl font-display font-bold text-grad-ember">{SITE_CONFIG.yearlyPrice}</span>
                <span className="text-muted-foreground pb-2">/year</span>
              </div>
              <FeatureList />
              <PlanStats />
              <a href={SITE_CONFIG.yearlyCheckoutUrl} data-checkout="yearly"
                className="btn-ember !w-full justify-center mt-6">
                Get Yearly Access <i className="fas fa-arrow-right" />
              </a>
            </div>
          </div>

          {/* QR */}
          <div className="mt-20 text-center reveal">
            <h3 className="text-3xl md:text-5xl font-display font-bold">
              Scan to <span className="text-grad-neon">claim your spot.</span>
            </h3>
            <p className="mt-3 text-muted-foreground uppercase tracking-widest text-xs font-bold">
              Exclusive access for Dre the Dimer clients
            </p>
            <div className="mt-8 inline-block p-5 rounded-3xl grad-border-ember bg-white">
              <div id="qr-canvas-wrap" className="grid place-items-center">
                <img src="/assets/qr-code.png" alt="Scan QR code to sign up" className="w-[320px] h-[320px]" />
              </div>
            </div>
            <div className="mt-6">
              <a href={SITE_CONFIG.qrCodeUrl} className="btn-ghost">
                Or tap to open <i className="fas fa-arrow-up-right-from-square" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MISSION STRIP ============ */}
      <section className="py-20 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40"
          style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(124,58,237,.25), transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(255,90,31,.25), transparent 60%)" }} />
        <div className="max-w-6xl mx-auto px-5 text-center relative">
          <div className="font-display font-bold text-4xl md:text-6xl lg:text-7xl uppercase tracking-tight">
            <span className="text-grad-neon">Your Credit.</span>{" "}
            <span className="shine-text">Your Future.</span>{" "}
            <span className="text-grad-ember">Our Mission.</span>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-white/5 py-14">
        <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-3 gap-10 items-start">
          <div>
            <div className="flex items-center gap-3">
              <img src="/assets/logo.png" alt="The Score Machine" className="h-10" />
              <div className="font-display font-bold">
                Dre the Dimer <span className="text-muted-foreground">×</span> The Score Machine
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Institutional-readiness platform. Exclusive access for Dre the Dimer clients.
            </p>
          </div>
          <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-foreground">{l.label}</a>
            ))}
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-foreground">Terms of Service</a>
          </nav>
          <div className="flex flex-col items-start md:items-end gap-4">
            <a href="#pricing" className="btn-ember">
              Claim Your Spot <i className="fas fa-arrow-right" />
            </a>
            <div className="text-xs text-muted-foreground uppercase tracking-widest">
              © {year} Dre the Dimer × The Score Machine. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureList() {
  return (
    <ul className="mt-6 space-y-3 flex-1">
      {PLAN_FEATURES.map((f) => (
        <li key={f} className="flex items-start gap-3 text-sm">
          <span className="mt-0.5 w-5 h-5 rounded-full grid place-items-center bg-[#00D9FF]/15 text-[#00D9FF] shrink-0">
            <i className="fas fa-check text-[10px]" />
          </span>
          <span>{f}</span>
        </li>
      ))}
    </ul>
  );
}

function PlanStats() {
  return (
    <div className="mt-6 pt-6 border-t border-white/10 space-y-2 text-sm">
      <div className="flex justify-between items-center">
        <span className="text-muted-foreground font-semibold">Max Users</span>
        <span className="font-bold px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs uppercase tracking-widest">5</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-muted-foreground font-semibold">Max Clients</span>
        <span className="font-bold px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs uppercase tracking-widest">5</span>
      </div>
      <div className="text-center text-[11px] uppercase tracking-widest text-muted-foreground font-bold pt-4">
        Elite Access. Real Positioning. Real Results.
      </div>
    </div>
  );
}
