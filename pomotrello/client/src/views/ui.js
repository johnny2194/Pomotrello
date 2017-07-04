var TaskList = require('../models/task_list.js');
var PieChart = require("./pie_chart.js");
var RangeFinder = require("./range_finder.js");
var getTechCalendar = require("../models/get_tech_calendar.js");
var moment = require('moment');


var UI = function() {
  var taskList = new TaskList();
  taskList.all(function (allTasks) {
    this.renderTask(allTasks);
  }.bind(this));
  this.attachFormOnSubmit();
  this.addTaskModalPopUp('add-task-button');
  this.addTaskModalPopUp('add-task-button-today');
  this.addTaskModalPopUp('add-task-button-tomorrow');
  this.addTaskModalPopUp('add-task-button-this-week');
  this.addTaskModalPopUp('add-task-button-upcoming');
  this.dashboardModalPopUp();
}

UI.prototype = {
  attachFormOnSubmit: function(){
    var form = document.getElementById('add-task-form');
    form.addEventListener('submit', function (event) {
      event.preventDefault();  //this stops redirect to new page

      var description =form['description-field'].value;
      var category =form['category-field'].value;
      var pomCount =form['pomCount-field'].value;
      var date =form['date-field'].value;
      var startTime =form['startTime-field'].value;
      var endTime = form['endTime-field'].value;


      var taskToAdd = {
        description: description,
        category: category,
        pomCount: pomCount,
        date: date,
        startTime: startTime,
        endTime: endTime,
        completed: false
      }

      console.log(taskToAdd)

      var taskList = new TaskList();
      taskList.add(taskToAdd, function(newTask){
        console.log('response in ui:', newTask);
        window.location.reload()
      })
    })
  },

  addTaskModalPopUp: function(id) {
    var addTaskModal = document.getElementById("add-task-modal-popup");
    var addTaskButton = document.getElementById(id);
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

//TASK DEALER TARGETS

    var todoContainer = document.getElementById('todo-tasks-container');
    todoContainer.innerHTML = '';
    var todayContainer = document.getElementById('today-tasks-container');
    todayContainer.innerHTML = '';
    var tomorrowContainer = document.getElementById('tomorrow-tasks-container');
    tomorrowContainer.innerHTML = '';
    var thisweekContainer = document.getElementById('thisweek-tasks-container');
    thisweekContainer.innerHTML = '';
    var upcomingContainer = document.getElementById('upcoming-tasks-container');
    upcomingContainer.innerHTML = '';

//SET DATE TODAY TOMORROW WHENEVER
    var today = moment();
    var tomorrow = moment().add(1, "d");
    var dayAfterTomorrow = moment().add(2, "d");
    var endOfWeek = moment().add(7, "d");


    var taskCategoryCount = {};

////////START OF FOREACH LOOP

tasks.forEach(function(task) {

      //RENDER BASIC LIST ITEM TO SCREEN

    var taskWrapper = document.createElement('div');
    taskWrapper.classList.add('task-wrapper');
    var taskDescription = document.createElement('p');
    taskDescription.classList.add('task-description');
    var taskNode = document.createTextNode(task.description + " (" + task.pomCount + ")");
    taskDescription.appendChild(taskNode);

    // When the user clicks on the button, open the modal
    taskDescription.classList.add('edit-task-button');
    taskDescription.addEventListener("click", function(event){
      var editTaskModal = document.getElementById('edit-task-modal-popup');
      editTaskModal.style.display = "block";

    // When the user clicks anywhere outside of the modal, close it
      editTaskModal.addEventListener("click", function(event) {
        if(event.target == editTaskModal) {
          editTaskModal.style.display = "none";
        }
      });

    // When the user clicks on <span> (x), close the modal
    var editTaskSpan = document.getElementById("close-edit-task-modal-popup");
    editTaskSpan.addEventListener("click", function() {
      editTaskModal.style.display = "none";
    })

    // POPULATE EDIT TASK MODAL POPUP
    var editDescriptionField = document.getElementById("edit-description-field");
    editDescriptionField.value = task.description;

    var editPomCountField = document.getElementById("edit-pomCount-field");
    editPomCountField.value = task.pomCount;

    var editCategoryField = document.getElementById("edit-category-field");
    editCategoryField.value = task.category;

    var editDateField = document.getElementById("edit-date-field");
    if(task.date) {
      editDateField.value = task.date;
    } else {
      editDateField.value = null;
    }

    var editStartTimeField = document.getElementById("edit-startTime-field");
    if(task.startTime) {
      editStartTimeField.value = task.startTime;
    } else {
      editStartTimeField.value = null;
    }

    var editEndTimeField = document.getElementById("edit-endTime-field");
    if(task.endTime) {
      editEndTimeField.value = task.endTime;
    } else {
      editEndTimeField.value = null;
    }

   })






//BACK TO RENDERING TO SCREEN
    taskWrapper.appendChild(taskDescription);

    //CHECKBOX MECHANICS
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

    //TASK DEALER BABY

    if(task.date == null) {
          todoContainer.appendChild(taskWrapper);
    }

    if(task.date == "") {
          todoContainer.appendChild(taskWrapper);
    }

    if(moment(task.date, "YYYY-MM-DD").isSame(today, "day")) {
      todayContainer.appendChild(taskWrapper);
    }

    if(moment(task.date, "YYYY-MM-DD").isSame(tomorrow, "day")) {
      tomorrowContainer.appendChild(taskWrapper);
    }

    if(moment(task.date, "YYYY-MM-DD").isBetween(dayAfterTomorrow, endOfWeek, "day")) {
      thisweekContainer.appendChild(taskWrapper);
    }

    if(moment(task.date, "YYYY-MM-DD").isAfter(endOfWeek, "day")) {
      upcomingContainer.appendChild(taskWrapper);
    }


      //PIE CHART INFO

      var category = task.category;
      var pomCountInt = parseInt(task.pomCount);
      taskCategoryCount[category] = taskCategoryCount[category] ? taskCategoryCount[category]+pomCountInt : pomCountInt;
    });

////////////END OF FOREACH LOOP


//PIECHART CHART DATA AND CREATE

var formattedCategoryData = [];
var lineGraphData = [];

for(category in taskCategoryCount) {
  var dataObject = {}
  dataObject.name = category;
  dataObject.y = taskCategoryCount[category];
  formattedCategoryData.push(dataObject);
}
    new PieChart(formattedCategoryData);

//LINE CHART DATA AND CREATE

  for(category in taskCategoryCount) {
      var dataObject = {}
      dataObject.name = "Total Poms"

      totalPoms = [4,5,6,7,8]
      dataObject.y = totalPoms
      dataObject.x =[1,2,3,4,5,6,7,8]


      lineGraphData.push(dataObject);
    }
    new RangeFinder



    // CLOCK FUNCTION
      function Countdown(newNumber, number, minute) {
      number = stored_sec || number || 59;
      minute = minute || stored_min ||  24;

      var timer=setInterval(function() {
        newNumber(number,minute);
        console.log (newNumber)
        if (going == 1){
          if(number-- <= 0) {
            number = 59;
            minute --
          }
          if(minute <= 0 && number === 0){
            clearInterval(timer);
          }
        }

        else
        {
          clearInterval(timer);
        }

      }, 1000);

   }

   var display_timer = "25:00"
   document.getElementById("countdown-wrapper").textContent = display_timer;
   var countdown
   var startTimer = document.getElementById('countdown-start');
   var resetTimer = document.getElementById('countdown-reset');

   resetTimer.onclick = function(number, minute,timer){
    clearInterval(timer)
    display_timer = "25:00"
    document.getElementById("countdown-wrapper").textContent = display_timer;
    window.location.reload()
  }

  var stored_sec
  var stored_min
  var startToggle = 0
  var going = 0

  startTimer.addEventListener('click', function(timer){
    if(going == 1){
      going = 0
    }
    else{
      going = 1


    var storedTimer = display_timer.split(":")
    stored_sec = parseInt(storedTimer[1]-1)
    if (stored_sec == -1){stored_sec ++}
    stored_min = parseInt(storedTimer[0])
    if (stored_min == 25){stored_min --}


    countdown = new Countdown(function(number, minute) {
      display_timer = minute + ":" + (number >= 10 ? number : "0" + number);
      document.getElementById("countdown-wrapper").textContent = display_timer;
      startToggle = 1
    });



    }
  })




  startTimer.addEventListener('click', function(timer) {
    if (startToggle == 0){
      countdown = new Countdown(function(number, minute) {
        display_timer = minute + ":" + (number >= 10 ? number : "0" + number);
        document.getElementById("countdown-wrapper").textContent = display_timer;
        startToggle = 1
      });

    }
  })
}

}
module.exports = UI;
