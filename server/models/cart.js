module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        payed: { type: DataTypes.BOOLEAN, defaultValue: false },  }, 
    { timestamps: true, underscored: true });


    return Cart;
};