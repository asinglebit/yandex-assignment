
var Record = require('../models/record.js').Record;
var Mongoose = require('mongoose');
require('mongoose-pagination');
var Randomizer = require('../utils/random.js');

module.exports = {
  add : function (req, res) {
    var recordCount = req.params.amount || 0;
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
        } else {
          console.log(err);
        }
      });
    }
  },
  drop : function (req, res) {
    Record.remove(function (err) {
      if (!err) {
        console.log("Records has been successfully dropped!");
      } else {
        console.log(err);
      }
    });
  },
  list : function (req, res) {
    // TODO Get ordered column list from settings
    // TODO Get sorting criteria from settings
    // TODO Get sorting order from settings

    Record.find({}, 'title', { sort: { title: -1 }}).paginate(req.params.page, parseInt(10), function(err, records, total) {
      if (!err){
        if (records.length != 0){
          res.send({ success : true, data : { docs : records, total : total, page : req.params.page }});
          console.log("Feed has been successfully acquired!");
        } else {
          res.send({ success : false, data : { total : total, page : req.params.page }});
          console.log("No records!");
        }
      } else {
        console.log(err);
      }
    });
  }
};
