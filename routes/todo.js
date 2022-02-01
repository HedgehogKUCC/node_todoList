const express = require('express');
const mysql = require('mysql');
const config = require('config');

// build router
const router = express.Router();

// connect DB
const mysqlDB = mysql.createConnection({
    host: config.get("host"),
    user: config.get("user"),
    password: config.get("password"),
    database: config.get("database"),
});

mysqlDB.connect((err) => {
    console.log('MySQL connects successfully...');
});

// CRUD
router.get('/todo', (req, res, next) => {
    mysqlDB.query("SELECT * FROM todolist", (err, result) => {
        if (err) {
            res.status(500).json({ message: "Server Error" });
        } else {
            res.status(200).json({ message: "Success", data: result });
        }
    });
});

router.post('/todo', (req, res, next) => {
    mysqlDB.query("INSERT INTO todolist SET title = ?", [req.body.title], (err, result) => {
        if (err) {
            res.status(400).json({ message: "INSERT Error" });
        } else {
            res.status(201).json({ message: "INSERT Successfully" });
        }
    });
});

router.patch('/todo/:id', (req, res, next) => {
    mysqlDB.query("UPDATE todolist SET status = ? WHERE id = ?", [req.body.status, req.params.id], (err, result) => {
        if (err) {
            res.status(401).json({ message: "UPDATE Error" });
        } else {
            res.status(200).json({ message: "UPDATE Successfully" });
        }
    });
});

router.delete('/todo/:id', (req, res, next) => {
    mysqlDB.query("DELETE FROM todolist WHERE id = ?", [req.params.id], (err, result) => {
        if (err) {
            res.status(404).json({ message: "DELETE Error" });
        } else {
            res.status(200).json({ message: "DELETE Successfully" });
        }
    })
})

module.exports = router;
