var renderCountdown = function() {
  function Countdown(newNumber, number, minute) {
    number = stored_sec || number || 59;
    minute = minute || stored_min ||  24;

    var timer = setInterval(function() {
      newNumber(number,minute);
      if (going == 1) {
        if(number-- <= 0) {
          number = 59;
          minute --;
        };
        if(minute <= 0 && number === 0) {
          clearInterval(timer);
        };
      } else {
        clearInterval(timer);
      };
    }, 1000);
  };

  var display_timer = "25:00";
  document.getElementById("countdown-wrapper").textContent = display_timer;
  var countdown;
  var startTimer = document.getElementById("countdown-start");
  var resetTimer = document.getElementById("countdown-reset");

  resetTimer.onclick = function(number, minute,timer){
    clearInterval(timer);
    display_timer = "25:00";
    document.getElementById("countdown-wrapper").textContent = display_timer;
    window.location.reload();
  }

  var stored_sec;
  var stored_min;
  var startToggle = 0;
  var going = 0;

  startTimer.addEventListener("click", function(timer){
    if(going == 1){
      going = 0;
    } else {
      going = 1;
      var storedTimer = display_timer.split(":");
      stored_sec = parseInt(storedTimer[1]-1);

      if (stored_sec == -1){stored_sec ++};
      stored_min = parseInt(storedTimer[0]);
      if (stored_min == 25){stored_min --};

      countdown = new Countdown(function(number, minute) {
        display_timer = minute + ":" + (number >= 10 ? number : "0" + number);
        document.getElementById("countdown-wrapper").textContent = display_timer;
        startToggle = 1;
      });
    };
  });

  startTimer.addEventListener("click", function(timer) {
    if (startToggle == 0) {
      countdown = new Countdown(function(number, minute) {
        display_timer = minute + ":" + (number >= 10 ? number : "0" + number);
        document.getElementById("countdown-wrapper").textContent = display_timer;
        startToggle = 1;
      });
    };
  });
};

window.addEventListener("load", renderCountdown);
module.exports = renderCountdown;
