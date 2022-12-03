const { Router } = require('express');
const router = Router();
const { Op } = require('sequelize');
const { Recipe, Diet } = require('../db');
const { setOrder, filters } = require('../services/recipes');

router.get('/', async (req,res) => {
    let { name, dietFilter, order, created } = req.query;
    try {
        if (created !== 'default' && created === true) {
            const createdInDb = await Recipe.findAll({
                where: {
                    createdInDb: true,
                } });
                if (!createdInDb.length) {
                    return res.send({ msg: "No has creado ninguna receta aun" });
                }
                return res.send(createdInDb);
        }

        if (name && name !== '') {
            const receta = await Recipe.findAll({
                where: {
                    name: name
                },
                include: {
                    model: Diet,
                    attributes: ['name'],
                    through: { attributes: [], }
                }
            })
            if (receta?.length) return res.status(200).send(receta);
            else return res.status(404).send(`La receta "${name}" no existe.`);
        }

        if (dietFilter !== 'default' && dietFilter) {
            const filteredRecipe = await filters(dietFilter, order !== 'default' && order ? order : null);
            return res.send(filteredRecipe);
        }
        var allRecipes = await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ['name'],
                through: { attributes: [], }
            }
        })

        if (order !== 'default && order') {
            allRecipes = setOrder(allRecipes, order);
        }
        res.send(allRecipes);
    } catch (err) {
        console.log(err.message);
        res.send({ msg:err.message });
    }
})

router.post('/create', async (req, res) => {
    const {
        name, description, score, recipe, image
    } = req.body;
    if (!name || !description || !score || !recipe) {
        return res.status(400).json({ info: `Falta ingresar un dato` });
    }
    let arrDiet = [];
    req.body.diets.map(e => arrDiet.push({ name: e}));
    if (!arrDiet.length) {
        return res.status(400).json({ info: `Debes ingresar al menos una dieta` });
    }
    const exist = await Recipe.findOne({ where: { name: req.body.name } });
    if (exist) return res.status(500).send('Something broke!');
    try {
        const newRecipe = await Recipe.create({
            name: req.body.name,
            description: req.body.description,
            score: req.body.score,
            recipe: req.body.recipe,
            createdInDb: true,
            image: image ? image : "https://media0.giphy.com/media/9rKP9GqzIpGkjxFPKL/giphy.mp4"
        });
        for (let i = 0; i < arrDiet.length; i++) {
            let dietDb = await Diet.findAll({ where: { name: arrDiet[i].name } })
        }
        res.status(201).send({ msg: "Receta creada exitosamente" });
    } catch (err) {
        console.log(err);
    }
})

router.get('/:id', async (req,res) => {
    try {
        let { id } = req.params;
        if (typeof id === "string") {
            // console.log("ENTRE AL IF DE STRING");
            var encontrado = await Recipe.findOne({
                where: { idApiSpook: parseInt(id) },
                include: {
                    model: Diet,
                    attributes: ['name'],
                    through: { attributes: [], }
                }
            });
        // } else if (id.length > 23) {
        //     console.log("ENTRE AL IF DE LENGTH > 1");
        //     var encontrado = await Recipe.findOne({
        //         where: { id: id },
        //         include: {
        //             model: Diet,
        //             attributes: ['name'],
        //             through: { attributes: [], }
        //         }
        //     });
        } 
        if (encontrado === null) {
            // console.log("ENTRE AL IF DE NO HAY ID");
            return res.status(400).json({ info: `No existe receta con el id `, encontrado});
        }
        res.send(encontrado);
    } catch (err) {
        console.log(err.message);
        res.send({ msg: err.msg })
    }
})

router.get('/dietas', async (req, res) => {
    try {
        const diets = await Diet.findAll();
        res.status(200).send(diets);    
    } catch (err) {
        console.log(err.message);
    }
})

module.exports = router;