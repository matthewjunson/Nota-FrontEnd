// This component displays the editing interface after the user
// clicks on the "new note" button or an existing note.

/* eslint-disable react/prop-types */ //DO NOT REMOVE THIS LINE

import './NoteEditWindow.css'
import {useEffect, useState} from "react";
import App from "../App.jsx";

function NoteEditWindow(props) {
    const [type, setType] = useState(null);
    const [_id, setId] = useState(null);
    const [creationDate, setCreationDate] = useState(null)
    const [modifiedDate, setModifiedDate] = useState(null)
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [category, setCategory] = useState('')
    const [isPinned, setIsPinned] = useState(false)
    const [color, setColor] = useState('') //unused at the moment

    useEffect(() => {
        setType(props.Type || "new");
        let noteData = props.noteData;
        if (noteData) {
            setId(noteData._id);
            setCreationDate(noteData.CreationDate);
            setModifiedDate(noteData.ModifiedDate);
            setTitle(noteData.Title || title);
            setBody(noteData.Body || body);
            setCategory(noteData.Category || category);
            setIsPinned(noteData.Pinned || isPinned);
            setColor(noteData.Color);
        }
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
            _id,
            "CRUD": (type === "new" ? "create" : "update"),
            "Title": title,
            "Body": body,
            "Category": category,
            "Pinned": isPinned
        }
        if (title && body) {
            console.log("Sending to App.jsx: ", noteData);
            props.CRUD(noteData);
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