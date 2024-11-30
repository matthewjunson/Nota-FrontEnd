// This component will encapsulate the actual sticky notes. Similar to the BookLibrary exercise.

/* eslint-disable react/prop-types */
import "./NotesBoard.css"
import NoteItem from "./NoteItem.jsx";
function NotesBoard(props) {
    let note = [
        {
            "Type" : "new"
        }
    ];

    // Once API is established, this for loop will push items
    // into the note array with fields from props containing
    // information fetched from the database
    for (let i = 0; i < 20; i++) {
        note.push(
            {
                "Title": "COMP229 WEB DEVELOPMENT",
                "Body" : "Hello World!",
                "Category" : "Courses",
                "Type" : "existing"
            }
            // {
            //     "Title": props.title,
            //     "Body" : props.body,
            //     "Category" : props.category,
            //     "Type" : "existing"
            // }
        )
    }

    return (
        <>
            <div className="notesBoard">
                {note.map((note, index) => {
                    if(note.Type == "new") {
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
                                Type={"existing"}
                            />
                        )
                    }
                })}
            </div>
        </>
    )
}

export default NotesBoard