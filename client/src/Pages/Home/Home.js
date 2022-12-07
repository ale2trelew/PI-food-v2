import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Pagination from "../../Components/Pagination/pagination";
import notFoundImg from "../../Resources/Simple_food_blog_404_image.png"
import { fetchRecipes, fetchDiets, filterByCreated, filterRecipesByDiet } from "../../redux/actions";
import Card from "../../Components/Card/card";
import "./styles.css";
import Filters from "../../Components/Filters/Filters";
import { NavBar } from '../../Components/NavBar/NavBar';

export default function Home() {
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(9);
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;

    useEffect(() => {
        dispatch(fetchRecipes());
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchDiets());
    }, [dispatch]);

    const currentRecipes = allRecipes?.slice(
        indexOfFirstRecipe,
        indexOfLastRecipe
    );

    function handleFilterCreatedInDb(e) {
        e.preventDefault();
        dispatch(filterByCreated(e.target.value))
    }

    function handleDiets(e) {
        e.preventDefault();
        dispatch(filterRecipesByDiet(e.target.value));
        setCurrentPage(1)
        console.log(e.target.value, 'HANDLE DIETS');
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="ContainerPrincipal">
            <NavBar />
            <Filters
                createdFilter={handleFilterCreatedInDb}
                // dietsFilter={handleDiets}
            />

            <div className="recipePosition">
                {/* {console.log("ESTAS SON LAS CURRENT RECIPES--------", currentRecipes)} */}
                {currentRecipes.length ? currentRecipes?.map((e, i) => {
                    
                    return (
                        <div key={i}>
                            <Card id={e.id} name={e.name} image={e.image} diets={e.diets} score={e.score} />
                        </div>
                    );
                }) :
                <div>
                    <img src={notFoundImg} alt="Not found" />
                </div>
                }
            </div>
            <div>
                <Pagination key={allRecipes.id} recipesPerPage={recipesPerPage} totalRecipes={allRecipes.length} paginate={paginate}/>
            </div>
        </div>
    );
}