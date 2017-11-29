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
app.get('/reports', (req, res) => res.render('reports'));

// Reports
app.get('/reports/students', (req, res) => res.render('reports/students')); // All students
app.get('/reports/faculty', (req, res) => res.render('reports/faculty'));// All faculty
app.get('/reports/staff', (req, res) => res.render('reports/staff'));// All staff

// Lists
app.get('/lists', (req, res) => res.render('lists'));

// Notes
app.get('/notes', (req, res) => res.render('notes'));
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
  res.send(newNote);
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
