var TaskList = require('../models/task_list.js');
var PieChart = require("./pie_chart.js");
var getTechCalendar = require("../models/get_tech_calendar.js");

var UI = function() {
  var taskList = new TaskList();
  taskList.all(function (allTasks) {
    this.renderTask(allTasks);
  }.bind(this));
  this.addTaskModalPopUp();
  this.dashboardModalPopUp();
  this.editTaskModalPopUp();
}

UI.prototype = {

  addTaskModalPopUp: function() {
    var addTaskModal = document.getElementById('add-task-modal-popup');
    var addTaskButton = document.getElementById("add-task-button");
    var addTaskSpan = document.getElementById("close-add-task-modal-popup");

    // When the user clicks on the button, open the modal
    addTaskButton.onclick = function() {
        addTaskModal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    addTaskSpan.onclick = function() {
        addTaskModal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == addTaskModal) {
            addTaskModal.style.display = "none";
        }
    }
  },

  editTaskModalPopUp: function() {
    var editTaskModal = document.getElementById('edit-task-modal-popup');
    var editTaskButton = document.getElementById("edit-task-button");
    var editTaskSpan = document.getElementById("close-edit-task-modal-popup");

    // When the user clicks on the button, open the modal
    editTaskButton.onclick = function() {
        editTaskModal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    editTaskSpan.onclick = function() {
        editTaskModal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == editTaskModal) {
            editTaskModal.style.display = "none";
        }
    }
  },

  dashboardModalPopUp: function() {
    var eventModal = document.getElementById('event-dashboard-modal-popup');
    var eventButton = document.getElementById("event-dashboard-button");
    var eventSpan = document.getElementById("close-event-dashboard-modal-popup");

    // When the user clicks on the button, open the modal
    eventButton.onclick = function() {
        eventModal.style.display = "block";
        getTechCalendar();
    }

    // When the user clicks on <span> (x), close the modal
    eventSpan.onclick = function() {
        eventModal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == eventModal) {
            eventModal.style.display = "none";
        }
    }
  },

  renderTask: function(tasks) {
    var container = document.getElementById('todo-tasks-container');
    container.innerHTML = '';

    var taskCategoryCount = {};

    for (var task of tasks) {

      //RENDER TO SCREEN

      var taskWrapper = document.createElement('div');
      taskWrapper.classList.add('task-wrapper');
      var taskDescription = document.createElement('p');
      taskDescription.classList.add('task-description');
      var taskNode = document.createTextNode(task.description)
      taskDescription.appendChild(taskNode);
      taskWrapper.appendChild(taskDescription);

      var checkboxWrapper = document.createElement('div');
      checkboxWrapper.classList.add('checkbox');
      var checkboxInput = document.createElement('input');
      checkboxInput.type = "checkbox";

      if(task.completed === true) {
        checkboxInput.checked = true;
      } else {
        checkboxInput.checked = false;
      }
      checkboxWrapper.appendChild(checkboxInput);
      taskWrapper.appendChild(checkboxWrapper);
      container.appendChild(taskWrapper);

      //PIE CHART INFO

      var category = task.category;
      var pomCountInt = parseInt(task.pomCount);
      taskCategoryCount[category] = taskCategoryCount[category] ? taskCategoryCount[category]+pomCountInt : pomCountInt;
    }

    var formattedCategoryData = [];

    for(category in taskCategoryCount) {
      var dataObject = {}
      dataObject.name = category;
      dataObject.y = taskCategoryCount[category];

      formattedCategoryData.push(dataObject);
    }

    //CREATE PIECHART
  new PieChart(formattedCategoryData);

  }

}


module.exports = UI;
