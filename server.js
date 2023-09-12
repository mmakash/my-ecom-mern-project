const {readdirSync} = require("fs");
const express = require("express");
const app = express();
const helmet = require("helmet");
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

// middlewere
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(helmet());

// route middlewere
readdirSync("./routes").map(r =>app.use("/api/v1",require(`./routes/${r}`)));

const port = process.env.PORT || 8000;

// connect the server and start DB
mongoose
    .connect(process.env.DATABASE)
    .then(() => {
        console.log("DB Connected")
        app.listen(port, () => {
            console.log(`Server Running on port ${port}`);
        });
    })
    .catch((err) => console.log(err));