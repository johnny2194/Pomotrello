var _ = require('lodash');
var TaskList = require('../models/task_list.js');
var moment = require('moment');


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
    if(techEvent.cancelled == false && techEvent.deleted == false) {

//CONTAINER FOR EACH EVENT
      var eventEntry = document.createElement("div");
      eventEntry.classList = "event-description";
      container.appendChild(eventEntry);

      var eventEntryText = document.createElement("p");
      eventEntryTextNode = document.createTextNode(techEvent.start.displaylocal  + " - " + techEvent.summaryDisplay);
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
        furtherDetails.classList = "event-description";

        var furtherDetailsNode = document.createTextNode(techEvent.description);
        furtherDetails.appendChild(furtherDetailsNode);
        eventEntryDetails.appendChild(furtherDetails);
    //INCLUDE VENUE DETAILS IF LISTED
        if (techEvent.venue) {
          var eventAddress = "Venue: ";
          eventAddress += techEvent.venue.address;
          eventAddress += ", " + techEvent.venue.addresscode;
          eventAddress += " - " + techEvent.venue.description;
          var locationDetails = document.createElement("p");
          locationDetails.classList = "event-description";
          var locationDetailsNode = document.createTextNode(eventAddress);
          locationDetails.appendChild(locationDetailsNode);
          eventEntryDetails.appendChild(locationDetails);
        }
    //EXTERNAL LINK
        var eventLink = document.createElement("a");
        eventLink.href = techEvent.url;
        eventLink.innerText = "External Link";
        eventLink.target = "_blank";
        eventEntryDetails.appendChild(eventLink);

    //BUTTON TO ADD TO TASK LISTED
        var eventForm = document.createElement("form");
        eventForm.action = "pomotrello";
        eventForm.method = "POST";

        var addEventButton = document.createElement("input");
        addEventButton.type = "submit";
        addEventButton.value = "Add this event to my Pomotrello";
        addEventButton.classList = "add-event-button";
        eventForm.appendChild(addEventButton);
        eventEntryDetails.appendChild(eventForm);


        eventForm.addEventListener("submit", function(event) {
          event.preventDefault();
    //EXPERIMENTAL SHIZ

          var startMoment = moment(techEvent.start.rfc2882utc);
          var endMoment = moment(techEvent.end.rfc2882utc);
          var duration = endMoment.diff(startMoment, 'minutes');
          console.log("duration", duration);
          var pomCount = duration/30;
          console.log("pomCount", pomCount);

          var taskToAdd = {
            description: techEvent.summaryDisplay,
            category: "Socialising",
            pomCount: pomCount,
            date: techEvent.start.yearlocal + "-" + techEvent.start.monthlocal + "-" + techEvent.start.daylocal,
            startTime: techEvent.start.hourlocal + ":" + techEvent.start.minutelocal,
            endTime: techEvent.end.hourlocal + ":" + techEvent.end.minutelocal,
            completed: false
          }

          var taskList = new TaskList();
          taskList.add(taskToAdd, function(newTask){
            console.log('response in ui:', newTask);
            window.location.reload()
          });

      });

      });

    }
  });
}

module.exports = getTechCalendar;
