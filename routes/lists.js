const express = require('express');
const router = express.Router();
const database = require('../config/database');

router.get('/', (req, res) => res.render('lists/index'));

module.exports = router;
