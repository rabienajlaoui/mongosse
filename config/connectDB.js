const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/MONGOOSECHECKPOINT");
    console.log("CONNECTED");
  } catch (error) {
    console.error(e);
  }
};
module.exports = connect;