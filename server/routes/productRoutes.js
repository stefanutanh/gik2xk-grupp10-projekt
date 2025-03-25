const router = require("express").Router();
const postService = require('../services/productsService');

// Hämta alla inlägg
router.get('/', (req, res) => {
    postService.getAll().then((result) => {
        res.status(result.status).json(result.data);
    });
});

// Hämta ett specifikt inlägg med ID
router.get('/:id', (req, res) => {
  const id = req.params.id;

  postService.getById(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

// Lägg till en kommentar till ett inlägg
router.post('/:id/addComment', (req, res) => {
  const comment = req.body;
  const id = req.params.id;

  postService.addComment(id, comment).then((result) => {
    res.status(result.status).json(result.data);
  });
});

// Skapa ett nytt inlägg
router.post('/', (req, res) => {
    const post = req.body;
    postService.create(post).then((result) => {
        res.status(result.status).json(result.data);
    });
});

// Uppdatera ett inlägg
router.put('/', (req, res) => {
    const post = req.body;
    const id = post.id;
    
    postService.update(post, id).then((result) => {
        res.status(result.status).json(result.data);
    });
});

// Ta bort ett inlägg
router.delete('/', (req, res) => {
    const id = req.body.id;
    postService.destroy(id).then((result) => {
        res.status(result.status).json(result.data);
    });
});

module.exports = router;