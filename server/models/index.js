'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

console.log('Loaded models:', Object.keys(db));





db.product.belongsTo(db.user, { foreignKey: { allowNull: false } });
db.user.hasMany(db.product, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });



// Associationer för varukorg
db.cart.hasMany(db.cartRow, { foreignKey: 'cartId', as: 'cartRows' });
db.cartRow.belongsTo(db.cart, { foreignKey: 'cartId' });

db.product.hasMany(db.cartRow, { foreignKey: 'productId' });
db.cartRow.belongsTo(db.product, { foreignKey: 'productId', as: 'product' });

db.user.hasMany(db.cart, { foreignKey: 'userId' });
db.cart.belongsTo(db.user, { foreignKey: 'userId' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
