const express = require('express');
const router = express.Router();

const lists = require('../models/lists');

router.get('/', (req, res) => {
  lists.getLists()
  .then((results) => {
    res.render('lists/index', {
      results: results
    });
  })
  .catch((err) => {
    res.render('lists/index', {
      err: err
    });
  })
});

router.get('/add', (req, res) => res.render('lists/add'));

router.get('/view/:id', (req, res) => res.render('lists/view'));

router.get('/edit/:id', (req, res) => res.render('lists/edit'));

module.exports = router;
