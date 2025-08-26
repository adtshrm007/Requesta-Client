import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { fetchCurrentStudent } from "../utils/GETStudentDashBoard";
import { updateStudent } from "../utils/UPDATEstudents";
import { useNavigate } from "react-router-dom";
const StudentProfile = () => {
  const [home, setHome] = useState(true);
  const [editProfile, setEditProfile] = useState(false);
  const [name, setName] = useState("");
  const [regnNo, setregnNo] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [mobileNumber, setmobileNumber] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const getProfile = async () => {
      const student = await fetchCurrentStudent();
      if (student) {
        setName(student.name);
        setBranch(student.branch);
        setregnNo(student.registrationNumber);
        setmobileNumber(student.mobileNumber);
        setYear(student.year);
      }
    };
    getProfile();
  }, []);

  const EditProfile = async () => {
    const updatedStudent = {
      registrationNumber: regnNo,
      name,
      mobileNumber,
      branch,
      year,
    };
    const postEditedData = await updateStudent(updatedStudent);
    return postEditedData;
  };

  function handleClickOnEditProfile() {
    setHome(!home);
    setEditProfile(!editProfile);
  }
  function handleEditProfile() {
    EditProfile();
    navigate("/studentdashboard");
  }

  return (
    <>
      {/* Header */}
      <div className="w-full max-w-[1200px] h-[64px] mx-auto flex items-center justify-between px-4 text-white">
        {/* Logo & Title */}
        <Link to="/">
          <div className="flex items-center font-growmajour text-[22px] cursor-pointer">
            <img src={logo} alt="logo" className="w-[25px] h-[25px] mr-2" />
            <p>REQUESTA</p>
          </div>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-3 text-[#777777] font-mooxy text-[14px] sm:text-[15px]">
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
        </div>
      </div>

      {/* Profile Info */}
      {home && (
        <>
          <div className="w-full max-w-[960px] mx-auto mt-10 px-4">
            <h1 className="text-white text-[20px] sm:text-[24px] font-radonregular">
              {name}
            </h1>
            <h2 className="text-[#777777] text-[18px] sm:text-[24px] font-growmajour">
              Student
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-8 w-full max-w-[960px] mx-auto mt-10 px-4">
            {/* Left Column */}
            <div className="flex-1">
              <p className="text-[#777777] text-[16px] font-radonregular">
                Profile Info
              </p>
              <div className="mt-6 space-y-6">
                <div>
                  <p className="text-white text-[16px] font-radonregular">
                    Registration Number
                  </p>
                  <p className="text-[16px] font-mooxy text-[#777777]">
                    {regnNo}
                  </p>
                </div>

                <div>
                  <p className="text-white text-[16px] font-radonregular">
                    Branch
                  </p>
                  <p className="text-[16px] font-mooxy text-[#777777]">
                    {branch}
                  </p>
                </div>

                <div>
                  <p className="text-white text-[16px] font-radonregular">
                    Year
                  </p>
                  <p className="text-[16px] font-mooxy text-[#777777]">
                    {year}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex-1">
              <div className="mt-6 space-y-6">
                <div>
                  <p className="text-white text-[16px] font-radonregular">
                    Name
                  </p>
                  <p className="text-[16px] font-mooxy text-[#777777]">
                    {name}
                  </p>
                </div>

                <div>
                  <p className="text-white text-[16px] font-radonregular">
                    Phone Number
                  </p>
                  <p className="text-[16px] font-mooxy text-[#777777]">
                    {mobileNumber}
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
          <div className="flex flex-col items-center mb-10">
            <h2 className="flex items-center gap-2 font-radonregular text-white text-[28px] sm:text-[40px]">
              <img src={logo} alt="Logo" className="h-[40px] sm:h-[50px]" />
              Requesta
            </h2>
            <h3 className="text-[#777777] font-growmajour text-[20px] sm:text-[28px] mt-2">
              Change Credentials
            </h3>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-5 w-full max-w-[350px]">
            {[
              {
                label: "Registration Number",
                value: regnNo,
                setter: setregnNo,
              },
              { label: "Name", value: name, setter: setName },
              {
                label: "Mobile No.",
                value: mobileNumber,
                setter: setmobileNumber,
              },
              { label: "Branch", value: branch, setter: setBranch },
              { label: "Batch Year", value: year, setter: setYear },
            ].map((field, i) => (
              <div
                key={i}
                className="bg-[#0D0D0D] rounded-[20px] overflow-hidden"
              >
                <input
                  type="text"
                  placeholder={field.label}
                  defaultValue={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                  className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy"
                />
              </div>
            ))}

            <button
              className="w-full h-[45px] rounded-[20px] bg-white text-black font-mooxy cursor-pointer"
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
