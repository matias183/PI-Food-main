import React from "react";
/* */
export default function Paginado({recipesPerPage, allRecipes, paginado}){
    const numPage =[]
    
    for (let i = 1; i <= Math.ceil(allRecipes/recipesPerPage) ; i++) { /* consigo el numero redondo de la operacion*/
          numPage.push(i)  /*pusheo el numero conseguido*/
        }
        return(
            <nav>
                <ul className="paginado"> 
                    {numPage && numPage.map(number =>(
                        <li className="number" key={number}>
                        <button className="paginado" onClick={() => paginado(number)}>{number}</button>   
                        </li> 
                   ))}
                </ul>
            </nav>
        )
}