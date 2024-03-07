const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");
require("./db/conection");

const Youtube = require("./model/youtube");
const Account = require("./model/userAccount");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/", async (req, res) => {
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

    // res.json({ title, image });
  } catch (error) {
    console.error("Error fetching link preview:", error);
    res.status(500).json({ error: "Failed to fetch link preview" });
  }
});

app.get("/", async (req, res) => {
  try {
    const videoData = await Youtube.find().sort({ _id: -1 });
    res.status(201).json(videoData);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get("/mostPlayed", async (req, res) => {
  try {
    const videoData = await Youtube.find().sort({ clickCount: -1 }).limit(3);

    res.status(201).json(videoData);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.put("/:id", async (req, res) => {
  try {
    const video = await Youtube.findById(req.params.id);
    video.clickCount++;
    await video.save();
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteResponse = await Youtube.deleteOne({ _id: id });
    res.status(201).send(deleteResponse);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get("/user", (req, res) => {
  res.send("This is user");
});

app.post("/user", async (req, res) => {
  try {
    const UserData = new Account(req.body);
    const response = await UserData.save();
    res.status(201).send(response);
  } catch (e) {
    res.status(500).send(e);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on Port http://localhost:${PORT}`);
});
