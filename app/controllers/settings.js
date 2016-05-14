var SettingsService = require('../services/settings');
var Q = require('q');

module.exports = {
  save : function (req, res) {
    // TODO Get settings from client-side or use default ones
    SettingsService.save().then(function(result){
      res.send({ success: true, data: result });
    }, function(err){
      console.log(err);
    })
  },
  get : function(req, res){
    SettingsService.get().then(function(result){
      res.send({ success: true, data: result });
    }, function(err){
      console.log(err);
    })
  }
};
