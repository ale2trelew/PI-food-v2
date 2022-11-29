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
            }),
            image: result.image,
            diets: result.diets.map(each => ({ name: each })),
        }
    })
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