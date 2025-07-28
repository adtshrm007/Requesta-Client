import { Link as ScrollLink } from "react-scroll"
const StartSection = () => {
  return (
    <div className="w-full min-h-[400px] px-4 py-16 flex flex-col items-center justify-center gap-8 ">
      <div className="text-center max-w-screen-md">
        <h2 className="text-white font-radonregular font-bold text-[28px] md:text-[32px]">
          Start now.
        </h2>
        <p className="text-[#777777] font-[Aboreto] text-[18px] md:text-[22px] mt-2 leading-snug">
          Streamline your application <br className="hidden md:block" />
          process.
        </p>
      </div>

      <ScrollLink to="start" smooth={true} duration={600} offset={-40}><button className="bg-white text-black px-6 py-2 rounded-full font-[Cabin] text-sm md:text-base shadow-md hover:scale-105 cursor-pointer">
        Get Started
      </button></ScrollLink>
    </div>
  );
};

export default StartSection;
