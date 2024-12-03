/* eslint-disable react/prop-types */ //DO NOT REMOVE THIS LINE

import { useState, useEffect } from 'react'
import './App.css'

import AccountWindow from "./components/AccountWindow.jsx";
import NoteEditWindow from './components/NoteEditWindow.jsx';
import NotesBoard from "./components/NotesBoard.jsx";
import NavBar from "./components/NavBar.jsx";
import SideBar from "./components/SideBar.jsx";

function App() {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState([]);

    const addNewNote = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/notes`, {
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

    const getNotes = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/notes`);
            const data = await response.json();
            setNotes(data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    }

    return (
    <>
        <div className="App">
            <NavBar />
            <SideBar />
            <NotesBoard />
        </div>
    </>
    )
}

export default App
