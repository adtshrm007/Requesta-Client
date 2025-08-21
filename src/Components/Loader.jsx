import React from "react";
          
          const Loader = () => {
            return (
              <div className="flex space-x-1 items-end h-10 m-4 justify-center">
                {[...Array(5)].map((_, i) => {
                  const bounceClass =
                    "w-2 bg-white animate-[bounce_1s_ease-in-out_infinite]";
                  const delayStyle = {
                    animationDelay: (i * 0.2).toString() + "s",
                    height: "100%",
                  };
          
                  return <div key={i} className={bounceClass} style={delayStyle} />;
                })}
              </div>
            );
          };
          
          export default Loader;
