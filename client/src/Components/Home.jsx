import React from "react";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes}  from "../Actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import {filterByDiet, orderByAlphabet, orderByScore} from '../Actions'
import SearchBar from "./SearchBar";
import Nav from "./Nav";
import './Estilos/Home.css'

/* Ruta principal:
 [ ] Input de búsqueda para encontrar recetas por nombre
 [ ] Área donde se verá el listado de recetas. Deberá mostrar su:
 Imagen
 Nombre
 Tipo de dieta (vegetariano, vegano, apto celíaco, etc)
 [ ] Botones/Opciones para filtrar por por tipo de dieta
 [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente las recetas por orden alfabético y por puntuación
 [ ] Paginado para ir buscando y mostrando las siguientes recetas, 9 recetas por pagina, mostrando las primeros 9 en la primer pagina.*/
export default function Home() {
  const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
   
    const [actualPage, setActualPage] = useState(1); /*Me guardo en que pagina estoy */
    const [recipesPerPage] = useState(9); /* Me guardo cuantas recetas quiero por página.*/
    const indexOfLastRecipe = actualPage * recipesPerPage; /* multiplico la pagina actual por la cantidad de recetas que permito por pagina (9) */
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;/*resto el orden de la ultima receta por la cantidad de recetas por pagina */
    const currentRecipes = allRecipes.slice(
      indexOfFirstRecipe,
      indexOfLastRecipe
    );
    const [order, setOrder] = useState("");
  
    const paginado = (numPage) => {
      setActualPage(numPage);              /* seteo la pagina en el numero dado */
    };

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);
 
  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }
  function handleDietFilter(e) {
    e.preventDefault();
    setActualPage(1)
    dispatch(filterByDiet(e.target.value));
    console.log(e.target.value)
  }

  function handleOrderByAlphabet(e) {
    e.preventDefault();
    dispatch(orderByAlphabet(e.target.value));
    setActualPage(1);
    setOrder(`ordered by ${e.target.value}`);
    console.log(order)
  }

  function handleOrderByScore(e) {
    e.preventDefault();
    dispatch(orderByScore(e.target.value));
    setActualPage(1);
    setOrder(`ordered by ${e.target.value}`);
    console.log(order)
  }
  console.log(currentRecipes)
  return (
    <div>
      <Nav/>
      <div className="title-container">
      <h1 className="inicio">Your Recipes</h1>
      </div>
      <button className="button" onClick={(e) => { handleClick(e);}}>Load Recipes</button>
      <div className="filters">
        {/* order by Alphabet */}
        <select defaultValue='Order Alphabetically!' className="select" onChange={(e) => handleOrderByAlphabet(e)} >
          <option disabled className="option top-option">Order Alphabetically!</option>
          <option  value="asc">From A to Z</option>
          <option className="option bottom-option" value="des">From Z to A</option>
        </select>
         {/* filter by Diet Type */}
         <select defaultValue='Choose By Diet!' className="select" onChange={(e) => handleDietFilter(e)}>
          <option disabled className="option" >Choose By Diet!</option>
          <option className="option" value="All">All</option>
          <option className="option" value="gluten free">Gluten Free</option>
          <option className="option" value="ketogenic">Ketogenic</option>
          <option className="option" value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
          <option className="option" value="vegan">Vegan</option>
          <option className="option" value="pescatarian">Pescatarian</option>
          <option className="option" value="paleolithic">Paleolithic</option>
          <option className="option" value="primal">Primal</option>
          <option className="option" value="fodmap friendly">Fodmap Friendly</option>
          <option className="option" value="dairy free">Dairy Free</option>
          <option className="option" value="whole 30">Whole 30</option>
        </select>
         {/* order by Score */}
         <select defaultValue='Order By Score!'  className="select" onChange={(e) => handleOrderByScore(e)} >
          <option disabled className="option" >Order By Score!</option>
          <option className="option" value="high">Highest Score</option>
          <option className="option" value="low">Lowest Score</option>
        </select>
        <button className="button" onClick={(e) => handleClick(e)}>Reset Filters </button>
      <SearchBar className ="search-bar"/>  
      
      <Paginado
          recipesPerPage = {recipesPerPage}
          allRecipes = {allRecipes.length}
          paginado = {paginado}
        />
      </div>
          
        <div className="card-board">
      
        {currentRecipes.length >0?(currentRecipes.map((e) =>{  /*rendereo las cards */
         return (
           <div  key={e.id}>
             <Link to = {"/recipe/" + e.id}>
             <Card key={e} name={e.name} diet={e.diets} score={e.score} image={e.image}></Card>
             </Link>
           </div>
           
         )
       }))
       : <div>
         <h1>Recipe not found</h1>
          </div>
       }
        </div>
         <Paginado 
          recipesPerPage = {recipesPerPage}
          allRecipes = {allRecipes.length}
          paginado = {paginado}
        />
  
    </div>)
  }
