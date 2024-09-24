import { useCartStore } from "@/zustand/useCartStore"; // 장바구니 스토어 임포트

interface Recipe {
  id: number;
  title: string;
  ingredients: { name: string; quantity: string; price: number }[];
  instructions: string;
  dietaryTags: string[];
  cookingStyle: string;
  price: number;
}

interface RecipeListProps {
  recipes: Recipe[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  const { addToCart } = useCartStore(); // 장바구니에 추가하는 함수 임포트

  const handleAddToCart = (recipe: Recipe) => {
    const ingredientsWithCategory = recipe.ingredients.map((ingredient) => ({
      ...ingredient,
      category4: "레시피", // 레시피 카테고리 추가
    }));

    const cartItem = {
      productId: recipe.id.toString(), // productId로 사용
      lprice: recipe.price, // 가격을 문자열로 변환
      image: "path/to/recipe/image.jpg", // 적절한 이미지 경로로 대체
      title: recipe.title,
      mallName: "레시피 쇼핑몰", // 레시피 카테고리에 대한 기본값
      brand: "레시피 브랜드", // 기본 브랜드 정보
      category4: "레시피", // 카테고리 추가
      ingredients: ingredientsWithCategory, // 재료 정보 포함
    };

    addToCart(cartItem); // 장바구니에 추가
  };

  return (
    <div>
      <h2>추천 레시피</h2>
      {recipes.length > 0 ? (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id} className="m-4 bg-gray-100">
              <h3>{recipe.title}</h3>
              <p>가격: ${recipe.price}</p>
              <p>재료:</p>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.quantity} {ingredient.name}
                  </li>
                ))}
              </ul>
              <p>조리법: {recipe.instructions}</p>
              <button
                onClick={() => handleAddToCart(recipe)}
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg"
              >
                장바구니에 추가
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>조건에 맞는 레시피가 없습니다.</p>
      )}
    </div>
  );
};

export default RecipeList;
