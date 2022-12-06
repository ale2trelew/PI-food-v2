import axios from "axios";

export function fetchRecipes() {
    return async function (dispatch) {
        try {
            const fetchedRecipes = await axios(`http://localhost:3001/recetas`);
            // console.log("AQUI ESTA FETCHEDRECIPES... ", fetchedRecipes.data);
            return dispatch({
                type: "GET_RECIPES",
                payload: fetchedRecipes.data
            });
        } catch (err) {
            console.log({ msg: err.message });
        }
    }
}

export function fetchDiets() {
    return async function (dispatch) {
        try {
            const fetchedDiets = await axios(`http://localhost:3001/dietas`);
            return dispatch({
                type: "GET_DIETS",
                payload: fetchedDiets.data
            });
        } catch (err) {
            console.log({ msg: err.message });
        }
    }
}

export function filterRecipesByDiet(payload) {
    console.log(payload);
    return {
        type: "FILTER_BY_DIET",
        payload
    }
}

export function findByName(name) {
    return async function (dispatch) {
        try {
            const recipeName = await axios(`http://localhost:3001/recetas?name=${name}`);
            return dispatch({
                type: "FIND_BY_NAME",
                payload: recipeName.data
            });
        } catch (err) {
            console.log({ msg: err.message });
        }
    }
}

export function postRecipe(payload) {
    return async function (dispatch) {
        const response = await axios.post(`http://localhost:3001/recetas/create`, payload);
        return dispatch({
            type: "CREATE_RECIPE",
            response
        });
    }
}

export function fetchDetails(id) {
    return async function (dispatch) {
        const details = await axios(`http://localhost:3001/recetas/${id}`);
        return dispatch({
            type: "GET_DETAILS",
            payload: details.data
        });
    }
}

export function filterByCreated(payload) {
    return {
        type: "FILTER_BY_CREATED",
        payload
    }
}

export function filterRecipes(payload) {
    return async function (dispatch) {
        const filters = await axios.get(`http://localhost:3001/recetas?typeFilter=${payload.typeFilter}&order=${payload.order}`);
        return dispatch({
            type: "FILTERS",
            payload: filters.data
        });
    }
}