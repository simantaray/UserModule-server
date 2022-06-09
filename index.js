const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require('cookie-parser')
const userRoute = require("./routes/user");
const tableRouter = require("./routes/table")

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

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

app.use("/api/user", userRoute);
app.use("/api/table", tableRouter);
