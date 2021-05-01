const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoryShema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Category", categoryShema);
