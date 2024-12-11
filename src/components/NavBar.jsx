// This component displays the top navigation bar, encapsulating the logo,
// logo name, search bar, and filter and handle their actions.
// This is separate from the sidebar mainly to make it easier (hopefully) when configuring the CSS
// regarding flex containers and items and stuff.

/* eslint-disable react/prop-types */ //DO NOT REMOVE THIS LINE

import {useState, useEffect} from "react";
import "./NavBar.css";

function NavBar(props) {
    const [query, setQuery] = useState("");

    // This detects changes in the search bar and sends the query back to App.jsx to be filtered
    useEffect(() => {
        (query.trim() === ""
            ? props.searchResults(null)
            : props.searchResults(query));
    }, [query]);

    return (
        <>
            <div className={"navbar"}
                 style={{
                     fontFamily: "Roboto",
                     fontSize: "1.3em",
                 }}>
                {/*<button className="burger-menu"/>*/} {/*deprecated for now*/}
                <button className="logo-icon" onClick={() => props.CRUD({"CRUD" : "refresh"})} />
                <h1 className="app-name">n∘ta.</h1>
                <button className="refresh-btn"
                        onClick={() => props.CRUD({"CRUD" : "refresh"})}
                />
                <input className="search-bar"
                       type="text"
                       placeholder="Search notes..."
                       value={query} // a red warning may show in console regarding 'uncontrolled input', disregard it.
                       onChange={(e) => setQuery(e.target.value)}
                />
            </div>
        </>
    );
}

export default NavBar;