const mongoose = require("mongoose")
const dog = require('./models/dog')
require("dotenv").config()

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection

db.on("connected", () => console.log(`mongoose is mongoosing on ${db.name} @ ${db.host}:${db.port}`))
db.on("error", err => conosle.log(`the mongoose is on fire 🔥`, err))

const dogCRUD = async () => {
    try {
        // creation of a dog
        const newDog = await dog.create({
            name: "Trotsky",
            breed: "Labradoodle",
            color: "Gray/Black"
        })

        // console.log(newDog)
        // reading all dogs
        const allDogs = await dog.find({})
        console.log(allDogs)
    } catch (err) {
        console.log(err)
    }
}
dogCRUD()