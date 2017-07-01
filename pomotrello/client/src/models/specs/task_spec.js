var Task = require("../task.js");
var assert = require("assert");

describe("Task", function() {
  var task;

  beforeEach(function() {
    task = new Task({
      description: "Setup database and file structure for Pomotrello",
      category: "Planning",
      pomCount: "2",
      date: "",
      startTime: "",
      endTime: "",
      completed: false
    });
    task2 = new Task({
      description: "Code like my life depends on it",
      category: "Coding",
      pomCount: "10",
      date: "2017-07-01",
      startTime: "10.00",
      endTime: "17.00",
      completed: false
    });
  });

  it("Should have a category of planning", function() {
    assert.equal(task.category, "Planning");
  });

  it("Should have a pomCount of 2", function() {
    assert.equal(task.pomCount, 2);
  });

  it("Should have a completed of false", function() {
    assert.equal(task.completed, false);
  });

  it("Should have a description of Code like my life depends on it", function() {
    assert.equal(task2.description, "Code like my life depends on it");
  });

});
