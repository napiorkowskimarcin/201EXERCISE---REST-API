let mongoose = require("mongoose");

let CustomerSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Customer", CustomerSchema);
