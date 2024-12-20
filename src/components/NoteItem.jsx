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
        // setColor(getRandomHexColor());
        let noteData = props.noteData;
        if (noteData) {
            setId(noteData._id);
            setCreationDate(formatDateTime(noteData.CreationDate));
            setModifiedDate(formatDateTime(noteData.ModifiedDate));
            setTitle(noteData.Title);
            setBody(noteData.Body);
            setCategory(noteData.Category);
            setIsPinned(noteData.Pinned);
            setColor(noteData.Color);
        } else {
            setColor(getRandomHexColor());
        }
    }, [props.noteData])

    // This only applies when the 'new note' btn is clicked.
    // A random hex color will be set each time the edit window opens.
    useEffect(() => {
        setColor(getRandomHexColor());
    }, [editWindowVisible]);

    // This reformats the ISODate from MongoDB into a more readable format
    const formatDateTime = (isoDate) => {
        if (!isoDate) return null;
        const dateObj = new Date(isoDate);
        const date = dateObj.toLocaleDateString(); // MM/DD/YYYY or whatever the local format is
        const time = dateObj.toLocaleTimeString(); // 00:00:00 AM/PM
        return `${time} - ${date}`;
    };

    // Called to choose a random color in hexadecimal format
    const getRandomHexColor = () => {
        const colors = ["#F0EBD9", "#F5DEB3", "#799B7A", "#B9E1DB", "#EFA3B1", "#F2D519"]
        return colors[Math.floor(Math.random() * colors.length)];
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
            ? "https://img.icons8.com/?size=100&id=9JrqhYs9ejP6&format=png&color=000000" // Pinned
            : "https://img.icons8.com/?size=100&id=0BngLkWjYAnC&format=png&color=000000"; // Unpinned
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

    return (
        <>
            {editWindowVisible === true
                ? <NoteEditWindow
                    Type={type}
                    noteData={props.noteData}
                    color={color}
                    onExitClick={setEditWindowVisible}
                    CRUD={handleEditWindowSubmit}/>
                : null
            }
            {type === "new"
                ? // for the 'new' ghost note
                <>
                    <div className='newNoteContainer'
                         onClick={() => setEditWindowVisible(true)}
                         style={{...props.style}}
                    />
                </>
                : // for existing notes
                <>
                    <div className="noteItemContainer"
                         style={{
                             ...props.style,
                             // backgroundColor: "wheat"
                             backgroundColor: color
                         }}>
                        <div className='timeStamp'>Edited: {modifiedDate}</div>
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
            }
        </>
    )
}

export default NoteItem
