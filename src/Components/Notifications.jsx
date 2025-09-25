import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getLeaves } from "../utils/GETLeavesForAStudent";
import { showAllCertificates } from "../utils/GETCertificatesForAStudent";
import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { getFacultyLeaves } from "../utils/GETFacultyLeaves";
import { Menu, X } from "lucide-react";


export default function Notifications() {
  const [leaves, setLeaves] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [leaverequests, setLeaveRequests] = useState(0);
  const [facultyLeaves, setFacultyLeaves] = useState(0);
  const [certificateRequets, setCertificateRequests] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  async function showLeaves() {
    try {
      const res = await getLeaves();
      const now = new Date();
      const oneDay = 1000 * 60 * 60 * 24;

      const r = res.filter(
        (item) =>
          (item.status === "approved" || item.status === "rejected") &&
          now - new Date(item.updatedAt) < oneDay
      );

      setLeaves(r);
      setLeaveRequests(r.length);
    } catch (err) {
      console.log(err);
    }
  }

  async function showCertificates() {
    try {
      const res = await showAllCertificates();
      const now = new Date();
      const oneDay = 1000 * 60 * 60 * 24;

      const r = res.filter(
        (item) =>
          (item.status === "approved" || item.status === "rejected") &&
          now - new Date(item.updatedAt) < oneDay
      );

      setCertificates(r);
      setCertificateRequests(r.length);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    showLeaves();
    showCertificates();
  }, []);

  return (
    <>
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between pt-5 px-4">
        {/* Logo */}
        <Link to="">
          <motion.div
            className="flex items-center font-growmajour text-lg sm:text-xl md:text-2xl cursor-pointer"
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
            <img src={logo} alt="logo" className="w-6 h-6 sm:w-7 sm:h-7 mr-2" />
            <p className="text-white">REQUESTA</p>
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden sm:flex flex-wrap items-center gap-4 text-[#777777] font-mooxy text-sm sm:text-base">
          <Link to="/studentdashboard">
            <p className="bg-white text-black px-3 sm:px-4 py-[6px] rounded-full cursor-pointer">
              Dashboard
            </p>
          </Link>

          <Link to="/studentprofile">
            <p className="bg-[#191919] text-white px-3 sm:px-4 py-[6px] rounded-full cursor-pointer">
              Profile
            </p>
          </Link>

          {/* Leave Notifications */}
          <ScrollLink to="leave">
            <div className="relative">
              <p className="bg-white text-black px-3 sm:px-4 py-[6px] rounded-full cursor-pointer">
                Leave Notifications
              </p>
              {leaverequests > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-slate-700 text-white rounded-full flex items-center justify-center text-xs font-mooxy">
                  {leaverequests}
                </span>
              )}
            </div>
          </ScrollLink>

          {/* Certificate Notifications */}
          <ScrollLink to="cert">
            <div className="relative">
              <p className="bg-[#191919] text-white px-3 sm:px-4 py-[6px] rounded-full cursor-pointer">
                Certificate Notifications
              </p>
              {certificateRequets > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-slate-700 text-white rounded-full flex items-center justify-center text-xs font-mooxy">
                  {certificateRequets}
                </span>
              )}
            </div>
          </ScrollLink>
        </div>

        {/* Mobile Hamburger */}
        <div className="sm:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X size={28} color="white" />
            ) : (
              <Menu size={28} color="white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 right-4 bg-[#111] rounded-lg shadow-lg flex flex-col p-4 gap-3 w-56 sm:hidden z-50"
          >
            <Link to="/studentdashboard" onClick={() => setIsOpen(false)}>
              <p className="bg-white text-black px-4 py-2 rounded-full cursor-pointer">
                Dashboard
              </p>
            </Link>

            <Link to="/studentprofile" onClick={() => setIsOpen(false)}>
              <p className="bg-[#191919] text-white px-4 py-2 rounded-full cursor-pointer">
                Profile
              </p>
            </Link>

            <ScrollLink to="leave" onClick={() => setIsOpen(false)}>
              <div className="relative">
                <p className="bg-white text-black px-4 py-2 rounded-full cursor-pointer">
                  Leave Notifications
                </p>
                {leaverequests > 0 && (
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-slate-700 text-white rounded-full flex items-center justify-center text-xs font-mooxy">
                    {leaverequests}
                  </span>
                )}
              </div>
            </ScrollLink>

            <ScrollLink to="cert" onClick={() => setIsOpen(false)}>
              <div className="relative">
                <p className="bg-[#191919] text-white px-4 py-2 rounded-full cursor-pointer">
                  Certificate Notifications
                </p>
                {certificateRequets > 0 && (
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-slate-700 text-white rounded-full flex items-center justify-center text-xs font-mooxy">
                    {certificateRequets}
                  </span>
                )}
              </div>
            </ScrollLink>
          </motion.div>
        )}
      </div>

      {/* Section Titles */}
      <div className="max-w-4xl w-full mx-auto mt-12 px-4">
        <p className="text-[#999999] text-3xl sm:text-4xl md:text-5xl font-growmajour">
          NOTIFICATIONS
        </p>
      </div>

      <div className="max-w-4xl w-full mx-auto mt-12 px-4">
        <p
          className="text-[#999999] text-2xl sm:text-3xl md:text-4xl font-radonregular"
          id="leave"
        >
          Notifications of Leave Requests
        </p>
      </div>

      {/* Leave Requests */}
      {leaves.length > 0 ? (
        <div className="flex flex-col gap-4 items-center mt-5 px-4">
          {leaves.map((l) => (
            <div
              className="w-full bg-slate-700 flex flex-col text-white justify-center rounded-2xl p-4"
              key={l._id}
            >
              <p className="font-radonregular text-sm sm:text-base text-[#999999]">
                Your leave request of <b className="text-white">{l.subject}</b>{" "}
                has been <b className="text-white">{l.status}</b> on{" "}
                <b className="text-white">
                  {new Date(l.updatedAt).toDateString()}.
                </b>
              </p>
              <p className="font-mooxy text-sm sm:text-base text-[#999999] mt-1">
                Remark: {l.remark || "—"}
              </p>
            </div>
          ))}
        </div>
      ) : null}

      <div className="max-w-4xl w-full mx-auto mt-12 px-4">
        <p
          className="text-[#999999] text-2xl sm:text-3xl md:text-4xl font-radonregular"
          id="cert"
        >
          Notifications of Certificate Requests
        </p>
      </div>

      {/* Certificate Requests */}
      {certificates.length > 0 ? (
        <div className="flex flex-col gap-4 items-center mt-5 px-4">
          {certificates.map((c) => (
            <div
              className="w-full bg-slate-700 flex flex-col text-white justify-center rounded-2xl p-4"
              key={c._id}
            >
              <p className="font-radonregular text-sm sm:text-base text-[#999999]">
                Your certificate request for{" "}
                <b className="text-white">{c.CertificateType} Certificate</b>{" "}
                <b className="text-white">{c.purpose}</b> has been{" "}
                <b className="text-white">{c.status}</b> on{" "}
                <b className="text-white">
                  {new Date(c.updatedAt).toDateString()}.
                </b>
              </p>
              <p className="font-mooxy text-sm sm:text-base text-[#999999] mt-1">
                Remark: {c.remark || "—"}
              </p>

              {c.addCertificate && (
                <div className="w-full sm:w-[500px] mt-3 flex flex-col sm:flex-row items-center gap-2">
                  <p className="font-mooxy text-sm sm:text-base">
                    View & Download Certificate:
                  </p>
                  <div className="bg-white w-full sm:w-1/2 h-10 rounded-2xl flex items-center justify-center font-mooxy">
                    <a
                      href={c.addCertificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black"
                      download
                    >
                      Certificate
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : null}

      {leaves.length === 0 && certificates.length === 0 && (
        <p className="text-center mt-8 text-[#777777]">No Notifications</p>
      )}
    </>
  );
}
