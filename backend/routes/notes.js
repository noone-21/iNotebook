const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


// --------------------ADD NOTES TO THE DATABASE--------------------
router.post('/addnote', fetchuser, [
    body('title', 'Enter a Valid Title!').isLength({ min: 3 }),
    body('description', 'Description should be atleast 10 characters').isLength({ min: 10 }),
], async (req, res) => {

    const { title, description, tag } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error')
    }


})

// --------------------GET NOTES FROM THE DATABASE----------------
router.get('/fetchnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error')
    }
})

// --------------------UPDATE EXISTING NOTES IN THE DATABASE--------------------
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    const { title, description, tag } = req.body;
    try {

        const newNote={};
        if(title){newNote.title=title};
        if(description){newNote.description=description};
        if(tag){newNote.tag=tag};

        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Note not Found")}

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed!")
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
        res.json(note);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error')
    }
})

// --------------------DELETE EXISTING NOTES FROM THE DATABASE--------------------
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {

        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Note not Found")}

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed!")
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"Success": "This Note has been deleted", note: note});

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error')
    }
})

module.exports = router