// This component will mainly display the miniaturized sticky notes shown on the NotesBoard
// This will also handle action when mouse clicks on and hovers over the note

/* eslint-disable react/prop-types */ //DO NOT REMOVE THIS LINE
import {useState, useEffect} from 'react'

function NoteItem(props) {


    // optionally, color can be saved as a record field instead of
    // randomizing color on each render
    function getRandomHexColor() {
        const hex = Math.floor(Math.random() * (Math.pow(256,3)-1)).toString(16); // Generate a number and convert to hex
        return `#${hex.padStart(6, '0')}`;
    }

    function GenerateNote () {
        if (props.Type === "new") {
            return (
            <>
                <div className="newNoteContainer" />
            </>
            )
        } else { //existing note
            return (
            <>
                <div
                    className="noteItemContainer"
                    style={{backgroundColor: getRandomHexColor()}}
                >
                    <div className="top">
                        <div
                            className="title">{props.Title}</div>
                        <div>
                            <button id='pin' className='noteButton' onClick={props.onClick}/>
                        </div>
                    </div>
                    <div className="body">{props.Body}</div>
                    <div className="footer">
                        <div className="category">{props.Category}</div>
                        <div className="noteButtonMenu">
                            <button id='edit' className='noteButton' onClick={props.onClick}/>
                            <button id='color' className='noteButton' onClick={props.onClick}/>
                            <button id='reminder' className='noteButton' onClick={props.onClick}/>
                            <button id='menu' className='noteButton' onClick={props.onClick}/>
                        </div>
                    </div>
                </div>
            </>
            )
        }
    }

    return (
        <>
            {GenerateNote()}
        </>
    )
}

export default NoteItem