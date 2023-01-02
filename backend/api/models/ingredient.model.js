module.exports = (sequelize, Sequelize) => {
    const Ingredient = sequelize.define("ingredient", {
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
  
    return Ingredient;
  };