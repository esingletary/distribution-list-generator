const database = require('../config/database');

// Add a new custom list
exports.addList = function(newList) {
  return new Promise((resolve, reject) => {
    database.execQueryWithParams('INSERT INTO custom_list(list_desc, list_owner) VALUES(?, ?)', [newList.desc, newList.personId])
    .then((results) => {
        return resolve(result);
      })
    .catch((err) => {
      return reject(err);
    })
  })
}

// Delete a custom list along with all members
exports.deleteList = function(listId) {
  return new Promise((resolve, reject) => {
    database.execQueryWithParams('DELETE FROM person_list WHERE list_id = ?)', listId)
    .then((results) => {
      database.execQueryWithParams(`DELETE FROM custom_list WHERE list_id = ?`, listId)
      .then((result) => {
        return resolve(result);
      })
    })
    .catch((err) => {
      return reject(err);
    })
  })
}

// Get all custom lists
exports.getLists = function() {
  return new Promise((resolve, reject) => {
    database.execQuery(`
      SELECT list_id, list_desc, first_name, middle_name, last_name
      FROM custom_list
      JOIN person ON custom_list.list_owner = person.id
    `)
    .then((results) => {
      return resolve(results);
    })
    .catch((err) => {
      return reject(err);
    })
  })
}

// Add a person to a specified custom list
exports.addToList = function(personId, listId) {
  return new Promise((resolve, reject) => {
    database.execQueryWithParams('INSERT INTO person_list(person_id, list_id) VALUES(?, ?)', [personId, listId])
    .then((results) => {
        return resolve(result);
      })
    .catch((err) => {
      return reject(err);
    })
  })
}

// Delete a person from a custom list
exports.deleteFromList = function(personId, listId) {
  return new Promise((resolve, reject) => {
    database.execQueryWithParams('DELETE FROM person_list WHERE person_id = ? AND list_id = ?', [personId, listId])
    .then((results) => {
        return resolve(result);
      })
    .catch((err) => {
      return reject(err);
    })
  })
}

// Get members of a custom list
exports.getMembersOfList = function(listId) {
  return new Promise((resolve, reject) => {
    database.execQueryWithParams(`
      SELECT id, first_name, middle_name, last_name, email_address
      FROM person_list
      JOIN person ON person_list.person_id = person.id
      WHERE list_id = ?
    `, listId)
    .then((results) => {
        return resolve(result);
      })
    .catch((err) => {
      return reject(err);
    })
  })
}
