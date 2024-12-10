// This component displays the sidebar, encapsulating buttons (Home, User, Refresh, Trash, Logout...)
// and handle their actions.
// This is separate from the top bar mainly to make it easier (hopefully) when configuring the CSS
// regarding flex containers and items and stuff

/* eslint-disable react/prop-types */ //DO NOT REMOVE THIS LINE

/* eslint-disable react/prop-types */ //DO NOT REMOVE THIS LINE

import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Button with class burger-menu */}
      <button className="burger-menu" onClick={toggleSidebar}>
        &#9776; {/* Hamburger menu icon */}
      </button>

      {/* Sidebar that toggles visibility */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul className="menu">
          <li className="menu-item">
            <i className="icon home-icon"></i> All Notes
          </li>
          <li className="menu-item">
            <i className="icon pinned-icon"></i> Pinned Notes
          </li>
          <li className="menu-item">
            <i className="icon archived-icon"></i> Archived Notes
          </li>
          <li className="menu-item">
            <i className="icon trash-icon"></i> Trash
          </li>
          <li className="menu-item logout">
            <i className="icon logout-icon"></i> Logout
          </li>
        </ul>
      </div>
      
      {/* Overlay to close the sidebar */}
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;

