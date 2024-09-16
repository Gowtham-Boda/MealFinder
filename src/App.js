import "./styles.css";
import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import MealCard from "./components/MealCard";
import MealDetails from "./components/MealDetails";
import axios from "axios";

const App = () => {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const searchMeals = (mealName) => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
      .then((response) => setMeals(response.data.meals || []))
      .catch((error) => console.error("Error fetching meals", error));
  };

  return (
    <div>
      <SearchBar onSearch={searchMeals} />
      <div className="meal-list">
        {meals.map((meal) => (
          <MealCard
            key={meal.idMeal}
            meal={meal}
            onClick={() => setSelectedMeal(meal)}
          />
        ))}
      </div>
      {selectedMeal && (
        <MealDetails
          meal={selectedMeal}
          onClose={() => setSelectedMeal(null)}
        />
      )}
    </div>
  );
};

export default App;
