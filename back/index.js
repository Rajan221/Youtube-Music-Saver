const express = require("express");
const app = express();
const cors = require("cors");
require("./db/conection");

app.use(express.json());
app.use(cors());

//Routes getting
const homeRouter = require("./router/videoRoute");
const userRouter = require("./router/userRoute");

app.use("/", homeRouter);
app.use("/user", userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on Port http://localhost:${PORT}`);
});
