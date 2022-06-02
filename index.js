const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");

const app = express();
app.use(express.json());
app.listen(process.env.PORT || 5000, () => {
    console.log("listing");
  });


mongoose
  .connect("mongodb+srv://simantahash:1234@cluster0.dqojqlv.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("database conected");
  })
  .catch((e) => {
    console.log(e);
  });

app.use("/api/", userRoute);