var TaskList = require('../models/task_list.js');
var PieChart = require("./pie_chart.js");
var getTechCalendar = require("../models/get_tech_calendar.js");

var UI = function() {
  var taskList = new TaskList();
  taskList.all(function (allTasks) {
    this.renderTask(allTasks);
  }.bind(this));
  this.taskModalPopUp();
  this.dashboardModalPopUp();
}

UI.prototype = {

  dashboardModalPopUp: function() {
    var eventModal = document.getElementById('event-dashboard-modal-popup');
    var eventButton = document.getElementById("event-dashboard-button");
    var eventSpan = document.getElementsByClassName("close")[0];

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

  taskModalPopUp: function() {
    var taskModal = document.getElementById('task-modal-popup');
    var taskButton = document.getElementsByClassName("default-list-title");
    var span = document.getElementsByClassName("close")[0];


    // When the user clicks on the button, open the modal
    taskButton.onclick = function() {
        taskModal.style.display = "block";
        console.log("test", "this is default-list-title")
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        taskModal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == taskModal) {
            taskModal.style.display = "none";
        }
    }
  },


  renderTask: function(tasks) {
    var container = document.getElementById('todo-tasks-container');
    container.innerHTML = '';

    var taskCategoryCount = {};
    var indexCounter = 0;
    for (var task of tasks) {

      //RENDER TO SCREEN

      var taskWrapper = document.createElement('div');
      taskWrapper.classList.add('task-wrapper');
      var taskDescription = document.createElement('p');
      taskDescription.classList.add('task-description');
      var taskNode = document.createTextNode(task.description);
      taskDescription.appendChild(taskNode);
      taskWrapper.appendChild(taskDescription);

      var checkboxWrapper = document.createElement('form');
      checkboxWrapper.classList.add('checkbox');
      checkboxWrapper.method = "put";
      checkboxWrapper.value = indexCounter;
      // checkboxWrapper.addEventListener("change", function(event) {
      //   event.preventDefault()
      //   checkboxWrapper.submit()
      //   console.log("submitted");
      // })
      // checkboxWrapper.action = "pomotrello/" + checkboxWrapper.value;
      // console.log(checkboxWrapper.value);
      // indexCounter ++;
      var checkboxInput = document.createElement('input');
      checkboxInput.type = "checkbox";
      // checkboxInput.addEventListener("change", function(event) {
      //   event.preventDefault();
      //   checkboxWrapper.submit()
      //   console.log("checkbox changed", checkboxWrapper.action);
      // });


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



          // <div class="task-wrapper">
          //   <p class="task">Look to make task lists wider to account for checkbox divs</p>
          //   <div class="checkbox">
          //     <input type="checkbox" value="None" id="checkbox" name="check" checked />
          //     <label for="checkbox"></label>
          //   </div>
          // </div>



module.exports = UI;
