import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
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
  TextField,
} from "@mui/material";
import allStyles from "../styles";

function ResultsPage() {
  const location = useLocation();
  const { searchName } = location.state;

  const { data, error, isLoading } = useQuery({
    queryKey: ["search"],
    queryFn: () =>
      fetch(`http://localhost:5001/api/recipe/search/${searchName}`).then(
        (res) => res.json()
      ),
  });

  const [ingredientState, setIngredientState] = useState({ name: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextIngredientState = {
      ...ingredientState,
      [name]: value,
    };
    setIngredientState(nextIngredientState);
  };

  const handleFilter = () => {
    //filter data  based on user input here
    const newData = data.filter(checkIngredients);
    const checkData = newData.filter(filterByIngredient);
    //queryClient.setQueryData("search", checkData)
    //I can't figure out how to use react-query to use this function and rerender the page with filtered results but the results are filtered.
    console.log(checkData);
  };

  //checks that the recipe has ingredients first
  const checkIngredients = (recipe) => {
    if (recipe.ingredients.length >= 1) {
      return recipe;
    }
  };

  //checks whether an ingredient is included compared to the user's input
  const filterByIngredient = (recipe) => {
    const check = ingredientState.name;
    for (var i = 0; i < recipe.ingredients.length; i++) {
      if (recipe.ingredients[i].name == check) {
        return recipe;
      }
    }
  };
  if (error) return <div>Error occurred while fetching data</div>;
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
              Search Results:
            </Typography>
          </Container>
        </div>
        <Container align="center">
          <Button onClick={handleFilter}>Filter</Button>
          <TextField
            id="outlined-basic"
            onChange={handleChange}
            name="name"
            value={ingredientState.name}
            label="Enter an ingredient"
          ></TextField>
        </Container>
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
}

export default ResultsPage;
