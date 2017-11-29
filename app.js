const express = require('express');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const database = require('./config/database');

const notes = require('./models/notes');

// Setup express for middleware
const app = express();

// Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser middleware
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

// Home
app.get('/', (req, res) => res.render('index'));

// Reports index
app.get('/reports', (req, res) => res.render('reports/index'));

// Reports
app.get('/reports/students', (req, res) => {
  database.execQuery(`SELECT * FROM person WHERE type = 'STU'`)
  .then((results) => {
    res.render('reports/students',{
      results: results
    })
  })
  .catch((err) => {
    res.render('reports/students',{
      err: err
    })
  })
}); // All students

app.get('/reports/faculty', (req, res) => {
  database.execQuery(`SELECT * FROM person WHERE type = 'FAC'`)
  .then((results) => {
    res.render('reports/faculty',{
      results: results
    })
  })
  .catch((err) => {
    res.render('reports/faculty',{
      err: err
    })
  })
});// All faculty

app.get('/reports/staff', (req, res) => {
  database.execQuery(`SELECT * FROM person WHERE type = 'STA'`)
  .then((results) => {
    res.render('reports/staff',{
      results: results
    })
  })
  .catch((err) => {
    res.render('reports/staff',{
      err: err
    })
  })
});

// Lists
app.get('/lists', (req, res) => res.render('lists'));

// Notes
app.get('/notes', (req, res) => res.render('notes/index'));
app.get('/notes/add', (req, res) => res.render('notes/add'));

app.post('/notes', (req, res) => {
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

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
