module.exports = (sequelize, DataTypes) => {
  const IngredientType = sequelize.define('IngredientType', {
    ingredient_type: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return IngredientType;
};
