const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HR = new Schema({
  ID: {
    type: String
  },
  Key: {
    type: String
  },
  Name: {
    type: String
  },
  OfficeID: {
    type: String
  },
  Email: {
    type: String
  },
  Phone: {
    type: String
  }
});
module.exports = User = mongoose.model("HR", HR);