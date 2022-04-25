const initialState = {
    recipes: [],
    recipeDetail: [],
    recipesStorage: [],
    diets: [],
  };
  
  function reducer(state = initialState, { type, payload }) {
    switch (type) {
      case "GET_RECIPES":   //consigue las recetas 
        return {
          ...state,
          recipes: payload,
          recipesStorage: payload,   //guarda las recetas para usarlas en el filter
          //no default
        };
      case "GET_RECIPES_DETAIL": //consigue los detalles de las recetas
        console.log(payload)
        return {
          ...state,
          recipeDetail: payload,
        };
      case "SEARCH_RECIPES_BY_NAME": //busca las recetas por nombre
        return {
          ...state,
          recipes: payload,
        };
      case "FILTER_DIETS":  
        const recipesStorage = state.recipes; //trae las recetas desde GET_RECIPES
        const filteredDiets =
          payload === "All"      // "All" hace referencia a las dietas
            ? recipesStorage  // Existe recipesStorage? si existe hace lo siguiente
            : recipesStorage.filter((e) => e.diets.includes(payload));  // "Filtra" adentro del array todas las dietas que incluyan "payload" 
        return {
          ...state, 
          recipes: filteredDiets, //y devuelve solo las recetas que contengan esas dietas
        };
      case "ORDER_BY_ALPHABET":  // los ordena alfabeticamente 
        let alphabetArr =
          payload === "asc"  
            ? state.recipes.sort(function (a, b) { // es un sort que los ordena en orden alfabetico
                if (a.name > b.name) {
                  return 1;
                }
                if (a.name < b.name) {
                  return -1;
                } else {
                  return 0;
                }
              })
            : state.recipes.sort(function (a, b) {
                if (a.name < b.name) {
                  return 1;
                }
                if (a.name > b.name) {
                  return -1;
                } else {
                  return 0;
                }
              });
        return {
          ...state,
          recipes: alphabetArr,
        };
        case 'VACIAR_DETAIL':
          return{
            ...state ,
            recipeDetail:[]
          }
      case "ORDER_BY_SCORE": // los ordena segun que puntaje tenga cada receta
        let scoreArr =
          payload === "high"
            ? state.recipes.sort(function (a, b) {
                if (a.score < b.score) {
                  return 1;
                }
                if (a.score > b.score) {
                  return -1;
                } else {
                  return 0;
                }
              })
            : state.recipes.sort(function (a, b) {
                if (a.score > b.score) {
                  return 1;
                }
                if (a.score < b.score) {
                  return -1;
                } else {
                  return 0;
                }
              });
        return {
          ...state,
          recipes: scoreArr,
        };
      case "GET_DIETS": //consigue las dietas
        return {
          ...state,
          diets: payload,
        };
        case 'POST_RECIPE': 
          return{
            ...state,
          }
      default:
        return { ...state };
    }
    
  }
  export default reducer;