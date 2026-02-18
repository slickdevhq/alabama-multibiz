import { useState, useEffect, useRef } from "react";

const WHATSAPP_NUMBER = "2347082151926"; // placeholder
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

const properties = [
  { id: 1,  img: "/src/assets/alabam.jpg", title: "Premium Residential Plot", location: "Sagamu, Ogun State", size: "600 sqm", price: "₦X,XXX,XXX", desc: "Dry land with C of O. Perfect for family home or investment.", tag: "HOT DEAL" },
  { id: 2,  img: "/src/assets/alabam2.jpg", title: "Commercial Plot", location: "Ikenne, Ogun State", size: "1000 sqm", price: "₦X,XXX,XXX", desc: "Strategic commercial location along major road. High ROI.", tag: "NEW" },
  { id: 3,  img: "/src/assets/alabam3.jpg", title: "Residential Plot", location: "Sagamu, Ogun State", size: "450 sqm", price: "₦X,XXX,XXX", desc: "Serene neighbourhood, survey plan ready, instant allocation.", tag: "" },
  { id: 4,  img: "/src/assets/alabam4.jpg", title: "Corner Piece Plot", location: "Ikenne, Ogun State", size: "600 sqm", price: "₦X,XXX,XXX", desc: "Corner piece with extra space. Gazette and survey available.", tag: "CORNER PIECE" },
  { id: 5,  img: "/src/assets/alabam5.jpg", title: "Investment Land", location: "Sagamu Road, Ogun State", size: "1200 sqm", price: "₦X,XXX,XXX", desc: "Bulk land for investors. Fast appreciation zone.", tag: "INVESTORS" },
  { id: 6, img: "/src/assets/alabam6.jpg", title: "Starter Plot", location: "Ikenne, Ogun State", size: "300 sqm", price: "₦X,XXX,XXX", desc: "Affordable entry-level plot. Installment payment accepted.", tag: "AFFORDABLE" },
];

const testimonials = [
  { name: "Adunola B.", text: "Alabama Ona helped me secure my land without stress. The process was transparent and fast. I highly recommend them!", stars: 5 },
  { name: "Emmanuel O.", text: "I was skeptical at first, but after site inspection I was convinced. My documents were ready within weeks. Very professional!", stars: 5 },
  { name: "Funmilayo A.", text: "Best real estate experience I've had in Ogun State. The team is responsive and genuinely care about their clients.", stars: 5 },
  { name: "Chukwuemeka I.", text: "I purchased two plots through Alabama Ona's. Both were genuine with full documentation. Will buy more soon!", stars: 5 },
];

const services = [
  { icon: "🏡", title: "Land Sales", desc: "Residential & commercial plots across Sagamu, Ikenne and Ogun State with verified documents." },
  { icon: "🏢", title: "Property Sales", desc: "Houses and investment properties for families and serious investors." },
  { icon: "🔍", title: "Site Inspection", desc: "We accompany buyers on physical site visits so you see exactly what you're buying." },
  { icon: "📄", title: "Documentation", desc: "Full guidance on land papers, surveys, C of O, and ownership processes." },
];

const whyUs = [
  { icon: "✅", text: "Genuine Lands Only — no fraud, no fake titles" },
  { icon: "💎", text: "Transparent Transactions — you see everything" },
  { icon: "🏪", text: "Physical Office in Sagamu/Ikenne" },
  { icon: "🤝", text: "Trusted by Hundreds of Clients" },
  { icon: "⚡", text: "Quick Documentation Process" },
  { icon: "📞", text: "Ongoing Customer Support" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

function StarRating({ n }) {
  return <span className="text-amber-400 text-lg">{"★".repeat(n)}</span>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx(i => (i + 1) % testimonials.length), 4000);
    return () => clearInterval(t);
  }, []);

  const navLinks = ["Home", "About", "Properties", "Why Choose Us", "Testimonials", "Contact"];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const sectionId = (l) => l.toLowerCase().replace(/\s+/g, "-").replace(/\//g, "");

  return (
    <div className="font-sans bg-white text-gray-900 overflow-x-hidden" style={{ fontFamily: "'Georgia', serif" }}>
      {/* Google Fonts via style */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
        body { font-family: 'DM Sans', sans-serif; }
        .heading { font-family: 'Cormorant Garamond', serif; }
        .gold { color: #C9963A; }
        .bg-gold { background: #C9963A; }
        .border-gold { border-color: #C9963A; }
        .bg-forest { background: #1A3A2A; }
        .text-forest { color: #1A3A2A; }
        html { scroll-behavior: smooth; }
        .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(26,58,42,0.15); }
        .wa-pulse { animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,0.4)} 50%{box-shadow:0 0 0 12px rgba(37,211,102,0)} }
      `}</style>

      {/* STICKY NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-forest shadow-lg" style={{ background: "#1A3A2A" }}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="heading text-white font-bold text-xs sm:text-sm leading-tight max-w-[180px] sm:max-w-none">
            <span className="gold">ALABAMA ONA'S</span><br className="sm:hidden" />
            <span className="text-white hidden sm:inline"> MULTIBIZ ENTERPRISES</span>
          </div>
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map(l => (
              <button key={l} onClick={() => scrollTo(sectionId(l))} className="text-white text-sm hover:text-amber-400 transition-colors font-light tracking-wide">
                {l}
              </button>
            ))}
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-colors">
              <span>💬</span> WhatsApp
            </a>
          </div>
          <div className="flex items-center gap-3 lg:hidden">
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1">
              💬 Chat
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-2xl">
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-forest border-t border-green-800 px-4 py-3 flex flex-col gap-3">
            {navLinks.map(l => (
              <button key={l} onClick={() => scrollTo(sectionId(l))} className="text-white text-left text-sm py-2 border-b border-green-800 hover:text-amber-400 transition-colors">
                {l}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-16" style={{ background: "linear-gradient(135deg, #0D2419 0%, #1A3A2A 60%, #2D5A3D 100%)" }}>
        {/* Decorative patterns */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #C9963A 1px, transparent 1px), radial-gradient(circle at 80% 20%, #C9963A 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: "linear-gradient(to top, white, transparent)" }} />

        {/* Placeholder bg */}
        <div className="absolute inset-0 opacity-20 flex items-center justify-center text-gray-400 text-xs pointer-events-none">
          <div className="border-2 border-dashed border-gray-500 rounded-2xl px-8 py-4">Placeholder — Land Photo Background</div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs px-4 py-2 rounded-full mb-6 tracking-widest uppercase">
            🏆 Trusted Real Estate Brand · Serving Ogun State
          </div>
          <h1 className="heading text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Affordable Lands &<br /><span className="gold italic">Properties You Can Trust</span>
          </h1>
          <p className="text-green-200 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Secure genuine land in Sagamu, Ikenne and Ogun State with <strong className="text-white">full documentation</strong> and zero stress.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => scrollTo("properties")} className="bg-gold text-white px-8 py-4 rounded-full font-semibold text-base hover:opacity-90 transition-all shadow-lg" style={{ background: "#C9963A" }}>
              View Available Lands →
            </button>
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-full font-semibold text-base flex items-center justify-center gap-2 transition-all shadow-lg">
              💬 Chat on WhatsApp
            </a>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-green-300 text-sm">
            <span className="flex items-center gap-1">✓ Registered Business</span>
            <span className="flex items-center gap-1">✓ Verified Documents</span>
            <span className="flex items-center gap-1">✓ Physical Inspections</span>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div className="relative">
              <img src="/src/assets/alabama_pic.png" alt="Alabama - Owner" className="rounded-3xl h-80 sm:h-96 w-full object-cover" />
              <div className="absolute -bottom-4 -right-4 bg-forest text-white px-6 py-3 rounded-2xl shadow-xl" style={{ background: "#1A3A2A" }}>
                <span className="gold font-bold text-2xl heading">XX+</span>
                <p className="text-xs text-green-300">Years of Experience</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-5">
              <div className="inline-block gold text-xs font-semibold tracking-widest uppercase border-b-2 border-gold pb-1" style={{ borderColor: "#C9963A", color: "#C9963A" }}>About Us</div>
              <h2 className="heading text-4xl sm:text-5xl font-bold text-forest leading-tight" style={{ color: "#1A3A2A" }}>
                Alabama Ona's<br /><span className="gold italic">Multibiz Enterprises</span>
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We are a registered real estate business based in Sagamu/Ikenne, Ogun State, dedicated to helping <strong>families, professionals, and investors</strong> acquire genuine land and property safely — without fraud, without stress.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Founded with a mission to bring transparency and trust to Nigerian land transactions, Alabama Ona's Multibiz Enterprises has helped hundreds of clients secure their dream plots with verified documentation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "✅ Registered Real Estate Business",
                  "📋 Verified Land Documents",
                  "💳 Flexible Payment Options",
                  "🔍 Physical Site Inspections Available",
                ].map(item => (
                  <div key={item} className="flex items-center gap-2 bg-green-50 rounded-xl px-4 py-3 text-sm text-gray-700 font-medium border border-green-100">
                    {item}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-full px-4 py-2 text-xs font-semibold">🏅 Registered Business</div>
                <div className="bg-green-50 border border-green-200 text-green-800 rounded-full px-4 py-2 text-xs font-semibold">🌍 Serving Ogun State</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 px-6" style={{ background: "linear-gradient(180deg, #f9f7f4 0%, #ffffff 100%)" }}>
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-14">
            <div className="gold text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#C9963A" }}>Our Services</div>
            <h2 className="heading text-4xl sm:text-5xl font-bold text-forest" style={{ color: "#1A3A2A" }}>What We Offer</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.1}>
                <div className="card-hover bg-white rounded-3xl p-7 shadow-sm border border-gray-100 text-center h-full">
                  <div className="text-5xl mb-4">{s.icon}</div>
                  <h3 className="heading text-xl font-bold text-forest mb-3" style={{ color: "#1A3A2A" }}>{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PROPERTIES */}
      <section id="properties" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-14">
            <div className="gold text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#C9963A" }}>Listings</div>
            <h2 className="heading text-4xl sm:text-5xl font-bold text-forest" style={{ color: "#1A3A2A" }}>Available Lands & Properties</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">All listings come with verified documentation. Site inspection available on request.</p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {properties.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.07}>
                <div className="card-hover bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 flex flex-col">
                <div className="relative h-48 overflow-hidden">
  <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
  {p.tag && (
    <div className="absolute top-3 left-3 bg-gold text-white text-xs font-bold px-3 py-1 rounded-full" style={{ background: "#C9963A" }}>
      {p.tag}
    </div>
  )}
</div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="heading font-bold text-lg text-forest" style={{ color: "#1A3A2A" }}>{p.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full font-medium">📍 {p.location}</span>
                      <span className="bg-amber-50 text-amber-700 text-xs px-3 py-1 rounded-full font-medium">📐 {p.size}</span>
                    </div>
                    <p className="text-gray-500 text-sm flex-1 mb-4 leading-relaxed">{p.desc}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="heading font-bold text-xl gold" style={{ color: "#C9963A" }}>{p.price}</span>
                      <a href={`${WHATSAPP_LINK}?text=Hello%2C%20I'm%20interested%20in%20${encodeURIComponent(p.title + ' - ' + p.location)}`} target="_blank" rel="noreferrer"
                        className="bg-green-500 hover:bg-green-400 text-white text-xs px-4 py-2.5 rounded-full font-semibold flex items-center gap-1.5 transition-colors">
                        💬 Inquire
                      </a>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="why-choose-us" className="py-20 px-6" style={{ background: "#1A3A2A" }}>
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-14">
            <div className="text-amber-400 text-xs font-semibold tracking-widest uppercase mb-3">Our Promise</div>
            <h2 className="heading text-4xl sm:text-5xl font-bold text-white">Why Clients Trust Us</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyUs.map((w, i) => (
              <FadeIn key={w.text} delay={i * 0.08}>
                <div className="card-hover bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/10 flex items-start gap-4">
                  <div className="text-3xl shrink-0">{w.icon}</div>
                  <p className="text-white text-sm leading-relaxed font-light">{w.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <div className="gold text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#C9963A" }}>Client Stories</div>
            <h2 className="heading text-4xl sm:text-5xl font-bold text-forest mb-12" style={{ color: "#1A3A2A" }}>What Our Clients Say</h2>

            <div className="relative overflow-hidden" style={{ minHeight: "220px" }}>
              {testimonials.map((t, i) => (
                <div key={i} style={{ position: "absolute", inset: 0, opacity: i === testimonialIdx ? 1 : 0, transform: i === testimonialIdx ? "translateX(0)" : "translateX(40px)", transition: "all 0.6s ease", pointerEvents: i === testimonialIdx ? "auto" : "none" }}>
                  <div className="bg-green-50 rounded-3xl p-8 border border-green-100 shadow-sm">
                    <StarRating n={t.stars} />
                    <p className="text-gray-700 text-lg leading-relaxed mt-4 mb-6 italic heading">"{t.text}"</p>
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-xs border-2 border-dashed border-gray-300">👤</div>
                      <span className="font-semibold text-forest" style={{ color: "#1A3A2A" }}>{t.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-16">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setTestimonialIdx(i)}
                  className="w-3 h-3 rounded-full transition-all"
                  style={{ background: i === testimonialIdx ? "#C9963A" : "#d1d5db" }} />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 px-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #C9963A 0%, #a67725 100%)" }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, white 0px, white 1px, transparent 1px, transparent 20px)" }} />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <FadeIn>
            <h2 className="heading text-4xl sm:text-5xl font-bold text-white mb-4">
              Ready to Own Land<br />in Ogun State?
            </h2>
            <p className="text-amber-100 text-lg mb-10">Don't wait — genuine plots are selling fast. Book your site inspection or message us today.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`${WHATSAPP_LINK}?text=Hello%2C%20I%20want%20to%20book%20a%20site%20inspection`} target="_blank" rel="noreferrer"
                className="bg-white text-amber-700 px-8 py-4 rounded-full font-bold text-base hover:bg-amber-50 transition-all shadow-lg">
                🗓️ Book Site Inspection
              </a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer"
                className="bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-full font-bold text-base flex items-center justify-center gap-2 shadow-lg transition-all">
                💬 Chat on WhatsApp Now
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <FadeIn>
            <div className="gold text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#C9963A" }}>Get In Touch</div>
            <h2 className="heading text-4xl font-bold text-forest mb-6" style={{ color: "#1A3A2A" }}>Contact Us</h2>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl">
                <span className="text-2xl">📞</span>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Phone</p>
                  <p className="text-gray-500 text-sm">+234 XXX XXX XXXX (Placeholder)</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-2xl">
                <span className="text-2xl">💬</span>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">WhatsApp</p>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="text-green-600 text-sm font-medium hover:underline">+234 XXX XXX XXXX (Placeholder)</a>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl">
                <span className="text-2xl">✉️</span>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Email</p>
                  <p className="text-gray-500 text-sm">info@alabamaona.com (Placeholder)</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Office Address</p>
                  <p className="text-gray-500 text-sm">Sagamu / Ikenne, Ogun State (Placeholder)</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-gray-50 rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="heading text-2xl font-bold text-forest mb-6" style={{ color: "#1A3A2A" }}>Send a Message</h3>
              {submitted ? (
                <div className="text-center py-10">
                  <div className="text-5xl mb-4">✅</div>
                  <h4 className="font-bold text-lg text-green-700">Message Sent!</h4>
                  <p className="text-gray-500 text-sm mt-2">We'll respond shortly via WhatsApp or phone.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                    <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                      placeholder="Enter your full name"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <input required type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                      placeholder="+234 XXX XXX XXXX"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                    <textarea required value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                      placeholder="Tell us what you're looking for..."
                      rows={4}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white resize-none" />
                  </div>
                  <button type="submit" className="w-full bg-forest text-white py-4 rounded-xl font-semibold text-sm hover:opacity-90 transition-all" style={{ background: "#1A3A2A" }}>
                    Send Message →
                  </button>
                  <p className="text-xs text-gray-400 text-center">Or reach us instantly on <a href={WHATSAPP_LINK} className="text-green-600 font-medium">WhatsApp</a></p>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-forest text-white pt-16 pb-8 px-6" style={{ background: "#0D2419" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="heading text-xl font-bold mb-2">
                <span className="gold">ALABAMA ONA'S</span><br />MULTIBIZ ENTERPRISES
              </div>
              <p className="text-green-300 text-sm leading-relaxed mt-3 max-w-xs">
                Your trusted real estate partner in Ogun State. Helping families and investors secure genuine land with peace of mind.
              </p>
              <div className="flex gap-3 mt-5">
                {["📘", "📸", "🎵"].map((icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold transition-colors text-lg" style={{}}>
                    {icon}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4 text-amber-400 tracking-wider uppercase">Quick Links</h4>
              <ul className="space-y-2">
                {navLinks.map(l => (
                  <li key={l}><button onClick={() => scrollTo(sectionId(l))} className="text-green-300 hover:text-white text-sm transition-colors">{l}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4 text-amber-400 tracking-wider uppercase">Contact</h4>
              <div className="space-y-2 text-green-300 text-sm">
                <p>📞 +234 XXX XXX XXXX</p>
                <p>✉️ info@alabamaona.com</p>
                <p>📍 Sagamu / Ikenne,<br />&nbsp;&nbsp;&nbsp;&nbsp;Ogun State</p>
                <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full text-xs font-semibold mt-2 hover:bg-green-400 transition-colors">
                  💬 WhatsApp Us
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-green-900 pt-6 text-center text-green-500 text-xs">
            © {new Date().getFullYear()} Alabama Ona's Multibiz Enterprises. All rights reserved. · Ogun State, Nigeria
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-3xl wa-pulse hover:bg-green-400 transition-colors"
        title="Chat on WhatsApp">
        💬
      </a>
    </div>
  );
}