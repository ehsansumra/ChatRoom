
import mysql2 from 'mysql2';
import moment from 'moment';
import cors from "cors";
import cookieParser from "cookie-parser"
import {authUser, addUser, loggedOn, checkUser, loadJSON, saveJSON} from './jops.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()
let login = require('./routes/login')

const PORT = process.env.PORT || 5001;

const chat = 
{ 
    lines: []
}

let con = mysql2.createConnection({
	host: "localhost",
	user: "root",
	password: "B_vZG9U%:!S5:rF$",
	database: "user"
})


// setting static
app.use(cookieParser())

// app.use((req, res, next) => {
//     let cookie = req.cookies.cookieName
//     if (cookie === undefined) {
//         var randomNum=Math.random().toString(); 
//         console.log(cookie)
//         res.cookie('cookieName', randomNum, {httpOnly: true});
//         console.log('cookie created')
//     } else {
//         console.log('cookie exists')
//     }
//     next();
// })

app.use(cors())
app.use(express.json())

app.post("/login", (req, res) => {
    console.log(req.body)
    const username = req.body.username
    const userAuth = authUser(username, userID, "storage/test.json") //change authUser to only check username
    
    if (userAuth) {
        
        let cookie = req.cookies.cookieName
        if (cookie === undefined) {// find id, set as cookie value
            res.cookie('cookieName', randomNum, {httpOnly: true});
            console.log('cookie created')
        } else {
            console.log('cookie exists')
        }

        loggedOn(username, "storage/test.json")
        console.log(`logged in user: ${username}`)
        res.sendStatus(200)

    } else {
        res.sendStatus(401)
        console.log('login not authorized')
    }
})

app.post("/text", (req, res) => {
    console.log(req.body)
    const text = req.body.text
    console.log(text)
    console.log(`text received: ${JSON.stringify(req.body)}`)
    res.json(JSON.stringify(req.body))// {"username": name, "text": text}
}) // TODO, try appending these jsons to an array. THEN sending them back
//ex.
// data = [{"username": "Bob", "text": "hey"}, {"username": "Bill", "text": "wassup"}, {"username": "Bob", "text": "same shit"}]
// write a frontend script to display this
// -- you already have the script in main.js to display one of these objects!

app.post("/chat", (req, res) => {
    const line = req.body
    console.log(`/chat line: ${line}`)
    console.log(`/chat stringify line: ${JSON.stringify(line)}`)
    
     // switch to memory
    chat.lines.push(line)
    res.sendStatus(200)

})

app.post("/update", (req, res) => {
    // ?skip
    let skip = req.query.skip
     // replace with memory
    console.log('sending')
    res.json(JSON.stringify(chat))
})


    
app.listen(PORT, () => console.log(`Server Start, port ${PORT}`));

