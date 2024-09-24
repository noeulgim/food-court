import Snb from "@/components/layout/Snb";
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Header = lazy(() => import("@/components/layout/Header"));
const HomePage = lazy(() => import("@/pages/HomePage"));
const SearchPage = lazy(() => import("@/pages/SearchPage"));
const MyRecipePage = lazy(() => import("@/pages/MyRecipePage"));
const RecipePage = lazy(() => import("@/pages/RecipePage"));
const SaladPage = lazy(() => import("@/pages/SaladPage"));
const MySaladPage = lazy(() => import("@/pages/MySaladPage"));
const RegularItemsPage = lazy(() => import("@/pages/RegularItemsPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const CartPage = lazy(() => import("@/pages/CartPage"));
const OrderPage = lazy(() => import("@/pages/OrderPage"));
const MyPage = lazy(() => import("@/pages/MyPage"));

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <Snb />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/recipe" element={<RecipePage />} />
          <Route path="/myrecipe" element={<MyRecipePage />} />
          <Route path="/salad" element={<SaladPage />} />
          <Route path="/mySalad" element={<MySaladPage />} />
          <Route path="/regularItems" element={<RegularItemsPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
