// This component displays the editing interface after the user
// clicks on the "new note" button or an existing note.

/* eslint-disable react/prop-types */ //DO NOT REMOVE THIS LINE

import './NoteEditWindow.css'
import {useEffect, useState} from "react";
import App from "../App.jsx";

function NoteEditWindow(props) {
    const [type, setType] = useState("new");
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [category, setCategory] = useState('')
    const [isPinned, setIsPinned] = useState(false)
    const [colour, setColour] = useState('') //unused at the moment

    useEffect(() => {
        setType(props.Type || type);
        setTitle(props.Title || title);
        setBody(props.Body || body);
        setCategory(props.Category || category);
        setIsPinned(props.Pinned || isPinned);
    }, [])

    const togglePin = () => {
        setIsPinned(!isPinned);
    }

    const getPinImage = () => {
        return isPinned
            ? "https://img.icons8.com/?size=100&id=9JrqhYs9ejP6&format=png&color=000000" // Black pin
            : "https://img.icons8.com/?size=100&id=0BngLkWjYAnC&format=png&color=000000"; // White pin
    }


    function handleSubmitClick() {
        const noteData = {
            type,
            title,
            body,
            category,
            isPinned
        }
        if (title && body) {
            console.log("Sending to App.jsx: ", noteData);
            props.EditWindowData(noteData);
        }
    }

    return (
        <>
            <div className="overlay">
                <div className="editor-container">
                    <div className="window-header">
                        <div className="header-spacer-left" />
                        <div className="header">{(type === "new" ? "Create New Note" : "Edit Note")}</div>
                        <div>
                            <button className="close-button" onClick={() => props.onExitClick(false)} />
                        </div>
                    </div>
                    <div className="title-container">
                        <div><input className="title-input"
                                    type="text"
                                    placeholder="Title..."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                        /></div>
                        <button id="edit-pin"
                                onClick={togglePin}
                                className={isPinned === true ? "edit-pin-on" : "edit-pin-off"}
                                style={{backgroundImage: `url(${getPinImage()})`}}
                        />
                    </div>
                    <div className="body-container">
                        <textarea className="body-input"
                                  type="text"
                                  placeholder="Description..."
                                  value={body}
                                  onChange={(e) => setBody(e.target.value)}
                        />
                    </div>
                    <div className="category-container">
                        <input className="category-input"
                               type="text"
                               placeholder="Category..."
                               value={category}
                               onChange={(e) => setCategory(e.target.value)}
                        />
                        <button className='submit-button' onClick={() => {handleSubmitClick()}}>
                            {type === "new" ? "CREATE" : "SAVE"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteEditWindow;