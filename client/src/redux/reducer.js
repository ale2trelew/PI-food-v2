const initialState = {
    recipes: [],
    allRecipes: [],
    order: [],
    diets: [],
    details: []
}

function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case "GET_RECIPES":
            return {
                ...state,
                recipes: payload,
                allRecipes: payload
            }
        ;
        case "GET_DIETS":
            return {
                ...state,
                diets: payload
            }
        ;
        case 'FILTER_BY_DIET':
            const allRec = state.allRecipes;
            const dietFiltered = payload === "todas" ? allRec : allRec.filter(pt => pt.diets.map(pt => pt.name).includes(payload))
            console.log(dietFiltered, "soy el filter_by_diet");
            return {
                ...state,
                recipes: dietFiltered
        };
        case "FILTER_BY_CREATED": {
            const allRec = state.allRecipes;
            const filterByCreated = 
                payload === "Created" ? 
                    allRec.filter(recipes => recipes.createdInDb): 
                    allRec.filter(recipes => !recipes.createdInDb); 
            return {
                ...state,
                recipes: filterByCreated
            }
        };
        case "FILTERS":
            return {
                ...state,
                recipes: payload
            }
        ;
        case "ORDER":
            return {
                ...state,
                recipes: payload
            }
        ;
        case "GET_DETAILS":
            return {
                ...state,
                details: payload
            }
        ;
        case "FIND_BY_NAME":
            return {
                ...state,
                recipes: payload
            }
        ;
        case "CREATE_RECIPE":
            return {
                ...state
            }
        ;
        default:
            return state;
    }
}

export default reducer;