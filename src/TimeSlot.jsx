import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Clock, Check, CheckCircle2, Search, MapPin, Star, Calendar as CalendarIcon,
  ChevronLeft, ChevronRight, Menu, X, Users, TrendingUp, DollarSign, Scissors,
  Dumbbell, Stethoscope, GraduationCap, Camera, Briefcase, Plus, Trash2, Edit2,
  Heart, LogOut, ShieldCheck, BarChart3, Settings, Bell, ArrowRight, Filter,
  ChevronDown, AlertCircle, Sparkles, Building2, Repeat
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

/* ============================== THEME ============================== */
const T = {
  teal: "#1B4D4A",
  tealDark: "#123634",
  tealLight: "#E8F0EF",
  coral: "#FF6B4A",
  coralDark: "#E85A3A",
  cream: "#FAF8F5",
  ink: "#16302E",
  sub: "#5C7370",
  border: "#E3E0D9",
};

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');`;

const CATEGORY_META = {
  Salon: { icon: Scissors, color: "#C9576B" },
  Fitness: { icon: Dumbbell, color: "#3E7C59" },
  Clinic: { icon: Stethoscope, color: "#2E6E8E" },
  Tutoring: { icon: GraduationCap, color: "#8B5E34" },
  Photography: { icon: Camera, color: "#6A4C93" },
  Consulting: { icon: Briefcase, color: "#1B4D4A" },
};

/* ============================== SEED DATA ============================== */
const DOW = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const defaultHours = { open: "09:00", close: "18:00", closedDays: [0] };

function seedBusinesses() {
  return [
    { id: "b1", name: "Glow Salon", category: "Salon", location: "Gulberg, Lahore", description: "Premium hair, skin & bridal styling studio with 8 years of experience making people feel their best.", rating: 4.8, ratingCount: 132, plan: "Growth", staffCount: 4, status: "approved", ownerEmail: "owner@glowsalon.pk", hours: defaultHours,
      services: [
        { id: "s1", name: "Haircut & Style", price: 1500, duration: 45, description: "Wash, cut and blow-dry finish." },
        { id: "s2", name: "Bridal Makeup", price: 15000, duration: 120, description: "Full bridal look with trial included." },
        { id: "s3", name: "Manicure & Pedicure", price: 2200, duration: 60, description: "Classic mani-pedi with polish." },
      ] },
    { id: "b2", name: "Ahmed's Tutoring", category: "Tutoring", location: "DHA, Karachi", description: "One-on-one and small group tutoring for O/A-Level Maths and Physics by a Cambridge-certified tutor.", rating: 4.9, ratingCount: 87, plan: "Growth", staffCount: 2, status: "approved", ownerEmail: "owner@ahmedtutoring.pk", hours: { open: "14:00", close: "20:00", closedDays: [0] },
      services: [
        { id: "s4", name: "O-Level Maths (1hr)", price: 2000, duration: 60, description: "Focused problem-solving session." },
        { id: "s5", name: "A-Level Physics (1.5hr)", price: 3000, duration: 90, description: "Concept building + past papers." },
      ] },
    { id: "b3", name: "FitZone Gym", category: "Fitness", location: "F-7, Islamabad", description: "Personal training studio with certified coaches for strength, weight-loss and mobility programs.", rating: 4.6, ratingCount: 210, plan: "Free", staffCount: 1, status: "approved", ownerEmail: "owner@fitzone.pk", hours: { open: "06:00", close: "22:00", closedDays: [] },
      services: [
        { id: "s6", name: "Personal Training Session", price: 2500, duration: 60, description: "1-on-1 strength & conditioning." },
        { id: "s7", name: "Nutrition Consultation", price: 1800, duration: 45, description: "Custom meal plan review." },
      ] },
    { id: "b4", name: "Horizon Consulting", category: "Consulting", location: "Clifton, Karachi", description: "Business strategy & financial advisory for small and medium enterprises.", rating: 4.7, ratingCount: 54, plan: "Growth", staffCount: 3, status: "approved", ownerEmail: "owner@horizon.pk", hours: defaultHours,
      services: [
        { id: "s8", name: "Strategy Session", price: 5000, duration: 60, description: "Deep-dive on growth roadmap." },
        { id: "s9", name: "Financial Review", price: 4000, duration: 45, description: "Books & cash-flow health check." },
      ] },
    { id: "b5", name: "Care Clinic", category: "Clinic", location: "Model Town, Lahore", description: "Family medicine clinic offering general consultations and routine check-ups.", rating: 4.5, ratingCount: 176, plan: "Growth", staffCount: 5, status: "approved", ownerEmail: "owner@careclinic.pk", hours: { open: "10:00", close: "21:00", closedDays: [] },
      services: [
        { id: "s10", name: "General Consultation", price: 1500, duration: 20, description: "Consult with a general physician." },
        { id: "s11", name: "Follow-up Visit", price: 800, duration: 15, description: "Quick follow-up check." },
      ] },
    { id: "b6", name: "Lens & Light Studio", category: "Photography", location: "Bahria Town, Rawalpindi", description: "Portrait, product and event photography with same-week edited delivery.", rating: 4.9, ratingCount: 63, plan: "Free", staffCount: 1, status: "approved", ownerEmail: "owner@lenslight.pk", hours: { open: "11:00", close: "19:00", closedDays: [1] },
      services: [
        { id: "s12", name: "Portrait Session (1hr)", price: 6000, duration: 60, description: "Studio portrait shoot, 10 edited photos." },
        { id: "s13", name: "Product Photography", price: 8000, duration: 90, description: "E-commerce ready product shots." },
      ] },
    { id: "b7", name: "Serenity Spa & Salon", category: "Salon", location: "Bahadurabad, Karachi", description: "Relaxation-focused salon offering spa treatments, facials and hair therapy.", rating: 4.7, ratingCount: 98, plan: "Free", staffCount: 3, status: "approved", ownerEmail: "owner@serenity.pk", hours: defaultHours,
      services: [
        { id: "s14", name: "Deep Cleansing Facial", price: 3000, duration: 60, description: "For all skin types." },
        { id: "s15", name: "Head & Shoulder Massage", price: 1800, duration: 30, description: "Stress-relief massage." },
      ] },
    { id: "b8", name: "PowerHouse Fitness", category: "Fitness", location: "Johar Town, Lahore", description: "CrossFit-style functional training gym with small group classes.", rating: 4.4, ratingCount: 145, plan: "Growth", staffCount: 6, status: "approved", ownerEmail: "owner@powerhouse.pk", hours: { open: "05:30", close: "21:30", closedDays: [] },
      services: [
        { id: "s16", name: "Group HIIT Class", price: 1000, duration: 45, description: "High-intensity group session." },
        { id: "s17", name: "1-on-1 Coaching", price: 3000, duration: 60, description: "Personalized coaching session." },
      ] },
    { id: "b9", name: "Bright Minds Academy", category: "Tutoring", location: "G-9, Islamabad", description: "K-12 tutoring center specializing in English, Maths and Science.", rating: 4.6, ratingCount: 72, plan: "Free", staffCount: 4, status: "approved", ownerEmail: "owner@brightminds.pk", hours: { open: "15:00", close: "20:30", closedDays: [0] },
      services: [
        { id: "s18", name: "Primary Maths (45min)", price: 1200, duration: 45, description: "Grades 3-5 foundational maths." },
        { id: "s19", name: "English Essay Writing", price: 1500, duration: 60, description: "Grades 6-10 writing skills." },
      ] },
    { id: "b10", name: "Skyline Business Advisory", category: "Consulting", location: "Blue Area, Islamabad", description: "Legal & tax advisory for startups and freelancers.", rating: 4.8, ratingCount: 41, plan: "Growth", staffCount: 2, status: "approved", ownerEmail: "owner@skyline.pk", hours: defaultHours,
      services: [
        { id: "s20", name: "Tax Filing Consultation", price: 3500, duration: 45, description: "Individual/freelancer tax help." },
        { id: "s21", name: "Company Registration Advice", price: 4500, duration: 60, description: "SECP registration guidance." },
      ] },
    { id: "b11", name: "Pulse Physiotherapy", category: "Clinic", location: "Cantt, Lahore", description: "Sports injury and post-surgery rehabilitation physiotherapy clinic.", rating: 4.9, ratingCount: 118, plan: "Growth", staffCount: 3, status: "approved", ownerEmail: "owner@pulsephysio.pk", hours: { open: "09:00", close: "20:00", closedDays: [0] },
      services: [
        { id: "s22", name: "Physio Assessment", price: 2500, duration: 45, description: "Initial injury assessment." },
        { id: "s23", name: "Rehab Session", price: 2000, duration: 45, description: "Ongoing rehab therapy." },
      ] },
    { id: "b12", name: "Frame & Story Photography", category: "Photography", location: "Askari 11, Lahore", description: "Wedding and event storytelling photography & videography.", rating: 4.7, ratingCount: 39, plan: "Free", staffCount: 2, status: "pending", ownerEmail: "owner@framestory.pk", hours: { open: "10:00", close: "18:00", closedDays: [0] },
      services: [
        { id: "s24", name: "Event Coverage (2hr)", price: 12000, duration: 120, description: "2-hour event photography." },
      ] },
  ];
}

function pad(n) { return n < 10 ? "0" + n : "" + n; }
function toISODate(d) { return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; }
function addDays(d, n) { const r = new Date(d); r.setDate(r.getDate() + n); return r; }
function timeToMin(t) { const [h, m] = t.split(":").map(Number); return h * 60 + m; }
function minToTime(m) { return `${pad(Math.floor(m / 60))}:${pad(m % 60)}`; }
function fmtTime12(t) { const [h, m] = t.split(":").map(Number); const ap = h >= 12 ? "PM" : "AM"; const h12 = h % 12 === 0 ? 12 : h % 12; return `${h12}:${pad(m)} ${ap}`; }
function fmtMoney(n) { return "PKR " + n.toLocaleString("en-PK"); }
function fmtDateShort(iso) { const d = new Date(iso + "T00:00:00"); return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }); }

function seedBookings(businesses) {
  const out = [];
  const today = new Date();
  const names = ["Sara Khan", "Bilal Ahmed", "Ayesha Malik", "Hamza Raza", "Fatima Noor", "Usman Tariq", "Zainab Iqbal", "Omar Farooq", "Mahnoor Shah", "Ali Hassan", "Sana Aziz", "Danish Iqbal"];
  let idc = 1;
  businesses.forEach((biz, bi) => {
    if (biz.status !== "approved") return;
    const bookingCount = 4 + (bi % 3);
    for (let i = 0; i < bookingCount; i++) {
      const dayOffset = (i % 2 === 0 ? -1 : 1) * (i + bi);
      const date = addDays(today, dayOffset % 20);
      const dow = date.getDay();
      if (biz.hours.closedDays.includes(dow)) continue;
      const svc = biz.services[i % biz.services.length];
      const openMin = timeToMin(biz.hours.open);
      const closeMin = timeToMin(biz.hours.close);
      const slotStart = openMin + ((i * 3) % Math.max(1, Math.floor((closeMin - openMin - svc.duration) / 30))) * 30;
      const name = names[(bi * 3 + i) % names.length];
      out.push({
        id: "bk" + idc++,
        businessId: biz.id,
        serviceId: svc.id,
        customerName: name,
        customerEmail: name.toLowerCase().replace(" ", ".") + "@example.com",
        date: toISODate(date),
        time: minToTime(slotStart),
        duration: svc.duration,
        price: svc.price,
        status: dayOffset < 0 ? "completed" : "upcoming",
        createdAt: Date.now() - Math.random() * 1e10,
      });
    }
  });
  return out;
}

function seedReviews(businesses) {
  const out = [];
  const samples = [
    ["Amazing experience, super professional!", 5], ["Really happy with the service, will book again.", 5],
    ["Good but had to wait a little.", 4], ["Friendly staff and great results.", 5],
    ["Decent value for the price.", 4], ["Best in the area, highly recommend.", 5],
    ["Clean space and courteous staff.", 4], ["Exceeded my expectations!", 5],
  ];
  const names = ["Sara K.", "Bilal A.", "Ayesha M.", "Hamza R.", "Fatima N.", "Usman T."];
  let idc = 1;
  businesses.forEach((biz) => {
    if (biz.status !== "approved") return;
    const n = 2 + (biz.id.length % 3);
    for (let i = 0; i < n; i++) {
      const [text, rating] = samples[(idc + i) % samples.length];
      out.push({ id: "rv" + idc++, businessId: biz.id, customerName: names[i % names.length], rating, comment: text, date: toISODate(addDays(new Date(), -(i * 5 + 2))) });
    }
  });
  return out;
}

/* ============================== STORAGE HOOK ============================== */
function useStore() {
  const [businesses, setBusinesses] = useState(null);
  const [bookings, setBookings] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [waitlist, setWaitlist] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        let biz, bk, rv, wl;
        try { biz = JSON.parse((await window.storage.get("ts:businesses", true)).value); } catch { biz = seedBusinesses(); await window.storage.set("ts:businesses", JSON.stringify(biz), true); }
        try { bk = JSON.parse((await window.storage.get("ts:bookings", true)).value); } catch { bk = seedBookings(biz); await window.storage.set("ts:bookings", JSON.stringify(bk), true); }
        try { rv = JSON.parse((await window.storage.get("ts:reviews", true)).value); } catch { rv = seedReviews(biz); await window.storage.set("ts:reviews", JSON.stringify(rv), true); }
        try { wl = JSON.parse((await window.storage.get("ts:waitlist", true)).value); } catch { wl = []; await window.storage.set("ts:waitlist", JSON.stringify(wl), true); }
        setBusinesses(biz); setBookings(bk); setReviews(rv); setWaitlist(wl);
      } catch (e) {
        setBusinesses(seedBusinesses()); setBookings([]); setReviews([]); setWaitlist([]);
      }
      setLoaded(true);
    })();
  }, []);

  const persist = useCallback(async (key, val) => {
    try { await window.storage.set(key, JSON.stringify(val), true); } catch (e) { /* ignore */ }
  }, []);

  const updateBusinesses = useCallback((updater) => {
    setBusinesses((prev) => { const next = updater(prev); persist("ts:businesses", next); return next; });
  }, [persist]);
  const updateBookings = useCallback((updater) => {
    setBookings((prev) => { const next = updater(prev); persist("ts:bookings", next); return next; });
  }, [persist]);
  const updateReviews = useCallback((updater) => {
    setReviews((prev) => { const next = updater(prev); persist("ts:reviews", next); return next; });
  }, [persist]);
  const updateWaitlist = useCallback((updater) => {
    setWaitlist((prev) => { const next = updater(prev); persist("ts:waitlist", next); return next; });
  }, [persist]);

  return { businesses, bookings, reviews, waitlist, loaded, updateBusinesses, updateBookings, updateReviews, updateWaitlist };
}

/* ============================== SMALL UI PARTS ============================== */
function Logo({ size = 28, dark = false }) {
  return (
    <div className="flex items-center gap-2">
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="18" stroke={dark ? "#fff" : T.teal} strokeWidth="2.5" />
        <path d="M20 10V20L26 24" stroke={dark ? "#fff" : T.teal} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 20L17 24L27 13" stroke={T.coral} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
      </svg>
      <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: size * 0.62, color: dark ? "#fff" : T.teal, letterSpacing: "-0.02em" }}>TimeSlot</span>
    </div>
  );
}

function Btn({ children, variant = "primary", onClick, className = "", type = "button", size = "md", disabled }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed";
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-5 py-2.5 text-sm", lg: "px-7 py-3.5 text-base" };
  const variants = {
    primary: { backgroundColor: T.coral, color: "#fff" },
    dark: { backgroundColor: T.teal, color: "#fff" },
    outline: { backgroundColor: "transparent", color: T.teal, border: `1.5px solid ${T.teal}` },
    ghost: { backgroundColor: "transparent", color: T.teal },
    danger: { backgroundColor: "#FCE8E6", color: "#B3261E" },
  };
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`${base} ${sizes[size]} ${className}`}
      style={variants[variant]}
      onMouseEnter={(e) => { if (variant === "primary") e.currentTarget.style.backgroundColor = T.coralDark; if (variant === "dark") e.currentTarget.style.backgroundColor = T.tealDark; }}
      onMouseLeave={(e) => { if (variant === "primary") e.currentTarget.style.backgroundColor = T.coral; if (variant === "dark") e.currentTarget.style.backgroundColor = T.teal; }}>
      {children}
    </button>
  );
}

function Badge({ children, tone = "teal" }) {
  const tones = {
    teal: { background: T.tealLight, color: T.teal },
    coral: { background: "#FFE9E2", color: T.coralDark },
    gray: { background: "#F1F0EC", color: "#6B6B63" },
    green: { background: "#E6F4EA", color: "#1E7A34" },
    amber: { background: "#FEF3E2", color: "#B4720A" },
  };
  return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold" style={tones[tone]}>{children}</span>;
}

function Card({ children, className = "", onClick, hover }) {
  return (
    <div onClick={onClick} className={`rounded-2xl bg-white border transition-all ${hover ? "hover:shadow-lg hover:-translate-y-0.5 cursor-pointer" : ""} ${className}`}
      style={{ borderColor: T.border, boxShadow: "0 1px 3px rgba(27,77,74,0.06)" }}>
      {children}
    </div>
  );
}

function Stars({ rating, size = 14 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size} fill={i <= Math.round(rating) ? T.coral : "none"} color={i <= Math.round(rating) ? T.coral : "#D8D4CB"} />
      ))}
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <label className="block">
      {label && <span className="block text-sm font-medium mb-1.5" style={{ color: T.ink }}>{label}</span>}
      <input {...props} className={`w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none transition-colors focus:ring-2 ${props.className || ""}`}
        style={{ borderColor: T.border, backgroundColor: "#fff", "--tw-ring-color": T.teal + "33" }} />
    </label>
  );
}

function Select({ label, children, ...props }) {
  return (
    <label className="block">
      {label && <span className="block text-sm font-medium mb-1.5" style={{ color: T.ink }}>{label}</span>}
      <select {...props} className="w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none bg-white" style={{ borderColor: T.border }}>
        {children}
      </select>
    </label>
  );
}

function EmptyState({ icon: Icon = AlertCircle, title, sub, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: T.tealLight }}>
        <Icon size={24} color={T.teal} />
      </div>
      <h3 className="font-bold text-lg mb-1" style={{ color: T.ink, fontFamily: "Manrope,sans-serif" }}>{title}</h3>
      {sub && <p className="text-sm max-w-sm" style={{ color: T.sub }}>{sub}</p>}
      {action}
    </div>
  );
}

/* ============================== NAV ============================== */
function NavBar({ page, go, user, logout }) {
  const [open, setOpen] = useState(false);
  const links = [
    { id: "home", label: "Home" },
    { id: "search", label: "Browse" },
    { id: "pricing", label: "Pricing" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];
  return (
    <div className="sticky top-0 z-40 backdrop-blur-md" style={{ backgroundColor: "rgba(250,248,245,0.92)", borderBottom: `1px solid ${T.border}` }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
        <button onClick={() => go("home")}><Logo /></button>
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <button key={l.id} onClick={() => go(l.id)} className="text-sm font-medium transition-colors"
              style={{ color: page === l.id ? T.coral : T.ink }}>{l.label}</button>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          {!user && (
            <>
              <button onClick={() => go("login")} className="text-sm font-semibold" style={{ color: T.teal }}>Log in</button>
              <Btn onClick={() => go("onboarding")}>Start free trial</Btn>
            </>
          )}
          {user && user.type === "customer" && (
            <>
              <button onClick={() => go("customerDashboard")} className="text-sm font-semibold flex items-center gap-1.5" style={{ color: T.teal }}><Users size={16} />{user.name.split(" ")[0]}</button>
              <button onClick={logout} title="Log out" className="p-2 rounded-lg hover:bg-black/5"><LogOut size={16} color={T.sub} /></button>
            </>
          )}
          {user && user.type === "business" && (
            <>
              <button onClick={() => go("businessDashboard")} className="text-sm font-semibold flex items-center gap-1.5" style={{ color: T.teal }}><Building2 size={16} />Dashboard</button>
              <button onClick={logout} title="Log out" className="p-2 rounded-lg hover:bg-black/5"><LogOut size={16} color={T.sub} /></button>
            </>
          )}
          {user && user.type === "admin" && (
            <>
              <button onClick={() => go("admin")} className="text-sm font-semibold flex items-center gap-1.5" style={{ color: T.teal }}><ShieldCheck size={16} />Admin</button>
              <button onClick={logout} title="Log out" className="p-2 rounded-lg hover:bg-black/5"><LogOut size={16} color={T.sub} /></button>
            </>
          )}
        </div>
        <button className="md:hidden" onClick={() => setOpen((o) => !o)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
      {open && (
        <div className="md:hidden px-5 pb-4 flex flex-col gap-3" style={{ borderTop: `1px solid ${T.border}` }}>
          {links.map((l) => (<button key={l.id} onClick={() => { go(l.id); setOpen(false); }} className="text-left py-1.5 text-sm font-medium">{l.label}</button>))}
          {!user && <><button onClick={() => { go("login"); setOpen(false); }} className="text-left py-1.5 text-sm font-semibold" style={{ color: T.teal }}>Log in</button><Btn onClick={() => { go("onboarding"); setOpen(false); }}>Start free trial</Btn></>}
          {user && <button onClick={() => { logout(); setOpen(false); }} className="text-left py-1.5 text-sm font-semibold" style={{ color: T.coral }}>Log out</button>}
        </div>
      )}
    </div>
  );
}

function Footer({ go }) {
  return (
    <div style={{ backgroundColor: T.tealDark, color: "#fff" }} className="mt-24">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <Logo dark />
          <p className="mt-3 text-sm max-w-xs" style={{ color: "#B9CBC8" }}>Book it. Don't chase it. The simplest way for small businesses and freelancers across Pakistan to manage bookings online.</p>
          <div className="flex gap-3 mt-4">
            <a href="#" className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>LinkedIn</a>
            <a href="#" className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>Instagram</a>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-bold mb-3">Product</h4>
          <div className="flex flex-col gap-2 text-sm" style={{ color: "#B9CBC8" }}>
            <button className="text-left" onClick={() => go("search")}>Browse businesses</button>
            <button className="text-left" onClick={() => go("pricing")}>Pricing</button>
            <button className="text-left" onClick={() => go("onboarding")}>List your business</button>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-bold mb-3">Company</h4>
          <div className="flex flex-col gap-2 text-sm" style={{ color: "#B9CBC8" }}>
            <button className="text-left" onClick={() => go("about")}>About</button>
            <button className="text-left" onClick={() => go("contact")}>Contact</button>
            <span>hello.timeslot@gmail.com</span>
          </div>
        </div>
      </div>
      <div className="text-center text-xs py-5" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", color: "#8FA9A5" }}>© 2026 TimeSlot. Serving businesses across Pakistan. Designed & Developed by Atika Nawaz.</div>
    </div>
  );
}

/* ============================== HOMEPAGE ============================== */
function Homepage({ go, businesses }) {
  const approved = (businesses || []).filter((b) => b.status === "approved");
  const categories = Object.keys(CATEGORY_META);
  return (
    <div>
      <section className="relative overflow-hidden" style={{ backgroundColor: T.cream }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8 pt-16 pb-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge tone="coral"><Sparkles size={12} />Trusted by 500+ businesses across Pakistan</Badge>
            <h1 className="mt-5 font-extrabold leading-[1.05] tracking-tight" style={{ fontFamily: "Manrope,sans-serif", fontSize: "clamp(2.3rem,4.5vw,3.6rem)", color: T.ink }}>
              Book it. <span style={{ color: T.coral }}>Don't chase it.</span>
            </h1>
            <p className="mt-5 text-lg max-w-lg" style={{ color: T.sub }}>TimeSlot lets salons, tutors, gyms, clinics and consultants take real bookings online live availability, zero double-bookings, zero back-and-forth messages.</p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Btn size="lg" onClick={() => go("onboarding")}>Start free trial <ArrowRight size={18} /></Btn>
              <Btn size="lg" variant="outline" onClick={() => go("search")}>Browse businesses</Btn>
            </div>
            <div className="flex items-center gap-6 mt-9">
              <div><div className="text-2xl font-extrabold" style={{ color: T.teal, fontFamily: "Manrope,sans-serif" }}>12k+</div><div className="text-xs" style={{ color: T.sub }}>Bookings made</div></div>
              <div className="w-px h-9" style={{ backgroundColor: T.border }} />
              <div><div className="text-2xl font-extrabold" style={{ color: T.teal, fontFamily: "Manrope,sans-serif" }}>500+</div><div className="text-xs" style={{ color: T.sub }}>Active businesses</div></div>
              <div className="w-px h-9" style={{ backgroundColor: T.border }} />
              <div><div className="text-2xl font-extrabold" style={{ color: T.teal, fontFamily: "Manrope,sans-serif" }}>0%</div><div className="text-xs" style={{ color: T.sub }}>Double-bookings</div></div>
            </div>
          </div>
          <div className="relative">
            <Card className="p-5 shadow-xl rotate-1">
              <div className="flex items-center justify-between mb-4">
                <div className="font-bold" style={{ color: T.ink, fontFamily: "Manrope,sans-serif" }}>Glow Salon</div>
                <Badge tone="green">Available today</Badge>
              </div>
              <div className="text-xs mb-2 font-semibold" style={{ color: T.sub }}>TODAY · Wed 12</div>
              <div className="grid grid-cols-4 gap-2">
                {["10:00", "10:45", "11:30", "1:00", "2:15", "3:00", "4:30", "5:15"].map((t, i) => (
                  <div key={t} className="text-center py-2 rounded-lg text-xs font-semibold" style={{ backgroundColor: i === 2 ? T.coral : T.tealLight, color: i === 2 ? "#fff" : T.teal }}>{t}</div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-xl flex items-center gap-3" style={{ backgroundColor: T.cream }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: T.coral }}><Check size={16} color="#fff" /></div>
                <div className="text-xs" style={{ color: T.ink }}><span className="font-semibold">Booking confirmed</span><br />11:30 AM · Haircut & Style</div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-20">
        <h2 className="text-center font-extrabold text-3xl mb-2" style={{ fontFamily: "Manrope,sans-serif", color: T.ink }}>How TimeSlot works</h2>
        <p className="text-center mb-12" style={{ color: T.sub }}>Three simple steps for customers and businesses alike.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Search, title: "Find & compare", body: "Search businesses by category, location and live availability." },
            { icon: CalendarIcon, title: "Pick a live slot", body: "See real open times and book instantly no calls, no waiting for replies." },
            { icon: CheckCircle2, title: "Get confirmed", body: "Instant confirmation with reminders, so nobody forgets." },
          ].map((s, i) => (
            <Card key={i} className="p-7">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: T.tealLight }}><s.icon size={20} color={T.teal} /></div>
              <h3 className="font-bold text-lg mb-1.5" style={{ fontFamily: "Manrope,sans-serif", color: T.ink }}>{s.title}</h3>
              <p className="text-sm" style={{ color: T.sub }}>{s.body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section style={{ backgroundColor: T.tealLight }} className="py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <h2 className="text-center font-extrabold text-3xl mb-2" style={{ fontFamily: "Manrope,sans-serif", color: T.ink }}>Built for every kind of business</h2>
          <p className="text-center mb-12" style={{ color: T.sub }}>From salons to clinics, TimeSlot adapts to how you work.</p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {categories.map((c) => {
              const meta = CATEGORY_META[c];
              return (
                <button key={c} onClick={() => go("search", { category: c })} className="bg-white rounded-2xl p-5 flex flex-col items-center gap-2.5 hover:-translate-y-1 transition-transform" style={{ boxShadow: "0 1px 3px rgba(27,77,74,0.08)" }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: meta.color + "1A" }}><meta.icon size={20} color={meta.color} /></div>
                  <span className="text-sm font-semibold" style={{ color: T.ink }}>{c}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-extrabold text-3xl" style={{ fontFamily: "Manrope,sans-serif", color: T.ink }}>Popular right now</h2>
            <p style={{ color: T.sub }}>Businesses customers are booking most this week.</p>
          </div>
          <button onClick={() => go("search")} className="hidden md:flex items-center gap-1 text-sm font-semibold" style={{ color: T.coral }}>View all <ArrowRight size={15} /></button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {approved.slice(0, 4).map((b) => <BusinessCard key={b.id} b={b} go={go} />)}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 lg:px-8 pb-20">
        <h2 className="text-center font-extrabold text-3xl mb-12" style={{ fontFamily: "Manrope,sans-serif", color: T.ink }}>What business owners say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { n: "Ayesha, Glow Salon", t: "We stopped losing customers to slow WhatsApp replies. Bookings come in while we sleep.", r: 5 },
            { n: "Ahmed, Ahmed's Tutoring", t: "My schedule used to be chaos across three group chats. Now it's just... calm.", r: 5 },
            { n: "Bilal, FitZone Gym", t: "The waitlist feature alone paid for the subscription in the first week.", r: 5 },
          ].map((tt, i) => (
            <Card key={i} className="p-6">
              <Stars rating={tt.r} />
              <p className="mt-3 text-sm" style={{ color: T.ink }}>"{tt.t}"</p>
              <p className="mt-4 text-xs font-semibold" style={{ color: T.sub }}>{tt.n}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-5 lg:px-8 pb-24">
        <Card className="p-10 text-center" hover={false}>
          <h2 className="font-extrabold text-2xl mb-2" style={{ fontFamily: "Manrope,sans-serif", color: T.ink }}>Simple pricing for every stage</h2>
          <p style={{ color: T.sub }} className="mb-6">Start free. Upgrade when you're ready to grow.</p>
          <div className="flex justify-center gap-3">
            <Btn onClick={() => go("pricing")}>See pricing</Btn>
            <Btn variant="outline" onClick={() => go("onboarding")}>Start free trial</Btn>
          </div>
        </Card>
      </section>
    </div>
  );
}

function BusinessCard({ b, go }) {
  const meta = CATEGORY_META[b.category] || CATEGORY_META.Consulting;
  const minPrice = Math.min(...b.services.map((s) => s.price));
  return (
    <Card hover onClick={() => go("business", { id: b.id })} className="overflow-hidden flex flex-col">
      <div className="h-28 flex items-center justify-center" style={{ backgroundColor: meta.color + "1A" }}>
        <meta.icon size={34} color={meta.color} />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between">
          <Badge tone="gray">{b.category}</Badge>
          <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: T.ink }}><Star size={12} fill={T.coral} color={T.coral} />{b.rating}</div>
        </div>
        <h3 className="font-bold mt-2" style={{ fontFamily: "Manrope,sans-serif", color: T.ink }}>{b.name}</h3>
        <p className="text-xs flex items-center gap-1 mt-1" style={{ color: T.sub }}><MapPin size={12} />{b.location}</p>
        <div className="mt-auto pt-3 text-xs font-semibold" style={{ color: T.teal }}>From {fmtMoney(minPrice)}</div>
      </div>
    </Card>
  );
}

/* ============================== SEARCH PAGE ============================== */
function SearchPage({ go, businesses, params }) {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState(params?.category || "All");
  const [location, setLocation] = useState("All");
  const [maxPrice, setMaxPrice] = useState(20000);
  const [availability, setAvailability] = useState("any");

  useEffect(() => { if (params?.category) setCategory(params.category); }, [params]);

  const approved = (businesses || []).filter((b) => b.status === "approved");
  const locations = ["All", ...new Set(approved.map((b) => b.location.split(",").pop().trim()))];

  const filtered = approved.filter((b) => {
    if (q && !b.name.toLowerCase().includes(q.toLowerCase()) && !b.category.toLowerCase().includes(q.toLowerCase())) return false;
    if (category !== "All" && b.category !== category) return false;
    if (location !== "All" && !b.location.includes(location)) return false;
    const minP = Math.min(...b.services.map((s) => s.price));
    if (minP > maxPrice) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-10">
      <h1 className="font-extrabold text-3xl mb-1" style={{ fontFamily: "Manrope,sans-serif", color: T.ink }}>Browse businesses</h1>
      <p style={{ color: T.sub }} className="mb-7">{filtered.length} businesses found</p>
      <div className="grid lg:grid-cols-[260px_1fr] gap-8">
        <Card className="p-5 h-fit sticky top-20" hover={false}>
          <div className="mb-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" color={T.sub} />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search businesses..." className="w-full pl-9 pr-3 py-2.5 rounded-lg border text-sm outline-none" style={{ borderColor: T.border }} />
            </div>
          </div>
          <div className="mb-4">
            <Select label="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>All</option>
              {Object.keys(CATEGORY_META).map((c) => <option key={c}>{c}</option>)}
            </Select>
          </div>
          <div className="mb-4">
            <Select label="Location" value={location} onChange={(e) => setLocation(e.target.value)}>
              {locations.map((l) => <option key={l}>{l}</option>)}
            </Select>
          </div>
          <div className="mb-4">
            <span className="block text-sm font-medium mb-1.5" style={{ color: T.ink }}>Max price: {fmtMoney(maxPrice)}</span>
            <input type="range" min="500" max="20000" step="500" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-current" style={{ accentColor: T.coral }} />
          </div>
          <div className="mb-2">
            <span className="block text-sm font-medium mb-1.5" style={{ color: T.ink }}>Availability</span>
            <div className="flex flex-col gap-1.5">
              {[["any", "Any time"], ["today", "Available today"], ["week", "Available this week"]].map(([v, l]) => (
                <label key={v} className="flex items-center gap-2 text-sm" style={{ color: T.ink }}>
                  <input type="radio" checked={availability === v} onChange={() => setAvailability(v)} style={{ accentColor: T.teal }} />{l}
                </label>
              ))}
            </div>
          </div>
          <button onClick={() => { setQ(""); setCategory("All"); setLocation("All"); setMaxPrice(20000); setAvailability("any"); }} className="text-xs font-semibold mt-2" style={{ color: T.coral }}>Reset filters</button>
        </Card>
        <div>
          {filtered.length === 0 ? (
            <EmptyState icon={Search} title="No businesses match your filters" sub="Try widening your search or clearing a filter." />
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((b) => <BusinessCard key={b.id} b={b} go={go} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================== BUSINESS PROFILE ============================== */
function BusinessProfile({ go, businesses, reviews, id, user, favorites, toggleFavorite }) {
  const b = (businesses || []).find((x) => x.id === id);
  if (!b) return <div className="max-w-3xl mx-auto py-24 px-5"><EmptyState title="Business not found" action={<Btn onClick={() => go("search")} className="mt-3">Browse businesses</Btn>} /></div>;
  const meta = CATEGORY_META[b.category] || CATEGORY_META.Consulting;
  const bizReviews = (reviews || []).filter((r) => r.businessId === b.id);
  const isFav = favorites?.[b.id];

  return (
    <div>
      <div className="h-56" style={{ backgroundColor: meta.color + "1A" }}>
        <div className="max-w-6xl mx-auto px-5 lg:px-8 h-full flex items-end pb-6">
          <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center shadow-md -mb-2"><meta.icon size={34} color={meta.color} /></div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-5 lg:px-8 py-8 grid lg:grid-cols-[1fr_340px] gap-10">
        <div>
          <div className="flex items-start justify-between">
            <div>
              <Badge tone="gray">{b.category}</Badge>
              <h1 className="font-extrabold text-3xl mt-2" style={{ fontFamily: "Manrope,sans-serif", color: T.ink }}>{b.name}</h1>
              <div className="flex items-center gap-3 mt-2 text-sm" style={{ color: T.sub }}>
                <span className="flex items-center gap-1"><Star size={14} fill={T.coral} color={T.coral} /> {b.rating} ({b.ratingCount} reviews)</span>
                <span className="flex items-center gap-1"><MapPin size={14} />{b.location}</span>
              </div>
            </div>
            <button onClick={() => toggleFavorite(b.id)} className="p-2.5 rounded-full border" style={{ borderColor: T.border }}>
              <Heart size={18} fill={isFav ? T.coral : "none"} color={isFav ? T.coral : T.sub} />
            </button>
          </div>
          <p className="mt-5 text-sm leading-relaxed" style={{ color: T.ink }}>{b.description}</p>

          <div className="mt-9">
            <h2 className="font-bold text-xl mb-4" style={{ fontFamily: "Manrope,sans-serif", color: T.ink }}>Services</h2>
            <div className="flex flex-col gap-3">
              {b.services.map((s) => (
                <Card key={s.id} className="p-4 flex items-center justify-between gap-4" hover={false}>
                  <div>
                    <div className="font-semibold" style={{ color: T.ink }}>{s.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: T.sub }}>{s.description}</div>
                    <div className="text-xs mt-1 flex items-center gap-1" style={{ color: T.sub }}><Clock size={12} />{s.duration} min</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-bold" style={{ color: T.teal }}>{fmtMoney(s.price)}</div>
                    <Btn size="sm" className="mt-2" onClick={() => go("booking", { businessId: b.id, serviceId: s.id })}>Book</Btn>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-9">
            <h2 className="font-bold text-xl mb-4" style={{ fontFamily: "Manrope,sans-serif", color: T.ink }}>Reviews ({bizReviews.length})</h2>
            <div className="flex flex-col gap-4">
              {bizReviews.length === 0 && <p className="text-sm" style={{ color: T.sub }}>No reviews yet.</p>}
              {bizReviews.map((r) => (
                <div key={r.id} className="pb-4" style={{ borderBottom: `1px solid ${T.border}` }}>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm" style={{ color: T.ink }}>{r.customerName}</span>
                    <span className="text-xs" style={{ color: T.sub }}>{fmtDateShort(r.date)}</span>
                  </div>
                  <Stars rating={r.rating} size={12} />
                  <p className="text-sm mt-1.5" style={{ color: T.ink }}>{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Card className="p-5 sticky top-20" hover={false}>
            <h3 className="font-bold mb-3" style={{ color: T.ink }}>Working hours</h3>
            <div className="text-sm flex flex-col gap-1.5" style={{ color: T.sub }}>
              {DOW.map((d, i) => (
                <div key={d} className="flex justify-between"><span className="capitalize">{d}</span><span>{b.hours.closedDays.includes(i) ? "Closed" : `${fmtTime12(b.hours.open)} – ${fmtTime12(b.hours.close)}`}</span></div>
              ))}
            </div>
            <Btn className="w-full mt-5" onClick={() => go("booking", { businessId: b.id, serviceId: b.services[0].id })}>Book now</Btn>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ============================== BOOKING FLOW ============================== */
function generateSlots(business, dateISO, durationMin, bookings) {
  const date = new Date(dateISO + "T00:00:00");
  const dow = date.getDay();
  if (business.hours.closedDays.includes(dow)) return [];
  const openMin = timeToMin(business.hours.open);
  const closeMin = timeToMin(business.hours.close);
  const isToday = toISODate(new Date()) === dateISO;
  const nowMin = new Date().getHours() * 60 + new Date().getMinutes();
  const existing = bookings.filter((bk) => bk.businessId === business.id && bk.date === dateISO && bk.status !== "cancelled");
  const slots = [];
  for (let t = openMin; t + durationMin <= closeMin; t += 30) {
    if (isToday && t <= nowMin) continue;
    const conflict = existing.some((bk) => {
      const s = timeToMin(bk.time), e = s + bk.duration;
      return t < e && t + durationMin > s;
    });
    if (!conflict) slots.push(minToTime(t));
  }
  return slots;
}

function BookingFlow({ go, businesses, bookings, updateBookings, updateWaitlist, waitlist, user, setToast }) {
  const params = window.__tsBookingParams || {};
  const business = (businesses || []).find((b) => b.id === params.businessId);
  const [serviceId, setServiceId] = useState(params.serviceId);
  const [step, setStep] = useState(1);
  const [dateOffset, setDateOffset] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", phone: "", notes: "" });
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  if (!business) return <div className="max-w-3xl mx-auto py-24 px-5"><EmptyState title="Business not found" action={<Btn onClick={() => go("search")} className="mt-3">Browse businesses</Btn>} /></div>;
  const service = business.services.find((s) => s.id === serviceId) || business.services[0];

  const dates = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i));
  const activeDate = addDays(new Date(), dateOffset);
  const activeISO = toISODate(activeDate);
  const slots = useMemo(() => generateSlots(business, activeISO, service.duration, bookings || []), [business, activeISO, service, bookings]);

  function confirmBooking() {
    const nb = {
      id: "bk" + Date.now(),
      businessId: business.id,
      serviceId: service.id,
      customerName: form.name,
      customerEmail: form.email,
      customerPhone: form.phone,
      notes: form.notes,
      date: activeISO,
      time: selectedTime,
      duration: service.duration,
      price: service.price,
      status: "upcoming",
      createdAt: Date.now(),
    };
    updateBookings((prev) => [...prev, nb]);
    setConfirmedBooking(nb);
    setStep(4);
  }

  function joinWaitlist() {
    updateWaitlist((prev) => [...prev, { id: "wl" + Date.now(), businessId: business.id, serviceId: service.id, date: activeISO, customerName: form.name || user?.name || "Guest", email: form.email || user?.email || "" }]);
    setToast("You're on the waitlist we'll notify you if a slot opens up.");
  }

  if (step === 4 && confirmedBooking) {
    return <ConfirmationPage go={go} booking={confirmedBooking} business={business} service={service} />;
  }

  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      <button onClick={() => go("business", { id: business.id })} className="text-sm font-semibold flex items-center gap-1 mb-5" style={{ color: T.teal }}><ChevronLeft size={16} />Back to {business.name}</button>
      <div className="flex items-center gap-2 mb-8">
        {["Service", "Time", "Details", "Confirm"].map((label, i) => (
          <div key={label} className="flex items-center gap-2 flex-1">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ backgroundColor: step > i ? T.teal : "#fff", color: step > i ? "#fff" : T.sub, border: `1.5px solid ${step > i ? T.teal : T.border}` }}>{i + 1}</div>
            <span className="text-xs font-semibold hidden sm:inline" style={{ color: step > i ? T.teal : T.sub }}>{label}</span>
            {i < 3 && <div className="flex-1 h-px" style={{ backgroundColor: T.border }} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <Card className="p-6" hover={false}>
          <h2 className="font-bold text-xl mb-4" style={{ color: T.ink }}>Select a service</h2>
          <div className="flex flex-col gap-3">
            {business.services.map((s) => (
              <label key={s.id} className="flex items-center justify-between p-4 rounded-xl border cursor-pointer" style={{ borderColor: serviceId === s.id ? T.teal : T.border, backgroundColor: serviceId === s.id ? T.tealLight : "#fff" }}>
                <div className="flex items-center gap-3">
                  <input type="radio" checked={serviceId === s.id} onChange={() => setServiceId(s.id)} style={{ accentColor: T.teal }} />
                  <div><div className="font-semibold text-sm" style={{ color: T.ink }}>{s.name}</div><div className="text-xs" style={{ color: T.sub }}>{s.duration} min</div></div>
                </div>
                <div className="font-bold text-sm" style={{ color: T.teal }}>{fmtMoney(s.price)}</div>
              </label>
            ))}
          </div>
          <Btn className="mt-6" onClick={() => setStep(2)}>Continue <ArrowRight size={16} /></Btn>
        </Card>
      )}

      {step === 2 && (
        <Card className="p-6" hover={false}>
          <h2 className="font-bold text-xl mb-4" style={{ color: T.ink }}>Pick a date & time</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
            {dates.map((d, i) => {
              const iso = toISODate(d);
              const closed = business.hours.closedDays.includes(d.getDay());
              return (
                <button key={iso} disabled={closed} onClick={() => { setDateOffset(i); setSelectedTime(null); }} className="shrink-0 w-16 py-2.5 rounded-xl text-center border disabled:opacity-35"
                  style={{ borderColor: dateOffset === i ? T.teal : T.border, backgroundColor: dateOffset === i ? T.teal : "#fff", color: dateOffset === i ? "#fff" : T.ink }}>
                  <div className="text-[10px] font-semibold uppercase">{d.toLocaleDateString("en-US", { weekday: "short" })}</div>
                  <div className="text-sm font-bold">{d.getDate()}</div>
                </button>
              );
            })}
          </div>
          {slots.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm mb-3" style={{ color: T.sub }}>No open slots on {fmtDateShort(activeISO)}. Fully booked or closed.</p>
              <Btn variant="outline" onClick={joinWaitlist}>Join waitlist for this day</Btn>
            </div>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
              {slots.map((t) => (
                <button key={t} onClick={() => setSelectedTime(t)} className="py-2.5 rounded-lg text-sm font-semibold border" style={{ borderColor: selectedTime === t ? T.coral : T.border, backgroundColor: selectedTime === t ? T.coral : "#fff", color: selectedTime === t ? "#fff" : T.ink }}>{fmtTime12(t)}</button>
              ))}
            </div>
          )}
          <div className="flex gap-3 mt-6">
            <Btn variant="outline" onClick={() => setStep(1)}>Back</Btn>
            <Btn disabled={!selectedTime} onClick={() => setStep(3)}>Continue <ArrowRight size={16} /></Btn>
          </div>
        </Card>
      )}

      {step === 3 && (
        <Card className="p-6" hover={false}>
          <h2 className="font-bold text-xl mb-4" style={{ color: T.ink }}>Your details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
            <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
            <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="03xx-xxxxxxx" />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1.5" style={{ color: T.ink }}>Notes (optional)</label>
            <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} className="w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none" style={{ borderColor: T.border }} placeholder="Anything the business should know" />
          </div>
          <Card className="p-4 mt-5" hover={false}>
            <div className="flex justify-between text-sm mb-1"><span style={{ color: T.sub }}>{service.name}</span><span className="font-semibold" style={{ color: T.ink }}>{fmtMoney(service.price)}</span></div>
            <div className="flex justify-between text-sm"><span style={{ color: T.sub }}>{fmtDateShort(activeISO)} · {fmtTime12(selectedTime)}</span><span style={{ color: T.sub }}>{service.duration} min</span></div>
            <div className="mt-2 pt-2 text-xs flex items-center gap-1" style={{ color: T.sub, borderTop: `1px solid ${T.border}` }}><AlertCircle size={12} />Free cancellation up to 24 hours before your appointment.</div>
          </Card>
          <div className="flex gap-3 mt-6">
            <Btn variant="outline" onClick={() => setStep(2)}>Back</Btn>
            <Btn disabled={!form.name || !form.email} onClick={confirmBooking}>Confirm booking <Check size={16} /></Btn>
          </div>
        </Card>
      )}
    </div>
  );
}

function ConfirmationPage({ go, booking, business, service }) {
  return (
    <div className="max-w-xl mx-auto px-5 py-16 text-center">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: "#E6F4EA" }}><CheckCircle2 size={30} color="#1E7A34" /></div>
      <h1 className="font-extrabold text-2xl mb-1" style={{ fontFamily: "Manrope,sans-serif", color: T.ink }}>Booking confirmed!</h1>
      <p style={{ color: T.sub }} className="mb-8">A confirmation has been sent to {booking.customerEmail}.</p>
      <Card className="p-6 text-left" hover={false}>
        <div className="flex items-center justify-between pb-3" style={{ borderBottom: `1px solid ${T.border}` }}>
          <div><div className="font-bold" style={{ color: T.ink }}>{business.name}</div><div className="text-xs" style={{ color: T.sub }}>{business.location}</div></div>
          <Badge tone="green">Confirmed</Badge>
        </div>
        <div className="py-3 flex flex-col gap-2 text-sm" style={{ borderBottom: `1px solid ${T.border}` }}>
          <div className="flex justify-between"><span style={{ color: T.sub }}>Service</span><span className="font-semibold" style={{ color: T.ink }}>{service.name}</span></div>
          <div className="flex justify-between"><span style={{ color: T.sub }}>Date & time</span><span className="font-semibold" style={{ color: T.ink }}>{fmtDateShort(booking.date)}, {fmtTime12(booking.time)}</span></div>
          <div className="flex justify-between"><span style={{ color: T.sub }}>Duration</span><span className="font-semibold" style={{ color: T.ink }}>{booking.duration} min</span></div>
          <div className="flex justify-between"><span style={{ color: T.sub }}>Price</span><span className="font-semibold" style={{ color: T.teal }}>{fmtMoney(booking.price)}</span></div>
        </div>
        <p className="pt-3 text-xs flex items-center gap-1" style={{ color: T.sub }}><AlertCircle size={12} />Free cancellation up to 24 hours before. Manage this booking anytime from your dashboard.</p>
      </Card>
      <div className="flex gap-3 justify-center mt-7">
        <Btn variant="outline" onClick={() => go("customerDashboard")}>View my bookings</Btn>
        <Btn onClick={() => go("search")}>Book something else</Btn>
      </div>
    </div>
  );
}

/* ============================== LOGIN / ONBOARDING ============================== */
function LoginPage({ go, businesses, setUser, setToast }) {
  const [tab, setTab] = useState("customer");
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [code, setCode] = useState("");

  function loginCustomer() {
    if (!name || !email) return setToast("Enter your name and email.");
    setUser({ type: "customer", name, email });
    go("customerDashboard");
  }
  function loginBusiness() {
    const biz = (businesses || []).find((b) => b.ownerEmail.toLowerCase() === email.toLowerCase());
    if (!biz) return setToast("No business found for that email. Try onboarding instead.");
    setUser({ type: "business", businessId: biz.id, name: biz.name, email });
    go("businessDashboard");
  }
  function loginAdmin() {
    if (code !== "timeslot-admin") return setToast("Incorrect admin passcode.");
    setUser({ type: "admin", name: "Admin" });
    go("admin");
  }

  return (
    <div className="max-w-md mx-auto px-5 py-16">
      <h1 className="font-extrabold text-2xl mb-1 text-center" style={{ fontFamily: "Manrope,sans-serif", color: T.ink }}>Welcome back</h1>
      <p className="text-center mb-7 text-sm" style={{ color: T.sub }}>Log in to manage your bookings.</p>
      <div className="flex gap-1 p-1 rounded-xl mb-6" style={{ backgroundColor: T.tealLight }}>
        {[["customer", "Customer"], ["business", "Business"], ["admin", "Admin"]].map(([v, l]) => (
          <button key={v} onClick={() => setTab(v)} className="flex-1 py-2 rounded-lg text-sm font-semibold" style={{ backgroundColor: tab === v ? "#fff" : "transparent", color: tab === v ? T.teal : T.sub }}>{l}</button>
        ))}
      </div>
      <Card className="p-6" hover={false}>
        {tab === "customer" && (
          <div className="flex flex-col gap-4">
            <Input label="Full name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
            <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            <Btn onClick={loginCustomer}>Continue</Btn>
            <p className="text-xs text-center" style={{ color: T.sub }}>No password needed for this demo just your name and email.</p>
          </div>
        )}
        {tab === "business" && (
          <div className="flex flex-col gap-4">
            <Input label="Business email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="owner@yourbusiness.pk" />
            <p className="text-xs" style={{ color: T.sub }}>Try: owner@glowsalon.pk (sample business)</p>
            <Btn onClick={loginBusiness}>Log in to dashboard</Btn>
            <button onClick={() => go("onboarding")} className="text-xs font-semibold text-center" style={{ color: T.coral }}>Don't have a business yet? Start free trial</button>
          </div>
        )}
        {tab === "admin" && (
          <div className="flex flex-col gap-4">
            <Input label="Admin passcode" type="password" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter passcode" />
            <p className="text-xs" style={{ color: T.sub }}>Demo passcode: timeslot-admin</p>
            <Btn onClick={loginAdmin}>Log in as admin</Btn>
          </div>
        )}
      </Card>
    </div>
  );
}

function OnboardingPage({ go, updateBusinesses, setUser, setToast }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", category: "Salon", location: "", description: "", ownerEmail: "", open: "09:00", close: "18:00", closedDays: [0] });
  const [services, setServices] = useState([{ name: "", price: "", duration: "60", description: "" }]);

  function toggleClosedDay(i) {
    setForm((f) => ({ ...f, closedDays: f.closedDays.includes(i) ? f.closedDays.filter((d) => d !== i) : [...f.closedDays, i] }));
  }
  function addServiceRow() { setServices((s) => [...s, { name: "", price: "", duration: "60", description: "" }]); }
  function removeServiceRow(i) { setServices((s) => s.filter((_, idx) => idx !== i)); }
  function updateServiceRow(i, field, val) { setServices((s) => s.map((row, idx) => idx === i ? { ...row, [field]: val } : row)); }

  function submit() {
    if (!form.name || !form.ownerEmail || !form.location) { setToast("Fill in your business name, location and email."); setStep(1); return; }
    const validServices = services.filter((s) => s.name && s.price);
    if (validServices.length === 0) { setToast("Add at least one service."); setStep(2); return; }
    const id = "b" + Date.now();
    const newBiz = {
      id, name: form.name, category: form.category, location: form.location, description: form.description || `${form.name} booked through TimeSlot.`,
      rating: 5.0, ratingCount: 0, plan: "Growth", staffCount: 1, status: "pending", ownerEmail: form.ownerEmail,
      hours: { open: form.open, close: form.close, closedDays: form.closedDays },
      services: validServices.map((s, i) => ({ id: id + "-s" + i, name: s.name, price: Number(s.price), duration: Number(s.duration), description: s.description || "" })),
    };
    updateBusinesses((prev) => [...prev, newBiz]);
    setUser({ type: "business", businessId: id, name: newBiz.name, email: form.ownerEmail });
    setStep(4);
  }

  if (step === 4) {
    return (
      <div className="max-w-lg mx-auto px-5 py-20 text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: "#E6F4EA" }}><CheckCircle2 size={30} color="#1E7A34" /></div>
        <h1 className="font-extrabold text-2xl mb-2" style={{ fontFamily: "Manrope,sans-serif", color: T.ink }}>You're all set!</h1>
        <p style={{ color: T.sub }} className="mb-2">Your 14-day Growth trial has started no card required.</p>
        <p style={{ color: T.sub }} className="mb-8 text-sm">Your listing is pending a quick admin review before it appears in search (usually under 24 hours). You can manage services and view bookings right away from your dashboard.</p>
        <Btn onClick={() => go("businessDashboard")}>Go to my dashboard <ArrowRight size={16} /></Btn>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-12">
      <h1 className="font-extrabold text-3xl mb-1" style={{ fontFamily: "Manrope,sans-serif", color: T.ink }}>List your business</h1>
      <p style={{ color: T.sub }} className="mb-8">Start your 14-day Growth trial no card required.</p>
      <div className="flex items-center gap-2 mb-8">
        {["Business info", "Services", "Hours"].map((l, i) => (
          <div key={l} className="flex items-center gap-2 flex-1">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ backgroundColor: step > i ? T.teal : "#fff", color: step > i ? "#fff" : T.sub, border: `1.5px solid ${step > i ? T.teal : T.border}` }}>{i + 1}</div>
            <span className="text-xs font-semibold hidden sm:inline" style={{ color: step > i ? T.teal : T.sub }}>{l}</span>
            {i < 2 && <div className="flex-1 h-px" style={{ backgroundColor: T.border }} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <Card className="p-6" hover={false}>
          <div className="flex flex-col gap-4">
            <Input label="Business name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Glow Salon" />
            <Select label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {Object.keys(CATEGORY_META).map((c) => <option key={c}>{c}</option>)}
            </Select>
            <Input label="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g. Gulberg, Lahore" />
            <Input label="Owner email" type="email" value={form.ownerEmail} onChange={(e) => setForm({ ...form, ownerEmail: e.target.value })} placeholder="you@business.pk" />
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: T.ink }}>Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none" style={{ borderColor: T.border }} placeholder="Tell customers what makes your business great" />
            </div>
          </div>
          <Btn className="mt-6" onClick={() => setStep(2)}>Continue</Btn>
        </Card>
      )}

      {step === 2 && (
        <Card className="p-6" hover={false}>
          <h3 className="font-bold mb-3" style={{ color: T.ink }}>Your services</h3>
          <div className="flex flex-col gap-4">
            {services.map((s, i) => (
              <div key={i} className="p-4 rounded-xl border relative" style={{ borderColor: T.border }}>
                {services.length > 1 && <button onClick={() => removeServiceRow(i)} className="absolute top-3 right-3"><Trash2 size={15} color={T.sub} /></button>}
                <div className="grid sm:grid-cols-2 gap-3">
                  <Input label="Service name" value={s.name} onChange={(e) => updateServiceRow(i, "name", e.target.value)} placeholder="e.g. Haircut & Style" />
                  <Input label="Price (PKR)" type="number" value={s.price} onChange={(e) => updateServiceRow(i, "price", e.target.value)} placeholder="1500" />
                  <Select label="Duration" value={s.duration} onChange={(e) => updateServiceRow(i, "duration", e.target.value)}>
                    {[15, 20, 30, 45, 60, 90, 120].map((d) => <option key={d} value={d}>{d} min</option>)}
                  </Select>
                  <Input label="Short description" value={s.description} onChange={(e) => updateServiceRow(i, "description", e.target.value)} placeholder="Optional" />
                </div>
              </div>
            ))}
          </div>
          <button onClick={addServiceRow} className="mt-3 text-sm font-semibold flex items-center gap-1" style={{ color: T.coral }}><Plus size={15} />Add another service</button>
          <div className="flex gap-3 mt-6"><Btn variant="outline" onClick={() => setStep(1)}>Back</Btn><Btn onClick={() => setStep(3)}>Continue</Btn></div>
        </Card>
      )}

      {step === 3 && (
        <Card className="p-6" hover={false}>
          <h3 className="font-bold mb-3" style={{ color: T.ink }}>Working hours</h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <Input label="Opens at" type="time" value={form.open} onChange={(e) => setForm({ ...form, open: e.target.value })} />
            <Input label="Closes at" type="time" value={form.close} onChange={(e) => setForm({ ...form, close: e.target.value })} />
          </div>
          <span className="block text-sm font-medium mb-1.5" style={{ color: T.ink }}>Closed on</span>
          <div className="flex flex-wrap gap-2 mb-6">
            {DOW.map((d, i) => (
              <button key={d} onClick={() => toggleClosedDay(i)} className="px-3 py-1.5 rounded-lg text-xs font-semibold capitalize border" style={{ borderColor: form.closedDays.includes(i) ? T.coral : T.border, backgroundColor: form.closedDays.includes(i) ? "#FFE9E2" : "#fff", color: form.closedDays.includes(i) ? T.coralDark : T.ink }}>{d}</button>
            ))}
          </div>
          <Card className="p-4 mb-6" hover={false}>
            <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: T.teal }}><Sparkles size={15} />14-day Growth trial included no card required</div>
            <p className="text-xs mt-1" style={{ color: T.sub }}>Unlimited bookings, up to 5 staff, no TimeSlot branding on emails.</p>
          </Card>
          <div className="flex gap-3"><Btn variant="outline" onClick={() => setStep(2)}>Back</Btn><Btn onClick={submit}>Finish & start trial <Check size={16} /></Btn></div>
        </Card>
      )}
    </div>
  );
}

/* ============================== CUSTOMER DASHBOARD ============================== */
function CustomerDashboard({ go, user, businesses, bookings, updateBookings, favorites, toggleFavorite, reviews, updateReviews, setToast }) {
  const [tab, setTab] = useState("upcoming");
  const [reviewFor, setReviewFor] = useState(null);
  const [rating, setRating] = useState(5); const [comment, setComment] = useState("");
  if (!user) return <div className="max-w-md mx-auto py-24 px-5"><EmptyState title="Please log in" sub="Log in to view your bookings." action={<Btn onClick={() => go("login")} className="mt-3">Log in</Btn>} /></div>;

  const mine = (bookings || []).filter((b) => b.customerEmail.toLowerCase() === user.email.toLowerCase());
  const upcoming = mine.filter((b) => b.status === "upcoming").sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  const past = mine.filter((b) => b.status !== "upcoming").sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time));
  const favBizIds = Object.keys(favorites || {}).filter((k) => favorites[k]);
  const favBiz = (businesses || []).filter((b) => favBizIds.includes(b.id));

  function cancelBooking(id) {
    updateBookings((prev) => prev.map((b) => b.id === id ? { ...b, status: "cancelled" } : b));
    setToast("Booking cancelled.");
  }
  function rescheduleBooking(id) {
    setToast("Reschedule request sent pick a new time from the business page.");
    const bk = mine.find((b) => b.id === id);
    if (bk) { updateBookings((prev) => prev.map((b) => b.id === id ? { ...b, status: "cancelled" } : b)); go("booking", { businessId: bk.businessId, serviceId: bk.serviceId }); }
  }
  function submitReview() {
    updateReviews((prev) => [...prev, { id: "rv" + Date.now(), businessId: reviewFor.businessId, customerName: user.name, rating, comment, date: toISODate(new Date()) }]);
    setToast("Thanks for your review!");
    setReviewFor(null); setComment(""); setRating(5);
  }

  return (
    <div className="max-w-5xl mx-auto px-5 py-10">
      <h1 className="font-extrabold text-3xl mb-1" style={{ fontFamily: "Manrope,sans-serif", color: T.ink }}>Hi, {user.name.split(" ")[0]}</h1>
      <p style={{ color: T.sub }} className="mb-7">Manage your bookings and favorite businesses.</p>
      <div className="flex gap-1 p-1 rounded-xl mb-6 w-fit" style={{ backgroundColor: T.tealLight }}>
        {[["upcoming", `Upcoming (${upcoming.length})`], ["past", `Past (${past.length})`], ["favorites", `Favorites (${favBiz.length})`]].map(([v, l]) => (
          <button key={v} onClick={() => setTab(v)} className="px-4 py-2 rounded-lg text-sm font-semibold" style={{ backgroundColor: tab === v ? "#fff" : "transparent", color: tab === v ? T.teal : T.sub }}>{l}</button>
        ))}
      </div>

      {tab === "upcoming" && (upcoming.length === 0 ? <EmptyState icon={CalendarIcon} title="No upcoming bookings" sub="Browse businesses and book your next appointment." action={<Btn onClick={() => go("search")} className="mt-4">Browse businesses</Btn>} /> : (
        <div className="flex flex-col gap-3">
          {upcoming.map((bk) => {
            const biz = businesses.find((b) => b.id === bk.businessId);
            const svc = biz?.services.find((s) => s.id === bk.serviceId);
            return (
              <Card key={bk.id} className="p-4 flex flex-wrap items-center justify-between gap-3" hover={false}>
                <div>
                  <div className="font-bold" style={{ color: T.ink }}>{biz?.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: T.sub }}>{svc?.name} · {fmtDateShort(bk.date)}, {fmtTime12(bk.time)}</div>
                </div>
                <div className="flex gap-2">
                  <Btn size="sm" variant="outline" onClick={() => rescheduleBooking(bk.id)}><Repeat size={13} />Reschedule</Btn>
                  <Btn size="sm" variant="danger" onClick={() => cancelBooking(bk.id)}>Cancel</Btn>
                </div>
              </Card>
            );
          })}
        </div>
      ))}

      {tab === "past" && (past.length === 0 ? <EmptyState icon={Clock} title="No past bookings yet" /> : (
        <div className="flex flex-col gap-3">
          {past.map((bk) => {
            const biz = businesses.find((b) => b.id === bk.businessId);
            const svc = biz?.services.find((s) => s.id === bk.serviceId);
            const alreadyReviewed = (reviews || []).some((r) => r.businessId === bk.businessId && r.customerName === user.name);
            return (
              <Card key={bk.id} className="p-4 flex flex-wrap items-center justify-between gap-3" hover={false}>
                <div>
                  <div className="font-bold flex items-center gap-2" style={{ color: T.ink }}>{biz?.name} {bk.status === "cancelled" ? <Badge tone="gray">Cancelled</Badge> : <Badge tone="green">Completed</Badge>}</div>
                  <div className="text-xs mt-0.5" style={{ color: T.sub }}>{svc?.name} · {fmtDateShort(bk.date)}, {fmtTime12(bk.time)}</div>
                </div>
                {bk.status !== "cancelled" && !alreadyReviewed && <Btn size="sm" variant="outline" onClick={() => setReviewFor(bk)}><Star size={13} />Leave review</Btn>}
              </Card>
            );
          })}
        </div>
      ))}

      {tab === "favorites" && (favBiz.length === 0 ? <EmptyState icon={Heart} title="No favorites yet" sub="Tap the heart on any business profile to save it here." /> : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{favBiz.map((b) => <BusinessCard key={b.id} b={b} go={go} />)}</div>
      ))}

      {reviewFor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5" style={{ backgroundColor: "rgba(20,30,29,0.5)" }} onClick={() => setReviewFor(null)}>
          <Card className="p-6 max-w-sm w-full" hover={false} onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold text-lg mb-3" style={{ color: T.ink }}>Rate your visit</h3>
            <div className="flex gap-1 mb-4">{[1, 2, 3, 4, 5].map((i) => (<button key={i} onClick={() => setRating(i)}><Star size={26} fill={i <= rating ? T.coral : "none"} color={i <= rating ? T.coral : "#D8D4CB"} /></button>))}</div>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={3} placeholder="How was your experience?" className="w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none mb-4" style={{ borderColor: T.border }} />
            <div className="flex gap-2"><Btn variant="outline" onClick={() => setReviewFor(null)} className="flex-1">Cancel</Btn><Btn onClick={submitReview} className="flex-1">Submit</Btn></div>
          </Card>
        </div>
      )}
    </div>
  );
}

/* ============================== BUSINESS DASHBOARD ============================== */
function BusinessDashboard({ go, user, businesses, updateBusinesses, bookings, updateBookings, setToast }) {
  const [tab, setTab] = useState("calendar");
  if (!user || user.type !== "business") return <div className="max-w-md mx-auto py-24 px-5"><EmptyState title="Business login required" action={<Btn onClick={() => go("login")} className="mt-3">Log in</Btn>} /></div>;
  const biz = businesses.find((b) => b.id === user.businessId);
  if (!biz) return null;
  const bizBookings = bookings.filter((b) => b.businessId === biz.id);

  return (
    <div className="max-w-7xl mx-auto px-5 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-extrabold text-3xl" style={{ fontFamily: "Manrope,sans-serif", color: T.ink }}>{biz.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge tone={biz.status === "approved" ? "green" : "amber"}>{biz.status === "approved" ? "Live" : "Pending review"}</Badge>
            <Badge tone="teal">{biz.plan} plan</Badge>
          </div>
        </div>
      </div>
      <div className="flex gap-1 p-1 rounded-xl mb-6 w-fit overflow-x-auto" style={{ backgroundColor: T.tealLight }}>
        {[["calendar", "Calendar"], ["services", "Services"], ["analytics", "Analytics"], ["settings", "Settings"]].map(([v, l]) => (
          <button key={v} onClick={() => setTab(v)} className="px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap" style={{ backgroundColor: tab === v ? "#fff" : "transparent", color: tab === v ? T.teal : T.sub }}>{l}</button>
        ))}
      </div>
      {tab === "calendar" && <BizCalendar biz={biz} bookings={bizBookings} updateBookings={updateBookings} setToast={setToast} />}
      {tab === "services" && <BizServices biz={biz} updateBusinesses={updateBusinesses} setToast={setToast} />}
      {tab === "analytics" && <BizAnalytics biz={biz} bookings={bizBookings} />}
      {tab === "settings" && <BizSettings biz={biz} updateBusinesses={updateBusinesses} setToast={setToast} go={go} />}
    </div>
  );
}

function BizCalendar({ biz, bookings, updateBookings, setToast }) {
  const [view, setView] = useState("week");
  const [weekStart, setWeekStart] = useState(0);
  const days = view === "week" ? Array.from({ length: 7 }, (_, i) => addDays(new Date(), weekStart * 7 + i)) : [addDays(new Date(), weekStart)];

  function markComplete(id) { updateBookings((prev) => prev.map((b) => b.id === id ? { ...b, status: "completed" } : b)); setToast("Marked as completed."); }
  function cancelBk(id) { updateBookings((prev) => prev.map((b) => b.id === id ? { ...b, status: "cancelled" } : b)); setToast("Booking cancelled."); }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ backgroundColor: T.tealLight }}>
          {[["day", "Day"], ["week", "Week"]].map(([v, l]) => (<button key={v} onClick={() => setView(v)} className="px-3.5 py-1.5 rounded-lg text-xs font-semibold" style={{ backgroundColor: view === v ? "#fff" : "transparent", color: view === v ? T.teal : T.sub }}>{l}</button>))}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setWeekStart((w) => w - 1)} className="p-1.5 rounded-lg border" style={{ borderColor: T.border }}><ChevronLeft size={15} /></button>
          <span className="text-sm font-semibold" style={{ color: T.ink }}>{fmtDateShort(toISODate(days[0]))}{view === "week" ? ` – ${fmtDateShort(toISODate(days[6]))}` : ""}</span>
          <button onClick={() => setWeekStart((w) => w + 1)} className="p-1.5 rounded-lg border" style={{ borderColor: T.border }}><ChevronRight size={15} /></button>
        </div>
      </div>
      <div className={`grid gap-3 ${view === "week" ? "md:grid-cols-7" : "grid-cols-1"}`}>
        {days.map((d) => {
          const iso = toISODate(d);
          const dayBookings = bookings.filter((b) => b.date === iso && b.status !== "cancelled").sort((a, b) => a.time.localeCompare(b.time));
          const closed = biz.hours.closedDays.includes(d.getDay());
          return (
            <Card key={iso} className="p-3" hover={false}>
              <div className="text-xs font-bold mb-2 flex items-center justify-between" style={{ color: T.ink }}>
                <span>{d.toLocaleDateString("en-US", { weekday: "short", day: "numeric" })}</span>
                {closed && <Badge tone="gray">Closed</Badge>}
              </div>
              {!closed && dayBookings.length === 0 && <p className="text-xs" style={{ color: T.sub }}>No bookings</p>}
              <div className="flex flex-col gap-2">
                {dayBookings.map((bk) => {
                  const svc = biz.services.find((s) => s.id === bk.serviceId);
                  return (
                    <div key={bk.id} className="p-2 rounded-lg" style={{ backgroundColor: bk.status === "completed" ? "#E6F4EA" : T.cream }}>
                      <div className="text-xs font-bold" style={{ color: T.ink }}>{fmtTime12(bk.time)} · {svc?.name}</div>
                      <div className="text-xs" style={{ color: T.sub }}>{bk.customerName}</div>
                      {bk.status === "upcoming" && (
                        <div className="flex gap-1 mt-1.5">
                          <button onClick={() => markComplete(bk.id)} className="text-[10px] font-semibold px-2 py-1 rounded" style={{ backgroundColor: T.teal, color: "#fff" }}>Complete</button>
                          <button onClick={() => cancelBk(bk.id)} className="text-[10px] font-semibold px-2 py-1 rounded" style={{ backgroundColor: "#FCE8E6", color: "#B3261E" }}>Cancel</button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function BizServices({ biz, updateBusinesses, setToast }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", duration: "60", description: "" });
  const [adding, setAdding] = useState(false);

  function startAdd() { setForm({ name: "", price: "", duration: "60", description: "" }); setAdding(true); setEditing(null); }
  function startEdit(s) { setForm({ name: s.name, price: s.price, duration: s.duration, description: s.description }); setEditing(s.id); setAdding(false); }
  function save() {
    if (!form.name || !form.price) return setToast("Fill in service name and price.");
    updateBusinesses((prev) => prev.map((b) => {
      if (b.id !== biz.id) return b;
      if (adding) return { ...b, services: [...b.services, { id: "s" + Date.now(), name: form.name, price: Number(form.price), duration: Number(form.duration), description: form.description }] };
      return { ...b, services: b.services.map((s) => s.id === editing ? { ...s, name: form.name, price: Number(form.price), duration: Number(form.duration), description: form.description } : s) };
    }));
    setToast(adding ? "Service added." : "Service updated.");
    setAdding(false); setEditing(null);
  }
  function remove(id) { updateBusinesses((prev) => prev.map((b) => b.id === biz.id ? { ...b, services: b.services.filter((s) => s.id !== id) } : b)); setToast("Service removed."); }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg" style={{ color: T.ink }}>Services</h2>
        <Btn size="sm" onClick={startAdd}><Plus size={14} />Add service</Btn>
      </div>
      <div className="flex flex-col gap-3">
        {biz.services.map((s) => (
          <Card key={s.id} className="p-4" hover={false}>
            {editing === s.id ? (
              <ServiceEditForm form={form} setForm={setForm} onSave={save} onCancel={() => setEditing(null)} />
            ) : (
              <div className="flex items-center justify-between">
                <div><div className="font-semibold" style={{ color: T.ink }}>{s.name}</div><div className="text-xs" style={{ color: T.sub }}>{s.duration} min · {fmtMoney(s.price)}</div></div>
                <div className="flex gap-2"><button onClick={() => startEdit(s)} className="p-2 rounded-lg border" style={{ borderColor: T.border }}><Edit2 size={14} color={T.teal} /></button><button onClick={() => remove(s.id)} className="p-2 rounded-lg border" style={{ borderColor: T.border }}><Trash2 size={14} color="#B3261E" /></button></div>
              </div>
            )}
          </Card>
        ))}
        {adding && <Card className="p-4" hover={false}><ServiceEditForm form={form} setForm={setForm} onSave={save} onCancel={() => setAdding(false)} /></Card>}
      </div>
    </div>
  );
}
function ServiceEditForm({ form, setForm, onSave, onCancel }) {
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3">
        <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input label="Price (PKR)" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <Select label="Duration" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })}>{[15, 20, 30, 45, 60, 90, 120].map((d) => <option key={d} value={d}>{d} min</option>)}</Select>
        <Input label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      </div>
      <div className="flex gap-2 mt-3"><Btn size="sm" onClick={onSave}>Save</Btn><Btn size="sm" variant="outline" onClick={onCancel}>Cancel</Btn></div>
    </div>
  );
}

function BizAnalytics({ biz, bookings }) {
  const now = new Date();
  const monthBookings = bookings.filter((b) => { const d = new Date(b.date); return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear() && b.status !== "cancelled"; });
  const revenue = monthBookings.reduce((sum, b) => sum + b.price, 0);
  const hourCounts = {};
  bookings.forEach((b) => { const h = timeToMin(b.time) / 60 | 0; hourCounts[h] = (hourCounts[h] || 0) + 1; });
  const busiestHour = Object.entries(hourCounts).sort((a, b) => b[1] - a[1])[0];
  const custCounts = {};
  bookings.forEach((b) => { custCounts[b.customerEmail] = (custCounts[b.customerEmail] || 0) + 1; });
  const repeatCustomers = Object.values(custCounts).filter((c) => c > 1).length;
  const totalCustomers = Object.keys(custCounts).length || 1;
  const repeatRate = Math.round((repeatCustomers / totalCustomers) * 100);

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const byDay = dayLabels.map((label, i) => ({ day: label, bookings: bookings.filter((b) => new Date(b.date).getDay() === i && b.status !== "cancelled").length }));

  const last8Weeks = Array.from({ length: 8 }, (_, i) => {
    const wkStart = addDays(now, (i - 7) * 7);
    const label = `W${i + 1}`;
    const rev = bookings.filter((b) => { const d = new Date(b.date); const diff = Math.floor((d - wkStart) / 86400000); return diff >= 0 && diff < 7 && b.status !== "cancelled"; }).reduce((s, b) => s + b.price, 0);
    return { week: label, revenue: rev };
  });

  const stats = [
    { label: "Total bookings", value: bookings.filter((b) => b.status !== "cancelled").length, icon: CalendarIcon },
    { label: "Revenue this month", value: fmtMoney(revenue), icon: DollarSign },
    { label: "Busiest hour", value: busiestHour ? fmtTime12(minToTime(Number(busiestHour[0]) * 60)) : "—", icon: TrendingUp },
    { label: "Repeat customer rate", value: repeatRate + "%", icon: Repeat },
  ];

  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <Card key={s.label} className="p-4" hover={false}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: T.tealLight }}><s.icon size={16} color={T.teal} /></div>
            <div className="text-xl font-extrabold" style={{ fontFamily: "Manrope,sans-serif", color: T.ink }}>{s.value}</div>
            <div className="text-xs" style={{ color: T.sub }}>{s.label}</div>
          </Card>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-5">
        <Card className="p-5" hover={false}>
          <h3 className="font-bold mb-4 text-sm" style={{ color: T.ink }}>Bookings by day of week</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={byDay}><CartesianGrid strokeDasharray="3 3" stroke={T.border} /><XAxis dataKey="day" tick={{ fontSize: 11 }} /><YAxis tick={{ fontSize: 11 }} allowDecimals={false} /><Tooltip /><Bar dataKey="bookings" fill={T.teal} radius={[4, 4, 0, 0]} /></BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-5" hover={false}>
          <h3 className="font-bold mb-4 text-sm" style={{ color: T.ink }}>Revenue trend (8 weeks)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={last8Weeks}><CartesianGrid strokeDasharray="3 3" stroke={T.border} /><XAxis dataKey="week" tick={{ fontSize: 11 }} /><YAxis tick={{ fontSize: 11 }} /><Tooltip formatter={(v) => fmtMoney(v)} /><Line type="monotone" dataKey="revenue" stroke={T.coral} strokeWidth={2.5} dot={false} /></LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

function BizSettings({ biz, updateBusinesses, setToast, go }) {
  const [form, setForm] = useState({ description: biz.description, open: biz.hours.open, close: biz.hours.close, closedDays: biz.hours.closedDays });
  function toggleDay(i) { setForm((f) => ({ ...f, closedDays: f.closedDays.includes(i) ? f.closedDays.filter((d) => d !== i) : [...f.closedDays, i] })); }
  function save() {
    updateBusinesses((prev) => prev.map((b) => b.id === biz.id ? { ...b, description: form.description, hours: { open: form.open, close: form.close, closedDays: form.closedDays } } : b));
    setToast("Settings saved.");
  }
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="p-6" hover={false}>
        <h3 className="font-bold mb-4" style={{ color: T.ink }}>Business info</h3>
        <label className="block text-sm font-medium mb-1.5" style={{ color: T.ink }}>Description</label>
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className="w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none mb-4" style={{ borderColor: T.border }} />
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Input label="Opens at" type="time" value={form.open} onChange={(e) => setForm({ ...form, open: e.target.value })} />
          <Input label="Closes at" type="time" value={form.close} onChange={(e) => setForm({ ...form, close: e.target.value })} />
        </div>
        <span className="block text-sm font-medium mb-1.5" style={{ color: T.ink }}>Closed on</span>
        <div className="flex flex-wrap gap-2 mb-5">
          {DOW.map((d, i) => (<button key={d} onClick={() => toggleDay(i)} className="px-3 py-1.5 rounded-lg text-xs font-semibold capitalize border" style={{ borderColor: form.closedDays.includes(i) ? T.coral : T.border, backgroundColor: form.closedDays.includes(i) ? "#FFE9E2" : "#fff", color: form.closedDays.includes(i) ? T.coralDark : T.ink }}>{d}</button>))}
        </div>
        <Btn onClick={save}>Save changes</Btn>
      </Card>
      <Card className="p-6" hover={false}>
        <h3 className="font-bold mb-4" style={{ color: T.ink }}>Your plan</h3>
        <div className="flex items-center justify-between p-4 rounded-xl mb-3" style={{ backgroundColor: T.tealLight }}>
          <div><div className="font-bold" style={{ color: T.teal }}>{biz.plan} plan</div><div className="text-xs" style={{ color: T.sub }}>{biz.plan === "Growth" ? "Unlimited bookings · up to 5 staff" : "Up to 20 bookings/month · 1 staff"}</div></div>
          <Badge tone="green">Trial active</Badge>
        </div>
        <Btn variant="outline" onClick={() => go("pricing")}>View plans</Btn>
        <div className="mt-6 pt-5" style={{ borderTop: `1px solid ${T.border}` }}>
          <h4 className="font-bold text-sm mb-1" style={{ color: T.ink }}>Referral program</h4>
          <p className="text-xs mb-3" style={{ color: T.sub }}>Get 1 free month for every business you refer that completes onboarding.</p>
          <div className="px-3 py-2 rounded-lg text-xs font-mono" style={{ backgroundColor: T.cream, border: `1px dashed ${T.border}`, color: T.ink }}>timeslot.pk/join?ref={biz.id}</div>
        </div>
      </Card>
    </div>
  );
}

/* ============================== ADMIN DASHBOARD ============================== */
function AdminDashboard({ go, user, businesses, updateBusinesses, bookings }) {
  const [tab, setTab] = useState("pending");
  const [categories, setCategories] = useState(Object.keys(CATEGORY_META));
  const [newCat, setNewCat] = useState("");
  if (!user || user.type !== "admin") return <div className="max-w-md mx-auto py-24 px-5"><EmptyState title="Admin login required" action={<Btn onClick={() => go("login")} className="mt-3">Log in</Btn>} /></div>;

  const pending = businesses.filter((b) => b.status === "pending");
  const approved = businesses.filter((b) => b.status === "approved");
  const totalRevenue = bookings.filter((b) => b.status !== "cancelled").reduce((s, b) => s + b.price, 0);

  function approve(id) { updateBusinesses((prev) => prev.map((b) => b.id === id ? { ...b, status: "approved" } : b)); }
  function reject(id) { updateBusinesses((prev) => prev.map((b) => b.id === id ? { ...b, status: "rejected" } : b)); }

  return (
    <div className="max-w-6xl mx-auto px-5 py-8">
      <h1 className="font-extrabold text-3xl mb-1" style={{ fontFamily: "Manrope,sans-serif", color: T.ink }}>Admin dashboard</h1>
      <p style={{ color: T.sub }} className="mb-6">Platform-wide oversight and moderation.</p>
      <div className="grid sm:grid-cols-4 gap-4 mb-6">
        {[["Approved businesses", approved.length, Building2], ["Pending review", pending.length, AlertCircle], ["Total bookings", bookings.length, CalendarIcon], ["Est. platform GMV", fmtMoney(totalRevenue), DollarSign]].map(([label, val, Icon]) => (
          <Card key={label} className="p-4" hover={false}><div className="w-9 h-9 rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: T.tealLight }}><Icon size={16} color={T.teal} /></div><div className="text-xl font-extrabold" style={{ color: T.ink, fontFamily: "Manrope,sans-serif" }}>{val}</div><div className="text-xs" style={{ color: T.sub }}>{label}</div></Card>
        ))}
      </div>
      <div className="flex gap-1 p-1 rounded-xl mb-6 w-fit" style={{ backgroundColor: T.tealLight }}>
        {[["pending", `Pending (${pending.length})`], ["businesses", "All businesses"], ["categories", "Categories"]].map(([v, l]) => (
          <button key={v} onClick={() => setTab(v)} className="px-4 py-2 rounded-lg text-sm font-semibold" style={{ backgroundColor: tab === v ? "#fff" : "transparent", color: tab === v ? T.teal : T.sub }}>{l}</button>
        ))}
      </div>
      {tab === "pending" && (pending.length === 0 ? <EmptyState icon={CheckCircle2} title="No pending approvals" sub="All caught up." /> : (
        <div className="flex flex-col gap-3">
          {pending.map((b) => (
            <Card key={b.id} className="p-4 flex flex-wrap items-center justify-between gap-3" hover={false}>
              <div><div className="font-bold" style={{ color: T.ink }}>{b.name}</div><div className="text-xs" style={{ color: T.sub }}>{b.category} · {b.location} · {b.ownerEmail}</div></div>
              <div className="flex gap-2"><Btn size="sm" onClick={() => approve(b.id)}><Check size={14} />Approve</Btn><Btn size="sm" variant="danger" onClick={() => reject(b.id)}>Reject</Btn></div>
            </Card>
          ))}
        </div>
      ))}
      {tab === "businesses" && (
        <div className="flex flex-col gap-3">
          {businesses.map((b) => (
            <Card key={b.id} className="p-4 flex flex-wrap items-center justify-between gap-3" hover={false}>
              <div><div className="font-bold" style={{ color: T.ink }}>{b.name}</div><div className="text-xs" style={{ color: T.sub }}>{b.category} · {b.location}</div></div>
              <Badge tone={b.status === "approved" ? "green" : b.status === "pending" ? "amber" : "gray"}>{b.status}</Badge>
            </Card>
          ))}
        </div>
      )}
      {tab === "categories" && (
        <Card className="p-5" hover={false}>
          <div className="flex gap-2 mb-4">
            <Input value={newCat} onChange={(e) => setNewCat(e.target.value)} placeholder="New category name" />
            <Btn onClick={() => { if (newCat) { setCategories((c) => [...c, newCat]); setNewCat(""); } }}>Add</Btn>
          </div>
          <div className="flex flex-wrap gap-2">{categories.map((c) => (<span key={c} className="px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2" style={{ backgroundColor: T.tealLight, color: T.teal }}>{c}<button onClick={() => setCategories((cs) => cs.filter((x) => x !== c))}><X size={12} /></button></span>))}</div>
        </Card>
      )}
    </div>
  );
}

/* ============================== STATIC PAGES ============================== */
function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-16">
      <Badge tone="coral">Our story</Badge>
      <h1 className="font-extrabold text-4xl mt-4 mb-6" style={{ fontFamily: "Manrope,sans-serif", color: T.ink }}>Built because chasing bookings shouldn't be the job.</h1>
      <p className="text-base leading-relaxed mb-4" style={{ color: T.ink }}>TimeSlot started with a simple observation: small businesses across Pakistan were losing real money not to competitors, but to slow replies, double-bookings, and messages that got buried in WhatsApp chats.</p>
      <p className="text-base leading-relaxed mb-4" style={{ color: T.ink }}>A salon owner in Lahore was juggling three phone numbers just to keep track of appointments. A tutor in Karachi was manually cross-checking a notebook before confirming every class. None of that time was making anyone money it was just overhead standing between a business and its next customer.</p>
      <p className="text-base leading-relaxed mb-4" style={{ color: T.ink }}>So we built TimeSlot: a booking platform where availability is always live, double-bookings are structurally impossible, and customers can book in the time it takes to send a text without waiting for one back.</p>
      <p className="text-base leading-relaxed" style={{ color: T.ink }}>Today, salons, tutors, gyms, clinics, consultants and photographers use TimeSlot to run their schedules so they can spend more time on the work, and less time chasing it.</p>
    </div>
  );
}

function PricingPage({ go }) {
  const plans = [
    { name: "Free", price: "PKR 0", sub: "/month", features: ["Up to 20 bookings/month", "1 staff member", "Live booking calendar", "Email confirmations", "TimeSlot branding on emails"], cta: "Start for free", variant: "outline" },
    { name: "Growth", price: "PKR 2,500", sub: "/month", features: ["Unlimited bookings", "Up to 5 staff members", "No TimeSlot branding", "Priority support", "Advanced analytics", "14-day free trial, no card required"], cta: "Start free trial", variant: "primary", featured: true },
  ];
  return (
    <div className="max-w-5xl mx-auto px-5 py-16">
      <div className="text-center mb-12">
        <h1 className="font-extrabold text-4xl mb-3" style={{ fontFamily: "Manrope,sans-serif", color: T.ink }}>Simple, transparent pricing</h1>
        <p style={{ color: T.sub }}>Start free. Upgrade when your bookings grow.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {plans.map((p) => (
          <Card key={p.name} className={`p-7 ${p.featured ? "ring-2" : ""}`} hover={false} style={{}}>
            {p.featured && <Badge tone="coral">Most popular</Badge>}
            <h3 className="font-extrabold text-2xl mt-2" style={{ fontFamily: "Manrope,sans-serif", color: T.ink }}>{p.name}</h3>
            <div className="mt-2 mb-5"><span className="text-3xl font-extrabold" style={{ color: T.teal }}>{p.price}</span><span className="text-sm" style={{ color: T.sub }}>{p.sub}</span></div>
            <div className="flex flex-col gap-2.5 mb-7">
              {p.features.map((f) => (<div key={f} className="flex items-start gap-2 text-sm" style={{ color: T.ink }}><Check size={15} color={T.teal} className="shrink-0 mt-0.5" />{f}</div>))}
            </div>
            <Btn variant={p.variant} className="w-full" onClick={() => go("onboarding")}>{p.cta}</Btn>
          </Card>
        ))}
      </div>
      <Card className="max-w-2xl mx-auto mt-8 p-6 text-center" hover={false}>
        <h4 className="font-bold mb-1" style={{ color: T.ink }}>Referral program</h4>
        <p className="text-sm" style={{ color: T.sub }}>Get 1 free month of Growth for every business you refer who completes onboarding.</p>
      </Card>
    </div>
  );
}

function ContactPage({ setToast }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  return (
    <div className="max-w-xl mx-auto px-5 py-16">
      <h1 className="font-extrabold text-3xl mb-2" style={{ fontFamily: "Manrope,sans-serif", color: T.ink }}>Get in touch</h1>
      <p style={{ color: T.sub }} className="mb-8">Questions, feedback, or partnership ideas we read everything.</p>
      <Card className="p-6" hover={false}>
        <div className="flex flex-col gap-4">
          <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <div><label className="block text-sm font-medium mb-1.5" style={{ color: T.ink }}>Message</label><textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none" style={{ borderColor: T.border }} /></div>
          <Btn onClick={() => { setToast("Message sent we'll reply within 1 business day."); setForm({ name: "", email: "", message: "" }); }}>Send message</Btn>
        </div>
      </Card>
      <div className="mt-6 text-sm" style={{ color: T.sub }}>Or email us directly at <span className="font-semibold" style={{ color: T.teal }}>hello.timeslot@gmail.com</span></div>
    </div>
  );
}

/* ============================== APP ROOT ============================== */
export default function App() {
  const [page, setPage] = useState("home");
  const [params, setParams] = useState({});
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [toast, setToastState] = useState(null);
  const store = useStore();

  function setToast(msg) { setToastState(msg); setTimeout(() => setToastState(null), 3200); }
  function go(p, prms = {}) {
    window.scrollTo({ top: 0, behavior: "instant" });
    if (p === "booking") window.__tsBookingParams = prms;
    setParams(prms); setPage(p);
  }
  function logout() { setUser(null); go("home"); }
  function toggleFavorite(id) { setFavorites((f) => ({ ...f, [id]: !f[id] })); }

  if (!store.loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: T.cream }}>
        <style>{FONT_IMPORT}</style>
        <div className="flex flex-col items-center gap-3"><Logo size={36} /><p className="text-sm" style={{ color: T.sub }}>Loading TimeSlot…</p></div>
      </div>
    );
  }

  const pageProps = { go, businesses: store.businesses, bookings: store.bookings, reviews: store.reviews, waitlist: store.waitlist, updateBusinesses: store.updateBusinesses, updateBookings: store.updateBookings, updateReviews: store.updateReviews, updateWaitlist: store.updateWaitlist, user, setUser, favorites, toggleFavorite, setToast, params };

  return (
    <div style={{ fontFamily: "Inter, sans-serif", backgroundColor: T.cream, minHeight: "100vh" }}>
      <style>{FONT_IMPORT}{`
        body { margin: 0; }
        ::selection { background: ${T.coral}33; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; width:16px;height:16px;border-radius:50%;background:${T.coral};cursor:pointer; }
      `}</style>
      <NavBar page={page} go={go} user={user} logout={logout} />
      {page === "home" && <Homepage {...pageProps} />}
      {page === "search" && <SearchPage {...pageProps} />}
      {page === "business" && <BusinessProfile {...pageProps} id={params.id} />}
      {page === "booking" && <BookingFlow {...pageProps} />}
      {page === "login" && <LoginPage {...pageProps} />}
      {page === "onboarding" && <OnboardingPage {...pageProps} />}
      {page === "customerDashboard" && <CustomerDashboard {...pageProps} />}
      {page === "businessDashboard" && <BusinessDashboard {...pageProps} />}
      {page === "admin" && <AdminDashboard {...pageProps} />}
      {page === "about" && <AboutPage {...pageProps} />}
      {page === "pricing" && <PricingPage {...pageProps} />}
      {page === "contact" && <ContactPage {...pageProps} />}
      <Footer go={go} />
      {toast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm font-medium" style={{ backgroundColor: T.teal, color: "#fff" }}>
          <CheckCircle2 size={16} />{toast}
        </div>
      )}
    </div>
  );
}
