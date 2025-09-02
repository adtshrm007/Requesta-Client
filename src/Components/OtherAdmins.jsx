import { useEffect } from "react";
import { useState } from "react";
import logo from "../assets/logo.svg.png";
import { getAdmins } from "../utils/GETOtherAdminsData";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
export const OtherAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [viewAnalytics, setViewAnalytics] = useState(null);

  useEffect(() => {
    const getadmins = async () => {
      const res = await getAdmins();
      if (res) {
        setAdmins(res.data);
      }
    };
    getadmins();
  }, []);

  return (
    <>
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
        </div>
      </div>
      <div className="text-[#777777] w-[960px] h-[50px] flex items-center justify-center justify-self-center mt-10">
        <p className="text-left w-[100%] h-[100%] font-radonregular text-5xl">
          Admins
        </p>
      </div>
      {admins.length > 0 ? (
        <>
          <div className="w-[960px] justify-self-center mt-4 space-y-2">
            {admins.map((admin, index) => (
              <div key={index} className="space-y-2">
                {/* Admin Card */}
                <div className="flex justify-between items-center bg-slate-700 text-white px-4 py-3 rounded-xl shadow-md">
                  <p className="font-medium font-mooxy">Name: {admin.name}</p>
                  <p className="text-m text-gray-300 font-mooxy">
                    Department: {admin.department}
                  </p>
                  <p className="text-m text-gray-300 font-mooxy">
                    Role: {admin.role}
                  </p>
                  <div
                    className="w-[150px] h-[40px] bg-white rounded-[10px] text-black flex items-center justify-center font-mooxy cursor-pointer"
                    onClick={() =>
                      setViewAnalytics(
                        viewAnalytics === admin._id ? null : admin._id
                      )
                    }
                  >
                    {viewAnalytics === admin._id
                      ? "Hide Analytics"
                      : "View Analytics"}
                  </div>
                </div>

                {/* Conditional Analytics */}
                {viewAnalytics === admin._id && (
                  <div className="w-full bg-slate-600 mt-3 rounded-[15px] p-3 text-m text-gray-200 font-mooxy">
                    <ul className="list-disc list-inside">
                      <li>
                        
                          Last Logged In:{" "}
                          {new Date(admin.updatedAt).toLocaleString()}
                        
                      </li>
                      <li>
                        ID: {admin.adminID}
                      </li>
                      <li>
                        Accepted Leave Requests: {admin.acceptedLeaveRequests}
                      </li>
                      <li>
                        Rejected Leave Requests: {admin.rejectedLeaveRequests}
                      </li>
                      <li>
                        Accepted Certificate Requests: {admin.acceptedCertificateRequests}
                      </li>
                      <li>
                        Rejected Certificate Requests: {admin.rejectedCertificateRequests}
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-white">No Admins</p>
      )}
    </>
  );
};
