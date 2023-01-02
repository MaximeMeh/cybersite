module.exports = (sequelize, Sequelize) => {
    const FabricMethod = sequelize.define("fabric-method", {
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      validationtest: {
        type: Sequelize.STRING
      }
    });
  
    return FabricMethod;
  };