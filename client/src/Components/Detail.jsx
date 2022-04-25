import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesDetail } from "../Actions";
import { useEffect } from "react";
import { useParams } from "react-router";
import Nav from "./Nav";
import './Estilos/Home.css'
import { vaciarDetail } from "../Actions";


export default function RecipesDetails(){
    const dispatch= useDispatch();
    const recipeDetail= useSelector((state) => state.recipeDetail)
    
    const { id } = useParams();

    useEffect(()=>{
        console.log("Details Received");
        dispatch(getRecipesDetail(id));
        return function (){
          dispatch(vaciarDetail())
        }
    },[dispatch,id]);
    console.log(recipeDetail)

    let diet = []
    
    if(recipeDetail.diets?.name ){recipeDetail.diets.map(e=> diet.push(e.name))}else {diet = recipeDetail.diets} 
  console.log(diet)
  
  const predeterminada= 'https://images.unsplash.com/photo-1635321593217-40050ad13c74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1748&q=80'
return (
    <div>
    <Nav/>
      <div>
        <h1 className="inicio">Recipe Detail</h1>
      </div>
      <div className="detail-board">
        <h3 className="summary-text">{recipeDetail.name}</h3>
        <div>
          <img className='img-detail' src={recipeDetail.image ? 
                recipeDetail.image : predeterminada} width="700px" height="400px" alt="Pic not found"/>

          <div><h1 className="summary-text">Summary:</h1><p dangerouslySetInnerHTML={{__html: recipeDetail.summary}}></p></div>
        </div>
        <h3 className="summary-text">Diets:</h3>
        <div>
          {diet?.map((e, index) => {
            return (
             <div key={index}> {e.name?<h5>
              {e.name}</h5>
            
              :<p key={e}>
                {e}
              </p>
          }</div>  );
          })}
        </div>
        <h4 className="summary-text">Dish Score: {recipeDetail.score}</h4>
        <h4 className="summary-text">Health Score: {recipeDetail.healthyScore}</h4>
        <h4 className="summary-text">Steps:{recipeDetail.stepByStep}</h4>
              
        
      </div>
    </div>
  );
}