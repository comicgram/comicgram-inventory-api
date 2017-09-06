module.exports = (sequelize, DataTypes) => {
  const Unit = sequelize.define('Unit', {
    unit: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    symbol: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  });

  Unit.associate = (models) => {
    Unit
      .hasMany(models.Ingredient, {
        foreignKey: 'unit_id'
      });
  }

  return Unit;
};
