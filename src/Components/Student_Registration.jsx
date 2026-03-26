import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { postStudentData } from "../utils/POSTstudentData";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import {
  ArrowRight, Hash, User, Mail, KeyRound, BookOpen, Calendar,
  CheckCircle, Download, Clock, Eye, EyeOff, ChevronDown
} from "lucide-react";

export default function StudentRegister() {
  const [regNo, setregNo] = useState("");
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [email, setEmail] = useState("");
  const [batchYear, setbatchYear] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const panelRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(panelRef.current, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.8 })
      .fromTo(formRef.current, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.8 }, "-=0.6");
  }, []);

  async function handleRegister() {
    const newStudent = {
      registrationNumber: regNo,
      name: name,
      email: email,
      password: password,
      branch: branch,
      year: batchYear,
    };
    const result = await postStudentData(newStudent);
  }

  const inputClass =
    "w-full h-12 px-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 font-mooxy text-sm outline-none focus:border-indigo-500/60 focus:bg-indigo-500/5 focus:ring-1 focus:ring-indigo-500/20 transition-all";

  const selectClass =
    "w-full h-12 px-4 bg-white/5 border border-white/10 rounded-xl text-white font-mooxy text-sm outline-none focus:border-indigo-500/60 focus:bg-indigo-500/5 transition-all appearance-none cursor-pointer";

  const BRANCHES = [
    { value: "", label: "Select Branch" },
    { value: "Computer Science And Engineering", label: "Computer Science & Engineering" },
    { value: "Electronics And Communication", label: "Electronics & Communication" },
    { value: "Mechanical", label: "Mechanical Engineering" },
  ];

  const YEARS = ["", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F19] via-[#0D1117] to-[#111827] flex">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      {/* Left Panel — Branding */}
      <div
        ref={panelRef}
        className="hidden lg:flex flex-col justify-between w-[40%] bg-gradient-to-br from-sky-600/15 via-indigo-600/10 to-transparent border-r border-white/5 p-10 relative overflow-hidden opacity-0"
      >
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-sky-600/12 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
            <img src={logo} alt="Requesta" className="w-5 h-5" />
          </div>
          <span className="font-growmajour text-[20px] bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent">
            REQUESTA
          </span>
        </div>

        {/* Center content */}
        <div className="relative z-10 flex flex-col gap-6">
          <h2 className="font-growmajour text-[34px] leading-tight text-white">
            Join your institution's{" "}
            <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
              smart portal.
            </span>
          </h2>
          <p className="text-white/40 font-mooxy text-sm leading-relaxed max-w-[300px]">
            Register once and manage all your academic requests — leave applications, certificates, and more — from a single dashboard.
          </p>

          <div className="flex flex-col gap-3 mt-2">
            {[
              { icon: CheckCircle, text: "Apply for leaves in under a minute", color: "text-green-400" },
              { icon: Download, text: "Download approved certificates instantly", color: "text-sky-400" },
              { icon: Clock, text: "Real-time status tracking", color: "text-amber-400" },
            ].map(({ icon: Icon, text, color }) => (
              <div key={text} className="flex items-center gap-3 text-white/50 font-mooxy text-sm">
                <Icon size={15} className={`${color} flex-shrink-0`} />
                {text}
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-white/20 font-mooxy text-xs">
          © {new Date().getFullYear()} Requesta. All rights reserved.
        </p>
      </div>

      {/* Right Panel — Form */}
      <div ref={formRef} className="flex-1 flex items-center justify-center px-5 py-10 opacity-0">
        <div className="w-full max-w-[440px]">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
              <img src={logo} alt="Requesta" className="w-5 h-5" />
            </div>
            <span className="font-growmajour text-[18px] bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent">
              REQUESTA
            </span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="font-growmajour text-[30px] text-white leading-tight">Create Account</h1>
            <p className="text-white/40 font-mooxy text-sm mt-1.5">
              Register as a student to get started
            </p>
          </div>

          <div className="flex flex-col gap-3.5">
            {/* Reg Number */}
            <div className="relative">
              <Hash size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
              <input
                type="text"
                placeholder="Registration Number"
                className={`${inputClass} pl-10`}
                onChange={(e) => setregNo(e.target.value)}
              />
            </div>

            {/* Name */}
            <div className="relative">
              <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
              <input
                type="text"
                placeholder="Full Name"
                className={`${inputClass} pl-10`}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
              <input
                type="email"
                placeholder="Email Address"
                className={`${inputClass} pl-10`}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <KeyRound size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`${inputClass} pl-10 pr-11`}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Branch select */}
            <div className="relative">
              <BookOpen size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none z-10" />
              <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none z-10" />
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                required
                className={`${selectClass} pl-10 text-${branch ? "white" : "[#ffffff4d]"}`}
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                {BRANCHES.map((b) => (
                  <option
                    key={b.value}
                    value={b.value}
                    className="bg-[#111827] text-white"
                  >
                    {b.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Batch Year select */}
            <div className="relative">
              <Calendar size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none z-10" />
              <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none z-10" />
              <select
                value={batchYear}
                onChange={(e) => setbatchYear(e.target.value)}
                required
                className={`${selectClass} pl-10`}
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <option value="" className="bg-[#111827] text-white">Passout Year</option>
                {YEARS.slice(1).map((y) => (
                  <option key={y} value={y} className="bg-[#111827] text-white">{y}</option>
                ))}
              </select>
            </div>

            {/* Submit */}
            <button
              onClick={handleRegister}
              className="group w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-mooxy flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.01] active:scale-[0.98] mt-1"
            >
              Create Account
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Login link */}
            <div className="text-center mt-1">
              <span className="text-white/35 font-mooxy text-sm">Already have an account? </span>
              <Link to="/studentlogin">
                <span className="text-indigo-400 hover:text-indigo-300 font-mooxy text-sm cursor-pointer transition-colors">
                  Sign in
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
