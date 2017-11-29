const database = require('../config/database');

exports.addNote = function(newNote) {
  return new Promise((resolve, reject) => {
    database.execQueryWithParams('INSERT INTO note(note_title, note) VALUES(?, ?)', [newNote.title, newNote.note])
    .then((results) => {
      database.execQueryWithParams(`INSERT INTO person_notes(notes_id, person_id, noter_id) VALUES(${results.insertId}, ?, ?)`, [newNote.personId, newNote.noterId])
      .then((result) => {
        return resolve(result);
      })
    })
    .catch((err) => {
      return reject(err);
    })
  })
}
