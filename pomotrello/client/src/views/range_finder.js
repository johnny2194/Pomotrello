var Highcharts = require('highcharts/highstock');
require('highcharts/modules/exporting')(Highcharts);
var moment = require('moment');
var TaskList = require('../models/task_list.js');

var RangeFinder = function(data) {
  var container = document.getElementById("graph-wrapper");
  var today = moment();
  var daysPast = [today]

  var numberOfDaysBack = -100
  var n = -1
  while (n > numberOfDaysBack){
    var yesterday = moment().add(n, "d");
    daysPast.unshift(yesterday)
    n--
  }
  

  var taskList = new TaskList();
  taskList.all(function(allTasks) {
    var formattedData = formattedPomData(allTasks);
    createChart(formattedData);
  })

  var totalPoms = []
  var formattedPomData = function(){
  var formattedPomData = [];
  

  for (var pom in totalPoms) {
    console.log('pom loop iterator', pom)
    var dataObject = {}
    dataObject.y = totalPoms[pom];
    console.log('totalPoms[pom]', totalPoms[pom])
    formattedPomData.push(dataObject);
    console.log('formattedPomData', formattedPomData)

    var pomCountInt = parseInt(task.pomCount);
    totalPoms.push(pomCountInt)
  }

  console.log("This Should be the DATA", formattedPomData)
}




    var createChart =function(formattedData){// createChart function
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
      name: "Poms Completed",
      color: "#FFAC33",
      data: formattedData
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


   




  /////////
}
module.exports = RangeFinder;