import { useState } from "react";
import noteContext from "./noteContext";
// require('dotenv').config({path:__dirname+'../../../.env'});

const NoteState = (props) => {

  
  const initialnotes = []
  const [notes, setNotes] = useState(initialnotes);
  const LINK = process.env.REACT_APP_LINK;
  //Get all notes
  const getNotes = async () => {
    //To do api call
    try {
      const response = await fetch(`${LINK}/api/notes/fetchallnotes`, {
        method: "GET",
         headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
  
        },
      });
      // eslint-disable-next-line
      const json = await response.json();
      // console.log(json);
      setNotes(json);
  
    } catch (error) {
      console.log(error.message);
    }
    
  }
 

  // Add a note
  const addNote = async (title, description, tag) => {
    //To do api call
    // eslint-disable-next-line 
    const response = await fetch(`${LINK}/api/notes/addnote`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },

      body: JSON.stringify({ title, description, tag }),
    }).then(function (response) {
      const note =  response.json();
    //   console.log(note);
    // console.log("adding a note");

    setNotes(notes.concat(note))
    })
    
    
  }


  // Delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${LINK}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')

      },
    });
    // eslint-disable-next-line
    const json = await response.json();
    console.log(json);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes);
  }

  //Update a note

  const editNote = async (id, title, description, tag) => {
    // eslint-disable-next-line 
    const response = await fetch(`${LINK}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')

      },

      body: JSON.stringify({title, description, tag}),
    });
    // const json = await response.json();
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes.title = title;
        newNotes.description = description;
        newNotes.tag = tag;
        break;
      }

    }
    setNotes(newNotes);
  }
  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  )
         
}  
export default NoteState; 