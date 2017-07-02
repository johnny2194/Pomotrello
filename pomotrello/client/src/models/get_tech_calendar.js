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
    console.log("Received tech calendar data", techCalendarDataArray[0]);

    eventDashboardLogic(techCalendarDataArray);

  });

request.send();

}

var eventDashboardLogic = function(techCalendarData) {
  var container = document.getElementById("event-dashboard-modal-content");
  console.log("eventDashboardLogic invoked");
  for(event of techCalendarData) {
    var eventEntry = document.createElement("p");
    var eventNode = document.createTextNode(event.summary + " - " + event.start.displaylocal);
    eventEntry.appendChild(eventNode);
    container.appendChild(eventEntry);
  }

}

module.exports = getTechCalendar;
