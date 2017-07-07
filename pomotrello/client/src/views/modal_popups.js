var allButtonIDs = [
  "add-task-button",
  "add-task-button-today",
  "add-task-button-tomorrow",
  "add-task-button-this-week",
  "add-task-button-upcoming",
  "info-button"
]

var modalPopup = function(buttonID) {

  var addTaskModal = document.getElementById("add-task-modal-popup");
  var infoModal = document.getElementById("info-modal-popup");

  var addTaskButton = document.getElementById(buttonID);
  var addTaskSpan = document.getElementById("close-add-task-modal-popup");

// When the user clicks on the button, open the modal
  addTaskButton.onclick = function() {
    addTaskModal.style.display = "block";

// START DYNAMIC POPULATION OF CATEGORY LIST
    var allCategories = {};
    var taskList = new TaskList();
    taskList.all(function (allTasks) {
      allTasks.forEach(function(task) {
        var category = task.category;
        allCategories[category] = allCategories[category] ? allCategories[category]+1 : 1;
      });
    });
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
        };
      });
    });
  };
///BACK TO ADD TASK MODAL POP UP

// When the user clicks on <span> (x), close the modal
  addTaskSpan.onclick = function() {
    addTaskModal.style.display = "none";
  };

// When the user clicks anywhere outside of the modal, close it
  addTaskModal.onclick = function(event) {
    if (event.target == addTaskModal) {
      addTaskModal.style.display = "none";
    };
  };

}

module.exports = modalPopup;
