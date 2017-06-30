var MongoClient = require("mongodb").MongoClient;
var PomotrelloQuery = function() {
  this.url = "mongodb://localhost:27017/pomotrello"
}

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
  }
}

module.exports = PomotrelloQuery;