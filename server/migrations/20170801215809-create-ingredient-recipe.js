'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('IngredientRecipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      recipe_id: {
        type: Sequelize.INTEGER,
        unique: 'composite_unique',
        references: {
          model: 'Recipes',
          key: 'id',
          as: 'recipe_id'
        }
      },
      ingredient_id: {
        type: Sequelize.INTEGER,
        unique: 'composite_unique',
        references: {
          model: 'Ingredients',
          key: 'id'
        }
      },
      unit_id: {
        type: Sequelize.INTEGER
      },
      portion: {
        type: Sequelize.INTEGER
      },
      ingredient_type_id: {
        type: Sequelize.INTEGER
      },
      modifier_id: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('IngredientRecipes');
  }
};
