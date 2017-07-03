var _ = require('lodash');

var getTechCalendar = function() {
  console.log("getTechCalendar clicked, in getTechCalendar");

  var url = "https://opentechcalendar.co.uk/api1/area/62/events.json";

  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.setRequestHeader("Content-Type", "text/plain");
  request.addEventListener("load", function() {
    var jsonString = request.responseText;
    var techCalendarData = JSON.parse(jsonString);
    var techCalendarDataArray = techCalendarData.data;

    var uniqTechCalendarDataArray = _.uniqBy(techCalendarDataArray, function(event) {
      return event.summary && event.start.displaylocal;
    })
    console.log("Received tech calendar data", uniqTechCalendarDataArray);

    eventDashboardLogic(uniqTechCalendarDataArray);

  });

request.send();

}

var eventDashboardLogic = function(techCalendarData) {
  var container = document.getElementById("event-dashboard-modal-content");
  for(event of techCalendarData) {
    if(event.cancelled == false) {
    var eventEntry = document.createElement("p");
    eventEntry.classList = ("event-description");
    var eventAddress = "";
    if (event.venue) {
      eventAddress += event.venue.address;
    }
    // event.venue.addresscode
    var eventNode = document.createTextNode(event.start.displaylocal  + " - " + event.summary + " - " + eventAddress);
    eventEntry.appendChild(eventNode);
    container.appendChild(eventEntry);
    }
  }
}

module.exports = getTechCalendar;
