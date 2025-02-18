import { useEffect, useRef, useState } from "react";
import Pill from "./Pill";

const Select = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [suggestion, setSuggestion] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchSuggestion = async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/users/search?q=${searchInput}`
        );
        const data = await res.json();
        const nameList = data?.users?.map(
          ({ firstName, lastName }: { firstName: string; lastName: string }) =>
            `${firstName} ${lastName}`
        );
        setSuggestion(nameList || []);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestion([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchInput.trim() !== "") {
      setIsLoading(true);
      fetchSuggestion();
    } else {
      setIsLoading(false);
      setSuggestion([]);
    }
  }, [searchInput]);

  const handleSelect = (name: string) => {
    if (!selectedUsers.has(name)) {
      setSelectedOptions((prev) => [...prev, name]);
      setSelectedUsers(new Set([...selectedUsers, name]));
    }

    setSearchInput("");
    inputRef.current?.focus();
  };

  const handleRemove = (name: string) => {
    setSelectedOptions((prev) => prev.filter((item) => item !== name));
    setSelectedUsers((prev) => {
      const newSet = new Set(prev);
      newSet.delete(name);
      return newSet;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && searchInput === "") {
      setSelectedOptions((prev) => prev.slice(0, -1));
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      {/* ================ Input Container ================ */}
      <div className="w-full relative text-xl shadow-sm border rounded-md px-2 bg-white flex flex-wrap items-center">
        {/* =============== Selected Options ================ */}
        <div className="flex items-center gap-2 flex-wrap py-1">
          {selectedOptions.map((option, idx) => (
            <Pill
              key={idx}
              text={option}
              onClick={() => handleRemove(option)}
            />
          ))}
        </div>

        {/* =============== Input Field ================ */}
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            spellCheck="false"
            value={searchInput}
            onKeyDown={handleKeyDown}
            placeholder="Enter search..."
            className="p-2 focus:outline-none w-full"
            onChange={(e) => setSearchInput(e.target.value)}
          />

          {/* =============== Suggestion List ================ */}
          {suggestion.length > 0 && (
            <div className="absolute left-0 mt-2 w-full top-full bg-white rounded-md shadow-lg border">
              <div className="max-h-[15rem] overflow-auto flex flex-col">
                {!isLoading &&
                  suggestion.map((name) =>
                    selectedUsers.has(name) ? null : (
                      <p
                        key={name}
                        className="py-2 px-6 cursor-pointer hover:bg-gray-300"
                        onClick={() => handleSelect(name)}
                      >
                        {name}
                      </p>
                    )
                  )}
                {isLoading && (
                  <span className="w-full text-gray-600 text-center py-2">
                    Loading...
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Select;
