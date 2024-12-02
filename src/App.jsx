/* eslint-disable react/prop-types */ //DO NOT REMOVE THIS LINE

import { useState, useEffect } from 'react'
import './App.css'

import AccountWindow from "./components/AccountWindow.jsx";
import NoteEditWindow from './components/NoteEditWindow.jsx';
import NotesBoard from "./components/NotesBoard.jsx";
import NavBar from "./components/NavBar.jsx";
import SideBar from "./components/SideBar.jsx";

function App() {

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
