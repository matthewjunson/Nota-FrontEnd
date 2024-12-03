// This component will encapsulate the actual sticky notes. Similar to the BookLibrary exercise.

/* eslint-disable react/prop-types */ //DO NOT REMOVE THIS LINE
import {useState, useEffect} from "react";

import "./NotesBoard.css"
import NoteItem from "./NoteItem.jsx";
import NoteEditWindow from "./NoteEditWindow.jsx";

function NotesBoard(props) {
    const [data, setData] = useState([]);
    const [notesList, setNotesList] = useState([{"Type" : "new"}]);
    const [editWindowVisible, setEditWindowVisible] = useState(true);
    const [existingNoteData, setExistingNoteData] = useState(null);
    const [editWindow, setEditWindow] = useState(null);

    useEffect(() => {
        // setData(props.data);
        // console.log(props.data);
        let notes = [{
            "Type": "new",
            "Title": null,
            "Body": null,
            "Category": null,
            "Pinned": null
        }];
        for (let i = 0; i < 2; i++) {
            // notes.push(
            //     {
            //         "Type" : "existing",
            //         "Title": "COMP229 WEB DEVELOPMENT IS THE BEST COURSE IN THE WHOLE WIDE WORLD",
            //         "Body" : "Hello World!",
            //         "Category" : "General",
            //         "Pinned": false //sample
            //     }
            // )
            notes.push(
                {
                    "Type": "existing",
                    "Title": "Learn JavaScript Basics",
                    "Body": "Start with variables, functions, and loops to build a strong foundation.",
                    "Category": "Programming",
                    "Pinned": true
                },
                {
                    "Type": "existing",
                    "Title": "Weekly Grocery List",
                    "Body": "Milk, Eggs, Bread, Cheese, Fruits, Vegetables, Snacks.",
                    "Category": "Personal",
                    "Pinned": false
                },
                {
                    "Type": "existing",
                    "Title": "Meeting Notes: Project Kickoff",
                    "Body": "Discussed timelines, deliverables, and responsibilities for the team.",
                    "Category": "Work",
                    "Pinned": true
                },
                {
                    "Type": "existing",
                    "Title": "Recipe: Spaghetti Carbonara",
                    "Body": "Ingredients: Spaghetti, eggs, pancetta, Parmesan cheese, pepper.",
                    "Category": "Cooking",
                    "Pinned": false
                }
            );
        }
        setNotesList(notes);
        console.log(notes);
    }, [props.data]);

    // useEffect(() => {
    //     const updatedNotes = [{ "Type": "new" }];
    //     data.forEach((note) => {
    //         updatedNotes.push({
    //             "Type": "existing",
    //             "Title": note.Title,
    //             "Body": note.Body,
    //             "Category": note.Category,
    //             "Pinned": note.Pinned,
    //         });
    //     });
    //     setNotesList(updatedNotes);
    //     console.log(updatedNotes);
    // }, [setData]);

    // Once API is established, the map above will replace this loop
    // that will push items into the note array with fields from props
    // containing information fetched from the database.
    // let notes = [{
    //     "Type": "new",
    //     "Title": null,
    //     "Body": null,
    //     "Category": null,
    //     "Pinned": null
    // }];
    // for (let i = 0; i < 2; i++) {
    //     // notes.push(
    //     //     {
    //     //         "Type" : "existing",
    //     //         "Title": "COMP229 WEB DEVELOPMENT IS THE BEST COURSE IN THE WHOLE WIDE WORLD",
    //     //         "Body" : "Hello World!",
    //     //         "Category" : "General",
    //     //         "Pinned": false //sample
    //     //     }
    //     // )
    //     notes.push(
    //         {
    //             "Type": "existing",
    //             "Title": "Learn JavaScript Basics",
    //             "Body": "Start with variables, functions, and loops to build a strong foundation.",
    //             "Category": "Programming",
    //             "Pinned": true
    //         },
    //         {
    //             "Type": "existing",
    //             "Title": "Weekly Grocery List",
    //             "Body": "Milk, Eggs, Bread, Cheese, Fruits, Vegetables, Snacks.",
    //             "Category": "Personal",
    //             "Pinned": false
    //         },
    //         {
    //             "Type": "existing",
    //             "Title": "Meeting Notes: Project Kickoff",
    //             "Body": "Discussed timelines, deliverables, and responsibilities for the team.",
    //             "Category": "Work",
    //             "Pinned": true
    //         },
    //         {
    //             "Type": "existing",
    //             "Title": "Recipe: Spaghetti Carbonara",
    //             "Body": "Ingredients: Spaghetti, eggs, pancetta, Parmesan cheese, pepper.",
    //             "Category": "Cooking",
    //             "Pinned": false
    //         }
    //     );
    // }
    // console.log(notes);

    function handleEditClick() {
        // if (noteData === null) {
        //     setEditWindow(
        //         <NoteEditWindow
        //             onExitClick={setEditWindowVisible}
        //         />
        //     )
        // } else {
        //     setEditWindow(
        //         <NoteEditWindow
        //             onExitClick={setEditWindowVisible}
        //             noteData={noteData}
        //         />
        //     )
        //     setExistingNoteData(noteData);
        // }
        setEditWindow(<NoteEditWindow onExitClick={setEditWindowVisible} />)
        setEditWindowVisible(true);
    }

    return (
        <>
            {editWindowVisible === true
                ? <NoteEditWindow onExitClick={setEditWindowVisible} />
                : null
            }
            <div className="notesBoard">
                {notesList.map((note, index) => {
                    if (note.Type === "new") {
                        return <NoteItem key={index} Type={"new"}/>
                    } else {
                        return (
                            <NoteItem
                                key={index}
                                // id={note.ID}
                                // DateCreated={data.dateCreated}
                                // DateModified={data.dateModified}
                                Type={"existing"}
                                Title={note.Title}
                                Body={note.Body}
                                Category={note.Category}
                                Pinned={note.Pinned} //obtain from 'note.Pinned'
                                onEditClick={handleEditClick}
                            />
                        )
                    }
                })}
            </div>
        </>
    )
}

export default NotesBoard