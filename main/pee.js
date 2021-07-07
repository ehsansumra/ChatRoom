
//express
//node
//http (not important)
//REST
//CRUD
import cookieParser from "cookie-parser"
import cors from "cors";
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

const PORT = process.env.PORT || 5000;
const router = express.Router();

// create a cookie
app.use(cookieParser()) // cookie parser middleware

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use(cors({
    credentials: true,
    origin: `http://localhost:${PORT}/` // client address
  }))

app.get("/", (req, res) => {
    console.log('mainpage')
    res.sendFile(__dirname + '/views/index.html')
    
    //return a 401 or 403 if user is not logged in
} )

app.get("/users/login", (req, res) => {
    console.log('userpage')
    res.sendFile(__dirname + '/views/users.html')
} )

app.get("/users/register", (req, res) => {
    console.log('registerpage')
    res.sendFile(__dirname + '/views/register.html')
})

app.listen(PORT, () => console.log(`Server Start, port ${PORT}`));

