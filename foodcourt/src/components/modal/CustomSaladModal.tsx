import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";

interface CustomSaladModalProps {
  onClose: () => void;
  onSaveSalad: (
    salad: {
      name: string;
      ingredients: any[];
      id: string;
      image: string;
      basePrice: number;
    },
    isEditing?: boolean
  ) => void;
  editingSalad?: { name: string; ingredients: any[]; id: string } | null; // 수정 중인 샐러드
}

const CustomSaladModal: React.FC<CustomSaladModalProps> = ({
  onClose,
  onSaveSalad,
  editingSalad,
}) => {
  const [selectedIngredients, setSelectedIngredients] = useState<any[]>([]);
  const [saladName, setSaladName] = useState("");
  const [totalPrice, setTotalPrice] = useState(0); // 샐러드 가격
  const [isNameError, setIsNameError] = useState(false); // 이름 오류 상태

  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      const response = await fetch("http://localhost:4000/ingredients");
      const data = await response.json();
      setIngredients(data);
    };
    fetchIngredients();
  }, []);

  useEffect(() => {
    if (editingSalad) {
      setSaladName(editingSalad.name); // 수정할 샐러드 이름 설정
      setSelectedIngredients(editingSalad.ingredients); // 수정할 샐러드 재료 설정
    } else {
      setSaladName(""); // 새 샐러드 추가일 경우 초기화
      setSelectedIngredients([]);
    }
  }, [editingSalad]);

  // 재료 선택/해제 시 가격 업데이트
  useEffect(() => {
    const price = selectedIngredients.reduce(
      (acc, ingredient) => acc + ingredient.price,
      0
    );
    setTotalPrice(price); // 선택된 재료들의 총합 가격
  }, [selectedIngredients]);

  const toggleIngredientSelection = (ingredient: any) => {
    setSelectedIngredients((prev) =>
      prev.some((ing) => ing.id === ingredient.id)
        ? prev.filter((ing) => ing.id !== ingredient.id)
        : [...prev, ingredient]
    );
  };

  const handleSaveSalad = () => {
    if (!saladName) {
      setIsNameError(true);
    } else {
      const newSalad = {
        name: saladName,
        ingredients: selectedIngredients,
        id: Date.now().toString(), // 고유 ID 생성
        image: "default-image-url.jpg", // 기본 이미지 URL
        basePrice: totalPrice, // 총 가격
      };
      onSaveSalad(newSalad, !!editingSalad);
      setIsNameError(false);
      onClose(); // Save 후 모달을 닫음
    }
  };

  return (
    <Dialog open onClose={onClose} className="relative z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-30"></div>
      <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-lg font-semibold">
            {editingSalad ? "Edit Custom Salad" : "Create Custom Salad"}
          </h2>
          <input
            type="text"
            value={saladName}
            onChange={(e) => {
              setSaladName(e.target.value);
              if (e.target.value) setIsNameError(false); // 이름을 입력하면 오류 상태 해제
            }}
            placeholder="Salad Name"
            className={`mt-2 border p-2 rounded-lg ${
              isNameError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {isNameError && (
            <p className="text-red-500 text-sm mt-1">
              샐러드 이름을 입력하세요.
            </p>
          )}
          <div className="mt-4">
            <h3 className="font-semibold">Select Ingredients:</h3>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {ingredients.map((ingredient) => (
                <label key={ingredient.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedIngredients.some(
                      (ing) => ing.id === ingredient.id
                    )} // 수정 시 체크 상태 유지
                    onChange={() => toggleIngredientSelection(ingredient)}
                    className="mr-2"
                  />
                  {ingredient.name} (+{ingredient.price}원)
                </label>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <p className="text-lg font-bold">Total Price: {totalPrice}원</p>
            {totalPrice < 3000 && (
              <p className="text-red-500">
                샐러드를 추가하려면 최소 3,000원 이상의 재료를 선택해야 합니다.
              </p>
            )}
          </div>

          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveSalad}
              className={`py-2 px-4 rounded-lg ${
                totalPrice >= 3000
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={totalPrice < 3000} // 가격이 3000원 미만일 경우만 비활성화
            >
              {editingSalad ? "Save Changes" : "Add Salad"}
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default CustomSaladModal;
