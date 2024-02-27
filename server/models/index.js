const Ingredient = require("./Ingredient");
const Recipe = require("./Recipe");

//Set up junction table for many to many relationship between recipe and ingredients.
Recipe.belongsToMany(Ingredient, { through: "recipeIngredient" });
Ingredient.belongsToMany(Recipe, { through: "recipeIngredient" });

module.exports = { Ingredient, Recipe };
