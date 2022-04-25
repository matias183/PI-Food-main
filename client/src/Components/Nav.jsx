import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav(){
return(
    <div>
        <div>
            <NavLink to ='/form'><button className="button">Create Recipe</button></NavLink>
            <NavLink to ='/'><button className="button">Landing</button></NavLink>
            <NavLink to ='/home'><button className="button">Home</button></NavLink>
              </div>
            
    </div>
)
}