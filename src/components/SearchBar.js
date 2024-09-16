import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchBar = ({ onSearch }) => {
  const [mealName, setMealName] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (mealName.length > 2) {
      axios
        .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
        /*search : Sushi,Seafood fideuà,Onion,Pepper*/
        .then((response) => {
          if (response.data.meals) {
            setSuggestions(response.data.meals.map((meal) => meal.strMeal));
          } else {
            setSuggestions([]);
          }
        })
        .catch((error) =>
          console.error("Error fetching meal suggestions", error)
        );
    } else {
      setSuggestions([]);
    }
  }, [mealName]);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(mealName);
  };

  const handleSuggestionClick = (suggestion) => {
    setMealName(suggestion);
    setSuggestions([]);
    onSearch(suggestion);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={mealName}
          onChange={(e) => setMealName(e.target.value)}
          placeholder="Search for meals..."
        />
        <button type="submit">Search</button>
      </form>
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
