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
        setColour(getRandomHexColor())
    }, [])


    // this changes the icon style
    const togglePin = () => {
        setIsPinned(!isPinned);
        // props.Pinned(isPinned);
    }

    // this is called by the 'pin' button
    const getPinImage = () => {
        return isPinned
            ? "https://img.icons8.com/?size=100&id=9JrqhYs9ejP6&format=png&color=000000" // Black pin
            : "https://img.icons8.com/?size=100&id=0BngLkWjYAnC&format=png&color=000000"; // White pin
    }

    // this is used to generate a random light colors in hexadecimal format
    const getRandomHexColor = () => {
        const max = Math.pow(256,3)-1; // equivalent to rgb(255,255,255)
        const min = max / 2;
        const hex = Math.floor((Math.random() * (max - min)) + min).toString(16);
        return `#${hex.padStart(6, '0')}`;
    }

    //this is called to generate either the 'new note' button or an existing note
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
                                    // onClick={() => handleEditClick("existingNote")}/>
                                    onClick={() => setEditWindowVisible(true)}/>
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
                    // GetNotes={props.GetNotes}
                    EditWindowData={props.EditWindowData}
                />
                : null
            }
        </>
    )
}

export default NoteItem