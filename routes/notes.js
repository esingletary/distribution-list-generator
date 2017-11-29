const express = require('express');
const router = express.Router();
const database = require('../config/database');

const notes = require('../models/notes');

router.get('/', (req, res) => res.render('notes/index'));
router.get('/add', (req, res) => res.render('notes/add'));

router.post('/', (req, res) => {
  const newNote = {
    noterId: req.body.noterId,
    personId: req.body.personId,
    title: req.body.title,
    note: req.body.note
  }
  notes.addNote(newNote)
  .then((result) => console.log(`Query successful: ${result.affectedRows} row(s) were affected. `))
  .catch((err) => console.log(err));
  res.redirect('/notes');
});

module.exports = router;
