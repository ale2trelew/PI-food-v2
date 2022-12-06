import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchDetails } from "../../redux/actions";
import './styles.css';

export default function Details(props) {
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(fetchDetails(id));
    }, [dispatch, id]);

    const recipe = useSelector((state) => state.details);

    return (
        <div>
            <div className="detail-container">
                <div className="tittle-image-pos">
                    <div className="detail-tittle">
                        
                        {/* Quizas deberia ir el detalle? */}
                    </div>
                    <br />
                    <div>
                        <img className="detail-image" src={recipe.image} alt={`${recipe.name}`} />
                    </div>
                </div>
                <div className="detail-data">
                    <h1>{recipe.name}</h1>
                    <p><h3>Health score: {recipe.score}</h3></p>
                    <h3>Dietas:</h3>
                    <div className="diets">
                        {recipe.diets?.map(r => (<li className="">{r.name} </li>))}
                    </div>
                    {/* <div className="detail-diets">
                        
                    </div> */}
                    <p>Descripcion: {recipe.description}</p>
                    <p>Receta: {recipe.recipe}</p>
                </div>
            </div>
            <div className="button-container">
                <Link to={`/recetas`} className="volver">
                        <button className="button-back">Volver</button>
                </Link>
            </div>
        </div>
    )
}