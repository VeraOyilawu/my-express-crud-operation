const express = require("express")
const mongoose = require("mongoose")
const PORT = 5555

const app = express()
app.use( express.json())

const sampleSchema = new mongoose.Schema({
   name: String,
   course: String,
   designation: String,
   score: {
        html: Number,
        css: Number,
        javascript: Number,
        node: Number
   }
})

const student = mongoose.model("sample", sampleSchema)

app.post( "/create", async(req, res) => {
    const newStudent = await student.create(req.body)
    res.status(200).json({
       new: newStudent
    })
})

app.get("/getAll", async (req, res) => {
    const allStudent = await student.find()
    res.status(200).json( {
        message: "The available student in my database are: " + allStudent.length,
        data: allStudent
    })
})

app.get("/getone/:id" ,async (req, res) => {
    const getOne = await student.findById(req.params.id)
    res.status(200).json( {
        message:" the one student",
        data: getOne
    })
})

app.put( "/update/:id", async(req, res) => {
    const id = req.params.id
    const updatestudent = req.body;
    const index = await student.findByIdAndUpdate(id, updatestudent, {new: true});

    res.status(200).json( {
        message : `This info: ${id} has been updated`,
        data : index
    })
})

app.delete ("/delete/:id", async (req, res) => {
    const id = req.params.id
    const deleteStudent = await student.findByIdAndDelete((id)) 

    res.status(200).json( {
        message : `This info: ${id} has been deleted`,
        data : deleteStudent
    })
})


mongoose.connect("mongodb+srv://alexandravera789:mSAUmOKO3QPErX3f@cluster0.dqzjdoo.mongodb.net/")
.then(() => {
    console.log("connected.........");
})
.catch( () => {
    console.log(" unable to connect");
})


app.listen( PORT, () => {
    console.log(`listening to port ${PORT}`);
})