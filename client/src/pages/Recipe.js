import React from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Typography, CssBaseline, Container } from "@mui/material";
import allStyles from "../styles";

function RecipePage() {
  const location = useLocation();
  const { from } = location.state;

  const { data, error, isLoading } = useQuery({
    queryKey: ["oneRecipe"],
    queryFn: () =>
      fetch(`http://localhost:5001/api/recipe/one/${from}`).then((res) =>
        res.json()
      ),
  });

  if (error) return <div>There was an error loading data</div>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <CssBaseline />
      <main>
        <div>
          <Container maxWidth="sm">
            <Typography
              variant="h2"
              align="center"
              color="primary"
              gutterBottom
              sx={allStyles.title}
            >
              {data.title}
            </Typography>
            <Typography
              variant="h5"
              align="start"
              color="textSecondary"
              gutterBottom
            >
              Instructions: {data.instructions}
            </Typography>
            <Typography variant="h5" align="start" color="textSecondary">
              Ingredients:
              {data.ingredients.map((ingredient) => ` ${ingredient.name} `)}
            </Typography>
          </Container>
        </div>
      </main>
    </>
  );
}

export default RecipePage;

//{ingredients.map((ingredient) => {
//   return ` ${ingredient.name} `;
//})}
