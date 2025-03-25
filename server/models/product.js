module.exports = (sequelize, DataTypes) => {
  return sequelize.define('product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: { len: [2, 100] }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING(255)
    },
    price: { // Lägg till detta attribut
      type: DataTypes.FLOAT,  // eller DECIMAL beroende på dina behov
      allowNull: true  // Om det är ett valfritt fält
    }
  }, { underscored: true });
};
