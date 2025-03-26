const express = require('express');
const cartService = require('../services/cartService');
const {
  createResponseSuccess,
  createResponseError,
  createResponseMessage
} = require('../helpers/responseHelper');

const router = express.Router();


// POST /cart/addProduct - Lägg till produkt i varukorg
router.post('/addProduct', async (req, res) => {
  try {
    const { userId, productId, amount } = req.body;
    
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

// PUT /cart/updateProduct - Uppdatera produktantal i varukorg
router.put('/updateProduct', async (req, res) => {
  try {
    const { cartRowId, amount } = req.body;
    
    if (!cartRowId || !amount) {
      return res.status(400).json(createResponseError('cartRowId and amount are required'));
    }
    
    const updatedItem = await cartService.updateCartItem(cartRowId, parseInt(amount));
    res.json(createResponseSuccess(updatedItem));
  } catch (error) {
    console.error('Error handling PUT /cart/updateProduct:', error);
    res.status(500).json(createResponseError(error.message));
  }
});

// DELETE /cart/removeProduct - Ta bort produkt från varukorg
router.delete('/removeProduct', async (req, res) => {
  try {
    const { cartRowId } = req.body;
    
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

// DELETE /cart - Töm hela varukorgen
router.delete('/', async (req, res) => {
  try {
    const { cartId } = req.body;
    
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

// Kompletterande route för att hämta användarens varukorg
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const cartItems = await cartService.getUserCart(userId);
    res.json(createResponseSuccess(cartItems));
  } catch (error) {
    console.error('Error handling GET /cart/user/:userId:', error);
    res.status(500).json(createResponseError(error.message));
  }
});

router.get('/', async (req, res) => {
  try {
    // Om ett userId finns i query params, hämta bara deras varukorg
    const userId = req.query.userId;
    
    let carts;
    if (userId) {
      carts = await cartService.getUserCart(userId);
    } else {
      // Annars hämta alla varukorgar (för admins)
      carts = await cartService.getAllCarts();
    }
    
    res.json(createResponseSuccess(carts));
  } catch (error) {
    console.error('Error handling GET /cart:', error);
    res.status(500).json(createResponseError(error.message));
  }
});


module.exports = router;