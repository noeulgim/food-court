// src/components/bar/IngredientInput.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface IngredientInputProps {
  onAddIngredient: (ingredient: string) => void;
}

const IngredientInput: React.FC<IngredientInputProps> = ({
  onAddIngredient,
}) => {
  const [ingredientValue, setIngredientValue] = useState("");

  const handleAddIngredient = () => {
    if (ingredientValue.trim() === "") return;

    onAddIngredient(ingredientValue);
    setIngredientValue(""); // 입력 필드 초기화
  };

  return (
    <div className="flex items-center space-x-2">
      <Input
        className="w-80"
        type="text"
        placeholder="재료를 입력하세요"
        value={ingredientValue}
        onChange={(e) => setIngredientValue(e.target.value)}
      />
      <Button onClick={handleAddIngredient}>추가</Button>
    </div>
  );
};

export default IngredientInput;
