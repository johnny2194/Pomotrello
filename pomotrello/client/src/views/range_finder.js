var Highcharts = require('highcharts/highstock');
require('highcharts/modules/exporting')(Highcharts);

var RangeFinder = function(data) {

 var container = document.getElementById("graph-wrapper");

 var chart = new Highcharts.Chart({
   chart: {
     type: "line",
     renderTo: container
   },
   title: {text: "Your Pomotrello Balance"},
   series: [
     {
       name: "Pomotrellos",
       data: data
     }
   ]

  });

}

module.exports = RangeFinder;