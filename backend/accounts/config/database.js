const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize('mysql://root:password@mysql:3306/db')
module.exports = sequelize;