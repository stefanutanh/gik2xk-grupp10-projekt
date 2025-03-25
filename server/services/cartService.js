// cartService.js
const db = require('../models');
const { createResponseSuccess, createResponseError } = require('../helpers/responseHelper');

async function addToCart(userId, productId, amount) {
  try {
    // Hitta eller skapa en varukorg för användaren
    let cart = await db.cart.findOne({ 
      where: { userId, completed: false } 
    });

    if (!cart) {
      cart = await db.cart.create({ 
        userId, 
        completed: false 
      });
    }

    // Lägg till produkten i varukorgen
    const cartRow = await db.cartRow.create({
      cartId: cart.id,
      productId,
      amount
    });

    return createResponseSuccess(cartRow);
  } catch (error) {
    return createResponseError(500, error.message);
  }
}

module.exports = {
  addToCart
};