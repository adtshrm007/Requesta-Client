import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";
import { getAllLeaves } from "../utils/GETAllLeaves";
import { getAllCertificatesRequests } from "../utils/GETAllCertificateRequests";
import { useState, useEffect, useRef } from "react";
import { getFacultyLeaves } from "../utils/GETFacultyLeaves";
import { getDepartmentalAdminLeave } from "../utils/GETDepartmentalAdminLeaves";
import { getLeavesForDepartmentalAdmin } from "../utils/GETLeavesForDepartmentalAdmin";
import { getSuperAdminLeaves } from "../utils/GETLeavesForSuperAdmin";
import { getAdminDashboard } from "../utils/GETAdminDashBoard";
import { Bell, Calendar, FileText, User, ArrowLeft, Users, ShieldCheck, Menu, X, Clock } from "lucide-react";
import gsap from "gsap";

export default function NotificationsForAdmin() {
  const [leaves, setLeaves] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [facultyLeaves, setFacultyLeaves] = useState([]);
  const [departmetalLeaves, setDepartmentalLeaves] = useState([]);
  const [faculty, setFaculty] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navRef = useRef(null);
  const contentRef = useRef(null);

  const [role, setRole] = useState(null);

  useEffect(() => {
    gsap.fromTo(navRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" });
    gsap.fromTo(contentRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.2, ease: "power3.out" });

    const fetchRoleAndData = async () => {
      try {
        const adminData = await getAdminDashboard();
        if (adminData?.role) {
          setRole(adminData.role);
          const currentRole = adminData.role;

          if (currentRole === "Faculty") {
            const res = await getAllLeaves();
            if (Array.isArray(res)) setLeaves(res.filter(i => i.status === "pending"));
          } else if (currentRole === "Departmental Admin") {
            const studentLeaves = await getLeavesForDepartmentalAdmin();
            if (Array.isArray(studentLeaves)) setLeaves(studentLeaves.filter(i => i.status === "pending" || i.status === "forwarded"));
            
            const pFacultyLeaves = await getFacultyLeaves();
            if (Array.isArray(pFacultyLeaves)) {
              const pendingF = pFacultyLeaves.filter(i => i.status === "pending");
              setFacultyLeaves(pendingF);
              if (pendingF.length > 0) setFaculty(true);
            }
          } else if (currentRole === "Super Admin") {
            const certs = await getAllCertificatesRequests();
            if (Array.isArray(certs)) setCertificates(certs.filter(i => i.status === "pending"));

            const dLeaves = await getDepartmentalAdminLeave();
            if (Array.isArray(dLeaves)) setDepartmentalLeaves(dLeaves.filter(i => i.status === "pending"));
          }
        }
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };
    fetchRoleAndData();
  }, []);

  const total = leaves.length + certificates.length + facultyLeaves.length + departmetalLeaves.length;

  const NotifCard = ({ children }) => (
    <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-5 hover:border-white/12 transition-all flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Clock size={14} className="text-amber-400" />
      </div>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );

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
            <Link to="/adminprofile">
              <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all font-mooxy">
                <User size={14} /> Profile
              </button>
            </Link>
            {total > 0 && (
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-300 text-sm font-mooxy">
                <Bell size={14} />
                {total} pending action{total > 1 ? "s" : ""}
              </div>
            )}
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
            <Link to="/adminprofile" onClick={() => setMenuOpen(false)}>
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-mooxy mb-3">
            <Bell size={11} /> Admin Panel
          </div>
          <h1 className="font-growmajour text-3xl sm:text-4xl text-white">Admin Notifications</h1>
          <p className="text-white/40 font-mooxy text-sm mt-2">
            {total > 0
              ? `${total} pending request${total > 1 ? "s" : ""} awaiting your action.`
              : "No pending requests at this time."}
          </p>
        </div>

        {/* Empty state */}
        {leaves.length === 0 && certificates.length === 0 && facultyLeaves.length === 0 && departmetalLeaves.length === 0 && (
          <div className="bg-white/[0.02] border border-white/6 rounded-2xl p-16 text-center">
            <Bell size={40} className="text-white/10 mx-auto mb-4" />
            <p className="text-white/30 font-mooxy text-sm">No pending notifications.</p>
          </div>
        )}

        {/* Student Leave Requests */}
        {leaves.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-5 pb-4 border-b border-white/5">
              <Calendar size={17} className="text-indigo-400" />
              <h2 className="font-growmajour text-lg text-white">Pending Student Leave Requests</h2>
              <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mooxy">{leaves.length} pending</span>
            </div>
            <div className="flex flex-col gap-3">
              {leaves.map((l) => (
                <NotifCard key={l._id}>
                  <p className="text-white font-mooxy text-sm leading-snug">
                    <span className="text-indigo-300 font-semibold">{l.studentName}</span>
                    <span className="text-white/50"> (Reg No: {l.studentId?.registrationNumber})</span>
                    {" "}applied for leave — <span className="text-white/80">"{l.subject}"</span>
                  </p>
                  <p className="text-white/35 font-mooxy text-xs mt-1.5">
                    Applied on {new Date(l.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    {" · "}
                    <span className="text-amber-400">pending</span>
                  </p>
                </NotifCard>
              ))}
            </div>
          </section>
        )}

        {/* Certificate Requests */}
        {certificates.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-5 pb-4 border-b border-white/5">
              <FileText size={17} className="text-purple-400" />
              <h2 className="font-growmajour text-lg text-white">Pending Certificate Requests</h2>
              <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mooxy">{certificates.length} pending</span>
            </div>
            <div className="flex flex-col gap-3">
              {certificates.map((c) => (
                <NotifCard key={c._id}>
                  <p className="text-white font-mooxy text-sm leading-snug">
                    Certificate request for <span className="text-purple-300 font-semibold">{c.CertificateType} Certificate</span>
                    {" "}is pending review.
                  </p>
                  <p className="text-white/35 font-mooxy text-xs mt-1.5">
                    Applied on {new Date(c.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    {" · "}
                    <span className="text-amber-400">pending</span>
                  </p>
                </NotifCard>
              ))}
            </div>
          </section>
        )}

        {/* Faculty Leave Requests */}
        {faculty && facultyLeaves.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-5 pb-4 border-b border-white/5">
              <Users size={17} className="text-sky-400" />
              <h2 className="font-growmajour text-lg text-white">Pending Faculty Leave Requests</h2>
              <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mooxy">{facultyLeaves.length} pending</span>
            </div>
            <div className="flex flex-col gap-3">
              {facultyLeaves.map((l) => (
                <NotifCard key={l._id}>
                  <p className="text-white font-mooxy text-sm leading-snug">
                    <span className="text-sky-300 font-semibold">{l.admin?.name}</span>
                    <span className="text-white/50"> (ID: {l.admin?.adminID})</span>
                    {" "}applied for <span className="text-white/80">{l.type}</span> leave.
                  </p>
                  <p className="text-white/35 font-mooxy text-xs mt-1.5">
                    Applied on {new Date(l.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    {" · "}
                    <span className="text-amber-400">pending</span>
                  </p>
                </NotifCard>
              ))}
            </div>
          </section>
        )}

        {/* Departmental Admin Leaves */}
        {departmetalLeaves.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-5 pb-4 border-b border-white/5">
              <ShieldCheck size={17} className="text-green-400" />
              <h2 className="font-growmajour text-lg text-white">Pending Departmental Admin Leaves</h2>
              <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mooxy">{departmetalLeaves.length} pending</span>
            </div>
            <div className="flex flex-col gap-3">
              {departmetalLeaves.map((l) => (
                <NotifCard key={l._id}>
                  <p className="text-white font-mooxy text-sm leading-snug">
                    <span className="text-green-300 font-semibold">{l.admin?.name}</span>
                    <span className="text-white/50"> (ID: {l.admin?.adminID})</span>
                    {" "}applied for <span className="text-white/80">{l.type}</span> leave.
                  </p>
                  <p className="text-white/35 font-mooxy text-xs mt-1.5">
                    Applied on {new Date(l.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    {" · "}
                    <span className="text-amber-400">pending</span>
                  </p>
                </NotifCard>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
