import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function Card({ id, name, score, image, diets }) {
    return (
        <div className="card">
            <div className="tittle">
                <p>{name}</p>
                <p>Health score: {score}</p>
            </div>
            <h3>Dietas:</h3>
                <div className="">
                    {diets?.map(r => (<li className="">{r.name} </li>))}
                </div>
            <div className="imgContainer">
                <Link to={`/recetas/${id}`}>
                    <img src={image} alt={`${name}`} className="image" />
                </Link>
            </div>
        </div>
    );
}
