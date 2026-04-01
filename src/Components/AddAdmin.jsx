import { postAdminData } from "../utils/POSTAdminData";
import logo from "../assets/logo.svg.png";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, UserPlus, Hash, Lock, User, Mail, Building2, Shield, Loader2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAdminDashboard } from "../utils/GETAdminDashBoard";
import gsap from "gsap";

const AddAdmin = () => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [adminDepartment, setAdminDepartment] = useState("");
  const [adminID, setAdminID] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const [requester, setRequester] = useState(null);
  const navRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(navRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" });
    gsap.fromTo(cardRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.2, ease: "power3.out" });

    // ── 1. Fetch current admin role/dept ──────────────────────────────────
    async function fetchCurrentAdmin() {
      try {
        const data = await getAdminDashboard();
        if (data) {
          setRequester(data);
          if (data.role === "Departmental Admin") {
            setRole("Faculty");
            setAdminDepartment(data.department);
          } else if (data.role === "Super Admin") {
            setRole("Departmental Admin");
          }
        }
      } catch (err) {
        toast.error("Failed to authenticate session. Please login again.");
        setTimeout(() => navigate("/"), 2000);
      }
    }
    fetchCurrentAdmin();
  }, [navigate]);

  async function handleRegister() {
    if (!adminID || !password || !adminName || !email || !adminDepartment || !role) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    const newAdmin = {
      adminID,
      password,
      name: adminName,
      email,
      department: adminDepartment,
      role,
    };
    const result = await postAdminData(newAdmin);
    setLoading(false);
    
    if (result && result.message === "Admin registered succesfully") {
      toast.success(`${role} registered successfully!`);
      setTimeout(() => navigate("/admindashboard"), 2000);
    } else {
      toast.error(result?.message || "Registration failed. Check permissions.");
    }
  }

  const inputCls = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 font-mooxy text-sm outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/20 transition-all";
  const selectCls = `${inputCls} appearance-none cursor-pointer`;

  const Field = ({ icon: Icon, children }) => (
    <div className="relative">
      <Icon size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
      <div className="pl-10">{children}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F19] via-[#0D1117] to-[#111827]">
      {/* Navbar */}
      <nav ref={navRef} className="sticky top-0 z-50 border-b border-white/5 bg-[#0B0F19]/85 backdrop-blur-xl opacity-0">
        <div className="max-w-[1200px] mx-auto px-5 h-16 flex items-center justify-between">
          <Link to="/">
            <div className="flex items-center gap-2.5 cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
                <img src={logo} alt="Requesta" className="w-5 h-5" />
              </div>
              <span className="font-growmajour text-[18px] bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">REQUESTA</span>
            </div>
          </Link>
          <Link to="/admindashboard">
            <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 border border-white/10 transition-all font-mooxy">
              <ArrowLeft size={14} /> Dashboard
            </button>
          </Link>
        </div>
      </nav>

      {/* Centered Form */}
      <div className="flex items-center justify-center px-5 py-16 min-h-[calc(100vh-64px)]">
        <div ref={cardRef} className="w-full max-w-md opacity-0">
          {/* Card header */}
          <div className="text-center mb-8">
            <div className="inline-flex w-14 h-14 rounded-2xl bg-purple-500/15 border border-purple-500/30 items-center justify-center mb-4">
              <UserPlus size={24} className="text-purple-400" />
            </div>
            <h1 className="font-growmajour text-2xl text-white mb-1">Add New Admin</h1>
            <p className="text-white/40 font-mooxy text-sm">Fill in the details to register a new admin account</p>
          </div>

          {/* Form card */}
          <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6">
            <div className="flex flex-col gap-4 font-mooxy">

              {/* Admin ID */}
              <div>
                <label className="block text-white/45 text-xs uppercase tracking-wider mb-2">Admin ID</label>
                <div className="relative">
                  <Hash size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="e.g. ADM001"
                    onChange={(e) => setAdminID(e.target.value)}
                    className={`${inputCls} pl-10`}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-white/45 text-xs uppercase tracking-wider mb-2">Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
                  <input
                    type="password"
                    placeholder="Set a strong password"
                    onChange={(e) => setPassword(e.target.value)}
                    className={`${inputCls} pl-10`}
                  />
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-white/45 text-xs uppercase tracking-wider mb-2">Full Name</label>
                <div className="relative">
                  <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Admin full name"
                    onChange={(e) => setAdminName(e.target.value)}
                    className={`${inputCls} pl-10`}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-white/45 text-xs uppercase tracking-wider mb-2">Email</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="admin@institution.edu"
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${inputCls} pl-10`}
                  />
                </div>
              </div>

              {/* Department */}
              <div>
                <label className="block text-white/45 text-xs uppercase tracking-wider mb-2">Department</label>
                <div className="relative">
                  <Building2 size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none z-10" />
                  <select
                    className={`${selectCls} pl-10 ${requester?.role === "Departmental Admin" ? "opacity-60 cursor-not-allowed" : ""}`}
                    style={{ background: "rgba(255,255,255,0.04)" }}
                    value={adminDepartment}
                    disabled={requester?.role === "Departmental Admin"}
                    onChange={(e) => setAdminDepartment(e.target.value)}
                  >
                    <option value="" className="bg-[#111827]">-- Select Department --</option>
                    <option value="Computer Science And Engineering" className="bg-[#111827]">Computer Science & Engineering</option>
                    <option value="Electronics And Communication" className="bg-[#111827]">Electronics & Communication</option>
                    <option value="Mechanical" className="bg-[#111827]">Mechanical Engineering</option>
                  </select>
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-white/45 text-xs uppercase tracking-wider mb-2">Role To Add</label>
                <div className="relative">
                  <Shield size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none z-10" />
                  <select
                    className={`${selectCls} pl-10 opacity-60 cursor-not-allowed`}
                    style={{ background: "rgba(255,255,255,0.04)" }}
                    value={role}
                    disabled={true}
                  >
                    <option value="" className="bg-[#111827]">-- Select Role --</option>
                    <option value="Super Admin" className="bg-[#111827]">Super Admin</option>
                    <option value="Departmental Admin" className="bg-[#111827]">Departmental Admin</option>
                    <option value="Faculty" className="bg-[#111827]">Faculty</option>
                  </select>
                </div>
                {requester && (
                  <p className="text-indigo-400/50 text-[10px] mt-1.5 font-mooxy italic">
                    As a {requester.role}, you are authorized to add: {requester.role === "Super Admin" ? "Departmental Admin" : "Faculty members"}.
                  </p>
                )}
              </div>

              {/* Submit */}
                <button
                onClick={handleRegister}
                disabled={loading || !requester}
                className="w-full h-11 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-mooxy shadow-lg shadow-purple-500/20 transition-all hover:scale-[1.01] active:scale-[0.98] flex items-center justify-center gap-2 mt-1"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : null}
                {loading ? "Creating Admin…" : "Create Admin Account"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </div>
  );
};

export default AddAdmin;
