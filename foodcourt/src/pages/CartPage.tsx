import { useCartStore } from "@/zustand/useCartStore";
import { Section } from "@/components/layout/section";
import { useEffect, useState } from "react";
import QuantityAdjuster from "@/components/button/QuantityAdjuster"; // Import QuantityAdjuster

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity } = useCartStore();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [ingredientQuantities, setIngredientQuantities] = useState<{
    [key: string]: { [key: string]: number };
  }>({}); // 재료 수량 상태 추가

  // 카테고리별 아이템 필터링 함수
  const filterItemsByCategory = (category: string) => {
    if (category === "recipes") {
      return cartItems.filter((item) => item.category === "레시피");
    } else if (category === "ingredients") {
      return cartItems.filter((item) => item.category !== "레시피");
    } else if (category === "일반 상품") {
      return cartItems.filter((item) => item.category === "샐러드");
    }
    return cartItems;
  };

  const filteredItems = filterItemsByCategory(activeCategory);

  // 총 가격 계산
  const totalPrice = filteredItems.reduce((total, item) => {
    if (selectedItems.includes(item.productId)) {
      const quantity = quantities[item.productId] || item.quantity; // Get current quantity or item quantity
      return total + parseFloat(item.lprice) * quantity;
    }
    return total;
  }, 0);

  useEffect(() => {
    const initialQuantities: { [key: string]: number } = {};
    const initialIngredientQuantities: {
      [key: string]: { [key: string]: number };
    } = {};

    filteredItems.forEach((item) => {
      initialQuantities[item.productId] = item.quantity; // Set initial quantity to item quantity

      // Initialize ingredient quantities
      if (item.ingredients) {
        initialIngredientQuantities[item.productId] = {};
        item.ingredients.forEach((ingredient) => {
          initialIngredientQuantities[item.productId][ingredient.id] =
            ingredient.quantity;
        });
      }
    });

    setQuantities(initialQuantities);
    setIngredientQuantities(initialIngredientQuantities); // Set initial ingredient quantities
    setSelectedItems(filteredItems.map((item) => item.productId));
  }, [cartItems, activeCategory]);

  const handleOrder = () => {
    if (selectedItems.length === 0) {
      alert("주문할 아이템을 선택해 주세요.");
    } else {
      alert(`주문이 완료되었습니다! 선택된 아이템 수: ${selectedItems.length}`);
      // 여기에 주문 처리 로직을 추가할 수 있습니다.
    }
  };

  const toggleItemSelection = (productId: string) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    // 수량 변경 시 선택된 상품만 업데이트
    if (selectedItems.includes(productId)) {
      setQuantities((prev) => ({ ...prev, [productId]: quantity }));
      updateCartItemQuantity(productId, quantity); // Update in global cart store only for selected items
    }
  };

  const handleIngredientQuantityChange = (
    productId: string,
    ingredientId: string,
    quantity: number
  ) => {
    setIngredientQuantities((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [ingredientId]: quantity,
      },
    }));
  };

  const removeIngredient = (productId: string, ingredientId: string) => {
    setIngredientQuantities((prev) => {
      const newQuantities = { ...prev };
      delete newQuantities[productId][ingredientId];
      return newQuantities;
    });
  };

  return (
    <Section sectionTitle="Cart">
      <div className="px-16 py-16">
        <div>
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveCategory("all")}
              className={`py-2 px-4 rounded-lg ${activeCategory === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              모든 아이템
            </button>
            <button
              onClick={() => setActiveCategory("recipes")}
              className={`py-2 px-4 rounded-lg ${activeCategory === "recipes" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              레시피 아이템
            </button>
            <button
              onClick={() => setActiveCategory("ingredients")}
              className={`py-2 px-4 rounded-lg ${activeCategory === "ingredients" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              음식/재료 아이템
            </button>
            <button
              onClick={() => setActiveCategory("일반 상품")}
              className={`py-2 px-4 rounded-lg ${activeCategory === "일반 상품" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              일반 상품
            </button>
          </div>

          {filteredItems.length > 0 ? (
            <ul role="list" className="divide-y divide-gray-100">
              {filteredItems.map((product) => (
                <li
                  key={product.productId}
                  className="flex justify-between gap-x-6 py-5"
                >
                  <div className="w-full">
                    <div className="flex justify-between gap-x-6 py-5">
                      <div className="flex">
                        <div>
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(product.productId)}
                            onChange={() =>
                              toggleItemSelection(product.productId)
                            }
                            className="mr-2"
                          />
                          <label className="text-sm text-gray-700">선택</label>
                        </div>
                        <div className="flex min-w-0 gap-x-4">
                          <img
                            alt={product.title}
                            src={product.image}
                            className="h-12 w-12 flex-none rounded-full bg-gray-50"
                          />
                        </div>
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {product.title}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {product.category}
                          </p>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm leading-6 text-gray-900">
                            {parseFloat(product.lprice) *
                              (quantities[product.productId] ||
                                product.quantity)}
                          </p>
                          <p className="mt-1 text-lg font-medium text-gray-900">
                            단가 : {product.lprice}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500">
                          {product.category}
                        </p>
                        <p className="text-sm text-gray-500">
                          수량:{" "}
                          {quantities[product.productId] || product.quantity}
                        </p>
                      </div>
                      <div className="flex items-center mt-2">
                        {/* Add QuantityAdjuster here */}
                        <QuantityAdjuster
                          quantity={
                            quantities[product.productId] || product.quantity
                          } // Use quantities state or product quantity
                          setQuantity={(newQuantity) =>
                            handleQuantityChange(product.productId, newQuantity)
                          }
                          isCartPage={true}
                        />
                      </div>
                    </div>
                    <div>
                      {/* 재료 목록 표시 */}
                      {product.ingredients &&
                        product.ingredients.length > 0 && (
                          <div>
                            <div className="border" />
                            <div className="mt-2">
                              <h4 className="text-sm font-semibold text-gray-700">
                                추가된 재료:
                              </h4>
                              <ul className="list-disc ml-4">
                                {product.ingredients.map((ingredient) => (
                                  <li
                                    key={ingredient.id}
                                    className="flex justify-between items-center text-sm text-gray-600"
                                  >
                                    <span>{ingredient.name}</span>
                                    <div className="flex items-center">
                                      <QuantityAdjuster
                                        quantity={
                                          ingredientQuantities[
                                            product.productId
                                          ]?.[ingredient.id] ||
                                          ingredient.quantity
                                        }
                                        setQuantity={(newQuantity) =>
                                          handleIngredientQuantityChange(
                                            product.productId,
                                            ingredient.id,
                                            newQuantity
                                          )
                                        }
                                        isCartPage={true}
                                      />
                                      <button
                                        onClick={() =>
                                          removeIngredient(
                                            product.productId,
                                            ingredient.id
                                          )
                                        }
                                        className="ml-2 text-red-500"
                                      >
                                        삭제
                                      </button>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(product.productId)}
                    className="mt-4 bg-red-500 text-white py-2 rounded-lg"
                  >
                    Remove from Cart
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
        <div>
          <h1>address</h1>
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900">
              총 가격: ${totalPrice.toFixed(2)}
            </h3>
            <button
              onClick={handleOrder}
              className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg"
            >
              전체 주문하기
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default CartPage;
