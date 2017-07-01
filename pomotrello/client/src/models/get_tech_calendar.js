var getTechCalendar = function() {
  console.log("getTechCalendar clicked");

  var url = "https://opentechcalendar.co.uk/api1/area/62/events.json";

  var request = new XMLHttpRequest();
  request.open("GET", url);
  // request.withCredentials = true;
  request.setRequestHeader("Content-Type", "text/plain");
  request.addEventListener("load", function() {
    var jsonString = request.responseText;
    var techCalendarData = JSON.parse(jsonString);

    console.log("Received tech calendar data", techCalendarData);
    //USE RENDER FUNCTION HERE
  });
request.send();

}




module.exports = getTechCalendar;
