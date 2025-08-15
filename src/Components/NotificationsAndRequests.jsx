import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { getAllLeaves } from "../utils/GETAllLeaves";
import { updateLeaveStatus } from "../utils/UpdateLeaveStatus";

export const NotificationsAndRequest = () => {
  const navigate = useNavigate();
  const [pendingleaves, setPendingLeaves] = useState([]);
  const [acceptedLeaves,setAcceptedLeaves] = useState([]);
  const [rejectedLeaves,setRejectedLeaves] = useState([]);

  // Fetch all leaves once on mount
  useEffect(() => {
    const fetchLeaves = async () => {
      const res = await getAllLeaves();
      if (res) {
        setPendingLeaves(res.filter(leave => leave.status === "pending"));
        setAcceptedLeaves(res.filter(leave => leave.status === "approved"));
        setRejectedLeaves(res.filter(leave => leave.status === "rejected"));
      }
    };
    fetchLeaves();
  }, []);

  // Optimistic Accept
  const handleClickOnAccept = (leaveId) => {
    // Update UI instantly
    setPendingLeaves((prev) =>
      prev.map((l) =>
        l._id === leaveId ? { ...l, status: "approved" } : l
      )
    );

    // Update backend
    updateLeaveStatus(leaveId, "approved").catch(() => {
      // rollback if API fails
      setPendingLeaves((prev) =>
        prev.map((l) =>
          l._id === leaveId ? { ...l, status: "pending" } : l
        )
      );
    });
  };

  // Optimistic Reject
  const handleClickOnReject = (leaveId) => {
    setPendingLeaves((prev) =>
      prev.map((l) =>
        l._id === leaveId ? { ...l, status: "rejected" } : l
      )
    );

    updateLeaveStatus(leaveId, "rejected").catch(() => {
      setPendingLeaves((prev) =>
        prev.map((l) =>
          l._id === leaveId ? { ...l, status: "pending" } : l
        )
      );
    });
  };

  return (
    <>
      {/* Header */}
      <div className="w-full max-w-[960px] h-[64px] mx-auto flex items-center justify-between px-4 text-white">
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
      <div className="w-[960px] h-auto justify-self-center mt-7 mb-10">
        <h2 className="text-white font-growmajour text-[28px] mb-4">
          Pending Leave Requests
        </h2>

        {pendingleaves.length > 0 ? (
          <div className="flex flex-col gap-4">
            {pendingleaves.map((l) => (
              <div
                key={l._id || l.studentId._id}
                className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center hover:bg-gray-700 transition-colors duration-300"
              >
                <div>
                  <p className="text-gray-300 font-bold">
                    <span className="text-gray-200">Registration Number:</span>{" "}
                    {l.studentId?.registrationNumber || "N/A"}
                  </p>
                  <p className="text-gray-300 font-bold">
                    <span className="text-gray-200">Name:</span>{" "}
                    {l.studentId?.name || "N/A"}
                  </p>
                  <p className="text-gray-300 font-bold">
                    <span className="text-gray-200">Subject:</span> {l.subject}
                  </p>
                  <p className="text-gray-300 font-bold w-[750px] text-justify">
                    <span className="text-gray-200">Reason:</span> {l.Reason}
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

                {/* Accept / Reject Buttons */}
                <div className="w-[150px] h-[150px] flex flex-col justify-evenly gap-2">
                  <div
                    className="w-full h-[30px] bg-green-500 hover:bg-green-600 rounded-[10px] cursor-pointer"
                    onClick={() => handleClickOnAccept(l._id)}
                  >
                    <p className="text-center text-white font-mooxy mt-1">Accept</p>
                  </div>
                  <div
                    className="w-full h-[30px] bg-red-500 hover:bg-red-600 rounded-[10px] cursor-pointer"
                    onClick={() => handleClickOnReject(l._id)}
                  >
                    <p className="text-center text-white font-mooxy mt-1">Reject</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No leave applications found.</p>
        )}
      </div>
      <div className="w-[960px] h-auto justify-self-center mt-7 mb-10">
        <h2 className="text-white font-growmajour text-[28px] mb-4">
          Accepted Leave Requests
        </h2>

        {acceptedLeaves.length > 0 ? (
          <div className="flex flex-col gap-4">
            {acceptedLeaves.map((l) => (
              <div
                key={l._id || l.studentId._id}
                className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center hover:bg-gray-700 transition-colors duration-300"
              >
                <div>
                  <p className="text-gray-300 font-bold">
                    <span className="text-gray-200">Registration Number:</span>{" "}
                    {l.studentId?.registrationNumber || "N/A"}
                  </p>
                  <p className="text-gray-300 font-bold">
                    <span className="text-gray-200">Name:</span>{" "}
                    {l.studentId?.name || "N/A"}
                  </p>
                  <p className="text-gray-300 font-bold">
                    <span className="text-gray-200">Subject:</span> {l.subject}
                  </p>
                  <p className="text-gray-300 font-bold w-[750px] text-justify">
                    <span className="text-gray-200">Reason:</span> {l.Reason}
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

                {/* Accept / Reject Buttons */}
                <div className="w-[150px] h-[150px] flex flex-col justify-evenly gap-2">
                  <div
                    className="w-full h-[30px] bg-green-500 hover:bg-green-600 rounded-[10px] cursor-pointer"
                    onClick={() => handleClickOnAccept(l._id)}
                  >
                    <p className="text-center text-white font-mooxy mt-1">Accept</p>
                  </div>
                  <div
                    className="w-full h-[30px] bg-red-500 hover:bg-red-600 rounded-[10px] cursor-pointer"
                    onClick={() => handleClickOnReject(l._id)}
                  >
                    <p className="text-center text-white font-mooxy mt-1">Reject</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No leave applications found.</p>
        )}
      </div>
      <div className="w-[960px] h-auto justify-self-center mt-7 mb-10">
        <h2 className="text-white font-growmajour text-[28px] mb-4">
          Rejected Leave Requests
        </h2>

        {rejectedLeaves.length > 0 ? (
          <div className="flex flex-col gap-4">
            {rejectedLeaves.map((l) => (
              <div
                key={l._id || l.studentId._id}
                className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center hover:bg-gray-700 transition-colors duration-300"
              >
                <div>
                  <p className="text-gray-300 font-bold">
                    <span className="text-gray-200">Registration Number:</span>{" "}
                    {l.studentId?.registrationNumber || "N/A"}
                  </p>
                  <p className="text-gray-300 font-bold">
                    <span className="text-gray-200">Name:</span>{" "}
                    {l.studentId?.name || "N/A"}
                  </p>
                  <p className="text-gray-300 font-bold">
                    <span className="text-gray-200">Subject:</span> {l.subject}
                  </p>
                  <p className="text-gray-300 font-bold w-[750px] text-justify">
                    <span className="text-gray-200">Reason:</span> {l.Reason}
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

                {/* Accept / Reject Buttons */}
                <div className="w-[150px] h-[150px] flex flex-col justify-evenly gap-2">
                  <div
                    className="w-full h-[30px] bg-green-500 hover:bg-green-600 rounded-[10px] cursor-pointer"
                    onClick={() => handleClickOnAccept(l._id)}
                  >
                    <p className="text-center text-white font-mooxy mt-1">Accept</p>
                  </div>
                  <div
                    className="w-full h-[30px] bg-red-500 hover:bg-red-600 rounded-[10px] cursor-pointer"
                    onClick={() => handleClickOnReject(l._id)}
                  >
                    <p className="text-center text-white font-mooxy mt-1">Reject</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No leave applications found.</p>
        )}
      </div>



      <Footer />
    </>
  );
};
