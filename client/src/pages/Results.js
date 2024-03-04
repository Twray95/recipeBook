import React from "react";
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
