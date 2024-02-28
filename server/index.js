const express = require("express");
const routes = require("./routes");
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 5001;

// Define middleware here!
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set up router
app.use(routes);

//initialize sequelize
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
