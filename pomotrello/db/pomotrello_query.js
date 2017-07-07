var MongoClient = require("mongodb").MongoClient;

var PomotrelloQuery = function() {
  this.url = "mongodb://localhost:27017/pomotrello"
};

PomotrelloQuery.prototype = {

  all: function(onQueryFinished) {
    MongoClient.connect(this.url, function(err, db) {
      if(err) {
        console.log("Error in pomotrello query all - connect");
      };
      var collection = db.collection("tasks");
      collection.find().toArray( function(err, docs) {
        if(err) {
          console.log("Error in pomotrello query all - collection");
        };
        onQueryFinished(docs);
      })
    })
  },

  add: function(taskToAdd, onQueryFinished) {
    MongoClient.connect(this.url, function(err, db) {
      if(err){
        console.log("Error in pomotrello query add - connect");
      };
      var collection = db.collection("tasks");
      collection.insert(taskToAdd);
      collection.find().toArray(function(err, docs) {
        if(err) {
          console.log("Error in pomotrello query add - collection");
        };
        onQueryFinished(docs);
      });
    });
  },

  delete: function(taskToDelete, onQueryFinished) {
    MongoClient.connect(this.url, function(err, db) {
      if(err) {
        console.log("Error in pomotrello query delete - connect");
      };
      var collection = db.collection("tasks");
      collection.deleteOne(taskToDelete);
      collection.find().toArray(function(err, docs) {
        if(err) {
          console.log("Error in pomotrello query delete - collection");
        };
        onQueryFinished(docs);
      });
    });
  },
  
  update: function(taskToUpdate, updatedTask, onQueryFinished) {
    MongoClient.connect(this.url, function(err, db) {
      if(err) {
        console.log("Error in pomotrello query update - connect");
      }
      var collection = db.collection("tasks");
      collection.replaceOne(taskToUpdate, updatedTask);
      collection.find().toArray(function(err, docs) {
        if(err) {
          console.log("Error in pomotrello query update - collection");
        };
        onQueryFinished(docs);
      });
    });
  }
};


module.exports = PomotrelloQuery;
