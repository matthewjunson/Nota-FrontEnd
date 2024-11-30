// This component will encapsulate the actual sticky notes. Similar to the BookLibrary exercise.

/* eslint-disable react/prop-types */
import "./NotesBoard.css"
import NoteItem from "./NoteItem.jsx";
function NotesBoard() {
    return (
        <>

            <NoteItem
                Title={"COMP229 WEB DEVELOPMENT"}
                Body={"Hello World!"}
                Category={"Courses"}
            />
        </>
    )
}

export default NotesBoard