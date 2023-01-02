const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        freezbeName: { type: DataTypes.STRING, allowNull: false },
        freezbeDescription: { type: DataTypes.STRING, allowNull: false },
        puht: { type: DataTypes.FLOAT, allowNull: false },
        freezbeRange: { type: DataTypes.STRING, allowNull: false }
    };

    const options = {
        defaultScope: {
            // exclude password hash by default
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('Freezbe', attributes, options);
}