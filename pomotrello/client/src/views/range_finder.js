var Highcharts = require('highcharts/highstock');
require('highcharts/modules/exporting')(Highcharts);
var moment = require('moment');

var RangeFinder = function(data, dates) {
var container = document.getElementById("graph-wrapper");


   var chart = new Highcharts.Chart({
     chart:{
       type:'line',
       renderTo: container
     },
     title:{text: "Pom Count Over Time"},
     rangeSelector:{
         enabled:false
     },
     series:[
     {
       name: "Pom Count",
       color: "#1abc9c",
       data: data

     }

     ],
     xAxis:{
      labels: {
          enabled: false
      },
       categories: dates
     }
   });
 }
module.exports = RangeFinder;
