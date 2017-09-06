'use strict';
module.exports = (sequelize, DataTypes) => {
  let IngredientRecipe = sequelize.define('IngredientRecipe', {
    recipe_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: 'composite_unique',
      references: {
        model: 'Recipe',
        key: 'id',
        as: 'recipe'
      }
    },
    ingredient_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: 'composite_unique',
      references: {
        model: 'Ingredient',
        key: 'id',
        as: 'ingredient'
      }
    },
    unit_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    portion: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    ingredient_type_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    modifier_id: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  });

  IngredientRecipe.associate = (models) => {
    IngredientRecipe.hasMany(models.Recipe, {
      foreignKey: 'id',
      as: 'recipes'
    });

    IngredientRecipe.hasMany(models.Ingredient, {
      foreignKey: 'id',
      as: 'ingredients'
    });
  }

  return IngredientRecipe;
};
