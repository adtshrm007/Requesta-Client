import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import {
  Menu, X, ArrowLeft, Filter, Calendar, FileText, CheckCircle,
  XCircle, Clock, Upload, ChevronDown, ExternalLink, AlertCircle,
  MessageSquare, Users, ShieldCheck, UserCheck
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllLeaves } from "../utils/GETAllLeaves";
import { updateLeaveStatus } from "../utils/UpdateLeaveStatus";
import { getAllCertificatesRequests } from "../utils/GETAllCertificateRequests";
import { updateCertificateStatus } from "../utils/UPDATECertificateStatus";
import { ToastContainer, toast } from "react-toastify";
import { updateAdminLeaves } from "../utils/UPDATEAdminLeaves";
import { getSuperAdminLeaves } from "../utils/GETLeavesForSuperAdmin";
import { getFacultyLeaves } from "../utils/GETFacultyLeaves";
import { getAdmins } from "../utils/GETOtherAdminsData";
import { getDepartmentalAdmin } from "../utils/GETDepartmentalAdmin";
import { getLeavesForDepartmentalAdmin } from "../utils/GETLeavesForDepartmentalAdmin";
import { getDepartmentalAdminLeave } from "../utils/GETDepartmentalAdminLeaves";

// ─── Design tokens ──────────────────────────────────────────────────────────
const statusConfig = {
  pending:   { label: "Pending",   cls: "text-amber-400 bg-amber-400/10 border-amber-400/25",  icon: Clock },
  approved:  { label: "Approved",  cls: "text-green-400 bg-green-400/10 border-green-400/25",  icon: CheckCircle },
  rejected:  { label: "Rejected",  cls: "text-red-400 bg-red-400/10 border-red-400/25",         icon: XCircle },
  forwarded: { label: "Forwarded", cls: "text-sky-400 bg-sky-400/10 border-sky-400/25",         icon: UserCheck },
};
const StatusPill = ({ status }) => {
  const cfg = statusConfig[status] || statusConfig.pending;
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mooxy border ${cfg.cls}`}>
      <Icon size={11} /> {cfg.label}
    </span>
  );
};

// Shared input classes
const inputCls = "w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 font-mooxy text-sm outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/20 transition-all";

// ─── Section heading ─────────────────────────────────────────────────────────
const SectionHeading = ({ icon: Icon, title, count, color = "indigo", id }) => {
  const colors = {
    indigo: "text-indigo-400", sky: "text-sky-400", purple: "text-purple-400",
    green: "text-green-400", amber: "text-amber-400", red: "text-red-400",
  };
  return (
    <div id={id} className="flex items-center gap-2 mb-5 pt-8 pb-4 border-b border-white/5">
      <Icon size={18} className={colors[color]} />
      <h2 className="font-growmajour text-lg text-white">{title}</h2>
      {count != null && (
        <span className="ml-auto text-white/30 font-mooxy text-xs">{count} {count === 1 ? "entry" : "entries"}</span>
      )}
    </div>
  );
};

// ─── Leave card ──────────────────────────────────────────────────────────────
const LeaveCard = ({
  l, remark, setRemark, remarkBox, setRemarkBox, confirm, handleConfirm,
  onAccept, onReject, onForward, onAcceptAdmin, onRejectAdmin,
  showAcceptReject, showForwardReject, isAdminType = false,
}) => (
  <div className="bg-white/[0.03] border border-white/8 hover:border-white/12 rounded-2xl overflow-hidden transition-all">
    <div className="p-5">
      {/* Header row */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <p className="text-white font-mooxy font-semibold text-sm">
              {isAdminType
                ? `${l.admin?.name}` 
                : (l.studentName || l.studentId?.name || "Student")}
            </p>
            <StatusPill status={l.status} />
          </div>
          <p className="text-white/35 font-mooxy text-xs">
            {isAdminType
              ? `Admin ID: ${l.admin?.adminID}`
              : `Reg No: ${l.studentId?.registrationNumber || "N/A"}`}
          </p>
        </div>
        <p className="text-white/25 font-mooxy text-xs">
          {new Date(l.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
        </p>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
        <div>
          <p className="text-white/35 font-mooxy text-[11px] uppercase tracking-wider mb-0.5">Subject / Type</p>
          <p className="text-white/70 font-mooxy text-sm">{l.subject || l.type || "—"}</p>
        </div>
        {l.Reason || l.reason ? (
          <div className="col-span-2 sm:col-span-1">
            <p className="text-white/35 font-mooxy text-[11px] uppercase tracking-wider mb-0.5">Reason</p>
            <p className="text-white/70 font-mooxy text-sm line-clamp-2">{l.Reason || l.reason}</p>
          </div>
        ) : null}
        {l.fromDate && (
          <div>
            <p className="text-white/35 font-mooxy text-[11px] uppercase tracking-wider mb-0.5">From → To</p>
            <p className="text-white/70 font-mooxy text-sm">
              {new Date(l.fromDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
              {" → "}
              {l.toDate ? new Date(l.toDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "—"}
            </p>
          </div>
        )}
      </div>

      {/* Supporting doc */}
      {l.supportingDocument && (
        <a
          href={l.supportingDocument}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 hover:text-white text-xs font-mooxy transition-all mb-4"
        >
          <ExternalLink size={12} /> View Document
        </a>
      )}

      {/* Remark toggle + textarea */}
      <button
        onClick={() => setRemarkBox(remarkBox === l._id ? null : l._id)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 hover:text-white text-xs font-mooxy transition-all mb-3"
      >
        <MessageSquare size={12} /> {remarkBox === l._id ? "Hide Remark" : "Add Remark"}
      </button>

      {remarkBox === l._id && (
        <textarea
          rows={2}
          placeholder="Enter remark before approving / rejecting…"
          value={remark[l._id] || ""}
          onChange={(e) => setRemark((prev) => ({ ...prev, [l._id]: e.target.value }))}
          className={`${inputCls} resize-none mb-3`}
        />
      )}

      {/* Confirm */}
      {confirm === l._id && (
        <button
          onClick={handleConfirm}
          className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-mooxy transition-all mb-3"
        >
          Confirm Action
        </button>
      )}
    </div>

    {/* Action footer */}
    {(showAcceptReject || showForwardReject) && (
      <div className="border-t border-white/5 px-5 py-3 flex flex-wrap gap-2 bg-white/[0.015]">
        {showAcceptReject && (
          <>
            <button
              onClick={() => isAdminType ? onAcceptAdmin(l._id) : onAccept(l._id)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-green-500/15 hover:bg-green-500/25 border border-green-500/30 text-green-300 text-xs font-mooxy transition-all"
            >
              <CheckCircle size={12} /> Accept
            </button>
            <button
              onClick={() => isAdminType ? onRejectAdmin(l._id) : onReject(l._id)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-300 text-xs font-mooxy transition-all"
            >
              <XCircle size={12} /> Reject
            </button>
          </>
        )}
        {showForwardReject && (
          <>
            <button
              onClick={() => onForward(l._id)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 text-xs font-mooxy transition-all"
            >
              <UserCheck size={12} /> Forward
            </button>
            <button
              onClick={() => onReject(l._id)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-300 text-xs font-mooxy transition-all"
            >
              <XCircle size={12} /> Reject
            </button>
          </>
        )}
      </div>
    )}
  </div>
);

// ─── Certificate card ─────────────────────────────────────────────────────────
const CertCard = ({
  c, remark, setRemark, remarkBox, setRemarkBox, confirm, handleConfirm,
  certificate, setCertificate, onAccept, onReject, onForward,
  showActions,
}) => (
  <div className="bg-white/[0.03] border border-white/8 hover:border-white/12 rounded-2xl overflow-hidden transition-all">
    <div className="p-5">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <p className="text-white font-mooxy font-semibold text-sm">
              {c.studentName || c.studentId?.name || "Student"}
            </p>
            <StatusPill status={c.status} />
          </div>
          <p className="text-white/35 font-mooxy text-xs">
            Reg No: {c.studentId?.registrationNumber || "N/A"}
          </p>
        </div>
        <p className="text-white/25 font-mooxy text-xs">
          {new Date(c.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
        <div>
          <p className="text-white/35 font-mooxy text-[11px] uppercase tracking-wider mb-0.5">Certificate Type</p>
          <p className="text-white/70 font-mooxy text-sm">{c.CertificateType || "—"}</p>
        </div>
        <div>
          <p className="text-white/35 font-mooxy text-[11px] uppercase tracking-wider mb-0.5">Purpose</p>
          <p className="text-white/70 font-mooxy text-sm">{c.purpose || "—"}</p>
        </div>
        {c.remark && (
          <div>
            <p className="text-white/35 font-mooxy text-[11px] uppercase tracking-wider mb-0.5">Admin Remark</p>
            <p className="text-white/70 font-mooxy text-sm">{c.remark}</p>
          </div>
        )}
      </div>

      {c.addCertificate && (
        <a
          href={c.addCertificate}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 hover:bg-green-500/15 border border-green-500/25 text-green-300 text-xs font-mooxy transition-all mb-4"
        >
          <ExternalLink size={12} /> View Certificate
        </a>
      )}

      {showActions && (
        <>
          <button
            onClick={() => setRemarkBox(remarkBox === c._id ? null : c._id)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 hover:text-white text-xs font-mooxy transition-all mb-3"
          >
            <MessageSquare size={12} /> {remarkBox === c._id ? "Hide Remark" : "Add Remark"}
          </button>

          {remarkBox === c._id && (
            <textarea
              rows={2}
              placeholder="Enter remark before approving / rejecting…"
              value={remark[c._id] || ""}
              onChange={(e) => setRemark((prev) => ({ ...prev, [c._id]: e.target.value }))}
              className={`${inputCls} resize-none mb-3`}
            />
          )}

          <div className="mb-3">
            <label className="flex flex-col items-center justify-center gap-1.5 w-full h-16 bg-white/3 border border-dashed border-white/15 rounded-xl cursor-pointer hover:border-purple-500/40 hover:bg-purple-500/5 transition-all">
              <Upload size={14} className="text-white/30" />
              <span className="text-white/30 text-xs font-mooxy">
                {certificate[c._id] ? certificate[c._id].name : "Upload Certificate"}
              </span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setCertificate((prev) => ({ ...prev, [c._id]: e.target.files[0] }))}
              />
            </label>
          </div>

          {confirm === c._id && (
            <button
              onClick={handleConfirm}
              className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-mooxy transition-all mb-3"
            >
              Confirm Action
            </button>
          )}
        </>
      )}
    </div>

    {showActions && (
      <div className="border-t border-white/5 px-5 py-3 flex flex-wrap gap-2 bg-white/[0.015]">
        <button
          onClick={() => onAccept(c._id)}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-green-500/15 hover:bg-green-500/25 border border-green-500/30 text-green-300 text-xs font-mooxy transition-all"
        >
          <CheckCircle size={12} /> Approve
        </button>
        <button
          onClick={() => onForward(c._id)}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 text-xs font-mooxy transition-all"
        >
          <UserCheck size={12} /> Forward
        </button>
        <button
          onClick={() => onReject(c._id)}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-300 text-xs font-mooxy transition-all"
        >
          <XCircle size={12} /> Reject
        </button>
      </div>
    )}
  </div>
);

// ─── Empty state ─────────────────────────────────────────────────────────────
const EmptyState = ({ label }) => (
  <div className="bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-10 text-center">
    <AlertCircle size={28} className="text-white/10 mx-auto mb-3" />
    <p className="text-white/25 font-mooxy text-sm">{label}</p>
  </div>
);

// ─── Read-only info card (approved / rejected sections) ───────────────────────
const InfoCard = ({ l, isAdminType = false }) => (
  <div className="bg-white/[0.02] border border-white/6 rounded-2xl p-5 hover:border-white/10 transition-all">
    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
      <div className="flex items-center gap-2 flex-wrap">
        <p className="text-white/70 font-mooxy text-sm font-semibold">
          {isAdminType
            ? `${l.admin?.name} (${l.admin?.adminID})`
            : `${l.studentName || l.studentId?.name || "Student"} — ${l.studentId?.registrationNumber || ""}`}
        </p>
        <StatusPill status={l.status} />
      </div>
      <p className="text-white/20 font-mooxy text-xs">
        {new Date(l.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
      </p>
    </div>
    <div className="flex flex-wrap gap-x-6 gap-y-1">
      <p className="text-white/35 font-mooxy text-xs">{l.subject || l.type || l.CertificateType}</p>
      {(l.Reason || l.reason) && <p className="text-white/35 font-mooxy text-xs truncate max-w-sm">{l.Reason || l.reason}</p>}
      {l.remark && <p className="text-white/35 font-mooxy text-xs">Remark: {l.remark}</p>}
    </div>
    {l.supportingDocument && (
      <a href={l.supportingDocument} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-1 mt-3 text-white/30 hover:text-white/60 text-xs font-mooxy transition-colors">
        <ExternalLink size={11} /> View Document
      </a>
    )}
  </div>
);

// ─── Info card for certificates ───────────────────────────────────────────────
const CertInfoCard = ({ c }) => (
  <div className="bg-white/[0.02] border border-white/6 rounded-2xl p-5 hover:border-white/10 transition-all">
    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
      <div className="flex items-center gap-2 flex-wrap">
        <p className="text-white/70 font-mooxy text-sm font-semibold">
          {c.studentName || c.studentId?.name || "Student"} — {c.studentId?.registrationNumber || ""}
        </p>
        <StatusPill status={c.status} />
      </div>
      <p className="text-white/20 font-mooxy text-xs">
        {new Date(c.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
      </p>
    </div>
    <div className="flex flex-wrap gap-x-6 gap-y-1">
      <p className="text-white/35 font-mooxy text-xs">{c.CertificateType}</p>
      {c.purpose && <p className="text-white/35 font-mooxy text-xs">{c.purpose}</p>}
      {c.remark && <p className="text-white/35 font-mooxy text-xs">Remark: {c.remark}</p>}
    </div>
    {c.addCertificate && (
      <a href={c.addCertificate} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-1 mt-3 text-green-400/60 hover:text-green-300 text-xs font-mooxy transition-colors">
        <ExternalLink size={11} /> View Certificate
      </a>
    )}
  </div>
);

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export const NotificationsAndRequest = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.target) {
      const scrollToSection = () => {
        const target = document.getElementById(location.state.target);
        if (target) { target.scrollIntoView({ behavior: "smooth" }); return true; }
        return false;
      };
      if (!scrollToSection()) {
        const interval = setInterval(() => { if (scrollToSection()) clearInterval(interval); }, 100);
        setTimeout(() => clearInterval(interval), 3000);
      }
    }
  }, [location]);

  const [pendingleaves, setPendingLeaves] = useState([]);
  const [acceptedLeaves, setAcceptedLeaves] = useState([]);
  const [rejectedLeaves, setRejectedLeaves] = useState([]);
  const [pendingCertificates, setPendingCertificates] = useState([]);
  const [acceptedCertificates, setAcceptedCertificates] = useState([]);
  const [rejectedCertificates, setRejectedCertificates] = useState([]);
  const [supportingDocument, setSupportingDocument] = useState([]);
  const [pendingFacultyLeaves, setPendingFacultyLeaves] = useState([]);
  const [acceptedFacultyLeaves, setAcceptedFacultyLeaves] = useState([]);
  const [rejectedFacultyLeaves, setRejectedFacultyLeaves] = useState([]);
  const [remarkBox, setRemarkBox] = useState(null);
  const [remark, setRemark] = useState({});
  const [confirm, setConfirm] = useState(false);
  const [certificate, setCertificate] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [otherAdmins, setOtherAdmins] = useState(false);
  const [departmentalAdmin, setDepartmentalAdmin] = useState(false);
  const [departmentalAdminApproved, setDepartmentalAdminApproved] = useState([]);
  const [approvedByFaculty, setApprovedByFaculty] = useState([]);
  const [leavesOfDepartmentalAdmin, setLeavesForDepartmentalAdmin] = useState([]);
  const [approvedByDepartmentalAdmin, setapprovedByDepartmentalAdmin] = useState([]);
  const [rejecteddepartmentalAdminLeave, setrejectedDepartmentalAdminLeave] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  function handleClickOnConfirm() {
    console.log(remark);
    setTimeout(() => { window.location.reload(); }, 1000);
  }

  useEffect(() => {
    const fetchData = async () => {
      const otheradmins = await getAdmins();
      const departmental = await getDepartmentalAdmin();
      if (otheradmins) setOtherAdmins(true);
      if (departmental.data) {
        setDepartmentalAdmin(true);
        const adminApproved = await getSuperAdminLeaves();
        setDepartmentalAdminApproved(adminApproved);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchLeaves = async () => {
      const res = await getAllLeaves();
      const res1 = await getFacultyLeaves();
      const res2 = await getLeavesForDepartmentalAdmin();
      const res3 = await getDepartmentalAdminLeave();
      if (res3) {
        setLeavesForDepartmentalAdmin(res3.filter((leave) => leave.status === "pending"));
        setapprovedByDepartmentalAdmin(res3.filter((leave) => leave.status === "approved"));
        setrejectedDepartmentalAdminLeave(res3.filter((leave) => leave.status === "rejected"));
      }
      if (res2) setApprovedByFaculty(res2);
      if (res) {
        setPendingLeaves(res.filter((leave) => leave.status === "pending"));
        setAcceptedLeaves(res.filter((leave) => leave.status === "approved"));
        setRejectedLeaves(res.filter((leave) => leave.status === "rejected"));
        setSupportingDocument(res.supportingDocument);
      }
      if (res1) {
        setPendingFacultyLeaves(res1.filter((leave) => leave.status === "pending"));
        setAcceptedFacultyLeaves(res1.filter((leave) => leave.status === "approved"));
        setRejectedFacultyLeaves(res1.filter((leave) => leave.status === "rejected"));
      }
    };
    fetchLeaves();
  }, []);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await getAllCertificatesRequests();
        if (res) {
          setPendingCertificates(res.filter((cert) => cert.status === "pending"));
          setAcceptedCertificates(res.filter((cert) => cert.status === "approved"));
          setRejectedCertificates(res.filter((cert) => cert.status === "rejected"));
        }
      } catch (err) { console.error("Error fetching certificates:", err); }
    };
    fetchCertificates();
  }, []);

  const handleClickOnAccept = (leaveId) => {
    if (!remark[leaveId]) { toast.error("Enter the remark first!!!"); return; }
    setPendingLeaves((prev) => prev.map((l) => l._id === leaveId ? { ...l, status: "approved", remark: remark[leaveId] } : l));
    setConfirm(confirm === leaveId ? null : leaveId);
    updateLeaveStatus(leaveId, "approved", remark[leaveId]).catch(() => {
      setPendingLeaves((prev) => prev.map((l) => (l._id === leaveId ? { ...l, status: "pending" } : l)));
    });
  };

  const handleClickOnAcceptAdminLeave = (leaveId) => {
    if (!remark[leaveId]) { toast.error("Enter the remark first!!!"); return; }
    setPendingFacultyLeaves((prev) => prev.map((l) => l._id === leaveId ? { ...l, status: "approved", remark: remark[leaveId] } : l));
    setConfirm(confirm === leaveId ? null : leaveId);
    updateAdminLeaves(leaveId, "approved", remark[leaveId]).catch(() => {
      setPendingFacultyLeaves((prev) => prev.map((l) => (l._id === leaveId ? { ...l, status: "pending" } : l)));
    });
  };

  const handleClickOnRejectAdminLeave = (leaveId) => {
    if (!remark[leaveId]) { toast.error("Enter the remark first!!!"); return; }
    setPendingFacultyLeaves((prev) => prev.map((l) => l._id === leaveId ? { ...l, status: "rejected", remark: remark[leaveId] } : l));
    setConfirm(confirm === leaveId ? null : leaveId);
    updateAdminLeaves(leaveId, "rejected", remark[leaveId]).catch(() => {
      setPendingFacultyLeaves((prev) => prev.map((l) => (l._id === leaveId ? { ...l, status: "pending" } : l)));
    });
  };

  const handleClickOnReject = (leaveId) => {
    if (!remark[leaveId]) { toast.error("Enter the remark first!!!"); return; }
    setPendingLeaves((prev) => prev.map((l) => l._id === leaveId ? { ...l, status: "rejected", remark: remark[leaveId] } : l));
    setConfirm(confirm === leaveId ? null : leaveId);
    updateLeaveStatus(leaveId, "rejected", remark[leaveId]).catch(() => {
      setPendingLeaves((prev) => prev.map((l) => (l._id === leaveId ? { ...l, status: "pending" } : l)));
    });
  };

  const handleClickOnAcceptCertificate = (certId) => {
    if (!remark[certId]) { toast.error("Enter the remark first!!!"); return; }
    if (!certificate[certId]) { toast.error("Add a certificate"); return; }
    const formData = new FormData();
    formData.append("certId", certId);
    formData.append("status", "approved");
    formData.append("remark", remark[certId]);
    formData.append("addCertificate", certificate[certId]);
    setPendingCertificates((prev) => prev.map((c) => (c._id === certId ? { ...c, status: "approved" } : c)));
    setConfirm(confirm === certId ? null : certId);
    updateCertificateStatus(formData).catch(() => {
      setPendingCertificates((prev) => prev.map((c) => (c._id === certId ? { ...c, status: "pending" } : c)));
    });
  };

  const handleClickOnForwardLeaveApplication = (leaveId) => {
    if (!remark[leaveId]) { toast.error("Enter the remark first!!!"); return; }
    setPendingLeaves((prev) => prev.map((l) => l._id === leaveId ? { ...l, status: "forwarded", remark: remark[leaveId] } : l));
    setConfirm(confirm === leaveId ? null : leaveId);
    updateLeaveStatus(leaveId, "forwarded", remark[leaveId]).catch(() => {
      setPendingLeaves((prev) => prev.map((l) => (l._id === leaveId ? { ...l, status: "pending" } : l)));
    });
  };

  const handleClickOnRejectCertificate = (certId) => {
    if (!remark[certId]) { toast.error("Enter the remark first!!!"); return; }
    if (!certificate[certId]) { toast.error("Add a certificate"); return; }
    const formData = new FormData();
    formData.append("certId", certId);
    formData.append("status", "rejected");
    formData.append("remark", remark[certId]);
    formData.append("addCertificate", certificate[certId]);
    setPendingCertificates((prev) => prev.map((c) => c._id === certId ? { ...c, status: "rejected", remark: remark[certId] } : c));
    setConfirm(confirm === certId ? null : certId);
    updateCertificateStatus(formData).catch(() => {
      setPendingCertificates((prev) => prev.map((c) => c._id === certId ? { ...c, status: "pending", remark: remark[certId] } : c));
    });
  };

  const handleClickOnForwardCertificate = (certId) => {
    if (!remark[certId]) { toast.error("Enter the remark first!!!"); return; }
    if (!certificate[certId]) { toast.error("Add a certificate"); return; }
    const formData = new FormData();
    formData.append("certId", certId);
    formData.append("status", "forwarded");
    formData.append("remark", remark[certId]);
    formData.append("addCertificate", certificate[certId]);
    setPendingCertificates((prev) => prev.map((c) => (c._id === certId ? { ...c, status: "approved" } : c)));
    setConfirm(confirm === certId ? null : certId);
    updateCertificateStatus(formData).catch(() => {
      setPendingCertificates((prev) => prev.map((c) => (c._id === certId ? { ...c, status: "pending" } : c)));
    });
  };

  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;
  const oneWeek = oneDay * 7;
  const oneMonth = oneWeek * 4;

  async function handleClickOnLastDayRequets() {
    const res1 = await getAllLeaves();
    if (res1) {
      setPendingLeaves(res1.filter((leave) => leave.status === "pending" && now - new Date(leave.createdAt) < oneDay));
      setAcceptedLeaves(res1.filter((leave) => leave.status === "approved" && now - new Date(leave.createdAt) < oneDay));
      setRejectedLeaves(res1.filter((leave) => leave.status === "rejected" && now - new Date(leave.createdAt) < oneDay));
      setSupportingDocument(res1.supportingDocument);
    }
    const res2 = await getAllCertificatesRequests();
    if (res2) {
      setPendingCertificates(res2.filter((cert) => cert.status === "pending" && now - new Date(cert.createdAt) < oneDay));
      setAcceptedCertificates(res2.filter((cert) => cert.status === "approved" && now - new Date(cert.createdAt) < oneDay));
      setRejectedCertificates(res2.filter((cert) => cert.status === "rejected" && now - new Date(cert.createdAt) < oneDay));
    }
  }

  async function handleClickOnLastWeekRequets() {
    const res1 = await getAllLeaves();
    if (res1) {
      setPendingLeaves(res1.filter((leave) => leave.status === "pending" && now - new Date(leave.createdAt) < oneWeek));
      setAcceptedLeaves(res1.filter((leave) => leave.status === "approved" && now - new Date(leave.createdAt) < oneWeek));
      setRejectedLeaves(res1.filter((leave) => leave.status === "rejected" && now - new Date(leave.createdAt) < oneWeek));
      setSupportingDocument(res1.supportingDocument);
    }
    const res2 = await getAllCertificatesRequests();
    if (res2) {
      setPendingCertificates(res2.filter((cert) => cert.status === "pending" && now - new Date(cert.createdAt) < oneWeek));
      setAcceptedCertificates(res2.filter((cert) => cert.status === "approved" && now - new Date(cert.createdAt) < oneWeek));
      setRejectedCertificates(res2.filter((cert) => cert.status === "rejected" && now - new Date(cert.createdAt) < oneWeek));
    }
  }

  async function handleClickOnLastMonthRequets() {
    const res1 = await getAllLeaves();
    if (res1) {
      setPendingLeaves(res1.filter((leave) => leave.status === "pending" && now - new Date(leave.createdAt) < oneMonth));
      setAcceptedLeaves(res1.filter((leave) => leave.status === "approved" && now - new Date(leave.createdAt) < oneMonth));
      setRejectedLeaves(res1.filter((leave) => leave.status === "rejected" && now - new Date(leave.createdAt) < oneMonth));
      setSupportingDocument(res1.supportingDocument);
    }
    const res2 = await getAllCertificatesRequests();
    if (res2) {
      setPendingCertificates(res2.filter((cert) => cert.status === "pending" && now - new Date(cert.createdAt) < oneMonth));
      setAcceptedCertificates(res2.filter((cert) => cert.status === "approved" && now - new Date(cert.createdAt) < oneMonth));
      setRejectedCertificates(res2.filter((cert) => cert.status === "rejected" && now - new Date(cert.createdAt) < oneMonth));
    }
  }

  // Shared card props
  const sharedLeaveProps = { remark, setRemark, remarkBox, setRemarkBox, confirm, handleConfirm: handleClickOnConfirm };
  const sharedCertProps = { remark, setRemark, remarkBox, setRemarkBox, confirm, handleConfirm: handleClickOnConfirm, certificate, setCertificate };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F19] via-[#0D1117] to-[#111827]">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      {/* ─── Sticky Navbar ─────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#0B0F19]/85 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-5 h-16 flex items-center justify-between">
          <Link to="/">
            <div className="flex items-center gap-2.5 cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
                <img src={logo} alt="Requesta" className="w-5 h-5" />
              </div>
              <span className="font-growmajour text-[18px] bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">REQUESTA</span>
            </div>
          </Link>

          <div className="hidden sm:flex items-center gap-2">
            <Link to="/admindashboard">
              <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 border border-white/10 transition-all font-mooxy">
                <ArrowLeft size={14} /> Dashboard
              </button>
            </Link>
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 border border-white/10 transition-all font-mooxy"
              >
                <Filter size={14} /> Filters <ChevronDown size={12} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
              </button>
              {showFilters && (
                <div className="absolute top-full right-0 mt-2 w-44 bg-[#1a1f2e] border border-white/10 rounded-xl shadow-xl p-1.5 z-20 flex flex-col gap-0.5">
                  {[
                    { label: "Last 24 hours", fn: handleClickOnLastDayRequets },
                    { label: "Last 7 days",   fn: handleClickOnLastWeekRequets },
                    { label: "Last 30 days",  fn: handleClickOnLastMonthRequets },
                  ].map(({ label, fn }) => (
                    <button key={label} onClick={() => { fn(); setShowFilters(false); }}
                      className="w-full text-left px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/8 text-sm font-mooxy transition-all">
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button className="sm:hidden text-white/60 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="sm:hidden border-t border-white/5 bg-[#0D1117] px-5 py-3 flex flex-col gap-1">
            <Link to="/admindashboard" onClick={() => setMenuOpen(false)}>
              <button className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all font-mooxy flex items-center gap-2">
                <ArrowLeft size={14} /> Back to Dashboard
              </button>
            </Link>
            {[
              { label: "Last 24 hours", fn: handleClickOnLastDayRequets },
              { label: "Last 7 days",   fn: handleClickOnLastWeekRequets },
              { label: "Last 30 days",  fn: handleClickOnLastMonthRequets },
            ].map(({ label, fn }) => (
              <button key={label} onClick={() => { fn(); setMenuOpen(false); }}
                className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all font-mooxy">
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ─── Page Content ──────────────────────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-5 pb-20">
        {/* Page header */}
        <div className="pt-10 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-mooxy mb-3">
            <FileText size={11} /> Admin Panel
          </div>
          <h1 className="font-growmajour text-3xl text-white">Notifications &amp; Requests</h1>
          <p className="text-white/40 font-mooxy text-sm mt-1.5">Review, approve, reject and forward all leave and certificate requests.</p>
        </div>

        {/* ── LEAVE REQUESTS ─────────────────────────────────────────── */}
        <SectionHeading icon={Calendar} title="All Leave Requests" color="indigo" />

        {/* Departmental Admin: Faculty-approved leaves */}
        {departmentalAdmin && approvedByFaculty.length > 0 && (
          <div className="mb-8" id="dept-leaves">
            <p className="text-white/40 font-mooxy text-xs uppercase tracking-wider mb-3">Faculty-Approved Leaves</p>
            <div className="grid grid-cols-1 gap-3">
              {approvedByFaculty.map((l) => <InfoCard key={l._id || l.studentId?._id} l={l} />)}
            </div>
          </div>
        )}

        {/* Pending dept admin leaves (for super admin) */}
        {departmentalAdmin && leavesOfDepartmentalAdmin.length > 0 && (
          <div className="mb-8" id="pending-dept-leaves">
            <p className="text-white/40 font-mooxy text-xs uppercase tracking-wider mb-3">Pending Departmental Admin Leaves</p>
            <div className="grid grid-cols-1 gap-3">
              {leavesOfDepartmentalAdmin.map((l) => (
                <LeaveCard
                  key={l._id || l.admin?._id}
                  l={l}
                  {...sharedLeaveProps}
                  onAccept={handleClickOnAccept}
                  onReject={handleClickOnReject}
                  onAcceptAdmin={handleClickOnAcceptAdminLeave}
                  onRejectAdmin={handleClickOnRejectAdminLeave}
                  onForward={handleClickOnForwardLeaveApplication}
                  showAcceptReject={!!(otherAdmins || departmentalAdmin)}
                  showForwardReject={!(otherAdmins || departmentalAdmin)}
                  isAdminType
                />
              ))}
            </div>
          </div>
        )}

        {/* Accepted dept admin leaves */}
        {departmentalAdmin && approvedByDepartmentalAdmin.length > 0 && (
          <div className="mb-8" id="accepted-dept-leaves">
            <p className="text-white/40 font-mooxy text-xs uppercase tracking-wider mb-3">Approved Departmental Admin Leaves</p>
            <div className="grid grid-cols-1 gap-3">
              {approvedByDepartmentalAdmin.map((l) => <InfoCard key={l._id || l.admin?._id} l={l} isAdminType />)}
            </div>
          </div>
        )}

        {/* Rejected dept admin leaves */}
        {departmentalAdmin && rejecteddepartmentalAdminLeave.length > 0 && (
          <div className="mb-8" id="rejected-dept-leaves">
            <p className="text-white/40 font-mooxy text-xs uppercase tracking-wider mb-3">Rejected Departmental Admin Leaves</p>
            <div className="grid grid-cols-1 gap-3">
              {rejecteddepartmentalAdminLeave.map((l) => <InfoCard key={l._id || l.admin?._id} l={l} isAdminType />)}
            </div>
          </div>
        )}

        {/* Pending student leaves */}
        <div className="mb-8" id="pending-leaves">
          <p className="text-white/40 font-mooxy text-xs uppercase tracking-wider mb-3">
            Pending Student Leaves
            {pendingleaves.length > 0 && <span className="ml-2 text-amber-400">({pendingleaves.length})</span>}
          </p>
          {pendingleaves.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {pendingleaves.map((l) => (
                <LeaveCard
                  key={l._id}
                  l={l}
                  {...sharedLeaveProps}
                  onAccept={handleClickOnAccept}
                  onReject={handleClickOnReject}
                  onAcceptAdmin={handleClickOnAcceptAdminLeave}
                  onRejectAdmin={handleClickOnRejectAdminLeave}
                  onForward={handleClickOnForwardLeaveApplication}
                  showAcceptReject={!!(otherAdmins || departmentalAdmin)}
                  showForwardReject={!(otherAdmins || departmentalAdmin)}
                />
              ))}
            </div>
          ) : <EmptyState label="No pending leave requests." />}
        </div>

        {/* Accepted student leaves */}
        <div className="mb-8" id="accepted-leaves">
          <p className="text-white/40 font-mooxy text-xs uppercase tracking-wider mb-3">Approved Student Leaves</p>
          {acceptedLeaves.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {acceptedLeaves.map((l) => <InfoCard key={l._id} l={l} />)}
            </div>
          ) : <EmptyState label="No approved leaves yet." />}
        </div>

        {/* Rejected student leaves */}
        <div className="mb-10" id="rejected-leaves">
          <p className="text-white/40 font-mooxy text-xs uppercase tracking-wider mb-3">Rejected Student Leaves</p>
          {rejectedLeaves.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {rejectedLeaves.map((l) => <InfoCard key={l._id} l={l} />)}
            </div>
          ) : <EmptyState label="No rejected leaves." />}
        </div>

        {/* Faculty leaves */}
        {pendingFacultyLeaves.length > 0 && (
          <>
            <SectionHeading icon={Users} title="Faculty Leave Requests" color="sky" />
            <div className="mb-8" id="faculty-pending-leaves">
              <p className="text-white/40 font-mooxy text-xs uppercase tracking-wider mb-3">
                Pending Faculty Leaves <span className="text-amber-400">({pendingFacultyLeaves.length})</span>
              </p>
              <div className="grid grid-cols-1 gap-3">
                {pendingFacultyLeaves.map((l) => (
                  <LeaveCard
                    key={l._id}
                    l={l}
                    {...sharedLeaveProps}
                    onAccept={handleClickOnAccept}
                    onReject={handleClickOnReject}
                    onAcceptAdmin={handleClickOnAcceptAdminLeave}
                    onRejectAdmin={handleClickOnRejectAdminLeave}
                    onForward={handleClickOnForwardLeaveApplication}
                    showAcceptReject
                    isAdminType
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {acceptedFacultyLeaves.length > 0 && (
          <div className="mb-8" id="faculty-approved-leaves">
            <p className="text-white/40 font-mooxy text-xs uppercase tracking-wider mb-3">Approved Faculty Leaves</p>
            <div className="grid grid-cols-1 gap-3">
              {acceptedFacultyLeaves.map((l) => <InfoCard key={l._id} l={l} isAdminType />)}
            </div>
          </div>
        )}

        {rejectedFacultyLeaves.length > 0 && (
          <div className="mb-10" id="faculty-rejected-leaves">
            <p className="text-white/40 font-mooxy text-xs uppercase tracking-wider mb-3">Rejected Faculty Leaves</p>
            <div className="grid grid-cols-1 gap-3">
              {rejectedFacultyLeaves.map((l) => <InfoCard key={l._id} l={l} isAdminType />)}
            </div>
          </div>
        )}

        {/* ── CERTIFICATE REQUESTS ───────────────────────────────────── */}
        <SectionHeading icon={FileText} title="Certificate Requests" color="purple" />

        {/* Pending certificates */}
        <div className="mb-8" id="pending-certificates">
          <p className="text-white/40 font-mooxy text-xs uppercase tracking-wider mb-3">
            Pending Certificates
            {pendingCertificates.length > 0 && <span className="ml-2 text-amber-400">({pendingCertificates.length})</span>}
          </p>
          {pendingCertificates.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {pendingCertificates.map((c) => (
                <CertCard
                  key={c._id}
                  c={c}
                  {...sharedCertProps}
                  onAccept={handleClickOnAcceptCertificate}
                  onReject={handleClickOnRejectCertificate}
                  onForward={handleClickOnForwardCertificate}
                  showActions
                />
              ))}
            </div>
          ) : <EmptyState label="No pending certificate requests." />}
        </div>

        {/* Approved certificates */}
        <div className="mb-8" id="approved-certificates">
          <p className="text-white/40 font-mooxy text-xs uppercase tracking-wider mb-3">Approved Certificates</p>
          {acceptedCertificates.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {acceptedCertificates.map((c) => <CertInfoCard key={c._id} c={c} />)}
            </div>
          ) : <EmptyState label="No approved certificates yet." />}
        </div>

        {/* Rejected certificates */}
        <div className="mb-8" id="rejected-certificates">
          <p className="text-white/40 font-mooxy text-xs uppercase tracking-wider mb-3">Rejected Certificates</p>
          {rejectedCertificates.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {rejectedCertificates.map((c) => <CertInfoCard key={c._id} c={c} />)}
            </div>
          ) : <EmptyState label="No rejected certificates." />}
        </div>
      </div>

      <Footer />
    </div>
  );
};
