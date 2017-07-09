var TaskList = require("../models/task_list.js");
var attachFormOnSubmit = require("../models/attach_form_on_submit.js");
var renderTasks = require("../models/render_tasks.js");
var taskModalPopup = require("./task_modal_popups.js");
var displayModalPopup = require("./display_modal_popups.js");
var timer = require("../models/timer.js");

var UI = function() {

  var taskList = new TaskList
  taskList.all(function (allTasks) {
    renderTasks(allTasks);
  });

  attachFormOnSubmit();
  taskModalPopup();
  displayModalPopup("info-modal-popup", "info-button", "close-info-modal-popup");
  displayModalPopup("previous-tasks-modal-popup", "previous-tasks-button", "close-previous-tasks-modal-popup");
  displayModalPopup("event-dashboard-modal-popup", "event-dashboard-button", "close-event-dashboard-modal-popup");
};

module.exports = UI;
