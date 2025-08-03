import { useState } from "react";
import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";
import { fetchAdmin } from "../utils/GETAdminData";

export default function AdminLogin() {
  const [adimID, setAdminId] = useState("");
  async function handleAdminLogin() {
    if (!adimID) {
      alert("Please enter Admin ID");
      return;
    }

    try {
      const result = await fetchAdmin(adimID);
      if (result) {
        console.log("Logged in as admin:", result);
        // proceed to admin dashboard or whatever
      } else {
        alert("Admin not found");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
    }
  }

  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center bg-black px-4">
        {/* Header */}
        <div className="flex flex-col items-center mb-10">
          <h2 className="flex items-center gap-2 font-radonregular text-white text-[40px]">
            <img src={logo} alt="Logo" className="h-[50px]" />
            Requesta
          </h2>
          <h3 className="text-[#777777] font-growmajour text-[32px] mt-2">
            Student Login
          </h3>
        </div>

        {/* Login Form */}
        <div className="flex flex-col gap-5 w-full max-w-[320px]">
          <div className="bg-[#0D0D0D] rounded-[20px] overflow-hidden">
            <input
              type="text"
              placeholder="Admin Id"
              className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy"
              onChange={(e) => setAdminId(e.target.value)}
            />
          </div>
          <Link to="/admindashboard">
            <button
              className="w-full h-[45px] rounded-[20px] bg-white text-black font-mooxy cursor-pointer"
              onClick={handleAdminLogin}
            >
              Login
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
