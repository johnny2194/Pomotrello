var TaskList = require('../models/task_list.js');
var PieChart = require("./pie_chart.js")

var UI = function() {
  var taskList = new TaskList();
  taskList.all(function (allTasks) {
    this.renderTask(allTasks);
  }.bind(this));
}

UI.prototype = {
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
      taskCategoryCount[category] = taskCategoryCount[category] ? taskCategoryCount[category]+task.pomCount : task.pomCount;
    }

    var formattedCategoryData = [];

    for(category in taskCategoryCount) {
      var datObject = {}
      datObject.name = category;
      dataObject.y = taskCategoryCount[category];

      formattedCategoryData.push(dataObject);
    }

    //CREATE PIECHART

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
