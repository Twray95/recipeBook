const router = require("express").Router();
const sequelize = require("../../config/connection");
// const { Recipe } = require('../../models')

router.get("/", (req, res) => {
  console.log("API called");
  res.json({ recipe: ["recipeOne", "recipeTwo", "recipeThree"] });
});

module.exports = router;
