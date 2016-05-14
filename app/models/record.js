var Mongoose = require("mongoose");

var RecordSchema = Mongoose.Schema({
  title: { type: String, default: "Unknown title" },
  author: { type: String, default: "Unknown author" },
  link: { type: String, default: "https://www.unknown.ru" },
  publicationDate: { type: Date, default: Date.now },
  rating: { type: Number, default: 0 },
  availability: { type: Boolean, default: false },
});

var Record = Mongoose.model('Record', RecordSchema);

module.exports = {
  Record: Record
}
