import { useSaladStore } from "@/zustand/useSaladStore";
import { useState } from "react";
import CustomSaladModal from "@/components/modal/CustomSaladModal";
import AddCartModal from "@/components/modal/AddCartModal"; // AddCartModal 가져오기

interface Salad {
  productId: string; // productId를 추가
  name: string;
  image: string;
  basePrice: number;
}

const MySaladPage: React.FC = () => {
  const { customSalads, removeSalad, updateSalad, addSalad } = useSaladStore(); // addSalad 가져오기
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSalad, setEditingSalad] = useState<{
    name: string;
    ingredients: any[];
  } | null>(null);
  const [isAddCartModalOpen, setIsAddCartModalOpen] = useState(false); // AddCartModal 상태
  const [selectedSalad, setSelectedSalad] = useState<Salad | null>(null);

  const handleOpenModal = () => {
    setEditingSalad(null); // 새로운 샐러드를 추가할 때는 초기화
    setIsModalOpen(true);
  };

  const handleSaveSalad = (
    salad: { name: string; ingredients: any[] },
    isEditing: boolean
  ) => {
    if (isEditing && editingSalad) {
      updateSalad(editingSalad.name, salad); // 기존 샐러드 업데이트
    } else {
      const newSalad = { ...salad, productId: Date.now().toString() }; // 새 샐러드 추가 시 productId 설정
      addSalad(newSalad); // 새 샐러드 추가
    }
    setIsModalOpen(false);
    console.log(salad);
  };

  const handleEditSalad = (salad: {
    name: string;
    ingredients: any[];
    productId: string;
  }) => {
    setEditingSalad(salad);
    setIsModalOpen(true);
  };

  const handleAddToCart = (salad: { name: string; ingredients: any[] }) => {
    setSelectedSalad(salad); // 선택한 샐러드 저장
    setIsAddCartModalOpen(true); // AddCartModal 열기
  };

  const handleRemoveSalad = (saladProductId: string) => {
    const confirmDelete = window.confirm("이 샐러드를 삭제하시겠습니까?");
    if (confirmDelete) {
      removeSalad(saladProductId); // productId를 사용하여 삭제
    }
  };

  return (
    <div className="pt-16">
      <h1>My Custom Salads</h1>
      <button
        onClick={handleOpenModal}
        className="bg-green-500 text-white py-2 px-4 rounded-lg"
      >
        샐러드 추가하기
      </button>

      <div className="mt-4 grid grid-cols-1 gap-4">
        {customSalads.map((salad) => {
          const totalPrice = salad.ingredients.reduce(
            (acc, ing) => acc + ing.price,
            0
          );
          return (
            <div key={salad.productId} className="border p-4 rounded-lg">
              {" "}
              {/* key를 productId로 설정 */}
              <h2 className="text-lg font-bold">{salad.name}</h2>
              <p>총 가격: {totalPrice}원</p>
              <p>재료:</p>
              <ul>
                {salad.ingredients.map((ing) => (
                  <li key={ing.id}>
                    {ing.name} (+{ing.price}원)
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleEditSalad(salad)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                >
                  수정
                </button>
                <button
                  onClick={() => handleRemoveSalad(salad.productId)} // productId를 사용하여 삭제
                  className="bg-red-500 text-white py-2 px-4 rounded-lg"
                >
                  삭제
                </button>
                <button
                  onClick={() => handleAddToCart(salad)} // 장바구니 추가 버튼
                  className="bg-yellow-500 text-white py-2 px-4 rounded-lg"
                >
                  장바구니에 추가
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <CustomSaladModal
          onClose={() => setIsModalOpen(false)}
          onSaveSalad={handleSaveSalad}
          editingSalad={editingSalad}
        />
      )}

      {selectedSalad && ( // selectedSalad가 정의된 경우에만 AddCartModal을 렌더링
        <AddCartModal
          open={isAddCartModalOpen}
          onClose={() => setIsAddCartModalOpen(false)} // 상태 닫기 수정
          contents={selectedSalad} // 샐러드 정보 전달
          category="샐러드" // 적절한 카테고리 지정
        />
      )}
    </div>
  );
};

export default MySaladPage;
