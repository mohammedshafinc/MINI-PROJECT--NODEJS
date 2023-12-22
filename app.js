const express = require("express");
const app = express();

const Router = require("./routes/router.js");

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use("/", Router);

app.listen(4000, () => {
    console.log("server Running");
});
