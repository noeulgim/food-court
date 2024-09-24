// src/components/RecipeModal.tsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import IngredientInput from "../bar/IngredientSearchBar";

interface RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (recipe: Recipe) => void;
  initialData?: Recipe | null;
}

interface Recipe {
  title: string;
  description: string;
  ingredients: string[];
}

const RecipeModal: React.FC<RecipeModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setIngredients(initialData.ingredients);
    }
  }, [initialData]);

  const handleAddIngredient = (ingredient: string) => {
    setIngredients((prevIngredients) => [...prevIngredients, ingredient]);
  };

  const handleSave = () => {
    const newRecipe: Recipe = { title, description, ingredients };
    onSave(newRecipe);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">
          {initialData ? "레시피 수정" : "레시피 추가"}
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700">제목</label>
          <Input
            className="w-full"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">설명</label>
          <textarea
            className="w-full h-24 p-2 border"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">재료</label>
          <IngredientInput onAddIngredient={handleAddIngredient} />
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">추가된 재료:</h2>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index} className="mt-2">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-end space-x-4">
          <Button onClick={onClose}>취소</Button>
          <Button onClick={handleSave}>
            {initialData ? "수정 저장" : "저장"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
