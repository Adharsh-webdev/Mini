import React, { useState } from "react";
import "./Header.css";  // ✅ correct
import logo from "../../assets/Logo/Logo.png";
import { HiMenu, HiX } from "react-icons/hi";

import Login from "../../pages/Login/Login";


const Header = ({ setOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openlog, setOpenlog] = useState(false);
  console.log("loin open", openlog)
  return (
    <nav className="myNavbar">
      <div className="myNavbarContainer">

        {/* Logo */}
        <div className="myNavbarLogo">
          <img src={logo} alt="Logo" />
        </div>

        {/* Menu Icon */}
        <div
          className="myNavbarMenuIcon"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </div>

        {/* Right Content */}
        <div className={`myNavbarContent ${isOpen ? "active" : ""}`}>
          <div className="myNavbarActions">
            <button className="myNavbarLoginBtn" onClick={() => setOpenlog(true)}>Login</button>
            {openlog && (
              <Login closelogin={() => setOpenlog(false)} />)}
            <button className="myNavbarGetStartedBtn" onClick={() => setOpen(true)}>Get Started</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;