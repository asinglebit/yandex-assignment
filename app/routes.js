var SettingsController = require('./controllers/settings');
var RecordController = require('./controllers/record');
var Router = require('express').Router();

module.exports = function(root){

  // Settings

  Router.get('/api/settings/save', SettingsController.save);
  Router.get('/api/settings/get', SettingsController.get);

  // Feed

  Router.get('/api/records/add/:amount', RecordController.add);
  Router.get('/api/records/drop', RecordController.drop);
  Router.get('/api/records/get/:page', RecordController.list);

  // Single Page Application

  Router.get('*', function (req, res) {
    res.sendFile(root + '/public/views/index.html');
  });

  return Router;
}
