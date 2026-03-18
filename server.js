const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname));

// Parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// SQLite database
const db = new sqlite3.Database('./database.db', (err)=>{
    if(err) console.error(err.message);
    else console.log("Connected to SQLite DB");
});

// Create users table
db.run(`CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullname TEXT,
    phone TEXT UNIQUE,
    password TEXT
)`);

// Register
app.post('/register',(req,res)=>{
    const { fullname, phone, password, confirm } = req.body;
    if(password !== confirm) return res.send("Passwords do not match");
    db.run(`INSERT INTO users(fullname,phone,password) VALUES(?,?,?)`,[fullname,phone,password],function(err){
        if(err) return res.send("Phone number already registered");
        res.redirect('/game.html');
    });
});

// Login
app.post('/login',(req,res)=>{
    const { phone, password } = req.body;
    db.get(`SELECT * FROM users WHERE phone=? AND password=?`,[phone,password],(err,row)=>{
        if(err) return res.send("Error during login");
        if(row) res.redirect('/game.html');
        else res.send("Invalid phone or password");
    });
});

app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`);
});