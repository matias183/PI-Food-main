import React, {useState, useEffect} from 'react';
import { postRecipe, getDiets } from '../Actions';
import { useDispatch, useSelector } from 'react-redux';
import Nav from './Nav';

export  function RecipeCreate(){
const dispatch = useDispatch();
const diets = useSelector((state)=> state.diets)

const [input, setInput] = useState({
    name:"",
    summary:"",
    score:"",
    healthyScore:"",
    stepByStep: [],
    image:"",
    diets:[]
})
const [error, setError] = useState({});

useEffect(()=> {
    dispatch(getDiets());
},[dispatch]);
// handleDeleteDiet, handleChange, handleCheckBox, handleStepByStep, handleSubmit

let handleChange = (e) => {
    e.preventDefault();
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };
  
  let handleCheckBox = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      diets: input.diets.includes(e.target.value)
        ? input.diets
        : [...input.diets, e.target.value],
    });
    setError(
          validate({
            ...input,
            diets: [...input.diets, e.target.value],
          })
        );
        //  console.log(input , input.diets)
      }
    
  

  let handleStepByStep = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      stepByStep: [e.target.value],
    });
    setError(
      validate({
        ...input,
        stepByStep: [e.target.value],
      })
    );
    console.log(input.stepByStep);
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    if(!error.submit){return}
    dispatch(postRecipe(input));
    console.log(input);
    alert("Recipe created! c:");
    setInput({
        name:"",
        summary:"",
        score:"",
        healthyScore:"",
        stepByStep: [],
        image:"",
        diets:[]
    });
  };

  let handleDeleteDiet = (e) => {
    setInput({
      ...input,
      diets: input.diets.filter((d) => d !== e),
    });
    setError(
      validate({
        ...input,
        diets: input.diets.filter((d) => d !== e),
      })
    );
  };
  let validate = (input) => {
    let error = {};
    if (!input.name || input.name.length > 40) {
      error.name = "A Name is required, (max 40 char)";
    } else if (!input.summary) {
      error.summary = "A Summary is required";
    } else if (
      !input.score ||
      input.score < 0 ||
      input.score > 100
    ) {
      error.score = "A Score from 0 to a 100 is required";
    } else if (
      !input.healthyScore ||
      input.healthyScore < 0 ||
      input.healthyScore > 100
    ) {
      error.healthyScore = "A Health Score from 0 to a 100 is required";
    } else if (!input.stepByStep[0]) {
      error.stepByStep = "A Step is required";
    } else if (!input.image) {
      error.image = "An Image is required";
    } else if (!input.diets.length) {
      error.diets = "A Diet must be chosen";
    }else { error.submit = "we are ok to submit c;";}
    console.log(error)
    return error;
  };

return(
    <div >
      <Nav/>
       <div className='.title-container'>
        <h1 className="inicio">Create your own recipe!</h1>
        </div>
        <form className='form-board' onSubmit={(e) => handleSubmit(e)} >
            <div className='input-form'>
            <div>
                <label className='input-text'>Name:</label> <input type={'text'} value={input.name} name= {'name'} onChange={(e) => handleChange(e)}/> 
            </div>
            {error.name && <p className="validate-form">{error.name}</p>}
            <div>
                <label className='input-text'>Summary:</label> <input type={'text'} value={input.summary} name= {'summary'} onChange={(e) => handleChange(e)}/>
            </div>
            {error.summary && <p className="validate-form">{error.summary}</p>}
            <div>
                <label className='input-text'>Score:</label> <input type={'number'} value={input.score} name={'score'} onChange={(e) => handleChange(e)}/>
            </div>
            {error.score && (<p className="validate-form">{error.score}</p>)}
            <div>
                <label className='input-text'>Health Score:</label> <input type={'number'} value={input.healthyScore} name= {'healthyScore'} onChange={(e) => handleChange(e)}/>
            </div>
            {error.healthyScore && ( <p className="validate-form">{error.healthyScore}</p>)}
            <div>
                <label className='input-text'>Steps:</label> <input type='text' value={input.stepByStep[0] || ''} name={'stepByStep'} onChange={(e) => handleStepByStep(e)}/>
            </div>
            {error.stepByStep && ( <p className="validate-form">{error.stepByStep}</p>)}
            <div>
                <label className='input-text'>Image:</label> <input type='text' value={input.image} name='image' onChange={(e) => handleChange(e)}/>
            </div>
            {error.image && <p className="validate-form">{error.image}{error.name}</p>}
            <div className='title-container'>
                <h4 className='input-text'>Select Diets Below</h4>
            </div>
            <div className='check-form'>
           
                {diets.map((g)=>(
                    <div key={g.ID}>
                        <p> <input type={'checkbox'} value={g.name} name={g.name} onChange={ (g)=> handleCheckBox(g)}/>{g.name}</p>
                    </div>
                ))} 
                </div>
            </div>
            
            {error.diets && <p>{error.diets}</p>}
          {input.diets ? (
            <div className='title-container'>
              <h4 className='input-text'>Diets Chosen</h4>
            </div> 
            ) 
            : (<p></p>)}
          {input.diets && (
            <div>
                {input.diets?.map((f) => {return ( <ul key={f} className='title-container'><li className='inicio'>{f}</li> <button className='button' onClick={() => handleDeleteDiet(f)}>X</button>
                </ul>)
          })}
                
            </div>
          )}
             <br/>
          <input className="button" type={"submit"} value={"CREATE"}/>

        </form>
    </div>
)

}