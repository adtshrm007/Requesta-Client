import { useState } from "react";
import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";
import { fetchAdmin } from "../utils/GETAdminData";
import { ToastContainer,toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [adminID, setAdminId] = useState("");
  const handleAdminLogin=async()=>{
    if(!adminID.trim()){
      toast.error("Please enter admin ID");
      return;
    }
    const res=await fetchAdmin(adminID);
    if(res){
      toast.success("Admin Logged In Successfully")
      navigate("/admindashboard");
    }
    else{
      toast.error(res.message||"Admin not found");
    }

  }

  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center bg-black px-4">
        {/* Header */}
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="flex flex-col items-center mb-10">
          <h2 className="flex items-center gap-2 font-radonregular text-white text-[40px]">
            <img src={logo} alt="Logo" className="h-[50px]" />
            Requesta
          </h2>
          <h3 className="text-[#777777] font-growmajour text-[32px] mt-2">
            Admin Login
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
            <button
              className="w-full h-[45px] rounded-[20px] bg-white text-black font-mooxy cursor-pointer"
              onClick={handleAdminLogin}
            >
              Login
            </button>
        </div>
      </div>
    </>
  );
}
