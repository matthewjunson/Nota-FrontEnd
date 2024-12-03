// This component displays the editing interface after the user
// clicks on the "new note" button or an existing note.

/* eslint-disable react/prop-types */ //DO NOT REMOVE THIS LINE

import './NoteEditWindow.css'
import {useEffect, useState} from "react";

function NoteEditWindow(props) {
    const [noteType, setNoteType] = useState("new");
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [category, setCategory] = useState('')
    const [isPinned, setIsPinned] = useState(false)
    const [colour, setColour] = useState('')

    // useEffect(() => {
    //     setTitle(props.Title);
    //     setBody(props.Body);
    //     setCategory(props.Category);
    //     setIsPinned(props.Pinned);
    // }, [])

    const getHeader = () => {
        return (noteType === "new" ? "Create New Note" : "Edit Note");
    }

    const togglePin = () => {
        setIsPinned(!isPinned);
        // props.Pinned(isPinned);
    }

    const getPinImage = () => {
        return isPinned
            ? "https://img.icons8.com/?size=100&id=9JrqhYs9ejP6&format=png&color=000000" // Black pin
            : "https://img.icons8.com/?size=100&id=0BngLkWjYAnC&format=png&color=000000"; // White pin
    }

    function getWindow() {

    }

    return (
        <>
            <div className="overlay">
                <div className="editor-container">
                    <div className="window-header">
                        <div className="header-spacer-left" />
                        <div>{getHeader()}</div>
                        <div>
                            <button className="close-button" onClick={() => {props.onExitClick(false)}} />
                        </div>
                    </div>
                    <div className="title-container">
                        <div><input className="title-input" type="text" placeholder="Title..."/></div>
                        <button id="pin"
                                onClick={togglePin}
                                className={isPinned === true ? "pin-on" : "pin-off"}
                                style={{backgroundImage: `url(${getPinImage()})`}}
                        />
                    </div>
                    <div className="body-container">
                        <textarea className="body-input" type="text" placeholder="Description..."/>
                    </div>
                    <div id="category">

                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteEditWindow;