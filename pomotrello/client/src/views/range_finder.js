var Highcharts = require('highcharts/highstock');
require('highcharts/modules/exporting')(Highcharts);
var moment = require('moment');

var RangeFinder = function(data) {
var container = document.getElementById("graph-wrapper");
var today = moment();
var daysPast = [today]
var numberOfDaysBack = -100
var n = -1
while (n > numberOfDaysBack){
var yesterday = moment().add(n, "d");
daysPast.unshift(yesterday)
n--}




   var chart = new Highcharts.Chart({
     chart:{
       type:'line',
       renderTo: container
     },
     title:{text: "Total Poms"},
     rangeSelector:{
         enabled:true
     },
     series:[
     {
       name: "Pom Count",
       color: "#FFAC33",
       data:[
         {y:7, color: 'yellow'},
         {y:3, color: 'purple'},
         {y:2, color: 'orange'},
         {y:7, color: 'yellow'},
         {y:3, color: 'purple'},
         {y:2, color: 'orange'},
         {y:7, color: 'yellow'},
         {y:3, color: 'purple'},
         {y:2, color: 'orange'},
         {y:7, color: 'yellow'},
         {y:3, color: 'purple'},
         {y:2, color: 'orange'},
         {y:7, color: 'yellow'},
         {y:3, color: 'purple'},
         {y:2, color: 'orange'},
         {y:7, color: 'yellow'},
         {y:3, color: 'purple'},
         {y:2, color: 'orange'},
         {y:7, color: 'red'}
       ]
     }
     
     ],
     xAxis:{
      labels: {
          enabled: false
      },
       categories: daysPast
     }
   });
 }
module.exports = RangeFinder;