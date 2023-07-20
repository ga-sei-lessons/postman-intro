// required packages
const express = require("express")
const mongoose = require("mongoose")
const dog = require('./models/dog')
require("dotenv").config()

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection

db.on("connected", () => console.log(`mongoose is mongoosing on ${db.name} @ ${db.host}:${db.port}`))
db.on("error", err => conosle.log(`the mongoose is on fire 🔥`, err))

// app setup
const app = express()
const PORT = 8080
app.set("view engine", "ejs")

// middlewares
app.use(express.urlencoded({ extended: false }))

// routes 
// index route will dispaly a list of dogs and 
// have a form to post a new dog to the database
app.get("/", async (req, res) => {
    try {
        const allDogs = await dog.find()
        console.log(allDogs)
        res.render("index.ejs", {
            allDogs
        })
    } catch (err) {
        console.log(err)
        res.send("server burned down 🔥")
    }
})

// POST /dogs -- creates a new dog in the db
// redirect back to /
app.post("/dogs", async (req, res) => {
    try {
        console.log(req.body)
        await dog.create(req.body)
        res.redirect("/")
    } catch (err) {
        console.log(err)
        res.send("server burned down 🔥")
    }
})

// listen on a port
app.listen(PORT, () => {
    console.log(`listening to the smooth sounds of port ${PORT} in the morning 🌊`)
})