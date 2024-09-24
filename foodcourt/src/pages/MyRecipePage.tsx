// src/pages/RecipePage.tsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import RecipeModal from "@/components/modal/RecipeModal";

interface Recipe {
  title: string;
  description: string;
  ingredients: string[];
}

const MyRecipePage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem("recipes") || "[]");
    setRecipes(storedRecipes);
  }, []);

  const handleSaveRecipe = (recipe: Recipe) => {
    let updatedRecipes;
    if (editingIndex !== null) {
      updatedRecipes = recipes.map((r, index) =>
        index === editingIndex ? recipe : r
      );
      setEditingIndex(null);
    } else {
      updatedRecipes = [...recipes, recipe];
    }
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  };

  const handleAddRecipe = () => {
    setEditingRecipe(null);
    setIsModalOpen(true);
  };

  const handleEditRecipe = (index: number) => {
    setEditingRecipe(recipes[index]);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleDeleteRecipe = (index: number) => {
    const updatedRecipes = recipes.filter((_, i) => i !== index);
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  };

  return (
    <div className="container mx-auto pt-16">
      <h1 className="text-2xl font-bold mb-4">레시피 목록</h1>
      <Button onClick={handleAddRecipe}>레시피 추가</Button>
      <div className="mt-8">
        {recipes.length > 0 ? (
          <ul>
            {recipes.map((recipe, index) => (
              <li key={index} className="border p-4 mt-4 rounded">
                <h3 className="text-xl font-semibold">{recipe.title}</h3>
                <p>{recipe.description}</p>
                <ul className="mt-2">
                  {recipe.ingredients.map((ingredient, idx) => (
                    <li key={idx} className="text-gray-700">
                      {ingredient}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex space-x-4">
                  <Button onClick={() => handleEditRecipe(index)}>수정</Button>
                  <Button onClick={() => handleDeleteRecipe(index)}>
                    삭제
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>저장된 레시피가 없습니다.</p>
        )}
      </div>
      <RecipeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveRecipe}
        initialData={editingRecipe}
      />
    </div>
  );
};

export default MyRecipePage;
