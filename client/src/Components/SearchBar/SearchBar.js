import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findByName } from "../../redux/actions";
import './styles.css';

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(findByName(name));
        setName("");
    }

    return (
        <div className="">
            <input className="" type="search" placeholder="Buscar receta..." value={name} onChange={(e) => handleInputChange(e)}></input>
            <button className="" type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
}