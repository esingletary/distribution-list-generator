const express = require('express');
const router = express.Router();
const database = require('../config/database');

router.get('/', (req, res) => res.render('reports/index'));

router.get('/students', (req, res) => {
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
});

router.get('/faculty', (req, res) => {
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
});

router.get('/staff', (req, res) => {
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

router.post('/', (req, res) => {
  console.log(req.body)
  res.send(req.body);
})

module.exports = router;
