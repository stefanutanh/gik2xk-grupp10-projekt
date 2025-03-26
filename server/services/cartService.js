const db = require('../models');
const {
	createResponseSuccess,
	createResponseError,
	createResponseMessage,
} = require('../helpers/responseHelper');

// Hjälpfunktion för att hitta eller skapa en varukorg för en användare
async function getOrCreateCart(userId) {
  const [cart, created] = await db.cart.findOrCreate({
    where: {
      userId: userId,
      completed: false
    },
    defaults: {
      userId: userId,
      completed: false
    }
  });
  
  return cart;
}

// Hämta varukorgen med alla produkter för en specifik användare
async function getUserCart(userId) {
  try {
    console.log(`Fetching cart for user ID: ${userId}`);
    
    // Hitta användarens aktiva varukorg
    const cart = await db.cart.findOne({
      where: {
        userId: userId,
        completed: false
      }
    });

    if (!cart) {
      console.log(`No active cart found for user ${userId}`);
      return [];
    }

    console.log(`Found cart ID: ${cart.id} for user ${userId}`);

    // Hämta alla rader i varukorgen med produktinformation
    const cartRows = await db.cartRow.findAll({
      where: {
        cartId: cart.id
      },
      include: [
        {
          model: db.product,
          as: 'product'
        }
      ]
    });

    console.log(`Found ${cartRows.length} items in cart for user ${userId}`);
    
    return cartRows;
  } catch (error) {
    console.error(`Error in getUserCart for user ${userId}:`, error);
    throw error;
  }
}

// Lägg till eller uppdatera en produkt i varukorgen
async function addToCart(userId, productId, amount) {
  try {
    console.log(`Adding product ${productId} to cart for user ${userId}, amount: ${amount}`);
    
    // Hitta eller skapa en aktiv varukorg för användaren
    const [cart, created] = await db.cart.findOrCreate({
      where: {
        userId: userId,
        completed: false
      },
      defaults: {
        userId: userId,
        completed: false
      }
    });
    
    console.log(`${created ? 'Created new' : 'Found existing'} cart with ID: ${cart.id}`);

    // Kolla om produkten redan finns i varukorgen
    const existingCartRow = await db.cartRow.findOne({
      where: {
        cartId: cart.id,
        productId: productId
      }
    });

    let cartRow;
    
    if (existingCartRow) {
      // Uppdatera befintlig rad
      existingCartRow.amount += parseInt(amount);
      cartRow = await existingCartRow.save();
      console.log(`Updated existing cart row, new amount: ${cartRow.amount}`);
    } else {
      // Skapa ny rad
      cartRow = await db.cartRow.create({
        cartId: cart.id,
        productId: productId,
        amount: parseInt(amount)
      });
      console.log(`Created new cart row with ID: ${cartRow.id}`);
    }

    // Hämta den uppdaterade raden med produktinformation
    const result = await db.cartRow.findByPk(cartRow.id, {
      include: [{
        model: db.product,
        as: 'product'
      }]
    });

    return result;
  } catch (error) {
    console.error('Error in addToCart:', error);
    throw error;
  }
}
// Uppdatera antal för en produkt i varukorgen
async function updateCartItem(cartRowId, amount) {
  try {
    const cartRow = await cartRow.findByPk(cartRowId);
    
    if (!cartRow) {
      throw new Error('cartRow not found');
    }

    cartRow.amount = amount;
    await cartRow.save();

    return cartRow;
  } catch (error) {
    console.error('Error in updatecartItem:', error);
    throw error;
  }
}

// Ta bort en produkt från varukorgen
async function removeFromCart(cartRowId) {
  try {
    const cartRow = await cartRow.findByPk(cartRowId);
    
    if (!cartRow) {
      throw new Error('cartRow not found');
    }

    await cartRow.destroy();
    
    return { success: true, message: 'Item removed from cart' };
  } catch (error) {
    console.error('Error in removeFromcart:', error);
    throw error;
  }
}

// Töm en hel varukorg
async function clearCart(cartId) {
  try {
    // Ta bort alla rader som tillhör varukorgen
    await cartRow.destroy({
      where: {
        cartId: cartId
      }
    });

    return { success: true, message: 'cart cleared successfully' };
  } catch (error) {
    console.error('Error in clearcart:', error);
    throw error;
  }
}

// Markera varukorgen som köpt/genomförd
async function completeCart(cartId) {
  try {
    const cart = await cart.findByPk(cartId);
    
    if (!cart) {
      throw new Error('cart not found');
    }

    cart.completed = true;
    await cart.save();

    return cart;
  } catch (error) {
    console.error('Error in completecart:', error);
    throw error;
  }
}
async function getAllCarts() {
  try {
    // Först kolla om det finns några varukorgar
    const cartsCount = await db.cart.count();
    console.log(`Number of carts found: ${cartsCount}`);
    
    const carts = await db.cart.findAll({
      include: [
        {
          model: db.cartRow,
          as: 'cartRows',
          include: [
            {
              model: db.product,
              as: 'product'
            }
          ]
        }
      ]
    });
    
    console.log(`Retrieved ${carts.length} carts with details:`, 
                JSON.stringify(carts, null, 2));
    
    return carts;
  } catch (error) {
    console.error('Error in getAllCarts:', error);
    throw error;
  }
}


// Exportera alla funktioner
module.exports = {
  getAllCarts,
  getOrCreateCart,
  getUserCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  completeCart
};