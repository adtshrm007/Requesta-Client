import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "motion/react";
import { fetchCurrentStudent } from "../utils/GETStudentDashBoard";
import { submitLeaves } from "../utils/POSTLeaveApplication";
import { submitCertificate } from "../utils/POSTCertificateApplication";
import { useNavigate } from "react-router-dom";
import { getLeaves } from "../utils/GETLeavesForAStudent";
import { showAllCertificates } from "../utils/GETCertificatesForAStudent";
import Loader from "./Loader";
const StudentDashboard = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("Show More");
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
  const [documentURL, setDocumentURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [expandedLeave, setExpandedLeave] = useState(null);
  const [notifications, setNotifications] = useState(0);
  // Logic to handle click on "My Requests"
  function handleClickOnCreateRequest() {
    setHome(!home);
    setCreateRequest(!createRequests);
  }

  const getStudent = async () => {
    const currentLoggedIn = await fetchCurrentStudent();
    return currentLoggedIn;
  };

  useEffect(() => {
    const fetchData = async () => {
      const student = await getStudent();
      if (student && student._id) {
        setID(student._id);
      }
      if (student && student.name) {
        setName(student.name); // setName with actual value
      }
      if (student && student.registrationNumber) {
        setregNo(student.registrationNumber); // setName with actual value
      }
    };

    fetchData();
  }, [name]);
  const handleClickOnLeaveSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("Reason", reason);
    if (supportingDocument) {
      formData.append("supportingDocument", supportingDocument);
    }

    try {
      const res = await submitLeaves(formData);
      if (res.data) {
        toast.success("Leave submitted successfully");
        setSubject("");
        setReason("");
        setSupportingDocument(null);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (err) {
      console.error("Error submitting leave:", err);
      toast.error(err);
    }
  };

  async function handleClickOnCertificateSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData();
    form.append("purpose", purpose);
    form.append("CertificateType", certificateType);
    if (supportingDocument) {
      form.append("supportingDocument", supportingDocument);
    }
    try {
      const res = await submitCertificate(form);
      if (res.data) {
        toast.success("Certificate Submitted Successfully");
        setPurpose("");
        setCertificateType("");
        setSupportingDocument(null);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (err) {
      toast.error("Error Occured Submiting the application");
      console.error("Error submitting certificate:", err);
    }
  }
  const notification = async () => {
    const now = new Date();
    const oneDay = 1000 * 60 * 60 * 24;
    try {
      const [res1, res2] = await Promise.all([
        getLeaves(),
        showAllCertificates(),
      ]);

      const r1 = res1.filter(
        (i) =>
          (i.status === "approved" || i.status === "rejected") &&
          now - new Date(i.updatedAt) < oneDay
      );
      const r2 = res2.filter(
        (i) =>
          (i.status === "approved" || i.status === "rejected") &&
          now - new Date(i.updatedAt) < oneDay
      );

      const total = r1.length + r2.length;

      setNotifications(total > 0 ? total : 0);
      setLeave(res1);
      setCertificates(res2);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  useEffect(() => {
    notification();
  }, []);

  return (
    <>
      <>
        <ToastContainer position="top-right" autoClose={3000} />
        {/* Header */}
        <div className="w-full max-w-[960px] h-auto min-h-[64px] mx-auto flex flex-wrap items-center justify-between px-4 text-white gap-4">
          {/* Logo & Title */}

          <Link to="/">
            <motion.div
              className="flex items-center font-growmajour text-lg sm:text-xl md:text-[22px] cursor-pointer"
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
              <img
                src={logo}
                alt="logo"
                className="w-6 h-6 sm:w-[25px] sm:h-[25px] mr-2"
              />
              <p>REQUESTA</p>
            </motion.div>
          </Link>

          {/* Nav Links */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[#777777] font-mooxy text-sm sm:text-[15px]">
            <div className="flex flex-col mt-5">
              <Link to="/notifications">
                <p className="bg-white text-black px-3 sm:px-4 py-[6px] rounded-full cursor-pointer relative top-1">
                  Notifications
                </p>
              </Link>
              <div className="w-[30px] h-[30px] bg-slate-500 justify-self-end rounded-full relative left-22 bottom-3 flex items-center justify-center">
                <p className="text-white font-mooxy text-center mt-1">
                  {notifications}
                </p>
              </div>
            </div>
            <Link to="/studentprofile">
              <p className="bg-[#191919] text-white px-3 sm:px-4 py-[6px] rounded-full cursor-pointer">
                Profile
              </p>
            </Link>
            <p
              onClick={handleClickOnCreateRequest}
              className="bg-white text-black px-3 sm:px-4 py-[6px] rounded-full cursor-pointer"
            >
              Create Request
            </p>
          </div>
        </div>

        {home && (
          <>
            <div className="w-full max-w-[960px] mx-auto mt-6 px-4">
              <h1 className="text-white font-radonregular text-2xl sm:text-3xl md:text-4xl">
                Welcome {name}
              </h1>
              <h1 className="text-white font-radonregular text-lg sm:text-2xl md:text-3xl">
                Registration No. == {regnNo}
              </h1>
            </div>

            <div className="w-full max-w-[960px] mx-auto px-4 mt-4">
              <h2 className="text-[#777777] font-growmajour text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                STUDENT DASHBOARD
              </h2>
            </div>

            {/* Leave Requests */}
            <div className="w-full max-w-[960px] mx-auto px-4 mt-7 mb-10">
              <h2 className="text-white font-growmajour text-xl sm:text-2xl md:text-[28px] mb-4">
                My Leave Requests
              </h2>

              {leave.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {leave.map((l) => (
                    <div
                      key={l._id}
                      className="bg-slate-700 p-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                    >
                      <div className="flex-1">
                        <p className="text-white font-bold">
                          Subject:{" "}
                          <span className="text-black font-radonregular">
                            {l.subject}
                          </span>
                        </p>
                        <p className="text-gray-300 text-sm">
                          Status:
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
                          Applied On:{" "}
                          {new Date(l.createdAt).toLocaleDateString()}
                        </p>
                        {expandedLeave === l._id && (
                          <>
                            <p className="text-white font-ssold w-full text-justify mt-2">
                              <span>Reason:</span> <br />
                              <span className="text-[#0F0F0F]">{l.Reason}</span>
                            </p>

                            {l.supportingDocument && (
                              <div className="w-[600px] h-auto flex items-center justify-center">
                                <p className="text-white font-ssold w-full text-justify mt-2">
                                  <span>Supporting Document:</span>
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
                          </>
                        )}
                      </div>
                      <div
                        className="min-w-[100px] h-[30px] bg-slate-100 rounded-[10px] font-mooxy flex items-center justify-center cursor-pointer"
                        onClick={() =>
                          setExpandedLeave(
                            expandedLeave === l._id ? null : l._id
                          )
                        }
                      >
                        <p className="text-center">
                          {expandedLeave === l._id ? "Show Less" : "Show More"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No leave applications found.</p>
              )}
            </div>

            {/* Certificate Requests */}
            <div className="w-full max-w-[960px] mx-auto px-4 mt-7 mb-10">
              <h2 className="text-white font-growmajour text-xl sm:text-2xl md:text-[28px] mb-4">
                My Certificate Requests
              </h2>

              {certificates.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {certificates.map((c) => (
                    <div
                      key={c._id}
                      className="bg-slate-700 p-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                    >
                      <div className="flex-1">
                        <p className="text-white font-bold">
                          Purpose:{" "}
                          <span className="text-black font-radonregular">
                            {c.purpose}
                          </span>
                        </p>
                        <p className="text-gray-300 text-sm">
                          Status:
                          <span
                            className={`ml-1 ${
                              c.status === "approved"
                                ? "text-green-400"
                                : c.status === "rejected"
                                ? "text-red-400"
                                : "text-yellow-400"
                            }`}
                          >
                            {c.status}
                          </span>
                        </p>
                        <p className="text-gray-400 text-xs">
                          Applied On:{" "}
                          {new Date(c.createdAt).toLocaleDateString()}
                        </p>
                        {expandedLeave === c._id && (
                          <>
                            <p className="text-white font-ssold w-full text-justify mt-2">
                              <span>Reason:</span> <br />
                              <span className="text-[#0F0F0F]">
                                {c.CertificateType}
                              </span>
                            </p>
                            {c.supportingDocument && (
                              <div className="w-[600px] h-auto flex items-center justify-center">
                                <p className="text-white font-ssold w-full text-justify mt-2">
                                  <span>Supporting Document:</span>
                                </p>

                                <div className="w-[600px] h-[30px] bg-slate-100 rounded-[20px] flex items-center justify-center">
                                  <a
                                    href={c.supportingDocument}
                                    target="_blank"
                                    className="font-mooxy text-center"
                                    rel="noopener noreferrer"
                                  >
                                    View Supporting Document
                                  </a>
                                </div>
                                <div className="w-[500px] h-[30px] bg-slate-100 rounded-[20px] flex items-center justify-center mx-4">
                                  <a
                                    href={c.supportingDocument.replace(
                                      "/upload/",
                                      "/upload/fl_attachment/"
                                    )}
                                    target="_blank"
                                    className="font-mooxy text-center"
                                    rel="noopener noreferrer"
                                  >
                                    Download Document
                                  </a>
                                </div>
                              </div>
                            )}
                            {c.addCertificate && (
                              <div className="w-[600px] h-auto flex items-center justify-center">
                                <p className="text-white font-ssold w-full text-justify mt-2">
                                  <span>View & Download Certificate:</span>
                                </p>

                                <div className="w-[600px] h-[30px] bg-slate-100 rounded-[20px] flex items-center justify-center">
                                  <a
                                    href={c.addCertificate}
                                    target="_blank"
                                    className="font-mooxy text-center"
                                    rel="noopener noreferrer"
                                    download
                                  >
                                    Certificate
                                  </a>
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      <div
                        className="min-w-[100px] h-[30px] bg-slate-100 rounded-[10px] font-mooxy flex items-center justify-center cursor-pointer"
                        onClick={() =>
                          setExpandedLeave(
                            expandedLeave === c._id ? null : c._id
                          )
                        }
                      >
                        <p className="text-center">
                          {expandedLeave === c._id ? "Show Less" : "Show More"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">
                  No certificate applications found.
                </p>
              )}
            </div>
          </>
        )}

        {/* Create Request Forms */}
        {createRequests && !loading && (
          <div className="min-h-screen bg-[#0D0D0D] text-white px-4 sm:px-6 py-12 flex flex-col gap-12 items-center font-sans">
            {/* Leave Form */}
            <div className="bg-[#1A1A1A] p-6 sm:p-8 rounded-2xl w-full max-w-xl shadow-xl">
              <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center font-radonregular">
                Leave Application
              </h2>
              <form
                className="flex flex-col gap-4 font-mooxy"
                onSubmit={handleClickOnLeaveSubmit}
                encType="multipart/form-data"
              >
                <label className="text-sm font-medium">
                  Subject:
                  <input
                    className="mt-1 p-3 w-full h-10 rounded-lg bg-[#2A2A2A] text-white focus:outline-none"
                    placeholder="Give the leave days"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </label>
                <label className="text-sm font-medium">
                  Reason for Leave:
                  <textarea
                    className="mt-1 p-3 w-full h-28 rounded-lg bg-[#2A2A2A] text-white focus:outline-none"
                    placeholder="Explain your reason for leave..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                  />
                </label>
                <label className="text-sm font-medium">
                  Upload Supporting Document(Upload an Image):
                  <input
                    type="file"
                    className="mt-1 bg-[#2A2A2A] text-white p-2 rounded-lg w-full"
                    onChange={(e) => setSupportingDocument(e.target.files[0])}
                    key={supportingDocument ? supportingDocument.name : ""}
                  />
                  {supportingDocument && (
                    <p className="mt-2 text-gray-300">
                      📄 Selected: {supportingDocument.name}
                    </p>
                  )}
                </label>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 font-radonregular transition-all text-white font-semibold py-2 px-4 rounded-lg mt-4"
                >
                  Submit Leave Request
                </button>
              </form>
            </div>

            {/* Certificate Form */}
            <div className="bg-[#1A1A1A] p-6 sm:p-8 rounded-2xl w-full max-w-xl shadow-xl">
              <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center font-radonregular">
                Certificate Application Portal
              </h2>
              <form
                className="flex flex-col gap-4 font-mooxy"
                onSubmit={handleClickOnCertificateSubmit}
                encType="multipart/form-data"
              >
                <label className="text-sm font-medium">
                  Purpose:
                  <input
                    type="text"
                    className="mt-1 p-3 w-full rounded-lg bg-[#2A2A2A] text-white focus:outline-none"
                    placeholder="Purpose of applying for the certificate..."
                    required
                    onChange={(e) => setPurpose(e.target.value)}
                  />
                </label>
                <label className="text-sm font-medium">
                  Type of Document:
                  <select
                    className="mt-1 p-3 w-full rounded-lg bg-[#2A2A2A] text-white"
                    required
                    onChange={(e) => setCertificateType(e.target.value)}
                  >
                    <option value="">-- Select Document Type --</option>
                    <option value="Bonafide">Bonafide</option>
                    <option value="Character">Character Certificate</option>
                    <option value="Transfer">Transfer Certificate</option>
                    <option value="Custom">Custom Request</option>
                  </select>
                </label>
                <label className="text-sm font-medium">
                  Upload Required Document:
                  <input
                    type="file"
                    className="mt-1 bg-[#2A2A2A] text-white p-2 rounded-lg w-full"
                    key={supportingDocument ? supportingDocument.name : ""}
                    onChange={(e) => setSupportingDocument(e.target.files[0])}
                  />
                  {supportingDocument && (
                    <p className="mt-2 text-gray-300">
                      📄 Selected: {supportingDocument.name}
                    </p>
                  )}
                </label>
                <button
                  type="submit"
                  className="bg-green-600 font-radonregular hover:bg-green-700 transition-all text-white font-semibold py-2 px-4 rounded-lg mt-4"
                >
                  Submit Certificate Request
                </button>
              </form>
            </div>
          </div>
        )}
      </>
      {loading && (
        <div className="w-[200px] h-[200px] justify-self-center flex items-center justify-center">
          <Loader />
        </div>
      )}

      <Footer />
    </>
  );
};

export default StudentDashboard;
