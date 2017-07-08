var TaskList = require("./task_list.js");
var PieChart = require("../views/pie_chart.js");
var renderPieChart = require("../models/render_pie_chart.js");
var attachFormOnSubmit = require("./attach_form_on_submit.js");
var RangeFinder = require("../views/range_finder.js");
var taskModalPopup = require("../views/task_modal_popups.js");
var editModalPopup = require("../views/edit_modal_popups.js");
var displayModalPopup = require("../views/display_modal_popups.js");
var TaskDealer = require("../views/task_dealer.js");
var getTechCalendar = require("./get_tech_calendar.js");
var timer = require("./timer.js");
var _ = require("lodash");

_.mixin({
  "sortKeysBy": function (obj, comparator) {
    var keys = _.sortBy(_.keys(obj), function (key) {
      return comparator ? comparator(obj[key], key) : key;
    });

    return _.zipObject(keys, _.map(keys, function (key) {
      return obj[key];
    }));
  }
});


var renderTasks = function(tasks) {

  var taskDealer = new TaskDealer();
  taskDealer.initialise();

  var taskCategoryCount = {};
  var dailyPomCount = {};
  var counter = 0;

  ////////START OF FOREACH LOOP
  tasks.forEach(function(task) {
    // ASSIGN indexID
    task.indexID = counter;
    counter++;

    //RENDER BASIC LIST ITEM TO SCREEN
    var taskWrapper = document.createElement("div");
    taskWrapper.classList.add("task-wrapper");
    var taskDescription = document.createElement("p");
    taskDescription.classList.add("task-description");
    var taskNode = document.createTextNode(task.description + " (" + task.pomCount + ")");
    taskDescription.appendChild(taskNode);
    taskDescription.classList.add("edit-task-button");

    editModalPopup(taskDescription, task);

    taskWrapper.appendChild(taskDescription);

    //CHECKBOX MECHANICS
    var checkboxWrapper = document.createElement("div");
    checkboxWrapper.classList.add("checkbox");
    var checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";

    if(task.completed === true) {
      checkboxInput.checked = true;
    } else {
      checkboxInput.checked = false;
    };

    checkboxInput.addEventListener("change", function(){
      var editSubmit = document.getElementById("edit-task-form");
      editSubmit.action = "pomotrello/" + task.indexID;

      if(checkboxInput.checked=== true) {
        task.completed= true;
      } else {
        task.completed = false;
      };

      if(task.completed === true) {
        checkboxInput.checked = true;
      } else {
        checkboxInput.checked = false;
      };

      var taskToUpdate = task;

      var taskList = new TaskList();
      taskList.update(task.indexID, taskToUpdate, function(updatedTask){
      });
    });

    checkboxWrapper.appendChild(checkboxInput);
    taskWrapper.appendChild(checkboxWrapper);

    taskDealer.dealTask(taskWrapper, task);

    //PIE CHART INFO
    var category = task.category;
    var pomCountInt = parseInt(task.pomCount);
    taskCategoryCount[category] = taskCategoryCount[category] ? taskCategoryCount[category]+pomCountInt : pomCountInt;


    //GRAPH INFO
    var taskDate = task.date;
    dailyPomCount[taskDate] = dailyPomCount[taskDate] ? dailyPomCount[taskDate]+pomCountInt : pomCountInt;
  });
  ////////////END OF FOREACH LOOP


  //PIECHART CHART DATA AND CREATE
  var formattedCategoryData = [];
  var lineGraphData = [];
  var lineGraphDates = [];

  for(category in taskCategoryCount) {
    var dataObject = {};
    dataObject.name = category;
    dataObject.y = taskCategoryCount[category];
    formattedCategoryData.push(dataObject);
  };
  new PieChart(formattedCategoryData);

  //LINE CHART DATA AND CREATE
  var sortedDailyPomCount = _.sortKeysBy(dailyPomCount);

  for(taskDate in sortedDailyPomCount) {
    var graphDataObject = { color: "#7766ad"};
    graphDataObject.y = sortedDailyPomCount[taskDate];
    lineGraphData.push(graphDataObject);
    lineGraphDates.push(taskDate);
  };
  new RangeFinder(lineGraphData, lineGraphDates);
};


module.exports = renderTasks;
