const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Index route
app.get('/', (req, res) => {
  res.render('index');
});

// Reports route
app.get('/reports', (req, res) => {
  res.render('reports');
});

// Lists route
app.get('/lists', (req, res) => {
  res.render('lists');
});

// Notes route
app.get('/notes', (req, res) => {
  res.render('notes');
});

const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
