import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const StartSection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 40, scale: 0.97 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-5 md:px-8 max-w-[1200px] mx-auto">
      <div
        ref={contentRef}
        className="opacity-0 relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-[#111827]/80 p-10 md:p-16 text-center"
      >
        {/* Background blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center gap-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-mooxy">
            <Sparkles size={11} className="text-indigo-300" />
            Ready to get started?
          </div>
          <h2 className="font-growmajour text-[32px] sm:text-[44px] text-white leading-tight max-w-[540px]">
            Your institution's requests,{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              simplified.
            </span>
          </h2>
          <p className="text-white/45 font-mooxy text-[15px] max-w-[420px] leading-relaxed">
            Join students and administrators already using Requesta to streamline their leave and certificate workflow.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            <Link to="/studentlogin">
              <button className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-[14px] font-mooxy shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.03] active:scale-[0.97]">
                Get Started as Student
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link to="/adminlogin">
              <button className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-white/8 hover:bg-white/12 border border-white/10 text-white text-[14px] font-mooxy transition-all hover:scale-[1.03] active:scale-[0.97]">
                Admin Access
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartSection;
