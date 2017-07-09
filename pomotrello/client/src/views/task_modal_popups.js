var dynamicCategories = require("./dynamic_categories.js");

var taskModalPopup = function() {
  console.log("taskModalPopup triggered");
  var modalPopupWrapper = document.getElementById("add-task-modal-popup");
  var spanID = document.getElementById("close-add-task-modal-popup");

//POPULATE DYNAMIC CATEGORIES ON MOUSE OVER
  var categorySelect = document.getElementById("category-field");
  categorySelect.addEventListener("mouseover", function() {
    dynamicCategories(categorySelect);
  });

  // When the user clicks on one of these buttons, open the modal
  var addTaskShowModalButton = document.getElementById("add-task-button");
  addTaskShowModalButton.addEventListener("click", function() {
    modalPopupWrapper.style.display = "block";
  });

  var todayShowModalButton = document.getElementById("add-task-button-today");
  todayShowModalButton.addEventListener("click", function() {
    modalPopupWrapper.style.display = "block";
  });

  var tomorrowShowModalButton = document.getElementById("add-task-button-tomorrow");
  tomorrowShowModalButton.addEventListener("click", function() {
    modalPopupWrapper.style.display = "block";
  });

  var thisWeekShowModalButton = document.getElementById("add-task-button-this-week");
  thisWeekShowModalButton.addEventListener("click", function() {
    modalPopupWrapper.style.display = "block";
  });

  var upcomingShowModalButton = document.getElementById("add-task-button-upcoming");
  upcomingShowModalButton.addEventListener("click", function() {
    modalPopupWrapper.style.display = "block";
  });

// When the user clicks on <span> (x), close the modal
  spanID.onclick = function() {
    modalPopupWrapper.style.display = "none";
  };

// When the user clicks anywhere outside of the modal, close it
  modalPopupWrapper.onclick = function(event) {
    if (event.target == modalPopupWrapper) {
      modalPopupWrapper.style.display = "none";
    };
  };
};

module.exports = taskModalPopup;
