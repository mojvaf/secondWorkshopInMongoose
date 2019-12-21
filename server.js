const express = require("express")
const mongoose = require("mongoose")
const api = express()
api.listen(3000, () => console.log("server is working"))
mongoose.connect("mongodb://localhost/flat", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
const flatSchema = new mongoose.Schema({
    address_full: {
        type: String,
        required: true,
    },
    district: String,
    area_sqm: Number,
    zimmer: {
        type: Number,
        default: 1
    },
    price: Number,
    landlord: String
})
const flat = mongoose.model("flat", flatSchema)
api.use(express.json())
api.get("/", (req, res) => {
    console.log("home route")
    res.send("home route")
})
api.get("/flat", (req, res, next) => {
    console.log("flat route")
    flat.find().then(flat => {
        res.send(flat)
    })
})
api.get("/flat/:id", (req, res, next) => {
    console.log("flat route")
    let id = req.params.id
    console.log(req.params.id)
    flat.findById(id).then(flat => {
        res.send(flat)
    })
        .catch(err => next(err))
})
api.post("/flat", (req, res, next) => {
    console.log("post route")
    console.log("string:", req.body)
    flat.create(req.body).then(flat => {
        res.send(flat)
    })
})
api.patch("/flat/:id", (req, res, next) => {
    console.log("patch route")
    let id = req.params.id
    let updatedFlat = req.body
    flat.findByIdAndUpdate(id, updatedFlat).then(flat => {
        res.send(flat)
    })
})
api.delete("/flat/:id", (req, res, next) => {
    console.log("delete route")
    let id = req.params.id
    let updatedFlat = req.body
    flat.findByIdAndDelete(id, updatedFlat).then(flat => {
        res.send(flat)
    })
})