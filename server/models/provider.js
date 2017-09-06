module.exports = (sequelize, DataTypes) => {
  var Provider = sequelize.define('Provider', {
    provider: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  });

  Provider.associate = (models) => {
    Provider
      .hasMany(models.Ingredient, {
        foreignKey: 'provider_id'
      });
  }

  return Provider;
};
