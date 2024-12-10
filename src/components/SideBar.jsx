// This component displays the sidebar, encapsulating buttons (Home, User, Refresh, Trash, Logout...)
// and handle their actions.
// This is separate from the top bar mainly to make it easier (hopefully) when configuring the CSS
// regarding flex containers and items and stuff

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
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Contact</li>
        </ul>
      </div>
      {/* Overlay to close the sidebar */}
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;

