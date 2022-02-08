const mongoose = require("mongoose");
const { Schema } = mongoose;

const pinSchema = new Schema({
  postedBy: { type: Map },
  destination: { type: String },
  title: { type: String },
  description: { type: String },
  comments: { type: Array },
  createdAt: { type: Date, default: Date.now },
  category: { type: String },
  pinUrl: String,
});

const Pin = mongoose.model("Pin", pinSchema);

module.exports = Pin;
