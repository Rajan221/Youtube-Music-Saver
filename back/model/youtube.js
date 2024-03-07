const mongoose = require("mongoose");

const YoutubeSchema = new mongoose.Schema({
  videoLink: {
    type: String,
  },
  videoTitle: {
    type: String,
  },
  videoImage: {
    type: String,
  },
  clickCount: {
    type: Number,
    default: 0,
  },
});

const Youtube = new mongoose.model("Youtube", YoutubeSchema);

module.exports = Youtube;
