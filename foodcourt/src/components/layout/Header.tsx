import React from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"; // useLocation 훅을 import
import NavigationMenu from "../menu/NavigationMenu";
import { SearchBar } from "../bar/searchBar";
import { useAuthStore } from "@/zustand/useAuthStore";
import LoginButton from "../button/LoginButton";

const Header: React.FC = () => {
  const location = useLocation(); // 현재 경로를 가져옴

  const { user, logout } = useAuthStore();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/"); // 로그아웃 후 홈 페이지로 이동
  };

  return (
    <div
      className="fixed w-full h-24 flex justify-center items-center"
      style={{ paddingLeft: "20%", left: "0" }}
    >
      <div className="flex justify-between items-center relative px-16 w-full">
        <div className="flex justify-start">
          <NavigationMenu />
        </div>
        <div className="flex-grow flex justify-center">
          {/* 현재 경로가 '/'가 아닐 때만 SearchBar를 렌더링 */}
          {location.pathname !== "/" && <SearchBar />}
        </div>
        <div className="flex justify-end space-x-8 items-center">
          {user && (
            <Link to="/cart">
              <div className="rounded-full bg-neutral-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </div>
            </Link>
          )}
          <div>
            {user ? (
              <div>
                <button
                  className="block w-full cursor-pointer rounded-lg p-4 text-xl transition duration-500 hover:bg-neutral-100 hover:text-neutral-500 focus:bg-neutral-100 focus:text-neutral-500 focus:ring-0 dark:hover:bg-neutral-600 dark:hover:text-neutral-200 dark:focus:bg-neutral-600 dark:focus:text-neutral-200"
                  onClick={handleLogout}
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <LoginButton />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
