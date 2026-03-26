import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { fetchCurrentStudent } from "../utils/GETStudentDashBoard";
import { submitLeaves } from "../utils/POSTLeaveApplication";
import { submitCertificate } from "../utils/POSTCertificateApplication";
import { useNavigate } from "react-router-dom";
import { getLeaves } from "../utils/GETLeavesForAStudent";
import { showAllCertificates } from "../utils/GETCertificatesForAStudent";
import { Menu, X, Bell, User, Plus, FileText, Calendar, Download, ChevronDown, ChevronUp, Upload, ArrowLeft } from "lucide-react";
import Loader from "./Loader";
import gsap from "gsap";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [home, setHome] = useState(true);
  const [createRequests, setCreateRequest] = useState(false);
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [regnNo, setregNo] = useState("");
  const [reason, setReason] = useState("");
  const [leave, setLeave] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [purpose, setPurpose] = useState("");
  const [certificateType, setCertificateType] = useState("");
  const [supportingDocument, setSupportingDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expandedLeave, setExpandedLeave] = useState(null);
  const [notifications, setNotifications] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const navRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(navRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" });
    gsap.fromTo(contentRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.2, ease: "power3.out" });
  }, []);

  function handleClickOnCreateRequest() {
    setHome(!home);
    setCreateRequest(!createRequests);
  }

  useEffect(() => {
    const fetchData = async () => {
      const student = await fetchCurrentStudent();
      if (student?._id) setID(student._id);
      if (student?.name) setName(student.name);
      if (student?.registrationNumber) setregNo(student.registrationNumber);
    };
    fetchData();
  }, [name]);

  const handleClickOnLeaveSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("Reason", reason);
    if (supportingDocument) formData.append("supportingDocument", supportingDocument);
    try {
      const res = await submitLeaves(formData);
      if (res.data) {
        toast.success("Leave submitted successfully");
        setSubject(""); setReason(""); setSupportingDocument(null);
        setTimeout(() => window.location.reload(), 1000);
      }
    } catch (err) { console.error(err); toast.error(err); }
  };

  async function handleClickOnCertificateSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData();
    form.append("purpose", purpose);
    form.append("CertificateType", certificateType);
    if (supportingDocument) form.append("supportingDocument", supportingDocument);
    try {
      const res = await submitCertificate(form);
      if (res.data) {
        toast.success("Certificate Submitted Successfully");
        setPurpose(""); setCertificateType(""); setSupportingDocument(null);
        setTimeout(() => window.location.reload(), 1000);
      }
    } catch (err) { toast.error("Error submitting application"); console.error(err); }
  }

  useEffect(() => {
    const notification = async () => {
      try {
        const now = new Date();
        const oneDay = 1000 * 60 * 60 * 24;
        const [res1, res2] = await Promise.all([getLeaves(), showAllCertificates()]);
        const r1 = res1.filter(i => (i.status === "approved" || i.status === "rejected") && now - new Date(i.updatedAt) < oneDay);
        const r2 = res2.filter(i => (i.status === "approved" || i.status === "rejected") && now - new Date(i.updatedAt) < oneDay);
        setNotifications(r1.length + r2.length);
        setLeave(res1);
        setCertificates(res2);
      } catch (err) { console.error(err); }
    };
    notification();
  }, []);

  const statusClasses = (status) => ({
    approved: "text-green-400 bg-green-400/10 border-green-400/20",
    rejected: "text-red-400 bg-red-400/10 border-red-400/20",
    pending: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  }[status] || "text-white/50 bg-white/5 border-white/10");

  const inputClass = "w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 font-mooxy text-sm outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F19] via-[#0D1117] to-[#111827] flex flex-col">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

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

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            <Link to="/notifications">
              <button className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all font-mooxy">
                <Bell size={15} />
                Notifications
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-4.5 h-4.5 min-w-[18px] bg-indigo-500 text-white text-[10px] font-mooxy flex items-center justify-center rounded-full">
                    {notifications}
                  </span>
                )}
              </button>
            </Link>
            <Link to="/studentprofile">
              <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all font-mooxy">
                <User size={15} />
                Profile
              </button>
            </Link>
            <button
              onClick={handleClickOnCreateRequest}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm bg-indigo-600 hover:bg-indigo-500 text-white font-mooxy shadow-lg shadow-indigo-500/20 transition-all"
            >
              {createRequests ? <ArrowLeft size={15} /> : <Plus size={15} />}
              {createRequests ? "Back to Dashboard" : "Create Request"}
            </button>
          </div>

          {/* Mobile */}
          <button className="md:hidden text-white/60 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-white/5 bg-[#0D1117] px-5 py-3 flex flex-col gap-1">
            <Link to="/notifications" onClick={() => setMenuOpen(false)}>
              <button className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all font-mooxy flex items-center gap-2">
                <Bell size={14} /> Notifications {notifications > 0 && `(${notifications})`}
              </button>
            </Link>
            <Link to="/studentprofile" onClick={() => setMenuOpen(false)}>
              <button className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all font-mooxy flex items-center gap-2">
                <User size={14} /> Profile
              </button>
            </Link>
            <button
              onClick={() => { handleClickOnCreateRequest(); setMenuOpen(false); }}
              className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-indigo-400 hover:text-indigo-300 hover:bg-white/5 transition-all font-mooxy flex items-center gap-2"
            >
              <Plus size={14} /> {createRequests ? "Back to Dashboard" : "Create Request"}
            </button>
          </div>
        )}
      </nav>

      {/* Content */}
      <div ref={contentRef} className="flex-1 opacity-0">
        {/* Dashboard Home */}
        {home && (
          <div className="max-w-[1200px] mx-auto px-5 py-10">
            {/* Welcome header */}
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-mooxy mb-3">
                Student Dashboard
              </div>
              <h1 className="font-growmajour text-3xl sm:text-4xl text-white">Welcome, <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">{name || "Student"}</span></h1>
              <p className="text-white/40 font-mooxy text-sm mt-2">Reg No: <span className="text-white/60">{regnNo}</span></p>
            </div>

            {/* My Leave Requests */}
            <section className="mb-10">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-growmajour text-xl text-white flex items-center gap-2">
                  <Calendar size={18} className="text-indigo-400" />
                  My Leave Requests
                </h2>
                <span className="text-white/30 font-mooxy text-xs">{leave.length} total</span>
              </div>
              {leave.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {leave.map((l) => (
                    <div key={l._id} className="bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden hover:border-white/12 transition-all">
                      <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 flex-wrap mb-2">
                            <p className="text-white font-mooxy text-sm font-semibold truncate">{l.subject}</p>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mooxy border ${statusClasses(l.status)}`}>
                              {l.status}
                            </span>
                          </div>
                          <p className="text-white/35 font-mooxy text-xs">
                            Applied on {new Date(l.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                            {l.approvedBy && <span className="ml-2 text-white/50">· Reviewed by {l.approvedBy}</span>}
                          </p>
                        </div>
                        <button
                          onClick={() => setExpandedLeave(expandedLeave === l._id ? null : l._id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/8 text-white/50 hover:text-white text-xs font-mooxy transition-all flex-shrink-0"
                        >
                          {expandedLeave === l._id ? <><ChevronUp size={13} /> Less</> : <><ChevronDown size={13} /> Details</>}
                        </button>
                      </div>
                      {expandedLeave === l._id && (
                        <div className="border-t border-white/5 px-5 pb-5 pt-4 bg-white/[0.015]">
                          <p className="text-white/50 font-mooxy text-xs uppercase tracking-wider mb-2">Reason</p>
                          <p className="text-white/70 font-mooxy text-sm leading-relaxed mb-4">{l.Reason}</p>
                          {l.supportingDocument && (
                            <a href={l.supportingDocument} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white text-xs font-mooxy transition-all">
                              <FileText size={13} /> View Supporting Document
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white/[0.02] border border-white/6 rounded-2xl p-10 text-center">
                  <Calendar size={32} className="text-white/15 mx-auto mb-3" />
                  <p className="text-white/30 font-mooxy text-sm">No leave applications yet.</p>
                </div>
              )}
            </section>

            {/* My Certificate Requests */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-growmajour text-xl text-white flex items-center gap-2">
                  <FileText size={18} className="text-purple-400" />
                  My Certificate Requests
                </h2>
                <span className="text-white/30 font-mooxy text-xs">{certificates.length} total</span>
              </div>
              {certificates.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {certificates.map((c) => (
                    <div key={c._id} className="bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden hover:border-white/12 transition-all">
                      <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 flex-wrap mb-2">
                            <p className="text-white font-mooxy text-sm font-semibold truncate">{c.purpose}</p>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mooxy border ${statusClasses(c.status)}`}>
                              {c.status}
                            </span>
                            {c.CertificateType && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mooxy border border-purple-500/20 text-purple-300 bg-purple-500/10">
                                {c.CertificateType}
                              </span>
                            )}
                          </div>
                          <p className="text-white/35 font-mooxy text-xs">
                            Applied on {new Date(c.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </p>
                        </div>
                        <button
                          onClick={() => setExpandedLeave(expandedLeave === c._id ? null : c._id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/8 text-white/50 hover:text-white text-xs font-mooxy transition-all flex-shrink-0"
                        >
                          {expandedLeave === c._id ? <><ChevronUp size={13} /> Less</> : <><ChevronDown size={13} /> Details</>}
                        </button>
                      </div>
                      {expandedLeave === c._id && (
                        <div className="border-t border-white/5 px-5 pb-5 pt-4 bg-white/[0.015] flex flex-wrap gap-3">
                          {c.supportingDocument && (
                            <a href={c.supportingDocument} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white text-xs font-mooxy transition-all">
                              <FileText size={13} /> View Supporting Doc
                            </a>
                          )}
                          {c.addCertificate && (
                            <a href={c.addCertificate} target="_blank" rel="noopener noreferrer" download
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 hover:bg-green-500/15 border border-green-500/25 text-green-300 hover:text-green-200 text-xs font-mooxy transition-all">
                              <Download size={13} /> Download Certificate
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white/[0.02] border border-white/6 rounded-2xl p-10 text-center">
                  <FileText size={32} className="text-white/15 mx-auto mb-3" />
                  <p className="text-white/30 font-mooxy text-sm">No certificate applications yet.</p>
                </div>
              )}
            </section>
          </div>
        )}

        {/* Create Request Forms */}
        {createRequests && !loading && (
          <div className="max-w-[1200px] mx-auto px-5 py-10">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-mooxy mb-3">
                <Plus size={11} /> New Request
              </div>
              <h1 className="font-growmajour text-3xl text-white">Submit a Request</h1>
              <p className="text-white/40 font-mooxy text-sm mt-1.5">Fill in one or both forms below to apply</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Leave Form */}
              <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
                    <Calendar size={18} className="text-indigo-400" />
                  </div>
                  <div>
                    <h2 className="font-growmajour text-lg text-white">Leave Application</h2>
                    <p className="text-white/35 font-mooxy text-xs">Submit a leave request</p>
                  </div>
                </div>
                <form className="flex flex-col gap-4 font-mooxy" onSubmit={handleClickOnLeaveSubmit} encType="multipart/form-data">
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Subject / Leave Days</label>
                    <input
                      className={inputClass}
                      placeholder="e.g. 3 days leave from 12-15 March"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Reason for Leave</label>
                    <textarea
                      className={`${inputClass} h-28 resize-none`}
                      placeholder="Explain your reason..."
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Supporting Document (optional)</label>
                    <label className="flex flex-col items-center justify-center gap-2 w-full h-20 bg-white/3 border border-dashed border-white/15 rounded-xl cursor-pointer hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-all">
                      <Upload size={16} className="text-white/30" />
                      <span className="text-white/30 text-xs font-mooxy">
                        {supportingDocument ? supportingDocument.name : "Click to upload image"}
                      </span>
                      <input type="file" className="hidden" onChange={(e) => setSupportingDocument(e.target.files[0])} key={supportingDocument?.name || ""} />
                    </label>
                  </div>
                  <button type="submit" className="w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-mooxy transition-all hover:scale-[1.01] active:scale-[0.98] shadow-lg shadow-indigo-500/20 mt-1">
                    Submit Leave Request
                  </button>
                </form>
              </div>

              {/* Certificate Form */}
              <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
                    <FileText size={18} className="text-purple-400" />
                  </div>
                  <div>
                    <h2 className="font-growmajour text-lg text-white">Certificate Application</h2>
                    <p className="text-white/35 font-mooxy text-xs">Request a certificate</p>
                  </div>
                </div>
                <form className="flex flex-col gap-4 font-mooxy" onSubmit={handleClickOnCertificateSubmit} encType="multipart/form-data">
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Purpose</label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="Purpose of applying for the certificate..."
                      required
                      onChange={(e) => setPurpose(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Type of Document</label>
                    <select
                      className={`${inputClass} appearance-none cursor-pointer`}
                      style={{ background: "rgba(255,255,255,0.04)" }}
                      required
                      onChange={(e) => setCertificateType(e.target.value)}
                    >
                      <option value="" className="bg-[#111827]">-- Select Document Type --</option>
                      <option value="Bonafide" className="bg-[#111827]">Bonafide</option>
                      <option value="Character" className="bg-[#111827]">Character Certificate</option>
                      <option value="Transfer" className="bg-[#111827]">Transfer Certificate</option>
                      <option value="Custom" className="bg-[#111827]">Custom Request</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Upload Required Document (optional)</label>
                    <label className="flex flex-col items-center justify-center gap-2 w-full h-20 bg-white/3 border border-dashed border-white/15 rounded-xl cursor-pointer hover:border-purple-500/40 hover:bg-purple-500/5 transition-all">
                      <Upload size={16} className="text-white/30" />
                      <span className="text-white/30 text-xs font-mooxy">
                        {supportingDocument ? supportingDocument.name : "Click to upload file"}
                      </span>
                      <input type="file" className="hidden" onChange={(e) => setSupportingDocument(e.target.files[0])} key={supportingDocument?.name || ""} />
                    </label>
                  </div>
                  <button type="submit" className="w-full h-11 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-mooxy transition-all hover:scale-[1.01] active:scale-[0.98] shadow-lg shadow-purple-500/20 mt-1">
                    Submit Certificate Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader />
            <p className="text-white/40 font-mooxy text-sm">Submitting your request…</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default StudentDashboard;
