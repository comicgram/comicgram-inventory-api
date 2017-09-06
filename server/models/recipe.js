module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    recipe: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    category_name: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    variation_name: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  });

  Recipe.associate = (models) => {
    Recipe
      .belongsToMany(models.Ingredient, {
        as: 'ingredients',
        through: 'IngredientRecipes',
        foreignKey: 'recipe_id',
      })
  }

  return Recipe;
};
