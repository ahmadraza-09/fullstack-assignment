const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL database connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'helpcenter-api'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the MySQL database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// Route setup
app.use('/card', require('./routes/CardRoute'));
app.use('/request', require('./routes/RequestRoute'));

// Welcome route
app.get('/', (req, res) => {
    res.send('Welcome to the Help Center API!');
});

// Start the server
const port = 3060;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
