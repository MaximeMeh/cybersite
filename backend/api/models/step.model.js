module.exports = (sequelize, Sequelize) => {
    const Step = sequelize.define("step", {
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.STRING
      }
    });
  
    return Step;
  };