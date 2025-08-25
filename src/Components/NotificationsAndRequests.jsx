import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { getAllLeaves } from "../utils/GETAllLeaves";
import { updateLeaveStatus } from "../utils/UpdateLeaveStatus";
import { getAllCertificatesRequests } from "../utils/GETAllCertificateRequests";
import { updateCertificateStatus } from "../utils/UPDATECertificateStatus";
import { ToastContainer, toast } from "react-toastify";
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

      // Try immediately
      if (!scrollToSection()) {
        // Retry until found (e.g., data fetched and section appears)
        const interval = setInterval(() => {
          if (scrollToSection()) clearInterval(interval);
        }, 100);
        setTimeout(() => clearInterval(interval), 3000); // stop after 3s
      }
    }
  }, [location]);
  const navigate = useNavigate();
  const [pendingleaves, setPendingLeaves] = useState([]);
  const [acceptedLeaves, setAcceptedLeaves] = useState([]);
  const [rejectedLeaves, setRejectedLeaves] = useState([]);
  const [pendingCertificates, setPendingCertificates] = useState([]);
  const [acceptedCertificates, setAcceptedCertificates] = useState([]);
  const [rejectedCertificates, setRejectedCertificates] = useState([]);
  const [supportingDocument, setSupportingDocument] = useState([]);
  const [remarkBox, setRemarkBox] = useState(null);
  const [remark, setRemark] = useState({});
  const [confirm, setConfirm] = useState(false);
  function handleClickOnConfirm() {
    console.log(remark);
    setTimeout(() => {
      window.location.reload();
    }, 4000);
  }

  // Fetch all leaves once on mount
  useEffect(() => {
    const fetchLeaves = async () => {
      const res = await getAllLeaves();
      if (res) {
        setPendingLeaves(res.filter((leave) => leave.status === "pending"));
        setAcceptedLeaves(res.filter((leave) => leave.status === "approved"));
        setRejectedLeaves(res.filter((leave) => leave.status === "rejected"));
        setSupportingDocument(res.supportingDocument);
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

  // Optimistic Accept
  const handleClickOnAccept = (leaveId) => {
    // Update UI instantly
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

    // Update backend
    updateLeaveStatus(leaveId, "approved", remark[leaveId]).catch(() => {
      // rollback if API fails
      setPendingLeaves((prev) =>
        prev.map((l) => (l._id === leaveId ? { ...l, status: "pending" } : l))
      );
    });
  };

  // Optimistic Reject
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
    // Update UI instantly
    setPendingCertificates((prev) =>
      prev.map((c) => (c._id === certId ? { ...c, status: "approved" } : c))
    );
    setConfirm(confirm === certId ? null : certId);

    // Update backend
    updateCertificateStatus(certId, "approved", remark[certId]).catch(() => {
      // rollback if API fails
      setPendingCertificates((prev) =>
        prev.map((c) => (c._id === certId ? { ...c, status: "pending" } : c))
      );
    });
  };
  const handleClickOnRejectCertificate = (certId) => {
    if (!remark[certId]) {
      toast.error("Enter the remark first!!!");
      return;
    }
    // Update UI instantly
    setPendingCertificates((prev) =>
      prev.map((c) =>
        c._id === certId
          ? { ...c, status: "rejected", remark: remark[certId] }
          : c
      )
    );

    setConfirm(confirm === certId ? null : certId);

    // Update backend
    updateCertificateStatus(certId, "rejected", remark[certId]).catch(() => {
      // rollback if API fails
      setPendingCertificates((prev) =>
        prev.map((c) =>
          c._id === certId
            ? { ...c, status: "pending", remark: remark[certId] }
            : c
        )
      );
    });
  };

  return (
    <>
      {/* Header */}
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-[100%]  h-[64px] mx-4 sticky top-0 z-10 flex items-center justify-between px-4 text-white backdrop-blur-xl">
        <Link to="/">
          <motion.div
            className="flex items-center font-growmajour text-[22px] cursor-pointer"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              type: "spring",
              stiffness: 100,
              duration: 5,
              ease: "easeInOut",
            }}
          >
            <img src={logo} alt="logo" className="w-[25px] h-[25px] mr-2" />
            <p>REQUESTA</p>
          </motion.div>
        </Link>

        <Link to="/admindashboard">
          <div className="flex items-center gap-4 text-[#777777] font-mooxy text-[15px]">
            <p className="bg-white text-black px-4 py-[6px] rounded-full cursor-pointer">
              Back to Dashboard
            </p>
          </div>
        </Link>
      </div>

      {/* Leaves Section */}
      <div>
        <h2 className="text-[#999999] font-radonregular underline text-[42px] mt-10 mb-4 text-left mx-5">
          All Leave Requests
        </h2>
        <div className="max-w-[960px] min-w-[95%] h-auto mt-7 mb-10 mx-5">
          <h2 className="text-white font-growmajour text-[28px] mb-4">
            Pending Leave Requests
          </h2>

          {pendingleaves.length > 0 ? (
            <div className="flex flex-col gap-4" id="pending-leaves">
              {pendingleaves.map((l) => (
                <div
                  key={l._id || l.studentId._id}
                  className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center  transition-colors duration-300"
                >
                  <div>
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
                        className={`ml-1 ${
                          l.status === "approved"
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
                      <div className="w-[600px] h-auto flex items-center justify-center">
                        <p className="text-white font-radonregular w-full text-justify mt-2">
                          <span>Supporting Document:</span>
                        </p>

                        <div className="w-[600px] h-[30px] bg-slate-100 rounded-[20px] flex items-center justify-center relative right-34">
                          <a
                            href={l.supportingDocument}
                            target="_blank"
                            className="font-mooxy text-center"
                            rel="noopener noreferrer"
                          >
                            View Supporting Document
                          </a>
                        </div>
                      </div>
                    )}
                    <div>
                      <div>
                        {/* Show Remark Input */}
                        {remarkBox === l._id && (
                          <div className="w-[960px] h-auto mt-5">
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
                              className="w-[960px] h-[50px] border text-white rounded-[20px] mt-2 p-3 font-mooxy outline-none"
                            />
                          </div>
                        )}

                        {/* Button to open Remark Box */}
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
                        {confirm === l._id && (
                          <div
                            className="w-[150px] h-[30px] bg-white mt-5 rounded-[20px] flex justify-center self-center"
                            onClick={handleClickOnConfirm}
                          >
                            {" "}
                            <p className="font-mooxy mt-1">Confirm</p>{" "}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Accept / Reject Buttons */}
                  <div className="w-[150px] h-[150px] flex flex-col justify-evenly gap-2">
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
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No leave applications found.</p>
          )}
        </div>
        <div className="max-w-[960px] min-w-[95%] h-auto  mt-7 mb-10 mx-5">
          <h2 className="text-white font-growmajour text-[28px] mb-4">
            Accepted Leave Requests
          </h2>

          {acceptedLeaves.length > 0 ? (
            <div className="flex flex-col gap-4" id="accepted-leaves">
              {acceptedLeaves.map((l) => (
                <div
                  key={l._id || l.studentId._id}
                  className="bg-gray-800 p-4 rounded-lg shadow-md  justify-between items-center transition-colors duration-300 "
                >
                  <div>
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
                    <p className="text-gray-300 font-radonregular">
                      <span className="text-gray-200 font-bold">Subject:</span>{" "}
                      {l.subject}
                    </p>
                    <p className="text-gray-30 text-justify">
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
                        className={`ml-1 ${
                          l.status === "approved"
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
        <div className="max-w-[960px] min-w-[95%] h-auto mt-7 mb-10 mx-5">
          <h2 className="text-white font-growmajour text-[28px] mb-4">
            Rejected Leave Requests
          </h2>

          {rejectedLeaves.length > 0 ? (
            <div className="flex flex-col gap-4" id="rejected-leaves">
              {rejectedLeaves.map((l) => (
                <div
                  key={l._id || l.studentId._id}
                  className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center hover:bg-gray-700 transition-colors duration-300"
                >
                  <div>
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
                      <span className="text-gray-200 font-radonregular font-bold">
                        Reason:
                      </span>{" "}
                      <span className="font-mooxy font-regular">
                        {l.Reason}
                      </span>
                    </p>
                    <p className="text-gray-300 text-sm">
                      Status:{" "}
                      <span
                        className={`ml-1 ${
                          l.status === "approved"
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
      <div id="certificates-section">
        <h2 className="text-[#999999] text-[42px] font-radonregular underline text-[28px] mt-50 mb-4 text-left mx-5">
          All Certificate Requests
        </h2>
        <div className="max-w-[960px] min-w-[95%] h-auto mt-7 mb-10 mx-5">
          <h2 className="text-white font-growmajour text-[28px] mb-4">
            Pending Certificate Requests
          </h2>

          {pendingCertificates.length > 0 ? (
            <div className="flex flex-col gap-4" id="pending-certificates">
              {pendingCertificates.map((l) => (
                <div
                  key={l._id || l.student._id}
                  className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-start hover:bg-gray-700 transition-colors duration-300"
                >
                  {/* Left: Certificate Info */}
                  <div className="flex-1">
                    <p className="text-gray-300">
                      <span className="text-gray-200 font-bold font-radonregular">
                        Registration Number:
                      </span>{" "}
                      {l.student?.registrationNumber || "N/A"}
                    </p>
                    <p className="text-gray-300">
                      <span className="text-gray-200 font-bold font-radonregular">
                        Name:
                      </span>{" "}
                      {l.student?.name || "N/A"}
                    </p>
                    <p className="text-gray-300">
                      <span className="text-gray-200 font-bold font-radonregular">
                        Purpose:
                      </span>{" "}
                      {l.purpose}
                    </p>
                    <p className="text-gray-300 text-justify">
                      <span className="text-gray-200 font-bold font-radonregular">
                        Certificate Type:
                      </span>{" "}
                      {l.CertificateType}
                    </p>
                    <p className="text-gray-300 text-sm">
                      Status:{" "}
                      <span
                        className={`ml-1 ${
                          l.status === "approved"
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
                      <div className="mt-2 flex">
                        <p className="text-white font-radonregular">
                          Supporting Document:
                        </p>
                        <div className="w-[600px] h-[30px] bg-slate-100 rounded-[20px] flex items-center justify-center">
                          <a
                            href={l.supportingDocument}
                            target="_blank"
                            className="font-mooxy text-center"
                            rel="noopener noreferrer"
                          >
                            View Supporting Document
                          </a>
                        </div>
                      </div>
                    )}

                    {/* ✅ Remark Section at the Bottom */}
                    {remarkBox === l._id && (
                      <div className="w-[600px] h-auto mt-5">
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
                          className="w-[600px] h-[50px] border text-white rounded-[20px] mt-2 p-3 font-mooxy outline-none"
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

                    {confirm === l._id && (
                      <div
                        className="w-[150px] h-[30px] bg-white mt-3 rounded-[20px] flex justify-center items-center cursor-pointer"
                        onClick={handleClickOnConfirm}
                      >
                        <p className="font-mooxy">Confirm</p>
                      </div>
                    )}
                  </div>

                  {/* Right: Action Buttons */}
                  <div className="w-[150px] flex flex-col gap-2">
                    <div
                      className="w-full h-[30px] bg-green-500 hover:bg-green-600 rounded-[10px] cursor-pointer"
                      onClick={() => handleClickOnAcceptCertificate(l._id)}
                    >
                      <p className="text-center text-white font-mooxy mt-1">
                        Accept
                      </p>
                    </div>
                    <div
                      className="w-full h-[30px] bg-red-500 hover:bg-red-600 rounded-[10px] cursor-pointer"
                      onClick={() => handleClickOnRejectCertificate(l._id)}
                    >
                      <p className="text-center text-white font-mooxy mt-1">
                        Reject
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No certificate applications found.</p>
          )}
        </div>
        <div className="max-w-[960px] min-w-[95%] h-auto  mt-7 mb-10 mx-5">
          <h2 className="text-white font-growmajour text-[28px] mb-4">
            Accepted Certificate Requests
          </h2>

          {acceptedCertificates.length > 0 ? (
            <div className="flex flex-col gap-4" id="approved-certificates">
              {acceptedCertificates.map((l) => (
                <div
                  key={l._id || l.student._id}
                  className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center hover:bg-gray-700 transition-colors duration-300"
                >
                  <div>
                    <p className="text-gray-300">
                      <span className="text-gray-200 font-bold font-radonregular">
                        Registration Number:
                      </span>{" "}
                      {l.student?.registrationNumber || "N/A"}
                    </p>
                    <p className="text-gray-300">
                      <span className="text-gray-200 font-bold font-radonregular">
                        Name:
                      </span>{" "}
                      {l.student?.name || "N/A"}
                    </p>
                    <p className="text-gray-300">
                      <span className="text-gray-200 font-bold font-radonregular">
                        Purpose:
                      </span>{" "}
                      {l.purpose}
                    </p>
                    <p className="text-gray-300 text-justify">
                      <span className="text-gray-200 font-bold font-radonregular">
                        Certificate Type:
                      </span>{" "}
                      {l.CertificateType}
                    </p>
                    <p className="text-gray-300 text-sm">
                      Status:{" "}
                      <span
                        className={`ml-1 ${
                          l.status === "approved"
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
        <div className="max-w-[960px] min-w-[95%] h-auto mt-7 mb-10 mx-5">
          <h2 className="text-white font-growmajour text-[28px] mb-4">
            Rejected Certificate Requests
          </h2>

          {rejectedCertificates.length > 0 ? (
            <div className="flex flex-col gap-4" id="rejected-certificates">
              {rejectedCertificates.map((l) => (
                <div
                  key={l._id || l.student._id}
                  className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center hover:bg-gray-700 transition-colors duration-300"
                >
                  <div>
                    <p className="text-gray-300">
                      <span className="text-gray-200 font-bold font-radonregular">
                        Registration Number:
                      </span>{" "}
                      {l.student?.registrationNumber || "N/A"}
                    </p>
                    <p className="text-gray-300">
                      <span className="text-gray-200 font-bold font-radonregular">
                        Name:
                      </span>{" "}
                      {l.student?.name || "N/A"}
                    </p>
                    <p className="text-gray-300 ">
                      <span className="text-gray-200 font-bold font-radonregular">
                        Purpose:
                      </span>{" "}
                      {l.purpose}
                    </p>
                    <p className="text-gray-300 text-justify">
                      <span className="text-gray-200 font-bold font-radonregular">
                        Certificate Type:
                      </span>{" "}
                      {l.CertificateType}
                    </p>
                    <p className="text-gray-300 text-sm">
                      Status:{" "}
                      <span
                        className={`ml-1 ${
                          l.status === "approved"
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

      <Footer />
    </>
  );
};
