const express = require("express");
const app = express();
require("dotenv").config();

const userRouter = require("./routes/userrouter.js");
const connectdb = require("./config/config.js");
connectdb();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use("/", userRouter);

app.listen(4000, () => {
    console.log("server Running");
});
