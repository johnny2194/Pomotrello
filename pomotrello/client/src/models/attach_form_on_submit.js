var TaskList = require("../models/task_list.js");

var attachFormOnSubmit = function() {
  var form = document.getElementById("add-task-form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();  //this stops redirect to new page

    var description = form["description-field"].value;
    var category = form["category-field"].value;
    var pomCount = form["pomCount-field"].value;
    var date = form["date-field"].value;
    var startTime = form["startTime-field"].value;
    var endTime = form["endTime-field"].value;


    var taskToAdd = {
      description: description,
      category: category,
      pomCount: pomCount,
      date: date,
      startTime: startTime,
      endTime: endTime,
      completed: false
    };

    var taskList = new TaskList();
    taskList.add(taskToAdd, function(newTask){
      window.location.reload();
    });
  });
}

module.exports = attachFormOnSubmit;
