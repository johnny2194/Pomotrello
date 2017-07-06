var Task = require("./task.js");

var TaskList = function() {}

TaskList.prototype = {
  all: function(onTasksReady) {
    this.makeRequest("http://localhost:3000/pomotrello", function(allTasks) {
      onTasksReady(allTasks);
    });
  },
  makeRequest: function(url, onRequestComplete) {
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.addEventListener("load", function() {
      if (request.status !== 200) {
        console.log("Error in taskList makeRequest");
      };
      var jsonString = request.responseText;
      var resultsData = JSON.parse(jsonString);
      onRequestComplete(resultsData);
    });
    request.send();
  },
  add: function(newTask, onRequestComplete) {
    var jsonString = JSON.stringify(newTask);
    console.log("jsonString", jsonString);
    this.makePostRequest("http://localhost:3000/pomotrello", onRequestComplete, jsonString);
  },

  update: function(indexID, updatedTask, onRequestComplete) {
    var jsonString = JSON.stringify(updatedTask);
    console.log("jsonString", jsonString);
    this.makePutRequest("http://localhost:3000/pomotrello/" + indexID, onRequestComplete, jsonString);
  },

  delete: function(indexID, task, onRequestComplete) {
    var jsonString = JSON.stringify(task);
    console.log("jsonString", jsonString);
    this.makeDeleteRequest("http://localhost:3000/pomotrello/" + indexID, onRequestComplete, jsonString);
  },

  makePostRequest: function(url, onRequestComplete, payLoad) {
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function() {
      var jsonString = request.responseText;
      var updatedTasks = JSON.parse(jsonString);
      console.log("data added", updatedTasks)
      onRequestComplete(updatedTasks);
    });
    request.send(payLoad);
  },
  makePutRequest: function(url, onRequestComplete, payLoad) {
    var request = new XMLHttpRequest();
    request.open("PUT", url);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function() {
      var jsonString = request.responseText;
      var updatedTasks = JSON.parse(jsonString);
      console.log("data updated", updatedTasks)
      onRequestComplete(updatedTasks);
    });
    request.send(payLoad);
  },

  makeDeleteRequest: function(url, onRequestComplete, payLoad) {
    var request = new XMLHttpRequest();
    request.open("DELETE", url);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function() {
      var jsonString = request.responseText;
      var updatedTasks = JSON.parse(jsonString);
      console.log("data deleted", updatedTasks)
      onRequestComplete(updatedTasks);
    });
    request.send(payLoad);
  }
}













module.exports = TaskList;
