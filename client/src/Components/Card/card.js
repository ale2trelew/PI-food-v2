import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function Card({ id, name, score, image, diets }) {
    return (
        <div className="card">
            <div className="tittle">
                <p>{name}</p>
                <p className="score">Puntuacion de salud: {score}</p>
            </div>
            <div className="diets">
                <h3>Dietas:</h3>
                    <div className="list">
                        <p>
                            {diets?.map(r => (<li className="">{r.name} </li>))}
                        </p>
                    </div>
            </div>
            <div className="imgContainer">
                <Link to={`/recetas/${id}`}>
                    <img src={image} alt={`${name}`} className="image" />
                </Link>
            </div>
        </div>
    );
}
