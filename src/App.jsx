import { useState, useEffect, useRef } from "react";
import ownerPhoto from "./assets/alabama.png";
import prop1 from "./assets/alabam.jpg";
import prop2 from "./assets/alabam2.jpg";
import prop3 from "./assets/alabam3.jpg";
import prop4 from "./assets/alabam4.jpg";
import prop5 from "./assets/alabam5.jpg";
import prop6 from "./assets/alabam6.jpg";

const WHATSAPP_NUMBER = "2347082151926";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

const properties = [
  { id: 1, img: prop1, title: "Premium Residential Plot", location: "Sagamu, Ogun State", size: "600 sqm", price: "₦X,XXX,XXX", desc: "Dry land with C of O. Perfect for family home or investment.", tag: "HOT DEAL", tagColor: "#e05c2a" },
  { id: 2, img: prop2, title: "Commercial Plot", location: "Ikenne, Ogun State", size: "1000 sqm", price: "₦X,XXX,XXX", desc: "Strategic commercial location along major road. High ROI.", tag: "NEW", tagColor: "#1a7a4a" },
  { id: 3, img: prop3, title: "Residential Plot", location: "Sagamu, Ogun State", size: "450 sqm", price: "₦X,XXX,XXX", desc: "Serene neighbourhood, survey plan ready, instant allocation.", tag: null },
  { id: 4, img: prop4, title: "Corner Piece Plot", location: "Ikenne, Ogun State", size: "600 sqm", price: "₦X,XXX,XXX", desc: "Corner piece with extra space. Gazette and survey available.", tag: "CORNER", tagColor: "#7a3ea0" },
  { id: 5, img: prop5, title: "Investment Land", location: "Sagamu Road, Ogun State", size: "1200 sqm", price: "₦X,XXX,XXX", desc: "Bulk land for investors. Fast appreciation zone.", tag: "INVESTORS", tagColor: "#c9963a" },
  { id: 6, img: prop6, title: "Starter Plot", location: "Ikenne, Ogun State", size: "300 sqm", price: "₦X,XXX,XXX", desc: "Affordable entry-level plot. Installment payment accepted.", tag: "AFFORDABLE", tagColor: "#2a7a7a" },
];

const testimonials = [
  { name: "Adunola B.", initials: "AB", text: "Alabama Ona helped me secure my land without stress. The process was transparent and fast. I highly recommend them!", stars: 5 },
  { name: "Emmanuel O.", initials: "EO", text: "I was skeptical at first, but after site inspection I was convinced. My documents were ready within weeks. Very professional!", stars: 5 },
  { name: "Funmilayo A.", initials: "FA", text: "Best real estate experience I've had in Ogun State. The team is responsive and genuinely care about their clients.", stars: 5 },
  { name: "Chukwuemeka I.", initials: "CI", text: "I purchased two plots through Alabama Ona's. Both were genuine with full documentation. Will buy more soon!", stars: 5 },
];

const services = [
  { icon: "🏡", title: "Land Sales", desc: "Residential & commercial plots across Sagamu, Ikenne and Ogun State with verified documents." },
  { icon: "🏢", title: "Property Sales", desc: "Houses and investment properties for families and serious investors." },
  { icon: "🔍", title: "Site Inspection", desc: "We accompany buyers on physical site visits so you see exactly what you're buying." },
  { icon: "📄", title: "Documentation", desc: "Full guidance on land papers, surveys, C of O, and ownership processes." },
];

const stats = [
  { num: "500+", label: "Happy Clients" },
  { num: "XX+", label: "Years Experience" },
  { num: "100%", label: "Verified Land" },
  { num: "24/7", label: "Client Support" },
];

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ children, delay = 0, className = "", y = 40 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`
    }}>
      {children}
    </div>
  );
}

function CountUp({ target, suffix = "", duration = 2000 }) {
  const [val, setVal] = useState(0);
  const [ref, inView] = useInView(0.5);
  const started = useRef(false);
  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const num = parseInt(target.replace(/\D/g, "")) || 0;
    if (!num) { setVal(target); return; }
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setVal(Math.floor(ease * num));
      if (p < 1) requestAnimationFrame(tick);
      else setVal(target);
    };
    requestAnimationFrame(tick);
  }, [inView]);
  return <span ref={ref}>{typeof val === "string" ? val : val + suffix}</span>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", message: "", interest: "" });
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx(i => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Properties", id: "properties" },
    { label: "Why Us", id: "why-choose-us" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Contact", id: "contact" },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#fdfcf9", color: "#1a1a1a", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=Outfit:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        
        :root {
          --forest: #0f2a1a;
          --forest-mid: #1a3a28;
          --forest-light: #2d5a3d;
          --gold: #c9963a;
          --gold-light: #e8b55a;
          --gold-pale: #fdf6ec;
          --cream: #fdfcf9;
          --text: #1a1a1a;
          --muted: #6b7280;
          --border: #e8e4dc;
        }

        .serif { font-family: 'Playfair Display', Georgia, serif; }
        
        /* Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: var(--cream); }
        ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 10px; }

        /* Nav */
        .nav-link {
          position: relative;
          color: rgba(255,255,255,0.75);
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px 0;
          transition: color 0.3s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 1px;
          background: var(--gold);
          transition: width 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .nav-link:hover { color: var(--gold-light); }
        .nav-link:hover::after { width: 100%; }

        /* Property cards */
        .prop-card { transition: transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.5s ease; }
        .prop-card:hover { transform: translateY(-10px) scale(1.01); box-shadow: 0 30px 60px rgba(15,42,26,0.18); }
        .prop-card .card-img { transition: transform 0.8s cubic-bezier(0.22,1,0.36,1); }
        .prop-card:hover .card-img { transform: scale(1.07); }

        /* Service cards */
        .svc-card { transition: all 0.4s cubic-bezier(0.22,1,0.36,1); cursor: default; }
        .svc-card:hover { transform: translateY(-8px); background: var(--forest-mid) !important; }
        .svc-card:hover .svc-title { color: var(--gold-light) !important; }
        .svc-card:hover .svc-desc { color: rgba(255,255,255,0.7) !important; }
        .svc-card:hover .svc-icon-wrap { background: rgba(201,150,58,0.2) !important; }

        /* Why us */
        .why-item { transition: all 0.35s ease; }
        .why-item:hover { background: rgba(201,150,58,0.08) !important; border-color: rgba(201,150,58,0.3) !important; transform: translateX(4px); }

        /* Buttons */
        .btn-gold {
          background: var(--gold);
          color: white;
          border: none;
          padding: 14px 32px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .btn-gold:hover { background: var(--gold-light); transform: translateY(-2px); box-shadow: 0 12px 24px rgba(201,150,58,0.35); }

        .btn-wa {
          background: #25d366;
          color: white;
          border: none;
          padding: 14px 32px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .btn-wa:hover { background: #1fb855; transform: translateY(-2px); box-shadow: 0 12px 24px rgba(37,211,102,0.35); }

        .btn-outline {
          background: transparent;
          color: white;
          border: 1.5px solid rgba(255,255,255,0.4);
          padding: 13px 30px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .btn-outline:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.7); transform: translateY(-2px); }

        /* WhatsApp float */
        @keyframes wa-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(37,211,102,0.5), 0 8px 24px rgba(0,0,0,0.2); }
          50% { box-shadow: 0 0 0 14px rgba(37,211,102,0), 0 8px 24px rgba(0,0,0,0.2); }
        }
        .wa-float {
          animation: wa-pulse 2.5s infinite;
          transition: transform 0.3s ease, background 0.3s ease;
        }
        .wa-float:hover { transform: scale(1.1) translateY(-3px); background: #1fb855 !important; }

        /* Testimonials */
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        /* Form inputs */
        .form-input {
          width: 100%;
          border: 1.5px solid var(--border);
          border-radius: 12px;
          padding: 13px 16px;
          font-size: 14px;
          font-family: inherit;
          background: white;
          color: var(--text);
          transition: border-color 0.3s, box-shadow 0.3s;
          outline: none;
        }
        .form-input:focus {
          border-color: var(--gold);
          box-shadow: 0 0 0 3px rgba(201,150,58,0.12);
        }
        .form-input::placeholder { color: #aaa; }

        /* Noise overlay */
        .noise::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
        }

        /* Divider ornament */
        .ornament {
          display: flex;
          align-items: center;
          gap: 12px;
          justify-content: center;
          margin: 12px auto;
        }
        .ornament::before, .ornament::after {
          content: '';
          height: 1px;
          width: 60px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
        }

        /* Mobile menu */
        .mobile-nav-item {
          display: block;
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          color: rgba(255,255,255,0.85);
          font-size: 14px;
          font-family: inherit;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 14px 0;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          cursor: pointer;
          transition: color 0.25s, padding-left 0.25s;
        }
        .mobile-nav-item:hover { color: var(--gold-light); padding-left: 8px; }

        @media (max-width: 640px) {
          .hero-title { font-size: 2.4rem !important; }
        }
      `}</style>

      {/* ══════════════════════════════════════════
          NAVIGATION
      ══════════════════════════════════════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(10,28,18,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.4s ease",
        padding: scrolled ? "14px 0" : "22px 0",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <button onClick={() => scrollTo("home")} style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", lineHeight: 1.1 }}>
              <div style={{ color: "#c9963a", fontSize: 15, fontWeight: 700, letterSpacing: "0.12em" }}>ALABAMA ONA'S</div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: "0.2em", fontFamily: "'Outfit',sans-serif", fontWeight: 400 }}>MULTIBIZ ENTERPRISES</div>
            </div>
          </button>

          {/* Desktop nav */}
          <div style={{ display: "none" }} className="desktop-nav">
            {navLinks.map(l => (
              <button key={l.id} className="nav-link" onClick={() => scrollTo(l.id)} style={{ marginLeft: 28 }}>{l.label}</button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="btn-wa" style={{ padding: "10px 20px", fontSize: 13 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "1.5px solid rgba(255,255,255,0.2)", borderRadius: 8, color: "white", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.3s", fontSize: 18 }}>
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Desktop nav inline — using flex */}
        <style>{`
          @media (min-width: 1024px) {
            .desktop-nav { display: flex !important; align-items: center; }
            .mobile-toggle { display: none !important; }
          }
        `}</style>

        {/* Mobile menu */}
        <div style={{
          overflow: "hidden",
          maxHeight: menuOpen ? "400px" : "0",
          transition: "max-height 0.45s cubic-bezier(0.22,1,0.36,1)",
          background: "rgba(10,25,16,0.98)",
          backdropFilter: "blur(20px)",
        }}>
          <div style={{ padding: "8px 32px 24px" }}>
            {navLinks.map(l => (
              <button key={l.id} className="mobile-nav-item" onClick={() => scrollTo(l.id)}>{l.label}</button>
            ))}
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section id="home" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(160deg, #071811 0%, #0f2a1a 40%, #1a4030 100%)", overflow: "hidden" }}>
        
        {/* Background texture layers */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "radial-gradient(circle, #c9963a 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 40%, rgba(201,150,58,0.12) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 20% 70%, rgba(45,90,60,0.3) 0%, transparent 50%)" }} />

        {/* Decorative line element */}
        <div style={{ position: "absolute", top: "15%", right: "8%", opacity: 0.15, transform: "rotate(15deg)" }}>
          <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
            <circle cx="90" cy="90" r="88" stroke="#c9963a" strokeWidth="0.8"/>
            <circle cx="90" cy="90" r="70" stroke="#c9963a" strokeWidth="0.5"/>
            <circle cx="90" cy="90" r="50" stroke="#c9963a" strokeWidth="0.5"/>
            <line x1="2" y1="90" x2="178" y2="90" stroke="#c9963a" strokeWidth="0.5"/>
            <line x1="90" y1="2" x2="90" y2="178" stroke="#c9963a" strokeWidth="0.5"/>
          </svg>
        </div>

        {/* Bottom fade */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 200, background: "linear-gradient(to top, #fdfcf9, transparent)" }} />

        <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "120px 24px 80px", maxWidth: 860, margin: "0 auto" }}>
          
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(201,150,58,0.12)", border: "1px solid rgba(201,150,58,0.3)",
            color: "#e8b55a", fontSize: 11, fontWeight: 600, letterSpacing: "0.15em",
            padding: "8px 20px", borderRadius: 50, marginBottom: 32, textTransform: "uppercase"
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#25d366", flexShrink: 0, boxShadow: "0 0 8px #25d366" }} />
            Trusted Real Estate · Ogun State, Nigeria
          </div>

          {/* Headline */}
          <h1 className="hero-title serif" style={{ fontSize: "clamp(2.4rem, 6vw, 4.8rem)", fontWeight: 700, color: "white", lineHeight: 1.1, marginBottom: 24 }}>
            Own Genuine Land in{" "}
            <em style={{ color: "#c9963a", display: "block" }}>Ogun State Today</em>
          </h1>

          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "clamp(15px, 2vw, 18px)", lineHeight: 1.8, maxWidth: 560, margin: "0 auto 48px", fontWeight: 300 }}>
            Secure verified plots in Sagamu & Ikenne with full documentation, zero fraud, and transparent transactions.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center", marginBottom: 64 }}>
            <button className="btn-gold" onClick={() => scrollTo("properties")}>
              View Available Plots
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <a href={`${WHATSAPP_LINK}?text=Hello%2C%20I%27d%20like%20to%20book%20a%20site%20inspection`} target="_blank" rel="noreferrer" className="btn-outline">
              🗓️ Book Site Inspection
            </a>
          </div>

          {/* Trust indicators */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px 28px", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
            {["✓ Registered Business", "✓ Verified Documents", "✓ Physical Inspections", "✓ Flexible Payment"].map(t => (
              <span key={t} style={{ letterSpacing: "0.03em" }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════ */}
      <section style={{ background: "#0f2a1a", padding: "0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div style={{ textAlign: "center", padding: "36px 20px", borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                <div className="serif" style={{ fontSize: 40, fontWeight: 700, color: "#c9963a", lineHeight: 1.1 }}>
                  <CountUp target={s.num} duration={1800} />
                </div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 6, fontWeight: 500 }}>{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ABOUT
      ══════════════════════════════════════════ */}
      <section id="about" style={{ padding: "120px 32px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 72, alignItems: "center" }}>
          
          <Reveal>
            <div style={{ position: "relative" }}>
              {/* Decorative frame */}
              <div style={{ position: "absolute", top: -16, left: -16, right: 16, bottom: 16, border: "2px solid rgba(201,150,58,0.2)", borderRadius: 24, zIndex: 0 }} />
              <img src={ownerPhoto} alt="Alabama — Owner" style={{ width: "100%", height: 440, objectFit: "cover", borderRadius: 20, position: "relative", zIndex: 1, display: "block" }} />
              <div style={{ position: "absolute", bottom: -20, right: -20, zIndex: 2, background: "#0f2a1a", padding: "18px 24px", borderRadius: 16, boxShadow: "0 20px 40px rgba(0,0,0,0.25)" }}>
                <div className="serif" style={{ color: "#c9963a", fontSize: 34, fontWeight: 700, lineHeight: 1 }}>XX+</div>
                <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>Years of Trust</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 32, height: 2, background: "#c9963a" }} />
                <span style={{ color: "#c9963a", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" }}>About Us</span>
              </div>

              <h2 className="serif" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, color: "#0f2a1a", lineHeight: 1.15, marginBottom: 24 }}>
                Alabama Ona's <em style={{ color: "#c9963a" }}>Multibiz Enterprises</em>
              </h2>

              <p style={{ color: "#6b7280", lineHeight: 1.9, marginBottom: 16, fontSize: 15 }}>
                We are a registered real estate firm rooted in Sagamu and Ikenne, Ogun State — dedicated to helping <strong style={{ color: "#1a1a1a" }}>families, professionals, and investors</strong> acquire genuine land safely. No fraud, no hidden fees, no stress.
              </p>
              <p style={{ color: "#6b7280", lineHeight: 1.9, marginBottom: 32, fontSize: 15 }}>
                Our mission is to bring transparency and trust to Nigerian land transactions. We've helped hundreds of clients secure their dream plots with verified, bankable documentation.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 32 }}>
                {[
                  { icon: "📋", text: "Verified Land Documents" },
                  { icon: "✅", text: "Registered Business" },
                  { icon: "💳", text: "Flexible Payment Plans" },
                  { icon: "🔍", text: "Physical Site Inspections" },
                ].map(item => (
                  <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 10, background: "#f8f6f1", borderRadius: 12, padding: "12px 14px", fontSize: 13, color: "#374151", fontWeight: 500, border: "1px solid #e8e4dc" }}>
                    <span>{item.icon}</span> {item.text}
                  </div>
                ))}
              </div>

              <button className="btn-gold" onClick={() => scrollTo("properties")}>
                Browse Our Listings →
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════ */}
      <section id="services" style={{ background: "#f8f6f1", padding: "100px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center", marginBottom: 16 }}>
                <div style={{ width: 32, height: 2, background: "#c9963a" }} />
                <span style={{ color: "#c9963a", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" }}>Our Services</span>
                <div style={{ width: 32, height: 2, background: "#c9963a" }} />
              </div>
              <h2 className="serif" style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "#0f2a1a" }}>What We Offer</h2>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className="svc-card" style={{ background: "white", borderRadius: 20, padding: "36px 28px", border: "1px solid #e8e4dc", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                  <div className="svc-icon-wrap" style={{ width: 60, height: 60, borderRadius: 16, background: "rgba(201,150,58,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 20, transition: "background 0.4s" }}>
                    {s.icon}
                  </div>
                  <h3 className="svc-title serif" style={{ fontSize: 20, fontWeight: 600, color: "#0f2a1a", marginBottom: 12, transition: "color 0.4s" }}>{s.title}</h3>
                  <p className="svc-desc" style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.75, transition: "color 0.4s" }}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PROPERTIES
      ══════════════════════════════════════════ */}
      <section id="properties" style={{ padding: "100px 32px", background: "white" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center", marginBottom: 16 }}>
                <div style={{ width: 32, height: 2, background: "#c9963a" }} />
                <span style={{ color: "#c9963a", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" }}>Current Listings</span>
                <div style={{ width: 32, height: 2, background: "#c9963a" }} />
              </div>
              <h2 className="serif" style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "#0f2a1a", marginBottom: 12 }}>Available Lands & Properties</h2>
              <p style={{ color: "#6b7280", fontSize: 15, maxWidth: 500, margin: "0 auto" }}>All listings carry verified documentation. Site inspection available on request.</p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
            {properties.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.07}>
                <div className="prop-card" style={{ background: "white", borderRadius: 20, overflow: "hidden", border: "1px solid #e8e4dc", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
                  
                  {/* Image */}
                  <div style={{ position: "relative", height: 220, overflow: "hidden", background: "#e8e4dc" }}>
                    <img className="card-img" src={p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,42,26,0.5) 0%, transparent 50%)" }} />
                    {p.tag && (
                      <div style={{ position: "absolute", top: 14, left: 14, background: p.tagColor, color: "white", fontSize: 10, fontWeight: 700, padding: "5px 12px", borderRadius: 50, letterSpacing: "0.1em" }}>
                        {p.tag}
                      </div>
                    )}
                    <div style={{ position: "absolute", bottom: 14, left: 14, right: 14, display: "flex", gap: 6 }}>
                      <span style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", color: "white", fontSize: 11, padding: "4px 10px", borderRadius: 50, fontWeight: 500 }}>📍 {p.location}</span>
                      <span style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", color: "white", fontSize: 11, padding: "4px 10px", borderRadius: 50, fontWeight: 500 }}>📐 {p.size}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: "22px 22px 20px" }}>
                    <h3 className="serif" style={{ fontSize: 18, fontWeight: 600, color: "#0f2a1a", marginBottom: 8 }}>{p.title}</h3>
                    <p style={{ color: "#6b7280", fontSize: 13, lineHeight: 1.7, marginBottom: 18 }}>{p.desc}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontSize: 11, color: "#aaa", letterSpacing: "0.06em", marginBottom: 2 }}>ASKING PRICE</div>
                        <div className="serif" style={{ fontSize: 22, fontWeight: 700, color: "#c9963a" }}>{p.price}</div>
                      </div>
                      <a
                        href={`${WHATSAPP_LINK}?text=Hello%2C%20I%27m%20interested%20in%20${encodeURIComponent(p.title + " - " + p.location)}`}
                        target="_blank" rel="noreferrer"
                        style={{ background: "#25d366", color: "white", padding: "10px 18px", borderRadius: 50, fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 6, textDecoration: "none", transition: "all 0.3s" }}
                        onMouseEnter={e => { e.currentTarget.style.background = "#1fb855"; e.currentTarget.style.transform = "scale(1.05)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "#25d366"; e.currentTarget.style.transform = "scale(1)"; }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        Inquire
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div style={{ textAlign: "center", marginTop: 56 }}>
              <p style={{ color: "#6b7280", marginBottom: 20, fontSize: 14 }}>Don't see what you're looking for? Contact us directly.</p>
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="btn-wa">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Ask About More Plots
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHY CHOOSE US
      ══════════════════════════════════════════ */}
      <section id="why-choose-us" style={{ position: "relative", padding: "100px 32px", background: "linear-gradient(160deg, #071811 0%, #0f2a1a 60%, #172f1f 100%)", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "radial-gradient(circle, #c9963a 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
        <div style={{ position: "absolute", right: -80, top: "50%", transform: "translateY(-50%)", opacity: 0.05 }}>
          <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
            <circle cx="200" cy="200" r="198" stroke="#c9963a" strokeWidth="1"/>
            <circle cx="200" cy="200" r="160" stroke="#c9963a" strokeWidth="0.8"/>
            <circle cx="200" cy="200" r="120" stroke="#c9963a" strokeWidth="0.6"/>
            <circle cx="200" cy="200" r="80" stroke="#c9963a" strokeWidth="0.5"/>
          </svg>
        </div>

        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center", marginBottom: 16 }}>
                <div style={{ width: 32, height: 1, background: "rgba(201,150,58,0.5)" }} />
                <span style={{ color: "#e8b55a", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" }}>Our Promise</span>
                <div style={{ width: 32, height: 1, background: "rgba(201,150,58,0.5)" }} />
              </div>
              <h2 className="serif" style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "white" }}>Why Clients Trust Us</h2>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
            {[
              { icon: "✅", title: "Genuine Lands Only", desc: "No fraud, no fake titles, no surprises. Every plot is vetted before listing." },
              { icon: "💎", title: "Transparent Transactions", desc: "You see every step of the process. No hidden charges, no fine print traps." },
              { icon: "🏪", title: "Physical Office", desc: "We have a real office in Sagamu/Ikenne — visit us anytime." },
              { icon: "🤝", title: "Trusted by Hundreds", desc: "Hundreds of satisfied clients across Ogun State and beyond." },
              { icon: "⚡", title: "Quick Documentation", desc: "We move fast. Get your papers processed and allocation done in record time." },
              { icon: "📞", title: "Ongoing Support", desc: "We stay with you even after purchase. Your success is our reputation." },
            ].map((w, i) => (
              <Reveal key={w.title} delay={i * 0.07}>
                <div className="why-item" style={{ display: "flex", gap: 18, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "22px 22px", backdropFilter: "blur(10px)", transition: "all 0.35s ease", cursor: "default" }}>
                  <div style={{ fontSize: 28, flexShrink: 0, lineHeight: 1 }}>{w.icon}</div>
                  <div>
                    <div style={{ color: "white", fontWeight: 600, fontSize: 15, marginBottom: 6 }}>{w.title}</div>
                    <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, lineHeight: 1.7 }}>{w.desc}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section id="testimonials" style={{ padding: "100px 32px", background: "#fdfcf9" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center", marginBottom: 16 }}>
              <div style={{ width: 32, height: 2, background: "#c9963a" }} />
              <span style={{ color: "#c9963a", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" }}>Client Stories</span>
              <div style={{ width: 32, height: 2, background: "#c9963a" }} />
            </div>
            <h2 className="serif" style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "#0f2a1a", marginBottom: 60 }}>What Our Clients Say</h2>

            {/* Testimonial slider */}
            <div style={{ position: "relative", minHeight: 260 }}>
              {testimonials.map((t, i) => (
                <div key={i} style={{
                  position: "absolute", inset: 0,
                  opacity: i === testimonialIdx ? 1 : 0,
                  transform: i === testimonialIdx ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)",
                  transition: "all 0.7s cubic-bezier(0.22,1,0.36,1)",
                  pointerEvents: i === testimonialIdx ? "auto" : "none"
                }}>
                  <div style={{ background: "white", border: "1px solid #e8e4dc", borderRadius: 24, padding: "40px 44px", boxShadow: "0 8px 32px rgba(0,0,0,0.06)", position: "relative" }}>
                    {/* Big quote mark */}
                    <div className="serif" style={{ position: "absolute", top: 20, left: 28, fontSize: 80, lineHeight: 1, color: "rgba(201,150,58,0.12)", fontWeight: 900, userSelect: "none" }}>"</div>
                    
                    {/* Stars */}
                    <div style={{ color: "#f59e0b", fontSize: 18, marginBottom: 20 }}>{"★".repeat(t.stars)}</div>
                    
                    <p className="serif" style={{ fontSize: "clamp(15px, 2vw, 18px)", color: "#374151", lineHeight: 1.8, fontStyle: "italic", marginBottom: 28, position: "relative", zIndex: 1 }}>"{t.text}"</p>
                    
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
                      <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, #0f2a1a, #2d5a3d)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 14, fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>
                        {t.initials}
                      </div>
                      <div style={{ textAlign: "left" }}>
                        <div style={{ fontWeight: 600, color: "#0f2a1a", fontSize: 14 }}>{t.name}</div>
                        <div style={{ color: "#6b7280", fontSize: 12 }}>Verified Client</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 300 }}>
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setTestimonialIdx(i)} style={{
                  width: i === testimonialIdx ? 28 : 8,
                  height: 8,
                  borderRadius: 50,
                  background: i === testimonialIdx ? "#c9963a" : "#d1d5db",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
                  padding: 0
                }} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════ */}
      <section style={{ position: "relative", padding: "100px 32px", background: "linear-gradient(135deg, #b8832a 0%, #c9963a 40%, #dba94a 100%)", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.08, backgroundImage: "repeating-linear-gradient(45deg, white 0px, white 1px, transparent 1px, transparent 24px)" }} />
        <div style={{ position: "absolute", right: -60, bottom: -60, opacity: 0.08 }}>
          <svg width="300" height="300" viewBox="0 0 300 300" fill="white"><circle cx="150" cy="150" r="148" stroke="white" strokeWidth="1" fill="none"/><circle cx="150" cy="150" r="120" stroke="white" strokeWidth="0.8" fill="none"/><circle cx="150" cy="150" r="90" stroke="white" strokeWidth="0.6" fill="none"/></svg>
        </div>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", color: "white", fontSize: 11, fontWeight: 600, padding: "7px 18px", borderRadius: 50, marginBottom: 28, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              🏆 Limited Plots Available
            </div>
            <h2 className="serif" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, color: "white", lineHeight: 1.15, marginBottom: 16 }}>
              Ready to Own Land in Ogun State?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 16, lineHeight: 1.7, marginBottom: 44 }}>
              Genuine plots are moving fast. Book your site inspection or chat with us today to secure yours.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
              <a href={`${WHATSAPP_LINK}?text=Hello%2C%20I%20want%20to%20book%20a%20site%20inspection`} target="_blank" rel="noreferrer"
                style={{ background: "white", color: "#b8832a", padding: "14px 32px", borderRadius: 50, fontWeight: 700, fontSize: 14, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "all 0.3s", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 16px 32px rgba(0,0,0,0.2)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)"; }}
              >
                🗓️ Book Site Inspection
              </a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" style={{ background: "#25d366", color: "white", padding: "14px 32px", borderRadius: 50, fontWeight: 700, fontSize: 14, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "all 0.3s", boxShadow: "0 8px 24px rgba(37,211,102,0.35)" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Us Now
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════ */}
      <section id="contact" style={{ padding: "100px 32px", background: "white" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 60, alignItems: "start" }}>
          
          <Reveal>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 32, height: 2, background: "#c9963a" }} />
                <span style={{ color: "#c9963a", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" }}>Get In Touch</span>
              </div>
              <h2 className="serif" style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "#0f2a1a", marginBottom: 12 }}>Contact Us</h2>
              <p style={{ color: "#6b7280", fontSize: 15, lineHeight: 1.7, marginBottom: 40 }}>We're here to answer questions, schedule inspections, and guide you to the right property.</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { icon: "📞", label: "Phone", value: "+234 XXX XXX XXXX", href: null, bg: "#f8f6f1" },
                  { icon: "💬", label: "WhatsApp", value: "+234 XXX XXX XXXX", href: WHATSAPP_LINK, bg: "#f0fdf4" },
                  { icon: "✉️", label: "Email", value: "info@alabamaona.com", href: "mailto:info@alabamaona.com", bg: "#f8f6f1" },
                  { icon: "📍", label: "Office", value: "Sagamu / Ikenne, Ogun State", href: null, bg: "#f8f6f1" },
                ].map(item => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 16, background: item.bg, borderRadius: 14, padding: "16px 18px", border: "1px solid #e8e4dc" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500, marginBottom: 3 }}>{item.label}</div>
                      {item.href ? (
                        <a href={item.href} target="_blank" rel="noreferrer" style={{ color: "#0f2a1a", fontWeight: 500, fontSize: 14, textDecoration: "none" }}>{item.value}</a>
                      ) : (
                        <span style={{ color: "#374151", fontWeight: 500, fontSize: 14 }}>{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div style={{ background: "#fdfcf9", border: "1px solid #e8e4dc", borderRadius: 24, padding: "40px 36px", boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}>
              <h3 className="serif" style={{ fontSize: 24, fontWeight: 700, color: "#0f2a1a", marginBottom: 28 }}>Send a Message</h3>

              {submitted ? (
                <div style={{ textAlign: "center", padding: "48px 0" }}>
                  <div style={{ width: 72, height: 72, background: "#f0fdf4", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto 20px" }}>✅</div>
                  <h4 style={{ fontWeight: 700, fontSize: 18, color: "#0f2a1a", marginBottom: 8 }}>Message Received!</h4>
                  <p style={{ color: "#6b7280", fontSize: 14 }}>We'll get back to you shortly via WhatsApp or phone.</p>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="btn-wa" style={{ marginTop: 24, display: "inline-flex" }}>
                    Continue on WhatsApp
                  </a>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6, letterSpacing: "0.04em" }}>Full Name *</label>
                    <input required className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Enter your full name" />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6, letterSpacing: "0.04em" }}>Phone Number *</label>
                    <input required type="tel" className="form-input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+234 XXX XXX XXXX" />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6, letterSpacing: "0.04em" }}>Interest</label>
                    <select className="form-input" value={form.interest} onChange={e => setForm({ ...form, interest: e.target.value })}>
                      <option value="">Select a property type...</option>
                      <option>Residential Plot</option>
                      <option>Commercial Plot</option>
                      <option>Investment Land</option>
                      <option>General Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6, letterSpacing: "0.04em" }}>Message *</label>
                    <textarea required className="form-input" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us what you're looking for..." rows={4} style={{ resize: "vertical", fontFamily: "inherit" }} />
                  </div>
                  <button type="submit" style={{ background: "#0f2a1a", color: "white", border: "none", borderRadius: 12, padding: "15px", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.3s", fontFamily: "inherit", letterSpacing: "0.04em" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#1a3a28"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#0f2a1a"; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    Send Message →
                  </button>
                  <p style={{ fontSize: 12, color: "#9ca3af", textAlign: "center" }}>
                    Prefer instant reply? <a href={WHATSAPP_LINK} style={{ color: "#25d366", fontWeight: 600, textDecoration: "none" }}>Chat on WhatsApp</a>
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer style={{ background: "#071811", color: "white", padding: "72px 32px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 48, marginBottom: 56 }}>
            
            {/* Brand */}
            <div style={{ gridColumn: "span 2" }} className="footer-brand">
              <div className="serif" style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                <span style={{ color: "#c9963a" }}>ALABAMA ONA'S</span><br />
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontFamily: "'Outfit',sans-serif", fontWeight: 400, letterSpacing: "0.15em" }}>MULTIBIZ ENTERPRISES</span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, lineHeight: 1.8, maxWidth: 300, marginBottom: 24, marginTop: 12 }}>
                Your trusted real estate partner in Ogun State. Helping families and investors own verified land with full peace of mind.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                {[
                  { icon: "f", label: "Facebook" },
                  { icon: "ig", label: "Instagram" },
                  { icon: "tt", label: "TikTok" },
                ].map(s => (
                  <a key={s.label} href="#" title={s.label} style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.5)", fontSize: 11, textDecoration: "none", transition: "all 0.3s", fontWeight: 700 }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(201,150,58,0.2)"; e.currentTarget.style.color = "#c9963a"; e.currentTarget.style.borderColor = "rgba(201,150,58,0.3)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ color: "#c9963a", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 20 }}>Quick Links</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {navLinks.map(l => (
                  <li key={l.id}>
                    <button onClick={() => scrollTo(l.id)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.45)", fontSize: 13, cursor: "pointer", fontFamily: "inherit", padding: 0, transition: "color 0.25s" }}
                      onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.9)"}
                      onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}
                    >{l.label}</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ color: "#c9963a", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 20 }}>Contact</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, color: "rgba(255,255,255,0.45)", fontSize: 13, lineHeight: 1.7 }}>
                <span>📞 +234 XXX XXX XXXX</span>
                <span>✉️ info@alabamaona.com</span>
                <span>📍 Sagamu / Ikenne, Ogun State</span>
                <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#25d366", color: "white", padding: "9px 18px", borderRadius: 50, fontSize: 12, fontWeight: 600, textDecoration: "none", marginTop: 8, width: "fit-content", transition: "background 0.3s" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 28, display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, color: "rgba(255,255,255,0.25)", fontSize: 12 }}>
            <span>© {new Date().getFullYear()} Alabama Ona's Multibiz Enterprises. All rights reserved.</span>
            <span>Sagamu · Ikenne · Ogun State, Nigeria 🇳🇬</span>
          </div>
        </div>
      </footer>

      {/* ══════════════════════════════════════════
          FLOATING WHATSAPP
      ══════════════════════════════════════════ */}
      <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="wa-float"
        style={{ position: "fixed", bottom: 28, right: 28, zIndex: 200, width: 60, height: 60, borderRadius: "50%", background: "#25d366", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}
        title="Chat on WhatsApp">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>

      <style>{`
        @media (max-width: 640px) {
          .footer-brand { grid-column: span 1 !important; }
        }
      `}</style>
    </div>
  );
}