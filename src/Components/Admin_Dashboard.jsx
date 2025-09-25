import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";
import { getAdminDashboard } from "../utils/GETAdminDashBoard";
import { getAllLeaves } from "../utils/GETAllLeaves";
import { getStudents } from "../utils/GETAllStudents";
import { getAllCertificatesRequests } from "../utils/GETAllCertificateRequests";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getFacultyLeaves } from "../utils/GETFacultyLeaves";
import { getAdmins } from "../utils/GETOtherAdminsData";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getSuperAdminLeaves } from "../utils/GETLeavesForSuperAdmin";
import { submitAdminLeaveApplication } from "../utils/POSTAdminLeaveApplication";
import { getDepartmentalAdminLeave } from "../utils/GETDepartmentalAdminLeaves";
import { getDepartmentalAdmin } from "../utils/GETDepartmentalAdmin";
import { getLeavesForDepartmentalAdmin } from "../utils/GETLeavesForDepartmentalAdmin";
import Loader from "./Loader";
import { Menu, X } from "lucide-react";
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("");
  const [role, setRole] = useState("");
  const [totalLeaves, setTotalLeaves] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalCertificates, setTotalCertificates] = useState(0);
  const [totalPendingLeaves, setTotalPendingLeaves] = useState(0);
  const [totalApprovedLeaves, setTotalApprovedLeaves] = useState(0);
  const [totalRejectedLeaves, setTotalRejectedLeaves] = useState(0);
  const [totalPendingCertificates, setTotalPendingCertificates] = useState(0);
  const [totalApprovedCertificates, setTotalApprovedCertificates] = useState(0);
  const [totalRejectedCertificates, setTotalRejectedCertificates] = useState(0);
  const [approvedByDepartmentalAdmin, setapprovedByDepartmentalAdmin] =
    useState(0);
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
  const [pendingdepartmentalAdminLeave, setpendingDepartmentalAdminLeave] =
    useState(0);
  const [approveddepartmentalAdminLeave, setapprovedDepartmentalAdminLeave] =
    useState(0);
  const [rejecteddepartmentalAdminLeave, setrejectedDepartmentalAdminLeave] =
    useState(0);
  const [leavesForDepartmentalAdmin, setLeavesForDepartmentalAdmin] =
    useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  function handleClickOnApplyForLeave() {
    setLeaveRequest(!leaveRequest);
    setHome(!home);
  }
  const getAdminData = async () => {
    const currentAdmin = await getAdminDashboard();
    return currentAdmin;
  };
  useEffect(() => {
    const fetchData = async () => {
      const otheradmins = await getAdmins();
      const departmentalAdmins = await getDepartmentalAdmin();
      if (otheradmins) {
        setOtherAdmins(true);
      }
      if (departmentalAdmins) {
        setDepartmentalAdmins(true);
      }
      const admin = await getAdminData();
      if (admin && admin.name) {
        setAdminName(admin.name);
      }
      if (admin && admin.role) {
        setRole(admin.role);
      }
    };
    fetchData();
  }, [adminName]);

  const fetchTotalLeaves = async () => {
    if (role === "Super Admin") {
      const leaves = await getAllLeaves();
      const certificates = await getAllCertificatesRequests();
      const pendingLeaves = leaves.filter((l) => l.status === "pending").length;
      const adminApproved = await getSuperAdminLeaves();
      setapprovedByDepartmentalAdmin(adminApproved.length);
      const approvedLeaves = leaves.filter(
        (l) => l.status === "approved"
      ).length;
      const rejectedLeaves = leaves.filter(
        (l) => l.status === "rejected"
      ).length;
      const pendingCertificates = certificates.filter(
        (c) => c.status === "pending"
      ).length;
      const approvedCertificates = certificates.filter(
        (c) => c.status === "approved"
      ).length;
      const rejectedCertificates = certificates.filter(
        (c) => c.status === "rejected"
      ).length;
      const departmentalLeaves = await getDepartmentalAdminLeave();
      const pendingDepartmentalLeaves = departmentalLeaves.filter(
        (l) => l.status === "pending"
      ).length;
      const approvedDepartmentalLeaves = departmentalLeaves.filter(
        (l) => l.status === "approved"
      ).length;
      const rejectedDepartmentalLeaves = departmentalLeaves.filter(
        (l) => l.status === "rejected"
      ).length;
      setpendingDepartmentalAdminLeave(pendingDepartmentalLeaves);
      setapprovedDepartmentalAdminLeave(approvedDepartmentalLeaves);
      setrejectedDepartmentalAdminLeave(rejectedDepartmentalLeaves);
      setNotifications(
        pendingLeaves + pendingCertificates + pendingDepartmentalLeaves
      );
      setTotalPendingLeaves(pendingLeaves);
      setTotalApprovedLeaves(approvedLeaves);
      setTotalRejectedLeaves(rejectedLeaves);
      setTotalPendingCertificates(pendingCertificates);
      setTotalApprovedCertificates(approvedCertificates);
      setTotalRejectedCertificates(rejectedCertificates);
    }

    if (role === "Faculty") {
      const leaves = await getAllLeaves();
      const certificates = await getAllCertificatesRequests();
      const pendingLeaves = leaves.filter((l) => l.status === "pending").length;
      const approvedLeaves = leaves.filter(
        (l) => l.status === "approved"
      ).length;
      const rejectedLeaves = leaves.filter(
        (l) => l.status === "rejected"
      ).length;
      const pendingCertificates = certificates.filter(
        (c) => c.status === "pending"
      ).length;
      const approvedCertificates = certificates.filter(
        (c) => c.status === "approved"
      ).length;
      const rejectedCertificates = certificates.filter(
        (c) => c.status === "rejected"
      ).length;
      setNotifications(pendingLeaves + pendingCertificates);
      setTotalPendingLeaves(pendingLeaves);
      setTotalApprovedLeaves(approvedLeaves);
      setTotalRejectedLeaves(rejectedLeaves);
      setTotalPendingCertificates(pendingCertificates);
      setTotalApprovedCertificates(approvedCertificates);
      setTotalRejectedCertificates(rejectedCertificates);
    }

    if (role === "Departmental Admin") {
      const leaves = await getAllLeaves();
      const certificates = await getAllCertificatesRequests();
      const approvedByFaculty = await getLeavesForDepartmentalAdmin();
      setLeavesForDepartmentalAdmin(approvedByFaculty.length);
      const pendingLeaves = leaves.filter((l) => l.status === "pending").length;
      const approvedLeaves = leaves.filter(
        (l) => l.status === "approved"
      ).length;
      const rejectedLeaves = leaves.filter(
        (l) => l.status === "rejected"
      ).length;
      const pendingCertificates = certificates.filter(
        (c) => c.status === "pending"
      ).length;
      const approvedCertificates = certificates.filter(
        (c) => c.status === "approved"
      ).length;
      const rejectedCertificates = certificates.filter(
        (c) => c.status === "rejected"
      ).length;
      const facultyleaves = await getFacultyLeaves();
      const pendingFacultyLeaves = facultyleaves.filter(
        (l) => l.status === "pending"
      ).length;
      const approvedFLeaves = facultyleaves.filter(
        (l) => l.status === "approved"
      ).length;
      const rejectedFLeaves = facultyleaves.filter(
        (l) => l.status === "rejected"
      ).length;
      setFacultyLeaves(pendingFacultyLeaves);
      setApprovedFacultyLeaves(approvedFLeaves);
      setRejectedFacultyLeaves(rejectedFLeaves);
      setTotalPendingLeaves(pendingLeaves);
      setTotalApprovedLeaves(approvedLeaves);
      setTotalRejectedLeaves(rejectedLeaves);
      setTotalPendingCertificates(pendingCertificates);
      setTotalApprovedCertificates(approvedCertificates);
      setTotalRejectedCertificates(rejectedCertificates);
      setNotifications(
        pendingLeaves + pendingCertificates + pendingFacultyLeaves
      );
    }
    const leaves = await getAllLeaves();
    const certificates = await getAllCertificatesRequests();

    setTotalLeaves(leaves.length);
    setTotalCertificates(certificates.length);

    if (leaves && Array.isArray(leaves)) {
      setTotalLeaves(leaves.length);
    }
  };
  const fetchTotalStudents = async () => {
    const students = await getStudents();
    if (students && Array.isArray(students)) {
      setTotalStudents(students.length);
    }
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

    if (supportingDocument) {
      formData.append("supportingDocument", supportingDocument);
    }

    try {
      const res = await submitAdminLeaveApplication(formData);
      setLoader(true);
      setLeaveRequest(false);

      if (res) {
        toast.success("Leave Application submitted successfully");
        setType("");
        setReason("");
        setSupportingDocument(null);

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (err) {
      console.error("Error submitting leave:", err);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full max-w-full mx-auto px-4 py-4 text-white relative">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center font-growmajour text-[22px] cursor-pointer">
            <img src={logo} alt="logo" className="w-[25px] h-[25px] mr-2" />
            <p>REQUESTA</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex flex-wrap justify-end gap-3 text-[#777777] font-mooxy text-[14px]">
          <Link to="/notificationsforadmin">
            <p className="bg-white text-black px-4 py-[6px] rounded-full cursor-pointer relative left-9">
              Notifications
            </p>
          </Link>
          <div className="w-[25px] h-[25px] bg-slate-500 rounded-full flex items-center justify-center relative top-6 left--5">
            <p className="text-white font-mooxy">{notifications}</p>
          </div>
          <Link to="/adminprofile">
            <p className="bg-[#191919] text-white px-4 py-[6px] rounded-full cursor-pointer">
              Profile
            </p>
          </Link>
          <Link to="/students">
            <p className="bg-white text-black px-4 py-[6px] rounded-full cursor-pointer">
              Students
            </p>
          </Link>
          {(role === "Departmental Admin" || role === "Super Admin") && (
            <Link to="/addadmin">
              <p className="bg-[#191919] text-white px-4 py-[6px] rounded-full cursor-pointer">
                Add an admin
              </p>
            </Link>
          )}
          {(role === "Departmental Admin" || role === "Super Admin") && (
            <Link to="/otherAdmins">
              <p className="bg-white text-black px-4 py-[6px] rounded-full cursor-pointer">
                Other Admins
              </p>
            </Link>
          )}
          {(role === "Faculty" || role === "Departmental Admin") && (
            <p
              className="bg-[#191919] text-white px-4 py-[6px] rounded-full cursor-pointer"
              onClick={handleClickOnApplyForLeave}
            >
              Apply for Leave
            </p>
          )}
          {(role === "Faculty" || role === "Departmental Admin") && (
            <Link to="/adminleaves">
              <p className="bg-white text-black px-4 py-[6px] rounded-full cursor-pointer">
                Leaves
              </p>
            </Link>
          )}
        </div>
        <div className="md:hidden">
          {menuOpen ? (
            <X size={28} className="cursor-pointer" onClick={() => setMenuOpen(false)} />
          ) : (
            <Menu size={28} className="cursor-pointer" onClick={() => setMenuOpen(true)} />
          )}
        </div>
      </div>
      <div
        className={`absolute top-full left-0 w-full bg-[#111] flex flex-col items-center gap-4 py-6 shadow-lg transition-all duration-300 ease-in-out md:hidden z-50 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible -translate-y-2"
        }`}
      >
        <Link to="/notificationsforadmin" onClick={() => setMenuOpen(false)}>
          <p className="bg-white text-black px-4 py-[6px] rounded-full">Notifications ({notifications})</p>
        </Link>
        <Link to="/adminprofile" onClick={() => setMenuOpen(false)}>
          <p className="bg-[#191919] text-white px-4 py-[6px] rounded-full">Profile</p>
        </Link>
        <Link to="/students" onClick={() => setMenuOpen(false)}>
          <p className="bg-white text-black px-4 py-[6px] rounded-full">Students</p>
        </Link>
        {(role === "Departmental Admin" || role === "Super Admin") && (
          <Link to="/addadmin" onClick={() => setMenuOpen(false)}>
            <p className="bg-[#191919] text-white px-4 py-[6px] rounded-full">Add an admin</p>
          </Link>
        )}
        {(role === "Departmental Admin" || role === "Super Admin") && (
          <Link to="/otherAdmins" onClick={() => setMenuOpen(false)}>
            <p className="bg-white text-black px-4 py-[6px] rounded-full">Other Admins</p>
          </Link>
        )}
        {(role === "Faculty" || role === "Departmental Admin") && (
          <p
            className="bg-[#191919] text-white px-4 py-[6px] rounded-full cursor-pointer"
            onClick={() => {
              handleClickOnApplyForLeave();
              setMenuOpen(false);
            }}
          >
            Apply for Leave
          </p>
        )}
        {(role === "Faculty" || role === "Departmental Admin") && (
          <Link to="/adminleaves" onClick={() => setMenuOpen(false)}>
            <p className="bg-white text-black px-4 py-[6px] rounded-full">Leaves</p>
          </Link>
        )}
      </div>
    </div>

      {home && (
        <>
          <div className="w-full max-w-[960px] mx-auto px-4 flex flex-col items-center justify-center text-center py-10">
            <div className="text-white text-3xl sm:text-4xl md:text-5xl font-growmajour">
              Welcome, {adminName}
            </div>
            <div className="text-[#777777] text-2xl sm:text-3xl md:text-4xl font-radonregular mb-5">
              {role}
            </div>
            <div className="text-[#777777] text-2xl sm:text-3xl md:text-4xl font-radonregular mb-5">
              Manage Leaves & Requests
            </div>

            <div className="flex justify-center items-center gap-5">
              <Link to="/notificationsAndrequests">
                <button className="bg-white w-[200px] sm:w-[220px] h-[36px] rounded-full text-[14px] sm:text-[15px] text-center cursor-pointer">
                  Notifications & Requests
                </button>
              </Link>
            </div>
          </div>

          <div className="max-w-[1200px] w-full mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 py-10 font-mooxy">
            {[
              {
                value: totalStudents,
                label: "Total Students",
                link: "/students",
                to: "",
              },
              {
                value: totalLeaves,
                label: "Total Leave Requests",
                link: "/notificationsAndrequests",
                to: "",
              },
              {
                value: totalPendingLeaves,
                label: "Pending Leave Requests",
                link: "/notificationsAndrequests",
                to: "pending-leaves",
              },
              {
                value: totalApprovedLeaves,
                label: "Accepted Leave Requests",
                link: "/notificationsAndrequests",
                to: "accepted-leaves",
              },
              {
                value: totalRejectedLeaves,
                label: "Rejected Leave Requests",
                link: "/notificationsAndrequests",
                to: "rejected-leaves",
              },
              {
                value: totalCertificates,
                label: "Total Certificate Requests",
                link: "/notificationsAndrequests",
                to: "pending-certificates",
              },
              {
                value: totalPendingCertificates,
                label: "Pending Certificates Requests",
                link: "/notificationsAndrequests",
                to: "pending-certificates",
              },
              {
                value: totalApprovedCertificates,
                label: "Approved Certificates Requests",
                link: "/notificationsAndrequests",
                to: "approved-certificates",
              },
              {
                value: totalRejectedCertificates,
                label: "Rejected Certificates Requests",
                link: "/notificationsAndrequests",
                to: "rejected-certificates",
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                onClick={() =>
                  navigate(stat.link, { state: { target: stat.to } })
                }
                whileHover={{ scale: 1.07 }}
                whil={{ scale: 0.95 }}
                className="bg-gradient-to-b from-[#1E1E1E] to-[#151515] rounded-2xl px-6 py-8 shadow-lg border border-gray-800 
                 hover:border-gray-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl cursor-pointer"
              >
                <h3 className="text-5xl font-bold text-white tracking-tight">
                  {stat.value}
                </h3>
                <div className="h-[2px] w-10 bg-gradient-to-r from-gray-500 to-transparent my-4 mx-auto"></div>
                <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                  {stat.label}
                </p>
              </motion.div>
            ))}
            {role === "Departmental Admin" && (
              <motion.div
                onClick={() =>
                  navigate("/notificationsAndrequests", {
                    state: { target: "dept-leaves" },
                  })
                }
                whileHover={{ scale: 1.07 }}
                whil={{ scale: 0.95 }}
                className="bg-gradient-to-b from-[#1E1E1E] to-[#151515] rounded-2xl px-6 py-8 shadow-lg border border-gray-800 
                 hover:border-gray-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl cursor-pointer"
              >
                <h3 className="text-5xl font-bold text-white tracking-tight">
                  {leavesForDepartmentalAdmin}
                </h3>
                <div className="h-[2px] w-10 bg-gradient-to-r from-gray-500 to-transparent my-4 mx-auto"></div>
                <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                  Leave Requests Approved by Faculty
                </p>
              </motion.div>
            )}
            {role === "Super Admin" && (
              <motion.div
                onClick={() =>
                  navigate("/notificationsAndrequests", {
                    state: { target: "dept-leaves" },
                  })
                }
                whileHover={{ scale: 1.07 }}
                whil={{ scale: 0.95 }}
                className="bg-gradient-to-b from-[#1E1E1E] to-[#151515] rounded-2xl px-6 py-8 shadow-lg border border-gray-800 
                 hover:border-gray-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl cursor-pointer"
              >
                <h3 className="text-5xl font-bold text-white tracking-tight">
                  {approvedByDepartmentalAdmin}
                </h3>
                <div className="h-[2px] w-10 bg-gradient-to-r from-gray-500 to-transparent my-4 mx-auto"></div>
                <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                  Leave Requests Approved by the Departmemtal Admin
                </p>
              </motion.div>
            )}
            {role === "Departmental Admin" && (
              <motion.div
                onClick={() =>
                  navigate("/notificationsAndrequests", {
                    state: { target: "dept-leaves" },
                  })
                }
                whileHover={{ scale: 1.07 }}
                whil={{ scale: 0.95 }}
                className="bg-gradient-to-b from-[#1E1E1E] to-[#151515] rounded-2xl px-6 py-8 shadow-lg border border-gray-800 
                 hover:border-gray-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl cursor-pointer"
              >
                <h3 className="text-5xl font-bold text-white tracking-tight">
                  {facultyLeaves}
                </h3>
                <div className="h-[2px] w-10 bg-gradient-to-r from-gray-500 to-transparent my-4 mx-auto"></div>
                <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                  Pending Leave Requests of Faculty
                </p>
              </motion.div>
            )}
            {role === "Departmental Admin" && (
              <motion.div
                onClick={() =>
                  navigate("/notificationsAndrequests", {
                    state: { target: "faculty-approved-leaves" },
                  })
                }
                whileHover={{ scale: 1.07 }}
                whil={{ scale: 0.95 }}
                className="bg-gradient-to-b from-[#1E1E1E] to-[#151515] rounded-2xl px-6 py-8 shadow-lg border border-gray-800 
                 hover:border-gray-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl cursor-pointer"
              >
                <h3 className="text-5xl font-bold text-white tracking-tight">
                  {approvedFacultyLeaves}
                </h3>
                <div className="h-[2px] w-10 bg-gradient-to-r from-gray-500 to-transparent my-4 mx-auto"></div>
                <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                  Approved Leave Requests of Faculty
                </p>
              </motion.div>
            )}
            {role === "Departmental Admin" && (
              <motion.div
                onClick={() =>
                  navigate("/notificationsAndrequests", {
                    state: { target: "faculty-rejected-leaves" },
                  })
                }
                whileHover={{ scale: 1.07 }}
                whil={{ scale: 0.95 }}
                className="bg-gradient-to-b from-[#1E1E1E] to-[#151515] rounded-2xl px-6 py-8 shadow-lg border border-gray-800 
                 hover:border-gray-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl cursor-pointer"
              >
                <h3 className="text-5xl font-bold text-white tracking-tight">
                  {rejectedFacultyLeaves}
                </h3>
                <div className="h-[2px] w-10 bg-gradient-to-r from-gray-500 to-transparent my-4 mx-auto"></div>
                <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                  Rejected Leave Requests of Faculty
                </p>
              </motion.div>
            )}
            {role === "Super Admin" && (
              <motion.div
                onClick={() =>
                  navigate("/notificationsAndrequests", {
                    state: { target: "pending-dept-leaves" },
                  })
                }
                whileHover={{ scale: 1.07 }}
                whil={{ scale: 0.95 }}
                className="bg-gradient-to-b from-[#1E1E1E] to-[#151515] rounded-2xl px-6 py-8 shadow-lg border border-gray-800 
                 hover:border-gray-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl cursor-pointer"
              >
                <h3 className="text-5xl font-bold text-white tracking-tight">
                  {pendingdepartmentalAdminLeave}
                </h3>
                <div className="h-[2px] w-10 bg-gradient-to-r from-gray-500 to-transparent my-4 mx-auto"></div>
                <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                  Pending Leave Requests of Departmental Admins
                </p>
              </motion.div>
            )}
            {role === "Super Admin" && (
              <motion.div
                onClick={() =>
                  navigate("/notificationsAndrequests", {
                    state: { target: "accepted-dept-leaves" },
                  })
                }
                whileHover={{ scale: 1.07 }}
                whil={{ scale: 0.95 }}
                className="bg-gradient-to-b from-[#1E1E1E] to-[#151515] rounded-2xl px-6 py-8 shadow-lg border border-gray-800 
                 hover:border-gray-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl cursor-pointer"
              >
                <h3 className="text-5xl font-bold text-white tracking-tight">
                  {approveddepartmentalAdminLeave}
                </h3>
                <div className="h-[2px] w-10 bg-gradient-to-r from-gray-500 to-transparent my-4 mx-auto"></div>
                <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                  Approved Leave Requests of Departmental Admins
                </p>
              </motion.div>
            )}
            {role === "Super Admin" && (
              <motion.div
                onClick={() =>
                  navigate("/notificationsAndrequests", {
                    state: { target: "rejected-dept-leaves" },
                  })
                }
                whileHover={{ scale: 1.07 }}
                whil={{ scale: 0.95 }}
                className="bg-gradient-to-b from-[#1E1E1E] to-[#151515] rounded-2xl px-6 py-8 shadow-lg border border-gray-800 
                 hover:border-gray-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl cursor-pointer"
              >
                <h3 className="text-5xl font-bold text-white tracking-tight">
                  {rejecteddepartmentalAdminLeave}
                </h3>
                <div className="h-[2px] w-10 bg-gradient-to-r from-gray-500 to-transparent my-4 mx-auto"></div>
                <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                  Rejected Leave Requests of Departmental Admins
                </p>
              </motion.div>
            )}
          </div>
        </>
      )}
      {leaveRequest && (
        <div className="min-h-screen bg-[#0D0D0D] text-white px-4 sm:px-6 py-12 flex flex-col gap-12 items-center font-sans">
          <div className="bg-[#1A1A1A] p-6 sm:p-8 rounded-2xl w-full max-w-xl shadow-xl">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center font-radonregular">
              Leave Application
            </h2>
            <form
              className="flex flex-col gap-4 font-mooxy"
              encType="multipart/form-data"
            >
              <label className="text-sm font-medium">
                Type of Leave:
                <select
                  className="mt-1 p-3 w-full rounded-lg bg-[#2A2A2A] text-white"
                  required
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="">-- Select Leave Type --</option>
                  <option value="Medical Leave">Medical Leave</option>
                  <option value="Official Leave">Official Leave</option>
                  <option value="Casual Leave">Casual Leave</option>
                </select>
              </label>
              <label className="text-sm font-medium">
                Reason for Leave:
                <textarea
                  className="mt-1 p-3 w-full h-28 rounded-lg bg-[#2A2A2A] text-white focus:outline-none"
                  placeholder="Explain your reason for leave..."
                  required
                  onChange={(e) => setReason(e.target.value)}
                />
              </label>
              <label className="text-sm font-medium">
                Upload Supporting Document(Upload an Image):
                <input
                  type="file"
                  className="mt-1 bg-[#2A2A2A] text-white p-2 rounded-lg w-full"
                  onChange={(e) => setSupportingDocument(e.target.files[0])}
                />
              </label>
              <label className="text-sm font-medium">
                From Date:
                <input
                  type="date"
                  className="mt-1 bg-[#2A2A2A] text-white p-2 rounded-lg w-full"
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </label>
              <label className="text-sm font-medium">
                To Date:
                <input
                  type="date"
                  className="mt-1 bg-[#2A2A2A] text-white p-2 rounded-lg w-full"
                  onChange={(e) => setToDate(e.target.value)}
                />
              </label>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 font-radonregular transition-all text-white font-semibold py-2 px-4 rounded-lg mt-4"
                onClick={handleClickOnLeaveSubmit}
              >
                Submit Leave Request
              </button>
            </form>
          </div>
        </div>
      )}
      {loader && <Loader />}
    </>
  );
}
