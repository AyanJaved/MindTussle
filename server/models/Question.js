const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema({
  subject: String,
  question: String,
  options: [String],
  answer: Number,
});
module.exports = mongoose.model("Question", questionSchema);