var Settings = require('../models/settings.js').Settings;
var Mongoose = require('mongoose');

module.exports = {
  save : function (req, res) {

    // TODO Get settings from client-side or use default ones
    var _Settings = new Settings({});

    Settings.remove(function (err) {
      if (!err) {
        console.log("Settings have been successfully dropped!");
        _Settings.save(function (err) {
          if (!err) {
            console.log("Settings have been successfully reset!");
            module.exports.get(req, res);
          } else {
            console.log(err);
          }
        });
      } else {
        console.log(err);
      }
    });
  },
  get : function(req, res){
    Settings.findOne({}, function (err, result) {
      if (!err) {
        if (!result){
          module.exports.save(req, res);
        } else {
          res.send({ success: true, data: result });
          console.log("Settings have been successfully retrieved!");
        }
      } else {
        console.log(err);
      }
    });
  }
};
