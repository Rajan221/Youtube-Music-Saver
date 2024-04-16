const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const dbConnection = process.env.DBCONNECTION;
console.log(process.env.DBCONNECTION);

mongoose
  .connect(dbConnection)
  .then(() => {
    console.log(`Connected Successlyfully to the database on ${dbConnection}`);
  })
  .catch((error) => {
    console.log(`Connection error with error ${error}`);
  });
