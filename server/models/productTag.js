// productTag.js (tidigare postTag.js)
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'productTag',  // ändrat från 'postTag'
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      productId: {  // ändrat från postId
        type: DataTypes.INTEGER,
        allowNull: false
      },
      tagId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    { underscored: true }
  );
};