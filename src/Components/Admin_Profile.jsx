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
          <Link to="/admindashboard">
            <p className="bg-white text-black px-4 py-[6px] rounded-full cursor-pointer">
              Dashboard
            </p>
          </Link>
          <p
            onClick={handleClickOnEditProfile}
            className="bg-[#191919] text-white px-4 py-[6px] rounded-full cursor-pointer"
          >
            Edit Profile
          </p>
        </div>
      </div>
      {home && (
        <>
          <div className="w-[960px] h-[48px] justify-self-center mt-10">
            <h1 className="text-white text-[24px] gap-none font-radonregular">
              {adminName}
            </h1>
            <h2 className="text-[#777777] text-[24px] font-growmajour">
              Admin
            </h2>
          </div>
          <div className="flex w-[950px] h-auto ng-slate-700  justify-self-center">
            <div className="w-[960px] h-[225px] justify-self-center mt-20">
              <p className="text-[#777777] text-[16px] font-radonregular">
                Profile Info
              </p>
              <p className="text-[16px] font-[500] font-radonregular mt-10 text-white">
                AdminID
              </p>
              <p className="text-[16px] font-[500] font-mooxy text-[#777777]">
                {adminID}
              </p>
              <p className="text-[16px] font-[500] font-radonregular mt-10 text-white">
                Department
              </p>
              <p className="text-[16px] font-[500] font-mooxy text-[#777777]">
                {adminDepartment}
              </p>
            </div>
            <div className="w-[960px] h-[225px] justify-self-center mt-20">
              <p className="text-[16px] font-[500] font-radonregular mt-10 text-white">
                Name
              </p>
              <p className="text-[16px] font-[500] font-mooxy text-[#777777]">
                {adminName}
              </p>
              <p className="text-[16px] font-[500] font-radonregular mt-10 text-white">
                Phone Number
              </p>
              <p className="text-[16px] font-[500] font-mooxy text-[#777777]">
                {adminMobileNumber}
              </p>
            </div>
          </div>
        </>
      )}
      {editProfile && (
        <>
          <div className="w-full h-screen flex flex-col items-center justify-center bg-black px-4">
            {/* Header */}
            <div className="flex flex-col items-center mb-10">
              <h2 className="flex items-center gap-2 font-radonregular text-white text-[40px]">
                <img src={logo} alt="Logo" className="h-[50px]" />
                Requesta
              </h2>
              <h3 className="text-[#777777] font-growmajour text-[32px] mt-2">
                Change Credentials
              </h3>
            </div>

            {/* Login Form */}
            <div className="flex flex-col gap-5 w-full max-w-[320px]">
              <div className="bg-[#0D0D0D] rounded-[20px] overflow-hidden">
                <input
                  type="text"
                  placeholder="Admin Id"
                  defaultValue={adminID}
                  onChange={(e) => setAdminID(e.target.value)}
                  className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy"
                />
              </div>
              <div className="bg-[#0D0D0D] rounded-[20px] overflow-hidden">
                <input
                  type="text"
                  placeholder="Name"
                  defaultValue={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy"
                />
              </div>
              <div className="bg-[#0D0D0D] rounded-[20px] overflow-hidden">
                <input
                  type="text"
                  placeholder="Mobile No."
                  defaultValue={adminMobileNumber}
                  onChange={(e) => setAdminMobileNumber(e.target.value)}
                  className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy"
                />
              </div>
              <div className="bg-[#0D0D0D] rounded-[20px] overflow-hidden">
                <input
                  type="text"
                  placeholder="Department"
                  defaultValue={adminDepartment}
                  onChange={(e) => setAdminDepartment(e.target.value)}
                  className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy"
                />
              </div>

              <button
                className="w-full h-[45px] rounded-[20px] bg-white text-black font-mooxy cursor-pointer"
                onClick={handleAdminEdit}
              >
                Submit Changes
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminProfile;
