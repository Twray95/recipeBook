import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Container,
  Button,
} from "@mui/material";

import allStyles from "../styles";

//This will become a fetch request to get the recipe data, but for now just using placeholder.

const Home = () => {
  const [recipeData, setRecipeData] = useState([{}]);

  useEffect(() => {
    fetch("/api/recipe")
      .then((response) => response.json())
      .then((data) => {
        setRecipeData(data);
      });
  }, []);
  let cards = recipeData;
  return (
    <>
      <CssBaseline />
      <main>
        <div sx={allStyles.container}>
          <Container maxWidth="sm" sx={allStyles.container}>
            <Typography
              variant="h2"
              align="center"
              color="primary"
              gutterBottom
              sx={allStyles.title}
            >
              Recipe Book
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary">
              Hello, thank you for visiting this website! You can use it to
              search for and manage your own recipes.
            </Typography>
            <div>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={allStyles.buttons}
                  >
                    See Recipes!
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={allStyles.buttons}
                  >
                    Add you own!
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container sx={allStyles.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card.recipe_id} xs={12} sm={6} md={4}>
                <Card sx={allStyles.card}>
                  <CardMedia
                    sx={allStyles.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  ></CardMedia>
                  <CardContent sx={allStyles.cardContent}>
                    <Typography gutterBottom variant="h5">
                      {card.title}
                    </Typography>
                    <Typography>{card.instructions}</Typography>
                  </CardContent>
                  <CardActions>
                    <Link to="/recipe" state={{ from: `${card.recipe_id}` }}>
                      <Button size="sm" color="primary">
                        View or Edit
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default Home;
