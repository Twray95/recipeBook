const express = require("express");
const app = express();

app.get("/api", (req, res) => {
  console.log("API called");
  res.json({ recipe: ["recipeOne", "recipeTwo", "recipeThree"] });
});

app.listen(5001, () => {
  console.log("server started on port 5001");
});
