import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
// import img from "../../Resources/Background-image.png";

export default function LandingPage() {
    return (
        // <div className="center">
        //    <img src={img} alt="Landing Page" className="imagen" />
        // </div>
        <div className="landingPage">
            <h1>Bienvenidos</h1>
            <Link to="/recetas">
                <button className="btn_ing">Ingresar</button>
            </Link>
        </div>
    );
}