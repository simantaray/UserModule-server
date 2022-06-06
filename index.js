const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const userRoute = require("./routes/user");

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 5000, () => {
  console.log("listing");
});

mongoose
  .connect(process.env.MONGO_LINK)
  .then(() => {
    console.log("database conected");
  })
  .catch((e) => {
    console.log(e);
  });

app.use("/api/", userRoute);
