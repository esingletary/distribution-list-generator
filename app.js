const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const database = require('./config/database');

// Route imports
const reports = require('./routes/reports');
const notes = require('./routes/notes');
const lists = require('./routes/lists');

// Express
const app = express();
const port = process.env.PORT || 5000;

// Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Method Override
app.use(methodOverride('_method'));

// Setup our routes
app.use('/reports', reports);
app.use('/notes', notes);
app.use('/lists', lists);

app.get('/', (req, res) => res.render('index'));

app.listen(port, () => console.log(`Server started on port ${port}`));
