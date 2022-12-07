import React from "react";
import { fetchRecipes, filterRecipes, filterRecipesByDiet } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import "./styles.css"
import SearchBar from "../SearchBar/SearchBar";

export default function Filters({ createdFilter, dietsFilter }) {
    const allDiets = useSelector((state) => state.diets);
    const [diet, setDiet] = useState('default');
    const [order, setOrder] = useState('default');
    const dispatch = useDispatch();
    // esto puede ser typeFilter, cambiar si no funciona
    const [filter, setFilter] = useState({
        dietFilter: "default",
        order: 'default'
    });

    function handleClick(e) {
        e.preventDefault(); //por si renderiza lento
        setFilter({
            dietFilter: 'default',
            order: 'default'
        });
        dispatch(fetchRecipes());
    }

    function handleDiets(e) {
        e.preventDefault();
        console.log("MIRA LO QUE TENGO EN ORDER ", order);
        dispatch(filterRecipesByDiet(e.target.value));
        // setCurrentPage(1)
        // console.log(e.target.value, 'HANDLE DIETS');
    }

    function handleFilters(event) {
        event.preventDefault(); //POR SI RENDERIZA LENTO
        switch (event.target?.value) {
            case 'nameUp':
                // console.log("ESTO TIENE diet ", diet);
                if (diet !== "default") {
                    setFilter({
                        dietFilter: diet.target.value,
                        order: 'nameUp'
                    })
                    break;
                }
                setFilter({
                    dietFilter: diet,
                    order: 'nameUp'
                })
                // console.log("ESTO TIENE El allDiets ", allDiets);
                break;
            ;
            case 'nameDown':
                if (diet !== "default") {
                    setFilter({
                        dietFilter: diet.target.value,
                        order: 'nameDown'
                    })
                    break;
                }
                setFilter({
                    dietFilter: diet,
                    order: 'nameDown'
                })
                break;
            ;
            case 'scoreUp':
                if (diet !== "default") {
                    setFilter({
                        dietFilter: diet.target.value,
                        order: 'scoreUp'
                    })
                    break;
                }
                setFilter({
                    dietFilter: diet,
                    order: 'scoreUp'
                })
                break;
            ;
            case 'scoreDown':
                if (diet !== "default") {
                    setFilter({
                        dietFilter: diet.target.value,
                        order: 'scoreDown'
                    })
                    break;
                }
                setFilter({
                    dietFilter: diet,
                    order: 'scoreDown'
                })
                break;
            ;
            default: {
                setFilter({
                    dietFilter: diet.target.value,
                    typeFilter: event.target.value
                })
                break;
            }
        }
    }

    useEffect(() => {
        if (Object.values(filter).find(e => e !== "default")) {
            // console.log("ESTO TIENE FILTER ", filter);
            dispatch(filterRecipes(filter));
        }
    }, [filter])

    return (
        <div className="filters">
            <div className="diet-container"> {/*Aca era type-container*/}
                <div className="order-container">
                    <select className="selector" onChange={e => { 
                        setDiet(e)
                        handleDiets(e) 
                        }}
                    >
                        <option value="Cualquiera" hidden={true}>Dietas: </option>
                        <option value='todas'>Todas</option>
                        <option value='gluten free'>Gluten free</option>
                        <option value='dairy free'>Dairy free</option>
                        <option value='lacto ovo vegetarian'>Lacto ovo vegetarian</option>
                        <option value='vegan'>Vegan</option>
                        <option value='whole 30'>Whole 30</option>
                        <option value='fodmap friendly'>Fodmap friendly</option>
                        <option value='vegetarian'>Vegetarian</option>
                        <option value='pescatarian'>Pescatarian</option>
                        <option value='ketogenic'>Ketogenic</option>
                    </select>
                </div>
            </div>
            <div className="order-container">
                <div className="selector">
                    <select onChange={(e) => {
                            console.log("ESTO HAY EN DIET ", diet);
                            handleFilters(e)}
                        } 
                    name="Order">
                        <option value="Cualquiera" hidden={true}>Ordenados por</option>
                        <option value="nameUp">A-Z</option>
                        <option value="nameDown">Z-A</option>
                        <option value="scoreUp">Health score mas alto</option>
                        <option value="scoreDown">Health score mas bajo</option>
                    </select>
                </div>
                {/* <div className="selector">
                    <select onChange={(e) => { createdFilter(e) }} name="Createds">
                        <option value="Cualquiera" hidden={true}>Ordenados por</option>
                        <option value="All">API</option>
                        <option value="Created">Creados</option>
                    </select>
                </div> */}
                <div className="reload-container">
                    <button className="realodButton" onClick={(e) => {handleClick(e)}}>
                        Limpiar filtros
                    </button>
                </div>
                <SearchBar />
            </div>
        </div>
    )
}