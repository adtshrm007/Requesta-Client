import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getAllLeaves } from "../utils/GETAllLeaves";
import { getAllCertificatesRequests } from "../utils/GETAllCertificateRequests";
import { useState, useEffect } from "react";
import { getFacultyLeaves } from "../utils/GETFacultyLeaves";
import { getDepartmentalAdminLeave } from "../utils/GETDepartmentalAdminLeaves";
export default function NotificationsForAdmin() {
  const [leaves, setLeaves] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [facultyLeaves, setFacultyLeaves] = useState([]);
  const [departmetalLeaves, setDepartmentalLeaves] = useState([]);
  const [faculty, setFaculty] = useState(false);

  async function showLeaves() {
    try {
      const res = await getAllLeaves();

      const r = res.filter((item) => item.status === "pending");

      setLeaves(r);
    } catch (err) {
      console.log(err);
    }
  }

  async function showFacultyLeaves() {
    try {
      const facultyleaves = await getFacultyLeaves();
      const r = facultyleaves.filter((item) => item.status === "pending");
      if (r) {
        setFaculty(true);
      }
      setFacultyLeaves(r);
    } catch (err) {
      console.log(err);
    }
  }

  async function showDepartmentalLeaves() {
    try {
      const fleaves = await getDepartmentalAdminLeave();
      console.log(fleaves);
      const r = fleaves.filter((item) => item.status === "pending");
      setDepartmentalLeaves(r);
    } catch (err) {
      console.log(err);
    }
  }

  async function showCertificates() {
    try {
      const res = await getAllCertificatesRequests();

      const r = res.filter((item) => item.status === "pending");

      setCertificates(r);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    showLeaves();
    showCertificates();
    showFacultyLeaves();
    showDepartmentalLeaves();
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="w-full max-w-[960px] mx-auto flex flex-col items-center px-4 pt-5">
        {/* Header */}
        <div className="w-full flex items-center justify-between">
          <Link to="">
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
              <p className="text-white">REQUESTA</p>
            </motion.div>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-2 sm:gap-4 text-[#777777] font-mooxy text-sm sm:text-[15px]">
            <Link to="/admindashboard">
              <p className="bg-white text-black px-3 sm:px-4 py-[6px] rounded-full cursor-pointer">
                Dashboard
              </p>
            </Link>
            <Link to="/adminprofile">
              <p className="bg-[#191919] text-white px-3 sm:px-4 py-[6px] rounded-full cursor-pointer">
                Profile
              </p>
            </Link>
          </div>
        </div>

        {/* Title */}
        <div className="w-full text-center mt-10 mb-6">
          <p className="text-[#999999] text-2xl sm:text-3xl md:text-[42px] font-growmajour">
            NOTIFICATIONS
          </p>
        </div>

        {/* Leaves Notifications */}
        {leaves.length > 0 && (
          <div className="flex flex-col gap-4 w-full">
            {leaves.map((l) => (
              <div
                key={l._id}
                className="w-full bg-slate-700 p-4 rounded-[20px] shadow-md"
              >
                <p className="font-mooxy text-[#999999] text-sm sm:text-base">
                  Leave Request of{" "}
                  <span className="text-white">
                    {l.studentName} (Reg No: {l.studentId.registrationNumber})
                  </span>{" "}
                  (<span className="text-white">{l.subject}</span>) applied on{" "}
                  <span className="text-white">
                    {new Date(l.createdAt).toDateString()}
                  </span>{" "}
                  is <span className="text-white">{l.status}</span>.
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Certificates Notifications */}
        {certificates.length > 0 && (
          <div className="flex flex-col gap-4 w-full">
            {certificates.map((c) => (
              <div
                key={c._id}
                className="w-full bg-slate-700 p-4 rounded-[20px] shadow-md"
              >
                <p className="font-mooxy text-[#999999] text-sm sm:text-base">
                  Certificate request of{" "}
                  <span className="text-white">
                    {c.CertificateType} Certificate
                  </span>{" "}
                  has been <span className="text-white">{c.status}</span> on{" "}
                  <span className="text-white">
                    {new Date(c.createdAt).toDateString()}
                  </span>
                  .
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {leaves.length === 0 && certificates.length === 0 && (
          <p className="text-center mt-8 text-[#777777]">No Notifications</p>
        )}

        {/* Faculty Leave Requests */}
        {faculty && (
          <>
            <h2 className="text-white font-growmajour text-xl sm:text-2xl md:text-[28px] mt-12 mb-4 text-center">
              Faculty Leave Requests
            </h2>

            {facultyLeaves.length > 0 && (
              <div className="flex flex-col gap-4 w-full">
                {facultyLeaves.map((l) => (
                  <div
                    key={l._id}
                    className="w-full bg-slate-700 p-4 rounded-[20px] shadow-md"
                  >
                    <p className="font-mooxy text-[#999999] text-sm sm:text-base">
                      Leave Request of{" "}
                      <span className="text-white">
                        {l.admin.name} (Admin ID: {l.admin.adminID})
                      </span>{" "}
                      (<span className="text-white">{l.type}</span>) applied on{" "}
                      <span className="text-white">
                        {new Date(l.createdAt).toDateString()}
                      </span>{" "}
                      is <span className="text-white">{l.status}</span>.
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Departmental Leaves */}
            {departmetalLeaves.length > 0 && (
              <div className="flex flex-col gap-4 w-full">
                {departmetalLeaves.map((l) => (
                  <div
                    key={l._id}
                    className="w-full bg-slate-700 p-4 rounded-[20px] shadow-md"
                  >
                    <p className="font-mooxy text-[#999999] text-sm sm:text-base">
                      Leave Request of{" "}
                      <span className="text-white">
                        {l.admin.name} (Admin ID: {l.admin.adminID})
                      </span>{" "}
                      (<span className="text-white">{l.type}</span>) applied on{" "}
                      <span className="text-white">
                        {new Date(l.createdAt).toDateString()}
                      </span>{" "}
                      is <span className="text-white">{l.status}</span>.
                    </p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
