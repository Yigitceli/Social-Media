const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: { type: String, unique: true },
  displayName: String,
  photoUrl: String,
  saved: { type: Array, default: [] },  
});

const User = mongoose.model("User", userSchema);

module.exports = User;
