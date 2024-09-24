import React, { useState, useEffect } from "react";
import IngredientModal from "../modal/IngredientModal";
import { SearchBar } from "../bar/searchBar";

interface Recipe {
  id: string;
  title: string;
  content: string;
  ingredients: string[];
}

interface RecipeFormProps {
  onAdd: (recipe: Recipe) => void;
  onUpdate: (recipe: Recipe) => void;
  editingRecipe: Recipe | null;
}

const RecipeForm: React.FC<RecipeFormProps> = ({
  onAdd,
  onUpdate,
  editingRecipe,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [isModalOpen, setModalOpen] = useState(false); // 모달 상태 관리

  useEffect(() => {
    if (editingRecipe) {
      setTitle(editingRecipe.title);
      setContent(editingRecipe.content);
      setIngredients(editingRecipe.ingredients);
    }
  }, [editingRecipe]);

  const handleAddIngredient = (ingredient: string) => {
    setIngredients((prev) => [...prev, ingredient]);
    setModalOpen(false); // 모달 닫기
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newRecipe = {
      id: Date.now().toString(),
      title,
      content,
      ingredients,
    };

    if (editingRecipe) {
      onUpdate({ ...newRecipe, id: editingRecipe.id }); // 수정
    } else {
      onAdd(newRecipe); // 추가
    }

    // 폼 초기화
    setTitle("");
    setContent("");
    setIngredients([]);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border"
      />
      <textarea
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="p-2 border"
      />
      <div>
        <button type="button" onClick={() => setModalOpen(true)}>
          재료 추가
        </button>
        <IngredientModal
          open={isModalOpen}
          onClose={() => setModalOpen(false)}
          onAdd={handleAddIngredient}
        />
      </div>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient}{" "}
            <button
              type="button"
              onClick={() =>
                setIngredients(ingredients.filter((_, i) => i !== index))
              }
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
      <button type="submit">저장</button>
    </form>
  );
};

export default RecipeForm;
