module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comment', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    productId: {  // Se till att detta finns
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.product, { foreignKey: 'productId', as: 'product' });
    Comment.belongsTo(models.user, { foreignKey: 'userId', as: 'user' });
  };

  return Comment;
};
