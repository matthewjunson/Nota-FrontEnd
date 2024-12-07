// This component will encapsulate the actual sticky notes. Similar to the BookLibrary exercise.

/* eslint-disable react/prop-types */ //DO NOT REMOVE THIS LINE
import {useState, useEffect} from "react";

import "./NotesBoard.css"
import NoteItem from "./NoteItem.jsx";

function NotesBoard(props) {
    const [data, setData] = useState([]);
    const [orderedNotes, setOrderedNotes] = useState([]);

    useEffect(() => {
            setData(props.data);
            let orderedNotesList = [];
            let pinned = [];
            let unpinned = [];
            data.forEach((note) => {
                if (note.Type === "new") {
                    orderedNotesList.push(note);
                } else if (note.Pinned === true && note.Type !== "new") {
                    pinned.push(note);
                } else if (note.Pinned === false && note.Type !== "new") {
                    unpinned.push(note);
                }
            })
            pinned.forEach((note) => {
                orderedNotesList.push(note);
            })
            unpinned.forEach((note) => {
                orderedNotesList.push(note);
            })
            setOrderedNotes(orderedNotesList);
    }, [props.data, data]);

    return (
        <>
            <div className="notesBoard">
                {orderedNotes.map((note, index) => {
                    if (note.Type === "new") {
                        return (
                            <NoteItem key={index}
                                      Type={"new"}
                                      CRUD={props.CRUD}/>
                        )
                    } else {
                        return (
                            <NoteItem key={index}
                                      noteData={note}
                                      Type={"existing"}
                                      CRUD={props.CRUD}
                            />
                        )
                    }
                })}
            </div>
        </>
    )
}

export default NotesBoard