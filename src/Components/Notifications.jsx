import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";
import { getLeaves } from "../utils/GETLeavesForAStudent";
import { showAllCertificates } from "../utils/GETCertificatesForAStudent";
import { useState, useEffect, useRef } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Bell, Calendar, FileText, User, ArrowLeft, Download, Menu, X, CheckCircle, XCircle, Clock } from "lucide-react";
import gsap from "gsap";

export default function Notifications() {
  const [leaves, setLeaves] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [leaverequests, setLeaveRequests] = useState(0);
  const [certificateRequets, setCertificateRequests] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const navRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(navRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" });
    gsap.fromTo(contentRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.2, ease: "power3.out" });
  }, []);

  async function showLeaves() {
    try {
      const res = await getLeaves();
      if (!Array.isArray(res)) return;
      
      const now = new Date();
      const oneDay = 1000 * 60 * 60 * 24;
      const r = res.filter(
        (item) =>
          (item.status === "approved" || item.status === "rejected") &&
          now - new Date(item.updatedAt) < oneDay
      );
      setLeaves(r);
      setLeaveRequests(r.length);
    } catch (err) { console.log(err); }
  }

  async function showCertificates() {
    try {
      const res = await showAllCertificates();
      if (!Array.isArray(res)) return;
      
      const now = new Date();
      const oneDay = 1000 * 60 * 60 * 24;
      const r = res.filter(
        (item) =>
          (item.status === "approved" || item.status === "rejected") &&
          now - new Date(item.updatedAt) < oneDay
      );
      setCertificates(r);
      setCertificateRequests(r.length);
    } catch (err) { console.log(err); }
  }

  useEffect(() => {
    showLeaves();
    showCertificates();
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

  const total = leaverequests + certificateRequets;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F19] via-[#0D1117] to-[#111827]">
      {/* Sticky Navbar */}
      <nav ref={navRef} className="sticky top-0 z-50 border-b border-white/5 bg-[#0B0F19]/85 backdrop-blur-xl opacity-0">
        <div className="max-w-[1200px] mx-auto px-5 h-16 flex items-center justify-between">
          <Link to="/">
            <div className="flex items-center gap-2.5 cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
                <img src={logo} alt="Requesta" className="w-5 h-5" />
              </div>
              <span className="font-growmajour text-[18px] bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent">REQUESTA</span>
            </div>
          </Link>

          <div className="hidden sm:flex items-center gap-2">
            <Link to="/studentdashboard">
              <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 border border-white/10 transition-all font-mooxy">
                <ArrowLeft size={14} /> Dashboard
              </button>
            </Link>
            <Link to="/studentprofile">
              <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all font-mooxy">
                <User size={14} /> Profile
              </button>
            </Link>
            <ScrollLink to="leave" smooth duration={400}>
              <button className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all font-mooxy cursor-pointer">
                <Calendar size={14} /> Leaves
                {leaverequests > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] bg-indigo-500 text-white text-[10px] font-mooxy flex items-center justify-center rounded-full px-0.5">{leaverequests}</span>
                )}
              </button>
            </ScrollLink>
            <ScrollLink to="cert" smooth duration={400}>
              <button className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all font-mooxy cursor-pointer">
                <FileText size={14} /> Certificates
                {certificateRequets > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] bg-indigo-500 text-white text-[10px] font-mooxy flex items-center justify-center rounded-full px-0.5">{certificateRequets}</span>
                )}
              </button>
            </ScrollLink>
          </div>

          <button className="sm:hidden text-white/60 hover:text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {isOpen && (
          <div className="sm:hidden border-t border-white/5 bg-[#0D1117] px-5 py-3 flex flex-col gap-1">
            <Link to="/studentdashboard" onClick={() => setIsOpen(false)}>
              <button className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all font-mooxy flex items-center gap-2">
                <ArrowLeft size={14} /> Dashboard
              </button>
            </Link>
            <Link to="/studentprofile" onClick={() => setIsOpen(false)}>
              <button className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all font-mooxy flex items-center gap-2">
                <User size={14} /> Profile
              </button>
            </Link>
          </div>
        )}
      </nav>

      {/* Content */}
      <div ref={contentRef} className="max-w-[900px] mx-auto px-5 py-10 opacity-0">
        {/* Page header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-mooxy mb-3">
            <Bell size={11} /> Last 24 hours
          </div>
          <h1 className="font-growmajour text-3xl sm:text-4xl text-white">Your Notifications</h1>
          <p className="text-white/40 font-mooxy text-sm mt-2">
            {total > 0
              ? `You have ${total} update${total > 1 ? "s" : ""} from the last 24 hours.`
              : "All caught up — no new updates in the last 24 hours."}
          </p>
        </div>

        {/* Empty state */}
        {leaves.length === 0 && certificates.length === 0 && (
          <div className="bg-white/[0.02] border border-white/6 rounded-2xl p-16 text-center">
            <Bell size={40} className="text-white/10 mx-auto mb-4" />
            <p className="text-white/30 font-mooxy text-sm">No notifications in the last 24 hours.</p>
          </div>
        )}

        {/* Leave Notifications */}
        {leaves.length > 0 && (
          <section className="mb-10" id="leave">
            <div className="flex items-center gap-2 mb-5 pb-4 border-b border-white/5">
              <Calendar size={17} className="text-indigo-400" />
              <h2 className="font-growmajour text-lg text-white">Leave Request Updates</h2>
              <span className="ml-auto text-white/30 font-mooxy text-xs">{leaves.length}</span>
            </div>
            <div className="flex flex-col gap-3">
              {leaves.map((l) => (
                <div key={l._id} className="bg-white/[0.03] border border-white/8 rounded-2xl p-5 hover:border-white/12 transition-all">
                  <div className="flex items-start gap-3">
                    {statusIcon(l.status)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <p className="text-white font-mooxy text-sm leading-snug">
                          Your leave request <span className="text-indigo-300 font-semibold">"{l.subject}"</span> has been
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
          </section>
        )}

        {/* Certificate Notifications */}
        {certificates.length > 0 && (
          <section id="cert">
            <div className="flex items-center gap-2 mb-5 pb-4 border-b border-white/5">
              <FileText size={17} className="text-purple-400" />
              <h2 className="font-growmajour text-lg text-white">Certificate Request Updates</h2>
              <span className="ml-auto text-white/30 font-mooxy text-xs">{certificates.length}</span>
            </div>
            <div className="flex flex-col gap-3">
              {certificates.map((c) => (
                <div key={c._id} className="bg-white/[0.03] border border-white/8 rounded-2xl p-5 hover:border-white/12 transition-all">
                  <div className="flex items-start gap-3">
                    {statusIcon(c.status)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <p className="text-white font-mooxy text-sm leading-snug">
                          Your <span className="text-purple-300 font-semibold">{c.CertificateType} Certificate</span> request
                          {c.purpose && <> — "{c.purpose}"</>} has been
                        </p>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mooxy border ${statusPill(c.status)}`}>
                          {c.status}
                        </span>
                      </div>
                      <p className="text-white/35 font-mooxy text-xs mb-2">
                        Updated on {new Date(c.updatedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </p>
                      {c.remark && (
                        <div className="bg-white/[0.03] border border-white/8 rounded-xl px-4 py-2.5 mt-1 mb-3">
                          <p className="text-white/40 font-mooxy text-xs uppercase tracking-wider mb-0.5">Remark</p>
                          <p className="text-white/70 font-mooxy text-sm">{c.remark}</p>
                        </div>
                      )}
                      {c.addCertificate && (
                        <a
                          href={c.addCertificate}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 hover:bg-green-500/15 border border-green-500/25 text-green-300 hover:text-green-200 text-xs font-mooxy transition-all"
                        >
                          <Download size={13} /> Download Certificate
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
