'use strict';
const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const {PORT, HOST, HOST_URL, SQL_USER, SQL_PASSWORD, SQL_DATABASE, SQL_SERVER} = process.env;

const sqlEncrypt = process.env.ENCRYPT === "true";
const sqlCertificate = process.env.

assert(PORT, 'PORT is required');
assert(HOST, 'PORT is required');

module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    sql: {
        server: SQL_SERVER,
        database: SQL_DATABASE,
        user: SQL_USER,
        password: SQL_PASSWORD,
        option: {
            trustedConnection: true,
            encrypt: sqlEncrypt,
            enableArithAbort: true,
            trustServerCertificate: true,
        }
    }
}