require("dotenv").config();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const express = require("express");
const Fruit = require("./models/fruit.js");
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
// ! IMPORTANT ! the delete or put won't work without this middleware
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
    res.render("index.ejs")
});

app.get("/index/new", (req, res) => {
    res.render("new.ejs");
});

app.get("/index/list", async (req,res) => {
    res.render("list.ejs",{fruitArray:await Fruit.find()})
});

app.get("/index/:fruitId", async (req,res) => {
    res.render("show.ejs", {Fruit : await Fruit.findById(req.params.fruitId)});
});

app.get("/index/update/:fruitId", async (req, res) => {
    res.render("update.ejs", {Fruit : await Fruit.findById(req.params.fruitId)});
})

app.put("/index/update/:fruitId", async (req,res) => {
    try{
        await Fruit.findByIdAndUpdate(req.params.fruitId, {name : req.body.name, rating : req.body.rating, doctorFructophobia : req.body.doctorFructophobia === "on"? true: false})
        } catch(err){
            console.log(err);
        }
        res.redirect("/index/" + req.params.fruitId)
});

app.post("/index/new", async (req,res) => {
    try{
    await Fruit.create({name : req.body.name, rating : req.body.rating, doctorFructophobia : req.body.doctorFructophobia === "on"? true: false})
    } catch(err){
        console.log(err);
    }
    res.redirect("/index/new")
})

app.delete("/index/delete/:fruitId", async (req, res) => {
    try{
        await Fruit.findByIdAndDelete(req.params.fruitId);
        res.redirect("/index/list");
    } catch(err){
        console.log(err);
    }
});
init();