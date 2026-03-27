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
import { getDepartmentalAdminLeave } from "../utils/GETDepartmentalAdminLeaves";
import { getLeavesForDepartmentalAdmin } from "../utils/GETLeavesForDepartmentalAdmin";
import { getAdminDashboard } from "../utils/GETAdminDashBoard";
import ActivityTimeline from "./ActivityTimeline";
import { getLeaveAuditLogs, getAdminLeaveAuditLogs, getCertificateAuditLogs } from "../utils/GETAuditLogs";

// ─── Timeline Wrapper ────────────────────────────────────────────────────────
const TimelineBox = ({ requestId, requestType }) => {
  const [open, setOpen] = useState(false);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLogs = async () => {
    if (open) { setOpen(false); return; }
    setLoading(true);
    setOpen(true);
    const token = localStorage.getItem("adminToken");
    let data = [];
    if (requestType === "LEAVE") data = await getLeaveAuditLogs(requestId, token);
    else if (requestType === "ADMIN_LEAVE") data = await getAdminLeaveAuditLogs(requestId, token);
    else if (requestType === "CERTIFICATE") data = await getCertificateAuditLogs(requestId, token);
    setLogs(data);
    setLoading(false);
  };

  return (
    <div className="mt-3">
      <button
        onClick={fetchLogs}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 hover:text-white text-xs font-mooxy transition-all"
      >
        <Clock size={12} /> {open ? "Hide Timeline" : "View Timeline"}
      </button>
      {open && <ActivityTimeline logs={logs} loading={loading} />}
    </div>
  );
};

// ─── Design tokens ──────────────────────────────────────────────────────────
const statusConfig = {
  pending:   { label: "Pending",   cls: "text-amber-400 bg-amber-400/10 border-amber-400/25",  icon: Clock },
  approved:  { label: "Approved",  cls: "text-green-400 bg-green-400/10 border-green-400/25",  icon: CheckCircle },
  rejected:  { label: "Rejected",  cls: "text-red-400 bg-red-400/10 border-red-400/25",         icon: XCircle },
};
const StatusPill = ({ status, role }) => {
  // strict rule mapping per implementation plan
  let displayStatus = status.toLowerCase();
  
  if (displayStatus === "forwarded") {
    // If Dept Admin is viewing a forwarded request, it's effectively "Pending" for them
    if (role === "Departmental Admin") {
      displayStatus = "pending";
    }
  }

  const cfg = statusConfig[displayStatus] || statusConfig.pending;
  const Icon = cfg.icon;
  
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mooxy border ${cfg.cls}`}>
      <Icon size={11} /> {cfg.label}
    </span>
  );
};

const inputCls = "w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 font-mooxy text-sm outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/20 transition-all";

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
  l, role, remark, setRemark, remarkBox, setRemarkBox, confirm, handleConfirm,
  onAccept, onReject, onForward, onAcceptAdmin, onRejectAdmin,
  showAcceptReject, showForwardReject, isAdminType = false,
}) => (
  <div className="bg-white/[0.03] border border-white/8 hover:border-white/12 rounded-2xl overflow-hidden transition-all">
    <div className="p-5">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <p className="text-white font-mooxy font-semibold text-sm">
              {isAdminType
                ? `${l.admin?.name}`
                : (l.studentName || l.studentId?.name || "Student")}
            </p>
            <StatusPill status={l.status} role={role} />
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

      <button
        onClick={() => setRemarkBox(remarkBox === l._id ? null : l._id)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 hover:text-white text-xs font-mooxy transition-all mb-3"
      >
        <MessageSquare size={12} /> {remarkBox === l._id ? "Hide Remark" : "Add Remark"}
      </button>

      {remarkBox === l._id && (
        <textarea
          rows={2}
          placeholder="Enter remark before taking action…"
          value={remark[l._id] || ""}
          onChange={(e) => setRemark((prev) => ({ ...prev, [l._id]: e.target.value }))}
          className={`${inputCls} resize-none mb-3`}
        />
      )}

      <TimelineBox requestId={l._id} requestType={isAdminType ? "ADMIN_LEAVE" : "LEAVE"} />
    </div>

    {/* Action footer — role-gated buttons */}
    {(showAcceptReject || showForwardReject) && (
      <div className="border-t border-white/5 px-5 py-3 flex flex-wrap gap-2 bg-white/[0.015]">
        {/* Dept Admin / Super Admin: Approve + Reject */}
        {showAcceptReject && (
          <>
            <button
              onClick={() => isAdminType ? onAcceptAdmin(l._id) : onAccept(l._id)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-green-500/15 hover:bg-green-500/25 border border-green-500/30 text-green-300 text-xs font-mooxy transition-all"
            >
              <CheckCircle size={12} /> Approve
            </button>
            <button
              onClick={() => isAdminType ? onRejectAdmin(l._id) : onReject(l._id)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-300 text-xs font-mooxy transition-all"
            >
              <XCircle size={12} /> Reject
            </button>
          </>
        )}
        {/* Faculty: Forward + Reject (NO approve) */}
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

// ─── Certificate card — Super Admin only (Approve + Reject, NO Forward) ───────
const CertificateCard = ({
  c, role, remark, setRemark, remarkBox, setRemarkBox,
  certificate, setCertificate, onAccept, onReject,
  showActions,
}) => (
  <div className="bg-white/[0.03] border border-white/8 hover:border-white/12 rounded-2xl overflow-hidden transition-all">
    <div className="p-5">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <p className="text-white font-mooxy font-semibold text-sm">
              {c.student?.name || "Student"}
            </p>
            <StatusPill status={c.status} role={role} />
          </div>
          <p className="text-white/35 font-mooxy text-xs">
            Reg No: {c.student?.registrationNumber || "N/A"}
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
        </>
      )}

      <TimelineBox requestId={c._id} requestType="CERTIFICATE" />
    </div>

    {/* Certificate actions: Approve + Reject only — no Forward for certificates */}
    {showActions && (
      <div className="border-t border-white/5 px-5 py-3 flex flex-wrap gap-2 bg-white/[0.015]">
        <button
          onClick={() => onAccept(c._id)}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-green-500/15 hover:bg-green-500/25 border border-green-500/30 text-green-300 text-xs font-mooxy transition-all"
        >
          <CheckCircle size={12} /> Approve
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

// ─── Read-only info card ───────────────────────────────────────────────────────
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
    <TimelineBox requestId={l._id} requestType={isAdminType ? "ADMIN_LEAVE" : "LEAVE"} />
  </div>
);

// ─── Info card for certificates ───────────────────────────────────────────────
const CertInfoCard = ({ c }) => (
  <div className="bg-white/[0.02] border border-white/6 rounded-2xl p-5 hover:border-white/10 transition-all">
    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
      <div className="flex items-center gap-2 flex-wrap">
        <p className="text-white/70 font-mooxy text-sm font-semibold">
          {c.student?.name || "Student"} — {c.student?.registrationNumber || ""}
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
    <TimelineBox requestId={c._id} requestType="CERTIFICATE" />
  </div>
);

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export const NotificationsAndRequest = () => {
  const location = useLocation();

  // ── Scroll to section on mount if target is set ──────────────────────────
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

  // ── User role — sourced from dashboard API call (not inferred from other responses) ──
  const [userRole, setUserRole] = useState(null);
  const [loadingRole, setLoadingRole] = useState(true);

  // ── Student leaves ────────────────────────────────────────────────────────
  const [pendingLeaves, setPendingLeaves] = useState([]);
  const [acceptedLeaves, setAcceptedLeaves] = useState([]);
  const [rejectedLeaves, setRejectedLeaves] = useState([]);
  const [forwardedLeaves, setForwardedLeaves] = useState([]);

  // ── Faculty leaves (for DeptAdmin) ───────────────────────────────────────
  const [pendingFacultyLeaves, setPendingFacultyLeaves] = useState([]);
  const [acceptedFacultyLeaves, setAcceptedFacultyLeaves] = useState([]);
  const [rejectedFacultyLeaves, setRejectedFacultyLeaves] = useState([]);

  // ── Dept Admin leaves (for Super Admin) ──────────────────────────────────
  const [pendingDeptAdminLeaves, setPendingDeptAdminLeaves] = useState([]);
  const [approvedDeptAdminLeaves, setApprovedDeptAdminLeaves] = useState([]);
  const [rejectedDeptAdminLeaves, setRejectedDeptAdminLeaves] = useState([]);

  // ── Certificates ──────────────────────────────────────────────────────────
  const [pendingCertificates, setPendingCertificates] = useState([]);
  const [acceptedCertificates, setAcceptedCertificates] = useState([]);
  const [rejectedCertificates, setRejectedCertificates] = useState([]);

  // ── UI state ──────────────────────────────────────────────────────────────
  const [remarkBox, setRemarkBox] = useState(null);
  const [remark, setRemark] = useState({});
  const [certificate, setCertificate] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // ─── Step 1: Fetch the logged-in admin's role ────────────────────────────
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const data = await getAdminDashboard();
        if (data?.role) setUserRole(data.role);
      } catch (err) {
        console.error("Failed to fetch admin role:", err);
      } finally {
        setLoadingRole(false);
      }
    };
    fetchRole();
  }, []);

  // ─── Step 2: Fetch data based on role ───────────────────────────────────
  useEffect(() => {
    if (!userRole) return; // Don't fetch until role is known

    const fetchData = async () => {
      try {
        if (userRole === "Faculty") {
          // Faculty sees only student leaves assigned to them (currentHandlerRole = FACULTY)
          const res = await getAllLeaves();
          if (Array.isArray(res)) {
            setPendingLeaves(res.filter((l) => l.status === "pending"));
            setRejectedLeaves(res.filter((l) => l.status === "rejected")); // Faculty's own rejected
          }

        } else if (userRole === "Departmental Admin") {
          // DeptAdmin sees ALL student leaves
          const studentLeaves = await getLeavesForDepartmentalAdmin();
          if (Array.isArray(studentLeaves)) {
            setPendingLeaves(studentLeaves.filter((l) => l.status === "pending"));
            setForwardedLeaves(studentLeaves.filter((l) => l.status === "forwarded"));
            setAcceptedLeaves(studentLeaves.filter((l) => l.status === "approved"));
            setRejectedLeaves(studentLeaves.filter((l) => l.status === "rejected"));
          }
          // DeptAdmin sees faculty leaves assigned to them
          const facultyLeaves = await getFacultyLeaves();
          if (Array.isArray(facultyLeaves)) {
            setPendingFacultyLeaves(facultyLeaves.filter((l) => l.status === "pending"));
            setAcceptedFacultyLeaves(facultyLeaves.filter((l) => l.status === "approved"));
            setRejectedFacultyLeaves(facultyLeaves.filter((l) => l.status === "rejected"));
          }

        } else if (userRole === "Super Admin") {
          // Super Admin sees all student leaves (read-only)
          const studentLeaves = await getSuperAdminLeaves();
          if (Array.isArray(studentLeaves)) {
            setPendingLeaves(studentLeaves.filter((l) => l.status === "pending"));
            setForwardedLeaves(studentLeaves.filter((l) => l.status === "forwarded"));
            setAcceptedLeaves(studentLeaves.filter((l) => l.status === "approved"));
            setRejectedLeaves(studentLeaves.filter((l) => l.status === "rejected"));
          }
          // Super Admin acts on DeptAdmin leaves
          const deptAdminLeaves = await getDepartmentalAdminLeave();
          if (Array.isArray(deptAdminLeaves)) {
            setPendingDeptAdminLeaves(deptAdminLeaves.filter((l) => l.status === "pending"));
            setApprovedDeptAdminLeaves(deptAdminLeaves.filter((l) => l.status === "approved"));
            setRejectedDeptAdminLeaves(deptAdminLeaves.filter((l) => l.status === "rejected"));
          }
          // Super Admin sees all certificates
          const certRes = await getAllCertificatesRequests();
          if (Array.isArray(certRes)) {
            setPendingCertificates(certRes.filter((c) => c.status === "pending"));
            setAcceptedCertificates(certRes.filter((c) => c.status === "approved"));
            setRejectedCertificates(certRes.filter((c) => c.status === "rejected"));
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [userRole]);

  // ─── Refresh all data (post-action) ─────────────────────────────────────
  const refreshData = async () => {
    if (!userRole) return;
    try {
      if (userRole === "Faculty") {
        const res = await getAllLeaves();
        if (Array.isArray(res)) {
          setPendingLeaves(res.filter((l) => l.status === "pending"));
          setRejectedLeaves(res.filter((l) => l.status === "rejected"));
        }
      } else if (userRole === "Departmental Admin") {
        const studentLeaves = await getLeavesForDepartmentalAdmin();
        if (Array.isArray(studentLeaves)) {
          setPendingLeaves(studentLeaves.filter((l) => l.status === "pending"));
          setForwardedLeaves(studentLeaves.filter((l) => l.status === "forwarded"));
          setAcceptedLeaves(studentLeaves.filter((l) => l.status === "approved"));
          setRejectedLeaves(studentLeaves.filter((l) => l.status === "rejected"));
        }
        const facultyLeaves = await getFacultyLeaves();
        if (Array.isArray(facultyLeaves)) {
          setPendingFacultyLeaves(facultyLeaves.filter((l) => l.status === "pending"));
          setAcceptedFacultyLeaves(facultyLeaves.filter((l) => l.status === "approved"));
          setRejectedFacultyLeaves(facultyLeaves.filter((l) => l.status === "rejected"));
        }
      } else if (userRole === "Super Admin") {
        const deptAdminLeaves = await getDepartmentalAdminLeave();
        if (Array.isArray(deptAdminLeaves)) {
          setPendingDeptAdminLeaves(deptAdminLeaves.filter((l) => l.status === "pending"));
          setApprovedDeptAdminLeaves(deptAdminLeaves.filter((l) => l.status === "approved"));
          setRejectedDeptAdminLeaves(deptAdminLeaves.filter((l) => l.status === "rejected"));
        }
        const certRes = await getAllCertificatesRequests();
        if (Array.isArray(certRes)) {
          setPendingCertificates(certRes.filter((c) => c.status === "pending"));
          setAcceptedCertificates(certRes.filter((c) => c.status === "approved"));
          setRejectedCertificates(certRes.filter((c) => c.status === "rejected"));
        }
      }
    } catch (err) {
      console.error("Error refreshing data:", err);
    }
  };

  // ─── Action handlers — student leaves ────────────────────────────────────
  const handleForward = async (leaveId) => {
    if (!remark[leaveId]) { toast.error("Enter a remark first!"); return; }
    const res = await updateLeaveStatus(leaveId, "forwarded", remark[leaveId]);
    if (res) {
      toast.success("Leave forwarded to Departmental Admin");
      setPendingLeaves((prev) => prev.filter((l) => l._id !== leaveId));
      setForwardedLeaves((prev) => [...prev, { ...prev.find(l => l._id === leaveId), status: "forwarded" }]);
      setRemark((prev) => { const n = { ...prev }; delete n[leaveId]; return n; });
      setRemarkBox(null);
    } else {
      toast.error("Failed to forward leave. Please try again.");
    }
  };

  const handleRejectStudentLeave = async (leaveId) => {
    if (!remark[leaveId]) { toast.error("Enter a remark first!"); return; }
    const res = await updateLeaveStatus(leaveId, "rejected", remark[leaveId]);
    if (res) {
      toast.success("Leave rejected");
      setPendingLeaves((prev) => prev.filter((l) => l._id !== leaveId));
      setForwardedLeaves((prev) => prev.filter((l) => l._id !== leaveId));
      await refreshData();
      setRemark((prev) => { const n = { ...prev }; delete n[leaveId]; return n; });
      setRemarkBox(null);
    } else {
      toast.error("Failed to reject leave. Please try again.");
    }
  };

  const handleApproveStudentLeave = async (leaveId) => {
    if (!remark[leaveId]) { toast.error("Enter a remark first!"); return; }
    const res = await updateLeaveStatus(leaveId, "approved", remark[leaveId]);
    if (res) {
      toast.success("Leave approved");
      setPendingLeaves((prev) => prev.filter((l) => l._id !== leaveId));
      setForwardedLeaves((prev) => prev.filter((l) => l._id !== leaveId));
      await refreshData();
      setRemark((prev) => { const n = { ...prev }; delete n[leaveId]; return n; });
      setRemarkBox(null);
    } else {
      toast.error("Failed to approve leave. Please try again.");
    }
  };

  // ─── Action handlers — admin leaves (Faculty + DeptAdmin) ────────────────
  const handleApproveAdminLeave = async (leaveId) => {
    if (!remark[leaveId]) { toast.error("Enter a remark first!"); return; }
    const res = await updateAdminLeaves(leaveId, "approved", remark[leaveId]);
    if (res) {
      toast.success("Leave approved");
      setPendingFacultyLeaves((prev) => prev.filter((l) => l._id !== leaveId));
      setPendingDeptAdminLeaves((prev) => prev.filter((l) => l._id !== leaveId));
      await refreshData();
      setRemark((prev) => { const n = { ...prev }; delete n[leaveId]; return n; });
      setRemarkBox(null);
    } else {
      toast.error("Failed to approve leave. Please try again.");
    }
  };

  const handleRejectAdminLeave = async (leaveId) => {
    if (!remark[leaveId]) { toast.error("Enter a remark first!"); return; }
    const res = await updateAdminLeaves(leaveId, "rejected", remark[leaveId]);
    if (res) {
      toast.success("Leave rejected");
      setPendingFacultyLeaves((prev) => prev.filter((l) => l._id !== leaveId));
      setPendingDeptAdminLeaves((prev) => prev.filter((l) => l._id !== leaveId));
      await refreshData();
      setRemark((prev) => { const n = { ...prev }; delete n[leaveId]; return n; });
      setRemarkBox(null);
    } else {
      toast.error("Failed to reject leave. Please try again.");
    }
  };

  // ─── Action handlers — certificates ──────────────────────────────────────
  const handleApproveCertificate = async (certId) => {
    if (!remark[certId]) { toast.error("Enter a remark first!"); return; }
    if (!certificate[certId]) { toast.error("Please upload the certificate document"); return; }
    const formData = new FormData();
    formData.append("certId", certId);
    formData.append("status", "approved");
    formData.append("remark", remark[certId]);
    formData.append("addCertificate", certificate[certId]);
    const res = await updateCertificateStatus(formData);
    if (res) {
      toast.success("Certificate approved");
      setPendingCertificates((prev) => prev.filter((c) => c._id !== certId));
      await refreshData();
      setRemark((prev) => { const n = { ...prev }; delete n[certId]; return n; });
      setCertificate((prev) => { const n = { ...prev }; delete n[certId]; return n; });
      setRemarkBox(null);
    } else {
      toast.error("Failed to approve certificate. Please try again.");
    }
  };

  const handleRejectCertificate = async (certId) => {
    if (!remark[certId]) { toast.error("Enter a remark first!"); return; }
    const formData = new FormData();
    formData.append("certId", certId);
    formData.append("status", "rejected");
    formData.append("remark", remark[certId]);
    if (certificate[certId]) formData.append("addCertificate", certificate[certId]);
    const res = await updateCertificateStatus(formData);
    if (res) {
      toast.success("Certificate rejected");
      setPendingCertificates((prev) => prev.filter((c) => c._id !== certId));
      await refreshData();
      setRemark((prev) => { const n = { ...prev }; delete n[certId]; return n; });
      setRemarkBox(null);
    } else {
      toast.error("Failed to reject certificate. Please try again.");
    }
  };

  // ─── Time-based filter ────────────────────────────────────────────────────
  const now = new Date();
  const filterByTime = (arr, ms) => arr.filter((item) => now - new Date(item.createdAt) < ms);

  const applyTimeFilter = (ms) => {
    setPendingLeaves((prev) => filterByTime(prev, ms));
    setAcceptedLeaves((prev) => filterByTime(prev, ms));
    setRejectedLeaves((prev) => filterByTime(prev, ms));
    setForwardedLeaves((prev) => filterByTime(prev, ms));
    setPendingCertificates((prev) => filterByTime(prev, ms));
    setAcceptedCertificates((prev) => filterByTime(prev, ms));
    setRejectedCertificates((prev) => filterByTime(prev, ms));
  };

  // Shared props for cards
  const sharedLeaveProps = { remark, setRemark, remarkBox, setRemarkBox, confirm: null, handleConfirm: () => {} };
  const sharedCertProps = { remark, setRemark, remarkBox, setRemarkBox, certificate, setCertificate };

  // ─── Role-based flags ─────────────────────────────────────────────────────
  const isFaculty = userRole === "Faculty";
  const isDeptAdmin = userRole === "Departmental Admin";
  const isSuperAdmin = userRole === "Super Admin";

  if (loadingRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0B0F19] via-[#0D1117] to-[#111827] flex items-center justify-center">
        <p className="text-white/40 font-mooxy text-sm">Loading…</p>
      </div>
    );
  }

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
            {/* Role badge */}
            <div className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-mooxy">
              {userRole}
            </div>
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
                    { label: "Last 24 hours", ms: 1000 * 60 * 60 * 24 },
                    { label: "Last 7 days",   ms: 1000 * 60 * 60 * 24 * 7 },
                    { label: "Last 30 days",  ms: 1000 * 60 * 60 * 24 * 30 },
                  ].map(({ label, ms }) => (
                    <button key={label} onClick={() => { applyTimeFilter(ms); setShowFilters(false); }}
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
          </div>
        )}
      </nav>

      {/* ─── Page Content ────────────────────────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-5 pb-20">
        <div className="pt-10 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-mooxy mb-3">
            <FileText size={11} /> Admin Panel
          </div>
          <h1 className="font-growmajour text-3xl text-white">Notifications &amp; Requests</h1>
          <p className="text-white/40 font-mooxy text-sm mt-1.5">Review, approve, reject and forward all leave and certificate requests.</p>
        </div>

        {/* ════════════════ STUDENT LEAVE REQUESTS ════════════════════════ */}
        <SectionHeading icon={Calendar} title="Student Leave Requests" color="indigo" id="student-leaves" />

        {/* Pending Student Leaves */}
        <div className="mb-8" id="pending-leaves">
          <p className="text-white/40 font-mooxy text-xs uppercase tracking-wider mb-3">
            Pending
            {pendingLeaves.length > 0 && <span className="ml-2 text-amber-400">({pendingLeaves.length})</span>}
          </p>
          {pendingLeaves.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {pendingLeaves.map((l) => (
                <LeaveCard
                  key={l._id}
                  l={l}
                  role={userRole}
                  {...sharedLeaveProps}
                  onAccept={handleApproveStudentLeave}
                  onReject={handleRejectStudentLeave}
                  onForward={handleForward}
                  onAcceptAdmin={handleApproveAdminLeave}
                  onRejectAdmin={handleRejectAdminLeave}
                  // DeptAdmin: Approve + Reject; Faculty: Forward + Reject; SuperAdmin: read-only
                  showAcceptReject={isDeptAdmin}
                  showForwardReject={isFaculty}
                />
              ))}
            </div>
          ) : <EmptyState label="No pending leave requests." />}
        </div>

        {/* Forwarded Student Leaves (DeptAdmin/SuperAdmin can see) */}
        {(isDeptAdmin || isSuperAdmin) && forwardedLeaves.length > 0 && (
          <div className="mb-8" id="forwarded-leaves">
            <p className="text-white/40 font-mooxy text-xs uppercase tracking-wider mb-3">
              Forwarded by Faculty <span className="ml-2 text-sky-400">({forwardedLeaves.length})</span>
            </p>
            <div className="grid grid-cols-1 gap-3">
              {forwardedLeaves.map((l) => (
                <LeaveCard
                  key={l._id}
                  l={l}
                  role={userRole}
                  {...sharedLeaveProps}
                  onAccept={handleApproveStudentLeave}
                  onReject={handleRejectStudentLeave}
                  onForward={handleForward}
                  onAcceptAdmin={handleApproveAdminLeave}
                  onRejectAdmin={handleRejectAdminLeave}
                  showAcceptReject={isDeptAdmin}  // Only DeptAdmin can act; SuperAdmin views only
                  showForwardReject={false}
                />
              ))}
            </div>
          </div>
        )}

        {/* Approved Student Leaves */}
        {acceptedLeaves.length > 0 && (
          <div className="mb-8" id="accepted-leaves">
            <p className="text-white/40 font-mooxy text-xs uppercase tracking-wider mb-3">Approved</p>
            <div className="grid grid-cols-1 gap-3">
              {acceptedLeaves.map((l) => <InfoCard key={l._id} l={l} />)}
            </div>
          </div>
        )}

        {/* Rejected Student Leaves */}
        {rejectedLeaves.length > 0 && (
          <div className="mb-10" id="rejected-leaves">
            <p className="text-white/40 font-mooxy text-xs uppercase tracking-wider mb-3">Rejected</p>
            <div className="grid grid-cols-1 gap-3">
              {rejectedLeaves.map((l) => <InfoCard key={l._id} l={l} />)}
            </div>
          </div>
        )}

        {/* ════════════════ FACULTY LEAVE REQUESTS (DeptAdmin only) ═══════ */}
        {isDeptAdmin && (
          <>
            <SectionHeading icon={Users} title="Faculty Leave Requests" color="sky" id="faculty-leaves" />

            {pendingFacultyLeaves.length > 0 ? (
              <div className="mb-8" id="faculty-pending-leaves">
                <p className="text-white/40 font-mooxy text-xs uppercase tracking-wider mb-3">
                  Pending <span className="text-amber-400">({pendingFacultyLeaves.length})</span>
                </p>
                <div className="grid grid-cols-1 gap-3">
                  {pendingFacultyLeaves.map((l) => (
                    <LeaveCard
                      key={l._id}
                      l={l}
                      role={userRole}
                      {...sharedLeaveProps}
                      onAccept={handleApproveStudentLeave}
                      onReject={handleRejectStudentLeave}
                      onForward={handleForward}
                      onAcceptAdmin={handleApproveAdminLeave}
                      onRejectAdmin={handleRejectAdminLeave}
                      showAcceptReject       // DeptAdmin approves/rejects faculty leave
                      showForwardReject={false}
                      isAdminType
                    />
                  ))}
                </div>
              </div>
            ) : <EmptyState label="No pending faculty leave requests." />}

            {acceptedFacultyLeaves.length > 0 && (
              <div className="mb-8" id="faculty-approved-leaves">
                <p className="text-white/40 font-mooxy text-xs uppercase tracking-wider mb-3">Approved</p>
                <div className="grid grid-cols-1 gap-3">
                  {acceptedFacultyLeaves.map((l) => <InfoCard key={l._id} l={l} isAdminType />)}
                </div>
              </div>
            )}

            {rejectedFacultyLeaves.length > 0 && (
              <div className="mb-10" id="faculty-rejected-leaves">
                <p className="text-white/40 font-mooxy text-xs uppercase tracking-wider mb-3">Rejected</p>
                <div className="grid grid-cols-1 gap-3">
                  {rejectedFacultyLeaves.map((l) => <InfoCard key={l._id} l={l} isAdminType />)}
                </div>
              </div>
            )}
          </>
        )}

        {/* ════════════════ DEPT ADMIN LEAVES (Super Admin only) ══════════ */}
        {isSuperAdmin && (
          <>
            <SectionHeading icon={ShieldCheck} title="Departmental Admin Leave Requests" color="amber" id="deptadmin-leaves" />

            {pendingDeptAdminLeaves.length > 0 ? (
              <div className="mb-8" id="deptadmin-pending-leaves">
                <p className="text-white/40 font-mooxy text-xs uppercase tracking-wider mb-3">
                  Pending Action <span className="text-amber-400">({pendingDeptAdminLeaves.length})</span>
                </p>
                <div className="grid grid-cols-1 gap-3">
                  {pendingDeptAdminLeaves.map((l) => (
                    <LeaveCard
                      key={l._id}
                      l={l}
                      role={userRole}
                      {...sharedLeaveProps}
                      onAccept={handleApproveStudentLeave}
                      onReject={handleRejectStudentLeave}
                      onForward={handleForward}
                      onAcceptAdmin={handleApproveAdminLeave}
                      onRejectAdmin={handleRejectAdminLeave}
                      showAcceptReject       // Super Admin approves/rejects dept admin leave
                      showForwardReject={false}
                      isAdminType
                    />
                  ))}
                </div>
              </div>
            ) : <EmptyState label="No pending departmental admin leave requests." />}

            {approvedDeptAdminLeaves.length > 0 && (
              <div className="mb-8">
                <p className="text-white/40 font-mooxy text-xs uppercase tracking-wider mb-3">Approved Dept Admin Leaves</p>
                <div className="grid grid-cols-1 gap-3">
                  {approvedDeptAdminLeaves.map((l) => <InfoCard key={l._id} l={l} isAdminType />)}
                </div>
              </div>
            )}

            {rejectedDeptAdminLeaves.length > 0 && (
              <div className="mb-10">
                <p className="text-white/40 font-mooxy text-xs uppercase tracking-wider mb-3">Rejected Dept Admin Leaves</p>
                <div className="grid grid-cols-1 gap-3">
                  {rejectedDeptAdminLeaves.map((l) => <InfoCard key={l._id} l={l} isAdminType />)}
                </div>
              </div>
            )}
          </>
        )}

        {/* ════════════════ CERTIFICATE REQUESTS (Super Admin only) ════════ */}
        {isSuperAdmin && (
          <>
            <SectionHeading icon={FileText} title="Certificate Requests" color="purple" id="certificate-requests" />

            <div className="mb-8" id="pending-certificates">
              <p className="text-white/40 font-mooxy text-xs uppercase tracking-wider mb-3">
                Pending
                {pendingCertificates.length > 0 && <span className="ml-2 text-amber-400">({pendingCertificates.length})</span>}
              </p>
              {pendingCertificates.length > 0 ? (
                <div className="grid grid-cols-1 gap-3">
                  {pendingCertificates.map((c) => (
                    <CertificateCard
                      key={c._id}
                      c={c}
                      {...sharedCertProps}
                      onAccept={handleApproveCertificate}
                      onReject={handleRejectCertificate}
                      showActions
                      role={userRole}
                    />
                  ))}
                </div>
              ) : <EmptyState label="No pending certificate requests." />}
            </div>

            {acceptedCertificates.length > 0 && (
              <div className="mb-8" id="approved-certificates">
                <p className="text-white/40 font-mooxy text-xs uppercase tracking-wider mb-3">Approved</p>
                <div className="grid grid-cols-1 gap-3">
                  {acceptedCertificates.map((c) => <CertInfoCard key={c._id} c={c} />)}
                </div>
              </div>
            )}

            {rejectedCertificates.length > 0 && (
              <div className="mb-8" id="rejected-certificates">
                <p className="text-white/40 font-mooxy text-xs uppercase tracking-wider mb-3">Rejected</p>
                <div className="grid grid-cols-1 gap-3">
                  {rejectedCertificates.map((c) => <CertInfoCard key={c._id} c={c} />)}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};
