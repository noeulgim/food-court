import React, { useState, useEffect } from "react";
import RecipeRecommendationForm from "@/components/form/RecipeRecommendationForm";
import RecipeList from "@/components/list/RecipeList";
import { useLocation } from "react-router-dom";
import { Section } from "@/components/layout/section";

const RecipePage: React.FC = () => {
  const location = useLocation();
  const { recommendedRecipes, preferences } = location.state || {}; // Retrieve preferences passed from HomePage

  const [currentRecommendations, setCurrentRecommendations] = useState<any[]>(
    recommendedRecipes || []
  );
  const [diet, setDiet] = useState<string>(preferences?.diet || ""); // Initialize with preferences
  const [allergies, setAllergies] = useState<string[]>(
    preferences?.allergies || []
  ); // Initialize with preferences
  const [cookingStyle, setCookingStyle] = useState<string>(
    preferences?.cookingStyle || ""
  ); // Initialize with preferences
  const [difficulty, setDifficulty] = useState<string>(
    preferences?.difficulty || ""
  ); // Initialize with preferences
  const [allRecipes, setAllRecipes] = useState<any[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch("http://localhost:4000/recipes");
      const data = await response.json();
      setAllRecipes(data);
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    // Clear the preferences when the component mounts (on page refresh)
    setDiet("");
    setAllergies([]);
    setCookingStyle("");
  }, []);

  const handleRecommend = (preferences: {
    diet: string;
    allergies: string[];
    cookingStyle: string;
    difficulty: string;
  }) => {
    const { diet, allergies = [], cookingStyle, difficulty } = preferences;

    const filteredRecipes = allRecipes.filter((recipe) => {
      const dietMatch = diet ? recipe.dietaryTags.includes(diet) : true;
      const allergyMatch = allergies.length
        ? !allergies.some((allergy) => recipe.allergies.includes(allergy))
        : true;
      const cookingStyleMatch = cookingStyle
        ? recipe.cookingStyle === cookingStyle
        : true;
      const difficultyMatch = difficulty
        ? recipe.difficulty === difficulty
        : true; // 난이도 매칭 체크 추가

      return dietMatch && allergyMatch && cookingStyleMatch && difficultyMatch; // 난이도 조건 추가
    });

    setCurrentRecommendations(filteredRecipes);
    setDiet(diet);
    setAllergies(allergies);
    setCookingStyle(cookingStyle);
    setDifficulty(difficulty); // 난이도 상태 업데이트
  };

  return (
    <Section>
      <RecipeRecommendationForm
        onRecommend={handleRecommend}
        initialPreferences={{ diet, allergies, cookingStyle, difficulty }} // Pass initial preferences
      />
      <h1>추천 레시피 목록</h1>
      {currentRecommendations.length > 0 ? (
        <RecipeList recipes={currentRecommendations} />
      ) : (
        <p>추천된 레시피가 없습니다.</p>
      )}
    </Section>
  );
};

export default RecipePage;
