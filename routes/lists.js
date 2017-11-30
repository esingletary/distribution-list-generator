const express = require('express');
const router = express.Router();

const lists = require('../models/lists');

// List of all lists
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

// Show the add page
router.get('/add', (req, res) => res.render('lists/add'));

// Add a list in the database and redirect to it
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

// View a particular list and its members
router.get('/view/:id', (req, res) => {
  lists.getMembersOfList(req.params.id)
  .then((results) => {
      res.render('lists/view', {
        title: results[0].list_desc,
        list_id: req.params.id,
        results: results
      })
  })
});

// Add new members to the list being viewed
router.post('/view/:id', (req, res) => {
  let members = req.body.listMembers.split(',').map((item) => {return item.trim()});
  let membersArray = [];
  let listId = req.params.id;
  members.forEach((member) => {
    membersArray.push(lists.addToList(member, listId));
  })
  Promise.all(membersArray)
  .then(() => {
    res.redirect(`/lists/view/${listId}`);
  })
  .catch((err) => {
    console.log(err);
  })
})

// Show the list edit screen
router.get('/edit/:id', (req, res) => {
  lists.getListDetails(req.params.id)
  .then((results) => {
    let list_details = results[0];
    res.render('lists/edit', {
      results: list_details
    })
  })
  .catch((err) => {
    res.render('lists/edit', {
      err: err
    })
  })
});

// Edits the list's name
router.put('/edit/:id', (req, res) => {
  let listName = req.body.listName;
  let listId = req.params.id;
  lists.editListDetails(listId, listName)
  .then((result) => console.log(`Query successful: ${result.affectedRows} row(s) were affected. `))
  .catch((err) => console.log(err));
  res.redirect(`/lists/view/${listId}`);
});

router.delete('/delete/:noteid/:personid', (req, res) => {
  console.log(req.params);
  res.send(req.params);
})

module.exports = router;
