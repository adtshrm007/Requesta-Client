import { motion } from "motion/react";
const MainSection = () => {
  return (
    <>
      <div className="main_section w-[960px] h-[1595px] justify-self-center flex flex-col justify-center gap-2 font-[Aboreto]">
        <motion.div
          className="section_1  w-[960px] h-[480px] flex items-center justify-between"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            duration: 5,
            ease: "easeInOut",
          }}
        >
          <div className="information h-[100px] w-[450px] text-center flex flex-col items-center justify-center gap-16">
            <p className="w-[320px] h-[32px] font-[700] text-[32px] text-white text-left">
              Easy leave requests.
            </p>
            <p className="w-[320px] h-[53px] text-left flex-wrap font-[500] text-[15px] text-[#777777]">
              Apply for leaves swiftly with a simple digital form.
            </p>
          </div>
          <div className="demo_image w-[480px] h-[480px] rounded-[20px] bg-[#0D0D0D]"></div>
        </motion.div>
        <motion.div
          className="section_2 w-[960px] h-[480px] flex items-center justify-between"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            duration: 5,
            ease: "easeInOut",
          }}
        >
          <div className="demo_image w-[480px] h-[480px] rounded-[20px] bg-[#0D0D0D]"></div>
          <div className="information h-[100px] w-[450px] text-center flex flex-col items-center justify-center gap-4">
            <p className="w-[320px] h-[32px] font-[700] text-[32px] text-white text-left">
              Track status.
            </p>
            <p className="w-[320px] h-[53px] text-left flex-wrap font-[500] text-[15px] text-[#777777]">
              Get real-time updates on your application progress.
            </p>
          </div>
        </motion.div>
        <motion.div
          className="section_3 w-[960px] h-[480px] flex items-center justify-between"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            duration: 5,
            ease: "easeInOut",
          }}
        >
          <div className="information  h-[100px] w-[450px] text-center flex flex-col items-center justify-center gap-16">
            <p className="w-[360px] h-[32px] font-[700] text-[32px] text-white text-left">
              Download certificates.
            </p>
            <p className="w-[360px] h-[53px] text-left flex-wrap font-[500] text-[15px] text-[#777777]">
              Instantly access and download approved certificates.
            </p>
          </div>
          <div className="demo_image w-[480px] h-[480px] rounded-[20px] bg-[#0D0D0D]"></div>
        </motion.div>
      </div>
    </>
  );
};
export default MainSection;
