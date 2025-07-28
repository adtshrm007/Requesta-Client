import { motion } from "motion/react";

const sections = [
  {
    title: "Easy leave requests.",
    desc: "Apply for leaves swiftly with a simple digital form.",
    reverse: false,
  },
  {
    title: "Track status.",
    desc: "Get real-time updates on your application progress.",
    reverse: true,
  },
  {
    title: "Download certificates.",
    desc: "Instantly access and download approved certificates.",
    reverse: false,
  },
];

const MainSection = () => {
  return (
    <div className="main_section w-full max-w-screen-lg mx-auto flex flex-col items-center gap-12 font-radonregular px-4 py-8 " id="about">
      {sections.map((sec, index) => (
        <motion.div
          key={index}
          className={`flex flex-col-reverse md:flex-row ${
            sec.reverse ? "md:flex-row-reverse" : ""
          } items-center justify-between w-full gap-8`}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            duration: 1.5,
            ease: "easeInOut",
          }}
        >
          {/* Text Section */}
          <div className="flex-1 text-center md:text-left flex flex-col justify-center items-center md:items-start gap-4">
            <p className="text-white text-[24px] md:text-[32px] font-bold">
              {sec.title}
            </p>
            <p className="text-[#777777] text-[14px] md:text-[15px] font-medium max-w-[360px]">
              {sec.desc}
            </p>
          </div>

          {/* Image Placeholder */}
          <div className="flex-1 w-full max-w-[480px] h-[280px] md:h-[400px] lg:h-[480px] rounded-[20px] bg-[#0D0D0D] shadow-md"></div>
        </motion.div>
      ))}
    </div>
  );
};

export default MainSection;
