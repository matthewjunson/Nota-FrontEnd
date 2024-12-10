// This component displays the top navigation bar, encapsulating the logo,
// logo name, search bar, and filter and handle their actions.
// This is separate from the sidebar mainly to make it easier (hopefully) when configuring the CSS
// regarding flex containers and items and stuff.

/* eslint-disable react/prop-types */ //DO NOT REMOVE THIS LINE

import "./NavBar.css";

function NavBar(props) {
    return (
        <>
            <div className={"navbar"}
                 style={{
                     fontFamily: "Roboto",
                     fontSize: "1.3em",
                 }}>
                <button className="burger-menu"/>
                <button className="logo-icon" onClick={() => props.CRUD({"CRUD" : "refresh"})} />
                <h1 className="app-name">n∘ta.</h1>
                <input className="search-bar" type="text" placeholder="Search notes..."/>
                <button className="search-button"/>
            </div>
        </>
    );
}

export default NavBar;