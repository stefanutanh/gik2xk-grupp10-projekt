module.exports = (sequelize, DataTypes) => {
    return sequelize.define('cartRow', {
      cartId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      amount: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      }
    });
  };