const mongoose = require("mongoose")
const port = 3001
const mongouri = 'mongodb://localhost:27017/challengeupload'
const express = require("express")
const app = express()
app.use(express.json())

mongoose.connect(mongouri)
const connection = mongoose.connection
const challengeupload = new mongoose.Schema({
    Cname: {
        type: String,
        required: true
    },
    Ccategory: {
        type: String,
        required: true
    },
    Clevel: {
        type: String,
        required: true
    },
    Cdescription: {
        type: String,
        required: true
    },
    Cpoints: {
        type: String,
        required: true
    },
    Cflag: {
        type: String,
        required: true
    },
    Chint: {
        type: String,
        required: true
    },
    Cauthor: {
        type: String,
        required: true
    }
    
})

const Challengeupload = connection.model('challenge', challengeupload)



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


app.post('/challengeupload', function (req, res) {
    console.log(req.body)
    //let studentdata = JSON.stringify(req.body)
    const doc = new Challengeupload({
        Cname: req.body.Cname,
        Ccategory: req.body.Ccategory,
        Clevel: req.body.Clevel,
        Cdescription: req.body.Cdescription,
        Cpoints: req.body.Cpoints,
        Cflag: req.body.Cflag,
        Chint: req.body.Chint,
        Cauthor: req.body.Cauthor 
        
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


app.post('/challengeupload', function (req, res) {
    console.log(req.body)
    let userdata = JSON.stringify(req.body)
    fs.appendFile('challenge.txt', userdata, (err) => {
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