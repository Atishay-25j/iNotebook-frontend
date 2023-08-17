import React, { useContext, useEffect, useRef , useState} from 'react'
import contextValue from '../context/notes/noteContext'
import NoteItem from './NoteItem'
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
const Notes = (props) => {
  let navigate = useNavigate();
  const context = useContext(contextValue);
  const { notes, getNotes ,editNote} = context;
  useEffect(() => {       
    if(localStorage.getItem('token')){
      getNotes();
      // eslint-disable-next-line
    }
    else{
      navigate('/login');
    }
  })
  const [ note ,setNote] = useState({id :"",etitle:"" , edescription :"" , etag :""})
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id : currentNote._id,etitle : currentNote.title , edescription : currentNote.description , etag : currentNote.tag})
  }
  const ref = useRef(null);
  const refClose = useRef(null);
  const handleClick = (e) => {
    console.log("Updating the note",note);
    editNote(note.id ,note.etitle,note.edescription,note.etag)
    refClose.current.click();
    props.showAlert("Note updated successfully" , "success");
  }
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <>
      <AddNote showAlert ={props.showAlert}/>

      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Launch static backdrop modal
      </button>
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' minLength={5} required value={note.etitle} aria-describedby="emailHelp" onChange={onchange} />
                </div>               
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name='edescription' minLength={5} required value={note.edescription} onChange={onchange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="Tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onchange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose}className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick} disabled={note.etitle.length<5 || note.edescription.length<5}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <h2>Your Notes</h2>
        <div className="container mx-2">
          {notes.length===0&&'No Notes to display'}
        </div>
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert}/>
        })}
      </div>
    </>

  )
}

export default Notes
