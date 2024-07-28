const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  restaurant:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant"
  },
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model("Category", categorySchema);
