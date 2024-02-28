const sequelize = require("../config/connection");
const seedRecipe = require("./recipeData");
const seedIngredient = require("./ingredientData");
const { Ingredient, Recipe } = require("../models/index");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("Database has been synced and cleared!");
  await seedRecipe();
  console.log("Recipes have been seeded!");
  await seedIngredient();
  console.log("Ingredients have been seeded!");

  const bltIngredients = [
    { name: "bacon" },
    { name: "lettuce" },
    { name: "tomato" },
  ];

  const bltIngr = await Ingredient.bulkCreate(bltIngredients, {
    ignoreDuplicates: true,
  });

  const bltRecipe = await Recipe.create({
    title: "blt sandwich",
    instructions: "instructions",
  });

  await bltRecipe.addIngredients(bltIngr);

  process.exit(0);
};

seedAll();
