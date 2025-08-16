import { Link } from "react-router-dom";
import { motion } from "motion/react";
const TagLine = () => {
  const tagline1 = "Leave & Certificate Portal.";
  const tagline2 = "Apply smart. Track fast.";

  return (
    <motion.div
      className="tagline w-full max-w-[960px] h-auto min-h-[300px] px-4 justify-self-center flex flex-col justify-center text-center"
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
      {/* Tagline 1 */}
      <div className="tagline_1 text-white text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-growmajour">
        {tagline1}
      </div>

      {/* Tagline 2 */}
      <div className="tagline_1 text-[#777777] text-lg sm:text-xl md:text-3xl lg:text-[40px] font-radon mt-2">
        {tagline2}
      </div>

      {/* Buttons */}
      <div className="tagline_1 mt-8 flex flex-wrap justify-center items-center gap-4 font-mooxy">
        <Link to="/adminlogin">
          <motion.button
            className="admin_login bg-white w-[110px] sm:w-[130px] h-[36px] sm:h-[40px] rounded-full text-sm sm:text-base text-center cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Login as Admin
          </motion.button>
        </Link>
        <Link to="/studentlogin">
          <motion.button
            className="student_login bg-[#191919] w-[110px] sm:w-[130px] h-[36px] sm:h-[40px] rounded-full text-sm sm:text-base text-center text-white cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Login as Student
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default TagLine;
