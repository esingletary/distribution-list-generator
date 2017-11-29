const database = require('../config/database');

exports.addNote = function(newNote, callback) {
  database.execute('INSERT INTO note(note_title, note) VALUES(?, ?)', [newNote.title, newNote.note], callback);
  database.execute('INSERT INTO person_notes(notes_id, person_id, noter_id) VALUES(LAST_INSERT_ID(), ?, ?', [newNote.noterId, newNote.personId]);
}
