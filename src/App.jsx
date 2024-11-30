import { useState, useEffect } from 'react'
// import './App.css'

import './components/AccountWindow.jsx'
import './components/NavBar.jsx'
import './components/SideBar.jsx'
import './components/NotesBoard.jsx'
import './components/NoteEditWindow.jsx'
import NotesBoard from "./components/NotesBoard.jsx";

function App() {

  return (
    <>
      <div>
          <NotesBoard />
      </div>
    </>
  )
}

export default App
