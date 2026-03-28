import { getAdminLeaves } from "../utils/GETAdminLeaves";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg.png";
import { Bell, ArrowLeft, Calendar, CheckCircle, XCircle, Clock, Menu, X } from "lucide-react";
import gsap from "gsap";

export default function AdminLeaveNotifications() {
  const [leavesNotifications, setLeavesNotifications] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const navRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(navRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" });
    gsap.fromTo(contentRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.2, ease: "power3.out" });
  }, []);

  useEffect(() => {
    const fetchLeaves = async () => {
      const res = await getAdminLeaves();
      if (res && Array.isArray(res.data)) {
        const now = new Date();
        const oneDay = 1000 * 60 * 60 * 24;
        const r = res.data.filter(
          (item) =>
            (item.status === "approved" || item.status === "rejected") &&
            now - new Date(item.updatedAt) < oneDay
        );
        setLeavesNotifications(r);
      } else {
        setLeavesNotifications([]);
        console.log("Error fetching leaves");
      }
    };
    fetchLeaves();
  }, []);

  const statusIcon = (status) => {
    if (status === "approved") return <CheckCircle size={16} className="text-green-400 flex-shrink-0" />;
    if (status === "rejected") return <XCircle size={16} className="text-red-400 flex-shrink-0" />;
    return <Clock size={16} className="text-amber-400 flex-shrink-0" />;
  };

  const statusPill = (status) => {
    const map = {
      approved: "text-green-400 bg-green-400/10 border-green-400/20",
      rejected: "text-red-400 bg-red-400/10 border-red-400/20",
      pending: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    };
    return map[status] || "text-white/50 bg-white/5 border-white/10";
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
              <span className="font-growmajour text-[18px] bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">REQUESTA</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            <Link to="/admindashboard">
              <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 border border-white/10 transition-all font-mooxy">
                <ArrowLeft size={14} /> Dashboard
              </button>
            </Link>
            <Link to="/adminleaves">
              <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm bg-purple-600 hover:bg-purple-500 text-white font-mooxy shadow-lg shadow-purple-500/20 transition-all">
                <Calendar size={14} /> My Leaves
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
            <Link to="/adminleaves" onClick={() => setMenuOpen(false)}>
              <button className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-purple-400 hover:text-purple-300 hover:bg-white/5 transition-all font-mooxy flex items-center gap-2">
                <Calendar size={14} /> My Leaves
              </button>
            </Link>
          </div>
        )}
      </nav>

      {/* Content */}
      <div ref={contentRef} className="max-w-[900px] mx-auto px-5 py-10 opacity-0">
        {/* Page header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-mooxy mb-3">
            <Bell size={11} /> Last 24 hours
          </div>
          <h1 className="font-growmajour text-3xl sm:text-4xl text-white">Leave Notifications</h1>
          <p className="text-white/40 font-mooxy text-sm mt-2">
            {leavesNotifications.length > 0
              ? `${leavesNotifications.length} leave update${leavesNotifications.length > 1 ? "s" : ""} from the last 24 hours.`
              : "No leave updates in the last 24 hours."}
          </p>
        </div>

        {/* Empty state */}
        {leavesNotifications.length === 0 && (
          <div className="bg-white/[0.02] border border-white/6 rounded-2xl p-16 text-center">
            <Bell size={40} className="text-white/10 mx-auto mb-4" />
            <p className="text-white/30 font-mooxy text-sm">No recent leave notifications.</p>
          </div>
        )}

        {/* Notifications */}
        {leavesNotifications.length > 0 && (
          <div className="flex flex-col gap-3">
            {leavesNotifications.map((l) => (
              <div key={l._id} className="bg-white/[0.03] border border-white/8 rounded-2xl p-5 hover:border-white/12 transition-all">
                <div className="flex items-start gap-3">
                  {statusIcon(l.status)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <p className="text-white font-mooxy text-sm leading-snug">
                        Your <span className="text-purple-300 font-semibold">{l.type || l.subject}</span> leave request has been
                      </p>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mooxy border ${statusPill(l.status)}`}>
                        {l.status}
                      </span>
                    </div>
                    <p className="text-white/35 font-mooxy text-xs mb-2">
                      Updated on {new Date(l.updatedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </p>
                    {l.remark && (
                      <div className="bg-white/[0.03] border border-white/8 rounded-xl px-4 py-2.5 mt-1">
                        <p className="text-white/40 font-mooxy text-xs uppercase tracking-wider mb-0.5">Remark</p>
                        <p className="text-white/70 font-mooxy text-sm">{l.remark}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
