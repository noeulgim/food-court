import Router from "./shared/Router";
import "./App.css";
import { useEffect } from "react";
import { useAuthStore } from "@/zustand/useAuthStore";

const App: React.FC = () => {
  const { setUser } = useAuthStore();
  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보 가져오기
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      setUser(user);
    }
  }, [setUser]);
  return <Router />;
};

export default App;
