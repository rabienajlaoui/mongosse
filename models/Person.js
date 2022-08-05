const mongoose = require("mongoose");

//Create a person with this prototype:
const personSchema = new mongoose.Schema({
  name: { type: String, required: true, uppercase: true },
  age: Number,
  favoriteFoods: [String],
});
const Person = mongoose.model("person", personSchema);
module.exports = Person;