import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postRecipe, fetchDiets } from "../../redux/actions";
import "./styles.css";

function validate(newrecipe) {
    let whitespacesParameter =  /(?!^\s+$)^.*$/m;
    let alphabeticalPattern = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;
  
  
    let errors = {};
    if (!whitespacesParameter.test(newrecipe.name) || !alphabeticalPattern.test(newrecipe.name)){
      errors.name= "El nombre ingresado no puede contener caracteres especiales ni números"
    }
    if (!newrecipe.name) {
      errors.name = "Requiere un nombre";
    }
    if (!newrecipe.description) {
      errors.description = "Requiere una descripcion";
    }
    // if (newrecipe.score.toString().includes('e')){
    if (!/^[0-100]+$/.test(newrecipe.score)){
      errors.score = "El puntaje de salud no puede contener letras"
    }
    if (newrecipe.score > 100 || newrecipe.score < 0) {
      errors.score = "El puntaje de salud debe ser entre 0 y 100";
    }
    if (!newrecipe.score) {
      errors.score = "Requiere puntaje de salud";
    }
    if (newrecipe.recipe.length === 0) {
      errors.recipe = "Requiere al menos un paso para la preparacion";
    }
    if (newrecipe.diets.length === 0) {
      errors.diets = "Requiere al menos una dieta";
    }
    if(newrecipe.image.length !== 0 && !/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(newrecipe.image)){
      errors.image='invalid URL'
    }
    return errors;
  }
  
  export const RecipeCreate = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    React.useEffect(() => {
      dispatch(fetchDiets());
    }, [dispatch]);
  
    const { diets } = useSelector((state) => state);
    const [newrecipe, setRecipe] = useState({
      name: "",
      description: "",
      image: "",
      score: 0,
      step: "",
      number: 1,
      recipe: [],
      diets: [],
    });
    const [error, setError] = useState({ "": "" });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(postRecipe(newrecipe));
      alert("Receta creada");
      history.push("/recetas");
    };
  
    const handleChange = (e) => {
      setRecipe({
        ...newrecipe,
        [e.target.name]: e.target.value,
      });
      setError(
        validate({
          ...newrecipe,
          [e.target.name]: e.target.value,
        })
      );
    };
  
    const handleClickAdd = (e) => {
      if (newrecipe.recipe.length<8) {
        setRecipe({
          ...newrecipe,
          recipe: [
            ...newrecipe.recipe,
            {
              number: newrecipe.number,
              step: newrecipe.step,
            },
          ],
          number: newrecipe.number + 1,
          step: ''
        });
        setError(
          validate({
            ...newrecipe,
            recipe: [
              ...newrecipe.recipe,
              {
                number: newrecipe.number,
                step: newrecipe.step,
              },
            ],
            number: newrecipe.number + 1,
          })
        );
      }else{
        alert('Cantidad de pasos para la receta alcanzado')
      }
    };
  
    const handleCheck = (e) => {
      if (e.target.checked && !newrecipe.diets.includes(e.target.value)) {
        setRecipe({
          ...newrecipe,
          diets: [...newrecipe.diets, e.target.value],
        });
        setError(
          validate({
            ...newrecipe,
            diets: [...newrecipe.diets, e.target.value],
          })
        );
      } else {
        let filtered = newrecipe.diets.filter((d) => d !== e.target.value);
        setRecipe({
          ...newrecipe,
          diets: filtered,
        });
        setError(
          validate({
            ...newrecipe,
            diets: filtered,
          })
        );
      }
    };
  
    return (
      <div className="recipecreate">
        <div className="createcontainer">
          <form className="form" onSubmit={handleSubmit}>
            <div className="formin">
              <label>
                Nombre:{" "}
                <input
                  type="text"
                  name="name"
                  autoComplete="off"
                  value={newrecipe.name}
                  onChange={handleChange}
                />
              </label>
              <label>
                Imagen:{" "}
                <input 
                className="inputcreate"
                type="text"
                placeholder="Example http://..."
                value={newrecipe.image}
                name="image"
                onChange={(e) => handleChange(e)}
                />
              </label>
              <label>
                Descripcion:{" "}
                <textarea
                  name="description"
                  autoComplete="off"
                  value={newrecipe.description}
                  onChange={handleChange}
                />
              </label>
              <label>
                Puntaje de salud:{" "}
                <input
                  type="number"
                  name="score"
                  autoComplete="off"
                  value={newrecipe.score}
                  onChange={handleChange}
                />
              </label>
              <div className="stepinput">
                  <label>
                  Receta:{" "}
                  </label>
                  <div  className='tarea'>
                      <textarea
                          name="step"
                          autoComplete="off"
                          value={newrecipe.step}
                          onChange={handleChange}
                      />
                  </div>
                  <div className="btn2holder">
                      <button type="button" className="btn2" onClick={handleClickAdd}>
                          Agregar
                      </button>
                  </div>
              </div>
              <div className="dietcheckcont">
                  <label>Dietas:</label>
                  <div className="checks">
                      {diets.map((e) => {
                          return (
                          <div key={e.id} className="ccl">
                              <label className="containerc">
                                  <input type="checkbox" value={e.name} onChange={handleCheck}/>
                                  <div class="checkmark" ></div>
                              </label>
                              <label>{e.name}</label>
                          </div>
                          );
                      })}
                  </div>
              </div>
            </div>
          </form>
  
          <div className="preview">
            <div>
              {error.name? <label className="errordisp">--{error.name}--</label> : <h3>{newrecipe.name}</h3>}
            </div>
            <div>
              {error.image? <label className="errordisp">--{error.image}--</label> : <p>{newrecipe.image}</p>}
            </div>
            <div>
              {error.description? <label className="errordisp">--{error.description}--</label> : <p>{newrecipe.description}</p>}
            </div>
            <div>
              { error.score? <label className="errordisp">--{error.score}--</label> : <h5>Puntaje de salud: {newrecipe.score}</h5>}
            </div>
            <div>
              {error.recipe? <label className="errordisp">--{error.recipe}--</label> : newrecipe.recipe?.map((s) => (
                <div key={s.number}>
                  <label>step {s.number}:</label>
                  <p key={s.number}>{s.step}</p>
                </div>
              ))}
            </div>
            <div>
              {error.diets? <label className="errordisp">--{error.diets}--</label> :newrecipe.diets+''}
            </div>
            <div className="submitbtn">
              <button type="button" disabled={Object.values(error).length} onClick={handleSubmit}>
                Cargar receta
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };