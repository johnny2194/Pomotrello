var TaskList = require('../models/task_list.js');
var PieChart = require("./pie_chart.js");
var renderPieChart = require("../models/render_pie_chart.js");
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
  this.infoModalPopUp();
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

      console.log("attachFormToSubmit does a thing")

      var taskList = new TaskList();
      taskList.add(taskToAdd, function(newTask){
        window.location.reload()
      })
    })
  },

//START ADD TASK MODAL POP UP
  addTaskModalPopUp: function(id) {
    var addTaskModal = document.getElementById("add-task-modal-popup");
    var addTaskButton = document.getElementById(id);
    var addTaskSpan = document.getElementById("close-add-task-modal-popup");

    // When the user clicks on the button, open the modal
    addTaskButton.onclick = function() {
      console.log("addTaskButton clicked");
      addTaskModal.style.display = "block";

      // START DYNAMIC POPULATION OF CATEGORY LIST
      var allCategories = {};
      var taskList = new TaskList();
      taskList.all(function (allTasks) {
        allTasks.forEach(function(task) {
          var category = task.category;
          allCategories[category] = allCategories[category] ? allCategories[category]+1 : 1;
        });
      })
      var categorySelect = document.getElementById("category-field");
      categorySelect.addEventListener("click", function() {
        categorySelect.innerHTML = "";
        for(category in allCategories) {
          var option = document.createElement("option");
          option.value = category;
          option.innerText = category;
          categorySelect.appendChild(option);
        }

        var addNewCategory = document.createElement("option");
        addNewCategory.innerText = "Add new category";
        categorySelect.appendChild(addNewCategory);

        categorySelect.addEventListener("change", function(event) {

            if(event.target.value == "Add new category"){
              var addCategoryModal = document.getElementById('add-category-modal-popup');
              addCategoryModal.style.display = "block";
              var addCategoryForm = document.getElementById("add-category-form");
              var addCategoryInput = document.getElementById("new-category-input");
              addCategoryInput.autofocus = true;

              addCategoryForm.addEventListener('submit', function (event) {
                event.preventDefault();  //this stops redirect to new page

                var newCategoryValue = addCategoryForm['new-category-input'].value;

                var newCategoryOption = document.createElement("option");
                newCategoryOption.value = newCategoryValue;
                newCategoryOption.innerText = newCategoryValue;
                newCategoryOption.setAttribute("selected", true);
                categorySelect.appendChild(newCategoryOption);

                addCategoryModal.style.display = "none";

                return false;
              })

              var addCategorySpan = document.getElementById("close-add-category-modal-popup");
              // When the user clicks on <span> (x), close the modal
              addCategorySpan.onclick = function() {
                addCategoryModal.style.display = "none";
              }
              // When the user clicks anywhere outside of the modal, close it
              addCategoryModal.onclick = function(event) {
                if (event.target == addCategoryModal) {
                  addCategoryModal.style.display = "none";
                }
              }
            }
        })
      });
    }
///BACK TO ADD TASK MODAL POP UP

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

  infoModalPopUp: function() {
    var infoModal = document.getElementById('info-modal-popup');
    var infoButton = document.getElementById("info-button");
    var infoSpan = document.getElementById("close-info-modal-popup");

    // When the user clicks on the button, open the modal
    infoButton.onclick = function() {
      infoModal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    infoSpan.onclick = function() {
      infoModal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    infoModal.onclick = function(event) {
      if (event.target == infoModal) {
        infoModal.style.display = "none";
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
var counter = 0;

////////START OF FOREACH LOOP

tasks.forEach(function(task) {
      // ASSIGN indexID
      task.indexID = counter;
      counter++;
      // console.log("indexID", task.indexID);

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
    editCategoryField.innerHTML = "";
    var currentOption = document.createElement("option");
    currentOption.value = task.category;
    currentOption.innerText = task.category;
    editCategoryField.appendChild(currentOption);

////////////////////////////////////////////////DYNAMIC CATEGORIES IN EDIT

var allCategories = {};
var taskList = new TaskList();
taskList.all(function (allTasks) {
  allTasks.forEach(function(task) {
    var category = task.category;
    allCategories[category] = allCategories[category] ? allCategories[category]+1 : 1;
  });
})

editCategoryField.addEventListener("click", function() {
  editCategoryField.innerHTML = "";
  for(category in allCategories) {
    var option = document.createElement("option");
    option.value = category;
    option.innerText = category;
    editCategoryField.appendChild(option);
  }

      editCategoryField.value = task.category;

  var addNewCategory = document.createElement("option");
  addNewCategory.innerText = "Add new category";
  editCategoryField.appendChild(addNewCategory);

  editCategoryField.addEventListener("change", function(event) {
      if(event.target.value == "Add new category"){
        var addCategoryModal = document.getElementById('add-category-modal-popup');
        addCategoryModal.style.display = "block";
        var addCategoryForm = document.getElementById("add-category-form");
        var addCategoryInput = document.getElementById("new-category-input");
        addCategoryInput.autofocus = true;

        addCategoryForm.addEventListener('submit', function (event) {
          event.preventDefault();  //this stops redirect to new page

          var newCategoryValue = addCategoryForm['new-category-input'].value;

          var newCategoryOption = document.createElement("option");
          newCategoryOption.value = newCategoryValue;
          newCategoryOption.innerText = newCategoryValue;
          newCategoryOption.setAttribute("selected", true);
          editCategoryField.appendChild(newCategoryOption);

          addCategoryModal.style.display = "none";

          return false;
        })

        var addCategorySpan = document.getElementById("close-add-category-modal-popup");
        // When the user clicks on <span> (x), close the modal
        addCategorySpan.onclick = function() {
          addCategoryModal.style.display = "none";
        }
        // When the user clicks anywhere outside of the modal, close it
        addCategoryModal.onclick = function(event) {
          if (event.target == addCategoryModal) {
            addCategoryModal.style.display = "none";
          }
        }
      }
  })
});




//////////////////////////////////////

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

    var editCompletedField = document.getElementById("edit-update-checkbox");
    if(task.completed === true) {
      editCompletedField.checked = true;
    } else {
      editCompletedField.checked = false;
    }

    var editSubmit = document.getElementById("edit-task-form");
    editSubmit.action = "pomotrello/" + task.indexID;

    var deleteButton = document.getElementById('edit-form-delete-button');

    deleteButton.addEventListener('click', function(){

       var taskList = new TaskList();
       taskList.delete(task.indexID, task, function(task){
         window.location.reload()
       })
   })


    editSubmit.addEventListener('submit',function(event){
      console.log("editSubmit triggered")
      event.preventDefault();

      var description = editSubmit['edit-description-field'].value;
      var category = editSubmit['edit-category-field'].value;
      var pomCount = editSubmit['edit-pomCount-field'].value;
      var date = editSubmit['edit-date-field'].value;
      var startTime = editSubmit['edit-startTime-field'].value;
      var endTime = editSubmit['edit-endTime-field'].value;
      var completed = editSubmit['edit-update-checkbox'].checked;


      var taskToUpdate = {
        description: description,
        category: category,
        pomCount: pomCount,
        date: date,
        startTime: startTime,
        endTime: endTime,
        completed: completed
      }


      var taskList = new TaskList();
      taskList.update(task.indexID, taskToUpdate, function(updatedTask){
        window.location.reload()
      })
    })
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

    checkboxInput.addEventListener('change', function(){
      var editSubmit = document.getElementById("edit-task-form");
      editSubmit.action = "pomotrello/" + task.indexID;

      if(checkboxInput.checked=== true) {
        task.completed= true;
      } else {
        task.completed = false;
      }

      if(task.completed === true) {
        checkboxInput.checked = true;
      } else {
        checkboxInput.checked = false;
      }

      var taskToUpdate = task

      var taskList = new TaskList();
      taskList.update(task.indexID, taskToUpdate, function(updatedTask){
       })
    })

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

    if(moment(task.date, "YYYY-MM-DD").isBetween(tomorrow, endOfWeek, "day")) {
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
  dataObject.y = [today,tomorrow,dayAfterTomorrow,endOfWeek]
  dataObject.x =[today,tomorrow,dayAfterTomorrow,endOfWeek]


  lineGraphData.push(dataObject);
}
new RangeFinder()



    // CLOCK FUNCTION
    function Countdown(newNumber, number, minute) {
      number = stored_sec || number || 59;
      minute = minute || stored_min ||  24;

      var timer=setInterval(function() {
        newNumber(number,minute);
        // console.log (newNumber)
        if (going == 1){
          if(number-- <= 0) {
            number = 59;
            minute --
          }
          if(minute <= 0 && number === 0){
            clearInterval(timer);
          }
        } else {
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
      else {
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
