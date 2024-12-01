import { useState, useEffect } from 'react'
// import './App.css'

import './components/AccountWindow.jsx'
import './components/NavBar.jsx'
import './components/SideBar.jsx'
import './components/NotesBoard.jsx'
import './components/NoteEditWindow.jsx'
import NotesBoard from "./components/NotesBoard.jsx";
import NavBar from "./components/NavBar.jsx";
import SideBar from "./components/SideBar.jsx";

function App() {

  return (
    <>
        <div className="App">
            <div>
                <NavBar />
            </div>
            <div>
                <SideBar />
                <NotesBoard />
            </div>
        </div>
    </>
  )
}

export default App
