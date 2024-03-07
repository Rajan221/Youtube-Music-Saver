const mongoose = require("mongoose");

dbConnection = "mongodb://localhost:27017/youtubeSave";
mongoose
  .connect(dbConnection)
  .then(() => {
    console.log(`Connected Successlyfully to the database on ${dbConnection}`);
  })
  .catch((error) => {
    console.log(`Connection error with error ${error}`);
  });
