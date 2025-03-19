const router = require("express").Router();
const { where } = require("sequelize");
const db = require('../models');




router.get("/", (req, res) => {
    db.tag.findAll().then((result) => {
        res.send(result);
    });
});

router.post('/', (req, res) => {
    const tag = req.body;
    

        db.tag.create(tag).then(result => {
            res.send(result);
        });
        
});


router.delete('/', (req, res) => {
    db.tag
    .destroy({
        where: {id: req.body.id }
    })
    .then((result) => {
        res.json(`Inlägget raderades`);
    });
});

module.exports = router;