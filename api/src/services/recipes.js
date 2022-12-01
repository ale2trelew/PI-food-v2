const { Recipe, Diet } = require('../db');
const { API_KEY } = process.env;
const axios = require('axios');


const getAllRecipes = async () => {
    //esta variable toma las primeras 100 recetas traidas con el endpoint con su informacion extendida
    const recipesApi = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    
    const recipeData = recipesApi.data?.results.map(result => {
        return {
            id: result.id,
            name: result.title,
            description: result.summary,
            score: result.healthScore,
            recipe: result.analyzedInstructions[0]?.steps.map(each => {
                return each.step
            }).join(' --- '),
            image: result.image,
            diets: result.diets.map(each => ({ name: each })),
        }
    })
    // console.log("CARGUE LAS RECETAS DE LA API BIEN");
    return recipeData;
}

const fillDietsDB = async function () {
    let dietsDb = [];
    let diets = ["gluten free", "dairy free", "lacto ovo vegetarian", "vegan", "whole 30", "fodmap friendly", "vegetarian", "pescatarian", "ketogenic"];
    try {
        dietsDb = await Diet.findAll({ where: { createdInDb: true} });
        const cantDietsDb = await Diet.count();
        if(dietsDb.length === cantDietsDb) {
            for (let i = 0; i < diets.length; i++) {
                Diet.findOrCreate({
                    where: { name: diets[i] }
                });
            };
        };
        console.log("Dietas cargadas.. ", await Diet.count());
    } catch (err) {
        console.log(err.message);
    }
}

const createFromApi = async function () {
    try {
        const recipesInDb = await Recipe.findAll({ where: { createdInDb: true } });

        const count = await Recipe.count();

        if (recipesInDb.length === count) {
            const apiRecipes = await getAllRecipes();
            for (let i = 0; i < apiRecipes.length; i++) {
                let newRecipe = await Recipe.create({
                    idApiSpook: apiRecipes[i].id,
                    name: apiRecipes[i].name,
                    description: apiRecipes[i].description,
                    score: apiRecipes[i].score,
                    recipe: apiRecipes[i].recipe,
                    image: apiRecipes[i].image,
                });
                if (apiRecipes[i].diets.length > 0) {
                    let dietDb = await Diet.findAll({ where: { name: apiRecipes[i].diets[0].name }});
                    newRecipe.addDiet(dietDb);
                    for (let j = 1; j < apiRecipes[i].diets.length; j++) {
                        let dietDb2 = await Diet.findAll({ where: {
                            name: apiRecipes[i].diets[j].name
                        } });
                        newRecipe.addDiet(dietDb2);
                    }
                }
            }
        }
        console.log("Recetas cargadas... ", await Recipe.count());
    } catch (err) {
        console.log(err.message);
    }
}

const loadDb = async function () {
    await fillDietsDB();
    await createFromApi();
}

const filters = async (dietFilter, orderBy) => {
    try {
        console.log(dietFilter.toUpperCase());
        var filterDiet = await Recipe.findAll({
            include: {
                model: Diet,
                where: { "name": dietFilter },
                attributes: ["name"]
            },
        });
        if (filterDiet.length) {
            if (orderBy) {
                console.log(setOrder(filterDiet, orderBy));
                return setOrder(filterDiet, orderBy);
            };
            return filterDiet;
        }
    } catch (err) {
        console.log(err.message);
        throw new Error({ msg: err.message })
    }
}

const setOrder = (recipe, by) => {
    switch (by) {
        case "nameUp": {
            return recipe.sort((a, b) => a.name.localeCompare(b.name));
        };
        case "nameDown": {
            return recipe.sort((a, b) => b.name.localeCompare(a.name));
        };
        case "scoreUp": {
            return recipe.sort((a, b) => b.score - a.score);
        };
        case "scoreDown": {
            return recipe.sort((a, b) => a.score - b.score);
        };
        default: return recipe;
    }
}

module.exports = { loadDb, setOrder, filters };