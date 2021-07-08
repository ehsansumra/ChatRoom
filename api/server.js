const mysql2 = require('mysql2')
const moment = require('moment')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const jops = require('./jops.js')
const express = require('express'),
      update = require('./routes/update')  
const path = require('path')
const bodyParser = require('body-parser')
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
const { v4: uuidv4 } = require('uuid');
const app = express()
const PORT = process.env.PORT || 5001;

var options = {
	host: 'localhost',
	port: 5001,
	user: 'root',
	password: 'B_vZG9U%:!S5:rF$',
	database: 'user',
    createDatabaseTable: true,
    schema: {
		tableName: 'sessions2',
		columnNames: {
			session_id: 'session_id',
			expires: 'expires',
			data: 'data'
		}
	}
};

var sessionStore = new MySQLStore(options);




let con = mysql2.createConnection({
	host: "localhost",
	user: "root",
	password: "B_vZG9U%:!S5:rF$",
	database: "user"
})

app.use(session({
	key: 'session_cookie_name',
	secret: 'session_cookie_secret',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}));

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
app.use('/', update);

app.post("/users/login", (req, res, next) => {
    console.log(req.body)
    const username = req.body.username
    const password = req.body.password
    con.connect((err) => {
		if (err) throw err;
		
		let sql =  `SELECT user.password, user.username FROM user WHERE user.username = '${username}'`
		con.query(sql, (err, result) => {
			if (err) {
				console.log(err.code, err.sqlMessage)
			}
			console.log(result)
            console.log(req.body)
			if (result[0].password == password && result[0].username == username){
                res.locals.username = req.body.username
                next()
            } else {res.sendStatus(401)} // I AM HERE
        })
    })}, (req, res) => {
        req.session.loggedOn = true
        req.session.username = res.locals.username
        console.log(req.session)
        
    })
    


    
    // const userAuth = jops.authUser(username, userID, "storage/test.json") //change authUser to only check username
    
    // if (userAuth) {
        
    //     let cookie = req.cookies.cookieName
    //     if (cookie === undefined) {// find id, set as cookie value
    //         res.cookie('cookieName', randomNum, {httpOnly: true});
    //         console.log('cookie created')
    //     } else {
    //         console.log('cookie exists')
    //     }

    //     loggedOn(username, "storage/test.json")
    //     console.log(`logged in user: ${username}`)
    //     res.sendStatus(200)

    // } else {
    //     res.sendStatus(401)
    //     console.log('login not authorized')
    // }


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

    
app.listen(PORT, () => console.log(`Server Start, port ${PORT}`));

