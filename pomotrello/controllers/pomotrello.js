var express = require("express");
var app = express();
var pomotrelloRouter = express.Router();

var Task = require("../client/src/models/task.js");
var PomotrelloQuery = require("../db/pomotrello_query.js");

var query = new PomotrelloQuery();

//index
pomotrelloRouter.get("/", function(req, res) {
  query.all(function(docs) {
    res.json(docs);
  });
});


//task by id
pomotrelloRouter.get("/:id", function(req, res){
  query.all(function(docs) {
    res.json(docs[req.params.id])
  });
});


//add new task
pomotrelloRouter.post("/", function(req, res) {
  var newTask = new Task( {
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


//delete task by id
pomotrelloRouter.delete("/:id", function(req, res) {
  query.all(function(docs) {
    var target = docs[req.params.id];
    query.delete(target, function(docs) {
      res.json(docs);
    });
  });
});


//update task
pomotrelloRouter.put("/:id", function(req, res) {
  query.all(function(docs) {
    var updatedTask = new Task( {
      description: req.body.description,
      category: req.body.category,
      pomCount: req.body.pomCount,
      date: req.body.date,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      completed: req.body.completed
    });
    var target = docs[req.params.id];
    query.update(target, updatedTask, function(docs) {
      res.json(docs);
    });
  });
});



module.exports = pomotrelloRouter;
