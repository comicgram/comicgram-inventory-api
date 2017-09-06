module.exports = {
  up: (queryInterface, Sequelize) => {
    let date = new Date();

    return queryInterface.bulkInsert('Units', [
      {
        unit: 'gramo',
        symbol: 'gr',
        createdAt: date,
        updatedAt: date
      },
      {
        unit: 'kilogramo',
        symbol: 'kg',
        createdAt: date,
        updatedAt: date
      },
      {
        unit: 'mililitro',
        symbol: 'ml',
        createdAt: date,
        updatedAt: date
      },
      {
        unit: 'litro',
        symbol: 'l',
        createdAt: date,
        updatedAt: date
      },
      {
        unit: 'onza',
        symbol: 'oz',
        createdAt: date,
        updatedAt: date
      },
      {
        unit: 'pieza',
        symbol: 'pz',
        createdAt: date,
        updatedAt: date
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Units', null, {});
  }
};
