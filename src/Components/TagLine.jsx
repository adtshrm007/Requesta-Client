import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, CheckCircle, Clock, FileText, Bell, TrendingUp, Zap } from "lucide-react";

const TagLine = () => {
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const trustRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.3 });

    tl.fromTo(badgeRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 })
      .fromTo(headingRef.current, { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.2")
      .fromTo(subRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.2")
      .fromTo(trustRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.1")
      .fromTo(cardRef.current, { opacity: 0, x: 40, scale: 0.95 }, { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: "power2.out" }, "-=0.8");

    // Floating animation on card
    gsap.to(cardRef.current, {
      y: -12,
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 1,
    });
  }, []);

  return (
    <section
      id="start"
      className="min-h-screen pt-24 pb-16 flex items-center"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT — Text Content */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <div ref={badgeRef} className="opacity-0 inline-flex w-fit items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-mooxy">
              <Zap size={11} className="fill-indigo-400 text-indigo-400" />
              Institutional Portal — Leave &amp; Certificates
            </div>

            {/* Heading */}
            <div ref={headingRef} className="opacity-0">
              <h1 className="font-growmajour text-[40px] sm:text-[52px] lg:text-[58px] leading-[1.1] text-white">
                Manage requests.{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent">
                    Effortlessly.
                  </span>
                  {/* Underline glow */}
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-60" />
                </span>
              </h1>
            </div>

            {/* Subheading */}
            <p ref={subRef} className="opacity-0 text-white/50 font-mooxy text-[16px] leading-relaxed max-w-[480px]">
              A unified portal for students and admins to apply, track, and approve leave &amp; certificate requests — all in real time, with zero paperwork.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="opacity-0 flex flex-wrap gap-3">
              <Link to="/studentlogin">
                <button className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-[14px] font-mooxy shadow-lg shadow-indigo-500/25 transition-all hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98]">
                  Student Portal
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link to="/adminlogin">
                <button className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[14px] font-mooxy transition-all hover:scale-[1.02] active:scale-[0.98]">
                  Admin Portal
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>

            {/* Trust Signals */}
            <div ref={trustRef} className="opacity-0 flex flex-wrap items-center gap-4 pt-2">
              {["Instant Approval Tracking", "Certificate Downloads", "Multi-Admin Support"].map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-white/35 font-mooxy text-xs">
                  <CheckCircle size={12} className="text-green-400 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Dashboard Preview Card */}
          <div ref={cardRef} className="opacity-0 relative flex items-center justify-center">
            {/* Glow background */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/15 to-indigo-600/20 rounded-3xl blur-3xl" />

            {/* Main card */}
            <div className="relative w-full max-w-[460px] bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl shadow-black/40">
              {/* Card header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-white font-mooxy text-sm font-semibold">Request Dashboard</p>
                  <p className="text-white/40 font-mooxy text-xs mt-0.5">Academic Year 2025–26</p>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-xs font-mooxy">Live</span>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { label: "Leaves", value: "24", icon: Clock, color: "indigo", change: "+3" },
                  { label: "Certs", value: "12", icon: FileText, color: "purple", change: "+1" },
                  { label: "Pending", value: "5", icon: Bell, color: "amber", change: "—" },
                ].map(({ label, value, icon: Icon, color, change }) => (
                  <div key={label} className={`bg-white/[0.04] border border-white/8 rounded-xl p-3`}>
                    <div className={`w-7 h-7 rounded-lg mb-2 flex items-center justify-center ${
                      color === "indigo" ? "bg-indigo-500/15" :
                      color === "purple" ? "bg-purple-500/15" : "bg-amber-500/15"
                    }`}>
                      <Icon size={13} className={
                        color === "indigo" ? "text-indigo-400" :
                        color === "purple" ? "text-purple-400" : "text-amber-400"
                      } />
                    </div>
                    <p className="text-white text-lg font-semibold font-mooxy leading-none">{value}</p>
                    <p className="text-white/40 text-[11px] font-mooxy mt-0.5">{label}</p>
                  </div>
                ))}
              </div>

              {/* Recent activity */}
              <div className="flex flex-col gap-2">
                <p className="text-white/30 text-[11px] font-mooxy uppercase tracking-wider mb-1">Recent Activity</p>
                {[
                  { name: "Arjun S.", action: "Leave approved", time: "2m ago", status: "approved" },
                  { name: "Priya M.", action: "Certificate requested", time: "15m ago", status: "pending" },
                  { name: "Rahul K.", action: "Leave submitted", time: "1h ago", status: "pending" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between bg-white/[0.03] border border-white/5 rounded-xl px-3 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500/40 to-purple-500/40 border border-white/10 flex items-center justify-center text-xs text-white font-mooxy font-semibold">
                        {item.name[0]}
                      </div>
                      <div>
                        <p className="text-white font-mooxy text-xs font-semibold">{item.name}</p>
                        <p className="text-white/40 font-mooxy text-[11px]">{item.action}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mooxy ${
                        item.status === "approved"
                          ? "bg-green-500/15 text-green-400 border border-green-500/25"
                          : "bg-amber-500/15 text-amber-400 border border-amber-500/25"
                      }`}>
                        {item.status}
                      </span>
                      <span className="text-white/25 text-[10px] font-mooxy">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom bar */}
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-white/30 font-mooxy text-xs">
                  <TrendingUp size={11} className="text-green-400" />
                  <span className="text-green-400">87%</span> approval rate this month
                </div>
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              </div>
            </div>

            {/* Floating chips */}
            <div className="absolute -top-4 -right-4 px-3 py-1.5 rounded-full bg-[#1F2937] border border-white/10 shadow-lg text-xs text-white/70 font-mooxy backdrop-blur-sm animate-bounce" style={{ animationDuration: "3s" }}>
              ✓ Request approved
            </div>
            <div className="absolute -bottom-3 -left-4 px-3 py-1.5 rounded-full bg-[#1F2937] border border-white/10 shadow-lg text-xs text-white/70 font-mooxy backdrop-blur-sm animate-bounce" style={{ animationDuration: "4s", animationDelay: "1s" }}>
              📄 Certificate ready
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TagLine;
