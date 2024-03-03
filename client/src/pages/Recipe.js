import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function RecipePage() {
  const location = useLocation();
  const { from } = location.state;
  console.log(from);

  const [recipe, setRecipe] = useState([{}]);

  useEffect(() => {
    fetch(`/api/recipe/one/${from}`)
      .then((response) => response.json())
      .then((data) => {
        setRecipe(data);
      });
  }, []);
  let card = recipe;
  console.log(card);
  return (
    <div>
      <p>{card.title}</p>
    </div>
  );
}

export default RecipePage;
