import React from 'react';
import './Estilos/Card.css'
export default function Card({name,image, diet, score}){
   
    return (
        <div className='card-container' >
            <h3 className='name'>{name}</h3>
            <h3 className="card-score">☆{score}</h3> 
             <h5 className='diets-container' >{diet.map((d, index) =>(
             <div key={index}>{ d.name? d.name : d}</div>
                
            ))}</h5> 
            
            <img className='card-img' src={image} width="250" height="200px" alt= "not found" />
        </div>
        
    )
}