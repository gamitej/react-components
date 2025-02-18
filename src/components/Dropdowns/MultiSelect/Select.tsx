import React, { useEffect, useState } from "react";

const Select = () => {
  const [searchInput, setSeachInput] = useState<string>("");
  const [suggestion, setSuggestion] = useState([]);

  useEffect(() => {
    const fetchSugg = async () => {
      const url = `http://dummyjson.com/users/search?q=${searchInput}`;

      const res = await fetch(url);
      const data = await res.json();

      console.log(data);
    };

    fetchSugg();
  }, [searchInput]);

  /**
   * TSX
   */
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <input
        type="text"
        value={searchInput}
        placeholder="enter search..."
        className="w-full px-4 py-3 rounded-md focus:outline-0 focus:ring-2 focus:ring-blue-300 text-2xl"
        onChange={(e) => setSeachInput(e.target.value)}
      />
      <div></div>
    </div>
  );
};

export default Select;
