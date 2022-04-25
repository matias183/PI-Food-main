import axios from "axios";

export function getRecipes() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/recipes");
    return dispatch({
      type: "GET_RECIPES",
      payload: json.data,
    });
  };
}
export function getRecipesDetail(id) {
  return async function (dispatch) {
    try{
    const json = await axios.get('http://localhost:3001/recipe/' + id);
    return dispatch({
      type: "GET_RECIPES_DETAIL",
      payload: json.data,
    });} catch(error){
      console.log(error)
    }
  };
}

export function getDiets() {
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/types`);
    return dispatch({
      type: "GET_DIETS",
      payload: json.data,
    });
  };
}

export function getRecipesByName (payload) {
  return async function (dispatch){
    try{
      let json = await axios.get('http://localhost:3001/recipes?name=' + payload)
      return dispatch ({
        type : 'SEARCH_RECIPES_BY_NAME',
        payload: json.data
      })
    }catch (error){
      console.log(error)
    }
  }
}

export function filterByDiet(diet){
  return ({
    type: "FILTER_DIETS",
    payload: diet,
  });
}

export function orderByAlphabet(payload){
  return({
    type:'ORDER_BY_ALPHABET',
    payload
  })
}

export function orderByScore(payload){
  return({
    type:'ORDER_BY_SCORE',
    payload
  })
}

export function postRecipe (payload){
  return async function (dispatch){
    const json = await axios.post('http://localhost:3001/recipe', payload)
    return json
  }
}

export function vaciarDetail (){
  return {
    type:'VACIAR_DETAIL'
  }
}
