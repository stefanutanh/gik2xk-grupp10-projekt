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

User.hasMany(Cart, { 
  foreignKey: { name: 'user_id', allowNull: false },
  onDelete: 'CASCADE'
});
Cart.belongsTo(User, { 
  foreignKey: { name: 'user_id', allowNull: false },
  onDelete: 'CASCADE'
});

// En Cart har många CartRows. Vid borttagning av en Cart raderas alla CartRows.
Cart.hasMany(CartRow, { 
  foreignKey: { name: 'cart_id', allowNull: false },
  onDelete: 'CASCADE'
});
CartRow.belongsTo(Cart, { 
  foreignKey: { name: 'cart_id', allowNull: false },
  onDelete: 'CASCADE'
});

// En Product kan ha många CartRows. Om en Product tas bort så tas även raderna bort.
Product.hasMany(CartRow, { 
  foreignKey: { name: 'product_id', allowNull: false },
  onDelete: 'CASCADE'
});
CartRow.belongsTo(Product, { 
  foreignKey: { name: 'product_id', allowNull: false },
  onDelete: 'CASCADE'
});

// En Product kan ha många Ratings. Vid borttagning av en produkt raderas också betygen.
Product.hasMany(Rating, { 
  foreignKey: { name: 'product_id', allowNull: false },
  onDelete: 'CASCADE'
});
Rating.belongsTo(Product, { 
  foreignKey: { name: 'product_id', allowNull: false },
  onDelete: 'CASCADE'
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
