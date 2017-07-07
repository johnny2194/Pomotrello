var PieChart = require("../views/pie_chart.js");
var TaskList = require("./task_list.js");
var moment = require("moment");

var renderPieChart = function() {

  var pieDatePicker = document.getElementById("date-picker-pie-chart");

  pieDatePicker.addEventListener("change", function(event) {

    var selectedDate = moment(event.target.value, "YYYY-MM-DD");
    var taskList = new TaskList();
    var taskCategoryCount = {};

    taskList.all(function(allTasks) {
      allTasks.forEach(function(task) {

        if(moment(task.date, "YYYY-MM-DD").isSame(selectedDate, "day")) {

          var category = task.category;

          var pomCountInt = parseInt(task.pomCount);
          taskCategoryCount[category] = taskCategoryCount[category] ? taskCategoryCount[category]+pomCountInt : pomCountInt;
        };
      });

      var formattedCategoryData = [];

      for(category in taskCategoryCount) {
        var dataObject = {};
        dataObject.name = category;
        dataObject.y = taskCategoryCount[category];
        formattedCategoryData.push(dataObject);
      };
      new PieChart(formattedCategoryData);
    });
  });
};

window.addEventListener("load", renderPieChart);

module.exports = renderPieChart;
