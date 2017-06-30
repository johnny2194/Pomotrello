var Task = function(options){
  this.description = options.description;
  this.category= options.category;
  this.pomCount = options.pomCount;

  this.date = options.date;
  this.startTime = options.startTime;
  this.endTime = options.endTime;
  this.completed = options.completed;
 
}

module.exports = Task;