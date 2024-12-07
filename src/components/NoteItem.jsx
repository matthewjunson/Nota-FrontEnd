// This component will mainly display the miniaturized sticky notes shown on the NotesBoard
// This will also handle action when mouse clicks on and hovers over the note

/* eslint-disable react/prop-types */ //DO NOT REMOVE THIS LINE
import {useState, useEffect} from 'react'
import NoteEditWindow from "./NoteEditWindow.jsx";

function NoteItem(props) {
    const [type, setType] = useState('');
    const [_id, setId] = useState(null);
    const [creationDate, setCreationDate] = useState(null)
    const [modifiedDate, setModifiedDate] = useState(null)
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [category, setCategory] = useState('')
    const [isPinned, setIsPinned] = useState(false)
    const [color, setColor] = useState('')
    const [editWindowVisible, setEditWindowVisible] = useState(false);

    useEffect(() => {
        setType(props.Type || "new")
        let noteData = props.noteData;
        if (noteData) {
            setId(noteData._id);
            setCreationDate(noteData.CreationDate);
            setModifiedDate(noteData.ModifiedDate);
            setTitle(noteData.Title);
            setBody(noteData.Body);
            setCategory(noteData.Category);
            setIsPinned(noteData.Pinned);
            setColor(noteData.Color || getRandomHexColor());
        }
    }, [props.noteData])

    // this is called by the 'pin' button
    const getPinImage = () => {
        return isPinned
            ? "https://img.icons8.com/?size=100&id=9JrqhYs9ejP6&format=png&color=000000" // Black pin
            : "https://img.icons8.com/?size=100&id=0BngLkWjYAnC&format=png&color=000000"; // White pin
    }

    // called to generate a random light colors in hexadecimal format
    const getRandomHexColor = () => {
        const max = Math.pow(256,3)-1; // equivalent to rgb(255,255,255)
        const min = max / 2;
        const hex = Math.floor((Math.random() * (max - min)) + min).toString(16);
        return `#${hex.padStart(6, '0')}`;
    }

    function handleEditWindowSubmit(noteData) {
        setEditWindowVisible(false);
        props.CRUD(noteData); // sends noteData back to App.jsx to create/update note
    }

    // this changes the PIN icon style
    const togglePin = () => {
        const noteData = {
            _id,
            "CRUD" : "changePinState",
            "Pinned" : !isPinned
        }
        props.CRUD(noteData);
    }

    function handleDeleteBtn() {
        const noteData = {
            _id,
            "CRUD" : "delete"
        }
        // console.log("Sending to App.jsx: ", noteData);
        props.CRUD(noteData);
    }

    // called to generate either the 'new note' button or an existing note
    function GenerateNote () {
        if (type === "new") { //new note
            return (
            <>
                <div className='newNoteContainer' onClick={() => setEditWindowVisible(true)} />
            </>
            )
        } else { //existing note
            return (
            <>
                <div className="noteItemContainer"
                     // style={{backgroundColor: colour}}
                     style={{backgroundColor: "wheat"}}
                >
                    <div className="top">
                        <div className="title">{title}</div>
                        <div>
                            <button id="pin"
                                    onClick={togglePin}
                                    className={isPinned ? "pin-on" : "pin-off"}
                                    style={{backgroundImage: `url(${getPinImage()})`}}/>
                        </div>
                    </div>
                    <div className="body">{body}</div>
                    <div className="footer">
                        <div className="category">{category}</div>
                        <div className="noteButtonMenu">
                            <button id='edit' className='noteButton'
                                    onClick={() => setEditWindowVisible(true)}/>
                            <button id='color' className='noteButton' onClick={props.onClick}/>
                            <button id='reminder' className='noteButton' onClick={props.onClick}/>
                            <button id='trash' className='noteButton' onClick={handleDeleteBtn}/>
                        </div>
                    </div>
                </div>
            </>
            )
        }
    }

    return (
        <>
            {GenerateNote()}
            {editWindowVisible === true
                ? <NoteEditWindow
                    Type={type}
                    noteData={props.noteData}
                    onExitClick={setEditWindowVisible}
                    CRUD={handleEditWindowSubmit}
                />
                : null
            }
        </>
    )
}

export default NoteItem