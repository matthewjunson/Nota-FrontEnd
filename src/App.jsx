/* eslint-disable react/prop-types */ //DO NOT REMOVE THIS LINE

import {useEffect, useState} from 'react'
import './App.css'

import NotesBoard from "./components/NotesBoard.jsx";
import NavBar from "./components/NavBar.jsx";
import SideBar from "./components/SideBar.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";

function App() {
    const [notesFromDB, setNotesFromDB] = useState(null);
    const [searchQuery, setSearchQuery] = useState(null);
    const [displayedNotes, setDisplayedNotes] = useState(null);
    const url = import.meta.env.VITE_BE_URL;

    useEffect(() => {
        getAllNotes();
    }, []);

    // This detects changes in the search bar and updates the
    // NotesBoard to display only notes that match the searched query.
    useEffect(() => {
        if (searchQuery) {
            const lowerCaseQuery = searchQuery.toLowerCase();
            const filteredResults = notesFromDB.filter(note => {
                return (
                    note.Title?.toLowerCase().includes(lowerCaseQuery) ||
                    note.Body?.toLowerCase().includes(lowerCaseQuery) ||
                    note.Category?.toLowerCase().includes(lowerCaseQuery)
                );
            });
            setDisplayedNotes(filteredResults);
        } else {
            setDisplayedNotes(notesFromDB);
        }
    }, [searchQuery, notesFromDB]);

    // This makes a GET request to retrieve any and all exising notes from the database
    const getAllNotes = async () => {
        try {
            const response = await fetch(`${url}/api/notes`);
            const dbNotes = await response.json();
            (response.ok
                ? dbNotes
                    ? setNotesFromDB(dbNotes) : null
                : setTimeout(getAllNotes, 1000)
            )
        } catch (error) {
            console.error("Error fetching notes:", error);
            setNotesFromDB(null);
            setTimeout(getAllNotes, 1000);
        }
        setSearchQuery(null);
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
                    "Color": noteData.Color,
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
                            Category: noteData.Category,
                            Color: noteData.Color,
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
    // "create"         -> the 'submit' btn is clicked on a "Create New Note" window in NoteEditWindow.jsx
    // "refresh"        -> the 'refresh' btn on the SideBar is clicked.
    // "update"         -> the 'submit' btn is clicked on an "Edit Note" window in NoteEditWindow.jsx
    // "changePinState" -> the 'pin' btn is clicked on individual notes in the NotesBoard.jsx
    // "delete"         -> the 'trash' btn is clicked on individual notes in the NotesBoard.sjx
    function handleCRUD(noteData) {
        // console.log("App.jsx received: ", noteData); // for debugging props.CRUD of child components
        if (noteData.CRUD === "create") {
            addNewNote(noteData);
        } else if (noteData.CRUD === "refresh") { // not yet implemented. reserved for SideBar 'refresh' feature
            getAllNotes();
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
                data={notesFromDB}
                searchResults={setSearchQuery}
                CRUD={handleCRUD}
            />
            <SideBar
                CRUD={handleCRUD} // reserved for 'refresh' btn click, (not yet implemented)
            />
            {displayedNotes
                ? <NotesBoard
                    data={displayedNotes}
                    CRUD={handleCRUD}
                    // CRUD will trigger from NoteItem when changing isPinned state and
                    // clicking 'submit' btn from NoteEditWindow when creating/updating a note
                />
                : <LoadingScreen /> // display a loading screen while Render wakes up the backend
            }
        </div>
    </>
    )
}

export default App
