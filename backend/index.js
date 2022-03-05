var express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require('path');


dotenv.config();

var app = express();

app.use(morgan("dev"));

// Use localhost on the server
mongoose.connect(`mongodb+srv://varghesetestuser:${process.env.password}@b2db.1gpfz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Connected to db");
    }
});


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

//API's
const allRoutes = require('./routes/allRoutes')
app.use('/', express.static(path.join(__dirname)))
app.use("/api", allRoutes)
app.listen(3010, (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("No errors listening on port 3010")
    }
});