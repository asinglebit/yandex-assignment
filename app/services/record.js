var Record = require('../models/record.js').Record;
var Mongoose = require('mongoose');
var Randomizer = require('../utils/random.js');
var Q = require('q');
require('mongoose-pagination');

module.exports = {
  add : function (recordCount) {
    var deferred = Q.defer();

    for (var i = 0; i < recordCount; ++i){
      new Record({
          title: Randomizer.randomString(),
          author: Randomizer.randomString(),
          link: Randomizer.randomURL(),
          publicationDate: Randomizer.randomDate(),
          rating: Randomizer.randomNumber(),
          availability: Randomizer.randomBoolean()
      }).save(function (err) {
        if (!err) {
          console.log("Record has been successfully saved!");
          deferred.resolve();
        } else {
          deferred.reject(err)
        }
      });
    }

    return deferred.promise;
  },
  drop : function () {
    var deferred = Q.defer();

    Record.remove(function (err) {
      if (!err) {
        console.log("Records has been successfully dropped!");
        deferred.resolve();
      } else {
        deferred.reject(err)
      }
    });

    return deferred.promise;
  },
  list : function (settings, page, count) {
    var deferred = Q.defer();

    var appearance = settings.appearance.toString().split(",").join(" ");
    function combineObject(property, value){ this[property] = value && 1 || -1; }
    var sortingCriteria = new combineObject(settings.sorting.column, settings.sorting.ascending);

    Record.find({}, appearance, { sort: sortingCriteria }).paginate(page, parseInt(count), function(err, records, total) {
      if (!err){
        if (records.length != 0){
          console.log("Feed has been successfully acquired!");
          deferred.resolve({ success : true, data : { docs : records, total : total, page : page }});
        } else {
          console.log("No records!");
          deferred.resolve({ success : false, data : { total : total, page : page }});
        }
      } else {
        deferred.reject(err)
      }
    });

    return deferred.promise;
  }
};
