// This component will mainly display the miniaturized sticky notes shown on the NotesBoard
// This will also handle action when mouse clicks on and hovers over the note

/* eslint-disable react/prop-types */

function NoteItem(props) {
    function Note () {
        if (props.Type === "new") {
            return (
                <>
                    <div className="newNoteContainer"></div>
                </>
            )
        } else { //existing note
            return (
                <>
                    <div className="noteItemContainer">
                        <div className="top">
                            <div className="title">{props.Title}</div>
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
            {Note()}
        </>
    )
}

export default NoteItem