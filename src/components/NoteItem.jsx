// This component will mainly display the miniaturized sticky notes shown on the NotesBoard
// This will also handle action when mouse clicks on and hovers over the note

/* eslint-disable react/prop-types */ //DO NOT REMOVE THIS LINE
import {useState, useEffect} from 'react'

function NoteItem(props) {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [category, setCategory] = useState('')
    const [creationDate, setCreationDate] = useState('')
    const [modifiedDate, setModifiedDate] = useState('')
    const [isPinned, setIsPinned] = useState(false)
    const [colour, setColour] = useState('')
    const [editor, setEditor] = useState(false)


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
        const hex = Math.floor(Math.random() * (Math.pow(256,3)-1)).toString(16); // Generate a number and convert to hex
        return `#${hex.padStart(6, '0')}`;
    }

    const createNewNote = () => {

    }
    //this function is called to generate either a new or existing note
    function GenerateNote () {
        if (props.Type === "new") {
            return (
            <>
                <div className="newNoteContainer"
                     onClick={() => {createNewNote()}}
                />
            </>
            )
        } else { //existing note
            return (
            <>
                <div
                    className="noteItemContainer"
                    style={{backgroundColor: "wheat"}} //set color
                >
                    <div className="top">
                        <div
                            className="title">{props.Title}</div>
                        <div>
                            <button id="pin"
                                    onClick={togglePin}
                                    className={isPinned === true ? "pin-on" : "pin-off"}
                                    style={{backgroundImage: `url(${getPinImage()})`}}
                            />
                        </div>
                    </div>
                    <div className="body">{props.Body}</div>
                    <div className="footer">
                        <div className="category">{props.Category}</div>
                        <div className="noteButtonMenu">
                            <button id='edit' className='noteButton' onClick={props.onClick}/>
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
        </>
    )
}

export default NoteItem