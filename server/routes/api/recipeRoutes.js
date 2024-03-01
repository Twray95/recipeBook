const router = require("express").Router();
const { Recipe, Ingredient } = require("../../models/index");

router.get("/", (req, res) => {
  console.log("API called");
  res.json({ recipe: ["recipeOne", "recipeTwo", "recipeThree"] });
});

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

module.exports = router;
