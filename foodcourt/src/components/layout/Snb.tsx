import { useAuthStore } from "@/zustand/useAuthStore";
import LoginButton from "../button/LoginButton";

const Snb: React.FC = () => {
  const { user, logout } = useAuthStore();

  const handleNavigation = (path: string) => {
    window.location.href = path; // Navigate and refresh the page
  };

  return (
    <div
      style={{
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        left: "0",
        background: "#f9f9f9",
        width: "20%",
        height: "100vh",
        top: "0",
        paddingTop: "96px",
      }}
    >
      <div className="h-full flex flex-col justify-between p-4">
        <div>
          <div
            className="block w-full cursor-pointer rounded-lg p-4 transition duration-150 hover:bg-neutral-100 hover:text-neutral-500 focus:bg-neutral-100 focus:text-neutral-500 focus:ring-0 dark:hover:bg-neutral-600 dark:hover:text-neutral-200 dark:focus:bg-neutral-600 dark:focus:text-neutral-200"
            onClick={() => handleNavigation("/recipe")}
          >
            레시피
          </div>
          <div
            className="block w-full cursor-pointer rounded-lg p-4 transition duration-150 hover:bg-neutral-100 hover:text-neutral-500 focus:bg-neutral-100 focus:text-neutral-500 focus:ring-0 dark:hover:bg-neutral-600 dark:hover:text-neutral-200 dark:focus:bg-neutral-600 dark:focus:text-neutral-200"
            onClick={() => handleNavigation("/myrecipe")}
          >
            나의 레시피
          </div>
          <div
            className="block w-full cursor-pointer rounded-lg p-4 transition duration-150 hover:bg-neutral-100 hover:text-neutral-500 focus:bg-neutral-100 focus:text-neutral-500 focus:ring-0 dark:hover:bg-neutral-600 dark:hover:text-neutral-200 dark:focus:bg-neutral-600 dark:focus:text-neutral-200"
            onClick={() => handleNavigation("/salad")}
          >
            샐러드
          </div>
          <div
            className="block w-full cursor-pointer rounded-lg p-4 transition duration-150 hover:bg-neutral-100 hover:text-neutral-500 focus:bg-neutral-100 focus:text-neutral-500 focus:ring-0 dark:hover:bg-neutral-600 dark:hover:text-neutral-200 dark:focus:bg-neutral-600 dark:focus:text-neutral-200"
            onClick={() => handleNavigation("/mySalad")}
          >
            나의샐러드
          </div>
          <div
            className="block w-full cursor-pointer rounded-lg p-4 transition duration-150 hover:bg-neutral-100 hover:text-neutral-500 focus:bg-neutral-100 focus:text-neutral-500 focus:ring-0 dark:hover:bg-neutral-600 dark:hover:text-neutral-200 dark:focus:bg-neutral-600 dark:focus:text-neutral-200"
            onClick={() => handleNavigation("/regularItems")}
          >
            정기배송상품
          </div>
        </div>
        <div>
          <div
            className="block w-full cursor-pointer rounded-lg p-4 transition duration-150 hover:bg-neutral-100 hover:text-neutral-500 focus:bg-neutral-100 focus:text-neutral-500 focus:ring-0 dark:hover:bg-neutral-600 dark:hover:text-neutral-200 dark:focus:bg-neutral-600 dark:focus:text-neutral-200"
            onClick={() => handleNavigation("/search")}
          >
            음식/재료
          </div>
          <div className="block w-full cursor-pointer rounded-lg p-4 transition duration-150 hover:bg-neutral-100 hover:text-neutral-500 focus:bg-neutral-100 focus:text-neutral-500 focus:ring-0 dark:hover:bg-neutral-600 dark:hover:text-neutral-200 dark:focus:bg-neutral-600 dark:focus:text-neutral-200">
            즐겨찾는 음식/재료
          </div>
          <div className="block w-full cursor-pointer rounded-lg p-4 transition duration-150 hover:bg-neutral-100 hover:text-neutral-500 focus:bg-neutral-100 focus:text-neutral-500 focus:ring-0 dark:hover:bg-neutral-600 dark:hover:text-neutral-200 dark:focus:bg-neutral-600 dark:focus:text-neutral-200">
            구독 관리
          </div>
        </div>
        <div>
          <div className="block w-full cursor-pointer rounded-lg p-4 transition duration-150 hover:bg-neutral-100 hover:text-neutral-500 focus:bg-neutral-100 focus:text-neutral-500 focus:ring-0 dark:hover:bg-neutral-600 dark:hover:text-neutral-200 dark:focus:bg-neutral-600 dark:focus:text-neutral-200">
            마이 페이지
          </div>
          <div className="block w-full cursor-pointer rounded-lg p-4 transition duration-150 hover:bg-neutral-100 hover:text-neutral-500 focus:bg-neutral-100 focus:text-neutral-500 focus:ring-0 dark:hover:bg-neutral-600 dark:hover:text-neutral-200 dark:focus:bg-neutral-600 dark:focus:text-neutral-200">
            주문 내역
          </div>
          <div className="block w-full cursor-pointer rounded-lg p-4 transition duration-150 hover:bg-neutral-100 hover:text-neutral-500 focus:bg-neutral-100 focus:text-neutral-500 focus:ring-0 dark:hover:bg-neutral-600 dark:hover:text-neutral-200 dark:focus:bg-neutral-600 dark:focus:text-neutral-200">
            자주 주문
          </div>
          <div className="block w-full cursor-pointer rounded-lg p-4 transition duration-150 hover:bg-neutral-100 hover:text-neutral-500 focus:bg-neutral-100 focus:text-neutral-500 focus:ring-0 dark:hover:bg-neutral-600 dark:hover:text-neutral-200 dark:focus:bg-neutral-600 dark:focus:text-neutral-200">
            회원 정보 수정
          </div>
        </div>
      </div>
    </div>
  );
};

export default Snb;
