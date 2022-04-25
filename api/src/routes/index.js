const { Router } = require("express");

const axios = require("axios");
const { Recipe, Diet } = require("../db");
const API_KEY = "9d3b8c1362ee4f57b37c4878fbd96038";
//9d3b8c1362ee4f57b37c4878fbd96038
//24cd2595747f40d58c5e4774a08d1b38
//2ca75e2380664064831698d9f378e863
//f4f6963496dd4f7697dce2cd3aced5f2
//495f766bd9ec48d5a31601e024946932
const router = Router();

const getRecipesFromApi = async () => {
  const apiUrl = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`
  );

  const apiInfo = await apiUrl.data.results.map((e) => {
    return {
      id: e.id,
      name: e.title,
      summary: e.summary,
      score: e.spoonacularScore,
      healthyScore: e.healthScore,
      stepByStep: e.analyzedInstructions.map((e) =>
        e.steps.map((el) => el.step)
      ),
      image: e.image,
      diets: e.diets,
    };
  });
  return apiInfo;
};

const getRecipesFromDb = async () => {
  return await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllRecipes = async () => {
  const recipesFromApi = await getRecipesFromApi();
  const recipesFromDb = await getRecipesFromDb();
  const allRecipes = recipesFromApi.concat(recipesFromDb);
  return allRecipes;
};

const getAllDiets = async () => {
  const diets = [
    "gluten free",
    "ketogenic",
    "vegetarian",
    "lacto ovo vegetarian",
    "vegan",
    "pescatarian",
    "paleolithic",
    "primal",
    "fodmap friendly",
    "dairy free",
    "whole 30",
  ];
  diets.forEach((e) => {
    Diet.findOrCreate({
      where: { name: e },
    });
  });
  const dietTypes = await Diet.findAll();
  // console.log(dietTypes);
  return dietTypes;
};

// const getRecipesByQuery
// const getRecipesByParams
// const getTypesOfRecipes
// const PostRecipe
router.get("/recipes", async (req, res) => {
  const { name } = req.query;
  let recipes = await getAllRecipes();
  if (name) {
    let queryRecipe = await recipes.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );
    if (queryRecipe.length) {
      res.status(200).send(queryRecipe);
    } else {
      res.status(404).send("Esta receta no existe");
    }
  } else {
    res.status(200).send(recipes);
  }
});

router.get("/recipe/:id", async (req, res) => {
  const { id } = req.params;
  let recipes = await getAllRecipes();
  //   console.log(recipes)
  let paramsRecipe = await recipes.find((e) => parseInt(e.id) === parseInt(id));
  // console.log(paramsRecipe);
  if (paramsRecipe) {
    res.status(200).send(paramsRecipe);
  } else {
    res.status(404).send("Esta receta no existe");
  }
});

router.get("/types", async (req, res) => {
  let types = await getAllDiets();
  res.status(200).send(types);
});

router.post("/recipe", async (req, res) => {
  const { name, summary, score, healthyScore, stepByStep, image, diets } =
    req.body;
  // console.log('este ese el consolelog!!!!!!!' ,diets)
  let createdRecipe = await Recipe.create({
    name,
    summary,
    score,
    healthyScore,
    stepByStep,
    image,
  });
  let recipeDiet = await Diet.findAll({
    where: { name: diets },
  });

  createdRecipe.addDiet(recipeDiet);
  console.log(createdRecipe);
  res.status(200).send("recipe added successfully");
});

// GET /recipes
// GET /recipes/{idReceta}
// GET /types
// POST /recipe

module.exports = router;
