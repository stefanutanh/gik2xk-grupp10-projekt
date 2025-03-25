// cartRoutes.js
const router = require("express").Router();
const cartService = require('../services/cartService'); 

// Lägg till produkt i varukorgen
router.post('/addProduct', async (req, res) => {
  const { userId, productId, amount } = req.body;
  
  try {
    const result = await cartService.addToCart(userId, productId, amount);
    res.status(result.status).json(result.data);
  } catch (error) {
    console.error('Fel vid tillägg av produkt till varukorg:', error);
    res.status(500).json({ message: 'Kunde inte lägga till produkten i varukorgen' });
  }
});

module.exports = router;