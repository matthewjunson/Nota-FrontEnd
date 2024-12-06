/* eslint-disable react/prop-types */ //DO NOT REMOVE THIS LINE

import { useState, useEffect } from 'react'
import './App.css'

// import AccountWindow from "./components/AccountWindow.jsx";
// import NoteEditWindow from './components/NoteEditWindow.jsx';
import NotesBoard from "./components/NotesBoard.jsx";
import NavBar from "./components/NavBar.jsx";
import SideBar from "./components/SideBar.jsx";

function App(props) {
    const [notes, setNotes] = useState(null);
    const [newNote, setNewNote] = useState([]);
    const [editType, setEditType] = useState("new");

     const getNotes = async () => {
         try {
             const response = await fetch(`${import.meta.env.VITE_BE_URL}/api/notes`);
             const data = await response.json();
            setNotes(data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    }

    const addNewNote = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BE_URL}/api/notes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: newNote }),
            });
            if (response.ok) {
                setNewTodo("");
                getNotes();
            }
        } catch (error) {
            console.error("Error creating note:", error);
        }
    }

    const updateNote = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BE_URL}/api/notes`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: newNote }),
            });
            if (response.ok) {
                getNotes();
            }
        } catch (error) {
            console.error("Error updating note:", error);
        }
    }

    // place getNotes inside this useEffect, store the retrieved data through setNotes(data)
    useEffect(() => {
        let notes = [
            {"Type": "new"},
        ];
        for (let i = 0; i < 3; i++) { //this loop simulates existing notes in the database
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
        if (notes) {
            setNotes(notes);
        }
    }, [])

    function handleEditWindowData(noteData) {
        console.log("App.jsx received: ", noteData);
        if (noteData.type === "new") {
            // call addNewNote
        } else {
            // call updateNote
        }
    }

    return (
    <>
        <div className="App">
            <NavBar />
            <SideBar />
            {/*for error handling, NotesBoard will be displayed only if 'notes' is NOT null*/}
            {notes === null
                ? null
                : <NotesBoard
                    data={notes}
                    EditWindowData={handleEditWindowData} //EditWindowData will trigger from NoteEditWindow
                />
            }

        </div>
    </>
    )
}

export default App
