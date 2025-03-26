const router = require("express").Router();
const productsService = require('../services/productsService');

// Hämta alla produkter
router.get('/', (req, res) => {
    productsService.getAll().then((result) => {
        res.status(result.status).json(result.data);
    });
});

// Hämta  specifikt produkt med ID
router.get('/:id', (req, res) => {
  const id = req.params.id;

  productsService.getById(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});


// Skapa en ny produkt
router.post('/', async (req, res) => {
  try {
    const product = await productService.create(req.body);
    console.log("Created product:", product);
    res.json(createResponseSuccess(product)); 
  } catch (error) {
    res.status(500).json(createResponseError(error.message));
  }
});

// Uppdaterar produkt
router.put('/:id', (req, res) => {  
  console.log('Mottar PUT-förfrågan:', req.params.id);
  console.log('Produktdata:', req.body);
  const id = req.params.id;
  const product = req.body;
  productsService.update(product, id)
    .then((result) => {
      res.status(result.status).json(result.data);
    })
    .catch((err) => {
      console.error('Fel vid uppdatering:', err);
      res.status(500).json({ error: 'Ett fel inträffade vid uppdatering av produkten', details: err });
    });
});


// Ta bort en produkt
router.delete('/', (req, res) => {
    const id = req.body.id;
    productsService.destroy(id).then((result) => {
        res.status(result.status).json(result.data);
    });
});

module.exports = router;