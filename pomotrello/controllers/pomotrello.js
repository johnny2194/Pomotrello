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

//add new task
pomotrelloRouter.post("/", function(req, res) {
  var newTask = new Task(   {
      description: req.body.description,
      category: req.body.category,
      pomCount: req.body.pomCount,
      date: req.body.date,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      completed: req.body.completed
    });
    query.add(newTask, function(docs) {
      res.json(docs);
    });
});











module.exports = pomotrelloRouter;
