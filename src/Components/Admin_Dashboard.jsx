import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <>
      {/* Header */}
      <div className="w-full max-w-[960px] mx-auto flex flex-col sm:flex-row items-center justify-between px-4 py-4 text-white">
        {/* Logo & Title */}
        <Link to="/">
          <div className="flex items-center font-growmajour text-[22px] cursor-pointer mb-2 sm:mb-0">
            <img src={logo} alt="logo" className="w-[25px] h-[25px] mr-2" />
            <p>REQUESTA</p>
          </div>
        </Link>

        {/* Nav Links */}
        <div className="flex flex-wrap justify-center sm:justify-end gap-3 text-[#777777] font-mooxy text-[14px]">
          <p className="bg-white text-black px-4 py-[6px] rounded-full cursor-pointer">
            Notifications
          </p>
          <Link to="/studentprofile">
            <p className="bg-[#191919] text-white px-4 py-[6px] rounded-full cursor-pointer">
              Profile
            </p>
          </Link>
          <p className="bg-white text-black px-4 py-[6px] rounded-full cursor-pointer">
            Students
          </p>
        </div>
      </div>

      {/* Tagline */}
      <div className="w-full max-w-[960px] mx-auto px-4 flex flex-col items-center justify-center text-center py-10">
        <div className="text-white text-3xl sm:text-4xl md:text-5xl font-growmajour mb-2">
          Welcome, Aditya
        </div>
        <div className="text-[#777777] text-2xl sm:text-3xl md:text-4xl font-radonregular mb-5">
          Manage Leaves & Requests
        </div>
        <div className="flex justify-center items-center gap-5">
          <Link to="/adminlogin">
            <button className="bg-white w-[200px] sm:w-[220px] h-[36px] rounded-full text-[14px] sm:text-[15px] text-center cursor-pointer">
              Notifications & Requests
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-[960px] w-full mx-auto px-4 flex flex-col sm:flex-row items-center justify-around gap-8 sm:gap-6 pb-8 font-mooxy text-center mt-17">
        <div>
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-radonregular text-white">1250</h3>
          <p className="text-lg md:text-xl text-gray-400">Total Students</p>
        </div>
        <div>
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-radonregular text-white">36</h3>
          <p className="text-lg md:text-xl text-gray-400">Total Requests</p>
        </div>
      </div>
    </>
  );
}
