import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchStore } from "@/zustand/useSearchStore";
import { useNavigate, useLocation } from "react-router-dom";

export const SearchBar: React.FC = () => {
  const { searchResults, setSearchResults, searchTerm, setSearchTerm } =
    useSearchStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!searchValue) return;

    const clientId = import.meta.env.VITE_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_CLIENT_KEY;

    try {
      const response = await fetch(
        `/v1/search/shop.json?query=${encodeURIComponent(searchValue)}&display=10&start=1&sort=sim`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Naver-Client-Id": clientId,
            "X-Naver-Client-Secret": clientSecret,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      console.log(data.items);
      setSearchResults(data.items);
      setSearchTerm(searchValue);
      setSearchValue("");
      navigate(`/search?word=${encodeURIComponent(searchValue)}`); // URL에 검색어 반영
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // 페이지가 변경될 때 searchTerm을 초기화
    if (location.pathname !== "/search") {
      setSearchTerm("");
      setSearchResults("");
    }
  }, [location.pathname, setSearchTerm]);

  return (
    <form
      onSubmit={handleSearch}
      className="flex max-w-sm items-center justify-center space-x-2"
    >
      <Input
        className="w-80"
        type="text"
        placeholder="'김치'"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Button type="submit">Search</Button>
    </form>
  );
};
