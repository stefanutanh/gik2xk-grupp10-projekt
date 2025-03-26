const express = require('express');
const cartService = require('../services/cartService');
const {
  createResponseSuccess,
  createResponseError,
  createResponseMessage
} = require('../helpers/responseHelper');

const router = express.Router();

// GET /cart - Get all carts or user's cart if userId is provided
router.get('/', async (req, res) => {
  try {
    // If a userId exists in query params, get only their cart
    const userId = req.query.userId;
    
    let result;
    if (userId) {
      result = await cartService.getUserCart(userId);
    } else {
      // Otherwise get all carts (for admins)
      result = await cartService.getAllCarts();
    }
    
    res.json(createResponseSuccess(result));
  } catch (error) {
    console.error('Error handling GET /cart:', error);
    res.status(500).json(createResponseError(error.message));
  }
});

// GET /cart/user/:userId - Get cart for specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(`Getting cart for user: ${userId}`);
    const result = await cartService.getUserCart(userId);
    res.json(createResponseSuccess(result));
  } catch (error) {
    console.error('Error handling GET /cart/user/:userId:', error);
    res.status(500).json(createResponseError(error.message));
  }
});

// POST /cart/addProduct - Add product to cart
router.post('/addProduct', async (req, res) => {
  try {
    const { userId, productId, amount } = req.body;
    console.log(`Adding product: userId=${userId}, productId=${productId}, amount=${amount}`);
    
    if (!userId || !productId || !amount) {
      return res.status(400).json(createResponseError('userId, productId, and amount are required'));
    }
    
    const cartItem = await cartService.addToCart(userId, productId, parseInt(amount));
    res.json(createResponseSuccess(cartItem));
  } catch (error) {
    console.error('Error handling POST /cart/addProduct:', error);
    res.status(500).json(createResponseError(error.message));
  }
});

// PUT /cart/updateProduct - Update product quantity in cart
router.put('/updateProduct', async (req, res) => {
  try {
    const { cartRowId, amount } = req.body;
    console.log(`Updating product: cartRowId=${cartRowId}, amount=${amount}`);
    
    if (!cartRowId || amount === undefined) {
      return res.status(400).json(createResponseError('cartRowId and amount are required'));
    }
    
    const updatedItem = await cartService.updateCartItem(cartRowId, parseInt(amount));
    res.json(createResponseSuccess(updatedItem));
  } catch (error) {
    console.error('Error handling PUT /cart/updateProduct:', error);
    res.status(500).json(createResponseError(error.message));
  }
});

// DELETE /cart/removeProduct - Remove product from cart
router.delete('/removeProduct', async (req, res) => {
  try {
    const { cartRowId } = req.body;
    console.log(`Removing product: cartRowId=${cartRowId}`);
    
    if (!cartRowId) {
      return res.status(400).json(createResponseError('cartRowId is required'));
    }
    
    const result = await cartService.removeFromCart(cartRowId);
    res.json(createResponseSuccess(result));
  } catch (error) {
    console.error('Error handling DELETE /cart/removeProduct:', error);
    res.status(500).json(createResponseError(error.message));
  }
});

// DELETE /cart - Clear entire cart
router.delete('/', async (req, res) => {
  try {
    const { cartId } = req.body;
    console.log(`Clearing cart: ${cartId}`);
    
    if (!cartId) {
      return res.status(400).json(createResponseError('cartId is required'));
    }
    
    const result = await cartService.clearCart(cartId);
    res.json(createResponseSuccess(result));
  } catch (error) {
    console.error('Error handling DELETE /cart:', error);
    res.status(500).json(createResponseError(error.message));
  }
});

// New routes for convenience functions

// POST /cart/reduceAmount - Decrease product quantity by 1
router.post('/reduceAmount', async (req, res) => {
  try {
    const { userId, productId } = req.body;
    
    if (!userId || !productId) {
      return res.status(400).json(createResponseError('userId and productId are required'));
    }
    
    // Find the cart
    const cart = await cartService.getOrCreateCart(userId);
    
    // Find the cart row
    const cartRow = await db.cartRow.findOne({
      where: {
        cartId: cart.id,
        productId: productId
      }
    });
    
    if (!cartRow) {
      return res.status(404).json(createResponseError('Product not found in cart'));
    }
    
    // Decrease amount or remove if amount becomes 0
    if (cartRow.amount <= 1) {
      await cartService.removeFromCart(cartRow.id);
      return res.json(createResponseSuccess({ removed: true }));
    } else {
      cartRow.amount -= 1;
      await cartRow.save();
      return res.json(createResponseSuccess(cartRow));
    }
  } catch (error) {
    console.error('Error handling POST /cart/reduceAmount:', error);
    res.status(500).json(createResponseError(error.message));
  }
});

// POST /cart/increaseAmount - Increase product quantity by 1
router.post('/increaseAmount', async (req, res) => {
  try {
    const { userId, productId } = req.body;
    
    if (!userId || !productId) {
      return res.status(400).json(createResponseError('userId and productId are required'));
    }
    
    // Find the cart
    const cart = await cartService.getOrCreateCart(userId);
    
    // Find the cart row
    const cartRow = await db.cartRow.findOne({
      where: {
        cartId: cart.id,
        productId: productId
      }
    });
    
    if (!cartRow) {
      // If not in cart, add it with amount 1
      return res.json(createResponseSuccess(
        await cartService.addToCart(userId, productId, 1)
      ));
    } else {
      // Otherwise increase amount
      cartRow.amount += 1;
      await cartRow.save();
      return res.json(createResponseSuccess(cartRow));
    }
  } catch (error) {
    console.error('Error handling POST /cart/increaseAmount:', error);
    res.status(500).json(createResponseError(error.message));
  }
});

module.exports = router;