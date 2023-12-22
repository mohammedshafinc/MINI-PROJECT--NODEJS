const mongoose = require("mongoose");
const config = require("../config/database");
mongoose
    .connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("connected to mongo db");
    })
    .catch((err) => {
        console.log("error db is not connected" + err);
    });

const db = mongoose.connection;

module.exports = mongoose;
