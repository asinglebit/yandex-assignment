var Mongoose = require("mongoose");

var SettingsSchema = Mongoose.Schema({
  sorting: {
    column: { type: String, default: "title" },
    ascending: { type: Boolean, default: true }
  },
  appearance: { type: [String] }
});

var Settings = Mongoose.model('Settings', SettingsSchema);

module.exports = {
  Settings: Settings
}
