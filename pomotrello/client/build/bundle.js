/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var getTechCalendar = __webpack_require__(1);
var UI = __webpack_require__(2);

var app = function() {
  console.log("app.js happens");

  new UI();

  var techButton = document.getElementById("test-tech-calendar");
  techButton.addEventListener("click", handleButtonClick)


}

var handleButtonClick = function() {
  getTechCalendar()
}


window.addEventListener("load", app)


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var TaskList = __webpack_require__(3);

var UI = function() {
  var taskList = new TaskList();
  taskList.all(function (allTasks) {
    this.renderTask(allTasks);
  }.bind(this));
}

UI.prototype = {
  renderTask: function(tasks) {
    var container = document.getElementById('todo-tasks-container');
    container.innerHTML = '';

    for (var task of tasks) {
      var taskWrapper = document.createElement('div');
      taskWrapper.classList.add('task-wrapper');
      var taskDescription = document.createElement('p');
      taskDescription.classList.add('task-description');
      var taskNode = document.createTextNode(task.description)
      taskDescription.appendChild(taskNode);
      taskWrapper.appendChild(taskDescription);

      var checkboxWrapper = document.createElement('div');
      checkboxWrapper.classList.add('checkbox');
      var checkboxInput = document.createElement('input');
      checkboxInput.type = "checkbox";

      if(task.completed === true) {
        checkboxInput.checked = true;
      } else {
        checkboxInput.checked = false;
      }
      checkboxWrapper.appendChild(checkboxInput);
      taskWrapper.appendChild(checkboxWrapper);
      container.appendChild(taskWrapper);
    }
  }
}


          // <div class="task-wrapper">
          //   <p class="task">Look to make task lists wider to account for checkbox divs</p>
          //   <div class="checkbox">
          //     <input type="checkbox" value="None" id="checkbox" name="check" checked />
          //     <label for="checkbox"></label>
          //   </div>
          // </div>



module.exports = UI;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var Task = __webpack_require__(4);

var TaskList = function() {}

TaskList.prototype = {
  all: function(onTasksReady) {
    this.makeRequest("http://localhost:3000/pomotrello", function(allTasks) {
      onTasksReady(allTasks);
    });
  },
  makeRequest: function(url, onRequestComplete) {
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.addEventListener("load", function() {
      if (request.status !== 200) {
        console.log("Error in taskList makeRequest");
      };
      var jsonString = request.responseText;
      var resultsData = JSON.parse(jsonString);
      onRequestComplete(resultsData);
    });
    request.send();
  },
  add: function(newTask, onRequestComplete) {
    var jsonString = JSON.stringify(newTask);
    this.makePostRequest("http://localhost:3000/pomotrello", onRequestComplete, jsonString);
  },
  makePostRequest: function(url, onRequestComplete, payLoad) {
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function() {
      var jsonString = request.responseText;
      var updatedTasks = JSON.parse(jsonString);
      onRequestComplete(updatedTasks);
    });
    request.send();
  }
}













module.exports = TaskList;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

var Task = function(options){
  this.description = options.description;
  this.category= options.category;
  this.pomCount = options.pomCount;

  this.date = options.date;
  this.startTime = options.startTime;
  this.endTime = options.endTime;
  this.completed = options.completed;
 
}

module.exports = Task;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map