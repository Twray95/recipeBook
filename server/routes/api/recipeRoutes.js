const router = require("express").Router();

router.get("/", (req, res) => {
  console.log("API called");
  res.json({ recipe: ["recipeOne", "recipeTwo", "recipeThree"] });
});

module.exports = router;
