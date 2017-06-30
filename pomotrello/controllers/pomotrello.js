var express = require('express');
var app = express();
var pomotrelloRouter = express.Router();

var Task = require('../client/src/models/task.js');

var PomotrelloQuery = require('../db/pomotrello_query.js');
var query = new PomotrelloQuery();

//index 
pomotrelloRouter.get('/', function(req, res) {
  query.all(function(docs) {
    res.json(docs);
  });
});

module.exports = pomotrelloRouter;
