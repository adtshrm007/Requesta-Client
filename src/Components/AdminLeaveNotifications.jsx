import { getAdminLeaves } from "../utils/GETAdminLeaves";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg.png";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
export default function AdminLeaveNotifications() {
  const [leavesNotifications, setLeavesNotifications] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fetchLeaves = async () => {
      const res = await getAdminLeaves();
      if (res) {
        const now = new Date();
        const oneDay = 1000 * 60 * 60 * 24;
        const r = res.data.filter(
          (item) =>
            (item.status === "approved" || item.status === "rejected") &&
            now - new Date(item.updatedAt) < oneDay
        );
        setLeavesNotifications(r);
      } else {
        setLeavesNotifications([]);
        console.log("Error fetching leaves");
        return;
      }
    };
    fetchLeaves();
  }, []);

  return (
    <>
      <div className="w-full flex flex-col items-center">
        {/* Navbar */}
        <div className="w-full max-w-[960px] px-4 h-auto flex items-center justify-between pt-5">
          {/* Logo */}
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

          {/* Desktop Nav */}
          <div className="hidden sm:flex items-center gap-4 text-[#777777] font-mooxy text-sm sm:text-[15px]">
            <Link to="/admindashboard">
              <p className="bg-white text-black px-4 py-[6px] rounded-full cursor-pointer">
                Dashboard
              </p>
            </Link>
          </div>

          {/* Hamburger (mobile only) */}
          <button
            className="sm:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="sm:hidden w-full max-w-[960px] px-4 mt-3 flex flex-col gap-2 text-[#777777] font-mooxy">
            <Link to="/admindashboard" onClick={() => setMenuOpen(false)}>
              <p className="bg-white text-black px-4 py-2 rounded-lg cursor-pointer text-center">
                Dashboard
              </p>
            </Link>
          </div>
        )}

        {/* Heading */}
        <div className="w-full max-w-[960px] px-4 mt-12">
          <p className="text-[#999999] text-3xl sm:text-[42px] font-growmajour text-center sm:text-left">
            NOTIFICATIONS
          </p>
        </div>

        {/* Notifications */}
        {leavesNotifications.length > 0 ? (
          <div className="flex flex-col gap-4 items-center mt-5 w-full px-4">
            {leavesNotifications.map((l) => (
              <div
                className="w-full max-w-[960px] bg-slate-700 flex flex-col text-white justify-center rounded-[20px] p-4"
                key={l._id}
              >
                <p className="font-radonregular text-[#999999]">
                  Your leave request of{" "}
                  <b className="text-white">{l.subject}</b> has been{" "}
                  <b className="text-white">{l.status}</b> on{" "}
                  <b className="text-white">
                    {new Date(l.updatedAt).toDateString()}.
                  </b>
                </p>
                <p className="font-mooxy text-[#999999]">
                  Remark: {l.remark || "—"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center mt-8 text-[#777777]">No Notifications</p>
        )}
      </div>
    </>
  );
}
