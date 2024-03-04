const router = require("express").Router();
const { Recipe, Ingredient } = require("../../models/index");
const { Op } = require("sequelize");

//get "all" recipes (only 5 recipes to display on front page)
router.get("/", async (req, res) => {
  try {
    let recipes = await Recipe.findAll({
      include: [Ingredient],
    });
    //Trim down to only five recipes
    const sixRecipes = recipes.slice(recipes.length - 6);
    res.status(200).json(sixRecipes);
  } catch (err) {
    res.status(400).send("Something went wrong with your request");
  }
});

//get specific recipe
router.get("/one/:id", async (req, res) => {
  try {
    //find single recipe and its ingredients
    let recipeData = await Recipe.findOne({
      where: { recipe_id: req.params.id },
      include: [Ingredient],
    });
    console.log("=================== /api/recipe/one hit");
    res.status(200).json(recipeData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Find recipes that contain the search name in their title
router.get("/search/:name", async (req, res) => {
  try {
    let searchResults = await Recipe.findAll({
      where: {
        title: {
          [Op.substring]: `${req.params.name}`,
        },
      },
    });
    if (!searchResults) {
      res.status(404).send("No results found!");
    } else {
      res.status(200).json(searchResults);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

//create new recipe
router.post("/", async (req, res) => {
  try {
    let newIngredients = req.body.ingredients;
    //create ingredients that aren't already in the database
    let newIngr = await Ingredient.bulkCreate(newIngredients, {
      ignoreDuplicates: true,
    });
    //create new recipe in the database
    let newRecipe = await Recipe.create({
      title: req.body.title,
      instructions: req.body.instructions,
    });
    //create a join betweeen the new recipe and its ingredients.
    await newRecipe.addIngredients(newIngr);
    //Positive response and for testing purposes send back the newly created recipe.
    res.status(201).json(newRecipe);
  } catch (err) {
    console.log(err);
    res.status(400).send("There was an error with your submission");
  }
});

//Delete single recipe
router.delete("/:id", async (req, res) => {
  try {
    //find the recipe to be deleted
    let recipe = await Recipe.findOne({
      where: { recipe_id: req.params.id },
    });
    //grab the data from the joined table so it can be removed
    let ingredient = await recipe.getIngredients();
    //removal the join information
    recipe.removeIngredient(ingredient);
    //now delete the recipe itself
    await Recipe.destroy({
      where: {
        recipe_id: req.params.id,
      },
    });
    res.status(200).send("Successfully deleted Recipe");
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
