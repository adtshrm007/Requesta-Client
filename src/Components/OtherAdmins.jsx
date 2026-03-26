import { useEffect, useState, useRef } from "react";
import logo from "../assets/logo.svg.png";
import { getAdmins } from "../utils/GETOtherAdminsData";
import { Link } from "react-router-dom";
import { getDepartmentalAdmin } from "../utils/GETDepartmentalAdmin";
import {
  ArrowLeft, ShieldCheck, ChevronDown, ChevronUp,
  Clock, CheckCircle, XCircle, Users, Menu, X
} from "lucide-react";
import gsap from "gsap";

export const OtherAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [viewAnalytics, setViewAnalytics] = useState(null);
  const [departmentalAdmins, setDepartmentalAdmins] = useState([]);
  const [otherAdmins, setOtherAdmins] = useState(false);
  const [departmental, setDepartmental] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(navRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" });
    gsap.fromTo(contentRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.2, ease: "power3.out" });
  }, []);

  useEffect(() => {
    const getadmins = async () => {
      const res = await getAdmins();
      const res1 = await getDepartmentalAdmin();
      if (res?.data) { setAdmins(res.data); setOtherAdmins(true); }
      if (res1?.data) { setDepartmentalAdmins(res1.data); setDepartmental(true); }
    };
    getadmins();
  }, []);

  const rolePill = (role) => {
    const map = {
      "Super Admin": "text-purple-400 bg-purple-400/10 border-purple-400/20",
      "Departmental Admin": "text-sky-400 bg-sky-400/10 border-sky-400/20",
      "Faculty": "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
    };
    return map[role] || "text-white/50 bg-white/5 border-white/10";
  };

  const StatChip = ({ icon: Icon, label, value, color }) => {
    const colors = {
      green: "text-green-400", red: "text-red-400", sky: "text-sky-400", amber: "text-amber-400",
    };
    return (
      <div className="flex flex-col gap-1 bg-white/[0.03] border border-white/8 rounded-xl p-3">
        <p className="text-white/35 font-mooxy text-[11px] uppercase tracking-wider">{label}</p>
        <div className="flex items-center gap-1.5">
          <Icon size={13} className={colors[color]} />
          <span className={`font-growmajour text-lg ${colors[color]}`}>{value ?? 0}</span>
        </div>
      </div>
    );
  };

  const AdminCard = ({ admin }) => (
    <div className="bg-white/[0.03] border border-white/8 hover:border-white/12 rounded-2xl overflow-hidden transition-all">
      <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <p className="text-white font-mooxy font-semibold text-sm">{admin.name}</p>
            <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-mooxy border ${rolePill(admin.role)}`}>
              {admin.role}
            </span>
          </div>
          <p className="text-white/35 font-mooxy text-xs">
            {admin.department} · ID: {admin.adminID}
          </p>
        </div>
        <button
          onClick={() => setViewAnalytics(viewAnalytics === admin._id ? null : admin._id)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600/15 hover:bg-purple-600/25 border border-purple-500/25 text-purple-300 text-xs font-mooxy transition-all flex-shrink-0"
        >
          {viewAnalytics === admin._id ? <><ChevronUp size={13} /> Hide</> : <><ChevronDown size={13} /> Analytics</>}
        </button>
      </div>

      {viewAnalytics === admin._id && (
        <div className="border-t border-white/5 px-5 pb-5 pt-4 bg-white/[0.015]">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            <StatChip icon={CheckCircle} label="Leaves Accepted"     value={admin.acceptedLeaveRequests}      color="green" />
            <StatChip icon={XCircle}    label="Leaves Rejected"      value={admin.rejectedLeaveRequests}      color="red" />
            <StatChip icon={CheckCircle} label="Certs Accepted"      value={admin.acceptedCertificateRequests} color="sky" />
            <StatChip icon={XCircle}    label="Certs Rejected"       value={admin.rejectedCertificateRequests} color="red" />
            <div className="col-span-2 sm:col-span-1 flex flex-col gap-1 bg-white/[0.03] border border-white/8 rounded-xl p-3">
              <p className="text-white/35 font-mooxy text-[11px] uppercase tracking-wider">Last Active</p>
              <div className="flex items-center gap-1.5">
                <Clock size={13} className="text-amber-400" />
                <span className="text-white/60 font-mooxy text-xs">
                  {new Date(admin.updatedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
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

          <div className="hidden md:flex items-center gap-2">
            <Link to="/admindashboard">
              <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 border border-white/10 transition-all font-mooxy">
                <ArrowLeft size={14} /> Dashboard
              </button>
            </Link>
          </div>

          <button className="md:hidden text-white/60 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-white/5 bg-[#0D1117] px-5 py-3 flex flex-col gap-1">
            <Link to="/admindashboard" onClick={() => setMenuOpen(false)}>
              <button className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all font-mooxy flex items-center gap-2">
                <ArrowLeft size={14} /> Dashboard
              </button>
            </Link>
          </div>
        )}
      </nav>

      {/* Content */}
      <div ref={contentRef} className="max-w-[1200px] mx-auto px-5 py-10 opacity-0">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-mooxy mb-3">
            <ShieldCheck size={11} /> Admin Directory
          </div>
          <h1 className="font-growmajour text-3xl sm:text-4xl text-white">Other Admins</h1>
          <p className="text-white/40 font-mooxy text-sm mt-2">View analytics and activity for all admins in the system.</p>
        </div>

        {/* Faculty / other admins */}
        {otherAdmins && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-5 pb-4 border-b border-white/5">
              <Users size={16} className="text-purple-400" />
              <h2 className="font-growmajour text-lg text-white">Faculty &amp; Other Admins</h2>
              <span className="ml-auto text-white/30 font-mooxy text-xs">{admins.length}</span>
            </div>
            {admins.length > 0 ? (
              <div className="flex flex-col gap-3">
                {admins.map((admin, index) => <AdminCard key={admin._id || index} admin={admin} />)}
              </div>
            ) : (
              <p className="text-white/25 font-mooxy text-sm">No admins found.</p>
            )}
          </section>
        )}

        {/* Departmental admins */}
        {departmental && departmentalAdmins.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-5 pb-4 border-b border-white/5">
              <ShieldCheck size={16} className="text-sky-400" />
              <h2 className="font-growmajour text-lg text-white">Departmental Admins</h2>
              <span className="ml-auto text-white/30 font-mooxy text-xs">{departmentalAdmins.length}</span>
            </div>
            <div className="flex flex-col gap-3">
              {departmentalAdmins.map((admin, index) => <AdminCard key={admin._id || index} admin={admin} />)}
            </div>
          </section>
        )}

        {!otherAdmins && !departmental && (
          <div className="bg-white/[0.02] border border-white/6 rounded-2xl p-14 text-center">
            <ShieldCheck size={36} className="text-white/10 mx-auto mb-4" />
            <p className="text-white/30 font-mooxy text-sm">No other admins in the system.</p>
          </div>
        )}
      </div>
    </div>
  );
};
