import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getAllLeaves } from "../utils/GETAllLeaves";
import { getAllCertificatesRequests } from "../utils/GETAllCertificateRequests";
import { useState, useEffect } from "react";
export default function NotificationsForAdmin() {
  const [leaves, setLeaves] = useState([]);
  const [certificates, setCertificates] = useState([]);

  async function showLeaves() {
    try {
      const res = await getAllLeaves();

      const r = res.filter((item) => item.status === "pending");

      setLeaves(r);
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
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="w-[960px] h-auto justify-self-center flex items-center justify-between pt-5">
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

        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[#777777] font-mooxy text-sm sm:text-[15px]">
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
      <div className="w-[960px] h-[40px] justify-self-center mt-12">
        <p className="text-[#999999] text-[42px] font-growmajour">
          NOTIFICATIONS
        </p>
      </div>

      {/* Leaves Notifications */}
      {leaves.length > 0 ? (
        <div className="flex flex-col gap-4 items-center">
          {leaves.map((l) => (
            <div
              className="w-[960px] h-[60px] bg-slate-700 mt-5 flex flex-col text-white justify-center rounded-[20px] mb-4"
              key={l._id}
            >
              <p className="font-mooxy ml-7 text-[#999999]">
                Leave Request of <span className="text-white">{l.studentName}{" "}(Registration Number:{l.studentId.registrationNumber})</span> (
                <span className="text-white">{l.subject}</span>) applied on{" "}
                <span className="text-white">
                  {new Date(l.createdAt).toDateString()}
                </span>{" "}
                is <span className="text-white">{l.status}.</span>
              </p>
            </div>
          ))}
        </div>
      ) : null}

      {/* Certificates Notifications */}
      {certificates.length > 0 ? (
        <div className="flex flex-col gap-4 items-center">
          {certificates.map((c) => (
            <div
              className="w-[960px] h-[60px] bg-slate-700 mt-5 flex flex-col text-white justify-center rounded-[20px] mb-4"
              key={c._id}
            >
              <p className="font-mooxy ml-7 text-[#999999]">
                Certificate request of{" "}
                <span className="text-white">{c.CertificateType} Certificate</span>{" "}
                has been <span className="text-white">{c.status}</span> on{" "}
                <span className="text-white">
                  {new Date(c.createdAt).toDateString()}.
                </span>
              </p>
            </div>
          ))}
        </div>
      ) : null}

      {/* If both are empty */}
      {leaves.length === 0 && certificates.length === 0 && (
        <p className="text-center mt-8 text-[#777777]">No Notifications</p>
      )}
    </>
  );
}
