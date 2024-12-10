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
                <NoteItem Type={"new"}
                          CRUD={props.CRUD}/>
                {data.map((note,index) => { // Map through all records of 'notes' from App.jsx
                    return (
                        <NoteItem key={index}
                                  noteData={note}
                                  Type={"existing"}
                                  CRUD={props.CRUD}/>
                    )
                })}
            </div>
        </>
    )
}

export default NotesBoard