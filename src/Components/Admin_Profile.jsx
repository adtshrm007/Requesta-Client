import { useEffect, useState, useRef } from "react";
import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";
import { getAdminDashboard } from "../utils/GETAdminDashBoard";
import { updateAdmin } from "../utils/UPDATEAdmin";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import gsap from "gsap";
import {
  User, ShieldCheck, Mail, Building2, Edit3, Lock, ArrowRight,
  ChevronDown, X
} from "lucide-react";

const AdminProfile = () => {
  const navigate = useNavigate();
  const [home, setHome] = useState(true);
  const [editProfile, setEditProfile] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminDepartment, setAdminDepartment] = useState("");
  const [adminID, setAdminID] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const profileRef = useRef(null);
  const editRef = useRef(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await getAdminDashboard();
      if (res) {
        setAdminDepartment(res.department);
        setAdminID(res.adminID);
        setAdminName(res.name);
        setAdminEmail(res.email);
      }
    };
    fetchDetails();
  }, []);

  useEffect(() => {
    if (home && profileRef.current) {
      gsap.fromTo(profileRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
    }
    if (editProfile && editRef.current) {
      gsap.fromTo(editRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
    }
  }, [home, editProfile]);

  function handleClickOnEditProfile() {
    setHome(!home);
    setEditProfile(!editProfile);
  }

  const EditAdminProfile = async () => {
    const newUpdatedAdmin = { adminID, department: adminDepartment, email: adminEmail, name: adminName };
    return await updateAdmin(newUpdatedAdmin);
  };

  function handleAdminEdit() {
    EditAdminProfile();
    navigate("/admindashboard");
  }


  const inputClass =
    "w-full h-12 px-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 font-mooxy text-sm outline-none focus:border-purple-500/60 focus:bg-purple-500/5 focus:ring-1 focus:ring-purple-500/20 transition-all";

  const DEPARTMENTS = [
    { value: "", label: "— Select Department —" },
    { value: "Computer Science And Engineering", label: "Computer Science & Engineering" },
    { value: "Electronics And Communication", label: "Electronics & Communication" },
    { value: "Mechanical", label: "Mechanical Engineering" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F19] via-[#0D1117] to-[#111827]">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#0B0F19]/80 backdrop-blur-xl">
        <div className="max-w-[1200px] mx-auto px-5 h-16 flex items-center justify-between">
          <Link to="/">
            <div className="flex items-center gap-2.5 cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
                <img src={logo} alt="Requesta" className="w-5 h-5" />
              </div>
              <span className="font-growmajour text-[18px] bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                REQUESTA
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            <Link to="/admindashboard">
              <button className="px-4 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all font-mooxy">
                Dashboard
              </button>
            </Link>
            <button
              onClick={handleClickOnEditProfile}
              className="px-4 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all font-mooxy"
            >
              {editProfile ? "View Profile" : "Edit Profile"}
            </button>
            <Link to="/changeadminpassword">
              <button
                className="px-4 py-2 rounded-xl text-sm bg-purple-600 hover:bg-purple-500 text-white font-mooxy transition-all shadow-lg shadow-purple-500/20"
              >
                Change Password
              </button>
            </Link>
          </div>

          <button className="md:hidden text-white/60 hover:text-white" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X size={22} /> : <Edit3 size={22} />}
          </button>
        </div>

        {mobileMenu && (
          <div className="md:hidden border-t border-white/5 bg-[#0D1117] px-5 py-3 flex flex-col gap-1">
            <Link to="/admindashboard" onClick={() => setMobileMenu(false)}>
              <button className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all font-mooxy">Dashboard</button>
            </Link>
            <button
              onClick={() => { handleClickOnEditProfile(); setMobileMenu(false); }}
              className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all font-mooxy"
            >
              {editProfile ? "View Profile" : "Edit Profile"}
            </button>
            <Link to="/changeadminpassword" onClick={() => setMobileMenu(false)}>
              <button className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-purple-400 hover:text-purple-300 hover:bg-white/5 transition-all font-mooxy">
                Change Password
              </button>
            </Link>
          </div>
        )}
      </nav>

      {/* Profile View */}
      {home && (
        <div ref={profileRef} className="max-w-[900px] mx-auto px-5 py-10 opacity-0">
          {/* Header card */}
          <div className="relative overflow-hidden bg-gradient-to-br from-purple-600/15 via-indigo-600/8 to-transparent border border-white/8 rounded-2xl p-6 mb-8">
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/30 to-indigo-500/30 border border-white/10 flex items-center justify-center flex-shrink-0">
                <ShieldCheck size={28} className="text-white/70" />
              </div>
              <div>
                <h1 className="text-white font-growmajour text-2xl sm:text-3xl leading-tight">{adminName}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mooxy">
                    Administrator
                  </span>
                  <span className="text-white/30 font-mooxy text-xs">{adminDepartment}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Admin ID", value: adminID, icon: ShieldCheck },
              { label: "Full Name", value: adminName, icon: User },
              { label: "Department", value: adminDepartment || "—", icon: Building2 },
              { label: "Email Address", value: adminEmail || "—", icon: Mail },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-white/[0.03] border border-white/8 rounded-xl p-4 flex items-start gap-3 hover:border-white/12 transition-all">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={14} className="text-white/40" />
                </div>
                <div className="min-w-0">
                  <p className="text-white/40 font-mooxy text-xs uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-white font-mooxy text-sm truncate">{value}</p>
                </div>
              </div>
            ))}

            {/* Quick actions */}
            <div className="bg-white/[0.03] border border-white/8 rounded-xl p-4 hover:border-white/12 transition-all flex flex-col gap-2 sm:col-span-2">
              <p className="text-white/40 font-mooxy text-xs uppercase tracking-wider mb-1">Quick Actions</p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleClickOnEditProfile}
                  className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-mooxy text-sm transition-colors"
                >
                  <Edit3 size={13} /> Edit Profile Info
                </button>
                <Link to="/changeadminpassword">
                  <button
                    className="flex items-center gap-2 text-white/50 hover:text-white font-mooxy text-sm transition-colors"
                  >
                    <Lock size={13} /> Change Password
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile View */}
      {editProfile && (
        <div className="flex items-center justify-center px-5 py-12">
          <div ref={editRef} className="w-full max-w-[440px] opacity-0">
            <div className="mb-8 text-center">
              <h1 className="font-growmajour text-[28px] text-white leading-tight">Edit Admin Profile</h1>
              <p className="text-white/40 font-mooxy text-sm mt-2">Update your administrator information below</p>
            </div>

            <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 flex flex-col gap-4">
              {[
                { label: "Name", value: adminName, setter: setAdminName, icon: User },
                { label: "Email Address", value: adminEmail, setter: setAdminEmail, icon: Mail },
              ].map(({ label, value, setter, icon: Icon }) => (
                <div key={label}>
                  <label className="block text-white/50 font-mooxy text-xs mb-2 uppercase tracking-wider">{label}</label>
                  <div className="relative">
                    <Icon size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
                    <input
                      type="text"
                      placeholder={label}
                      defaultValue={value}
                      onChange={(e) => setter(e.target.value)}
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>
              ))}

              {/* Department select */}
              <div>
                <label className="block text-white/50 font-mooxy text-xs mb-2 uppercase tracking-wider">Department</label>
                <div className="relative">
                  <Building2 size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none z-10" />
                  <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none z-10" />
                  <select
                    defaultValue={adminDepartment}
                    onChange={(e) => setAdminDepartment(e.target.value)}
                    className={`${inputClass} pl-10 appearance-none cursor-pointer`}
                    style={{ background: "rgba(255,255,255,0.04)" }}
                  >
                    {DEPARTMENTS.map((d) => (
                      <option key={d.value} value={d.value} className="bg-[#111827] text-white">{d.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={handleAdminEdit}
                className="group w-full h-12 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-mooxy flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition-all hover:scale-[1.01] active:scale-[0.98] mt-1"
              >
                Save Changes
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleClickOnEditProfile}
                className="w-full text-center text-white/30 hover:text-white/60 font-mooxy text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
