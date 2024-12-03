// This component will encapsulate the actual sticky notes. Similar to the BookLibrary exercise.

/* eslint-disable react/prop-types */ //DO NOT REMOVE THIS LINE
import {useState, useEffect} from "react";

import "./NotesBoard.css"
import NoteItem from "./NoteItem.jsx";

function NotesBoard(props) {
    const [data, setData] = useState([]);

    // setData(props.data);

    let note = [
        {
            "Type" : "new"
        }
    ];

    // data.map((note) => {
    //     note.push(
    //         {
    //             "Type" : "existing",
    //             "ID" : data.id, //obtained from record's "_id" field
    //             "Title": data.title,
    //             "Body" : data.body,
    //             "Category" : data.category,
    //             "Pinned": data.pinned,
    //             "DateCreated": data.dateCreated,
    //             "DateModified": data.dateModified
    //         }
    //     )
    // })

    // Once API is established, the map above will replace this loop
    // that will push items into the note array with fields from props
    // containing information fetched from the database.
    for (let i = 0; i < 20; i++) {
        note.push(
            {
                "ID" : "",
                "Type" : "existing",
                "Title": "COMP229 WEB DEVELOPMENT IS THE BEST COURSE IN THE WHOLE WIDE WORLD",
                "Body" : "Hello World!",
                "Category" : "Courses",
                "Pinned": false //sample
            }
        )
    }

    return (
    <>
        <div className="notesBoard">
            {note.map((note, index) => {
                if(note.Type === "new") {
                    return (
                        <NoteItem
                            key={index}
                            Type={"new"}
                        />
                    )
                } else {
                    return (
                        <NoteItem
                            key={index}
                            id={note.ID}
                            Title={note.Title}
                            Body={note.Body}
                            Category={note.Category}
                            Type={"existing"} //obtain from 'note.Type'
                            Pinned={note.Pinned} //obtain from 'note.Pinned'
                        />
                    )
                }
            })}
        </div>
    </>
    )
}

export default NotesBoard