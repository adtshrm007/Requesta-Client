import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";
export default function AdminDashboard() {
  return (
    <>
      <div className="w-full max-w-[960px] h-[64px] mx-auto flex items-center justify-between px-4 text-white">
        {/* Logo & Title */}
        <Link to="/">
          <div className="flex items-center font-growmajour text-[22px] cursor-pointer">
            <img src={logo} alt="logo" className="w-[25px] h-[25px] mr-2" />
            <p>REQUESTA</p>
          </div>
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
          <p className="bg-white text-black px-4 py-[6px] rounded-full cursor-pointer">
            Students
          </p>
        </div>
      </div>

      <div className="tagline w-[960px] h-[500px]  justify-self-center flex flex-col justify-center text-center">
        <div className="tagline_1 h-[40px] text-white text-[40px] font-growmajour">
          Welcome,Aditya
        </div>
        <div className="tagline_1 h-[40px] text-[#777777] text-[40px] font-radonregular">
          Manage Leaves & Requests
        </div>
        <div className="tagline_1 h-[40px] mt-5 flex justify-center items-center gap-5 font-mooxy">
          <Link to="/adminlogin">
            <button className="admin_login bg-white w-[180px] h-[30px] rounded-[100px] text-[14px] text-center cursor-pointer">
              Notifications & Requests
            </button>
          </Link>
        </div>
      </div>
      <div className="max-w-[960px] w-full h-auto justify-self-center flex flex-wrap items-center justify-around pb-4 font-mooxy gap-6">
        <div className="text-center">
          <h3 className="text-5xl md:text-6xl font-radonregular text-white">1250</h3>
          <p className="text-lg md:text-xl text-gray-400">Total Students</p>
        </div>
        <div className="text-center">
          <h3 className="text-5xl md:text-6xl font-radonregular text-white">36</h3>
          <p className="text-lg md:text-xl text-gray-400">Total Requests</p>
        </div>
      </div>
    </>
  );
}
