const express = require("express");
const routes = require("./routes");
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});

// app.get("/api", (req, res) => {
//   console.log("API called");
//   res.json({ recipe: ["recipeOne", "recipeTwo", "recipeThree"] });
// });

// app.listen(5001, () => {
//   console.log("server started on port 5001");
// });
