var TaskList = require('../models/task_list.js');
var PieChart = require("./pie_chart.js");
var getTechCalendar = require("../models/get_tech_calendar.js");

var UI = function() {
  var taskList = new TaskList();
  taskList.all(function (allTasks) {
    this.renderTask(allTasks);
  }.bind(this));
  this.attachFormOnSubmit();
  this.addTaskModalPopUp();
  this.dashboardModalPopUp();
}

UI.prototype = {
  attachFormOnSubmit: function(){
    var form = document.getElementById('add-task-form');
    form.addEventListener('submit', function (event) {
      event.preventDefault();  //this stops redirect to new page

      var description =form['description-field'].value
      var category =form['category-field'].value
      var pomCount =form['pomCount-field'].value
      var date =form['date-field'].value
      var startTime =form['startTime-field'].value
      var endTime = form['endTime-field'].value
      var completed =form['completed-field'].value


      var taskToAdd = {
        description: description,
        category: category,
        pomCount: pomCount,
        date: date,
        startTime: startTime,
        endTime: endTime,            
        completed: completed 
      }

      console.log(taskToAdd)

      var taskList = new TaskList();
      taskList.add(taskToAdd, function(newTask){
        console.log('response in ui:', newTask);
        window.location.reload()
        // here we need to call the function that updates to get dynamic feedback
      })
    })
  },  

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

////////START OF FOR LOOP

    for (var task of tasks) {

      //RENDER BASIC LIST ITEM TO SCREEN

      var taskWrapper = document.createElement('div');
      taskWrapper.classList.add('task-wrapper');
      var taskDescription = document.createElement('p');
      taskDescription.classList.add('task-description');
      var taskNode = document.createTextNode(task.description)
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
        var editTaskContent = document.getElementById("edit-task-modal-content");
        editTaskContent.innerHTML = "";
        var editTaskSpan = document.createElement("span");
        editTaskSpan.innerHTML = "&times";
        editTaskSpan.id = "close-edit-task-modal-popup";
        editTaskSpan.addEventListener("click", function() {
          editTaskModal.style.display = "none";
        })

    // POPULATE MODAL POPUP - ADD FORM HERE
        editTaskContent.appendChild(editTaskSpan);
        var taskToEdit = document.createElement("p");
        var taskToEditNode = document.createTextNode(event.target.textContent);
        taskToEdit.appendChild(taskToEditNode);
        editTaskContent.appendChild(taskToEdit);
      })


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
      container.appendChild(taskWrapper);

      //PIE CHART INFO

      var category = task.category;
      var pomCountInt = parseInt(task.pomCount);
      taskCategoryCount[category] = taskCategoryCount[category] ? taskCategoryCount[category]+pomCountInt : pomCountInt;
    }

////////////END OF FOR LOOP


    var formattedCategoryData = [];

    for(category in taskCategoryCount) {
      var dataObject = {}
      dataObject.name = category;
      dataObject.y = taskCategoryCount[category];

      formattedCategoryData.push(dataObject);
    }

    //CREATE PIECHART
  new PieChart(formattedCategoryData);


  function Countdown(newNumber, number, minute) {
       number = number || 0;
       minute = minute || 25;
       var timer=setInterval(function() {
           newNumber(number,minute);
           if(number-- <= 0) {
               number = 59;
               minute --
           }
           if(minute <= 0 && number === 0){
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
   }


   startTimer.onclick = function(timer) {

    countdown = new Countdown(function(number, minute) {
      display_timer = minute + ":" + (number >= 10 ? number : "0" + number);
      document.getElementById("countdown-wrapper").textContent = display_timer;
   });

  }

  }
}
module.exports = UI;