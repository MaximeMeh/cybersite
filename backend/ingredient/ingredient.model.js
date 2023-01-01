const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        ingredientName: { type: DataTypes.STRING, allowNull: false },
        ingredientDescription: { type: DataTypes.STRING, allowNull: false },
        grammage: { type: DataTypes.FLOAT, allowNull: false },
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

    return sequelize.define('Ingredient', attributes, options);
}