import { useState, useEffect, useRef } from "react";
import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { Menu, X } from "lucide-react";
import gsap from "gsap";

const NAV_LINKS = ["Home", "Features", "About", "Contact"];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const navRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(logoRef.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.7 })
      .fromTo(navRef.current, { opacity: 0, y: -15 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
      .fromTo(ctaRef.current, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.6 }, "-=0.4");
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0B0F19]/80 backdrop-blur-xl border-b border-white/10 shadow-xl shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 h-[68px] flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <div ref={logoRef} className="flex items-center gap-2.5 cursor-pointer opacity-0">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
              <img src={logo} alt="Requesta" className="w-5 h-5" />
            </div>
            <span className="font-growmajour text-[18px] bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent">
              REQUESTA
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav ref={navRef} className="hidden md:flex items-center gap-1 opacity-0">
          {NAV_LINKS.map((item) =>
            item === "About" ? (
              <ScrollLink key={item} to="about" smooth={true} duration={600} offset={-80}>
                <button className="px-4 py-2 rounded-lg text-[14px] text-white/50 hover:text-white hover:bg-white/5 transition-all font-mooxy cursor-pointer">
                  {item}
                </button>
              </ScrollLink>
            ) : item === "Features" ? (
              <ScrollLink key={item} to="features" smooth={true} duration={600} offset={-80}>
                <button className="px-4 py-2 rounded-lg text-[14px] text-white/50 hover:text-white hover:bg-white/5 transition-all font-mooxy cursor-pointer">
                  {item}
                </button>
              </ScrollLink>
            ) : (
              <button
                key={item}
                className="px-4 py-2 rounded-lg text-[14px] text-white/50 hover:text-white hover:bg-white/5 transition-all font-mooxy cursor-pointer"
              >
                {item}
              </button>
            )
          )}
        </nav>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="hidden md:flex items-center gap-2 opacity-0">
          <Link to="/adminlogin">
            <button className="px-4 py-2 rounded-xl text-[13px] text-white/70 hover:text-white hover:bg-white/5 transition-all font-mooxy border border-white/10">
              Admin Login
            </button>
          </Link>
          <Link to="/studentlogin">
            <button className="px-4 py-2 rounded-xl text-[13px] bg-indigo-600 hover:bg-indigo-500 text-white font-mooxy transition-all shadow-lg shadow-indigo-500/20">
              Student Login
            </button>
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-white/60 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0D1117]/95 backdrop-blur-xl border-t border-white/5">
          <div className="max-w-[1200px] mx-auto px-5 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((item) => (
              <button
                key={item}
                className="w-full text-left px-4 py-3 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all font-mooxy"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </button>
            ))}
            <hr className="border-white/5 my-2" />
            <Link to="/adminlogin" onClick={() => setMenuOpen(false)}>
              <button className="w-full text-left px-4 py-3 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all font-mooxy">
                Admin Login
              </button>
            </Link>
            <Link to="/studentlogin" onClick={() => setMenuOpen(false)}>
              <button className="w-full px-4 py-3 rounded-xl text-sm bg-indigo-600 hover:bg-indigo-500 text-white font-mooxy text-center transition-all">
                Student Login
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
