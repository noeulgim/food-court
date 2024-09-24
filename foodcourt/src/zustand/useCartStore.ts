import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Product {
  productId: string;
  lprice: string; // string 형태의 가격
  image: string;
  title: string;
  mallName: string;
  brand: string;
  category: string;
  quantity: number; // 수량
  ingredients: [];
}

interface CartStore {
  cartItems: Product[]; // 장바구니 아이템
  addToCart: (item: Product) => void; // 장바구니에 추가
  removeFromCart: (productId: string) => void; // 장바구니에서 제거
  isInCart: (productId: string) => boolean; // 아이템이 장바구니에 있는지 여부
  updateCartItemQuantity: (productId: string, quantity: number) => void; // 수량 업데이트
}

// 장바구니 상태 저장
export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cartItems: [], // 초기 장바구니 아이템

      // 장바구니에 아이템 추가 (항상 새로운 항목을 추가)
      addToCart: (item) =>
        set((state) => {
          const itemPrice = parseFloat(item.lprice) * item.quantity; // 현재 추가하려는 상품의 총 가격

          // 항상 새로운 아이템을 추가
          return {
            cartItems: [
              ...state.cartItems,
              { ...item, lprice: itemPrice.toString() },
            ],
          };
        }),

      // 장바구니에서 아이템 제거
      removeFromCart: (productId) =>
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => item.productId !== productId
          ),
        })),

      // 아이템이 장바구니에 있는지 여부 확인
      isInCart: (productId) => (state) =>
        state.cartItems.some((cartItem) => cartItem.productId === productId),

      // 장바구니 아이템 수량 업데이트
      updateCartItemQuantity: (productId, quantity) =>
        set((state) => {
          const updatedCartItems = state.cartItems.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          );
          return { cartItems: updatedCartItems };
        }),
    }),

    {
      name: "cart-storage", // 로컬스토리지에 저장할 이름
    }
  )
);
