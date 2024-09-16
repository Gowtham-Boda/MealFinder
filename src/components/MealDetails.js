import React from "react";

const MealDetails = ({ meal, onClose }) => (
  <div className="meal-details">
    <button onClick={onClose}>Close</button>
    <h2>{meal.strMeal}</h2>
    <img src={meal.strMealThumb} alt={meal.strMeal} />
    <h3>Instructions</h3>
    <p>{meal.strInstructions}</p>
    <h3>Ingredients</h3>
    <ul>
      {Array.from(
        { length: 20 },
        (_, i) =>
          meal[`strIngredient${i + 1}`] && (
            <li key={i}>
              {meal[`strIngredient${i + 1}`]} - {meal[`strMeasure${i + 1}`]}
            </li>
          )
      )}
    </ul>
  </div>
);

export default MealDetails;
