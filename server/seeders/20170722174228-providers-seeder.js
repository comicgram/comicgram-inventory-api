module.exports = {
  up: (queryInterface, Sequelize) => {
    let date = new Date();

    return queryInterface.bulkInsert('Providers', [
      {
        provider: 'Kaneli',
        createdAt: date,
        updatedAt: date
      },
      {
        provider: 'Etrusca',
        createdAt: date,
        updatedAt: date
      },
      {
        provider: 'Boato',
        createdAt: date,
        updatedAt: date
      },
      {
        provider: 'APYS',
        createdAt: date,
        updatedAt: date
      },
      {
        provider: 'Costco',
        createdAt: date,
        updatedAt: date
      },
      {
        provider: 'City Club',
        createdAt: date,
        updatedAt: date
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Providers', null, {});
  }
};
