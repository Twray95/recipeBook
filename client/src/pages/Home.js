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

  //modal states
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [formState, setFormState] = useState({
    title: "",
    instructions: "",
    ingredientActive: "",
    ingredientList: [],
    ingredients: [],
  });

  //update form state whenever a field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextFormState = {
      ...formState,
      [name]: value,
    };
    setFormState(nextFormState);
  };
  //Handle add Ingredient
  const handlePush = () => {
    //Push a new item into the two ingredient arrays.  The first one is for submitting to the database and the second one is for displaying in the UI
    const newIngredient = { name: `${formState.ingredientActive}` };
    const newIngredientItem = `${formState.ingredientActive} `;
    formState.ingredientList.push(newIngredientItem);
    formState.ingredients.push(newIngredient);
    console.log(formState.ingredients);
    //Reset the input fields after adding an item
    setFormState({ ...formState, ingredientActive: "" });
  };
  //Handle submission of new recipe
  const handleSubmit = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formState }),
    };
    fetch("http://localhost:5001/api/recipe/", requestOptions);

    //Reset the form state after submission
    setFormState({
      title: "",
      instructions: "",
      ingredientActive: "",
      ingredientList: [],
      ingredients: [],
    });
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
                    Add Your Own Recipe!
                  </Button>
                  <Modal open={open} onClose={handleClose}>
                    <Box sx={allStyles.modalSearch}>
                      <Typography variant="h5" align="start" gutterBottom>
                        Title:
                      </Typography>
                      <TextField
                        id="outlined-basic"
                        label="Title"
                        onChange={handleChange}
                        name="title"
                        value={formState.title}
                      />
                      <Typography variant="h5" align="start" gutterBottom>
                        Instructions:
                      </Typography>
                      <TextField
                        id="outlined-basic"
                        label="Instructions"
                        multiline
                        sx={{ display: "flex" }}
                        onChange={handleChange}
                        name="instructions"
                        value={formState.instructions}
                      ></TextField>
                      <Typography variant="h5" align="start" gutterBottom>
                        Ingredients:
                      </Typography>
                      <Box>
                        <Typography variant="h7">
                          {formState.ingredientList}
                        </Typography>
                      </Box>
                      <Button onClick={handlePush}>Add</Button>
                      <TextField
                        id="outlined-basic"
                        label="Ingredient"
                        onChange={handleChange}
                        name="ingredientActive"
                        value={formState.ingredientActive}
                      />
                      <Box align="center">
                        <Button variant="primary" onClick={handleSubmit}>
                          Submit
                        </Button>
                      </Box>
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
