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

// Middleware
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("index.ejs")
});

app.get("/index/new", (req, res) => {
    res.render("new.ejs");
});

app.get("/index/list", async (req,res) => {
    res.render("list.ejs",{fruitArray:await Fruit.find()})
});

app.post("/index/new", async (req,res) => {
    try{
    await Fruit.create({name : req.body.name, rating : req.body.rating, doctorFructophobia : req.body.doctorFructophobia === "on"? true: false})
    } catch(err){
        console.log(err);
    }
    res.redirect("/index/new")
})
init();