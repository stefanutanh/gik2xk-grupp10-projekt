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

console.log('Loaded models with details:', Object.keys(db).map(key => 
  `${key}: ${typeof db[key]}`
));

/* db.product.belongsTo(db.user, { foreignKey: { allowNull: false } });
db.user.hasMany(db.product, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

db.comment.belongsTo(db.product, { foreignKey: { allowNull: false } });
db.product.hasMany(db.comment, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

db.comment.belongsTo(db.user, { foreignKey: { allowNull: false } });
db.user.hasMany(db.comment, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' }); */

/* db.product.belongsToMany(db.tag, { through: db.productTag });
db.tag.belongsToMany(db.product, { through: db.productTag }); */


db.product.belongsTo(db.user, { foreignKey: { allowNull: false } });
db.user.hasMany(db.product, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.comment.belongsTo(db.product, { foreignKey: { allowNull: false } });
db.product.hasMany(db.comment, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.comment.belongsTo(db.user, { foreignKey: { allowNull: false } });
db.user.hasMany(db.comment, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.product.belongsToMany(db.tag, { through: db.productTag });
db.tag.belongsToMany(db.product, { through: db.productTag });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
