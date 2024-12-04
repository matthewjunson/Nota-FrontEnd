// This component will encapsulate the actual sticky notes. Similar to the BookLibrary exercise.

/* eslint-disable react/prop-types */ //DO NOT REMOVE THIS LINE
import {useState, useEffect} from "react";

import "./NotesBoard.css"
import NoteItem from "./NoteItem.jsx";

function NotesBoard(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(props.data || [ {"Type": "new"}]);
    }, []);

    return (
        <>
            <div className="notesBoard">
                {data.map((note, index) => {
                    if (note.Type === "new") {
                        return (
                            <NoteItem key={index}
                                         Type={"new"}
                                         EditWindowData={props.EditWindowData}/>
                        )
                    } else {
                        return (
                            <NoteItem
                                key={index}
                                Type={"existing"}
                                Title={note.Title}
                                Body={note.Body}
                                Category={note.Category}
                                Pinned={note.Pinned}
                                EditWindowData={props.EditWindowData}
                            />
                        )
                    }
                })}
            </div>
        </>
    )
}

export default NotesBoard