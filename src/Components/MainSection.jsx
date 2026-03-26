import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ClipboardList, Clock, Download, Shield, Bell, Users
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: ClipboardList,
    color: "indigo",
    title: "Easy Leave Applications",
    desc: "Apply for any type of leave through a clean digital form. No paperwork, no queues — submit from anywhere.",
  },
  {
    icon: Clock,
    color: "purple",
    title: "Real-Time Status Tracking",
    desc: "Watch your request move from pending to approved in real time. Get instant updates at every stage.",
  },
  {
    icon: Download,
    color: "sky",
    title: "Instant Certificate Downloads",
    desc: "Approved certificates are instantly available for download as PDFs. Access them anytime, anywhere.",
  },
  {
    icon: Bell,
    color: "amber",
    title: "Smart Notifications",
    desc: "Receive alerts for every state change — approval, rejection, or remarks — so you're always informed.",
  },
  {
    icon: Users,
    color: "green",
    title: "Multi-Admin Management",
    desc: "Departmental admins, faculty, and HODs can each manage their own streams with full access control.",
  },
  {
    icon: Shield,
    color: "rose",
    title: "Secure & Role-Based Access",
    desc: "Students and admins operate in separate secure environments with role-authenticated sessions.",
  },
];

const colorMap = {
  indigo: {
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    text: "text-indigo-400",
    glow: "hover:border-indigo-500/40 hover:shadow-indigo-500/10",
  },
  purple: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    text: "text-purple-400",
    glow: "hover:border-purple-500/40 hover:shadow-purple-500/10",
  },
  sky: {
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
    text: "text-sky-400",
    glow: "hover:border-sky-500/40 hover:shadow-sky-500/10",
  },
  amber: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    text: "text-amber-400",
    glow: "hover:border-amber-500/40 hover:shadow-amber-500/10",
  },
  green: {
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    text: "text-green-400",
    glow: "hover:border-green-500/40 hover:shadow-green-500/10",
  },
  rose: {
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    text: "text-rose-400",
    glow: "hover:border-rose-500/40 hover:shadow-rose-500/10",
  },
};

const MainSection = () => {
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Section heading reveal
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 85%", once: true },
      }
    );
    gsap.fromTo(
      subRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.6, delay: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: subRef.current, start: "top 85%", once: true },
      }
    );

    // Staggered card reveal
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 40, scale: 0.96 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.6, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: cardsRef.current[0], start: "top 85%", once: true },
      }
    );
  }, []);

  return (
    <section id="features" className="py-24 px-5 md:px-8 max-w-[1200px] mx-auto">
      {/* Section header */}
      <div className="text-center max-w-[580px] mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-mooxy mb-4">
          Everything you need
        </div>
        <h2
          ref={headingRef}
          className="opacity-0 font-growmajour text-[32px] sm:text-[40px] text-white leading-tight"
        >
          Built for institutions.{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Loved by students.
          </span>
        </h2>
        <p ref={subRef} className="opacity-0 mt-4 text-white/45 font-mooxy text-[15px] leading-relaxed">
          Every feature is designed to remove friction from the request process for both students and administrators.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURES.map((f, i) => {
          const c = colorMap[f.color];
          const Icon = f.icon;
          return (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className={`opacity-0 group relative bg-white/[0.03] border ${c.border} ${c.glow} rounded-2xl p-6 cursor-default transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl`}
            >
              {/* Subtle inner glow on hover */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-transparent to-${f.color}-500/5`} />

              <div className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center mb-4`}>
                <Icon size={18} className={c.text} />
              </div>
              <h3 className="text-white font-mooxy font-semibold text-[15px] mb-2 leading-snug">
                {f.title}
              </h3>
              <p className="text-white/45 font-mooxy text-[13px] leading-relaxed">
                {f.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MainSection;
