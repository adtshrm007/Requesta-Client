import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Correct import from 'framer-motion'

const TagLine = () => {
  const tagline1 = "Leave & Certificate Portal.";
  const tagline2 = "Apply smart. Track fast.";

  return (
    <motion.div
      className="tagline w-full max-w-[960px] h-[500px] mx-auto flex flex-col justify-center text-center px-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        duration: 1.5,
        ease: "easeInOut",
      }}
    >
      <div className="text-white text-[32px] sm:text-[40px] font-growmajour mb-2">
        {tagline1}
      </div>
      <div className="text-[#777777] text-[28px] sm:text-[36px] font-radon">
        {tagline2}
      </div>

      <div className="mt-10 flex flex-wrap justify-center items-center gap-5 font-mooxy">
        <Link to="/adminlogin">
          <motion.button
            className="bg-white w-[140px] h-[40px] rounded-full text-[14px] font-semibold text-black shadow-md transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Login as Admin
          </motion.button>
        </Link>

        <Link to="/studentlogin">
          <motion.button
            className="bg-[#191919] w-[140px] h-[40px] rounded-full text-[14px] font-semibold text-white shadow-md transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Login as Student
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default TagLine;
