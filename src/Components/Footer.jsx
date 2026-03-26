import { Link } from "react-router-dom";
import logo from "../assets/logo.svg.png";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0B0F19]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
                <img src={logo} alt="Requesta" className="w-5 h-5" />
              </div>
              <span className="font-growmajour text-[18px] bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent">
                REQUESTA
              </span>
            </div>
            <p className="text-white/35 font-mooxy text-sm leading-relaxed max-w-[280px]">
              A modern institutional portal for managing leave and certificate requests — built for students and administrators alike.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-mooxy text-sm font-semibold mb-4">Portal</h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "Student Login", to: "/studentlogin" },
                { label: "Admin Login", to: "/adminlogin" },
                { label: "Register", to: "/studentregister" },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to}>
                    <span className="text-white/40 hover:text-white font-mooxy text-sm transition-colors cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-mooxy text-sm font-semibold mb-4">Contact</h4>
            <ul className="flex flex-col gap-2.5">
              {["demo@requesta.app", "LinkedIn", "GitHub"].map((item) => (
                <li key={item}>
                  <span className="text-white/40 hover:text-white font-mooxy text-sm transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 font-mooxy text-xs">
            © {new Date().getFullYear()} Requesta. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/25 font-mooxy text-xs">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
