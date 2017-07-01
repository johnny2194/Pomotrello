var Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);

var PieChart = function(data) {

 var container = document.getElementById("pie-chart-wrapper");

 var chart = new Highcharts.Chart({
   chart: {
     type: "pie",
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

module.exports = PieChart;
