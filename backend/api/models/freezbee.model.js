module.exports = (sequelize, Sequelize) => {
    const Freezbee = sequelize.define("freezbee", {
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      pUHT: {
        type: Sequelize.FLOAT
      }
    });
  
    return Freezbee;
  };