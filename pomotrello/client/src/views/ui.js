var TaskList = require('../models/task_list.js');
var PieChart = require("./pie_chart.js");
var getTechCalendar = require("../models/get_tech_calendar.js");
var EditModalPopup = require("./edit_modal_popup.js");

var UI = function() {
  var taskList = new TaskList();
  taskList.all(function (allTasks) {
    this.renderTask(allTasks);
  }.bind(this));
  this.addTaskModalPopUp();
  this.dashboardModalPopUp();
}

var editModalPopup = new EditModalPopup();

UI.prototype = {

  addTaskModalPopUp: function() {
    var addTaskModal = document.getElementById("add-task-modal-popup");
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
    addTaskModal.onclick = function(event) {
        if (event.target == addTaskModal) {
            addTaskModal.style.display = "none";
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
    eventModal.onclick = function(event) {
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
      taskWrapper.classList.add('edit-task-button');
      taskWrapper.addEventListener("click", function(event){
        console.log("taskwrapper clicked", event);
        var editTaskModal = document.getElementById('edit-task-modal-popup');
        editTaskModal.style.display = "block";
        var editTaskContent = document.getElementById("edit-task-modal-content");
        editTaskContent.innerHTML = "";

        var taskToEdit = document.createElement("p");
        var taskToEditNode = document.createTextNode(event.target.textContent);
        taskToEdit.appendChild(taskToEditNode);
        editTaskContent.appendChild(taskToEdit);
        console.log(event.target.textContent);
      })
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

window.addEventListener("load", editModalPopup.editTaskModalPopUp)

module.exports = UI;
