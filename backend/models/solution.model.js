const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const solutionSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    language: {
      type: String,
    },
    webURL: {
      type: String,
    },
    youtubeURL: {
      type: String,
    },
    topic: {
      type: String,
    },
    timeC: {
      type: String,
    },
    spaceC: {
      type: String,
    },
    hint: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Solution", solutionSchema);
