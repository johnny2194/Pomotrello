var Countdown = function(){
  number = number || 60;
  var timer = setInterval(function(){
    nextNumber(number);
    if(number -- <=0){
      clearInterval(timer);
    }

  }, 1000);
}

new Countdown = (function(number){
  var display_timer = "00:" + (number >= 10 ? number: "0" + number);
  document.getElementById("countdown-wrapper").textContent = display_timer;
});


module.exports = Countdown;