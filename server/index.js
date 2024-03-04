const express = require("express");
const routes = require("./routes");
const sequelize = require("./config/connection");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;

// Define middleware here!
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//set up router
app.use(routes);

//initialize sequelize
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
