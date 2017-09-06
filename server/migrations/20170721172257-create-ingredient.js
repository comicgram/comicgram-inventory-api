module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Ingredients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ingredient: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      provider_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Providers',
          key: 'id',
          as: 'provider_id'
        }
      },
      unit_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Units',
          key: 'id',
          as: 'unit_id'
        }
      },
      current_stock: {
        type: Sequelize.INTEGER
      },
      desired_stock: {
        type: Sequelize.INTEGER
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Ingredients');
  }
};
