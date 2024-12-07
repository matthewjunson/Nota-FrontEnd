/* eslint-disable react/prop-types */ //DO NOT REMOVE THIS LINE

import {useEffect, useState} from 'react'
import './App.css'

import NotesBoard from "./components/NotesBoard.jsx";
import NavBar from "./components/NavBar.jsx";
import SideBar from "./components/SideBar.jsx";

function App() {
    const [notes, setNotes] = useState(null);
    const url = import.meta.env.VITE_BE_URL;

    const getNotes = async () => {
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
                getNotes();
            }
        } catch (error) {
            console.error("Error creating note:", error);
        }
    }

    const updateNote = async (noteData) => {
        let route = (noteData.CRUD === "update"
            ?`${url}/notes/updateNote/${noteData._id}` // update note info
            : `${url}/notes/changePinState/${noteData._id}`); // simply update pinned state
        try {
            const response = await fetch(route, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    (noteData.CRUD === "update"
                        ? {
                            Title: noteData.Title,
                            Body: noteData.Body,
                            Category: noteData.Category,
                            Pinned: noteData.Pinned
                        }
                        : { Pinned: noteData.Pinned }
                    )
                ),
            });
            if (response.ok) {
                console.log("Note updated successfully.");
                getNotes();
            } else {
                console.error("Failed to update note. Status:", response.status);
            }
        } catch (error) {
            console.error("Error updating note:", error);
        }
    };

    const deleteNote = async (noteData) => {
        try {
            const response = await fetch(`${url}/notes/${noteData._id}`, { // Pass the _id in the URL
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (response.ok) {
                console.log("Note deleted successfully.");
                getNotes();
            } else {
                console.error("Failed to delete note. Status:", response.status);
            }
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    useEffect(() => {
        getNotes();
    }, []);

    function handleCRUD(noteData) {
        // console.log("App.jsx received: ", noteData);
        if (noteData.CRUD === "create") {
            addNewNote(noteData);
        } else if (noteData.CRUD === "update" || noteData.CRUD === "changePinState") {
            updateNote(noteData);
        } else if (noteData.CRUD === "delete") {
            deleteNote(noteData);
        }
    }

    return (
    <>
        <div className="App">
            <NavBar />
            <SideBar />
            {notes === null
                ? null
                : <NotesBoard
                    data={notes}
                    CRUD={handleCRUD}
                    // CRUD will trigger from NoteItem when changing pin state
                    // and from NoteEditWindow when creating/updating a note
                />
            }
        </div>
    </>
    )
}

export default App
