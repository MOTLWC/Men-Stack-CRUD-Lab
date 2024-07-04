require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const Fruit = require("./models/fruit.js")
const app = express();

async function init() {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(mongoose.connection.readyState);
        app.listen(process.env.PORT);
    }
    catch(err){console.log(err)}
}

app.get("/", (req, res) => {
    res.render("index.ejs")
});

app.get("/index/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/index/new", (req,res) => {
    console.log("Well it's erroring so i won't see this");
    res.redirect("/index/new")
})
init();