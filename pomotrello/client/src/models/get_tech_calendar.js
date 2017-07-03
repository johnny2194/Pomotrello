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
    console.log(uniqTechCalendarDataArray[0]);
    eventDashboardLogic(uniqTechCalendarDataArray);

  });

request.send();

}

var eventDashboardLogic = function(techCalendarData) {
  var container = document.getElementById("event-dashboard-modal-content");

  techCalendarData.forEach(function(techEvent) {
    if(techEvent.cancelled == false) {

//CONTAINER FOR EACH EVENT
      var eventEntry = document.createElement("div");
      eventEntry.classList = "event-description";
      container.appendChild(eventEntry);

      var eventEntryText = document.createElement("p");
      eventEntryTextNode = document.createTextNode(techEvent.start.displaylocal  + " - " + techEvent.summary);
      eventEntryText.appendChild(eventEntryTextNode);
      eventEntry.appendChild(eventEntryText);

//BUTTON FOR EXTRA DETAILS
      var eventInfoButton = document.createElement("button");
      eventInfoButton.innerText = "Mo Info";
      eventInfoButton.classList = "event-info-button";
      eventEntry.appendChild(eventInfoButton);
      
//CONTAINER FOR EXTRA DETAILS TO BE SHOWN IN
      var eventEntryDetails = document.createElement("div");
      eventEntry.appendChild(eventEntryDetails);

      eventInfoButton.addEventListener("click", function() {
        eventEntryDetails.innerHTML = "";
        var furtherDetails = document.createElement("p");
        furtherDetails.id = "further-details-" + techEvent.slug;
        furtherDetails.classList = "event-description";

        // var eventAddress = "Address: ";
        // if (event.venue) {
        //   eventAddress += event.venue.address;
        // }
        var furtherDetailsNode = document.createTextNode(techEvent.description);
        furtherDetails.appendChild(furtherDetailsNode);
        eventEntryDetails.appendChild(furtherDetails);

      });

    }
  });
}

module.exports = getTechCalendar;
