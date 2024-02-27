const router = require("express").Router();
const recipeRoutes = require("./recipeRoutes");
const ingredientRoutes = require("./ingredientRoutes");

router.use("/recipe", recipeRoutes);
router.use("/ingredient", ingredientRoutes);

module.exports = router;
