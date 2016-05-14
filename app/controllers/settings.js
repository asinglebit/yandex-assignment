var Message = require('../models/settings.js').Message;
var Mongoose = require('mongoose');

module.exports = {
  save : function (req, res) {
    var date = new Date();
    var message = req.body;
    new Message({
      date: date,
      email: message.email,
      text: message.text
    }).save(function (err) {
      if (!err) {
        res.send({ success: true });
        console.log("Message has been successfully saved!");
      } else {
        console.log(err);
      }
    });
  },

  get : function(req, res){
    Message.findById(Mongoose.Types.ObjectId(req.params.id), function (err, foundMessage) {
      if (!err) {
        res.send({ success: true, data: foundMessage });
        console.log("Message with id " + req.params.id + " has been successfully found!");
      } else {
        console.log(err);
      }
    });
  }
};
