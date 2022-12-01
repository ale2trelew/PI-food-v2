const { Router } = require('express');
const router = Router();
const { Diet } = require('../db');

router.get('/', async (req, res) => {
    try {
        const diets = await Diet.findAll();
        res.send(diets);
    } catch (err) {
        console.log(err.message);
        res.send({ msg: err.message });
    }
})

module.exports = router;