const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'helpcenter-api'
});

exports.requestlist = (req, res) => {
    const query = 'SELECT * FROM `request-data`'; 
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving cards:', err);
            res.status(500).send('Server error');
            return;
        }
        res.send(results);
    });
};

exports.singlerequestlist = (req, res) => {
    const query = 'SELECT * FROM `request-data` WHERE id = ?'; 
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving request:', err);
            res.status(500).send('Server error');
            return;
        }
        res.send(results);
    });
};

exports.createRequest = (req, res) => {
    const { name, email, subject, query_description } = req.body;

    if (!name || !email || !subject || !query_description) {
        return res.status(400).send('Fill all required fields');
    }

    const query = 'INSERT INTO `request-data` (name, email, subject, query_description) VALUES (?, ?, ?, ?)';

    db.query(query, [name, email, subject, query_description], (err, results) => {
        if (err) {
            console.error('Error creating request:', err);
            return res.status(500).send('Server error');
        }
        res.status(201).send({ message: 'Request sent successfully', requestId: results.insertId });
    });
};
