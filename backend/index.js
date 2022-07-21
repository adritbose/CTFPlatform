const mongoose = require("mongoose")
const port = 3001
const mongouri = 'mongodb://localhost:27017/studentapp'
const fs = require("fs")
const express = require("express")
const app = express()
app.use(express.json())

mongoose.connect(mongouri)
const connection = mongoose.connection
const ctfContest = new mongoose.Schema({
    challengeName: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

const Studentdetail = connection.model('user', studentdetail)



const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))


var usr = {
    "username": "adrit123",
    "password": "adi123"
}


app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/contacts', (req, res) => {
    res.send('Adrit Bose - ad@gmail.com')
})

app.get('/aboutus', (req, res) => {
    res.send('we are one of the leading tech corps')
})


app.post('/studentdetail', function (req, res) {
    console.log(req.body)
    //let studentdata = JSON.stringify(req.body)
    const doc = new Studentdetail({
        name: req.body.name,
        id: req.body.id,
        marks: req.body.marks,
        email: req.body.email
    })

    doc.save(function (err) {
        if (err) {
            console.log(err)
            res.send("data saving failed")

        }
        else {
            res.send("data saved")
        }
    })

    // fs.appendFile('user.txt', studentdata, (err) => {
    //     if (err) {
    //         res.send("Details Not Saved. Error!")
    //     }
    //     else {
    //         res.send('Details saved')
    //     }
    // })
})


app.post('/signup', function (req, res) {
    console.log(req.body)
    let userdata = JSON.stringify(req.body)
    fs.appendFile('data.txt', userdata, (err) => {
        if (err) {
            res.send("data is not saved. Error!")
        }
        else {
            res.send('data saved')
        }
    })
})


app.post('/login', function (req, res) {
    console.log(req.body.username)
    console.log(req.body.password)
    console.log(usr.username)
    if (usr.username == req.body.username & usr.password == req.body.password) {
        res.send('login successful')
    }
    else {
        res.send('login unsuccessful')
    }
})

app.listen(3000, () => {
    console.log("Server started at http://127.0.0.1:3000/")
})