var TaskList = require('../models/task_list.js');
var PieChart = require("./pie_chart.js")

var UI = function() {
  var taskList = new TaskList();
  taskList.all(function (allTasks) {
    this.renderTask(allTasks);
  }.bind(this));
  this.modalPopUp();
}

UI.prototype = {

  modalPopUp: function() {
    var modal = document.getElementById('event-dashboard-modal-popup');
    var btn = document.getElementById("event-dashboard-button");
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal 
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
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



          // <div class="task-wrapper">
          //   <p class="task">Look to make task lists wider to account for checkbox divs</p>
          //   <div class="checkbox">
          //     <input type="checkbox" value="None" id="checkbox" name="check" checked />
          //     <label for="checkbox"></label>
          //   </div>
          // </div>



module.exports = UI;
