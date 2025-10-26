import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { fetchCurrentStudent } from "../utils/GETStudentDashBoard";
import { updateStudent } from "../utils/UPDATEstudents";
import { useNavigate } from "react-router-dom";
import { sendOTP } from "../utils/SENDOTP";
import Loader from "./Loader";
import { toast } from "react-toastify";
const StudentProfile = () => {
  const [home, setHome] = useState(true);
  const [editProfile, setEditProfile] = useState(false);
  const [name, setName] = useState("");
  const [regnNo, setregnNo] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const getProfile = async () => {
      const student = await fetchCurrentStudent();
      if (student) {
        setName(student.name);
        setBranch(student.branch);
        setregnNo(student.registrationNumber);
        setEmail(student.email);
        setYear(student.year);
      }
    };
    getProfile();
  }, []);

  const EditProfile = async () => {
    const updatedStudent = {
      registrationNumber: regnNo,
      name,
      email,
      branch,
      year,
    };
    const postEditedData = await updateStudent(updatedStudent);
    console.log(postEditedData)
    return postEditedData;
  };

  function handleClickOnEditProfile() {
    setHome(!home);
    setEditProfile(!editProfile);
  }
  function handleEditProfile() {
    EditProfile();
    // navigate("/studentdashboard");
    // window.location.reload();
  }

  async function handleClickOnChangePassword() {
    try {
      const res = await sendOTP(regnNo, email);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {/* Header */}
      <div className="w-full max-w-[1200px] h-[64px] mx-auto flex items-center justify-between px-4 text-white">
        {/* Logo & Title */}
        <Link to="/">
          <div className="flex items-center font-growmajour text-[20px] sm:text-[22px] cursor-pointer">
            <img
              src={logo}
              alt="logo"
              className="w-[24px] h-[24px] sm:w-[25px] sm:h-[25px] mr-2"
            />
            <p>REQUESTA</p>
          </div>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-3 text-[#777777] font-mooxy text-sm sm:text-[15px]">
          <Link to="/studentdashboard">
            <p className="bg-white text-black px-3 sm:px-4 py-[6px] rounded-full cursor-pointer">
              Dashboard
            </p>
          </Link>
          <p
            onClick={handleClickOnEditProfile}
            className="bg-[#191919] text-white px-3 sm:px-4 py-[6px] rounded-full cursor-pointer"
          >
            Edit Profile
          </p>
          <Link to="/changepassword">
            <p
              className="bg-white text-black px-3 sm:px-4 py-[6px] rounded-full cursor-pointer"
              onClick={handleClickOnChangePassword}
            >
              Change Password
            </p>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenu && (
        <div className="md:hidden w-full bg-[#111] flex flex-col items-center gap-4 py-4">
          <Link to="/studentdashboard" onClick={() => setMobileMenu(false)}>
            <p className="bg-white text-black px-4 py-2 rounded-full cursor-pointer font-mooxy">
              Dashboard
            </p>
          </Link>
          <p
            onClick={() => {
              handleClickOnEditProfile();
              setMobileMenu(false);
            }}
            className="bg-[#191919] text-white px-4 py-2 rounded-full cursor-pointer font-mooxy"
          >
            Edit Profile
          </p>
          <Link to="/changepassword" onClick={() => setMobileMenu(false)}>
            <p className="bg-white text-black px-4 py-2 rounded-full font-mooxy">
              Change Password
            </p>
          </Link>
        </div>
      )}

      {/* Profile Info */}
      {home && (
        <>
          <div className="w-full max-w-[960px] mx-auto mt-8 px-4">
            <h1 className="text-white text-lg sm:text-[22px] font-radonregular">
              {name}
            </h1>
            <h2 className="text-[#777777] text-[16px] sm:text-[20px] font-growmajour">
              Student
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-8 w-full max-w-[960px] mx-auto mt-8 px-4">
            {/* Left */}
            <div className="flex-1">
              <p className="text-[#777777] text-[15px] font-radonregular">
                Profile Info
              </p>
              <div className="mt-6 space-y-6">
                <div>
                  <p className="text-white text-[15px] font-radonregular">
                    Registration Number
                  </p>
                  <p className="text-[15px] font-mooxy text-[#777777]">
                    {regnNo}
                  </p>
                </div>
                <div>
                  <p className="text-white text-[15px] font-radonregular">
                    Branch
                  </p>
                  <p className="text-[15px] font-mooxy text-[#777777]">
                    {branch}
                  </p>
                </div>
                <div>
                  <p className="text-white text-[15px] font-radonregular">
                    Year
                  </p>
                  <p className="text-[15px] font-mooxy text-[#777777]">
                    {year}
                  </p>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="flex-1">
              <div className="mt-6 space-y-6">
                <div>
                  <p className="text-white text-[15px] font-radonregular">
                    Name
                  </p>
                  <p className="text-[15px] font-mooxy text-[#777777]">
                    {name}
                  </p>
                </div>
                <div>
                  <p className="text-white text-[15px] font-radonregular">
                    Phone Number
                  </p>
                  <p className="text-[15px] font-mooxy text-[#777777]">
                    {email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Edit Profile */}
      {editProfile && (
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-black px-4">
          {/* Header */}
          <div className="flex flex-col items-center mb-10 text-center">
            <h2 className="flex items-center gap-2 font-radonregular text-white text-[24px] sm:text-[36px]">
              <img src={logo} alt="Logo" className="h-[36px] sm:h-[48px]" />
              Requesta
            </h2>
            <h3 className="text-[#777777] font-growmajour text-[18px] sm:text-[24px] mt-2">
              Change Credentials
            </h3>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-5 w-full max-w-[350px]">
            {[
              { label: "Name", value: name, setter: setName },
              { label: "Mobile No.", value: email, setter: setEmail },
              { label: "Batch Year", value: year, setter: setYear },
            ].map((field, i) => (
              <div
                key={i}
                className="bg-[#0D0D0D] rounded-[16px] overflow-hidden"
              >
                <input
                  type="text"
                  placeholder={field.label}
                  defaultValue={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                  className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy text-sm"
                />
              </div>
            ))}
            <div className="bg-[#0D0D0D] rounded-[12px] border border-white/10 overflow-hidden">
              <label
                htmlFor="branch"
                className="block px-4 pt-2 text-xs text-gray-300 font-mooxy"
              >
                Branch:
              </label>
              <select
                id="branch"
                name="branch"
                className="w-full h-[45px] px-4 bg-transparent outline-none font-mooxy text-sm text-white appearance-none cursor-pointer"
                defaultValue={branch}
                onChange={(e) => setBranch(e.target.value)}
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
              className="w-full h-[45px] rounded-[16px] bg-white text-black font-mooxy"
              onClick={handleEditProfile}
            >
              Submit Changes
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentProfile;
