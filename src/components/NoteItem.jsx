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
            setCreationDate(formatDateTime(noteData.CreationDate));
            setModifiedDate(formatDateTime(noteData.ModifiedDate));
            setTitle(noteData.Title);
            setBody(noteData.Body);
            setCategory(noteData.Category);
            setIsPinned(noteData.Pinned);
            setColor(noteData.Color || getRandomHexColor());
        }
    }, [props.noteData])

    // This reformats the ISODate from MongoDB into a more readable format
    const formatDateTime = (isoDate) => {
        if (!isoDate) return null;
        const dateObj = new Date(isoDate);
        const date = dateObj.toLocaleDateString(); // MM/DD/YYYY or whatever the local format is
        const time = dateObj.toLocaleTimeString(); // 00:00:00 AM/PM
        return `${date} ${time}`;
    };

    // Called to generate a random light colors in hexadecimal format
    const getRandomHexColor = () => {
        const max = Math.pow(256,3)-1; // equivalent to rgb(255,255,255)
        const min = max / 2; // equivalent to rgb(127,127,127)
        const hex = Math.floor((Math.random() * (max - min)) + min).toString(16);
        return `#${hex.padStart(6, '0')}`;
    }

    // NoteEditWindow.jsx behaves like an overlay. When the 'submit' btn is clicked, the overlay is closed and
    // info from the text fields are sent back to App.jsx to make a PUT request and update the record in the DB
    function handleEditWindowSubmit(noteData) {
        setEditWindowVisible(false);
        props.CRUD(noteData); // sends noteData back to App.jsx to create/update note
    }

    // This changes the 'pin' icon style based on its isPinned state
    const getPinImage = () => {
        return isPinned
            ? "https://img.icons8.com/?size=100&id=9JrqhYs9ejP6&format=png&color=000000" // Black pin
            : "https://img.icons8.com/?size=100&id=0BngLkWjYAnC&format=png&color=000000"; // White pin
    }

    // Called when the 'pin' btn is clicked. The changed isPinned state is sent to App.jsx through the
    // CRUD property and will send a PUT request to update ONLY the Pinned value in the note's record
    const handlePinClick = () => {
        const noteData = {
            _id, // the note's ObjectId in MongoDB
            "CRUD" : "changePinState",
            "Pinned" : !isPinned
        }
        props.CRUD(noteData);
    }

    // Called when the 'trash' btn is clicked. A DELETE request is invoked
    // with the note's ObjectID through the CRUD property
    function handleDeleteBtn() {
        const noteData = {
            _id,
            "CRUD" : "delete"
        }
        props.CRUD(noteData);
    }

    // Called to generate either the 'new note' button or an existing note
    function GenerateNote () {
        if (type === "new") { // new note
            return (
            <>
                <div className='newNoteContainer' onClick={() => setEditWindowVisible(true)} />
            </>
            )
        } else { // existing note
            return (
            <>
                <div className="noteItemContainer"
                     // style={{backgroundColor: colour}}
                     style={{backgroundColor: "wheat"}}>
                    <div className='timeStamp'>{modifiedDate}</div>
                    <div className="top">
                        <div className="title">{title}</div>
                        <div>
                            <button id="pin"
                                    onClick={handlePinClick}
                                    className={isPinned ? "pin-on" : "pin-off"}
                                    style={{backgroundImage: `url(${getPinImage()})`}}/>
                        </div>
                    </div>
                    <div className="body">{body}</div>
                    <div className="footer">
                        <div className="category">{category}</div>
                        <div className="noteButtonMenu">
                            <button id='edit'
                                    className='noteButton'
                                    onClick={() => setEditWindowVisible(true)}/>
                            <button id='color'
                                    className='noteButton'
                                    disabled={true}
                                    onClick={props.onClick}/>
                            <button id='reminder'
                                    className='noteButton'
                                    disabled={true}
                                    onClick={props.onClick}/>
                            <button id='trash'
                                    className='noteButton'
                                    onClick={handleDeleteBtn}/>
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
                    CRUD={handleEditWindowSubmit}/>
                : null
            }
        </>
    )
}

export default NoteItem