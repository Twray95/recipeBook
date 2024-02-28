const { Recipe } = require("../models");

const recipeData = [
  {
    title: "Ham and Cheese Sandwich",
    instructions:
      "Take the ham and cheese and put it between two pieces of bread.",
  },
  {
    title: "Grilled Cheese and Tomato Soup",
    instructions:
      "Put cheese between two pieces of bread and grill it, then dip in tomato soup and enjoy.",
  },
  {
    title: "Turkey Sandwich",
    instructions:
      "Put turkey, lettuce, and tomato between two pieces of bread. Add mayonnaise if desired.",
  },
  {
    title: "BLT Sandwich",
    instructions: "Put bacon, lettuce, and tomato between two pieces of bread.",
  },
];

const seedRecipe = () => Recipe.bulkCreate(recipeData);
module.exports = seedRecipe;
