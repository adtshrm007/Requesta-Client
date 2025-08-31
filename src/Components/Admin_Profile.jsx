import { useEffect, useState } from "react";
import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";
import { getAdminDashboard } from "../utils/GETAdminDashBoard";
import { updateAdmin } from "../utils/UPDATEAdmin";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { sendOTP } from "../utils/SENDOTPforAdmin";
const AdminProfile = () => {
  const navigate = useNavigate();
  const [home, setHome] = useState(true);
  const [editProfile, setEditProfile] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminDepartment, setAdminDepartment] = useState("");
  const [adminID, setAdminID] = useState("");

  function handleClickOnEditProfile() {
    setHome(!home);
    setEditProfile(!editProfile);
  }
  const getAdminDetails = async () => {
    const admin = getAdminDashboard();
    return admin;
  };
  useEffect(() => {
    const fetchDetails = async () => {
      const res = await getAdminDetails();
      if (res) {
        setAdminDepartment(res.department);
        setAdminID(res.adminID);
        setAdminName(res.name);
        setAdminEmail(res.email);
      }
    };
    fetchDetails();
  }, []);

  const EditAdminProfile = async () => {
    const newUpdatedAdmin = {
      adminID: adminID,
      department: adminDepartment,
      email: adminEmail,
      name: adminName,
    };
    const newAdmin = await updateAdmin(newUpdatedAdmin);
    return newAdmin;
  };

  function handleAdminEdit() {
    EditAdminProfile();
    navigate("/admindashboard");
  }

  async function handleClickOnChangePassword() {
    try {
      const res = await sendOTP(adminID, adminEmail);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {/* Top Navbar */}
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full max-w-[960px] mx-auto h-[64px] flex items-center justify-between px-4 text-white">
        {/* Logo & Title */}
        <Link to="/">
          <div className="flex items-center font-growmajour text-base sm:text-lg md:text-2xl cursor-pointer">
            <img
              src={logo}
              alt="logo"
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 mr-2"
            />
            <p className="xs:block">REQUESTA</p>
          </div>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-2 sm:gap-4 text-[#777777] font-mooxy text-xs sm:text-sm md:text-base">
          <Link to="/admindashboard">
            <p className="bg-white text-black px-3 sm:px-4 py-1 rounded-full cursor-pointer text-xs sm:text-sm md:text-base">
              Dashboard
            </p>
          </Link>
          <p
            onClick={handleClickOnEditProfile}
            className="bg-[#191919] text-white px-3 sm:px-4 py-1 rounded-full cursor-pointer text-xs sm:text-sm md:text-base"
          >
            Edit Profile
          </p>
          <Link to="/changeadminpassword">
            <p className="bg-white text-black px-3 sm:px-4 py-1 rounded-full cursor-pointer text-xs sm:text-sm md:text-base"
            onClick={handleClickOnChangePassword}>
              Change Password
            </p>
          </Link>
        </div>
      </div>

      {/* Profile Section */}
      {home && (
        <div className="w-full max-w-[960px] mx-auto px-4 mt-10">
          {/* Name & Role */}
          <div className="mb-8">
            <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-radonregular">
              {adminName}
            </h1>
            <h2 className="text-[#777777] text-lg sm:text-xl md:text-2xl font-growmajour">
              Admin
            </h2>
          </div>

          {/* Profile Info Grid */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left */}
            <div className="flex-1">
              <p className="text-[#777777] text-base font-radonregular">
                Profile Info
              </p>
              <div className="mt-6">
                <p className="text-white text-base font-radonregular">
                  AdminID
                </p>
                <p className="text-[#777777] text-sm sm:text-base font-mooxy">
                  {adminID}
                </p>
              </div>
              <div className="mt-6">
                <p className="text-white text-base font-radonregular">
                  Department
                </p>
                <p className="text-[#777777] text-sm sm:text-base font-mooxy">
                  {adminDepartment}
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="flex-1 mt-10">
              <div className="mt-6 md:mt-0">
                <p className="text-white text-base font-radonregular">Name</p>
                <p className="text-[#777777] text-sm sm:text-base font-mooxy">
                  {adminName}
                </p>
              </div>
              <div className="mt-6">
                <p className="text-white text-base font-radonregular">Email</p>
                <p className="text-[#777777] text-sm sm:text-base font-mooxy">
                  {adminEmail}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Form */}
      {editProfile && (
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-black px-4 py-8">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <h2 className="flex items-center gap-2 font-radonregular text-white text-3xl sm:text-4xl">
              <img src={logo} alt="Logo" className="h-10 sm:h-12" />
              Requesta
            </h2>
            <h3 className="text-[#777777] font-growmajour text-xl sm:text-2xl mt-2">
              Change Credentials
            </h3>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-4 w-full max-w-sm sm:max-w-md">
            <div className="bg-[#0D0D0D] rounded-2xl overflow-hidden">
              <input
                type="text"
                placeholder="Admin Id"
                defaultValue={adminID}
                onChange={(e) => setAdminID(e.target.value)}
                className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy text-sm sm:text-base"
              />
            </div>
            <div className="bg-[#0D0D0D] rounded-2xl overflow-hidden">
              <input
                type="text"
                placeholder="Name"
                defaultValue={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy text-sm sm:text-base"
              />
            </div>
            <div className="bg-[#0D0D0D] rounded-2xl overflow-hidden">
              <input
                type="text"
                placeholder="Email"
                defaultValue={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy text-sm sm:text-base"
              />
            </div>
            <div className="bg-gradient-to-r from-[#1a1a1a] via-[#0D0D0D] to-[#1a1a1a] rounded-[12px] overflow-hidden border border-white/10">
              <label
                htmlFor="branch"
                className="block px-4 pt-2 text-xs sm:text-sm text-gray-300 font-mooxy"
              >
                Branch:
              </label>

              <select
                id="branch"
                name="branch"
                className="w-full h-[45px] px-4 outline-none font-mooxy text-sm sm:text-base appearance-none cursor-pointer hover:bg-white/5 focus:bg-white/10 transition-all duration-200"
                defaultValue={adminDepartment}
                required
                onChange={(e) => setAdminDepartment(e.target.value)}
              >
                <option value="">--Select Branch--</option>
                <option value="Computer Science And Engineering">
                  Computer Science
                </option>
                <option value="Electronics And Communication">
                  Electronics
                </option>
                <option value="Mechanical">Mechanical</option>
              </select>
            </div>

            <button
              className="w-full h-[45px] rounded-2xl bg-white text-black font-mooxy cursor-pointer hover:bg-gray-200 transition"
              onClick={handleAdminEdit}
            >
              Submit Changes
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminProfile;
