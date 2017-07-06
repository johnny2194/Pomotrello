var Highcharts = require('highcharts/highstock');
require('highcharts/modules/exporting')(Highcharts);
var moment = require('moment');

var RangeFinder = function(data, dates) {
var container = document.getElementById("graph-wrapper");
// var today = moment();
// var daysPast = [today]
// var numberOfDaysBack = -1
// var n = -1
// while (n > numberOfDaysBack){
// var yesterday = moment().add(n, "d");
// daysPast.unshift(yesterday)
// n--}



   var chart = new Highcharts.Chart({
     chart:{
       type:'line',
       renderTo: container
     },
     title:{text: "Total Poms"},
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
