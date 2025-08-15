import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";
import { getAdminDashboard } from "../utils/GETAdminDashBoard";
import { getAllLeaves } from "../utils/GETAllLeaves";
import { getStudents } from "../utils/GETAllStudents";
import { getAllCertificatesRequests } from "../utils/GETAllCertificateRequests";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { set } from "mongoose";

export default function AdminDashboard() {
  const [adminName, setAdminName] = useState("");
  const [totalLeaves, setTotalLeaves] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalCertificates, setTotalCertificates] = useState(0);
  const [totalPendingLeaves, setTotalPendingLeaves] = useState(0);
  const [totalApprovedLeaves, setTotalApprovedLeaves] = useState(0);
  const [totalRejectedLeaves, setTotalRejectedLeaves] = useState(0);
  const [totalPendingCertificates, setTotalPendingCertificates] = useState(0);
  const [totalApprovedCertificates, setTotalApprovedCertificates] = useState(0);
  const [totalRejectedCertificates, setTotalRejectedCertificates] = useState(0);
  const getAdminData = async () => {
    const currentAdmin = await getAdminDashboard();
    return currentAdmin;
  };
  useEffect(() => {
    const fetchData = async () => {
      const admin = await getAdminData();
      if (admin && admin.name) {
        setAdminName(admin.name);
      }
    };
    fetchData();
  }, [adminName]);

  const fetchTotalLeaves = async () => {
    const leaves = await getAllLeaves();
    const certificates = await getAllCertificatesRequests();
    const pendingLeaves = leaves.filter((l) => l.status === "pending").length;  
    const approvedLeaves = leaves.filter((l) => l.status === "approved").length;
    const rejectedLeaves = leaves.filter((l) => l.status === "rejected").length;
    const pendingCertificates = certificates.filter((c) => c.status === "pending").length;
    const approvedCertificates = certificates.filter((c) => c.status === "approved").length;
    const rejectedCertificates = certificates.filter((c) => c.status === "rejected").length;
    setTotalPendingLeaves(pendingLeaves);
    setTotalApprovedLeaves(approvedLeaves);
    setTotalRejectedLeaves(rejectedLeaves);
    setTotalLeaves(leaves.length);
    setTotalCertificates(certificates.length);
    setTotalPendingCertificates(pendingCertificates);
    setTotalApprovedCertificates(approvedCertificates);
    setTotalRejectedCertificates(rejectedCertificates);
    
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
  }, []);

  return (
    <>
      {/* Header */}
      <div className="w-full max-w-[960px] mx-auto flex flex-col sm:flex-row items-center justify-between px-4 py-4 text-white">
        {/* Logo & Title */}
        <Link to="/">
          <div className="flex items-center font-growmajour text-[22px] cursor-pointer mb-2 sm:mb-0">
            <img src={logo} alt="logo" className="w-[25px] h-[25px] mr-2" />
            <p>REQUESTA</p>
          </div>
        </Link>

        {/* Nav Links */}
        <div className="flex flex-wrap justify-center sm:justify-end gap-3 text-[#777777] font-mooxy text-[14px]">
          <p className="bg-white text-black px-4 py-[6px] rounded-full cursor-pointer">
            Notifications
          </p>
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
          <Link to="/addadmin">
            <p className="bg-[#191919] text-white px-4 py-[6px] rounded-full cursor-pointer">
              Add an admin
            </p>
          </Link>
        </div>
      </div>

      {/* Tagline */}
      <div className="w-full max-w-[960px] mx-auto px-4 flex flex-col items-center justify-center text-center py-10">
        <div className="text-white text-3xl sm:text-4xl md:text-5xl font-growmajour mb-2">
          Welcome, {adminName}
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

      {/* Stats Section */}
      <div className="max-w-[1200px] w-full mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 py-10 font-mooxy">
        {[
          { value: totalStudents, label: "Total Students" },
          { value: totalLeaves, label: "Total Leave Requests" },
          { value: totalPendingLeaves, label: "Total Pending Requests" },
          { value: totalApprovedLeaves, label: "Total Accepted Requests" },
          { value: totalRejectedLeaves, label: "Total Rejected Requests" },
          { value: totalCertificates, label: "Total Certificate Requests" },
          { value: totalPendingCertificates, label: "Pending Certificates" },
          { value: totalApprovedCertificates, label: "Approved Certificates" },
          { value: totalRejectedCertificates, label: "Rejected Certificates" },
        ].map((stat, i) => (
          <motion.div
            key={i}
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
      </div>
    </>
  );
}
