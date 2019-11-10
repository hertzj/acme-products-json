const createSql = `
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS departments CASCADE;
DROP TABLE IF EXISTS offices CASCADE;

CREATE TABLE IF NOT EXISTS departments (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE IF NOT EXISTS offices (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    lon FLOAT NOT NULL,
    lat FLOAT NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    department_id int,
    office_id int,
    FOREIGN KEY (department_id) REFERENCES
        departments(id) ON DELETE CASCADE,
    FOREIGN KEY (office_id) REFERENCES
        offices(id) ON DELETE CASCADE
);
`
const insertSql = `
INSERT INTO departments (name) VALUES ('HR');
INSERT INTO departments (name) VALUES ('Sales');
INSERT INTO departments (name) VALUES ('Marketing');
INSERT INTO departments (name) VALUES ('IT');
INSERT INTO offices (name, lon, lat) VALUES ('first office', 48.8584, 2.2945);
INSERT INTO offices (name, lon, lat) VALUES ('second office', 48.8584, -2.2945);
INSERT INTO offices (name, lon, lat) VALUES ('third office', -48.8584, 2.2945);
INSERT INTO users (name, department_id, office_id) VALUES ('John', 1, 1);
INSERT INTO users (name, department_id, office_id) VALUES ('Jim', 2, 3);
INSERT INTO users (name, department_id, office_id) VALUES ('James', 3, 2);
INSERT INTO users (name, department_id, office_id) VALUES ('Mark', 1, 1);
`;

module.exports = {
    createSql,
    insertSql
}