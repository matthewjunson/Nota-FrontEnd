/* eslint-disable react/prop-types */ //DO NOT REMOVE THIS LINE

import {useEffect, useState} from 'react'
import './App.css'

import NotesBoard from "./components/NotesBoard.jsx";
import NavBar from "./components/NavBar.jsx";
import SideBar from "./components/SideBar.jsx";

function App() {
    const [notes, setNotes] = useState(null);
    const url = import.meta.env.VITE_BE_URL;

    useEffect(() => {
        getAllNotes();
    }, []);

    // This makes a GET request to retrieve any and all exising notes from the database
    const getAllNotes = async () => {
        let notes = [
            {"Type": "new"},
        ];
        try {
            const response = await fetch(`${url}/api/notes`);
            const dbNotes = await response.json();
            if (response.ok) {
                dbNotes.forEach(note => {
                    notes.push(note);
                })
            }
            setNotes(notes);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    }

    // This makes a POST request to insert a new record into the DB when a new note is being created
    const addNewNote = async (noteData) => {
        try {
            const response = await fetch(`${url}/api/notes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "Title": noteData.Title,
                    "Body": noteData.Body,
                    "Category": noteData.Category,
                    "Pinned": noteData.Pinned
                }),
            });
            if (response.ok) {
                console.log("Note successfully added");
                getAllNotes(); // called to refresh the grid of notes
            }
        } catch (error) {
            console.error("Error creating note:", error);
        }
    }

    // This is a dual-purpose POST request
    // 1st is to update the text fields of an existing note. This updates the ModifiedDate field in the DB's record
    // 2nd is to update ONLY the 'Pinned' value of the record. This does NOT update the ModifiedDate.
    const updateNote = async (noteData) => {
        let route = (noteData.CRUD === "update"
            ?`${url}/api/notes/updateNote/${noteData._id}` // update note info
            : `${url}/api/notes/changePinState/${noteData._id}`); // simply change pinned state
        try {
            const response = await fetch(route, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    (noteData.CRUD === "update"
                        ? { // update the text fields
                            Title: noteData.Title,
                            Body: noteData.Body,
                            Category: noteData.Category
                        } // change only the Pinned state
                        : { Pinned: noteData.Pinned }
                    )
                ),
            });
            if (response.ok) {
                console.log("Note updated successfully.");
                getAllNotes(); // called to refresh the grid of notes
            } else {
                console.error("Failed to update note. Status:", response.status);
            }
        } catch (error) {
            console.error("Error updating note:", error);
        }
    };

    // This makes a hard DELETE request. It requires only the note's ObjectID.
    const deleteNote = async (noteData) => {
        try {
            const response = await fetch(`${url}/api/notes/${noteData._id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                console.log("Note deleted successfully.");
                getAllNotes(); // called to refresh the grid of notes
            } else {
                console.error("Failed to delete note. Status:", response.status);
            }
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    // API requests from any child component will arrive here to be redirected to the appropriate CRUD functions.
    // This is invoked through the CRUD property.
    // "create" -> the 'submit' btn is clicked on a "Create New Note" window in NoteEditWindow.jsx
    // "refresh" -> the 'refresh' btn on the SideBar is clicked.
    // "find" -> the 'search' btn on the NavBar is clicked.
    // "update" -> the 'submit' btn is clicked on an "Edit Note" window in NoteEditWindow.jsx
    // "changePinState" -> the 'pin' btn is clicked on individual notes in the NotesBoard.jsx
    // "delete" -> the 'trash' btn is clicked on individual notes in the NotesBoard.sjx
    function handleCRUD(noteData) {
        // console.log("App.jsx received: ", noteData); // reserved for debugging props.CRUD of child components
        if (noteData.CRUD === "create") {
            addNewNote(noteData);
        } else if (noteData.CRUD === "refresh") { // not yet implemented. reserved for SideBar 'refresh' feature
            getAllNotes();
        } else if (noteData.CRUD === "search") { // not yet implemented. reserved for NavBar 'search' feature
            // findNotes(noteData);
        } else if (noteData.CRUD === "update" || noteData.CRUD === "changePinState") {
            updateNote(noteData);
        } else if (noteData.CRUD === "delete") {
            deleteNote(noteData);
        }
    }

    return (
    <>
        <div className="App">
            <NavBar
                CRUD={handleCRUD} // reserved for 'search' btn click, (not yet implemented)
            />
            <SideBar
                CRUD={handleCRUD} // reserved for 'refresh' btn click, (not yet implemented)
            />
            {notes // Notes is null by default, so it will only appear once getAllNotes() is finished
                ? <NotesBoard
                    data={notes}
                    CRUD={handleCRUD}
                    // CRUD will trigger from NoteItem when changing isPinned state
                    // and clicking 'submit' btn from NoteEditWindow when creating/updating a note
                />
                : null
            }
        </div>
    </>
    )
}

export default App
