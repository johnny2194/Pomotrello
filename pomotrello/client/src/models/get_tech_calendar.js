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
      eventEntry.classList = "opentech-event-wrapper";
      container.appendChild(eventEntry);

      var eventSummaryText = document.createElement("p");
      eventSummaryTextNode = document.createTextNode(techEvent.summaryDisplay);
      eventSummaryText.appendChild(eventSummaryTextNode);
      eventSummaryText.classList = "event-summary";

      var eventDateText = document.createElement("p");
      eventDateTextNode = document.createTextNode(techEvent.start.displaylocal);
      eventDateText.appendChild(eventDateTextNode);
      eventDateText.classList = "event-date";

      eventEntry.appendChild(eventSummaryText);
      eventEntry.appendChild(eventDateText);

//BUTTON FOR EXTRA DETAILS
      var eventInfoButton = document.createElement("button");
      eventInfoButton.innerText = "More info";
      eventInfoButton.classList = "show-more-button";
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
        eventEntry.appendChild(addEventButton);
        eventEntryDetails.appendChild(eventForm);


        eventForm.addEventListener("submit", function(event) {
          event.preventDefault();

    //EXPERIMENTAL SHIZ

          var startMoment = moment(techEvent.start.rfc2882utc);
          var endMoment = moment(techEvent.end.rfc2882utc);
          var duration = endMoment.diff(startMoment, 'minutes');
          var pomCount = duration/30;

          if(techEvent.start.monthlocal.length == 1) {
            var month = "0" + techEvent.start.monthlocal;
          } else {
            var month = techEvent.start.monthlocal;
          }

          if(techEvent.start.daylocal.length == 1) {
            var day = "0" + techEvent.start.daylocal;
          } else {
            var day = techEvent.start.daylocal;
          }


          console.log("month", month)
          console.log("day", day)


          var taskToAdd = {
            description: techEvent.summaryDisplay,
            category: "Socialising",
            pomCount: pomCount,
            date: techEvent.start.yearlocal + "-" + month + "-" + day,
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
