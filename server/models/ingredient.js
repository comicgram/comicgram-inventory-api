module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('Ingredient', {
    ingredient: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    provider_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Provider',
        key: 'id',
        as: 'provider'
      }
    },
    unit_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Unit',
        key: 'id',
        as: 'unit'
      }
    },
    current_stock: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    desired_stock: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  });

  Ingredient.associate = (models) => {
    Ingredient
      .belongsTo(models.Provider, {
        foreignKey: 'provider_id', as: 'providers'
      });

    Ingredient
      .belongsTo(models.Unit, {
        foreignKey: 'unit_id', as: 'units'
      });

    Ingredient
      .belongsToMany(models.Recipe, {
        as: 'recipes',
        through: 'IngredientRecipes',
        foreignKey: 'ingredient_id'
      })
  }

  return Ingredient;
};
