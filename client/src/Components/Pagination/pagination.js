import React from "react";
import "./styles.css";

export const Pagination = ({ recipesPerPage, totalRecipes, paginate }) => {
    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
        pageNumber.push(i);
    }
    return (
        <nav className="Nav">
            <div>
                {pageNumber && pageNumber.map((number) => (
                    <button onClick={() => paginate(number)} href="!#" className="button" key={number}>
                        {number}
                    </button>
                ))}
            </div>
        </nav>
    );
};

export default Pagination;