const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv/config');

const mysql = require('mysql');

const app = express();

app.use(cors(
    // {
    //     origin: 'http://localhost:8080'
    // }
));
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'rest'
})

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to mysql');
    } else {
        console.log('DB Connected');
    }
})

app.post('/signup', (req, res) => {
    const { first_name, last_name, email, password, city, state } = req.body;
    const sql = 'INSERT INTO users (first_name, last_name, email, password, city, state) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [first_name, last_name, email, password, city, state];
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error creating table: ' + err.stack);
            res.status(500).json(err);
            return;
        }
        console.log('Table created successfully!', result);
        res.status(200).json({ message: 'Registered successfully' });
    })
})

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    const values = [email, password]
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error login: ' + err.stack);
            res.status(500).json(err);
        }
        if (result.length > 0) {
            const em = process.env.ADMIN;
            if (result[0].email === em) {
                console.log('Admin Login successfully', result);
                res.status(200).json({ message: 'Admin Login successfully', admin: true, result });
            } else {
                console.log('Login successfully', result);
                res.status(200).json({ message: 'Login successfully', user: true, result });
            }
        } else {
            res.status(200).json({ message: 'No Match found' });
        }
    })
})

app.get('/user', (req, res) => {
    const sql = 'SELECT * FROM users';
    connection.query(sql, (err, result) => {
        if (err) {
            console.error('Error login: ' + err.stack);
            res.status(500).json(err);
        }
        if (result.length > 0) {
            console.log(result);
            res.status(200).json({ message: 'Welcome', user: result });
        }
    })
})

app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM users WHERE id = ?';
    connection.query(sql, id, (err, result) => {
        if (err) {
            console.error('Error login: ' + err.stack);
            res.status(500).json(err);
        }
        if (result.length > 0) {
            console.log(result);
            res.status(200).json({ message: 'Welcome', user: result });
        }
    })
})

app.patch('/user/:id', (req, res) => {
    const id = req.params.id;
    const { first_name, last_name, city, state } = req.body;
    const sql = 'UPDATE users SET first_name = ?, last_name = ?, city = ?, state = ? WHERE id = ?';
    const values = [first_name, last_name, city, state, id];
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error login: ' + err.stack);
            res.status(500).json(err);
        }
        console.log(result);
        res.status(200).json({ message: 'Updated', user: result });
    })
})

app.get('/', (req, res) => {
    res.send('Welcome MySQL Server');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT);