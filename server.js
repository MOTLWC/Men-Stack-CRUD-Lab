require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();

async function init() {
    app.listen(process.env.PORT);
}

app.get("/", (req,res) => {
    res.render("index.ejs")
});

init();