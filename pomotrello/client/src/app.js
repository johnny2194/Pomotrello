var getTechCalendar = require("./models/get_tech_calendar");

var app = function() {
  console.log("app.js happens");
  var techButton = document.getElementById("test-tech-calendar");
  techButton.addEventListener("click", handleButtonClick)


}

var handleButtonClick = function() {
  getTechCalendar()
}


window.addEventListener("load", app)
