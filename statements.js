const uuid = require('uuid');

const generateIDs = (...names) => {
    return names.reduce((acc, name) => {
        acc[name] = uuid.v4();
        return acc;
    }, {})
}

const ids = generateIDs('hr_dept', 'sales_dept', 'marketing_dept', 'it_dept', 'john', 'jim', 'james', 'mark', 'first_office', 'second_office', 'third_office');

const createSql = `
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS departments CASCADE;
DROP TABLE IF EXISTS offices CASCADE;

CREATE TABLE IF NOT EXISTS departments (
    id UUID PRIMARY KEY,
    name TEXT
);

CREATE TABLE IF NOT EXISTS offices (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    lon FLOAT NOT NULL,
    lat FLOAT NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    department_id UUID,
    office_id UUID,
    FOREIGN KEY (department_id) REFERENCES
        departments(id) ON DELETE CASCADE,
    FOREIGN KEY (office_id) REFERENCES
        offices(id) ON DELETE CASCADE
);
`
const insertSql = `
INSERT INTO departments (id, name) VALUES ('${ids.hr_dept}', 'HR');
INSERT INTO departments (id, name) VALUES ('${ids.sales_dept}', 'Sales');
INSERT INTO departments (id, name) VALUES ('${ids.marketing_dept}', 'Marketing');
INSERT INTO departments (id, name) VALUES ('${ids.it_dept}', 'IT');
INSERT INTO offices (id, name, lon, lat) VALUES ('${ids.first_office}', 'first office', 48.8584, 2.2945);
INSERT INTO offices (id, name, lon, lat) VALUES ('${ids.second_office}', 'second office', 48.8584, -2.2945);
INSERT INTO offices (id, name, lon, lat) VALUES ('${ids.third_office}', 'third office', -48.8584, 2.2945);
INSERT INTO users (id, name, department_id, office_id) VALUES ('${ids.john}', 'John', '${ids.hr_dept}', '${ids.first_office}');
INSERT INTO users (id, name, department_id, office_id) VALUES ('${ids.jim}', 'Jim', '${ids.sales_dept}', '${ids.third_office}');
INSERT INTO users (id, name, department_id, office_id) VALUES ('${ids.james}', 'James', '${ids.marketing_dept}', '${ids.second_office}');
INSERT INTO users (id, name, department_id, office_id) VALUES ('${ids.mark}', 'Mark', '${ids.hr_dept}', '${ids.first_office}');
`;

module.exports = {
    createSql,
    insertSql
}