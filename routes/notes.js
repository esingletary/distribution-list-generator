const express = require('express');
const router = express.Router();

const notes = require('../models/notes');

// View people with notes
router.get('/', (req, res) => {
  notes.getNoted()
  .then((results) => {
    res.render('notes/index',{
      results: results
    });
  })
  .catch((err) => {
    res.render('notes/index', {
      err: err
    })
  })
});

// View a person's notes
router.get('/view/:id', (req, res) => {
  notes.getAllNotes(req.params.id)
  .then((results) => {
    res.render('notes/view', {
      results: results,
      title: results[0].notee
    })
  })
  .catch((err) => {
    res.render('notes/view', {
      err: err
    })
  })
});

// New note
router.get('/add', (req, res) => res.render('notes/add'));

// Create new note in database
router.post('/add', (req, res) => {
  const newNote = {
    noterId: req.body.noterId,
    personId: req.body.personId,
    title: req.body.title,
    note: req.body.note
  }
  notes.addNote(newNote)
  .then((result) => console.log(`Query successful: ${result.affectedRows} row(s) were affected. `))
  .catch((err) => console.log(err));
  setTimeout(() => res.redirect(`/notes/view/${newNote.personId}`), 250);
});

// Edit a note
router.get('/edit/:id', (req, res) => {
  notes.getNote(req.params.id)
  .then((results) => {
    let note_details = results[0];
    res.render('notes/edit',{
      results: note_details
    })
  })
  .catch((err) => {
    res.render('notes/edit', {
      err: err
    })
  })
});

// Edit note in database
router.put('/edit/:id', (req, res) => {
  const editedNote = {
    title: req.body.title,
    note: req.body.note,
    note_id: req.params.id
  }
  notes.editNote(editedNote)
  .then((result) => console.log(`Query successful: ${result.affectedRows} row(s) were affected. `))
  .catch((err) => console.log(err));
  res.redirect(`/notes/view/${req.body.personId}`);
});

// Delete note
router.delete('/delete/:id', (req, res) => {
  notes.deleteNote(req.params.id)
  .then((result) => console.log(`Query successful: ${result.affectedRows} row(s) were affected. `))
  .catch((err) => console.log(err));
  res.redirect('/notes');
});

module.exports = router;
