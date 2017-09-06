module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('Order', {
    order_id: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    receipt_url: {
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
  return Order;
};
