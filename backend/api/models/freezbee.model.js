module.exports = (sequelize, Sequelize) => {
    const Freezbee = sequelize.define("freezbee", {
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      puht: {
        type: Sequelize.FLOAT
      },
      range: {
        type: Sequelize.STRING
      }
    });
  
    return Freezbee;
  };