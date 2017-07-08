var dynamicCategories = require("./dynamic_categories.js");

var taskModalPopup = function(modalPopupWrapper, buttonID, spanID, categorySelectID) {

  var modalPopupWrapper = document.getElementById(modalPopupWrapper);
  var spanID = document.getElementById(spanID);

//POPULATE DYNAMIC CATEGORIES ON MOUSE OVER
  var categorySelect = document.getElementById(categorySelectID);
  categorySelect.addEventListener("mouseover", function() {
    dynamicCategories(categorySelect);
  });

// When the user clicks on the button, open the modal
var showModalButton = document.getElementById(buttonID);
  showModalButton.addEventListener("click", function() {
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
