import { useState, useEffect } from "react";

const useSearchHistory = (maxHistory: number = 8) => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("searchHistory") || "[]");
      if (Array.isArray(stored)) setSearchHistory(stored);
    } catch {
      setSearchHistory([]);
    }
  }, []);

  const addHistory = (query: string) => {
    if (!query.trim()) return;
    setSearchHistory((prev) => {
      const updated = [query, ...prev.filter((q) => q !== query)].slice(0, maxHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updated));
      return updated;
    });
  };

  const removeHistory = (query: string) => {
    setSearchHistory((prev) => {
      const updated = prev.filter((q) => q !== query);
      localStorage.setItem("searchHistory", JSON.stringify(updated));
      return updated;
    });
  };

  return { searchHistory, addHistory, removeHistory };
};

export default useSearchHistory;
