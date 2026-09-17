"use client";

import { useEffect, useRef, useState, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Loader2, Clock, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchStore } from "@/store/use-search-store";
import { useDebounce } from "@/hooks/use-debounce";
import { LocationInput } from "./location-input";
import type { Service } from "@/types";

export function SearchBar() {
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    location,
    searchQuery,
    setSearchQuery,
    suggestions,
    setSuggestions,
    recentSearches,
    addRecentSearch,
    isLoading,
    setLoading,
    isDropdownOpen,
    setDropdownOpen,
  } = useSearchStore();

  const debouncedQuery = useDebounce(searchQuery, 300);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setDropdownOpen]);

  // Fetch suggestions
  useEffect(() => {
    async function fetchSuggestions() {
      if (!debouncedQuery.trim()) {
        setSuggestions([]);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`/api/services/search?q=${encodeURIComponent(debouncedQuery)}`);
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data.services || []);
        }
      } catch (err) {
        console.error("Failed to fetch suggestions:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSuggestions();
  }, [debouncedQuery, setSuggestions, setLoading]);

  // Handle Keyboard Navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isDropdownOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > -1 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSelectSuggestion(suggestions[selectedIndex]);
      } else {
        handleSearchSubmit(searchQuery);
      }
    } else if (e.key === "Escape") {
      setDropdownOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleSelectSuggestion = (service: Service) => {
    setSearchQuery(service.title);
    addRecentSearch(service.title);
    setDropdownOpen(false);
    router.push(`/services?q=${encodeURIComponent(service.title)}&loc=${encodeURIComponent(location)}`);
  };

  const handleSearchSubmit = (query: string) => {
    if (!query.trim()) return;
    addRecentSearch(query);
    setDropdownOpen(false);
    router.push(`/services?q=${encodeURIComponent(query)}&loc=${encodeURIComponent(location)}`);
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={i} className="text-foreground font-semibold">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <div
      ref={wrapperRef}
      className="relative w-full max-w-4xl mx-auto flex flex-col md:flex-row items-stretch gap-3 z-40"
    >
      <LocationInput />

      {/* Search Input Section */}
      <div className="relative flex-1 flex items-center h-14 bg-card border border-border shadow-sm hover:shadow-md transition-shadow rounded-xl">
        <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setDropdownOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setDropdownOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search for 'AC Repair', 'Cleaning'..."
          className="w-full h-full pl-12 pr-14 bg-transparent border-none text-base focus:outline-none focus:ring-0"
        />
        
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery("");
              inputRef.current?.focus();
            }}
            className="absolute right-3 h-8 w-8 flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Dropdown Suggestions */}
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-3 bg-card/95 backdrop-blur-xl border border-border shadow-xl rounded-2xl overflow-hidden py-3 min-h-[100px]"
          >
            {isLoading && searchQuery.trim() ? (
              <div className="flex items-center justify-center p-8 text-muted-foreground">
                <Loader2 className="h-6 w-6 animate-spin mr-3 text-accent" />
                <span>Searching for services...</span>
              </div>
            ) : searchQuery.trim() ? (
              // Active Search Results
              suggestions.length > 0 ? (
                <div className="flex flex-col">
                  {suggestions.map((service, idx) => (
                    <button
                      key={service.id}
                      onClick={() => handleSelectSuggestion(service)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between px-6 py-3 text-left transition-colors ${
                        selectedIndex === idx ? "bg-muted" : "hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {highlightMatch(service.title, searchQuery)}
                          </p>
                          <p className="text-xs text-muted-foreground/60 mt-0.5">
                            in {service.categoryName}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  No services found matching &quot;{searchQuery}&quot;
                </div>
              )
            ) : (
              // Empty State: Recent & Popular
              <div className="flex flex-col md:flex-row">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div className="flex-1 p-6 border-b md:border-b-0 md:border-r border-border">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Clock className="h-4 w-4" /> Recent Searches
                    </h4>
                    <div className="space-y-1">
                      {recentSearches.map((query, idx) => (
                         <button
                           key={idx}
                           onClick={() => handleSearchSubmit(query)}
                           className="flex items-center gap-3 w-full p-2.5 rounded-lg hover:bg-muted text-sm text-left transition-colors"
                         >
                           <Clock className="h-4 w-4 text-muted-foreground/60" />
                           <span className="text-foreground">{query}</span>
                         </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Popular Services */}
                <div className="flex-1 p-6">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" /> Popular Services
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {["Deep Home Cleaning", "AC Service & Repair", "Part-Time Maid", "Plumbing Repair"].map((pop) => (
                      <button
                        key={pop}
                        onClick={() => handleSearchSubmit(pop)}
                        className="p-2.5 rounded-lg border border-border bg-muted/30 hover:bg-muted hover:border-accent/30 text-sm text-left transition-all group"
                      >
                         <span className="text-muted-foreground group-hover:text-foreground transition-colors">{pop}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
