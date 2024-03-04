const router = require("express").Router();
const { Recipe, Ingredient } = require("../../models/index");

//get "all" recipes (only 5 recipes to display on front page)
router.get("/", async (req, res) => {
  try {
    let recipes = await Recipe.findAll({
      include: [Ingredient],
    });
    console.log("=======HIT RECIPE ROUTE=======");
    res.status(200).json(recipes);
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
