const database = require('../config/database');

// Add a new custom list
exports.addList = function(newList) {
  return new Promise((resolve, reject) => {
    database.execQueryWithParams(`INSERT INTO custom_list(list_desc, list_owner) VALUES(?, ?)`, [newList.desc, newList.personId])
    .then((results) => {
      return resolve(results);
    })
    .catch((err) => {
      return reject(err);
    })
  })
}

// Delete a custom list along with all members
exports.deleteList = function(listId) {
  return new Promise((resolve, reject) => {
    database.execQueryWithParams(`DELETE FROM person_list WHERE list_id = ?`, listId)
    .then((results) => {
      database.execQueryWithParams(`DELETE FROM custom_list WHERE list_id = ?`, listId)
      .then((results) => {
        return resolve(results);
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
    SELECT custom_list.list_id, list_desc,
    CONCAT(first_name, " ", middle_name, " ", last_name) AS 'owner',
      COUNT(person_list.person_id) AS 'member_count'
    FROM custom_list
    LEFT JOIN person_list ON custom_list.list_id = person_list.list_id
    JOIN person ON custom_list.list_owner = person.id
    GROUP BY custom_list.list_id
    `)
    .then((results) => {
      return resolve(results);
    })
    .catch((err) => {
      return reject(err);
    })
  })
}

// Get the details of one list in particular
exports.getListDetails = function(listId) {
  return new Promise((resolve, reject) => {
    database.execQueryWithParams(`
      SELECT custom_list.list_id AS list_id, list_desc, list_owner
      FROM custom_list
      WHERE custom_list.list_id = ?
    `, listId)
    .then((results) => {
      return resolve(results);
    })
    .catch((err) => {
      return reject(err);
    })
  })
}

exports.editListDetails = function(listId, listName) {
  return new Promise((resolve, reject) => {
    database.execQueryWithParams(`
      UPDATE custom_list SET list_desc = ?
      WHERE list_id = ?
    `, [listName, listId])
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
    database.execQueryWithParams(`INSERT IGNORE INTO person_list(person_id, list_id) VALUES(?, ?)`, [personId, listId])
    .then((results) => {
        return resolve(results);
    })
    .catch((err) => {
      return reject(err);
    })
  })
}

// Delete a person from a custom list
exports.deleteFromList = function(personId, listId) {
  return new Promise((resolve, reject) => {
    database.execQueryWithParams(`DELETE FROM person_list WHERE person_id = ? AND list_id = ?`, [personId, listId])
    .then((results) => {
        return resolve(results);
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
      SELECT custom_list.list_desc, id, first_name, middle_name, last_name, email_address
      FROM person_list
      JOIN person ON person_list.person_id = person.id
      JOIN custom_list ON person_list.list_id = custom_list.list_id
      WHERE person_list.list_id = ?
    `, listId)
    .then((results) => {
      if (results[0] == null) {
        database.execQueryWithParams(`SELECT list_desc FROM custom_list WHERE list_id = ?`, listId)
        .then((results) => {
          return resolve(results);
        })
        .catch((err) => {
          return reject(err);
        })
      } else {
        return resolve(results);
      }
    })
    .catch((err) => {
      return reject(err);
    })
  })
}
