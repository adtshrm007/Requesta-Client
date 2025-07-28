import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const Students = () => {
  const initialStudents = [
    { id: 1, registrationNumber: 123456789, name: "Aditya Sharma" },
    { id: 2, registrationNumber: 123456789, name: "Aditya Sharma" },
    { id: 3, registrationNumber: 123456789, name: "Aditya Sharma" },
    { id: 4, registrationNumber: 123456789, name: "Aditya Sharma" },
    { id: 5, registrationNumber: 123456789, name: "Aditya Sharma" },
  ];

  const [home, setHome] = useState(true);
  const [addStudent, setAddStudent] = useState(false);
  const [searchStudent, setSearchStudent] = useState(false);
  const [removeStudent, setRemoveStudent] = useState(false);

  const [studentsList, setStudentsList] = useState(initialStudents);
  const [mainStudent, setMainStudent] = useState({
    registrationNumber: "",
    branch: "",
    batch: "",
  });

  const [extraStudents, setExtraStudents] = useState([]);

  // Navigation Handlers
  function handleClickOnAddStudent() {
    setHome(false);
    setAddStudent(true);
    setSearchStudent(false);
    setRemoveStudent(false);
  }

  function handleClickOnSearchStudent() {
    setHome(false);
    setAddStudent(false);
    setSearchStudent(true);
    setRemoveStudent(false);
  }

  function handleClickOnRemoveStudent() {
    setHome(false);
    setAddStudent(false);
    setSearchStudent(false);
    setRemoveStudent(true);
  }

  // Add More Student Forms
  function handleClickOnAddMoreStudents() {
    setExtraStudents([
      ...extraStudents,
      { registrationNumber: "", branch: "", batch: "" },
    ]);
  }

  // Handle Form Submission
  function handleSubmit(e) {
    e.preventDefault();
    const allNewStudents = [
      {
        id: Date.now(),
        name: "New Student",
        registrationNumber: mainStudent.registrationNumber,
      },
      ...extraStudents.map((s, i) => ({
        id: Date.now() + i + 1,
        name: "New Student",
        registrationNumber: s.registrationNumber,
      })),
    ];
    setStudentsList([...studentsList, ...allNewStudents]);
    setMainStudent({ registrationNumber: "", branch: "", batch: "" });
    setExtraStudents([]);
    setHome(true);
    setAddStudent(false);
  }

  return (
    <>
      {/* Header */}
      <div className="w-full max-w-[960px] mx-auto flex flex-col sm:flex-row items-center justify-between px-4 py-4 text-white">
        <Link to="/">
          <div className="flex items-center font-growmajour text-[22px] cursor-pointer mb-2 sm:mb-0">
            <img src={logo} alt="logo" className="w-[25px] h-[25px] mr-2" />
            <p>REQUESTA</p>
          </div>
        </Link>

        {/* Navigation */}
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
          <Link to="/students">
            <p className="bg-white text-black px-4 py-[6px] rounded-full cursor-pointer" onClick={handleClickOnRemoveStudent}>
              Remove Student(s)
            </p>
          </Link>
        </div>
      </div>

      {/* Student List */}
      {home &&
        studentsList.map((stu) => (
          <div
            key={stu.id}
            className="bg-slate-700 w-[960px] h-[40px] justify-self-center mt-4 flex items-center justify-between text-white px-4 rounded"
          >
            <div className="w-[200px] text-center font-mooxy">
              <span className="font-radonregular">Name:</span> {stu.name}
            </div>
            <div className="w-[300px]">
              Registration Number: {stu.registrationNumber}
            </div>
            <div className="bg-slate-400 w-[200px] h-[30px] rounded"></div>
          </div>
        ))}

      {/* Add Student Form */}
      {addStudent && (
        <div className="min-h-screen bg-[#0D0D0D] text-white px-6 py-12 flex flex-col gap-12 items-center font-sans">
          <div className="bg-[#1A1A1A] p-8 rounded-2xl w-full max-w-xl shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-center font-radonregular">
              Add Student(s)
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-mooxy">
              {/* Main Student */}
              <label className="text-sm font-medium ">
                Student's Registration No:
                <input
                  className="mt-1 p-3 w-full h-[35px] rounded-lg bg-[#2A2A2A] text-white focus:outline-none"
                  placeholder="Registration Number..."
                  required
                  value={mainStudent.registrationNumber}
                  onChange={(e) =>
                    setMainStudent({ ...mainStudent, registrationNumber: e.target.value })
                  }
                />
              </label>
              <label className="text-sm font-medium ">
                Student's Branch
                <input
                  className="mt-1 p-3 w-full h-[35px] rounded-lg bg-[#2A2A2A] text-white focus:outline-none"
                  placeholder="Branch"
                  required
                  value={mainStudent.branch}
                  onChange={(e) =>
                    setMainStudent({ ...mainStudent, branch: e.target.value })
                  }
                />
              </label>
              <label className="text-sm font-medium">
                Batch Year:
                <input
                  type="text"
                  className="mt-1 bg-[#2A2A2A] text-white p-2 rounded-lg w-full"
                  placeholder="eg-2024-2028"
                  required
                  value={mainStudent.batch}
                  onChange={(e) =>
                    setMainStudent({ ...mainStudent, batch: e.target.value })
                  }
                />
              </label>

              {/* Additional Students */}
              {extraStudents.map((student, index) => (
                <div key={index} className="mt-6 border-t border-gray-600 pt-4">
                  <label className="text-sm font-medium">
                    Student's Registration No:
                    <input
                      className="mt-1 p-3 w-full h-[35px] rounded-lg bg-[#2A2A2A] text-white focus:outline-none"
                      placeholder="Registration Number..."
                      required
                      value={student.registrationNumber}
                      onChange={(e) => {
                        const updated = [...extraStudents];
                        updated[index].registrationNumber = e.target.value;
                        setExtraStudents(updated);
                      }}
                    />
                  </label>
                  <label className="text-sm font-medium">
                    Student's Branch
                    <input
                      className="mt-1 p-3 w-full h-[35px] rounded-lg bg-[#2A2A2A] text-white focus:outline-none"
                      placeholder="Branch"
                      required
                      value={student.branch}
                      onChange={(e) => {
                        const updated = [...extraStudents];
                        updated[index].branch = e.target.value;
                        setExtraStudents(updated);
                      }}
                    />
                  </label>
                  <label className="text-sm font-medium">
                    Batch Year:
                    <input
                      type="text"
                      className="mt-1 bg-[#2A2A2A] text-white p-2 rounded-lg w-full"
                      placeholder="eg-2024-2028"
                      required
                      value={student.batch}
                      onChange={(e) => {
                        const updated = [...extraStudents];
                        updated[index].batch = e.target.value;
                        setExtraStudents(updated);
                      }}
                    />
                  </label>
                </div>
              ))}
              

              

              {/* Add More Students Button */}
              <p
                className="hover:text-bg-slate-800 font-radonregular transition-all text-white font-semibold py-2 px-4 rounded-lg mt-4 cursor-pointer text-right"
                onClick={handleClickOnAddMoreStudents}
              >
                <span className="text-[25px]">+</span> Add one more Student
              </p>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 font-radonregular transition-all text-white font-semibold py-2 px-4 rounded-lg mt-4"
              >
                Add Student(s)
              </button>
            </form>
          </div>
        </div>
      )}

      {removeStudent&&<>
      <form ></form>
      </>}
    </>
  );
};

export default Students;
