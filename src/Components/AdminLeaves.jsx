import { useEffect, useState } from "react";
import { getAdminLeaves } from "../utils/GETAdminLeaves";
import { getAdminDashboard } from "../utils/GETAdminDashBoard";
import { getFacultyLeaves } from "../utils/GETFacultyLeaves";
import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
export const AdminLeaves = () => {
  const [leave, setLeave] = useState([]);
  const [expandedLeave, setExpandedLeave] = useState(null);
  const [notifications, setNotifications] = useState(0);
  const [medicalLeaveTaken, setMedicalLeaveTaken] = useState("");
  const [medicalLeaveLeft, setMedicalLeaveLeft] = useState("");
  const [casualLeaveTaken, setCasualLeaveTaken] = useState("");
  const [casualLeaveLeft, setCasualLeaveLeft] = useState("");
  const [officialLeaveTaken, setOfficialLeaveTaken] = useState("");
  const [officialLeaveLeft, setOfficialLeaveLeft] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const oneDay = 24 * 60 * 60 * 1000;
  useEffect(() => {
    const getLeaves = async () => {
      const res = await getAdminLeaves();
      console.log(res);
      if (res) {
        setLeave(res.data);
        setFromDate(res.data.fromDate);
        setToDate(res.data.toDate);
      }
      const now = new Date();
      const notifs = res.data.filter(
        (item) =>
          (item.status === "approved" || item.status === "rejected") &&
          now - new Date(item.updatedAt) < oneDay
      ).length;
      console.log(notifs);
      setNotifications(notifs);
    };
    getLeaves();
  }, []);
  async function fetchAdminDetails() {
    const res = await getAdminDashboard();
    if (res) {
      setMedicalLeaveTaken(res.medicalLeaveTaken);
      setMedicalLeaveLeft(res.medicalLeaveLeft);
      setCasualLeaveTaken(res.casualLeaveTaken);
      setCasualLeaveLeft(res.casualLeaveLeft);
      setOfficialLeaveTaken(res.officialLeaveTaken);
      setOfficialLeaveLeft(res.officialLeaveLeft);
    }
  }
  fetchAdminDetails();
  return (
    <>
      <div className="min-h-screen pb-5">
        {/* Header */}
        <div className="w-full max-w-[960px] h-auto min-h-[64px] mx-auto flex flex-wrap items-center justify-between px-4 text-white gap-4">
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
                className="w-6 h-6 sm:w-[25px] sm:h-[25px] mr-2 mb-2"
              />
              <p>REQUESTA</p>
            </motion.div>
          </Link>

          {/* Notifications */}
          <div className="flex items-center gap-2 text-[#777777] font-mooxy text-sm sm:text-[15px]">
            <Link
              to="/adminleavenotifications"
              className="relative flex items-center"
            >
              <p className="bg-white text-black px-3 sm:px-4 py-[6px] rounded-full cursor-pointer">
                Notifications
              </p>
              <div className="absolute -top-2 -right-3 w-6 h-6 bg-slate-500 rounded-full flex items-center justify-center">
                <p className="text-white font-mooxy text-xs">{notifications}</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Leave Stats */}
        <div className="bg-slate-700 w-full max-w-[960px] mx-auto mt-5 rounded-[20px] px-4 py-5">
          <ul className="space-y-2 list-disc list-inside">
            <li className="text-white font-mooxy">
              Medical Leave Taken: {medicalLeaveTaken}
            </li>
            <li className="text-white font-mooxy">
              Medical Leave Left: {medicalLeaveLeft}
            </li>
            <li className="text-white font-mooxy">
              Casual Leave Taken: {casualLeaveTaken}
            </li>
            <li className="text-white font-mooxy">
              Casual Leave Left: {casualLeaveLeft}
            </li>
            <li className="text-white font-mooxy">
              Official Leave Taken: {officialLeaveTaken}
            </li>
            <li className="text-white font-mooxy">
              Official Leave Left: {officialLeaveLeft}
            </li>
          </ul>
        </div>

        {/* Leave Requests */}
        <div className="w-full max-w-[960px] mx-auto px-4 mt-7 mb-10">
          <h2 className="text-white font-growmajour text-xl sm:text-2xl md:text-[28px] mb-4">
            My Leave Requests
          </h2>

          {leave && leave.length > 0 ? (
            <div className="flex flex-col gap-4">
              {leave.map((l) => (
                <div
                  key={l._id}
                  className="bg-slate-700 p-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                >
                  <div className="flex-1">
                    <p className="text-white font-bold">
                      Type:{" "}
                      <span className="text-black font-radonregular">
                        {l.type}
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
                        {l.status}{" "}
                        {l.approvedBy && (
                          <span className="text-white">({l.approvedBy})</span>
                        )}
                      </span>
                    </p>
                    <p className="text-gray-400 text-xs">
                      Applied On: {new Date(l.createdAt).toLocaleDateString()}
                    </p>

                    {/* Expanded Details */}
                    {expandedLeave === l._id && (
                      <>
                        <p className="text-white font-ssold mt-2">
                          <span>Reason:</span> <br />
                          <span className="text-[#0F0F0F]">{l.reason}</span>
                        </p>
                        <p className="text-white font-ssold mt-2">
                          <span>From Date:</span> <br />
                          <span className="text-[#0F0F0F]">
                            {new Date(l.fromDate).toLocaleDateString()}
                          </span>
                        </p>
                        <p className="text-white font-ssold mt-2">
                          <span>To Date:</span> <br />
                          <span className="text-[#0F0F0F]">
                            {new Date(l.toDate).toLocaleDateString()}
                          </span>
                        </p>

                        {l.supportingDocument && (
                          <div className="mt-3">
                            <p className="text-white font-ssold">
                              Supporting Document:
                            </p>
                            <div className="w-full sm:w-[400px] h-[30px] bg-slate-100 rounded-[20px] flex items-center justify-center">
                              <a
                                href={l.supportingDocument}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mooxy text-center truncate px-2"
                              >
                                View Supporting Document
                              </a>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Expand/Collapse Button */}
                  <div
                    className="min-w-[100px] h-[30px] bg-slate-100 rounded-[10px] font-mooxy flex items-center justify-center cursor-pointer"
                    onClick={() =>
                      setExpandedLeave(expandedLeave === l._id ? null : l._id)
                    }
                  >
                    <p>{expandedLeave === l._id ? "Show Less" : "Show More"}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No leave applications found.</p>
          )}
        </div>
      </div>
    </>
  );
};
