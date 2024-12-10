// This component displays the editing interface after the user
// clicks on the "new note" button or an existing note.

/* eslint-disable react/prop-types */ //DO NOT REMOVE THIS LINE

import './NoteEditWindow.css'
import {useEffect, useState} from "react";

function NoteEditWindow(props) {
    const [type, setType] = useState(null);
    const [_id, setId] = useState(null);
    const [creationDate, setCreationDate] = useState(null)
    const [modifiedDate, setModifiedDate] = useState(null)
    const [initialTitle, setInitialTitle] = useState('')
    const [initialBody, setInitialBody] = useState('')
    const [initialCategory, setInitialCategory] = useState('')
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [category, setCategory] = useState('')
    const [disableSubmitBtn, setDisableSubmitBtn] = useState(true)
    const [color, setColor] = useState('') //unused at the moment

    useEffect(() => {
        setType(props.Type || "new");
        let noteData = props.noteData;
        if (noteData) {
            setId(noteData._id);
            setCreationDate(formatDateTime(noteData.CreationDate));
            setModifiedDate(formatDateTime(noteData.ModifiedDate));
            setTitle(noteData.Title);
            setBody(noteData.Body);
            setCategory(noteData.Category);
            setInitialTitle(noteData.Title);
            setInitialBody(noteData.Body);
            setInitialCategory(noteData.Category);
            // setColor(noteData.Color);
        }
    }, [])

    // This changes the 'disabled' state of submit-btn based on the values of the text fields.
    // For a new note, it checks if the title AND body fields are not null.
    // When editing an existing note, the title and body are checked for !null but also the
    // title/body/category onChange values are compared to their respective initial values when the
    // NotesEditWindow is opened, and only enable the submit button if their values are different.
    // This prevents redundantly sending a PUT request if no actual changes were made.
    useEffect(() => {
        setDisableSubmitBtn(true); // the button is disabled by default
        if (type === "new") {
            if (title && body) {
                setDisableSubmitBtn(false); // enable the button
            }
        } else {
            if ((title && title !== initialTitle) ||
                (body && body !== initialBody) ||
                (category !== initialCategory)) {
                setDisableSubmitBtn(false); // enable the button
            }
        }
    }, [title, body, category])

    // This reformats the ISODate from MongoDB into a more readable format
    const formatDateTime = (isoDate) => {
        if (!isoDate) return null;
        const dateObj = new Date(isoDate);
        const date = dateObj.toLocaleDateString();
        const time = dateObj.toLocaleTimeString();
        return `${date} ${time}`;
    };

    // When the 'submit' btn is clicked, noteData is compiled with the required info about the
    // new/existing note back to App.jsx through the CRUD property and can make 2 different requests.
    // A POST request will be invoked for a new note. A PUT request will be invoked for an existing note.
    function handleSubmitClick() {
        const noteData = {
            _id, // this value is null for a new note
            "CRUD": (type === "new" ? "create" : "update"),
            "Title": title,
            "Body": body,
            "Category": category // this will be defaulted to 'General' if null
        }
        if (title && body) {
            props.CRUD(noteData);
        }
    }

    return (
        <>
            <div className="overlay">
                <div className="editor-container">
                    <div className="window-header">
                        <div className="header-spacer-left"/>
                        <div className="header">{(type === "new" ? "Create New Note" : "Edit Note")}</div>
                        <div><button className="close-button" onClick={() => props.onExitClick(false)} /></div>
                    </div>
                    <div className="top-container">
                        <input className="title-input"
                               type="text"
                               placeholder="Title"
                               value={title}
                               onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div className="body-container">
                        <textarea className="body-input"
                                  type="text"
                                  placeholder="Description..."
                                  value={body}
                                  onChange={(e) => setBody(e.target.value)}/>
                    </div>
                    <div className="bottom-container">
                        <input className="category-input"
                               type="text"
                               placeholder="Category (optional)"
                               value={category}
                               onChange={(e) => setCategory(e.target.value)}/>
                        <div className="date-stamp">
                            {creationDate ? <div>Created:</div> : null}
                            <div>{creationDate}</div>
                        </div>
                        <button className="submit"
                                disabled={disableSubmitBtn}
                                onClick={() => {handleSubmitClick()}}>
                            {type === "new" ? "CREATE" : "SAVE"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteEditWindow;