import { useEffect, useState } from "react";
import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";
import { getAdminDashboard } from "../utils/GETAdminDashBoard";
import { updateAdmin } from "../utils/UPDATEAdmin";
import { useNavigate } from "react-router-dom";
const AdminProfile = () => {
  const navigate = useNavigate();
  const [home, setHome] = useState(true);
  const [editProfile, setEditProfile] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [adminMobileNumber, setAdminMobileNumber] = useState("");
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
        setAdminMobileNumber(res.mobileNumber);
      }
    };
    fetchDetails();
  }, []);

  const EditAdminProfile = async () => {
    const newUpdatedAdmin = {
      adminID: adminID,
      department: adminDepartment,
      mobileNumber: adminMobileNumber,
      name: adminName,
    };
    const newAdmin = await updateAdmin(newUpdatedAdmin);
    return newAdmin;
  };

  function handleAdminEdit() {
    EditAdminProfile();
    navigate("/admindashboard");
  }

  return (
    <>
      {/* Top Navbar */}
      <div className="w-full max-w-[960px] mx-auto h-[64px] flex items-center justify-between px-4 text-white">
        {/* Logo & Title */}
        <Link to="/">
          <div className="flex items-center font-growmajour text-base sm:text-lg md:text-2xl cursor-pointer">
            <img
              src={logo}
              alt="logo"
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 mr-2"
            />
            <p className= "xs:block">REQUESTA</p>
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
            <div className="flex-1">
              <div className="mt-6 md:mt-0">
                <p className="text-white text-base font-radonregular">Name</p>
                <p className="text-[#777777] text-sm sm:text-base font-mooxy">
                  {adminName}
                </p>
              </div>
              <div className="mt-6">
                <p className="text-white text-base font-radonregular">
                  Phone Number
                </p>
                <p className="text-[#777777] text-sm sm:text-base font-mooxy">
                  {adminMobileNumber}
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
                placeholder="Mobile No."
                defaultValue={adminMobileNumber}
                onChange={(e) => setAdminMobileNumber(e.target.value)}
                className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy text-sm sm:text-base"
              />
            </div>
            <div className="bg-[#0D0D0D] rounded-2xl overflow-hidden">
              <input
                type="text"
                placeholder="Department"
                defaultValue={adminDepartment}
                onChange={(e) => setAdminDepartment(e.target.value)}
                className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy text-sm sm:text-base"
              />
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
