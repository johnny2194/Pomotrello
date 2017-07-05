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
  var container = document.getElementById("opentech-all-event-container");

  techCalendarData.forEach(function(techEvent) {
    if(techEvent.cancelled == false && techEvent.deleted == false) {

//CONTAINER FOR EACH EVENT
  var eventEntry = document.createElement("div");
  eventEntry.classList = "opentech-event-wrapper";
  container.appendChild(eventEntry);

  var eventLink = document.createElement("a");
  eventLink.href = techEvent.url;
  eventLink.target = "_blank";

  var eventSummaryText = document.createElement("p");
  eventSummaryTextNode = document.createTextNode(techEvent.summaryDisplay);
  eventSummaryText.appendChild(eventSummaryTextNode);
  eventSummaryText.classList = "event-summary";

  var eventDateText = document.createElement("p");
  eventDateTextNode = document.createTextNode(techEvent.start.displaylocal);
  eventDateText.appendChild(eventDateTextNode);
  eventDateText.classList = "event-date";

  var eventEntryDetails = document.createElement("p");
  eventEntryDetails.classList = "info-when-clicked";

  var buttonContainer = document.createElement("div");
  buttonContainer.classList = "event-buttons-container";

  eventLink.appendChild(eventSummaryText)
  eventEntry.appendChild(eventLink);
  eventEntry.appendChild(eventDateText);
  eventEntry.appendChild(eventEntryDetails);
  eventEntry.appendChild(buttonContainer);


//BUTTON FOR EXTRA DETAILS
      var eventInfoButton = document.createElement("button");
      eventInfoButton.innerText = "Toggle Info";
      eventInfoButton.classList = "show-more-button";
      buttonContainer.appendChild(eventInfoButton);

//CONTAINER FOR EXTRA DETAILS TO BE SHOWN IN
      // var eventEntryDetails = document.createElement("div");
      // eventEntry.appendChild(eventEntryDetails);

      //BUTTON TO ADD TO TASK LISTED
            var eventForm = document.createElement("form");
            eventForm.action = "pomotrello";
            eventForm.method = "POST";

            var addEventButton = document.createElement("input");
            addEventButton.type = "submit";
            addEventButton.value = "Add to list";
            addEventButton.classList = "add-event-button";
            eventForm.appendChild(addEventButton);
            buttonContainer.appendChild(eventForm);
            // eventEntryDetails.appendChild(eventLink);


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





      var showingInfo = false;    
      eventInfoButton.addEventListener("click", function() {
        showingInfo = !showingInfo
        eventEntryDetails.innerHTML = "";
        if(!showingInfo){return}
       
        var furtherDetails = document.createElement("p");
        furtherDetails.classList = "info-when-clicked";

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
          locationDetails.classList = "info-when-clicked";
          var locationDetailsNode = document.createTextNode(eventAddress);
          locationDetails.appendChild(locationDetailsNode);
          eventEntryDetails.appendChild(locationDetails);
        }
  
    










      });

    }
  });
}

module.exports = getTechCalendar;