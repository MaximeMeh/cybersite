// module.exports = (sequelize, Sequelize) => {
//     const User = sequelize.define("user", {
//       email: {
//         type: Sequelize.STRING
//       },
//       password: {
//         type: Sequelize.STRING
//       },
//       username: {
//         type: Sequelize.STRING
//       },
//       firstName: {
//         type: Sequelize.STRING
//       },
//       lastName: {
//         type: Sequelize.STRING
//       },
//       role: {
//         type: Sequelize.STRING
//       }
//     });
  
//     return User;
//   };


const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        email: { type: DataTypes.STRING, allowNull: false },
        passwordHash: { type: DataTypes.STRING, allowNull: false },
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.STRING, allowNull: false }
    };

    const options = {
        defaultScope: {
            // exclude password hash by default
            attributes: { exclude: ['passwordHash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('User', attributes, options);
}