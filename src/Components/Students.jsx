import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg.png";
import { getStudents } from "../utils/GETAllStudents";
import { getLeavesOfAStudentForAdmin } from "../utils/GETLeavesOfAStudentForAdmin";
import { getCertificateOfAStudentForAdmin } from "../utils/GETCertificateOfAStudentForAdmin";
import {
  ArrowLeft, Search, X, ChevronDown, ChevronUp,
  Users, Calendar, FileText, Menu
} from "lucide-react";
import gsap from "gsap";

const statusPill = (status) => {
  const map = {
    approved:  "text-green-400 bg-green-400/10 border-green-400/20",
    rejected:  "text-red-400 bg-red-400/10 border-red-400/20",
    pending:   "text-amber-400 bg-amber-400/10 border-amber-400/20",
    forwarded: "text-sky-400 bg-sky-400/10 border-sky-400/20",
  };
  return map[status] || "text-white/40 bg-white/5 border-white/10";
};

const Students = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [search, setSearch] = useState("");
  const [studentsList, setStudentsList] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [expand, setExpand] = useState(null);
  const [leaves, setLeaves] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const navRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(navRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" });
    gsap.fromTo(contentRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.2, ease: "power3.out" });
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await getStudents();
      setStudentsList(res || []);
      setFilteredStudents(res || []);
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    if (activeTab === "search") {
      const results = studentsList.filter(
        (student) =>
          student.name.toLowerCase().includes(search.toLowerCase()) ||
          student.registrationNumber.toString().includes(search)
      );
      setFilteredStudents(results);
    } else {
      setFilteredStudents(studentsList);
    }
  }, [search, studentsList, activeTab]);

  const handleViewRequests = async (studentId) => {
    if (expand === studentId) { setExpand(null); return; }
    setExpand(studentId);
    const leavesData = await getLeavesOfAStudentForAdmin(studentId);
    setLeaves(leavesData || []);
  };

  const handleViewCertificates = async (student) => {
    if (expand === student) { setExpand(null); return; }
    setExpand(student);
    const certificatesData = await getCertificateOfAStudentForAdmin(student);
    setCertificates(certificatesData || []);
  };

  const inputCls = "w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 font-mooxy text-sm outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F19] via-[#0D1117] to-[#111827]">
      {/* Navbar */}
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

          <div className="hidden md:flex items-center gap-2">
            <Link to="/admindashboard">
              <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 border border-white/10 transition-all font-mooxy">
                <ArrowLeft size={14} /> Dashboard
              </button>
            </Link>
            <button
              onClick={() => setActiveTab(activeTab === "search" ? "home" : "search")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm border font-mooxy transition-all ${
                activeTab === "search"
                  ? "bg-indigo-600 border-indigo-500 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/5 border-white/10"
              }`}
            >
              {activeTab === "search" ? <X size={14} /> : <Search size={14} />}
              {activeTab === "search" ? "Close Search" : "Search"}
            </button>
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
            <button
              onClick={() => { setActiveTab(activeTab === "search" ? "home" : "search"); setMenuOpen(false); }}
              className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all font-mooxy flex items-center gap-2"
            >
              <Search size={14} /> Search Students
            </button>
          </div>
        )}
      </nav>

      {/* Content */}
      <div ref={contentRef} className="max-w-[1200px] mx-auto px-5 py-10 opacity-0">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-mooxy mb-3">
            <Users size={11} /> Student Directory
          </div>
          <h1 className="font-growmajour text-3xl sm:text-4xl text-white">All Students</h1>
          <p className="text-white/40 font-mooxy text-sm mt-2">
            {filteredStudents.length} student{filteredStudents.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Search bar */}
        {activeTab === "search" && (
          <div className="mb-6 relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name or registration number…"
              className={`${inputCls} pl-10`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                <X size={15} />
              </button>
            )}
          </div>
        )}

        {/* Student list */}
        <div className="flex flex-col gap-3">
          {filteredStudents.length === 0 && (
            <div className="bg-white/[0.02] border border-white/6 rounded-2xl p-14 text-center">
              <Users size={36} className="text-white/10 mx-auto mb-4" />
              <p className="text-white/30 font-mooxy text-sm">No students found.</p>
            </div>
          )}

          {filteredStudents.map((stu) => (
            <div key={stu._id} className="bg-white/[0.03] border border-white/8 hover:border-white/12 rounded-2xl overflow-hidden transition-all">
              {/* Student row */}
              <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-white font-mooxy font-semibold text-sm truncate">{stu.name}</p>
                  <p className="text-white/35 font-mooxy text-xs mt-0.5">Reg No: {stu.registrationNumber}</p>
                </div>
                <button
                  onClick={() => { handleViewRequests(stu._id); handleViewCertificates(stu._id); }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 text-xs font-mooxy transition-all flex-shrink-0"
                >
                  {expand === stu._id ? <><ChevronUp size={13} /> Hide</> : <><ChevronDown size={13} /> View Requests</>}
                </button>
              </div>

              {/* Expanded panel */}
              {expand === stu._id && (
                <div className="border-t border-white/5 px-5 pb-5 pt-4 bg-white/[0.015]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Leaves */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar size={14} className="text-indigo-400" />
                        <p className="text-white/50 font-mooxy text-xs uppercase tracking-wider">Leave Requests</p>
                      </div>
                      {leaves.length > 0 ? (
                        <div className="flex flex-col gap-2">
                          {leaves.map((leave) => (
                            <div key={leave._id} className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.03] border border-white/6">
                              <p className="text-white/70 font-mooxy text-xs truncate">{leave.subject}</p>
                              <span className={`ml-2 inline-flex px-2 py-0.5 rounded-full text-[10px] font-mooxy border flex-shrink-0 ${statusPill(leave.status)}`}>
                                {leave.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-white/20 font-mooxy text-xs">No leave requests.</p>
                      )}
                    </div>

                    {/* Certificates */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <FileText size={14} className="text-purple-400" />
                        <p className="text-white/50 font-mooxy text-xs uppercase tracking-wider">Certificate Requests</p>
                      </div>
                      {certificates.length > 0 ? (
                        <div className="flex flex-col gap-2">
                          {certificates.map((cert) => (
                            <div key={cert._id} className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.03] border border-white/6">
                              <p className="text-white/70 font-mooxy text-xs truncate">{cert.purpose}</p>
                              <span className={`ml-2 inline-flex px-2 py-0.5 rounded-full text-[10px] font-mooxy border flex-shrink-0 ${statusPill(cert.status)}`}>
                                {cert.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-white/20 font-mooxy text-xs">No certificate requests.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Students;
