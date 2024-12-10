// This component will encapsulate the actual sticky notes. Similar to the BookLibrary exercise.

/* eslint-disable react/prop-types */ //DO NOT REMOVE THIS LINE
import {useState, useEffect} from "react";

import "./NotesBoard.css"
import NoteItem from "./NoteItem.jsx";

function NotesBoard(props) {
    const [data, setData] = useState([]);

    // Pretty self-explanatory
    useEffect(() => {
            setData(props.data);
    }, [props.data]);

    return (
        <>
            <div className="notesBoard">
                {data.map((note, index) => { // Map through all records of 'notes' from App.jsx
                    if (note.Type === "new") { // There will be only 1 ghost note with {"Type" : "new"}
                        return (
                            <NoteItem key={index}
                                      Type={"new"}
                                      CRUD={props.CRUD}/>
                        )
                    } else {
                        return ( // Any other notes are formed here
                            <NoteItem key={index}
                                      noteData={note}
                                      Type={"existing"}
                                      CRUD={props.CRUD}/>
                        )
                    }
                })}
            </div>
        </>
    )
}

export default NotesBoard