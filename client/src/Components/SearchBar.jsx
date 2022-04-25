import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByName } from "../Actions";

export default function SearchBar() {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
  
    const handleInput = (e)=>{
      e.preventDefault();
      setName(e.target.value)
    }
    const handleSubmit = (e)=> {
      e.preventDefault();
      if(!name){
        return alert('The recipe does not exist')
      }else{
      dispatch(getRecipesByName(name));
      setName('')
      document.getElementById('search').value = '';
    }
  }
    return (
      <div className="search-bar">
        <input id="search" type="text" placeholder="Search Recipes.." onChange={e=> handleInput(e)} />
        <button className=" orange" type="submit" onClick={e=> handleSubmit(e)}>Search</button>
      </div>
    );
  }