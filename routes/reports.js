const express = require('express');
const router = express.Router();
const database = require('../config/database');

router.get('/', (req, res) => res.render('reports/index'));

// Student Report
router.get('/students', (req, res) => res.redirect('/reports'));
router.post('/students', (req, res) => {
  let param = req.body.student_select;
  let query, title = '';

  switch(param) {
    case '*':
      query = `SELECT id, first_name, middle_name, last_name, email_address FROM person WHERE type = 'STU' ORDER BY last_name ASC`;
      title = 'All students';
    break;
    case 'freshmen':
      query = `SELECT person.id, person.first_name, person.middle_name, person.last_name, person.email_address FROM person
      JOIN student_acad_programs ON person.id = student_acad_programs.student_id
      WHERE type = 'STU' AND credits_earned < 30 ORDER BY last_name ASC`;
      title = 'Freshmen';
    break;
    case 'sophomores':
      query = `SELECT person.id, person.first_name, person.middle_name, person.last_name, person.email_address FROM person
      JOIN student_acad_programs ON person.id = student_acad_programs.student_id
      WHERE type = 'STU' AND credits_earned >= 30 AND credits_earned < 60 ORDER BY last_name ASC`;
      title = 'Sophomores';
    break;
    case 'juniors':
    query = `SELECT person.id, person.first_name, person.middle_name, person.last_name, person.email_address FROM person
      JOIN student_acad_programs ON person.id = student_acad_programs.student_id
      WHERE type = 'STU' AND credits_earned >= 60 AND credits_earned < 90 ORDER BY last_name ASC`;
      title = 'Juniors';
    break;
    case 'seniors':
    query = `SELECT person.id, person.first_name, person.middle_name, person.last_name, person.email_address FROM person
      JOIN student_acad_programs ON person.id = student_acad_programs.student_id
      WHERE type = 'STU' AND credits_earned >= 90 ORDER BY last_name ASC`;
      title = 'Seniors';
    break;
    default:
      query = null;
      title = null;
  }
  if (query != null) {
  database.execQuery(query)
  .then((results) => {
    res.render('reports/students', {
      title: title,
      results: results
    })
  })
  .catch((err) => {
    res.render('reports/students', {
      err: err
    })
  })
}
});

// Staff Report
router.get('/staff', (req, res) => {
  database.execQuery(`SELECT id, first_name, middle_name, last_name, email_address FROM person WHERE type = 'STA'`)
  .then((results) => {
    res.render('reports/staff',{
      title: 'Staff',
      results: results
    })
  })
  .catch((err) => {
    res.render('reports/staff',{
      err: err
    })
  })
});

// Faculty Report
router.get('/faculty', (req, res) => {
  database.execQuery(`SELECT id, first_name, middle_name, last_name, email_address FROM person WHERE type = 'FAC'`)
  .then((results) => {
    res.render('reports/faculty',{
      title: 'Faculty',
      results: results
    })
  })
  .catch((err) => {
    res.render('reports/faculty',{
      err: err
    })
  })
});

// Clubs Report
router.get('/clubs', (req, res) => res.redirect('/reports'));
router.post('/clubs', (req, res) => {
  let param = req.body.club_select;
  if (param == '*') {
    database.execQuery(`
    SELECT club.club_desc, person.id, person.first_name, person.middle_name, person.last_name, person.email_address
    FROM student_clubs
    JOIN club ON student_clubs.club_id = club.club_id
    JOIN person ON student_clubs.person_id = person.id
    ORDER BY club_desc ASC, last_name ASC
    `)
    .then((results) => {
      res.render('reports/clubs', {
        title: 'All clubs',
        results: results,
        allclubs: true
      })
    })
    .catch((err) => {
      res.render('reports/clubs', {
        err: err
      })
    })
  } else {
    database.execQueryWithParams(`
    SELECT club.club_desc, person.id, person.first_name, person.middle_name, person.last_name, person.email_address
    FROM student_clubs
    JOIN club ON student_clubs.club_id = club.club_id
    JOIN person ON student_clubs.person_id = person.id
    WHERE club.club_id = ?
    ORDER BY club_desc ASC, last_name ASC
    `, param)
    .then((results) => {
      res.render('reports/clubs', {
        title: results[0].club_desc,
        results: results,
        allclubs: false
      })
    })
    .catch((err) => {
      res.render('reports/clubs', {
        err: err
      })
    })
  }
});

// Sports Report
router.get('/sports', (req, res) => res.redirect('/reports'));
router.post('/sports', (req, res) => {
  let param = req.body.sport_select;
  if (param == '*') {
    database.execQuery(`
    SELECT sport.sport_desc, person.id, person.first_name, person.middle_name, person.last_name, person.email_address
    FROM student_sports
    JOIN sport ON student_sports.sport_id = sport.sport_id
    JOIN person ON student_sports.person_id = person.id
    ORDER BY sport_desc ASC, last_name ASC
    `)
    .then((results) => {
      res.render('reports/sports', {
        title: 'All sports',
        results: results,
        allsports: true
      })
    })
    .catch((err) => {
      res.render('reports/sports', {
        err: err
      })
    })
  } else {
    database.execQueryWithParams(`
    SELECT sport.sport_desc, person.id, person.first_name, person.middle_name, person.last_name, person.email_address
    FROM student_sports
    JOIN sport ON student_sports.sport_id = sport.sport_id
    JOIN person ON student_sports.person_id = person.id
    WHERE sport.sport_id = ?
    ORDER BY sport_desc ASC, last_name ASC
    `, param)
    .then((results) => {
      res.render('reports/sports', {
        title: results[0].sport_desc,
        results: results,
        allsports: false
      })
    })
    .catch((err) => {
      res.render('reports/sports', {
        err: err
      })
    })
  }
});

// Academic Programs Report
router.get('/acad', (req, res) => res.redirect('/reports'));
router.post('/acad', (req, res) => {
  let param = req.body.acad_select;
  if (param == '*') {
    database.execQuery(`
    SELECT acad_program.program_desc, person.id, person.first_name, person.middle_name, person.last_name, person.email_address
    FROM student_acad_programs
    JOIN acad_program ON student_acad_programs.program_id = acad_program.program_id
    JOIN person ON student_acad_programs.student_id = person.id
    ORDER BY program_desc ASC, last_name ASC
    `)
    .then((results) => {
      res.render('reports/acad', {
        title: 'All programs',
        results: results,
        allprograms: true
      })
    })
    .catch((err) => {
      res.render('reports/acad', {
        err: err
      })
    })
  } else {
    database.execQueryWithParams(`
    SELECT acad_program.program_desc, person.id, person.first_name, person.middle_name, person.last_name, person.email_address
    FROM student_acad_programs
    JOIN acad_program ON student_acad_programs.program_id = acad_program.program_id
    JOIN person ON student_acad_programs.student_id = person.id
    WHERE acad_program.program_id = ?
    ORDER BY program_desc ASC, last_name ASC
    `, param)
    .then((results) => {
      res.render('reports/acad', {
        title: results[0].program_desc,
        results: results,
        allprograms: false
      })
    })
    .catch((err) => {
      res.render('reports/acad', {
        err: err
      })
    })
  }
});

module.exports = router;
