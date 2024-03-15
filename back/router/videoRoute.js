const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const Youtube = require("../model/youtube");

// ************************ VIDEO ROUTES *******************************
//getting and storing the data into the database
router.post("/", async (req, res) => {
  try {
    const { url } = await req.body;
    // console.log(url);
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const title = $("title").text().trim();
    const image = $('meta[property="og:image"]').attr("content");
    // console.log(url, title, image);

    const existingVideo = await Youtube.findOne({ videoTitle: title });

    if (existingVideo) {
      return res.status(200).json({ message: "Video already added" });
    } else {
      const youtubeInstance = new Youtube({
        videoLink: url,
        videoTitle: title,
        videoImage: image,
      });

      await youtubeInstance.save();
      res.status(201).send("Data sended");
    }
  } catch (error) {
    console.error("Error fetching link preview:", error);
    res.status(500).json({ error: "Failed to fetch link preview" });
  }
});

//send the video data to the api
router.get("/", async (req, res) => {
  try {
    const videoData = await Youtube.find().sort({ _id: -1 });
    res.status(201).json(videoData);
  } catch (e) {
    res.status(500).send(e);
  }
});

/*
Get the list of mostplayed videos
--> this api sends only 3 video with the highest click count
*/
router.get("/mostPlayed", async (req, res) => {
  try {
    const videoData = await Youtube.find().sort({ clickCount: -1 }).limit(3);

    res.status(201).json(videoData);
  } catch (e) {
    res.status(500).send(e);
  }
});

/*
update the video information
for till now only able to update the clickCount
*/
router.put("/:id", async (req, res) => {
  try {
    const video = await Youtube.findById(req.params.id);
    video.clickCount++;
    await video.save();
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete the video added to the list
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteResponse = await Youtube.deleteOne({ _id: id });
    res.status(201).send(deleteResponse);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
