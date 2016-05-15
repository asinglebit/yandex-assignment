var SettingsService = require('../services/settings');
var Q = require('q');

module.exports = {
  save : function (req, res) {
    var settings = req.body;
    SettingsService.save(settings).then(function(result){
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
