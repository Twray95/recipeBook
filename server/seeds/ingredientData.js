const { Ingredient } = require("../models");

const ingredientData = [
  {
    name: "bread",
  },
  {
    name: "ham",
  },
  {
    name: "cheese",
  },
  {
    name: "tomato soup",
  },
  {
    name: "bacon",
  },
  {
    name: "lettuce",
  },
  {
    name: "turkey",
  },
  {
    name: "tomato",
  },
  {
    name: "mayonnaise",
  },
];

const seedIngredient = () => Ingredient.bulkCreate(ingredientData);
module.exports = seedIngredient;
