import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { fetchCurrentStudent } from "../utils/GETStudentDashBoard";
import { submitLeaves } from "../utils/POSTLeaveApplication";
import { useNavigate } from "react-router-dom";
import { getLeaves } from "../utils/GETLeavesForAStudent";
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
  const [expandedLeave, setExpandedLeave] = useState(null);
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
  async function handleClickOnLeaveSubmit() {
    const leaveData = {
      subject: subject,
      Reason: reason,
    };

    const res = await submitLeaves(leaveData);
    console.log("Leave submitted:", res);
    navigate("/studentdashboard");
  }
  useEffect(() => {
    const showLeaves = async () => {
      try {
        const res = await getLeaves();
        console.log("Fetched Leaves:", res);
        if (res) {
          setLeave(res);
        }
        console.log(leave);
      } catch (err) {
        console.error("Error fetching leaves:", err);
      }
    };
    showLeaves();
  }, []);
  return (
    <>
      <div className="w-full max-w-[960px] h-[64px] mx-auto flex items-center justify-between px-4 text-white">
        {/* Logo & Title */}
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

        {/* Nav Links */}
        <div className="flex items-center gap-4 text-[#777777] font-mooxy text-[15px]">
          <p className="bg-white text-black px-4 py-[6px] rounded-full cursor-pointer">
            Notifications
          </p>
          <Link to="/studentprofile">
            <p className="bg-[#191919] text-white px-4 py-[6px] rounded-full cursor-pointer">
              Profile
            </p>
          </Link>
          <p
            onClick={handleClickOnCreateRequest}
            className="bg-white text-black px-4 py-[6px] rounded-full cursor-pointer"
          >
            Create Request
          </p>
        </div>
      </div>
      {home && (
        <>
          <div className="w-[960px] h-[120px] mt-10 justify-self-center">
            <h1 className="text-white font-radonregular text-[40px]">
              Welcome {name}
            </h1>
            <h1 className="text-white font-radonregular text-[40px]">
              Registration No.=={regnNo}
            </h1>
          </div>
          <div className="w-[960px] h-[40px] justify-self-center">
            <h2 className="text-[#777777] font-growmajour text-[40px]">
              STUDENT DASHBOARD
            </h2>
          </div>
          <div className="w-[960px] h-auto justify-self-center mt-7 mb-10">
            <h2 className="text-white font-growmajour text-[28px] mb-4">
              My Leave Requests
            </h2>

            {leave.length > 0 ? (
              <div className="flex flex-col gap-4">
                {leave.map((l) => (
                  <div
                    key={l._id}
                    className="bg-slate-700 p-4 rounded-lg shadow-md flex justify-between items-center"
                  >
                    <div>
                      <p className="text-white font-bold">
                        Subject: <span className="text-black font-radonregular">{l.subject}</span>
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
                        Applied On: {new Date(l.createdAt).toLocaleDateString()}
                      </p>
                      {expandedLeave === l._id && (
                        <p className="text-white font-ssold w-[750px] text-justify">
                          <span>Reason:</span> <br/><span className="text-[#0F0F0F]">{l.Reason}</span>
                        </p>
                      )}
                    </div>
                    <div
                      className="w-[100px] h-[30px] bg-slate-100 rounded-[10px] font-mooxy flex items-center justify-center cursor-pointer"
                      onClick={() =>
                        setExpandedLeave(expandedLeave === l._id ? null : l._id)
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
        </>
      )}

      {createRequests && (
        <>
          <div className="min-h-screen bg-[#0D0D0D] text-white px-6 py-12 flex flex-col gap-12 items-center font-sans">
            {/* Leave Application Form */}
            <div className="bg-[#1A1A1A] p-8 rounded-2xl w-full max-w-xl shadow-xl">
              <h2 className="text-2xl font-bold mb-6 text-center font-radonregular">
                Leave Application
              </h2>
              <form
                className="flex flex-col gap-4 font-mooxy"
                onSubmit={handleClickOnLeaveSubmit}
              >
                <label className="text-sm font-medium ">
                  Subject:
                  <input
                    className="mt-1 p-3 w-full h-8 rounded-lg bg-[#2A2A2A] text-white focus:outline-none"
                    placeholder="Give the leave days"
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </label>
                <label className="text-sm font-medium ">
                  Reason for Leave:
                  <textarea
                    className="mt-1 p-3 w-full h-28 rounded-lg bg-[#2A2A2A] text-white focus:outline-none"
                    placeholder="Explain your reason for leave..."
                    onChange={(e) => setReason(e.target.value)}
                    required
                  />
                </label>

                <label className="text-sm font-medium">
                  Upload Supporting Document:
                  <input
                    type="file"
                    className="mt-1 bg-[#2A2A2A] text-white p-2 rounded-lg w-full"
                  />
                </label>

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 font-radonregular transition-all text-white font-semibold py-2 px-4 rounded-lg mt-4"
                >
                  Submit Leave Request
                </button>
              </form>
            </div>

            {/* Certificate Application Form */}
            <div className="bg-[#1A1A1A] p-8 rounded-2xl w-full max-w-xl shadow-xl">
              <h2 className="text-2xl font-bold mb-6 text-center font-radonregular">
                Certificate Application Portal
              </h2>
              <form className="flex flex-col gap-4 font-mooxy">
                <label className="text-sm font-medium">
                  Purpose:
                  <input
                    type="text"
                    className="mt-1 p-3 w-full rounded-lg bg-[#2A2A2A] text-white focus:outline-none"
                    placeholder="Purpose of applying for the certificate..."
                    required
                  />
                </label>

                <label className="text-sm font-medium">
                  Type of Document:
                  <select
                    className="mt-1 p-3 w-full rounded-lg bg-[#2A2A2A] text-white"
                    required
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
                    required
                  />
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
        </>
      )}
      <Footer />
    </>
  );
};

export default StudentDashboard;
