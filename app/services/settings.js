var Settings = require('../models/settings.js').Settings;
var Mongoose = require('mongoose');
var Q = require('q');

module.exports = {
  save : function (settings) {
    var deferred = Q.defer();

    var _Settings = new Settings({});
    if (typeof settings != "undefined"){
      _Settings.appearance = settings.appearance;
      _Settings.sorting = settings.sorting;
      console.log(settings);
    }

    Settings.remove(function (err) {
      if (!err) {
        console.log("Settings have been successfully dropped!");
        _Settings.save(function (err) {
          if (!err) {
            console.log("Settings have been successfully reset!");
            module.exports.get().then(function(result){
              deferred.resolve(result);
            }, function(err){
              deferred.reject(err)
            });
          } else {
            deferred.reject(err)
          }
        });
      } else {
        deferred.reject(err)
      }
    });

    return deferred.promise;
  },
  get : function(){
    var deferred = Q.defer();

    Settings.findOne({}, function (err, result) {
      if (!err) {
        if (!result){
          module.exports.save().then(function(result){
            deferred.resolve(result);
          }, function(err){
            deferred.reject(err)
          });
        } else {
          console.log("Settings have been successfully retrieved!");
          deferred.resolve(result);
        }
      } else {
        deferred.reject(err)
      }
    });

    return deferred.promise;
  }
};
