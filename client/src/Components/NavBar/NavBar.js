import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./styles.css";
// import image from "../../resources/icon-recetas.png";
import {RecipeCreate} from "../Form/Form";

export const NavBar = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className={style.NavBar}>
            <nav className={style.header}>
                        <a className="btn" href={null} onClick={() => setOpen(!open)} onBlur={() => {
                            setTimeout(() => setOpen(!open), 200)
                        }}>
                            Crear una receta
                        </a>
                        {open && <RecipeCreate />}
            </nav>
        </div>
    );
};