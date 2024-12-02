// This component displays the top navigation bar, encapsulating the logo,
// logo name, search bar, and filter and handle their actions.
// This is separate from the sidebar mainly to make it easier (hopefully) when configuring the CSS
// regarding flex containers and items and stuff.

/* eslint-disable react/prop-types */ //DO NOT REMOVE THIS LINE

import "./NavBar.css";

function NavBar() {
    return (
        <div className="navbar">
            {/* Logo Section */}
                <button className="burger-menu"></button>
                <button className="logo-icon"></button>
                <h1 className="app-name">NOTA</h1>
                <input className="search-bar" type="text" placeholder="Search notes..." />
                <button className="search-button"></button>
        </div>
    );
}

export default NavBar;