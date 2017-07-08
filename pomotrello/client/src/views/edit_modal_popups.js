var dynamicCategories = require("./dynamic_categories.js");
var TaskList = require ("../models/task_list.js");

var editModalPopup = function(taskDescription, task) {

  taskDescription.addEventListener("click", function(event){
    var editTaskModal = document.getElementById("edit-task-modal-popup");
    editTaskModal.style.display = "block";

// When the user clicks anywhere outside of the modal, close it
    editTaskModal.addEventListener("click", function(event) {
      if(event.target == editTaskModal) {
        editTaskModal.style.display = "none";
      };
    });

// When the user clicks on <span> (x), close the modal
    var editTaskSpan = document.getElementById("close-edit-task-modal-popup");
    editTaskSpan.addEventListener("click", function() {
      editTaskModal.style.display = "none";
    });

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

    dynamicCategories(editCategoryField, task.category);

    var editDateField = document.getElementById("edit-date-field");
    if(task.date) {
      editDateField.value = task.date;
    } else {
      editDateField.value = null;
    };

    var editStartTimeField = document.getElementById("edit-startTime-field");
    if(task.startTime) {
      editStartTimeField.value = task.startTime;
    } else {
      editStartTimeField.value = null;
    };

    var editEndTimeField = document.getElementById("edit-endTime-field");
    if(task.endTime) {
      editEndTimeField.value = task.endTime;
    } else {
      editEndTimeField.value = null;
    };

    var editCompletedField = document.getElementById("edit-update-checkbox");
    if(task.completed === true) {
      editCompletedField.checked = true;
    } else {
      editCompletedField.checked = false;
    };

    var editSubmit = document.getElementById("edit-task-form");
    editSubmit.action = "pomotrello/" + task.indexID;

    var deleteButton = document.getElementById("edit-form-delete-button");

    deleteButton.addEventListener("click", function(){

      var taskList = new TaskList();
      taskList.delete(task.indexID, task, function(task){
        window.location.reload();
      });
    });


    editSubmit.addEventListener("submit",function(event){
      event.preventDefault();

      var description = editSubmit["edit-description-field"].value;
      var category = editSubmit["edit-category-field"].value;
      var pomCount = editSubmit["edit-pomCount-field"].value;
      var date = editSubmit["edit-date-field"].value;
      var startTime = editSubmit["edit-startTime-field"].value;
      var endTime = editSubmit["edit-endTime-field"].value;
      var completed = editSubmit["edit-update-checkbox"].checked;


      var taskToUpdate = {
        description: description,
        category: category,
        pomCount: pomCount,
        date: date,
        startTime: startTime,
        endTime: endTime,
        completed: completed
      };


      var taskList = new TaskList();
      taskList.update(task.indexID, taskToUpdate, function(updatedTask){
        window.location.reload();
      });
    });
  });
};
module.exports = editModalPopup;
