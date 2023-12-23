const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");

const userRouter = require("./routes/userrouter.js");
const connectdb = require("./config/config.js");
connectdb();

app.set("view engine", "ejs");

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use("/", userRouter);

app.listen(4000, () => {
    console.log("server Running");
});
