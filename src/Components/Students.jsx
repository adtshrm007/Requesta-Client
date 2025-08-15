import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg.png";
import { getStudents } from "../utils/GETAllStudents";
import { getLeavesOfAStudentForAdmin } from "../utils/GETLeavesOfAStudentForAdmin";

const Students = () => {
  const [activeTab, setActiveTab] = useState("home"); // home, search, filters, add
  const [search, setSearch] = useState("");
  const [studentsList, setStudentsList] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [expand, setExpand] = useState(null);
  const [leaves, setLeaves] = useState([]);

  // Fetch students on mount
  useEffect(() => {
    const fetchStudents = async () => {
      const res = await getStudents();
      setStudentsList(res || []);
      setFilteredStudents(res || []);
    };
    fetchStudents();
  }, []);

  // Filter students when search changes
  useEffect(() => {
    if (activeTab === "search") {
      const results = studentsList.filter(
        (student) =>
          student.name.toLowerCase().includes(search.toLowerCase()) ||
          student.registrationNumber.toString().includes(search)
      );
      setFilteredStudents(results);
    } else {
      setFilteredStudents(studentsList);
    }
  }, [search, studentsList, activeTab]);

  const handleViewRequests = async (studentId) => {
    if (expand === studentId) {
      setExpand(null); // collapse
      return;
    }
    setExpand(studentId);

    const leavesData = await getLeavesOfAStudentForAdmin(studentId);
    setLeaves(leavesData || []);
  };

  return (
    <>
      {/* Header */}
      <div className="w-full max-w-[960px] mx-auto items-center justify-between px-4 py-4 text-white flex">
        <Link to="/">
          <div className="flex items-center font-growmajour text-[22px] cursor-pointer mb-2 sm:mb-0">
            <img src={logo} alt="logo" className="w-[25px] h-[25px] mr-2" />
            <p>REQUESTA</p>
          </div>
        </Link>
        <div className="flex flex-wrap justify-center sm:justify-end gap-3 text-[#777777] font-mooxy text-[14px]">
          <p
            className="bg-[#191919] text-white px-4 py-[6px] rounded-full cursor-pointer"
            onClick={() =>
              setActiveTab(activeTab === "search" ? "home" : "search")
            }
          >
            Search Student
          </p>
        </div>
      </div>

      {/* Search Box */}
      {activeTab === "search" && (
        <div className="bg-[#0D0D0D] w-[800px] mx-auto mt-4 rounded-[20px] overflow-hidden">
          <input
            type="text"
            placeholder="Search by Name or Reg No."
            className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      {/* Student List */}
      {activeTab === "home" || activeTab === "search" ? (
        <ol className="flex flex-col items-center">
          {filteredStudents.map((stu) => (
            <div key={stu._id} className="w-full flex flex-col items-center">
              <li className="w-[960px] h-[40px] mt-4 flex items-center justify-between text-white px-4 rounded bg-[#111]">
                <div className="w-[200px] text-left font-mooxy">
                  <span className="font-radonregular">Name:</span> {stu.name}
                </div>
                <div className="w-[300px] text-left">
                  <span className="font-radonregular">Registration Number:</span>{" "}
                  {stu.registrationNumber}
                </div>
                <div className="bg-white text-black w-[200px] h-[30px] rounded text-center flex items-center justify-center">
                  <button
                    className="font-mooxy"
                    onClick={() => handleViewRequests(stu._id)}
                  >
                    {expand === stu._id ? "Hide Requests" : "View Requests"}
                  </button>
                </div>
              </li>

              {expand === stu._id && (
                <div className="w-[960px] bg-[#111] rounded-[10px] mt-3 p-3 text-white">
                  {leaves.length > 0 ? (
                    <ul>
                      {leaves.map((leave) => (
                        <li key={leave._id} className="mb-2">
                          <strong>{leave.subject}</strong> — {leave.status}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No leave requests found</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </ol>
      ) : null}

    </>
  );
};

export default Students;
