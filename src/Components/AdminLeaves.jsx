import { useEffect, useState, useRef } from "react";
import { getAdminLeaves } from "../utils/GETAdminLeaves";
import { getAdminDashboard } from "../utils/GETAdminDashBoard";
import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";
import gsap from "gsap";
import {
  Bell, ArrowLeft, Calendar, ChevronDown, ChevronUp,
  FileText, Stethoscope, Briefcase, Coffee, X, Menu
} from "lucide-react";

export const AdminLeaves = () => {
  const [leave, setLeave] = useState([]);
  const [expandedLeave, setExpandedLeave] = useState(null);
  const [notifications, setNotifications] = useState(0);
  const [medicalLeaveTaken, setMedicalLeaveTaken] = useState("");
  const [medicalLeaveLeft, setMedicalLeaveLeft] = useState("");
  const [casualLeaveTaken, setCasualLeaveTaken] = useState("");
  const [casualLeaveLeft, setCasualLeaveLeft] = useState("");
  const [officialLeaveTaken, setOfficialLeaveTaken] = useState("");
  const [officialLeaveLeft, setOfficialLeaveLeft] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const navRef = useRef(null);
  const contentRef = useRef(null);

  const oneDay = 24 * 60 * 60 * 1000;

  useEffect(() => {
    gsap.fromTo(navRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" });
    gsap.fromTo(contentRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.2, ease: "power3.out" });
  }, []);

  useEffect(() => {
    const getLeaves = async () => {
      const res = await getAdminLeaves();
      console.log(res);
      if (Array.isArray(res)) {
        setLeave(res);
        const now = new Date();
        const notifs = res.filter(
          (item) =>
            (item.status === "approved" || item.status === "rejected") &&
            now - new Date(item.updatedAt) < oneDay
        ).length;
        console.log(notifs);
        setNotifications(notifs);
      }
    };
    getLeaves();
  }, []);

  async function fetchAdminDetails() {
    const res = await getAdminDashboard();
    if (res) {
      setMedicalLeaveTaken(res.medicalLeaveTaken);
      setMedicalLeaveLeft(res.medicalLeaveLeft);
      setCasualLeaveTaken(res.casualLeaveTaken);
      setCasualLeaveLeft(res.casualLeaveLeft);
      setOfficialLeaveTaken(res.officialLeaveTaken);
      setOfficialLeaveLeft(res.officialLeaveLeft);
    }
  }
  fetchAdminDetails();

  const statusClasses = (status) =>
    ({
      approved: "text-green-400 bg-green-400/10 border-green-400/20",
      rejected: "text-red-400 bg-red-400/10 border-red-400/20",
      pending: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    }[status] || "text-white/50 bg-white/5 border-white/10");

  const leaveStats = [
    {
      label: "Medical Leave",
      taken: medicalLeaveTaken,
      left: medicalLeaveLeft,
      icon: Stethoscope,
      color: "red",
    },
    {
      label: "Casual Leave",
      taken: casualLeaveTaken,
      left: casualLeaveLeft,
      icon: Coffee,
      color: "amber",
    },
    {
      label: "Official Leave",
      taken: officialLeaveTaken,
      left: officialLeaveLeft,
      icon: Briefcase,
      color: "indigo",
    },
  ];

  const colorMap = {
    red: { bg: "bg-red-500/10", border: "border-red-500/20", icon: "text-red-400", bar: "bg-red-500" },
    amber: { bg: "bg-amber-500/10", border: "border-amber-500/20", icon: "text-amber-400", bar: "bg-amber-500" },
    indigo: { bg: "bg-indigo-500/10", border: "border-indigo-500/20", icon: "text-indigo-400", bar: "bg-indigo-500" },
  };

  const getUsed = (taken, left) => {
    const t = parseInt(taken) || 0;
    const l = parseInt(left) || 0;
    const total = t + l;
    return total > 0 ? Math.round((t / total) * 100) : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F19] via-[#0D1117] to-[#111827]">
      {/* Sticky Navbar */}
      <nav ref={navRef} className="sticky top-0 z-50 border-b border-white/5 bg-[#0B0F19]/85 backdrop-blur-xl opacity-0">
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
              <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 border border-white/10 transition-all font-mooxy">
                <ArrowLeft size={14} /> Dashboard
              </button>
            </Link>
            <Link to="/adminleavenotifications">
              <button className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm bg-purple-600 hover:bg-purple-500 text-white font-mooxy shadow-lg shadow-purple-500/20 transition-all">
                <Bell size={14} />
                Notifications
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] bg-white text-purple-600 text-[10px] font-bold flex items-center justify-center rounded-full px-0.5">
                    {notifications}
                  </span>
                )}
              </button>
            </Link>
          </div>

          {/* Mobile */}
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
            <Link to="/adminleavenotifications" onClick={() => setMenuOpen(false)}>
              <button className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-purple-400 hover:text-purple-300 hover:bg-white/5 transition-all font-mooxy flex items-center gap-2">
                <Bell size={14} /> Notifications {notifications > 0 && `(${notifications})`}
              </button>
            </Link>
          </div>
        )}
      </nav>

      {/* Content */}
      <div ref={contentRef} className="max-w-[1200px] mx-auto px-5 py-10 opacity-0">
        {/* Page header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-mooxy mb-3">
            <Calendar size={11} /> Leave Management
          </div>
          <h1 className="font-growmajour text-3xl sm:text-4xl text-white">My Admin Leaves</h1>
          <p className="text-white/40 font-mooxy text-sm mt-2">Track your leave balance and application history below.</p>
        </div>

        {/* Leave balance cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {leaveStats.map(({ label, taken, left, icon: Icon, color }) => {
            const c = colorMap[color];
            const pct = getUsed(taken, left);
            return (
              <div key={label} className={`bg-white/[0.03] border ${c.border} rounded-2xl p-5 relative overflow-hidden`}>
                <div className={`absolute top-0 right-0 w-24 h-24 ${c.bg} rounded-full blur-2xl pointer-events-none translate-x-1/3 -translate-y-1/3`} />
                <div className="relative z-10">
                  <div className={`w-9 h-9 rounded-xl ${c.bg} flex items-center justify-center mb-4`}>
                    <Icon size={16} className={c.icon} />
                  </div>
                  <p className="text-white/40 font-mooxy text-xs uppercase tracking-wider mb-1">{label}</p>
                  <div className="flex items-end justify-between gap-2 mb-3">
                    <div>
                      <span className="text-white font-growmajour text-2xl">{taken ?? "—"}</span>
                      <span className="text-white/30 font-mooxy text-xs ml-1">taken</span>
                    </div>
                    <div className="text-right">
                      <span className={`font-growmajour text-2xl ${c.icon}`}>{left ?? "—"}</span>
                      <span className="text-white/30 font-mooxy text-xs ml-1">left</span>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full ${c.bar} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
                  </div>
                  <p className="text-white/25 font-mooxy text-xs mt-1.5 text-right">{pct}% used</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Leave request history */}
        <div>
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
            <h2 className="font-growmajour text-xl text-white flex items-center gap-2">
              <FileText size={18} className="text-purple-400" />
              My Leave Requests
            </h2>
            <span className="text-white/30 font-mooxy text-xs">{leave?.length ?? 0} total</span>
          </div>

          {leave && leave.length > 0 ? (
            <div className="flex flex-col gap-3">
              {leave.map((l) => (
                <div key={l._id} className="bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden hover:border-white/12 transition-all">
                  <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap mb-2">
                        <p className="text-white font-mooxy text-sm font-semibold">{l.type}</p>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mooxy border ${statusClasses(l.status)}`}>
                          {l.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-0.5">
                        <p className="text-white/35 font-mooxy text-xs">
                          Applied on {new Date(l.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                        {l.approvedBy && (
                          <p className="text-white/35 font-mooxy text-xs">Reviewed by <span className="text-white/55">{l.approvedBy}</span></p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setExpandedLeave(expandedLeave === l._id ? null : l._id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/8 text-white/50 hover:text-white text-xs font-mooxy transition-all flex-shrink-0"
                    >
                      {expandedLeave === l._id
                        ? <><ChevronUp size={13} /> Less</>
                        : <><ChevronDown size={13} /> Details</>}
                    </button>
                  </div>

                  {/* Expanded panel */}
                  {expandedLeave === l._id && (
                    <div className="border-t border-white/5 px-5 pb-5 pt-4 bg-white/[0.015]">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-white/40 font-mooxy text-xs uppercase tracking-wider mb-1">Reason</p>
                          <p className="text-white/70 font-mooxy text-sm">{l.reason || "—"}</p>
                        </div>
                        <div>
                          <p className="text-white/40 font-mooxy text-xs uppercase tracking-wider mb-1">From Date</p>
                          <p className="text-white/70 font-mooxy text-sm">
                            {l.fromDate ? new Date(l.fromDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                          </p>
                        </div>
                        <div>
                          <p className="text-white/40 font-mooxy text-xs uppercase tracking-wider mb-1">To Date</p>
                          <p className="text-white/70 font-mooxy text-sm">
                            {l.toDate ? new Date(l.toDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                          </p>
                        </div>
                      </div>
                      {l.supportingDocument && (
                        <a
                          href={l.supportingDocument}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white text-xs font-mooxy transition-all"
                        >
                          <FileText size={13} /> View Supporting Document
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white/[0.02] border border-white/6 rounded-2xl p-14 text-center">
              <Calendar size={36} className="text-white/10 mx-auto mb-4" />
              <p className="text-white/30 font-mooxy text-sm">No leave applications found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
