import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getStudents } from "../utils/GETAllStudents";

const Students = () => {
  const initialStudents = [];

  const [home, setHome] = useState(true);
  const [addStudent, setAddStudent] = useState(false);
  const [searchStudent, setSearchStudent] = useState(false);
  const [search, setSearch] = useState("");
  const [studentsList, setStudentsList] = useState(initialStudents);
  const [filteredStudents, setFilteredStudents] = useState(initialStudents);
  const [applyFilters, setApplyFilters] = useState(false);

  const [mainStudent, setMainStudent] = useState({
    registrationNumber: "",
    name: "",
    mobile_no: "",
    branch: "",
    batch: "",
  });

  const [extraStudents, setExtraStudents] = useState([]);

  useEffect(() => {
    if (searchStudent) {
      const results = studentsList.filter(
        (student) =>
          student.name.toLowerCase().includes(search.toLowerCase()) ||
          student.registrationNumber.toString().includes(search)
      );
      setFilteredStudents(results);
    } else {
      setFilteredStudents(studentsList);
    }
  }, [search, studentsList, searchStudent]);

  const handleClickOnAddStudent = () => {
    setHome(!home);
    setAddStudent(!addStudent);
    setSearchStudent(false);
  };

  const handleClickOnSearchStudent = () => {
    setHome(true);
    setAddStudent(false);
    setSearchStudent(!searchStudent);
  };
  const handleClickOnApplyFilters = () => {
    setHome(true);
    setAddStudent(false);
    setSearchStudent(false);
    setApplyFilters(!applyFilters);
  };

  const handleClickOnAddMoreStudents = () => {
    setExtraStudents((prev) => [
      ...prev,
      {
        registrationNumber: "",
        name: "",
        mobile_no: "",
        branch: "",
        batch: "",
      },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStudents = [
      {
        id: Date.now(),
        name: mainStudent.name,
        registrationNumber: mainStudent.registrationNumber,
      },
      ...extraStudents.map((student, i) => ({
        id: Date.now() + i + 1,
        name: student.name,
        registrationNumber: student.registrationNumber,
      })),
    ];
    setStudentsList((prev) => [...prev, ...newStudents]);
    setMainStudent({
      registrationNumber: "",
      name: "",
      mobile_no: "",
      branch: "",
      batch: "",
    });
    setExtraStudents([]);
    setHome(true);
    setAddStudent(false);
    setSearchStudent(false);
  };

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await getStudents();
      setStudentsList(res);
    };
    fetchStudents();
  }, []);

  return (
    <>
      {/* Header */}
      <div className="w-full max-w-[960px] mx-auto  items-center justify-between px-4 py-4 text-white">
        <Link to="/">
          <div className="flex items-center font-growmajour text-[22px] cursor-pointer mb-2 sm:mb-0">
            <img src={logo} alt="logo" className="w-[25px] h-[25px] mr-2" />
            <p>REQUESTA</p>
          </div>
        </Link>
        <div className="flex flex-wrap justify-center sm:justify-end gap-3 text-[#777777] font-mooxy text-[14px]">
          <p
            className="bg-white text-black px-4 py-[6px] rounded-full cursor-pointer"
            onClick={handleClickOnAddStudent}
          >
            Add Student(s)
          </p>

          <p
            className="bg-[#191919] text-white px-4 py-[6px] rounded-full cursor-pointer"
            onClick={handleClickOnSearchStudent}
          >
            Search Student
          </p>
          <p
            className="bg-white text-black px-4 py-[6px] rounded-full cursor-pointer"
            onClick={handleClickOnApplyFilters}
          >
            Apply Filter(s)
          </p>
        </div>
        {applyFilters && (
          <div className="bg-slate-500 w-[200px] h-[200px] justify-self-end mt-5 ml-20"></div>
        )}
      </div>

      {/* Search Box */}
      {searchStudent && (
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
      {home && (
        <ol className="flex flex-col items-center">
          {filteredStudents.map((stu) => (
            <li
              key={stu._id}
              className="w-[960px] h-[40px] justify-self-center mt-4 flex items-center justify-between text-white px-4 rounded bg-[#111]"
            >
              <div className="w-[200px] text-left font-mooxy">
                <span className="font-radonregular">Name:</span> {stu.name}
              </div>
              <div className="w-[300px] text-left">
                <span className="font-radonregular">Registration Number:</span>{" "}
                {stu.registrationNumber}
              </div>
              <div className="bg-white text-black w-[200px] h-[30px] rounded text-center flex items-center justify-center">
                <button className="font-mooxy">View Requests</button>
              </div>
            </li>
          ))}
        </ol>
      )}

      {/* Add Student Form */}
      {addStudent && (
        <div className="min-h-screen bg-[#0D0D0D] text-white px-6 py-12 flex flex-col gap-12 items-center font-sans">
          <div className="bg-[#1A1A1A] p-8 rounded-2xl w-full max-w-xl shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-center font-radonregular">
              Add Student(s)
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 font-mooxy"
            >
              {/* Main Student Inputs */}
              {[
                "name",
                "registrationNumber",
                "mobile_no",
                "branch",
                "batch",
              ].map((field) => (
                <label key={field}>
                  {field
                    .split("_")
                    .join(" ")
                    .replace(/^\w/, (c) => c.toUpperCase())}
                  :
                  <input
                    className="mt-1 p-3 w-full h-[35px] rounded-lg bg-[#2A2A2A]"
                    value={mainStudent[field]}
                    onChange={(e) =>
                      setMainStudent({
                        ...mainStudent,
                        [field]: e.target.value,
                      })
                    }
                    required={field !== "mobile_no" && field !== "batch"}
                  />
                </label>
              ))}

              {/* Extra Students */}
              {extraStudents.map((student, index) => (
                <div key={index} className="mt-6 border-t border-gray-600 pt-4">
                  {[
                    "name",
                    "registrationNumber",
                    "mobile_no",
                    "branch",
                    "batch",
                  ].map((field) => (
                    <label key={field}>
                      {field
                        .split("_")
                        .join(" ")
                        .replace(/^\w/, (c) => c.toUpperCase())}
                      :
                      <input
                        className="mt-1 p-3 w-full h-[35px] rounded-lg bg-[#2A2A2A]"
                        value={student[field]}
                        onChange={(e) => {
                          const updated = [...extraStudents];
                          updated[index][field] = e.target.value;
                          setExtraStudents(updated);
                        }}
                      />
                    </label>
                  ))}
                </div>
              ))}

              <p
                className="font-radonregular transition-all text-white font-semibold py-2 px-4 rounded-lg mt-4 cursor-pointer text-right"
                onClick={handleClickOnAddMoreStudents}
              >
                <span className="text-[25px]">+</span> Add one more Student
              </p>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 font-radonregular text-white py-2 px-4 rounded-lg mt-4"
              >
                Add Student(s)
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Students;
