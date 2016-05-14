var SettingsController = require('./controllers/settings');
var RecordController = require('./controllers/record');
var Router = require('express').Router();

module.exports = function(root){

  // Settings

  Router.post('/api/settings/', SettingsController.save);
  Router.get('/api/settings/', SettingsController.get);

  // Feed

  Router.get('/api/addrecords/:amount', RecordController.add);
  Router.get('/api/dropallrecords', RecordController.drop);
  Router.get('/api/feed/:page', RecordController.list);

  // Single Page Application

  Router.get('*', function (req, res) {
    res.sendFile(root + '/public/views/index.html');
  });

  return Router;
}
