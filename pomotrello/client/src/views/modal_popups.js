var dynamicCategories = require("./dynamic_categories.js");

// var allButtonIDs = [
//   "add-task-button",
//   "add-task-button-today",
//   "add-task-button-tomorrow",
//   "add-task-button-this-week",
//   "add-task-button-upcoming",
//   "info-button"
// ]

var modalPopup = function(modalPopupWrapper, buttonID, spanID, categorySelectID) {
console.log("categorySelectID", categorySelectID);
  var modalPopupWrapper = document.getElementById(modalPopupWrapper);
  var showModalButton = document.getElementById(buttonID);
  var spanID = document.getElementById(spanID);

// When the user clicks on the button, open the modal
  showModalButton.onclick = function() {

    console.log("modalButton clicked");

    if(categorySelectID) {
    var categorySelect = document.getElementById(categorySelectID);
    dynamicCategories(categorySelect);
    };
    modalPopupWrapper.style.display = "block";
  };
///BACK TO ADD TASK MODAL POP UP

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

module.exports = modalPopup;
