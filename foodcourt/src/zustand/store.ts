// src/store.ts
import { create } from "zustand";
import { User } from "firebase/auth";

interface UserPreferences {
  diets: string[];
  allergies: string[];
  cookingStyles: string[];
  selectPreferences: (
    diets: string[],
    allergies: string[],
    cookingStyles: string[]
  ) => void;
}

interface Recipe {
  id: number;
  title: string;
  ingredients: { name: string; quantity: string; price: number }[];
  instructions: string;
  dietaryTags: string[];
  cookingStyle: string;
  price: number;
  allergies: string[];
}

interface Store {
  userPreferences: UserPreferences;
  recipes: Recipe[];
  filteredRecipes: Recipe[];
  recommendRecipes: () => void;
}

export const Store = create<Store>((set) => ({
  userPreferences: {
    diets: [],
    allergies: [],
    cookingStyles: [],
    selectPreferences: (diets, allergies, cookingStyles) =>
      set((state) => ({
        userPreferences: { diets, allergies, cookingStyles },
      })),
  },
  recipes: [], // JSON 데이터를 가져와서 여기에 넣기
  filteredRecipes: [],
  recommendRecipes: () => {
    set((state) => {
      const { diets, allergies, cookingStyles } = state.userPreferences;

      const filtered = state.recipes.filter(
        (recipe) =>
          diets.some((diet) => recipe.dietaryTags.includes(diet)) &&
          !recipe.allergies.some((allergy) => allergies.includes(allergy)) &&
          cookingStyles.includes(recipe.cookingStyle)
      );

      return { filteredRecipes: filtered };
    });
  },
}));
