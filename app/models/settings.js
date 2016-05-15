var Mongoose = require("mongoose");

var SettingsSchema = Mongoose.Schema({
  sorting: {
    column: { type: String, default: "title" },
    ascending: { type: Boolean, default: true },
    disabled: { type: [String], default: ["availability"] }
  },
  appearance: { type: [String], default: ["title", "author", "link", "publicationDate", "rating", "availability"] }
});

var Settings = Mongoose.model('Settings', SettingsSchema);

module.exports = {
  Settings: Settings
}
