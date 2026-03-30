import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";
import { getAdminDashboard, getAdminDashboardStats } from "../utils/GETAdminDashBoard";
import { getAllLeaves } from "../utils/GETAllLeaves";
import { getStudents } from "../utils/GETAllStudents";
import { getAllCertificatesRequests } from "../utils/GETAllCertificateRequests";
import { useEffect, useState, useRef } from "react";
import { getFacultyLeaves } from "../utils/GETFacultyLeaves";
import { getAdmins } from "../utils/GETOtherAdminsData";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getSuperAdminLeaves } from "../utils/GETLeavesForSuperAdmin";
import { submitAdminLeaveApplication } from "../utils/POSTAdminLeaveApplication";
import { getDepartmentalAdminLeave } from "../utils/GETDepartmentalAdminLeaves";
import { getDepartmentalAdmin } from "../utils/GETDepartmentalAdmin";
import { getLeavesForDepartmentalAdmin } from "../utils/GETLeavesForDepartmentalAdmin";
import { getAnalyticsSummary } from "../utils/GETAnalytics";
import Loader from "./Loader";
import gsap from "gsap";
import {
  Menu, X, Bell, User, Users, UserPlus, ShieldCheck, Calendar,
  FileText, ArrowRight, Upload, ChevronDown, Plus, ArrowLeft, BarChart2, Activity, PieChart as PieChartIcon
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import SystemInsightsPanel from "./SystemInsightsPanel";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("");
  const [role, setRole] = useState("");
  const [totalLeaves, setTotalLeaves] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalCertificates, setTotalCertificates] = useState(0);
  const [studentLeavesCount, setStudentLeavesCount] = useState(0);
  const [facultyLeavesCount, setFacultyLeavesCount] = useState(0);
  const [deptAdminLeavesCount, setDeptAdminLeavesCount] = useState(0);
  const [certificateRequestsCount, setCertificateRequestsCount] = useState(0);
  const [totalPendingLeaves, setTotalPendingLeaves] = useState(0);
  const [totalApprovedLeaves, setTotalApprovedLeaves] = useState(0);
  const [totalRejectedLeaves, setTotalRejectedLeaves] = useState(0);
  const [totalPendingCertificates, setTotalPendingCertificates] = useState(0);
  const [totalApprovedCertificates, setTotalApprovedCertificates] = useState(0);
  const [totalRejectedCertificates, setTotalRejectedCertificates] = useState(0);
  const [approvedByDepartmentalAdmin, setapprovedByDepartmentalAdmin] = useState(0);
  const [otherAdmins, setOtherAdmins] = useState(false);
  const [notifications, setNotifications] = useState(0);
  const [leaveRequest, setLeaveRequest] = useState(false);
  const [type, setType] = useState("");
  const [reason, setReason] = useState("");
  const [supportingDocument, setSupportingDocument] = useState("");
  const [home, setHome] = useState(true);
  const [loader, setLoader] = useState(false);
  const [departmentalAdmins, setDepartmentalAdmins] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [facultyLeaves, setFacultyLeaves] = useState(0);
  const [approvedFacultyLeaves, setApprovedFacultyLeaves] = useState(0);
  const [rejectedFacultyLeaves, setRejectedFacultyLeaves] = useState(0);
  const [pendingdepartmentalAdminLeave, setpendingDepartmentalAdminLeave] = useState(0);
  const [approveddepartmentalAdminLeave, setapprovedDepartmentalAdminLeave] = useState(0);
  const [rejecteddepartmentalAdminLeave, setrejectedDepartmentalAdminLeave] = useState(0);
  const [leavesForDepartmentalAdmin, setLeavesForDepartmentalAdmin] = useState(0);
  const [forwardedLeaves, setForwardedLeaves] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [analytics, setAnalytics] = useState(null);

  const navRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(navRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" });
    gsap.fromTo(contentRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.2, ease: "power3.out" });
  }, []);

  function handleClickOnApplyForLeave() {
    setLeaveRequest(!leaveRequest);
    setHome(!home);
  }

  useEffect(() => {
    const fetchData = async () => {
      const otheradmins = await getAdmins();
      const departmentalAdminsData = await getDepartmentalAdmin();
      if (otheradmins) setOtherAdmins(true);
      if (departmentalAdminsData) setDepartmentalAdmins(true);
      const admin = await getAdminDashboard();
      if (admin?.name) setAdminName(admin.name);
      if (admin?.role) {
        setRole(admin.role);
        if (admin.role === "Super Admin" || admin.role === "Departmental Admin") {
          const stats = await getAnalyticsSummary(localStorage.getItem("adminToken"));
          setAnalytics(stats);
        }
      }
    };
    fetchData();
  }, [adminName]);

  const fetchTotalLeaves = async () => {
    try {
      if (!role) return;
      const stats = await getAdminDashboardStats();
      
      if (role === "Faculty") {
        setTotalStudents(stats.totalStudents || 0);
        setTotalPendingLeaves(stats.pendingLeaves || 0);
        setNotifications(stats.pendingLeaves || 0);
      } else if (role === "Departmental Admin") {
        setTotalLeaves(stats.totalLeaves || 0);
        setTotalPendingLeaves(stats.pendingLeaves || 0);
        setForwardedLeaves(stats.forwardedLeaves || 0);
        setTotalApprovedLeaves(stats.approvedLeaves || 0);
        setTotalRejectedLeaves(stats.rejectedLeaves || 0);
        setNotifications(stats.pendingLeaves || 0);
        setFacultyLeaves(stats.totalFacultyLeaves || 0);
        setApprovedFacultyLeaves(stats.approvedFacultyLeaves || 0);
        setRejectedFacultyLeaves(stats.rejectedFacultyLeaves || 0);
      } else if (role === "Super Admin") {
        setTotalCertificates(stats.totalRequests || 0);
        setTotalPendingCertificates(stats.pendingRequests || 0);
        setTotalApprovedCertificates(stats.approvedRequests || 0);
        setTotalRejectedCertificates(stats.rejectedRequests || 0);
        setNotifications(stats.pendingRequests || 0);
        setStudentLeavesCount(stats.totalStudentLeaves || 0);
        setFacultyLeavesCount(stats.totalFacultyLeaves || 0);
        setDeptAdminLeavesCount(stats.totalDeptAdminLeaves || 0);
        setCertificateRequestsCount(stats.totalCertificateRequests || 0);
      }
    } catch (err) {
      console.error("Failed to fetch dashboard stats", err);
    }
  };

  const fetchTotalStudents = async () => {
    const students = await getStudents();
    if (students && Array.isArray(students)) setTotalStudents(students.length);
  };

  useEffect(() => {
    fetchTotalLeaves();
    fetchTotalStudents();
  }, [role]);

  const handleClickOnLeaveSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("reason", reason);
    formData.append("type", type);
    formData.append("fromDate", fromDate);
    formData.append("toDate", toDate);
    if (supportingDocument) formData.append("supportingDocument", supportingDocument);
    try {
      const res = await submitAdminLeaveApplication(formData);
      setLoader(true);
      setLeaveRequest(false);
      if (res) {
        toast.success("Leave Application submitted successfully");
        setType(""); setReason(""); setSupportingDocument(null);
        setTimeout(() => window.location.reload(), 1000);
      }
    } catch (err) { console.error(err); }
  };

  const inputClass = "w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 font-mooxy text-sm outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/20 transition-all";

  const buildStats = () => {
    if (role === "Faculty") {
      return [
        { value: totalStudents, label: "Total Students", link: "/students", to: "", color: "indigo" },
        { value: totalPendingLeaves, label: "Pending Leave Requests", link: "/notificationsAndrequests", to: "pending-leaves", color: "amber" }
      ];
    }
    
    if (role === "Departmental Admin") {
      return [
        { value: totalLeaves, label: "Total Leave Requests", link: "/notificationsAndrequests", to: "", color: "sky" },
        { value: totalPendingLeaves, label: "Pending Leave Requests", link: "/notificationsAndrequests", to: "pending-leaves", color: "amber" },
        { value: forwardedLeaves, label: "Forwarded Leaves", link: "/notificationsAndrequests", to: "forwarded-leaves", color: "purple" },
        { value: totalApprovedLeaves, label: "Approved Leaves", link: "/notificationsAndrequests", to: "accepted-leaves", color: "green" },
        { value: totalRejectedLeaves, label: "Rejected Leaves", link: "/notificationsAndrequests", to: "rejected-leaves", color: "red" },
        { value: facultyLeaves, label: "Faculty Leaves", link: "/notificationsAndrequests", to: "faculty-leaves", color: "indigo" },
        { value: approvedFacultyLeaves, label: "Approved Faculty Leaves", link: "/notificationsAndrequests", to: "approved-faculty-leaves", color: "green" },
        { value: rejectedFacultyLeaves, label: "Rejected Faculty Leaves", link: "/notificationsAndrequests", to: "rejected-faculty-leaves", color: "red" }
      ];
    }
    
    if (role === "Super Admin") {
      return [
        { value: totalCertificates, label: "Total Certificates & Admin Leaves", link: "/notificationsAndrequests", to: "pending-certificates", color: "purple" },
        { value: totalPendingCertificates, label: "Pending Requests", link: "/notificationsAndrequests", to: "pending-certificates", color: "amber" },
        { value: totalApprovedCertificates, label: "Approved Requests", link: "/notificationsAndrequests", to: "approved-certificates", color: "green" },
        { value: totalRejectedCertificates, label: "Rejected Requests", link: "/notificationsAndrequests", to: "rejected-certificates", color: "red" },
        { value: studentLeavesCount, label: "Student Leaves", link: "/notificationsAndrequests", to: "student-leaves", color: "sky" },
        { value: facultyLeavesCount, label: "Faculty Leaves", link: "/notificationsAndrequests", to: "faculty-leaves", color: "indigo" },
        { value: deptAdminLeavesCount, label: "Dept Admin Leaves", link: "/notificationsAndrequests", to: "dept-admin-leaves", color: "amber" },
        { value: certificateRequestsCount, label: "Certificate Requests", link: "/notificationsAndrequests", to: "certificate-requests", color: "purple" }
      ];
    }
    
    return [];
  };

  const colorMap = {
    indigo: { bg: "bg-indigo-500/10", border: "border-indigo-500/20", text: "text-indigo-400", num: "text-indigo-300" },
    sky: { bg: "bg-sky-500/10", border: "border-sky-500/20", text: "text-sky-400", num: "text-sky-300" },
    purple: { bg: "bg-purple-500/10", border: "border-purple-500/20", text: "text-purple-400", num: "text-purple-300" },
    amber: { bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-400", num: "text-amber-300" },
    green: { bg: "bg-green-500/10", border: "border-green-500/20", text: "text-green-400", num: "text-green-300" },
    red: { bg: "bg-red-500/10", border: "border-red-500/20", text: "text-red-400", num: "text-red-300" },
  };

  // Prepare chart data based on role
  const pieData = role === "Departmental Admin" ? [
    { name: 'Approved', value: totalApprovedLeaves + approvedFacultyLeaves, color: '#10B981' },
    { name: 'Rejected', value: totalRejectedLeaves + rejectedFacultyLeaves, color: '#EF4444' },
    { name: 'Pending', value: totalPendingLeaves + (notifications - totalPendingLeaves), color: '#F59E0B' }
  ] : role === "Super Admin" ? [
    { name: 'Approved', value: analytics?.approvedRequests || 0, color: '#10B981' },
    { name: 'Rejected', value: analytics?.rejectedRequests || 0, color: '#EF4444' },
    { name: 'Pending', value: analytics?.pendingRequests || 0, color: '#F59E0B' }
  ] : [];

  const barData = role === "Departmental Admin" ? [
    { name: 'Student Leaves', count: totalLeaves },
    { name: 'Faculty Leaves', count: facultyLeaves }
  ] : role === "Super Admin" ? [
    { name: 'Student', count: studentLeavesCount },
    { name: 'Faculty', count: facultyLeavesCount },
    { name: 'Dept Admin', count: deptAdminLeavesCount },
    { name: 'Certificates', count: certificateRequestsCount }
  ] : [];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1a1f2e] border border-white/10 p-3 rounded-lg shadow-xl outline-none">
          <p className="text-white/60 font-mooxy text-xs mb-1">{label || payload[0].name}</p>
          <p className="text-white font-growmajour text-lg">{payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F19] via-[#0D1117] to-[#111827] flex flex-col">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      {/* Navbar */}
      <nav ref={navRef} className="sticky top-0 z-50 border-b border-white/5 bg-[#0B0F19]/85 backdrop-blur-xl opacity-0">
        <div className="max-w-[1400px] mx-auto px-5 h-16 flex items-center justify-between">
          <Link to="/">
            <div className="flex items-center gap-2.5 cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
                <img src={logo} alt="Requesta" className="w-5 h-5" />
              </div>
              <span className="font-growmajour text-[18px] bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">REQUESTA</span>
            </div>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1 flex-wrap justify-end">
            <Link to="/notificationsforadmin">
              <button className="relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all font-mooxy">
                <Bell size={14} /> Notifications
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] bg-purple-500 text-white text-[10px] font-mooxy flex items-center justify-center rounded-full px-0.5">{notifications}</span>
                )}
              </button>
            </Link>
            <Link to="/adminprofile">
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all font-mooxy"><User size={14} /> Profile</button>
            </Link>
            <Link to="/students">
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all font-mooxy"><Users size={14} /> Students</button>
            </Link>
            {(role === "Departmental Admin" || role === "Super Admin") && (
              <Link to="/analytics">
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all font-mooxy"><BarChart2 size={14} /> Analytics</button>
              </Link>
            )}
            {(role === "Departmental Admin" || role === "Super Admin") && (
              <Link to="/addadmin">
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all font-mooxy"><UserPlus size={14} /> Add Admin</button>
              </Link>
            )}
            {(role === "Departmental Admin" || role === "Super Admin") && (
              <Link to="/otherAdmins">
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all font-mooxy"><ShieldCheck size={14} /> Other Admins</button>
              </Link>
            )}
            {(role === "Faculty" || role === "Departmental Admin") && (
              <button
                onClick={handleClickOnApplyForLeave}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm bg-purple-600 hover:bg-purple-500 text-white font-mooxy shadow-lg shadow-purple-500/20 transition-all"
              >
                {leaveRequest ? <><ArrowLeft size={14} /> Dashboard</> : <><Calendar size={14} /> Apply for Leave</>}
              </button>
            )}
            {(role === "Faculty" || role === "Departmental Admin") && (
              <Link to="/adminleaves">
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all font-mooxy"><FileText size={14} /> Leaves</button>
              </Link>
            )}
          </div>

          <button className="md:hidden text-white/60 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-white/5 bg-[#0D1117] px-5 py-3 flex flex-col gap-1">
            {[
              { to: "/notificationsforadmin", label: `Notifications (${notifications})`, icon: Bell },
              { to: "/adminprofile", label: "Profile", icon: User },
              { to: "/students", label: "Students", icon: Users },
            ].map(({ to, label, icon: Icon }) => (
              <Link key={to} to={to} onClick={() => setMenuOpen(false)}>
                <button className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all font-mooxy flex items-center gap-2">
                  <Icon size={14} /> {label}
                </button>
              </Link>
            ))}
            {(role === "Departmental Admin" || role === "Super Admin") && (
              <Link to="/analytics" onClick={() => setMenuOpen(false)}>
                <button className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all font-mooxy flex items-center gap-2"><BarChart2 size={14} /> Analytics</button>
              </Link>
            )}
            {(role === "Departmental Admin" || role === "Super Admin") && (
              <Link to="/addadmin" onClick={() => setMenuOpen(false)}>
                <button className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all font-mooxy flex items-center gap-2"><UserPlus size={14} /> Add Admin</button>
              </Link>
            )}
            {(role === "Faculty" || role === "Departmental Admin") && (
              <button onClick={() => { handleClickOnApplyForLeave(); setMenuOpen(false); }}
                className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-purple-400 hover:text-purple-300 hover:bg-white/5 transition-all font-mooxy flex items-center gap-2">
                <Calendar size={14} /> Apply for Leave
              </button>
            )}
            {(role === "Faculty" || role === "Departmental Admin") && (
              <Link to="/adminleaves" onClick={() => setMenuOpen(false)}>
                <button className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all font-mooxy flex items-center gap-2"><FileText size={14} /> Leaves</button>
              </Link>
            )}
          </div>
        )}
      </nav>

      <div ref={contentRef} className="flex-1 opacity-0">
        {/* Dashboard Home */}
        {home && (
          <div className="max-w-[1400px] mx-auto px-5 py-10">
            {/* Welcome */}
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-mooxy mb-3">
                <ShieldCheck size={11} /> Admin Dashboard · {role}
              </div>
              <h1 className="font-growmajour text-3xl sm:text-4xl text-white">
                Welcome, <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">{adminName || "Admin"}</span>
              </h1>
              <p className="text-white/40 font-mooxy text-sm mt-2">Manage all institutional requests from one place.</p>
            </div>

            {/* Quick action */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Link to="/notificationsAndrequests">
                <button className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-mooxy shadow-lg shadow-purple-500/20 transition-all hover:scale-[1.02]">
                  Notifications & Requests
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              {notifications > 0 && (
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-sm font-mooxy">
                  <Bell size={14} />
                  {notifications} pending action{notifications > 1 ? "s" : ""} awaiting review
                </div>
              )}
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {buildStats().map((stat, i) => {
                const c = colorMap[stat.color] || colorMap.indigo;
                return (
                  <div
                    key={i}
                    onClick={() => navigate(stat.link, { state: { target: stat.to } })}
                    className={`group relative overflow-hidden bg-white/[0.03] hover:bg-white/[0.05] border border-white/8 hover:border-white/15 rounded-2xl p-5 cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg`}
                  >
                    <div className={`absolute top-0 right-0 w-16 h-16 ${c.bg} rounded-full blur-xl -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity`} />
                    <p className={`font-growmajour text-4xl ${c.num} tabular-nums mb-2`}>{stat.value}</p>
                    <div className={`w-8 h-[2px] ${c.bg} mb-3`} />
                    <p className="text-white/40 font-mooxy text-xs leading-tight">{stat.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Analytics Section (Super/Dept Admin only) */}
            {analytics && (
              <div className="mt-12 pt-10 border-t border-white/5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                    <BarChart2 size={18} className="text-purple-400" />
                  </div>
                  <div>
                    <h2 className="font-growmajour text-xl text-white">Department Analytics</h2>
                    <p className="text-white/40 font-mooxy text-xs">Overview of request processing activity</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <Activity size={20} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white/40 font-mooxy text-[11px] uppercase tracking-wider mb-1">Total Processed</p>
                      <p className="text-white font-growmajour text-2xl">{analytics.totalRequests}</p>
                    </div>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                      <PieChartIcon size={20} className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-white/40 font-mooxy text-[11px] uppercase tracking-wider mb-1">Approval Rate</p>
                      <div className="flex items-end gap-2">
                        <p className="text-green-400 font-growmajour text-2xl">{analytics.approvalRate}%</p>
                        <p className="text-white/30 font-mooxy text-xs mb-1">({analytics.approvedRequests})</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                      <Activity size={20} className="text-red-400" />
                    </div>
                    <div>
                      <p className="text-white/40 font-mooxy text-[11px] uppercase tracking-wider mb-1">Rejection Rate</p>
                      <div className="flex items-end gap-2">
                        <p className="text-red-400 font-growmajour text-2xl">{analytics.rejectionRate}%</p>
                        <p className="text-white/30 font-mooxy text-xs mb-1">({analytics.rejectedRequests})</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Graph Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                  <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                    <h3 className="text-white font-growmajour text-lg mb-6">Request Distribution</h3>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12, fontFamily: 'inherit'}} tickLine={false} axisLine={false} />
                          <YAxis stroke="rgba(255,255,255,0.2)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12, fontFamily: 'inherit'}} tickLine={false} axisLine={false} />
                          <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.02)'}} />
                          <Bar dataKey="count" fill="#8B5CF6" radius={[4, 4, 0, 0]} maxBarSize={50} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                    <h3 className="text-white font-growmajour text-lg mb-6">Status Overview</h3>
                    <div className="h-64 w-full flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData.filter(d => d.value > 0)}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                          >
                            {pieData.filter(d => d.value > 0).map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    {/* Legend */}
                    <div className="flex items-center justify-center gap-6 mt-2">
                      {pieData.map((d, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{backgroundColor: d.color}}></div>
                          <span className="text-white/50 text-xs font-mooxy">{d.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AI System Insights (Super/Dept Admin only) */}
            {(role === "Departmental Admin" || role === "Super Admin") && (
              <SystemInsightsPanel token={localStorage.getItem("adminToken")} />
            )}

          </div>
        )}

        {/* Admin Leave Request Form */}

        {leaveRequest && (
          <div className="max-w-[600px] mx-auto px-5 py-10">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-mooxy mb-3">
                <Calendar size={11} /> Admin Leave Request
              </div>
              <h1 className="font-growmajour text-3xl text-white">Apply for Leave</h1>
              <p className="text-white/40 font-mooxy text-sm mt-1.5">Submit your leave application below</p>
            </div>

            <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6">
              <form className="flex flex-col gap-5 font-mooxy" encType="multipart/form-data">
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Type of Leave</label>
                  <select className={`${inputClass} appearance-none cursor-pointer`} style={{ background: "rgba(255,255,255,0.04)" }} required onChange={(e) => setType(e.target.value)}>
                    <option value="" className="bg-[#111827]">-- Select Leave Type --</option>
                    <option value="Medical Leave" className="bg-[#111827]">Medical Leave</option>
                    <option value="Official Leave" className="bg-[#111827]">Official Leave</option>
                    <option value="Casual Leave" className="bg-[#111827]">Casual Leave</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Reason for Leave</label>
                  <textarea className={`${inputClass} h-28 resize-none`} placeholder="Explain your reason..." required onChange={(e) => setReason(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">From Date</label>
                    <input type="date" className={inputClass} onChange={(e) => setFromDate(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">To Date</label>
                    <input type="date" className={inputClass} onChange={(e) => setToDate(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Supporting Document (optional)</label>
                  <label className="flex flex-col items-center justify-center gap-2 w-full h-20 bg-white/3 border border-dashed border-white/15 rounded-xl cursor-pointer hover:border-purple-500/40 hover:bg-purple-500/5 transition-all">
                    <Upload size={16} className="text-white/30" />
                    <span className="text-white/30 text-xs">{supportingDocument ? supportingDocument.name : "Click to upload"}</span>
                    <input type="file" className="hidden" onChange={(e) => setSupportingDocument(e.target.files[0])} />
                  </label>
                </div>
                <button
                  type="submit"
                  onClick={handleClickOnLeaveSubmit}
                  className="w-full h-11 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-mooxy shadow-lg shadow-purple-500/20 transition-all hover:scale-[1.01] active:scale-[0.98]"
                >
                  Submit Leave Request
                </button>
              </form>
            </div>
          </div>
        )}

        {loader && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader />
            <p className="text-white/40 font-mooxy text-sm">Processing…</p>
          </div>
        )}
      </div>
    </div>
  );
}
