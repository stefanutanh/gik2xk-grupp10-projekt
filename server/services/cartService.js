/* const db = require('../models');
const validate = require('validate.js');    

const {
    createResponseSuccess,
    createResponseError,
    createResponseMessage
  } = require('../helpers/responseHelper'); */

import db from '../models/index.js';
  
import {
  createResponseSuccess,
  createResponseError,
  createResponseMessage
} from '../helpers/responseHelper.js';


// Hämta varukorgen med alla produkter för en specifik användare
export async function getUserCart(userId) {
  try {
    // Hitta användarens aktiva varukorg
    const cart = await CartModel.findOne({
      where: {
        userId: userId,
        completed: false
      }
    });

    if (!cart) {
      return [];
    }

    // Hämta alla rader i varukorgen med produktinformation
    const cartRows = await CartRowModel.findAll({
      where: {
        cartId: cart.id
      },
      include: [
        {
          model: ProductModel,
          as: 'product'
        }
      ]
    });

    return cartRows;
  } catch (error) {
    console.error('Error in getUserCart:', error);
    throw error;
  }
}

/* // Hämta alla varukorgar (admin-funktion)
export async function getAll() {
  try {
    const carts = await CartModel.findAll({
      include: [
        {
          model: CartRowModel,
          as: 'cartRows',
          include: [
            {
              model: ProductModel,
              as: 'product'
            }
          ]
        }
      ]
    });

    return carts;
  } catch (error) {
    console.error('Error in getAll carts:', error);
    throw error;
  }
}
 */
// Lägg till eller uppdatera en produkt i varukorgen
export async function addToCart(userId, productId, amount) {
  try {
    // Hitta eller skapa varukorg
    const cart = await getOrCreateCart(userId);

    // Kontrollera om produkten redan finns i varukorgen
    const [cartRow, created] = await CartRowModel.findOrCreate({
      where: {
        cartId: cart.id,
        productId: productId
      },
      defaults: {
        cartId: cart.id,
        productId: productId,
        amount: amount
      }
    });

    // Om raden redan fanns, uppdatera antalet
    if (!created) {
      cartRow.amount += amount;
      await cartRow.save();
    }

    return cartRow;
  } catch (error) {
    console.error('Error in addToCart:', error);
    throw error;
  }
}

// Uppdatera antal för en produkt i varukorgen
export async function updateCartItem(cartRowId, amount) {
  try {
    const cartRow = await CartRowModel.findByPk(cartRowId);
    
    if (!cartRow) {
      throw new Error('CartRow not found');
    }

    cartRow.amount = amount;
    await cartRow.save();

    return cartRow;
  } catch (error) {
    console.error('Error in updateCartItem:', error);
    throw error;
  }
}

// Ta bort en produkt från varukorgen
export async function removeFromCart(cartRowId) {
  try {
    const cartRow = await CartRowModel.findByPk(cartRowId);
    
    if (!cartRow) {
      throw new Error('CartRow not found');
    }

    await cartRow.destroy();
    
    return { success: true, message: 'Item removed from cart' };
  } catch (error) {
    console.error('Error in removeFromCart:', error);
    throw error;
  }
}

// Töm en hel varukorg
export async function clearCart(cartId) {
  try {
    // Ta bort alla rader som tillhör varukorgen
    await CartRowModel.destroy({
      where: {
        cartId: cartId
      }
    });

    return { success: true, message: 'Cart cleared successfully' };
  } catch (error) {
    console.error('Error in clearCart:', error);
    throw error;
  }
}

// Markera varukorgen som köpt/genomförd
export async function completeCart(cartId) {
  try {
    const cart = await CartModel.findByPk(cartId);
    
    if (!cart) {
      throw new Error('Cart not found');
    }

    cart.completed = true;
    await cart.save();

    return cart;
  } catch (error) {
    console.error('Error in completeCart:', error);
    throw error;
  }
}