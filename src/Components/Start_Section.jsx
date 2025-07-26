const StartSection = () => {
  return (
    <>
      <div className="w-[960px] h-[600px] justify-self-center flex flex-col items-center justify-center gap-10">
        <div className="h-[91px] w-[960px] gap-3 flex flex-col">
          <h2 className="text-[#FFFFFF] font-[700] text-[32px] text-center h-[32px] font-[Cabin]">
            Start now.
          </h2>
          <p className="text-center text-[22px] text-[#777777] font-[Aboreto]">
            Streamline your application <br /> process.
          </p>
        </div>
        <button className="bg-[#FFFFFF] w-[98px] h-[30px] rounded-[100px] font-[Cabin] cursor-pointer">
          Get Started
        </button>
      </div>
    </>
  );
};
export default StartSection;
