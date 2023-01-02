const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Freezbe = sequelize.define("freezbe", {
      freezbeName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      freezbeDescription: {
        type: DataTypes.STRING,
        allowNull: false
      },
      puht: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      freezbeRange: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    return Freezbe;
  };