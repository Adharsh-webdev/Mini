import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../../assets/Logo/Logo.png";

import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <>
      {/* Hamburger ONLY */}
      <div className="mobile-menu" onClick={() => setOpen(true)}>
        <MenuIcon />
      </div>

      {/* Overlay */}
      {open && (
        <div className="sidebar-overlay" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`sidebar-container ${open ? "open" : ""}`}>
        {/* Header visible ONLY inside sidebar */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <img src={Logo} alt="Logo" />
            <h3>Nexus Bank</h3>
          </div>

          <CloseIcon className="sdclose-btn" onClick={() => setOpen(false)} />
        </div>

        <div className={`sidebar-content ${isActive("/dashboard") ? "active" : ""}`}>
          <Link to="/dashboard" onClick={() => setOpen(false)}>
            <HomeIcon sx={{ fontSize: 20 }} /> Dashboard
          </Link>
        </div>

        <div className={`sidebar-content ${isActive("/dashboard/history") ? "active" : ""}`}>
          <Link to="/dashboard/history" onClick={() => setOpen(false)}>
            <AssignmentIcon sx={{ fontSize: 20 }} /> History
          </Link>
        </div>

        <div className={`sidebar-content ${isActive("/dashboard/settings") ? "active" : ""}`}>
          <Link to="/dashboard/settings" onClick={() => setOpen(false)}>
            <SettingsIcon sx={{ fontSize: 20 }} /> Settings
          </Link>
        </div>

        <div className="sidebar-last" onClick={handleLogout}>
          <LogoutIcon sx={{ fontSize: 18 }} /> Sign Out
        </div>
      </div>
    </>
  );
};

export default Sidebar;
