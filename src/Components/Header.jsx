import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // corrected import path
import { Link as ScrollLink } from "react-scroll"

const Header = () => {
  const option = [
    { id: 1, name: "Home" ,link:"/"},
    { id: 2, name: "About" },
    { id: 3, name: "Help" },
    { id: 4, name: "Contact" },
  ];

  return (
    <div className="header w-[960px] h-[64px] justify-self-center flex items-center justify-between text-white ">
      <Link to="/">
        <motion.div
          className="logo_name w-[110px] h-[16px] text-center font-[100] font-growmajour text-[22px] flex cursor-pointer"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            type: "spring",
            stiffness: 100,
            duration: 5,
            ease: "easeInOut",
          }}
        >
          <img src={logo} alt="logo" className="size-[25px] mr-[4px]" />
          <p>REQUESTA</p>
        </motion.div>
      </Link>

      <div className="nav_links flex items-center justify-around w-[400px] text-[#777777] text-center font-[500] text-[15px] font-mooxy">
          <motion.p
            
            className="nav_link1 w-[60px] h-[20px] cursor-pointer"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{
              duration: 0.8,
              delay:0.3,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            Home
          </motion.p>
          <ScrollLink to="about" smooth={true} duration={600} offset={-40}><motion.p
            
            className="nav_link1 w-[60px] h-[20px] cursor-pointer"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{
              duration: 0.8,
              delay:0.3,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            About
          </motion.p>
          </ScrollLink>
          <motion.p
            
            className="nav_link1 w-[60px] h-[20px] cursor-pointer"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{
              duration: 0.8,
              delay:0.3,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            Help
          </motion.p>
          <motion.p
            
            className="nav_link1 w-[60px] h-[20px] cursor-pointer"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{
              duration: 0.8,
              delay:0.3,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            Contact
          </motion.p>
      </div>
    </div>
  );
};

export default Header;
