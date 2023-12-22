const moongoose = require("mongoose");

const MONGO_URL = "mongodb://localhost:27017";

moongoose
    .connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("mongodb connected");
    })
    .catch((err) => {
        console.log("error connecting to mongo db " + err);
    });
