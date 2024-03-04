import React, { useState } from "react";
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
  Modal,
  Box,
  TextField,
} from "@mui/material";

import { useQuery } from "@tanstack/react-query";

import allStyles from "../styles";

const Home = () => {
  //fetch request to get recipe data
  const { data, error, isLoading } = useQuery({
    queryKey: ["allRecipes"],
    queryFn: () =>
      fetch("http://localhost:5001/api/recipe/").then((res) => res.json()),
  });

  //search modal states
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formState, setFormState] = useState({
    searchField: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextFormState = {
      ...formState,
      [name]: value,
    };
    setFormState(nextFormState);
    console.log(formState);
  };

  //Handle what to show while fetch request is happening or errored
  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

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
                    onClick={handleOpen}
                    variant="contained"
                    color="primary"
                    sx={allStyles.buttons}
                  >
                    Search Recipes
                  </Button>
                  <Modal open={open} onClose={handleClose}>
                    <Box sx={allStyles.modalSearch}>
                      <Button color="primary">SEARCH</Button>
                      <TextField
                        id="outlined-basic"
                        label="Search Recipes"
                        name="searchField"
                        onChange={handleChange}
                        value={formState.searchField}
                      />
                    </Box>
                  </Modal>
                </Grid>
                <Grid item>
                  <Button
                    onClick={handleOpen}
                    variant="contained"
                    color="primary"
                    sx={allStyles.buttons}
                  >
                    Search by Ingredients
                  </Button>
                  <Modal open={open} onClose={handleClose}>
                    <Box sx={allStyles.modalSearch}>
                      <Button color="primary">SEARCH</Button>
                      <TextField
                        id="outlined-basic"
                        label="Search Recipes"
                        name="searchField"
                        onChange={handleChange}
                        value={formState.searchField}
                      />
                    </Box>
                  </Modal>
                </Grid>
                <Grid item>
                  <Button
                    onClick={handleOpen}
                    variant="contained"
                    color="primary"
                    sx={allStyles.buttons}
                  >
                    Add Your Own Recipe!
                  </Button>
                  <Modal open={open} onClose={handleClose}>
                    <Box sx={allStyles.modalSearch}>
                      <Button color="primary">SEARCH</Button>
                      <TextField
                        id="outlined-basic"
                        label="Search Recipes"
                        name="searchField"
                        onChange={handleChange}
                        value={formState.searchField}
                      />
                    </Box>
                  </Modal>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container sx={allStyles.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {data.map((card) => (
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
