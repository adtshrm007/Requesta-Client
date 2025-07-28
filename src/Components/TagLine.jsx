import { Link } from "react-router-dom";
import { motion } from "motion/react";
const TagLine = () => {
  const tagline1 = "Leave & Certificate Portal.";
  const tagline2 = "Apply smart. Track fast.";

  return (
    <motion.div
      className="tagline w-[960px] h-[500px]  justify-self-center flex flex-col justify-center text-center"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        duration: 5,
        ease: "easeInOut",
      }}
      id="start"
    >
      <div className="tagline_1 h-[40px] text-white text-[40px] font-growmajour">
        {tagline1}
      </div>
      <div className="tagline_1 h-[40px] text-[#777777] text-[40px] font-radon">
        {tagline2}
      </div>
      <div className="tagline_1 h-[40px] mt-10 flex justify-center items-center gap-5 font-mooxy">
        <Link to="/adminlogin">
          <motion.button className="admin_login bg-white w-[120px] h-[30px] rounded-[100px] text-[14px] text-center cursor-pointer" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            Login as Admin
          </motion.button>
        </Link>
        <Link to="/studentlogin">
          <motion.button className="student_login bg-[#191919] w-[120px] h-[30px] rounded-[100px] text-[14px] text-center text-white cursor-pointer" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            Login as Student
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default TagLine;
