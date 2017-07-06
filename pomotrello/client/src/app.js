var UI = require("./views/ui.js");

var app = function() {
  console.log("app.js happens");

  new UI();


}



window.addEventListener("load", app)
