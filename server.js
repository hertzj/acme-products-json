const express = require('express')
const path = require('path');
const db = require("./db");
// we will call db here

const app = express();
const PORT = 8000;

const {
    insertSql,
    createSql
} = require('./statements.js')

// const {
//     sync,
//     findAllDepartments,
//     findAllUsers
// } = require('./db.js')

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, './index.html'))
});

app.get('/api/users', async (req, res, next) => {
    try {
        res.send(await db.findAllUsers())
    }
    catch(ex) {
        next(ex)
    }
});

app.get('/api/departments', async (req, res, next) => {
    try {
        res.send(await db.findAllDepartments())
    }
    catch(ex) {
        next(ex)
    }
});

app.get('/api/offices', async (req, res, next) => {
    try {
        res.send(await db.findAllOffices())
    }
    catch(ex) {
        next(ex)
    }
})

db.sync().then(() => app.listen(PORT));