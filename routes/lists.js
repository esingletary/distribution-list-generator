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

router.post('/add', (req, res) => {
  let members = req.body.listMembers.split(',').map((item) => {return item.trim()});
  let newList = {
    desc: req.body.listName,
    personId: req.body.ownerId
  }
  lists.addList(newList)
  .then((result) => {
    let listId = result.insertId;
    let membersArray = [];
    members.forEach((member) => {
      membersArray.push(lists.addToList(member, listId));
    })
    Promise.all(membersArray)
    .then(() => {
      res.redirect(`/lists/view/${listId}`);
    })
  })
  .catch((err) => {
    console.log(err);
  })
});

router.get('/view/:id', (req, res) => {
  lists.getMembersOfList(req.params.id)
  .then((results) => {
      res.render('lists/view', {
        title: results[0].list_desc,
        results: results
      })
  })
});

router.get('/edit/:id', (req, res) => res.render('lists/edit'));

module.exports = router;
