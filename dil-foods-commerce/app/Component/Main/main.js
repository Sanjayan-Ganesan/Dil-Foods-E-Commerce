'use client'
import React, { useState, useEffect } from "react";

function Main() {
   
 const [records, setRecords] = useState([]);

 useEffect(() => {
   fetch("https://fakestoreapi.com/products")
     .then((res) => res.json())
     .then((data) => setRecords(data))
     .catch((err) => console.error(err));
 }, []);
 

  return (
    <div className="w-full bg-white">
        <div className="flex justify-center mb-15">
        <div className="w-3/5 h-10 flex justify-between items-center">
            <button className="w-28 p-2 bg-black rounded-full border-2 text-white border-black">Men's</button>
            <button className="w-28 p-2 bg-black rounded-full border-2 text-white border-black">Women's</button>
            <button className="w-28 p-2 bg-black rounded-full border-2 text-white border-black">Electronics</button>
            <button className="w-28 p-2 bg-black rounded-full border-2 text-white border-black">Jewelry</button>
        </div>
        </div>
        <div className="w-full grid grid-cols-4 gap-4 mt-11">
            {records.map((item, index) => (
                <div key={index} className="w-full h-full p-4 border border-gray-300 rounded-md shadow-md flex flex-col justify-center items-center">
                    <img src={item.image} alt={item.title} className="w-4/5 h-32 object-cover mb-4"/>
                    <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                    <p className="text-gray-700 mb-2">${item.price}</p>
                    <button className="bg-gradient-to-r from-white via-pink-500 to-red-500 p-2 rounded-md mb-2 shadow-black">Add to Cart</button>
                    {/* You can display other properties as well, e.g., {item.price}, {item.category}, etc. */}
                </div>
            ))}
        </div>
    </div>
  ) 
}

export default Main;
