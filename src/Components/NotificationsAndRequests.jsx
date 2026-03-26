import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { Menu, X, ArrowLeft, Filter, Calendar, FileText, CheckCircle, XCircle, Clock, Upload, ChevronDown } from "lucide-react";
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
export const NotificationsAndRequest = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.target) {
      const scrollToSection = () => {
        const target = document.getElementById(location.state.target);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
          return true;
        }
        return false;
      };
      if (!scrollToSection()) {
        const interval = setInterval(() => {
          if (scrollToSection()) clearInterval(interval);
        }, 100);
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
  const [departmentalAdminApproved, setDepartmentalAdminApproved] = useState(
    []
  );
  const [approvedByFaculty, setApprovedByFaculty] = useState([]);
  const [leavesOfDepartmentalAdmin, setLeavesForDepartmentalAdmin] = useState(
    []
  );
  const [approvedByDepartmentalAdmin, setapprovedByDepartmentalAdmin] =
    useState([]);
  const [rejecteddepartmentalAdminLeave, setrejectedDepartmentalAdminLeave] =
    useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  function handleClickOnConfirm() {
    console.log(remark);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  useEffect(() => {
    const fetchData = async () => {
      const otheradmins = await getAdmins();
      const departmental = await getDepartmentalAdmin();
      if (otheradmins) {
        setOtherAdmins(true);
      }
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
        setLeavesForDepartmentalAdmin(
          res3.filter((leave) => leave.status === "pending")
        );
        setapprovedByDepartmentalAdmin(
          res3.filter((leave) => leave.status === "approved")
        );
        setrejectedDepartmentalAdminLeave(
          res3.filter((leave) => leave.status === "rejected")
        );
      }
      if (res2) {
        setApprovedByFaculty(res2);
      }

      if (res) {
        setPendingLeaves(res.filter((leave) => leave.status === "pending"));
        setAcceptedLeaves(res.filter((leave) => leave.status === "approved"));
        setRejectedLeaves(res.filter((leave) => leave.status === "rejected"));
        setSupportingDocument(res.supportingDocument);
      }
      if (res1) {
        setPendingFacultyLeaves(
          res1.filter((leave) => leave.status === "pending")
        );
        setAcceptedFacultyLeaves(
          res1.filter((leave) => leave.status === "approved")
        );
        setRejectedFacultyLeaves(
          res1.filter((leave) => leave.status === "rejected")
        );
      }
    };
    fetchLeaves();
  }, []);
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await getAllCertificatesRequests();
        if (res) {
          setPendingCertificates(
            res.filter((cert) => cert.status === "pending")
          );
          setAcceptedCertificates(
            res.filter((cert) => cert.status === "approved")
          );
          setRejectedCertificates(
            res.filter((cert) => cert.status === "rejected")
          );
        }
      } catch (err) {
        console.error("Error fetching certificates:", err);
      }
    };

    fetchCertificates();
  }, []);

  const handleClickOnAccept = (leaveId) => {
    if (!remark[leaveId]) {
      toast.error("Enter the remark first!!!");
      return;
    }

    setPendingLeaves((prev) =>
      prev.map((l) =>
        l._id === leaveId
          ? { ...l, status: "approved", remark: remark[leaveId] }
          : l
      )
    );
    setConfirm(confirm === leaveId ? null : leaveId);

    updateLeaveStatus(leaveId, "approved", remark[leaveId]).catch(() => {
      setPendingLeaves((prev) =>
        prev.map((l) => (l._id === leaveId ? { ...l, status: "pending" } : l))
      );
    });
  };

  const handleClickOnAcceptAdminLeave = (leaveId) => {
    if (!remark[leaveId]) {
      toast.error("Enter the remark first!!!");
      return;
    }

    setPendingFacultyLeaves((prev) =>
      prev.map((l) =>
        l._id === leaveId
          ? { ...l, status: "approved", remark: remark[leaveId] }
          : l
      )
    );
    setConfirm(confirm === leaveId ? null : leaveId);
    updateAdminLeaves(leaveId, "approved", remark[leaveId]).catch(() => {
      setPendingFacultyLeaves((prev) =>
        prev.map((l) => (l._id === leaveId ? { ...l, status: "pending" } : l))
      );
    });
  };

  const handleClickOnRejectAdminLeave = (leaveId) => {
    if (!remark[leaveId]) {
      toast.error("Enter the remark first!!!");
      return;
    }

    setPendingFacultyLeaves((prev) =>
      prev.map((l) =>
        l._id === leaveId
          ? { ...l, status: "rejected", remark: remark[leaveId] }
          : l
      )
    );
    setConfirm(confirm === leaveId ? null : leaveId);

    updateAdminLeaves(leaveId, "rejected", remark[leaveId]).catch(() => {
      setPendingFacultyLeaves((prev) =>
        prev.map((l) => (l._id === leaveId ? { ...l, status: "pending" } : l))
      );
    });
  };

  const handleClickOnReject = (leaveId) => {
    if (!remark[leaveId]) {
      toast.error("Enter the remark first!!!");
      return;
    }
    setPendingLeaves((prev) =>
      prev.map((l) =>
        l._id === leaveId
          ? { ...l, status: "rejected", remark: remark[leaveId] }
          : l
      )
    );
    setConfirm(confirm === leaveId ? null : leaveId);

    updateLeaveStatus(leaveId, "rejected", remark[leaveId]).catch(() => {
      setPendingLeaves((prev) =>
        prev.map((l) => (l._id === leaveId ? { ...l, status: "pending" } : l))
      );
    });
  };
  const handleClickOnAcceptCertificate = (certId) => {
    if (!remark[certId]) {
      toast.error("Enter the remark first!!!");
      return;
    }
    if (!certificate[certId]) {
      toast.error("Add a certificate");
      return;
    }

    const formData = new FormData();
    formData.append("certId", certId);
    formData.append("status", "approved");
    formData.append("remark", remark[certId]);
    formData.append("addCertificate", certificate[certId]);

    setPendingCertificates((prev) =>
      prev.map((c) => (c._id === certId ? { ...c, status: "approved" } : c))
    );
    setConfirm(confirm === certId ? null : certId);

    updateCertificateStatus(formData).catch(() => {
      setPendingCertificates((prev) =>
        prev.map((c) => (c._id === certId ? { ...c, status: "pending" } : c))
      );
    });
  };

  const handleClickOnForwardLeaveApplication = (leaveId) => {
    if (!remark[leaveId]) {
      toast.error("Enter the remark first!!!");
      return;
    }

    setPendingLeaves((prev) =>
      prev.map((l) =>
        l._id === leaveId
          ? { ...l, status: "forwarded", remark: remark[leaveId] }
          : l
      )
    );
    setConfirm(confirm === leaveId ? null : leaveId);

    updateLeaveStatus(leaveId, "forwarded", remark[leaveId]).catch(() => {
      setPendingLeaves((prev) =>
        prev.map((l) => (l._id === leaveId ? { ...l, status: "pending" } : l))
      );
    });
  };

  const handleClickOnRejectCertificate = (certId) => {
    if (!remark[certId]) {
      toast.error("Enter the remark first!!!");
      return;
    }
    if (!certificate[certId]) {
      toast.error("Add a certificate");
      return;
    }

    const formData = new FormData();
    formData.append("certId", certId);
    formData.append("status", "rejected");
    formData.append("remark", remark[certId]);
    formData.append("addCertificate", certificate[certId]);

    setPendingCertificates((prev) =>
      prev.map((c) =>
        c._id === certId
          ? { ...c, status: "rejected", remark: remark[certId] }
          : c
      )
    );
    setConfirm(confirm === certId ? null : certId);

    updateCertificateStatus(formData).catch(() => {
      setPendingCertificates((prev) =>
        prev.map((c) =>
          c._id === certId
            ? { ...c, status: "pending", remark: remark[certId] }
            : c
        )
      );
    });
  };

  const handleClickOnForwardCertificate = (certId) => {
    if (!remark[certId]) {
      toast.error("Enter the remark first!!!");
      return;
    }
    if (!certificate[certId]) {
      toast.error("Add a certificate");
      return;
    }

    const formData = new FormData();
    formData.append("certId", certId);
    formData.append("status", "forwarded");
    formData.append("remark", remark[certId]);
    formData.append("addCertificate", certificate[certId]);

    setPendingCertificates((prev) =>
      prev.map((c) => (c._id === certId ? { ...c, status: "approved" } : c))
    );
    setConfirm(confirm === certId ? null : certId);

    updateCertificateStatus(formData).catch(() => {
      setPendingCertificates((prev) =>
        prev.map((c) => (c._id === certId ? { ...c, status: "pending" } : c))
      );
    });
  };

  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;
  const oneWeek = oneDay * 7;
  const oneMonth = oneWeek * 4;

  async function handleClickOnLastDayRequets() {
    const res1 = await getAllLeaves();
    if (res1) {
      setPendingLeaves(
        res1.filter(
          (leave) =>
            leave.status === "pending" &&
            now - new Date(leave.createdAt) < oneDay
        )
      );
      setAcceptedLeaves(
        res1.filter(
          (leave) =>
            leave.status === "approved" &&
            now - new Date(leave.createdAt) < oneDay
        )
      );
      setRejectedLeaves(
        res1.filter(
          (leave) =>
            leave.status === "rejected" &&
            now - new Date(leave.createdAt) < oneDay
        )
      );
      setSupportingDocument(res1.supportingDocument);
    }
    const res2 = await getAllCertificatesRequests();
    if (res2) {
      setPendingCertificates(
        res2.filter(
          (cert) =>
            cert.status === "pending" && now - new Date(cert.createdAt) < oneDay
        )
      );
      setAcceptedCertificates(
        res2.filter(
          (cert) =>
            cert.status === "approved" &&
            now - new Date(cert.createdAt) < oneDay
        )
      );
      setRejectedCertificates(
        res2.filter(
          (cert) =>
            cert.status === "rejected" &&
            now - new Date(cert.createdAt) < oneDay
        )
      );
    }
  }

  async function handleClickOnLastWeekRequets() {
    const res1 = await getAllLeaves();
    if (res1) {
      setPendingLeaves(
        res1.filter(
          (leave) =>
            leave.status === "pending" &&
            now - new Date(leave.createdAt) < oneWeek
        )
      );
      setAcceptedLeaves(
        res1.filter(
          (leave) =>
            leave.status === "approved" &&
            now - new Date(leave.createdAt) < oneWeek
        )
      );
      setRejectedLeaves(
        res1.filter(
          (leave) =>
            leave.status === "rejected" &&
            now - new Date(leave.createdAt) < oneWeek
        )
      );
      setSupportingDocument(res1.supportingDocument);
    }
    const res2 = await getAllCertificatesRequests();
    if (res2) {
      setPendingCertificates(
        res2.filter(
          (cert) =>
            cert.status === "pending" &&
            now - new Date(cert.createdAt) < oneWeek
        )
      );
      setAcceptedCertificates(
        res2.filter(
          (cert) =>
            cert.status === "approved" &&
            now - new Date(cert.createdAt) < oneWeek
        )
      );
      setRejectedCertificates(
        res2.filter(
          (cert) =>
            cert.status === "rejected" &&
            now - new Date(cert.createdAt) < oneWeek
        )
      );
    }
  }

  async function handleClickOnLastMonthRequets() {
    const res1 = await getAllLeaves();
    if (res1) {
      setPendingLeaves(
        res1.filter(
          (leave) =>
            leave.status === "pending" &&
            now - new Date(leave.createdAt) < oneMonth
        )
      );
      setAcceptedLeaves(
        res1.filter(
          (leave) =>
            leave.status === "approved" &&
            now - new Date(leave.createdAt) < oneMonth
        )
      );
      setRejectedLeaves(
        res1.filter(
          (leave) =>
            leave.status === "rejected" &&
            now - new Date(leave.createdAt) < oneMonth
        )
      );
      setSupportingDocument(res1.supportingDocument);
    }
    const res2 = await getAllCertificatesRequests();
    if (res2) {
      setPendingCertificates(
        res2.filter(
          (cert) =>
            cert.status === "pending" &&
            now - new Date(cert.createdAt) < oneMonth
        )
      );
      setAcceptedCertificates(
        res2.filter(
          (cert) =>
            cert.status === "approved" &&
            now - new Date(cert.createdAt) < oneMonth
        )
      );
      setRejectedCertificates(
        res2.filter(
          (cert) =>
            cert.status === "rejected" &&
            now - new Date(cert.createdAt) < oneMonth
        )
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F19] via-[#0D1117] to-[#111827]">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      {/* Sticky Navbar */}
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
                    { label: "Last 7 days", fn: handleClickOnLastWeekRequets },
                    { label: "Last 30 days", fn: handleClickOnLastMonthRequets },
                  ].map(({ label, fn }) => (
                    <button
                      key={label}
                      onClick={() => { fn(); setShowFilters(false); }}
                      className="w-full text-left px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/8 text-sm font-mooxy transition-all"
                    >
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
              { label: "Last 7 days", fn: handleClickOnLastWeekRequets },
              { label: "Last 30 days", fn: handleClickOnLastMonthRequets },
            ].map(({ label, fn }) => (
              <button
                key={label}
                onClick={() => { fn(); setMenuOpen(false); }}
                className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all font-mooxy"
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Page header */}
      <div className="max-w-[1400px] mx-auto px-5 pt-10 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-mooxy mb-3">
          <FileText size={11} /> Admin Panel
        </div>
        <h1 className="font-growmajour text-3xl text-white">Notifications &amp; Requests</h1>
        <p className="text-white/40 font-mooxy text-sm mt-1.5">Review, approve, reject and forward all leave and certificate requests.</p>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 pb-16">
        <h2 className="text-white/60 font-growmajour text-xl mt-4 mb-6 flex items-center gap-2 border-b border-white/5 pb-4">
          <Calendar size={18} className="text-indigo-400" /> All Leave Requests
        </h2>

        {departmentalAdmin && (
          <div className="w-full max-w-[960px] h-auto mt-7 mb-10 px-4 mx-auto">
            <h2 className="text-white font-growmajour text-xl sm:text-2xl md:text-[28px] mb-4">
              Leave Requests Approved by the Departmental Admin
            </h2>

            {departmentalAdminApproved.length > 0 ? (
              <div className="flex flex-col gap-4" id="dept-leaves">
                {departmentalAdminApproved.map((l) => (
                  <div
                    key={l._id || l.studentId._id}
                    className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between sm:items-start gap-3 transition-colors duration-300"
                  >
                    <div className="flex-1 space-y-2">
                      <p className="text-gray-300">
                        <span className="text-gray-200 font-radonregular font-bold">
                          Registration Number:
                        </span>{" "}
                        {l.studentId?.registrationNumber || "N/A"}
                      </p>
                      <p className="text-gray-300">
                        <span className="text-gray-200 font-radonregular font-bold">
                          Name:
                        </span>{" "}
                        {l.studentId?.name || "N/A"}
                      </p>
                      <p className="text-gray-300">
                        <span className="text-gray-200 font-radonregular font-bold">
                          Subject:
                        </span>{" "}
                        {l.subject}
                      </p>
                      <p className="text-gray-300 text-justify">
                        <span className="text-gray-200 font-bold font-radonregular">
                          Reason:
                        </span>{" "}
                        <span className="font-regular text-[#999999] font-mooxy">
                          {l.Reason}
                        </span>
                      </p>
                      <p className="text-gray-300 text-sm">
                        Status:{" "}
                        <span
                          className={`ml-1 ${l.status === "approved"
                              ? "text-green-400"
                              : l.status === "rejected"
                                ? "text-red-400"
                                : "text-yellow-400"
                            }`}
                        >
                          {l.status}
                        </span>
                      </p>
                      <p className="text-gray-400 text-xs">
                        Applied On: {new Date(l.createdAt).toLocaleDateString()}
                      </p>

                      {l.supportingDocument && (
                        <div className="mt-3">
                          <p className="text-white font-radonregular mb-2">
                            Supporting Document:
                          </p>
                          <div className="w-full sm:w-[400px] bg-slate-100 rounded-[20px] flex items-center justify-center px-4 py-2">
                            <a
                              href={l.supportingDocument}
                              target="_blank"
                              className="font-mooxy text-center text-sm sm:text-base text-black"
                              rel="noopener noreferrer"
                            >
                              View Supporting Document
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No leave applications found.</p>
            )}
          </div>
        )}

        {departmentalAdmin && (
          <div className="w-full max-w-[960px] h-auto mt-7 mb-10 px-4 mx-auto">
            <h2 className="text-white font-growmajour text-xl sm:text-2xl md:text-[28px] mb-4">
              Pending Leave Requests of Departmental Admins
            </h2>

            {leavesOfDepartmentalAdmin.length > 0 ? (
              <div className="flex flex-col gap-4" id="pending-dept-leaves">
                {leavesOfDepartmentalAdmin.map((l) => (
                  <div
                    key={l._id || l.admin._id}
                    className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between gap-4 transition-colors duration-300"
                  >
                    {/* Left Section: Details */}
                    <div className="flex-1 space-y-2">
                      <p className="text-gray-300">
                        <span className="text-gray-200 font-radonregular font-bold">
                          Registration Number:
                        </span>{" "}
                        {l.admin.adminID || "N/A"}
                      </p>
                      <p className="text-gray-300">
                        <span className="text-gray-200 font-radonregular font-bold">
                          Name:
                        </span>{" "}
                        {l.admin.name || "N/A"}
                      </p>
                      <p className="text-gray-300">
                        <span className="text-gray-200 font-radonregular font-bold">
                          Type:
                        </span>{" "}
                        {l.type}
                      </p>
                      <p className="text-gray-300 text-justify">
                        <span className="text-gray-200 font-bold font-radonregular">
                          Reason:
                        </span>{" "}
                        <span className="font-regular text-[#999999] font-mooxy">
                          {l.reason}
                        </span>
                      </p>
                      <p className="text-gray-300 text-sm">
                        Status:{" "}
                        <span
                          className={`ml-1 ${l.status === "approved"
                              ? "text-green-400"
                              : l.status === "rejected"
                                ? "text-red-400"
                                : "text-yellow-400"
                            }`}
                        >
                          {l.status}
                        </span>
                      </p>
                      <p className="text-gray-400 text-xs">
                        Applied On: {new Date(l.createdAt).toLocaleDateString()}
                      </p>

                      {/* Supporting Document */}
                      {l.supportingDocument && (
                        <div className="mt-3">
                          <p className="text-white font-radonregular mb-2">
                            Supporting Document:
                          </p>
                          <div className="w-full sm:w-[400px] bg-slate-100 rounded-[20px] flex items-center justify-center px-4 py-2">
                            <a
                              href={l.supportingDocument}
                              target="_blank"
                              className="font-mooxy text-center text-sm sm:text-base text-black"
                              rel="noopener noreferrer"
                            >
                              View Supporting Document
                            </a>
                          </div>
                        </div>
                      )}

                      {/* Remark Box */}
                      {remarkBox === l._id && (
                        <div className="mt-4">
                          <p className="text-white font-radonregular">
                            Remarks:
                          </p>
                          <input
                            type="text"
                            placeholder="Enter the remarks.."
                            value={remark[l._id] || ""}
                            onChange={(e) =>
                              setRemark((prev) => ({
                                ...prev,
                                [l._id]: e.target.value,
                              }))
                            }
                            className="w-full h-[50px] border text-white bg-gray-900 rounded-[12px] mt-2 p-3 font-mooxy outline-none"
                          />
                        </div>
                      )}
                      <div
                        className="w-[150px] h-[36px] bg-blue-500 hover:bg-blue-600 mt-3 rounded-[10px] cursor-pointer flex items-center justify-center"
                        onClick={() =>
                          setRemarkBox(remarkBox === l._id ? null : l._id)
                        }
                      >
                        <p className="text-center text-white font-mooxy">
                          Add Remark
                        </p>
                      </div>

                      {confirm === l._id && (
                        <div
                          className="w-[150px] h-[36px] bg-white mt-5 rounded-[12px] flex justify-center items-center cursor-pointer"
                          onClick={handleClickOnConfirm}
                        >
                          <p className="font-mooxy text-black">Confirm</p>
                        </div>
                      )}
                    </div>

                    {/* Right Section: Action Buttons */}
                    <div className="w-full sm:w-[150px] flex flex-col gap-2">
                      {otherAdmins || departmentalAdmin ? (
                        <>
                          <div
                            className="w-full h-[36px] bg-green-500 hover:bg-green-600 rounded-[10px] cursor-pointer flex items-center justify-center"
                            onClick={() => handleClickOnAcceptAdminLeave(l._id)}
                          >
                            <p className="text-white font-mooxy">Accept</p>
                          </div>
                          <div
                            className="w-full h-[36px] bg-red-500 hover:bg-red-600 rounded-[10px] cursor-pointer flex items-center justify-center"
                            onClick={() => handleClickOnRejectAdminLeave(l._id)}
                          >
                            <p className="text-white font-mooxy">Reject</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            className="w-full h-[36px] bg-green-500 hover:bg-green-600 rounded-[10px] cursor-pointer flex items-center justify-center"
                            onClick={() =>
                              handleClickOnForwardLeaveApplication(l._id)
                            }
                          >
                            <p className="text-white font-mooxy">Forward</p>
                          </div>
                          <div
                            className="w-full h-[36px] bg-red-500 hover:bg-red-600 rounded-[10px] cursor-pointer flex items-center justify-center"
                            onClick={() => handleClickOnReject(l._id)}
                          >
                            <p className="text-white font-mooxy">Reject</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No leave applications found.</p>
            )}
          </div>
        )}

        {departmentalAdmin && (
          <div className="w-full max-w-[960px] h-auto mt-7 mb-10 px-4 mx-auto">
            <h2 className="text-white font-growmajour text-[22px] sm:text-[26px] md:text-[28px] mb-4 text-center sm:text-left">
              Accepted Leave Requests of Departmental Admins
            </h2>

            {approvedByDepartmentalAdmin.length > 0 ? (
              <div className="flex flex-col gap-4" id="accepted-dept-leaves">
                {approvedByDepartmentalAdmin.map((l) => (
                  <div
                    key={l._id || l.admin._id}
                    className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-start md:items-center transition-colors duration-300 gap-4"
                  >
                    <div className="flex-1 w-full">
                      <p className="text-gray-300">
                        <span className="text-gray-200 font-radonregular font-bold">
                          Registration Number:
                        </span>{" "}
                        {l.admin.adminID || "N/A"}
                      </p>
                      <p className="text-gray-300">
                        <span className="text-gray-200 font-radonregular font-bold">
                          Name:
                        </span>{" "}
                        {l.admin.name || "N/A"}
                      </p>
                      <p className="text-gray-300">
                        <span className="text-gray-200 font-radonregular font-bold">
                          Type:
                        </span>{" "}
                        {l.type}
                      </p>
                      <p className="text-gray-300 text-justify">
                        <span className="text-gray-200 font-bold font-radonregular">
                          Reason:
                        </span>{" "}
                        <span className="font-regular text-[#999999] font-mooxy">
                          {l.reason}
                        </span>
                      </p>
                      <p className="text-gray-300 text-sm">
                        Status:{" "}
                        <span className="ml-1 text-green-400">{l.status}</span>
                      </p>
                      <p className="text-gray-400 text-xs">
                        Applied On: {new Date(l.createdAt).toLocaleDateString()}
                      </p>

                      {l.supportingDocument && (
                        <div className="w-full max-w-[600px] h-auto mt-3">
                          <p className="text-white font-radonregular text-justify mb-2">
                            <span>Supporting Document:</span>
                          </p>
                          <div className="w-full h-[40px] bg-slate-100 rounded-[20px] flex items-center justify-center">
                            <a
                              href={l.supportingDocument}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mooxy text-center text-sm sm:text-base text-black hover:underline"
                              aria-label="View supporting document"
                            >
                              View Document
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center">
                No leave applications found.
              </p>
            )}
          </div>
        )}

        {departmentalAdmin && (
          <div className="w-full max-w-[960px] h-auto mt-7 mb-10 px-4 mx-auto">
            <h2 className="text-white font-growmajour text-[22px] sm:text-[26px] md:text-[28px] mb-4 text-center sm:text-left">
              Rejected Leave Requests of Departmental Admins
            </h2>

            {rejecteddepartmentalAdminLeave.length > 0 ? (
              <div className="flex flex-col gap-4" id="rejected-dept-leaves">
                {rejecteddepartmentalAdminLeave.map((l) => (
                  <div
                    key={l._id || l.admin._id}
                    className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-start md:items-center transition-colors duration-300 gap-4"
                  >
                    <div className="flex-1 w-full">
                      <p className="text-gray-300">
                        <span className="text-gray-200 font-radonregular font-bold">
                          Registration Number:
                        </span>{" "}
                        {l.admin.adminID || "N/A"}
                      </p>
                      <p className="text-gray-300">
                        <span className="text-gray-200 font-radonregular font-bold">
                          Name:
                        </span>{" "}
                        {l.admin.name || "N/A"}
                      </p>
                      <p className="text-gray-300">
                        <span className="text-gray-200 font-radonregular font-bold">
                          Type:
                        </span>{" "}
                        {l.type}
                      </p>
                      <p className="text-gray-300 text-justify">
                        <span className="text-gray-200 font-bold font-radonregular">
                          Reason:
                        </span>{" "}
                        <span className="font-regular text-[#999999] font-mooxy">
                          {l.reason}
                        </span>
                      </p>
                      <p className="text-gray-300 text-sm">
                        Status:{" "}
                        <span
                          className={`ml-1 ${l.status === "approved"
                              ? "text-green-400"
                              : l.status === "rejected"
                                ? "text-red-400"
                                : "text-yellow-400"
                            }`}
                        >
                          {l.status}
                        </span>
                      </p>
                      <p className="text-gray-400 text-xs">
                        Applied On: {new Date(l.createdAt).toLocaleDateString()}
                      </p>

                      {l.supportingDocument && (
                        <div className="w-full max-w-[600px] h-auto mt-3">
                          <p className="text-white font-radonregular text-justify mb-2">
                            <span>Supporting Document:</span>
                          </p>
                          <div className="w-full h-[40px] bg-slate-100 rounded-[20px] flex items-center justify-center">
                            <a
                              href={l.supportingDocument}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mooxy text-center text-sm sm:text-base text-black hover:underline"
                              aria-label="View supporting document"
                            >
                              View Document
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center">
                No leave applications found.
              </p>
            )}
          </div>
        )}

        {otherAdmins && (
          <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 mt-7 mb-10 mx-auto">
            <h2 className="text-white font-growmajour text-2xl sm:text-3xl mb-4">
              Leave Requests Approved by the Faculty
            </h2>

            {approvedByFaculty.length > 0 ? (
              <div className="flex flex-col gap-4" id="dept-leaves">
                {approvedByFaculty.map((l) => (
                  <div
                    key={l._id || l.studentId._id}
                    className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-start md:items-center transition-colors duration-300"
                  >
                    {/* Left Section */}
                    <div className="flex-1 w-full">
                      <p className="text-gray-300">
                        <span className="text-gray-200 font-radonregular font-bold">
                          Registration Number:
                        </span>{" "}
                        {l.studentId?.registrationNumber || "N/A"}
                      </p>
                      <p className="text-gray-300">
                        <span className="text-gray-200 font-radonregular font-bold">
                          Name:
                        </span>{" "}
                        {l.studentId?.name || "N/A"}
                      </p>
                      <p className="text-gray-300">
                        <span className="text-gray-200 font-radonregular font-bold">
                          Subject:
                        </span>{" "}
                        {l.subject}
                      </p>
                      <p className="text-gray-300 text-justify">
                        <span className="text-gray-200 font-bold font-radonregular">
                          Reason:
                        </span>{" "}
                        <span className="font-regular text-[#999999] font-mooxy">
                          {l.Reason}
                        </span>
                      </p>
                      <p className="text-gray-300 text-sm">
                        Status:{" "}
                        <span
                          className={`ml-1 ${l.status === "approved"
                              ? "text-green-400"
                              : l.status === "rejected"
                                ? "text-red-400"
                                : "text-yellow-400"
                            }`}
                        >
                          {l.status}
                        </span>
                      </p>
                      <p className="text-gray-400 text-xs">
                        Applied On: {new Date(l.createdAt).toLocaleDateString()}
                      </p>

                      {l.supportingDocument && (
                        <div className="mt-3">
                          <p className="text-white font-radonregular text-sm mb-1">
                            Supporting Document:
                          </p>
                          <div className="w-full sm:w-[400px] bg-slate-100 rounded-lg px-3 py-2">
                            <a
                              href={l.supportingDocument}
                              target="_blank"
                              className="font-mooxy text-blue-700 underline block text-center"
                              rel="noopener noreferrer"
                            >
                              View Supporting Document
                            </a>
                          </div>
                        </div>
                      )}

                      {remarkBox === l._id && (
                        <div className="mt-5 w-full">
                          <p className="text-white font-radonregular">
                            Remarks:
                          </p>
                          <input
                            type="text"
                            placeholder="Enter the remarks.."
                            value={remark[l._id] || ""}
                            onChange={(e) =>
                              setRemark((prev) => ({
                                ...prev,
                                [l._id]: e.target.value,
                              }))
                            }
                            className="w-full border text-white rounded-lg mt-2 p-3 font-mooxy outline-none bg-gray-900"
                          />
                        </div>
                      )}

                      {/* Add Remark Button */}
                      <div
                        className="w-[130px] h-[35px] bg-blue-500 hover:bg-blue-600 mt-3 rounded-lg cursor-pointer flex items-center justify-center"
                        onClick={() =>
                          setRemarkBox(remarkBox === l._id ? null : l._id)
                        }
                      >
                        <p className="text-white font-mooxy text-sm">
                          Add Remark
                        </p>
                      </div>

                      {confirm === l._id && (
                        <div
                          className="w-[130px] h-[35px] bg-white mt-4 rounded-lg flex items-center justify-center cursor-pointer"
                          onClick={handleClickOnConfirm}
                        >
                          <p className="font-mooxy text-sm">Confirm</p>
                        </div>
                      )}
                    </div>

                    {/* Right Section (Actions) */}
                    <div className="w-full md:w-[150px] flex flex-row md:flex-col gap-2 mt-4 md:mt-0">
                      {otherAdmins || departmentalAdmin ? (
                        <>
                          <div
                            className="flex-1 bg-green-500 hover:bg-green-600 rounded-lg cursor-pointer flex items-center justify-center h-[35px]"
                            onClick={() => handleClickOnAccept(l._id)}
                          >
                            <p className="text-white font-mooxy text-sm">
                              Accept
                            </p>
                          </div>
                          <div
                            className="flex-1 bg-red-500 hover:bg-red-600 rounded-lg cursor-pointer flex items-center justify-center h-[35px]"
                            onClick={() => handleClickOnReject(l._id)}
                          >
                            <p className="text-white font-mooxy text-sm">
                              Reject
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            className="flex-1 bg-green-500 hover:bg-green-600 rounded-lg cursor-pointer flex items-center justify-center h-[35px]"
                            onClick={() =>
                              handleClickOnForwardLeaveApplication(l._id)
                            }
                          >
                            <p className="text-white font-mooxy text-sm">
                              Forward
                            </p>
                          </div>
                          <div
                            className="flex-1 bg-red-500 hover:bg-red-600 rounded-lg cursor-pointer flex items-center justify-center h-[35px]"
                            onClick={() => handleClickOnReject(l._id)}
                          >
                            <p className="text-white font-mooxy text-sm">
                              Reject
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No leave applications found.</p>
            )}
          </div>
        )}

        {otherAdmins && (
          <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 mt-7 mb-10 mx-auto">
            <h2 className="text-white font-growmajour text-2xl sm:text-3xl mb-4">
              Pending Leave Requests of Faculties
            </h2>

            {pendingFacultyLeaves.length > 0 ? (
              <div className="flex flex-col gap-4" id="dept-leaves">
                {pendingFacultyLeaves.map((l) => (
                  <div
                    key={l._id || l.admin._id}
                    className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-start md:items-center transition-colors duration-300"
                  >
                    {/* Left Content */}
                    <div className="flex-1 w-full">
                      <p className="text-gray-300">
                        <span className="text-gray-200 font-radonregular font-bold">
                          Registration Number:
                        </span>{" "}
                        {l.admin?.adminID || "N/A"}
                      </p>
                      <p className="text-gray-300">
                        <span className="text-gray-200 font-radonregular font-bold">
                          Name:
                        </span>{" "}
                        {l.admin?.name || "N/A"}
                      </p>
                      <p className="text-gray-300">
                        <span className="text-gray-200 font-radonregular font-bold">
                          Type:
                        </span>{" "}
                        {l.type}
                      </p>
                      <p className="text-gray-300 text-justify">
                        <span className="text-gray-200 font-bold font-radonregular">
                          Reason:
                        </span>{" "}
                        <span className="font-regular text-[#999999] font-mooxy">
                          {l.Reason}
                        </span>
                      </p>
                      <p className="text-gray-300 text-sm">
                        Status:{" "}
                        <span
                          className={`ml-1 ${l.status === "approved"
                              ? "text-green-400"
                              : l.status === "rejected"
                                ? "text-red-400"
                                : "text-yellow-400"
                            }`}
                        >
                          {l.status}
                        </span>
                      </p>
                      <p className="text-gray-400 text-xs">
                        Applied On: {new Date(l.createdAt).toLocaleDateString()}
                      </p>

                      {/* Supporting Document */}
                      {l.supportingDocument && (
                        <div className="mt-3">
                          <p className="text-white font-radonregular text-sm mb-1">
                            Supporting Document:
                          </p>
                          <div className="w-full sm:w-[400px] bg-slate-100 rounded-lg px-3 py-2">
                            <a
                              href={l.supportingDocument}
                              target="_blank"
                              className="font-mooxy text-black block text-center"
                              rel="noopener noreferrer"
                              download
                            >
                              View Supporting Document
                            </a>
                          </div>
                        </div>
                      )}

                      {/* Remark Box */}
                      {remarkBox === l._id && (
                        <div className="mt-5 w-full">
                          <p className="text-white font-radonregular">
                            Remarks:
                          </p>
                          <input
                            type="text"
                            placeholder="Enter the remarks.."
                            value={remark[l._id] || ""}
                            onChange={(e) =>
                              setRemark((prev) => ({
                                ...prev,
                                [l._id]: e.target.value,
                              }))
                            }
                            className="w-full border text-white rounded-lg mt-2 p-3 font-mooxy outline-none bg-gray-900"
                          />
                        </div>
                      )}

                      {/* Add Remark Button */}
                      <div
                        className="w-[130px] h-[35px] bg-blue-500 hover:bg-blue-600 mt-3 rounded-lg cursor-pointer flex items-center justify-center"
                        onClick={() =>
                          setRemarkBox(remarkBox === l._id ? null : l._id)
                        }
                      >
                        <p className="text-white font-mooxy text-sm">
                          Add Remark
                        </p>
                      </div>

                      {confirm === l._id && (
                        <div
                          className="w-[130px] h-[35px] bg-white mt-4 rounded-lg flex items-center justify-center cursor-pointer"
                          onClick={handleClickOnConfirm}
                        >
                          <p className="font-mooxy text-sm">Confirm</p>
                        </div>
                      )}
                    </div>

                    {/* Right Action Buttons */}
                    <div className="w-full md:w-[150px] flex flex-row md:flex-col gap-2 mt-4 md:mt-0">
                      {otherAdmins ? (
                        <>
                          <div
                            className="flex-1 bg-green-500 hover:bg-green-600 rounded-lg cursor-pointer flex items-center justify-center h-[35px]"
                            onClick={() => handleClickOnAcceptAdminLeave(l._id)}
                          >
                            <p className="text-white font-mooxy text-sm">
                              Accept
                            </p>
                          </div>
                          <div
                            className="flex-1 bg-red-500 hover:bg-red-600 rounded-lg cursor-pointer flex items-center justify-center h-[35px]"
                            onClick={() => handleClickOnRejectAdminLeave(l._id)}
                          >
                            <p className="text-white font-mooxy text-sm">
                              Reject
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            className="flex-1 bg-green-500 hover:bg-green-600 rounded-lg cursor-pointer flex items-center justify-center h-[35px]"
                            onClick={() =>
                              handleClickOnForwardLeaveApplication(l._id)
                            }
                          >
                            <p className="text-white font-mooxy text-sm">
                              Forward
                            </p>
                          </div>
                          <div
                            className="flex-1 bg-red-500 hover:bg-red-600 rounded-lg cursor-pointer flex items-center justify-center h-[35px]"
                            onClick={() => handleClickOnReject(l._id)}
                          >
                            <p className="text-white font-mooxy text-sm">
                              Reject
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No leave applications found.</p>
            )}
          </div>
        )}

        {otherAdmins && (
          <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 mt-7 mb-10 mx-auto">
            <h2 className="text-white font-growmajour text-2xl sm:text-3xl mb-4">
              Accepted Leave Requests of Faculties
            </h2>

            {acceptedFacultyLeaves.length > 0 ? (
              <div className="flex flex-col gap-4" id="faculty-approved-leaves">
                {acceptedFacultyLeaves.map((l) => (
                  <div
                    key={l._id || l.admin._id}
                    className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 transition-colors duration-300"
                  >
                    <div className="flex-1">
                      <p className="text-gray-300">
                        <span className="text-gray-200 font-radonregular font-bold">
                          Registration Number:
                        </span>{" "}
                        {l.admin?.adminID || "N/A"}
                      </p>
                      <p className="text-gray-300">
                        <span className="text-gray-200 font-radonregular font-bold">
                          Name:
                        </span>{" "}
                        {l.admin?.name || "N/A"}
                      </p>
                      <p className="text-gray-300">
                        <span className="text-gray-200 font-radonregular font-bold">
                          Type:
                        </span>{" "}
                        {l.type}
                      </p>
                      <p className="text-gray-300 text-justify">
                        <span className="text-gray-200 font-bold font-radonregular">
                          Reason:
                        </span>{" "}
                        <span className="font-regular text-[#999999] font-mooxy">
                          {l.Reason}
                        </span>
                      </p>
                      <p className="text-gray-300 text-sm">
                        Status:{" "}
                        <span
                          className={`ml-1 ${l.status === "approved"
                              ? "text-green-400"
                              : l.status === "rejected"
                                ? "text-red-400"
                                : "text-yellow-400"
                            }`}
                        >
                          {l.status}
                        </span>
                      </p>
                      <p className="text-gray-400 text-xs">
                        Applied On: {new Date(l.createdAt).toLocaleDateString()}
                      </p>

                      {l.supportingDocument && (
                        <div className="mt-3">
                          <p className="text-white font-radonregular mb-1">
                            Supporting Document:
                          </p>
                          <div className="w-full max-w-md bg-slate-100 rounded-[20px] flex items-center justify-center py-2 px-4">
                            <a
                              href={l.supportingDocument}
                              target="_blank"
                              rel="noopener noreferrer"
                              download
                              className="font-mooxy text-center text-sm sm:text-base text-blue-600 hover:underline"
                            >
                              View Supporting Document
                            </a>
                          </div>
                        </div>
                      )}

                      {remarkBox === l._id && (
                        <div className="w-full mt-5">
                          <p className="text-white font-radonregular">
                            Remarks:
                          </p>
                          <input
                            type="text"
                            placeholder="Enter the remarks.."
                            value={remark[l._id] || ""}
                            onChange={(e) =>
                              setRemark((prev) => ({
                                ...prev,
                                [l._id]: e.target.value,
                              }))
                            }
                            className="w-full border text-white rounded-[20px] mt-2 p-3 font-mooxy outline-none bg-gray-700"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No leave applications found.</p>
            )}
          </div>
        )}

        {otherAdmins && (
          <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 mt-7 mb-10 mx-auto">
            <h2 className="text-white font-growmajour text-2xl sm:text-3xl mb-4">
              Rejected Leave Requests of Faculties
            </h2>

            {rejectedFacultyLeaves.length > 0 ? (
              <div className="flex flex-col gap-4" id="faculty-rejected-leaves">
                {rejectedFacultyLeaves.map((l) => (
                  <div
                    key={l._id || l.admin._id}
                    className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 transition-colors duration-300"
                  >
                    <div className="flex-1">
                      <p className="text-gray-300">
                        <span className="text-gray-200 font-radonregular font-bold">
                          Registration Number:
                        </span>{" "}
                        {l.admin?.adminID || "N/A"}
                      </p>
                      <p className="text-gray-300">
                        <span className="text-gray-200 font-radonregular font-bold">
                          Name:
                        </span>{" "}
                        {l.admin?.name || "N/A"}
                      </p>
                      <p className="text-gray-300">
                        <span className="text-gray-200 font-radonregular font-bold">
                          Type:
                        </span>{" "}
                        {l.type}
                      </p>
                      <p className="text-gray-300 text-justify">
                        <span className="text-gray-200 font-bold font-radonregular">
                          Reason:
                        </span>{" "}
                        <span className="font-regular text-[#999999] font-mooxy">
                          {l.Reason}
                        </span>
                      </p>
                      <p className="text-gray-300 text-sm">
                        Status:{" "}
                        <span
                          className={`ml-1 ${l.status === "approved"
                              ? "text-green-400"
                              : l.status === "rejected"
                                ? "text-red-400"
                                : "text-yellow-400"
                            }`}
                        >
                          {l.status}
                        </span>
                      </p>
                      <p className="text-gray-400 text-xs">
                        Applied On: {new Date(l.createdAt).toLocaleDateString()}
                      </p>

                      {l.supportingDocument && (
                        <div className="mt-3">
                          <p className="text-white font-radonregular mb-1">
                            Supporting Document:
                          </p>
                          <div className="w-full max-w-md bg-slate-100 rounded-[20px] flex items-center justify-center py-2 px-4">
                            <a
                              href={l.supportingDocument}
                              target="_blank"
                              rel="noopener noreferrer"
                              download
                              className="font-mooxy text-center text-sm sm:text-base text-blue-600 hover:underline"
                            >
                              View Supporting Document
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No leave applications found.</p>
            )}
          </div>
        )}

        <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 mt-7 mb-10 mx-auto justify-selft-center">
          <h2 className="text-white font-growmajour text-2xl sm:text-3xl mb-4">
            Pending Leave Requests
          </h2>

          {pendingleaves.length > 0 ? (
            <div className="flex flex-col gap-4" id="pending-leaves">
              {pendingleaves.map((l) => (
                <div
                  key={l._id || l.studentId._id}
                  className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 transition-colors duration-300"
                >
                  {/* Left Side: Student Info */}
                  <div className="flex-1">
                    <p className="text-gray-300">
                      <span className="text-gray-200 font-radonregular font-bold">
                        Registration Number:
                      </span>{" "}
                      {l.studentId?.registrationNumber || "N/A"}
                    </p>
                    <p className="text-gray-300">
                      <span className="text-gray-200 font-radonregular font-bold">
                        Name:
                      </span>{" "}
                      {l.studentId?.name || "N/A"}
                    </p>
                    <p className="text-gray-300">
                      <span className="text-gray-200 font-radonregular font-bold">
                        Subject:
                      </span>{" "}
                      {l.subject}
                    </p>
                    <p className="text-gray-300 text-justify">
                      <span className="text-gray-200 font-bold font-radonregular">
                        Reason:
                      </span>{" "}
                      <span className="font-regular text-[#999999] font-mooxy">
                        {l.Reason}
                      </span>
                    </p>
                    <p className="text-gray-300 text-sm">
                      Status:{" "}
                      <span
                        className={`ml-1 ${l.status === "approved"
                            ? "text-green-400"
                            : l.status === "rejected"
                              ? "text-red-400"
                              : "text-yellow-400"
                          }`}
                      >
                        {l.status}
                      </span>
                    </p>
                    <p className="text-gray-400 text-xs">
                      Applied On: {new Date(l.createdAt).toLocaleDateString()}
                    </p>

                    {/* Supporting Document */}
                    {l.supportingDocument && (
                      <div className="mt-3">
                        <p className="text-white font-radonregular mb-1">
                          Supporting Document:
                        </p>
                        <div className="w-full max-w-md bg-slate-100 rounded-[20px] flex items-center justify-center py-2 px-4">
                          <a
                            href={l.supportingDocument}
                            target="_blank"
                            className="font-mooxy text-center text-sm sm:text-base text-blue-600 hover:underline"
                            rel="noopener noreferrer"
                          >
                            View Supporting Document
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Remarks */}
                    {remarkBox === l._id && (
                      <div className="w-full max-w-3xl mt-5">
                        <p className="text-white font-radonregular">Remarks:</p>
                        <input
                          type="text"
                          placeholder="Enter the remarks.."
                          value={remark[l._id] || ""}
                          onChange={(e) =>
                            setRemark((prev) => ({
                              ...prev,
                              [l._id]: e.target.value,
                            }))
                          }
                          className="w-full h-[50px] border text-white rounded-[20px] mt-2 p-3 font-mooxy outline-none"
                        />
                      </div>
                    )}

                    {/* Add Remark Button */}
                    <div
                      className="w-[150px] h-[30px] bg-blue-500 hover:bg-blue-600 mt-3 rounded-[10px] cursor-pointer"
                      onClick={() =>
                        setRemarkBox(remarkBox === l._id ? null : l._id)
                      }
                    >
                      <p className="text-center text-white font-mooxy mt-1">
                        Add Remark
                      </p>
                    </div>

                    {/* Confirm Button */}
                    {confirm === l._id && (
                      <div
                        className="w-[150px] h-[30px] bg-white mt-5 rounded-[20px] flex justify-center self-center cursor-pointer"
                        onClick={handleClickOnConfirm}
                      >
                        <p className="font-mooxy mt-1">Confirm</p>
                      </div>
                    )}
                  </div>

                  {/* Right Side: Action Buttons */}
                  {otherAdmins || departmentalAdmin ? (
                    <div className="w-full sm:w-[150px] flex sm:flex-col justify-between gap-2">
                      <div
                        className="w-full h-[30px] bg-green-500 hover:bg-green-600 rounded-[10px] cursor-pointer"
                        onClick={() => handleClickOnAccept(l._id)}
                      >
                        <p className="text-center text-white font-mooxy mt-1">
                          Accept
                        </p>
                      </div>
                      <div
                        className="w-full h-[30px] bg-red-500 hover:bg-red-600 rounded-[10px] cursor-pointer"
                        onClick={() => handleClickOnReject(l._id)}
                      >
                        <p className="text-center text-white font-mooxy mt-1">
                          Reject
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full sm:w-[150px] flex sm:flex-col justify-between gap-2">
                      <div
                        className="w-full h-[30px] bg-green-500 hover:bg-green-600 rounded-[10px] cursor-pointer"
                        onClick={() =>
                          handleClickOnForwardLeaveApplication(l._id)
                        }
                      >
                        <p className="text-center text-white font-mooxy mt-1">
                          Forward
                        </p>
                      </div>
                      <div
                        className="w-full h-[30px] bg-red-500 hover:bg-red-600 rounded-[10px] cursor-pointer"
                        onClick={() => handleClickOnReject(l._id)}
                      >
                        <p className="text-center text-white font-mooxy mt-1">
                          Reject
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No leave applications found.</p>
          )}
        </div>

        <div className="w-full max-w-5xl h-auto mt-7 mb-10 px-4 sm:px-6 lg:px-8 justify-self-center">
          <h2 className="text-white font-growmajour text-2xl sm:text-3xl mb-4">
            Accepted Leave Requests
          </h2>

          {acceptedLeaves.length > 0 ? (
            <div className="flex flex-col gap-4" id="accepted-leaves">
              {acceptedLeaves.map((l) => (
                <div
                  key={l._id || l.studentId._id}
                  className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 transition-colors duration-300"
                >
                  <div className="flex-1">
                    <p className="text-gray-300 text-sm sm:text-base break-words">
                      <span className="text-gray-200 font-radonregular font-bold">
                        Registration Number:
                      </span>{" "}
                      {l.studentId?.registrationNumber || "N/A"}
                    </p>

                    <p className="text-gray-300 text-sm sm:text-base break-words">
                      <span className="text-gray-200 font-radonregular font-bold">
                        Name:
                      </span>{" "}
                      {l.studentId?.name || "N/A"}
                    </p>

                    <p className="text-gray-300 text-sm sm:text-base break-words font-radonregular">
                      <span className="text-gray-200 font-bold">Subject:</span>{" "}
                      {l.subject}
                    </p>

                    <p className="text-gray-300 text-sm sm:text-base text-justify break-words">
                      <span className="text-gray-200 font-radonregular font-bold">
                        Reason:
                      </span>{" "}
                      <span className="text-[#999999] font-mooxy font-light">
                        {l.Reason}
                      </span>
                    </p>

                    <p className="text-gray-300 text-sm">
                      Status:{" "}
                      <span
                        className={`ml-1 ${l.status === "approved"
                            ? "text-green-400"
                            : l.status === "rejected"
                              ? "text-red-400"
                              : "text-yellow-400"
                          }`}
                      >
                        {l.status}
                      </span>
                    </p>

                    <p className="text-gray-400 text-xs">
                      Applied On: {new Date(l.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No leave applications found.</p>
          )}
        </div>

        <div className="w-full max-w-5xl h-auto mt-7 mb-10 px-4 sm:px-6 lg:px-8 justify-self-center">
          <h2 className="text-white font-growmajour text-2xl sm:text-3xl mb-4">
            Rejected Leave Requests
          </h2>

          {rejectedLeaves.length > 0 ? (
            <div className="flex flex-col gap-4" id="rejected-leaves">
              {rejectedLeaves.map((l) => (
                <div
                  key={l._id || l.studentId._id}
                  className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 hover:bg-gray-700 transition-colors duration-300"
                >
                  <div className="flex-1">
                    <p className="text-gray-300 text-sm sm:text-base break-words">
                      <span className="text-gray-200 font-radonregular font-bold">
                        Registration Number:
                      </span>{" "}
                      {l.studentId?.registrationNumber || "N/A"}
                    </p>

                    <p className="text-gray-300 text-sm sm:text-base break-words">
                      <span className="text-gray-200 font-radonregular font-bold">
                        Name:
                      </span>{" "}
                      {l.studentId?.name || "N/A"}
                    </p>

                    <p className="text-gray-300 text-sm sm:text-base break-words">
                      <span className="text-gray-200 font-radonregular font-bold">
                        Subject:
                      </span>{" "}
                      {l.subject}
                    </p>

                    <p className="text-gray-300 text-sm sm:text-base text-justify break-words">
                      <span className="text-gray-200 font-radonregular font-bold">
                        Reason:
                      </span>{" "}
                      <span className="font-mooxy font-light">{l.Reason}</span>
                    </p>

                    <p className="text-gray-300 text-sm">
                      Status:{" "}
                      <span
                        className={`ml-1 ${l.status === "approved"
                            ? "text-green-400"
                            : l.status === "rejected"
                              ? "text-red-400"
                              : "text-yellow-400"
                          }`}
                      >
                        {l.status}
                      </span>
                    </p>

                    <p className="text-gray-400 text-xs">
                      Applied On: {new Date(l.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No leave applications found.</p>
          )}
        </div>
      </div>
      <div id="certificates-section" className="px-4 sm:px-6 lg:px-8">
        {/* Main Title */}
        <h2 className="text-[#999999] font-radonregular underline text-2xl sm:text-3xl lg:text-4xl mt-10 mb-6 text-left">
          All Certificate Requests
        </h2>

        {/* Pending Certificates */}
        <div className="w-full max-w-5xl h-auto mt-7 mb-10 justify-self-center">
          <h2 className="text-white font-growmajour text-xl sm:text-2xl lg:text-3xl mb-4">
            Pending Certificate Requests
          </h2>

          {pendingCertificates.length > 0 ? (
            <div className="flex flex-col gap-4" id="pending-certificates">
              {pendingCertificates.map((l) => (
                <div
                  key={l._id || l.student._id}
                  className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-300 flex flex-col gap-4"
                >
                  {/* Info */}
                  <div>
                    <p className="text-gray-300 text-sm sm:text-base">
                      <span className="text-gray-200 font-bold">
                        Registration Number:
                      </span>{" "}
                      {l.student?.registrationNumber || "N/A"}
                    </p>
                    <p className="text-gray-300 text-sm sm:text-base">
                      <span className="text-gray-200 font-bold">Name:</span>{" "}
                      {l.student?.name || "N/A"}
                    </p>
                    <p className="text-gray-300 text-sm sm:text-base">
                      <span className="text-gray-200 font-bold">Purpose:</span>{" "}
                      {l.purpose}
                    </p>
                    <p className="text-gray-300 text-sm sm:text-base">
                      <span className="text-gray-200 font-bold">
                        Certificate Type:
                      </span>{" "}
                      {l.CertificateType}
                    </p>
                    <p className="text-gray-300 text-sm">
                      Status:{" "}
                      <span
                        className={`ml-1 ${l.status === "approved"
                            ? "text-green-400"
                            : l.status === "rejected"
                              ? "text-red-400"
                              : "text-yellow-400"
                          }`}
                      >
                        {l.status}
                      </span>
                    </p>
                    <p className="text-gray-400 text-xs">
                      Applied On: {new Date(l.createdAt).toLocaleDateString()}
                    </p>

                    {/* Supporting Document */}
                    {l.supportingDocument && (
                      <div className="mt-3 flex flex-col sm:flex-row gap-2 sm:items-center">
                        <p className="text-white font-radonregular text-sm">
                          Supporting Document:
                        </p>
                        <a
                          href={l.supportingDocument}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-1 rounded-full bg-slate-100 text-black font-mooxy text-center text-sm"
                        >
                          View
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Remark + Upload */}
                  {remarkBox === l._id && (
                    <div className="flex flex-col gap-4">
                      <div>
                        <p className="text-white font-radonregular">Remarks:</p>
                        <input
                          type="text"
                          placeholder="Enter the remarks.."
                          value={remark[l._id] || ""}
                          onChange={(e) =>
                            setRemark((prev) => ({
                              ...prev,
                              [l._id]: e.target.value,
                            }))
                          }
                          className="w-full h-[50px] border text-white rounded-[20px] mt-2 p-3 font-mooxy outline-none"
                        />
                      </div>

                      <div>
                        <p className="text-white font-radonregular">
                          Add Certificate:
                        </p>
                        <input
                          type="file"
                          onChange={(e) =>
                            setCertificate((prev) => ({
                              ...prev,
                              [l._id]: e.target.files[0],
                            }))
                          }
                          className="w-full h-[50px] border text-white rounded-[20px] mt-2 p-3 font-mooxy outline-none"
                        />
                        {certificate[l._id] && (
                          <p className="text-green-400 mt-2 text-sm">
                            File selected: {certificate[l._id].name}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {otherAdmins || departmentalAdmin ? (
                    <div className="flex flex-wrap gap-3">
                      <button
                        className="flex-1 min-w-[120px] bg-blue-500 hover:bg-blue-600 rounded-[10px] py-2 text-white font-mooxy"
                        onClick={() =>
                          setRemarkBox(remarkBox === l._id ? null : l._id)
                        }
                      >
                        Add Remark
                      </button>
                      <button
                        className="flex-1 min-w-[120px] bg-green-500 hover:bg-green-600 rounded-[10px] py-2 text-white font-mooxy"
                        onClick={() => handleClickOnAcceptCertificate(l._id)}
                      >
                        Accept
                      </button>
                      <button
                        className="flex-1 min-w-[120px] bg-red-500 hover:bg-red-600 rounded-[10px] py-2 text-white font-mooxy"
                        onClick={() => handleClickOnRejectCertificate(l._id)}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-3">
                      <button
                        className="flex-1 min-w-[120px] bg-blue-500 hover:bg-blue-600 rounded-[10px] py-2 text-white font-mooxy"
                        onClick={() =>
                          setRemarkBox(remarkBox === l._id ? null : l._id)
                        }
                      >
                        Add Remark
                      </button>
                      <button
                        className="flex-1 min-w-[120px] bg-green-500 hover:bg-green-600 rounded-[10px] py-2 text-white font-mooxy"
                        onClick={() => handleClickOnForwardCertificate(l._id)}
                      >
                        Forward
                      </button>
                      <button
                        className="flex-1 min-w-[120px] bg-red-500 hover:bg-red-600 rounded-[10px] py-2 text-white font-mooxy"
                        onClick={() => handleClickOnRejectCertificate(l._id)}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No certificate applications found.</p>
          )}
        </div>

        {/* Accepted Certificates */}
        <div className="w-full max-w-5xl h-auto mt-7 mb-10 justify-self-center">
          <h2 className="text-white font-growmajour text-xl sm:text-2xl lg:text-3xl mb-4">
            Accepted Certificate Requests
          </h2>
          {acceptedCertificates.length > 0 ? (
            <div className="flex flex-col gap-4" id="approved-certificates">
              {acceptedCertificates.map((l) => (
                <div
                  key={l._id || l.student._id}
                  className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-300"
                >
                  <div>
                    <p className="text-gray-300 text-sm sm:text-base">
                      <span className="text-gray-200 font-bold">
                        Registration Number:
                      </span>{" "}
                      {l.student?.registrationNumber || "N/A"}
                    </p>
                    <p className="text-gray-300 text-sm sm:text-base">
                      <span className="text-gray-200 font-bold">Name:</span>{" "}
                      {l.student?.name || "N/A"}
                    </p>
                    <p className="text-gray-300 text-sm sm:text-base">
                      <span className="text-gray-200 font-bold">Purpose:</span>{" "}
                      {l.purpose}
                    </p>
                    <p className="text-gray-300 text-sm sm:text-base">
                      <span className="text-gray-200 font-bold">
                        Certificate Type:
                      </span>{" "}
                      {l.CertificateType}
                    </p>
                    <p className="text-gray-300 text-sm">
                      Status:{" "}
                      <span
                        className={`ml-1 ${l.status === "approved"
                            ? "text-green-400"
                            : l.status === "rejected"
                              ? "text-red-400"
                              : "text-yellow-400"
                          }`}
                      >
                        {l.status}
                      </span>
                    </p>
                    <p className="text-gray-400 text-xs">
                      Applied On: {new Date(l.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No certificate applications found.</p>
          )}
        </div>

        {/* Rejected Certificates */}
        <div className="w-full max-w-5xl h-auto mt-7 mb-10 justify-self-center">
          <h2 className="text-white font-growmajour text-xl sm:text-2xl lg:text-3xl mb-4">
            Rejected Certificate Requests
          </h2>
          {rejectedCertificates.length > 0 ? (
            <div className="flex flex-col gap-4" id="rejected-certificates">
              {rejectedCertificates.map((l) => (
                <div
                  key={l._id || l.student._id}
                  className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-300"
                >
                  <div>
                    <p className="text-gray-300 text-sm sm:text-base">
                      <span className="text-gray-200 font-bold">
                        Registration Number:
                      </span>{" "}
                      {l.student?.registrationNumber || "N/A"}
                    </p>
                    <p className="text-gray-300 text-sm sm:text-base">
                      <span className="text-gray-200 font-bold">Name:</span>{" "}
                      {l.student?.name || "N/A"}
                    </p>
                    <p className="text-gray-300 text-sm sm:text-base">
                      <span className="text-gray-200 font-bold">Purpose:</span>{" "}
                      {l.purpose}
                    </p>
                    <p className="text-gray-300 text-sm sm:text-base">
                      <span className="text-gray-200 font-bold">
                        Certificate Type:
                      </span>{" "}
                      {l.CertificateType}
                    </p>
                    <p className="text-gray-300 text-sm">
                      Status:{" "}
                      <span
                        className={`ml-1 ${l.status === "approved"
                            ? "text-green-400"
                            : l.status === "rejected"
                              ? "text-red-400"
                              : "text-yellow-400"
                          }`}
                      >
                        {l.status}
                      </span>
                    </p>
                    <p className="text-gray-400 text-xs">
                      Applied On: {new Date(l.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No certificate applications found.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};
