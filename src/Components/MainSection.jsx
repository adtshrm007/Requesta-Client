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
    <div
      className="main_section w-full max-w-screen-lg mx-auto flex flex-col items-center gap-12 lg:gap-16 font-radonregular px-4 py-12"
      id="about"
    >
      {sections.map((sec, index) => (
        <motion.div
          key={index}
          className={`flex flex-col-reverse md:flex-row ${
            sec.reverse ? "md:flex-row-reverse" : ""
          } items-center justify-between w-full gap-8`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, duration: 1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Text Section */}
          <div className="flex-1 text-center md:text-left flex flex-col justify-center items-center md:items-start gap-4">
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 text-[24px] md:text-[32px] font-extrabold tracking-wide">
              {sec.title}
            </p>
            <p className="text-gray-400 text-[14px] md:text-[16px] leading-relaxed max-w-[380px]">
              {sec.desc}
            </p>
          </div>

          {/* Image Placeholder */}
          <div className="flex-1 w-full max-w-[480px] h-[280px] md:h-[400px] lg:h-[480px] rounded-[20px] bg-gradient-to-tr from-[#0D0D0D] via-[#1C1C1C] to-[#2A2A2A] shadow-xl"></div>
        </motion.div>
      ))}
    </div>
  );
};

export default MainSection;
