// This component displays the top navigation bar, encapsulating the logo,
// logo name, search bar, and filter and handle their actions.
// This is separate from the sidebar mainly to make it easier (hopefully) when configuring the CSS
// regarding flex containers and items and stuff.

import React from "react";
import "./NavBar.css";

function NavBar() {
    return (
        <div className="navbar">
            {/* Logo Section */}
            <div className="navbar-logo">
                <img src="./assets/icons8-note-keek-16.png" alt="Logo" />
                <h1>Notes App</h1>
            </div>

            {/* Search Bar Section */}
            <div className="navbar-search">
                <input type="text" placeholder="Search notes..." />
                <button>Search</button>
            </div>
        </div>
    );
}

export default NavBar;