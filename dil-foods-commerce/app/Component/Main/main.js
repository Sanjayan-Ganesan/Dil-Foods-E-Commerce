'use client'
import React, { useState, useEffect } from "react";

function Main() {
  const [records, setRecords] = useState([]);
  const [sortingOption, setSortingOption] = useState("Recommended");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl =
      selectedCategory === "all"
        ? "https://fakestoreapi.com/products"
        : `https://fakestoreapi.com/products/category/${encodeURIComponent(
            selectedCategory
          )}`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setRecords(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [selectedCategory]);

  const handleSortingChange = (event) => {
    setSortingOption(event.target.value);
  };

  const getSortedRecords = () => {
    switch (sortingOption) {
      case "HighPrice":
        return [...records].sort((a, b) => b.price - a.price);
      case "LowPrice":
        return [...records].sort((a, b) => a.price - b.price);
      default:
        return records;
    }
  };

  return (
    <div className="w-full bg-white">
      <div className="flex justify-center mb-5">
        <div className="w-3/5 h-10 flex justify-between items-center">
          <button
            className="w-28 p-2 bg-black rounded-full border-2 text-white border-black"
            onClick={() => setSelectedCategory("men's clothing")}
          >
            Men's
          </button>
          <button
            className="w-28 p-2 bg-black rounded-full border-2 text-white border-black"
            onClick={() => setSelectedCategory("women's clothing")}
          >
            Women's
          </button>
          <button
            className="w-28 p-2 bg-black rounded-full border-2 text-white border-black"
            onClick={() => setSelectedCategory("electronics")}
          >
            Electronics
          </button>
          <button
            className="w-28 p-2 bg-black rounded-full border-2 text-white border-black"
            onClick={() => setSelectedCategory("jewelery")}
          >
            Jewelry
          </button>

          <button
            className="w-28 p-2 bg-black rounded-full border-2 text-white border-black"
            onClick={() => setSelectedCategory("all")}
          >
            All
          </button>
        </div>
      </div>
      <div className="w-full mt-10">
        <select
          name="sorting"
          id="sorting"
          className="border-2 border-black"
          value={sortingOption}
          onChange={handleSortingChange}
        >
          <option value="Recommended">Sort by Recommendation</option>
          <option value="HighPrice">Sort From High to Low (Price)</option>
          <option value="LowPrice">Sort From Low to High (Price)</option>
        </select>
      </div>
      <div className="w-full grid grid-cols-4 gap-4 mt-11">
        {getSortedRecords().map((item, index) => (
          <div
            key={index}
            className="w-full h-full p-4 border border-gray-300 rounded-md shadow-md flex flex-col justify-center items-center"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-4/5 h-32 object-cover mb-4"
            />
            <p className="text-sm font-medium line-clamp-1">{item.title}</p>
            <p className="text-gray-700 mb-2">${item.price}</p>
            <button className="bg-gradient-to-r from-white via-pink-500 to-red-500 p-2 rounded-md mb-2 shadow-black">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;
