import { useState } from "react";
import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="header max-w-[1200px] w-full px-4 md:px-8 h-[64px] mx-auto flex items-center justify-between text-white relative">
      {/* Logo */}
      <Link to="/">
        <motion.div
          className="logo_name flex items-center font-growmajour text-[20px] md:text-[22px] cursor-pointer"
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
          <img src={logo} alt="logo" className="w-6 h-6 mr-2 relative bottom-1" />
          <p>REQUESTA</p>
        </motion.div>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center justify-around gap-6 text-[#777777] font-[500] text-[14px] md:text-[15px] font-mooxy">
        {["Home", "About", "Help", "Contact"].map((item, i) =>
          item === "About" ? (
            <ScrollLink key={i} to="about" smooth={true} duration={600} offset={-40}>
              <motion.p
                className="cursor-pointer"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                {item}
              </motion.p>
            </ScrollLink>
          ) : (
            <motion.p
              key={i}
              className="cursor-pointer"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              {item}
            </motion.p>
          )
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-[#777777] text-2xl focus:outline-none"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-[64px] left-0 w-full bg-[#0D0D0D] flex flex-col items-center py-4 gap-4 text-[#777777] font-mooxy z-50"
        >
          <p className="cursor-pointer" onClick={toggleMenu}>
            Home
          </p>
          <ScrollLink
            to="about"
            smooth={true}
            duration={600}
            offset={-40}
            onClick={toggleMenu}
          >
            <p className="cursor-pointer">About</p>
          </ScrollLink>
          <p className="cursor-pointer" onClick={toggleMenu}>
            Help
          </p>
          <p className="cursor-pointer" onClick={toggleMenu}>
            Contact
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Header;
