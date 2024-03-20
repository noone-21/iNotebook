import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import NoteContext from '../context/notes/NoteContext'
import { AddNote } from './AddNote'
import NoteItem from './NoteItem'


const Notes = (props) => {
    const context = useContext(NoteContext);
    const { notes, getNotes, editNote } = context;
    let history = useHistory()
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()
        } else {
            props.showAlert("Please Login to start using iNotebook!", "warning")
            history.push("/login")
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })

    }

    const editNoteBtn = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        props.showAlert("Updated Successfully!", "success")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModalCenter1">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModalCenter1" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <form >
                                <h1 className='d-flex justify-content-center'>EDIT NOTE</h1>
                                <div className="form-group">
                                    <label htmlFor="etitle">Title</label>
                                    <input required minLength={3} type="text" className={` form-control ${note.etitle.length < 3 ? 'is-invalid' : 'is-valid'}`} value={note.etitle} placeholder="Your Note Title here" onChange={onChange} name="etitle" id="etitle" />
                                    <div className={note.etitle.length < 3 ? 'invalid-feedback' : 'valid-feedback'}>
                                        {note.etitle.length < 3 ? 'Please Enter a Valid Title' : 'Looks Good'}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="edescription">Description</label>
                                    <input required minLength={10} type="text" className={` form-control ${note.edescription.length < 10 ? 'is-invalid' : 'is-valid'}`} placeholder="Your Note Description here" onChange={onChange} value={note.edescription} name="edescription" id="edescription" />
                                    <div className={note.edescription.length < 10 ? 'invalid-feedback' : 'valid-feedback'}>
                                        {note.edescription.length < 10 ? 'Please Enter a Valid Description' : 'Looks Good'}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="etag">Tag</label>
                                    <input type="text" className="form-control" value={note.etag} onChange={onChange} name="etag" id="etag" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-dismiss="modal"  >Close</button>
                            <button disabled={note.edescription.length < 10 || note.etitle.length < 3} type="button" className="btn btn-primary" onClick={editNoteBtn} >Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-row">
                <h1 className="p-2" >YOUR NOTES</h1>
                <div className="my-3 p-2">
                    <AddNote showAlert={props.showAlert} />
                </div>
            </div>

            <div className="row my-2 mx-2">
                {notes.length === 0 && 'No Notes To Display'}
                {notes.map((note) => {
                    return <NoteItem showAlert={props.showAlert} key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>

        </>
    )
}

export default Notes