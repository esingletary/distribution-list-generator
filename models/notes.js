const database = require('../config/database');

// Get a single note
exports.getNote = function(noteId) {
  return new Promise((resolve, reject) => {
    database.execQueryWithParams(`
      SELECT note_id, noter_id, person_id, note_title, note
      FROM note
      JOIN person_notes ON note.note_id = person_notes.notes_id
      WHERE note_id = ?
    `, noteId)
    .then((results) => {
      return resolve(results);
    })
    .catch((err) => {
      return reject(err);
    })
  })
}

// Get all of the notes for one person
exports.getAllNotes = function(personId) {
  return new Promise((resolve, reject) => {
    database.execQueryWithParams(`
      SELECT person_notes.notes_id,
      CONCAT(noter.first_name, " ", noter.middle_name, " ", noter.last_name) AS 'noter',
      CONCAT(notee.first_name, " ", notee.middle_name, " ", notee.last_name) AS 'notee',
      note.note_title, note.note
      FROM person_notes
      JOIN note ON person_notes.notes_id = note.note_id
      JOIN person noter ON person_notes.noter_id = noter.id
      JOIN person notee ON person_notes.person_id = notee.id
      WHERE person_id = ?;
    `, personId)
    .then((results) => {
      return resolve(results);
    })
    .catch((err) => {
      return reject(err);
    })
  })
}

// Get all of the people whom have notes about them
exports.getNoted = function() {
  return new Promise((resolve, reject) => {
    database.execQuery(`
      SELECT person_id, first_name, middle_name, last_name, COUNT(person_id) AS 'num_of_notes'
      FROM person_notes
      JOIN person ON person_notes.person_id = person.id
      GROUP BY person_id ORDER BY last_name
    `)
    .then((results) => {
      return resolve(results);
    })
    .catch((err) => {
      return reject(err);
    })
  })
}

// Add a new note
exports.addNote = function(newNote) {
  return new Promise((resolve, reject) => {
    database.execQueryWithParams(`INSERT INTO note(note_title, note) VALUES(?, ?)`, [newNote.title, newNote.note])
    .then((results) => {
      database.execQueryWithParams(`INSERT INTO person_notes(notes_id, person_id, noter_id) VALUES(${results.insertId}, ?, ?)`, [newNote.personId, newNote.noterId])
      .then((results) => {
        return resolve(results);
      })
    })
    .catch((err) => {
      return reject(err);
    })
  })
}

// Edit a previous note
exports.editNote = function(editedNote) {
  return new Promise((resolve, reject) => {
    database.execQueryWithParams(`
      UPDATE note SET note_title = ?, note = ?
      WHERE note_id = ?;
    `, [editedNote.title, editedNote.note, editedNote.note_id])
    .then((results) => {
      return resolve(results);
    })
    .catch((err) => {
      return reject(err);
    })
  })
}

// Delete a note
exports.deleteNote = function(noteId) {
  return new Promise((resolve, reject) => {
    database.execQueryWithParams(`DELETE FROM person_notes WHERE notes_id = ?`, noteId)
    .then((results) => {
      database.execQueryWithParams(`DELETE FROM note WHERE note_id = ?`, noteId)
      .then((results) => {
        return resolve(results);
      })
    })
    .catch((err) => {
      return reject(err);
    })
  })
}
