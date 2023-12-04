// Create web server 
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../db');
var connection = mysql.createConnection(db.mysql);
connection.connect();

// GET all comments
router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM comments', function(err, rows, fields) {
    if (err) throw err;
    res.send(rows);
  });
});

// GET comment by id
router.get('/:id', function(req, res, next) {
  connection.query('SELECT * FROM comments WHERE id = ?', req.params.id, function(err, rows, fields) {
    if (err) throw err;
    res.send(rows);
  });
});

// POST new comment
router.post('/', function(req, res, next) {
  var comment = req.body;
  connection.query('INSERT INTO comments SET ?', comment, function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});

// PUT update comment by id
router.put('/:id', function(req, res, next) {
  var comment = req.body;
  var id = req.params.id;
  connection.query('UPDATE comments SET ? WHERE id = ?', [comment, id], function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});

// DELETE comment by id
router.delete('/:id', function(req, res, next) {
  var id = req.params.id;
  connection.query('DELETE FROM comments WHERE id = ?', id, function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});

module.exports = router;