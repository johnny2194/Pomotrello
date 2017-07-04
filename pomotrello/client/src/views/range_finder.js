var Highcharts = require('highcharts/highstock');
require('highcharts/modules/exporting')(Highcharts);

var RangeFinder = function(data) {

 var container = document.getElementById("graph-wrapper");

   var chart = new Highcharts.Chart({
     chart:{
       type:'line',
       renderTo: container
     },
     title:{text: "Total Poms"},
     series:[
     {
       name: "Pom Count",
       color: "#FFAC33",
       //JS,Java,Ruby,Scratch
       data:[
         {y:7, color: 'yellow'},
         {y:3, color: 'purple'},
         {y:2, color: 'orange'},
         {y:7, color: 'red'}
       ]
     }
     
     ],
     xAxis:{
       categories: ["January","February","March", "April"]
     }
   });
 }
module.exports = RangeFinder;