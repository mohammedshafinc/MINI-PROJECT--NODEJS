const express = require("express");
const session = require("express-session");
const nocache = require("nocache");

const app = express();
require("dotenv").config();
const path = require("path");

const userRouter = require("./routes/userrouter.js");
const adminRouter = require("./routes/adminroutes.js");

const connectdb = require("./config/config.js");
connectdb();

app.set("view engine", "ejs");
// Use sessions
app.use(
    session({
        secret: "shafin",
        resave: false,
        saveUninitialized: true,
        // store: new MongoStore({ mongooseConnection: mongoose.connect }), // Store sessions in MongoDB
    })
);

app.use(nocache());
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

app.use("/validation", express.static("middleware"));

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use("/", userRouter);
app.use("/", adminRouter);

app.listen(4000, () => {
    console.log("server Running");
});
