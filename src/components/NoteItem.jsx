// This component will mainly display the miniaturized sticky notes shown on the NotesBoard
// This will also handle action when mouse clicks on and hovers over the note

/* eslint-disable react/prop-types */

function NoteItem(props) {
    return (
        <>
            <div className="noteItemContainer">
                <div className="title">{props.Title}</div>
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

export default NoteItem