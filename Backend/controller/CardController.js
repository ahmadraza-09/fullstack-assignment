const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'helpcenter-api'
});

exports.cardslist = (req, res) => {
    const query = 'SELECT * FROM `card-data`'; 
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving cards:', err);
            res.status(500).send('Server error');
            return;
        }
        res.send(results);
    });
};

exports.singlecardslist = (req, res) => {
    const query = 'SELECT * FROM `card-data` WHERE id = ?'; 
    
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            console.error('Error retrieving card:', err);
            res.status(500).send('Server error');
            return;
        }
        res.send(results);
    });
};


exports.createCard = (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).send('Title and Description are required');
    }

    const query = 'INSERT INTO `card-data` (title, description) VALUES (?, ?)';

    db.query(query, [title, description], (err, results) => {
        if (err) {
            console.error('Error creating card:', err);
            return res.status(500).send('Server error');
        }
        res.status(201).send({ message: 'Card created successfully', cardId: results.insertId });
    });
};


