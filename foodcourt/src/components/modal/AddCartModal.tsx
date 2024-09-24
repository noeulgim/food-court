import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useCartStore } from "@/zustand/useCartStore";
import DialogModal from "./DialogModal";
import QuantityAdjuster from "../button/QuantityAdjuster";

interface AddCartModalProps {
  open: boolean;
  onClose: () => void;
  contents: {
    id: number;
    name: string;
    basePrice: number;
    image: string;
  };
  category: string;
  children: React.ReactNode;
}

interface Ingredient {
  id: number;
  name: string;
  category: string;
  price: number;
}

const AddCartModal: React.FC<AddCartModalProps> = ({
  open,
  onClose,
  contents,
  category,
  children,
}) => {
  const { addToCart } = useCartStore();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    []
  );
  const [ingredientQuantities, setIngredientQuantities] = useState<{
    [key: number]: number;
  }>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      const response = await fetch("http://localhost:4000/ingredients");
      const data: Ingredient[] = await response.json();
      setIngredients(data);
    };
    fetchIngredients();
  }, []);

  const totalPrice =
    quantity * contents.basePrice +
    selectedIngredients.reduce(
      (sum, ing) => sum + ing.price * (ingredientQuantities[ing.id] || 1),
      0
    );

  const handleAddToCart = () => {
    if (quantity <= 0) {
      setErrorMessage("수량은 1 이상이어야 합니다.");
      setQuantity(1);
      return;
    }

    const itemToAdd = {
      productId: contents.id,
      lprice: totalPrice,
      image: contents.image,
      title: contents.name,
      category,
      quantity: quantity,
      ingredients: selectedIngredients.map((ing) => ({
        ...ing,
        quantity: ingredientQuantities[ing.id] || 1,
      })),
    };

    addToCart(itemToAdd);

    // DialogModal 열기
    setDialogOpen(true); // DialogModal을 여는 상태 설정
    onClose(); // AddCartModal 닫기
  };

  const handleIngredientToggle = (ingredient: Ingredient) => {
    setSelectedIngredients((prevSelected) => {
      if (prevSelected.includes(ingredient)) {
        // 이미 선택된 경우, 선택 해제
        const newSelected = prevSelected.filter(
          (ing) => ing.id !== ingredient.id
        );
        const { [ingredient.id]: _, ...rest } = ingredientQuantities; // 해당 재료의 수량 제거
        setIngredientQuantities(rest);
        return newSelected;
      } else {
        // 새로 선택된 경우
        return [...prevSelected, ingredient];
      }
    });
  };

  const handleIngredientQuantityChange = (
    ingredient: Ingredient,
    qty: number
  ) => {
    setIngredientQuantities((prevQuantities) => ({
      ...prevQuantities,
      [ingredient.id]: qty,
    }));
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-30 transition-opacity" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      샐러드 옵션 선택
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        재료를 추가하여 나만의 샐러드를 만드세요!
                      </p>
                    </div>
                  </div>
                </div>

                {/* 재료 선택 리스트 */}
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-700">
                    추가할 재료
                  </h4>
                  <div className="flex flex-wrap mt-2">
                    {ingredients.map((ingredient) => (
                      <div
                        key={ingredient.id}
                        className="flex items-center mr-4 mb-2"
                      >
                        <label className="flex items-center mr-2">
                          <input
                            type="checkbox"
                            checked={selectedIngredients.includes(ingredient)}
                            onChange={() => handleIngredientToggle(ingredient)}
                            className="mr-2"
                          />
                          {ingredient.name} (+{ingredient.price}원)
                        </label>
                        {selectedIngredients.includes(ingredient) && (
                          <QuantityAdjuster
                            quantity={ingredientQuantities[ingredient.id] || 1}
                            setQuantity={(qty) =>
                              handleIngredientQuantityChange(ingredient, qty)
                            }
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quantity Adjuster for main item */}
                <QuantityAdjuster
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
                {errorMessage && (
                  <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
                )}
              </div>

              {/* 가격 및 추가 버튼 */}
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  {`추가 (${totalPrice}원)`}
                </button>
                <button
                  type="button"
                  onClick={() => onClose()}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  취소
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <DialogModal open={dialogOpen} onClose={() => setDialogOpen(false)} />{" "}
      {/* DialogModal을 열기 위한 props 전달 */}
    </div>
  );
};

export default AddCartModal;
