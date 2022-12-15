const {Sequelize} = require('sequelize');
const db = require('../config/database');

const { DataTypes } = Sequelize;

const Account = db.define('account', {
    firstname: {
        type: DataTypes.STRING
    },

    lastname: {
        type: DataTypes.STRING
    },

    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },

    role: {
        type: DataTypes.STRING
    },
    refreshToken:{
        type: DataTypes.TEXT
    }
});
(async () => {
    await db.sync({});
})();

module.exports = Account;