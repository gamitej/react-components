import { useEffect, useState } from "react";

const Select = () => {
  const [suggestion, setSuggestion] = useState([]);
  const [searchInput, setSeachInput] = useState<string>("");

  useEffect(() => {
    const fetchSugg = async () => {
      const res = await fetch(
        `http://dummyjson.com/users/search?q=${searchInput}`
      );
      const data = await res.json();
      const nameList = data?.users?.map(
        ({ firstName, lastName }: { firstName: string; lastName: string }) =>
          `${firstName} ${lastName}`
      );
      setSuggestion(nameList);
    };
    if (searchInput.trim() !== "") fetchSugg();
  }, [searchInput]);

  /**
   * TSX
   */
  return (
    <div className="relative w-full flex flex-col justify-center items-center">
      <input
        type="text"
        spellCheck="false"
        value={searchInput}
        placeholder="enter search..."
        onChange={(e) => setSeachInput(e.target.value)}
        className="w-full px-4 py-3 rounded-md focus:outline-0 focus:ring-2 focus:ring-blue-300 text-2xl shadow-sm"
      />
      <div className="absolute w-full top-[4rem] max-h-[15rem] overflow-auto flex flex-col justify-center items-center bg-white rounded-md shadow-sm">
        {suggestion.map((name) => (
          <p key={name} className="py-2">
            {name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Select;
