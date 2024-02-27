import React, { useEffect, useState } from "react";

function App() {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  return (
    <div>
      {typeof backendData.recipe === "undefined" ? (
        <p>Loading recipes...</p>
      ) : (
        backendData.recipe.map((recipe) => <p>{recipe}</p>)
      )}
    </div>
  );
}

export default App;
