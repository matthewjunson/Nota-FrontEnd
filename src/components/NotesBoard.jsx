// This component will encapsulate the actual sticky notes. Similar to the BookLibrary exercise.

/* eslint-disable react/prop-types */ //DO NOT REMOVE THIS LINE

import "./NotesBoard.css"
import NoteItem from "./NoteItem.jsx";

function NotesBoard(props) {
    let note = [
        {
            "Type" : "new"
        }
    ];

    // props.data.map((note) => {
    //     note.push(
    //         {
    //             "Type" : "existing",
    //             "Title": props.title,
    //             "Body" : props.body,
    //             "Category" : props.category,
    //             "Pinned": props.pinned,
    //             "DateCreated": props.dateCreated,
    //             "DateModified": props.dateModified
    //         }
    //     )
    // })

    // Once API is established, the map above will replace this loop
    // that will push items into the note array with fields from props
    // containing information fetched from the database.
    for (let i = 0; i < 20; i++) {
        note.push(
            {
                "Type" : "existing",
                "Title": "COMP229 WEB DEVELOPMENT IS THE BEST COURSE IN THE WHOLE WIDE WORLD",
                "Body" : "Hello World!",
                "Category" : "Courses",
                "Pinned": true //sample
            }
        )
    }

    return (
    <>
        {/*<div className="background"></div>*/}
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
                            Title={note.Title}
                            Body={note.Body}
                            Category={note.Category}
                            Type={"existing"} //obtain from 'props.Type'
                            Pinned={false} //obtain from 'props.Pinned'
                        />
                    )
                }
            })}
        </div>
    </>
    )
}

export default NotesBoard