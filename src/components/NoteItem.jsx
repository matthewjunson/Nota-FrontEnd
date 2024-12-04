// This component will mainly display the miniaturized sticky notes shown on the NotesBoard
// This will also handle action when mouse clicks on and hovers over the note

/* eslint-disable react/prop-types */ //DO NOT REMOVE THIS LINE
import {useState, useEffect} from 'react'
import NoteEditWindow from "./NoteEditWindow.jsx";

function NoteItem(props) {
    const [type, setType] = useState('new');
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [category, setCategory] = useState('')
    const [isPinned, setIsPinned] = useState(false)
    const [creationDate, setCreationDate] = useState('')
    const [modifiedDate, setModifiedDate] = useState('')
    const [colour, setColour] = useState('')
    const [editWindowVisible, setEditWindowVisible] = useState(false);

    useEffect(() => {
        setType(props.Type)
        setTitle(props.Title)
        setBody(props.Body)
        setCategory(props.Category)
        setIsPinned(props.Pinned)
    }, [])


    const togglePin = () => {
        setIsPinned(!isPinned);
        // props.Pinned(isPinned);
    }

    const getPinImage = () => {
        return isPinned
            ? "https://img.icons8.com/?size=100&id=9JrqhYs9ejP6&format=png&color=000000" // Black pin
            : "https://img.icons8.com/?size=100&id=0BngLkWjYAnC&format=png&color=000000"; // White pin
    }

    // this method can be used to generate a random color for every new note created
    const getRandomHexColor = () => {
        const hex = Math.floor(Math.random() * (Math.pow(256,3)-1)).toString(16);
        return `#${hex.padStart(6, '0')}`;
    }

    // this function will be invoked when either the new note is
    // clicked or the edit button on an existing note is clicked
    const handleEditClick = (noteType = "") => {
        let noteData = {};
        if (noteType === "existingNote") {
            console.log("Edit button clicked")
            noteData = {
                "Title": title,
                "Body": body,
                "Category": category,
                "Pinned": isPinned
            }
            console.log(noteData.Title);
        } else {
            console.log("New note button clicked");
        }
        setEditWindowVisible(true);
    }

    //this function is called to generate either the new note button or existing note
    function GenerateNote () {
        if (type === "new") { //new note
            return (
            <>
                <div className='newNoteContainer'
                     onClick={() => {handleEditClick()}}
                >
                </div>
            </>
            )
        } else { //existing note
            return (
            <>
                <div className="noteItemContainer"
                     style={{backgroundColor: "wheat"}} //set color
                >
                    <div className="top">
                        <div className="title">{title}</div>
                        <div>
                            <button id="pin"
                                    onClick={togglePin}
                                    className={isPinned === true ? "pin-on" : "pin-off"}
                                    style={{backgroundImage: `url(${getPinImage()})`}}
                            />
                        </div>
                    </div>
                    <div className="body">{body}</div>
                    <div className="footer">
                        <div className="category">{category}</div>
                        <div className="noteButtonMenu">
                            <button id='edit' className='noteButton'
                                    onClick={() => handleEditClick("existingNote")}/>
                            <button id='color' className='noteButton' onClick={props.onClick}/>
                            <button id='reminder' className='noteButton' onClick={props.onClick}/>
                            <button id='menu' className='noteButton' onClick={props.onClick}/>
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
                    Title={title}
                    Body={body}
                    Category={category}
                    Pinned={isPinned}
                    onExitClick={setEditWindowVisible}
                />
                : null
            }
        </>
    )
}

export default NoteItem