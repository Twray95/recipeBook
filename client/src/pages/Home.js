import React from "react";
import {
  Typography,
  AppBar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Toolbar,
  Container,
  Button,
} from "@mui/material";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";

import allStyles from "../styles";

//This will become a fetch request to get the recipe data, but for now just using placeholder.
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Home = () => {
  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <DinnerDiningIcon sx={allStyles.icon} />
          <Typography variant="h6">Recipe Book</Typography>
        </Toolbar>
      </AppBar>
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
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card sx={allStyles.card}>
                  <CardMedia
                    sx={allStyles.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  ></CardMedia>
                  <CardContent sx={allStyles.cardContent}>
                    <Typography gutterBottom variant="h5">
                      Recipe Title
                    </Typography>
                    <Typography>
                      This section will show either a short description of the
                      recipe or the start of the instructions
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="sm" color="primary">
                      View
                    </Button>
                    <Button size="sm" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <footer>
        <Typography variant="h6" align="center" gutterBottom>
          Recipe Book
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          gutterBottom
        >
          Thank you for visiting this site.
        </Typography>
      </footer>
    </>
  );
};

export default Home;
