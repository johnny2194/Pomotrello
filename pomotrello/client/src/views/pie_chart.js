var Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);

var PieChart = function(data) {

 var container = document.getElementById("pie-chart-wrapper");

 var chart = new Highcharts.Chart({
   chart: {
     type: "pie",
     renderTo: container,
     plotBackgroundColor: blue,
     plotBorderWidth: 100,
     plotShadow: true,
   },
   title: {text: "Your Pomotrello Balance"},
   series: [
     {
       name: "Pomotrellos",
       data: data
     }
   ]

   plotOptions: {
       pie: {
           allowPointSelect: true,
           cursor: 'pointer',
               dataLabels: {
                   enabled: false,
               }
           }
       }
  });

}

module.exports = PieChart;
