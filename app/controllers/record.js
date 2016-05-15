var RecordService = require('../services/record');
var SettingsService = require('../services/settings');
var Q = require('q');

module.exports = {
  add : function (req, res) {
    var recordCount = req.params.amount || 0;
    RecordService.add(recordCount).then(function(){
      res.send({ success: true });
    }, function(err){
      console.log(err);
    });
  },
  drop : function (req, res) {
    RecordService.drop().then(function(){
      res.send({ success: true });
    }, function(err){
      console.log(err);
    });
  },
  list : function (req, res) {
    var page = req.params.page || 1;
    var count = req.params.count || 10;
    SettingsService.get().then(function(settings){
      RecordService.list(settings, page, count).then(function(result){
        res.send({ success: true, data : result });
      }, function(err){
        console.log(err);
      });
    }, function(err){
      console.log(err);
    });
  }
};
