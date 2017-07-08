var getTechCalendar = require("../models/get_tech_calendar.js");

var displayModalPopup = function(modalPopupWrapper, buttonID, spanID) {

  var showModalButton = document.getElementById(buttonID);
  var modalPopupWrapper = document.getElementById(modalPopupWrapper);
  var spanID = document.getElementById(spanID);

  var eventButton = document.getElementById("event-dashboard-button");
  eventButton.addEventListener("click", function() {
    getTechCalendar();
  });

// When the user clicks on the button, open the modal
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

module.exports = displayModalPopup;
