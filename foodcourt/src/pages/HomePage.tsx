import React, { useState, useEffect } from "react";
import RecipeRecommendationForm from "@/components/form/RecipeRecommendationForm";
import RecipeList from "@/components/list/RecipeList";
import Modal from "@/components/modal/Modal";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [recommendedRecipes, setRecommendedRecipes] = useState<any[]>([]);
  const [recipes, setRecipes] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch recipes from db.json
    const fetchRecipes = async () => {
      const response = await fetch("http://localhost:4000/recipes");
      const data = await response.json();
      setRecipes(data);
    };

    fetchRecipes();
  }, []);

  const handleRecommend = (preferences: {
    diet: string;
    allergies: string[];
    cookingStyle: string;
  }) => {
    const { diet, allergies, cookingStyle } = preferences;

    const filteredRecipes = recipes.filter((recipe) => {
      const dietMatch = recipe.dietaryTags.includes(diet);
      const allergyMatch = !allergies.some((allergy) =>
        recipe.allergies.some((allergies) => allergies.includes(allergy))
      );
      const cookingStyleMatch = recipe.cookingStyle === cookingStyle;

      return dietMatch && allergyMatch && cookingStyleMatch;
    });

    setRecommendedRecipes(filteredRecipes);
    setIsModalOpen(true); // Open the modal to show recommended recipes
  };

  const handleSeeMore = () => {
    const preferences = {
      diet:
        recommendedRecipes.length > 0
          ? recommendedRecipes[0].dietaryTags[0]
          : "",
      allergies: [],
      cookingStyle:
        recommendedRecipes.length > 0 ? recommendedRecipes[0].cookingStyle : "",
    };
    navigate("/recipe", { state: { recommendedRecipes, preferences } }); // Pass recommendedRecipes and preferences as state
  };

  return (
    <div className="pt-20">
      <h1>맞춤형 레시피 박스 구독 서비스</h1>
      <button onClick={() => setIsModalOpen(true)}>레시피 추천</button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <RecipeRecommendationForm onRecommend={handleRecommend} />
        {recommendedRecipes.length > 0 && (
          <div>
            <h2>추천 레시피</h2>
            <h3>{recommendedRecipes[0].title}</h3>
            <p>가격: ${recommendedRecipes[0].price.toFixed(2)}</p>
            <p>조리법: {recommendedRecipes[0].instructions}</p>
            <button onClick={handleSeeMore}>다른 레시피 더 보러가기</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default HomePage;
