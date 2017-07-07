var moment = require("moment");

var TaskDealer = function(){};

TaskDealer.prototype = {
  initialise: function() {

    var historyContainer = document.getElementById("history-tasks-container");
    var oneWeekAgoContainer = document.getElementById("last-week-tasks-container");
    var threeDaysAgoContainer = document.getElementById("earlier-this-week-tasks-container");
    var yesterdayContainer = document.getElementById("yesterday-tasks-container");
    var todoContainer = document.getElementById("todo-tasks-container");
    var todayContainer = document.getElementById("today-tasks-container");
    var tomorrowContainer = document.getElementById("tomorrow-tasks-container");
    var thisweekContainer = document.getElementById("thisweek-tasks-container");
    var upcomingContainer = document.getElementById("upcoming-tasks-container");

    historyContainer.innerHTML = "";
    oneWeekAgoContainer.innerHTML = "";
    threeDaysAgoContainer.innerHTML = "";
    yesterdayContainer.innerHTML = "";
    todoContainer.innerHTML = "";
    todayContainer.innerHTML = "";
    tomorrowContainer.innerHTML = "";
    thisweekContainer.innerHTML = "";
    upcomingContainer.innerHTML = "";
  },

  dealTask: function(taskWrapper, task) {

    var historyContainer = document.getElementById("history-tasks-container");
    var oneWeekAgoContainer = document.getElementById("last-week-tasks-container");
    var threeDaysAgoContainer = document.getElementById("earlier-this-week-tasks-container");
    var yesterdayContainer = document.getElementById("yesterday-tasks-container");
    var todoContainer = document.getElementById("todo-tasks-container");
    var todayContainer = document.getElementById("today-tasks-container");
    var tomorrowContainer = document.getElementById("tomorrow-tasks-container");
    var thisweekContainer = document.getElementById("thisweek-tasks-container");
    var upcomingContainer = document.getElementById("upcoming-tasks-container");

    var oneWeekAgo = moment().subtract(8, "d");
    var fourDaysAgo = moment().subtract(4, "d");
    var threeDaysAgo = moment().subtract(3, "d");
    var yesterday = moment().subtract(1, "d");
    var today = moment();
    var tomorrow = moment().add(1, "d");
    var dayAfterTomorrow = moment().add(2, "d");
    var endOfWeek = moment().add(7, "d");

    if(task.date == null || task.date == "") {
      todoContainer.appendChild(taskWrapper);
    };
    if(moment(task.date, "YYYY-MM-DD").isBefore(oneWeekAgo, "day")) {
      historyContainer.appendChild(taskWrapper);
    };
    if(moment(task.date, "YYYY-MM-DD").isSame(oneWeekAgo, "day")) {
      oneWeekAgoContainer.appendChild(taskWrapper);
    };
    if(moment(task.date, "YYYY-MM-DD").isBetween(oneWeekAgo, threeDaysAgo, "day")) {
      oneWeekAgoContainer.appendChild(taskWrapper);
    };
    if(moment(task.date, "YYYY-MM-DD").isBetween(fourDaysAgo, today, "day")) {
      threeDaysAgoContainer.appendChild(taskWrapper);
    };
    if(moment(task.date, "YYYY-MM-DD").isSame(yesterday, "day")) {
      yesterdayContainer.appendChild(taskWrapper);
    };
    if(moment(task.date, "YYYY-MM-DD").isSame(today, "day")) {
      todayContainer.appendChild(taskWrapper);
    };
    if(moment(task.date, "YYYY-MM-DD").isSame(tomorrow, "day")) {
      tomorrowContainer.appendChild(taskWrapper);
    };
    if(moment(task.date, "YYYY-MM-DD").isBetween(tomorrow, endOfWeek, "day")) {
      thisweekContainer.appendChild(taskWrapper);
    };
    if(moment(task.date, "YYYY-MM-DD").isAfter(endOfWeek, "day")) {
      upcomingContainer.appendChild(taskWrapper);
    };
  }
};

module.exports = TaskDealer;
