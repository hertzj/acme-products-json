const fs = require('fs');
const pg = require('pg');
const { Client } = pg;
const client = new Client('postgress://localhost/acme_users_depts_db');

client.connect();

const {
    insertSql,
    createSql
} = require('./statements.js')

const sync = async () => {
    await client.query(createSql);
    await client.query(insertSql);
    console.log('success');
};

const findAllUsers = async () => {
    const response = await client.query('SELECT * from users')
    return response.rows;
}

const findAllDepartments = async () => {
    const response = await client.query('SELECT * from departments')
    return response.rows;
}

const findAllOffices = async() => {
    const response = await client.query('SELECT * from offices');
    return response.rows;
}

module.exports = {
    sync,
    findAllDepartments,
    findAllUsers,
    findAllOffices
}