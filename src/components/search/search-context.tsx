import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import {
  getRecentSearches,
  addRecentSearch as persistRecent,
  clearRecentSearches as clearPersisted,
} from "./mock-data";

type SearchContextType = {
  open: boolean;
  setOpen: (value: boolean) => void;
  toggle: () => void;
  query: string;
  setQuery: (q: string) => void;
  recentSearches: string[];
  addRecentSearch: (term: string) => void;
  clearRecentSearches: () => void;
};

const SearchContext = createContext<SearchContextType | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recents from localStorage on mount
  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  // Reset query when overlay closes
  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  const addRecentSearch = useCallback((term: string) => {
    if (!term.trim()) return;
    persistRecent(term);
    setRecentSearches(getRecentSearches());
  }, []);

  const clearRecentSearches = useCallback(() => {
    clearPersisted();
    setRecentSearches([]);
  }, []);

  return (
    <SearchContext.Provider
      value={{
        open,
        setOpen,
        toggle,
        query,
        setQuery,
        recentSearches,
        addRecentSearch,
        clearRecentSearches,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used inside SearchProvider");
  }
  return context;
}
