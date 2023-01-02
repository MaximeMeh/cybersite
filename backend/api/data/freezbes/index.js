'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getFreezbes = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('freezbes');
        const list = await pool.request().query(sqlQueries.freezbeslist);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getFreezbes
}