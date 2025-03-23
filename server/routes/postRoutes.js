const router = require("express").Router();
const { where } = require("sequelize");
const db = require('../models');

const postService = require('../services/postService');


router.get('/', (req, res) => {
    postService.getAll().then((result) => {
        res.status(result.status).json(result.data);
    });
});

router.post('/', (req, res) => {
    const post = req.body;
    postService.create(post).then((result) => {
        res.status(result.status).json(result.data);
    });
});

router.put('/', (req, res) => {
    const post = req.body;
    const id = post.id;
    
    postService.update(post, id).then((result) => {
        res.status(result.status).json(result.data);
    });
});

router.delete('/', (req, res) => {
    const id = req.body.id;
    postService.destroy(id).then((result) => {
        res.status(result.status).json(result.data);
    });
    
});

router.post('/:id/addToCart', (req, res) => {});

module.exports = router;