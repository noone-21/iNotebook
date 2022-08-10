import React, { useContext, useState, useRef } from 'react'
import noteContext from '../context/notes/NoteContext'

export const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const ref1 = useRef(null)
    const refClose1 = useRef(null)

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const addNoteBtn = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        refClose1.current.click();
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Added Successfully!","success")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
        
    }
    const addNoteForm = () => {
        ref1.current.click();
    }

    return (
        <>
            <i className="fa-solid fa-file-circle-plus fa-2xl" onClick={addNoteForm} style={{ border: "none", background: "none" }} ></i>
            <button ref={ref1} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModalCenter">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <form >
                                <h1 className='d-flex justify-content-center'>ADD NOTE</h1>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input required minLength={3} type="text" className={` form-control ${note.title.length===0?'':note.title.length<3?'is-invalid':'is-valid'}`} value={note.title} placeholder="Your Note Title here" onChange={onChange} name="title" id="title" />
                                    <div className={note.title.length<3?'invalid-feedback':'valid-feedback'}>
                                    {note.title.length<3?'Please Enter a Valid Title':'Looks Good'}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input required minLength={10} type="text" className={` form-control ${note.description.length===0?'':note.description.length<10?'is-invalid':'is-valid'}`} placeholder="Your Note Description here" onChange={onChange} value={note.description} name="description" id="description" />
                                    <div className={note.description.length<10?'invalid-feedback':'valid-feedback'}>
                                    {note.description.length<10?'Please Enter a Valid Description':'Looks Good'}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tag">Tag</label>
                                    <input required type="text" className="form-control"  value={note.tag} placeholder="Your Note Tag here" onChange={onChange} name="tag" id="tag" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose1} type="button" className="btn btn-secondary" data-dismiss="modal"  >Close</button>
                            <button disabled={note.description.length<10||note.title.length<3} type="button" className="btn btn-primary" onClick={addNoteBtn} >Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
