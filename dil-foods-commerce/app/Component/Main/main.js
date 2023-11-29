"use client";
import React, { useState, useEffect } from "react";
import Modal from "./modal";
import CartModal from "./cartmodal";
import { MdDelete } from "react-icons/md";

function Main() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalCartOpen, setModalCartOpen] = useState(false);
  const [selectedProductCart, setSelectedProductCart] = useState(null);
  const [records, setRecords] = useState([]);
  const [sortingOption, setSortingOption] = useState("Recommended");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [counters, setCounters] = useState(1);

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

  const IncreaseCounter = () => {
    if (counters >= 1) {
      setCounters(counters + 1);
    } else {
      setCounters(1);
    }
  };

  const DecreaseCounter = () => {
    if (counters >= 1) {
      setCounters(counters - 1);
    } else {
      setCounters(1);
    }
  };

  const handelOpenModalProduct = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const handelOpenModalCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      return updatedCart;
    });

    setSelectedProductCart(product);
    setModalCartOpen(true);
  };

  const handelCloseModal = () => {
    setModalCartOpen(false);
    setModalOpen(false);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalCartOpen(false);
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

  const handleremoveProductcart = () => {
    console.log("handleRemoveProduct");
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
            onClick={() => handelOpenModalProduct(item)}
            key={index}
            className="w-full cursor-pointer h-full p-4 border border-gray-300 rounded-md shadow-md flex flex-col justify-center items-center"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-4/5 h-32 object-cover mb-4"
            />
            <p className="text-sm font-medium line-clamp-1">{item.title}</p>
            <p className="text-gray-700 mb-2">${item.price}</p>
            <button
              onClick={() => handelOpenModalCart(item)}
              className="bg-gradient-to-r from-white via-pink-500 to-red-500 p-2 rounded-md mb-2 shadow-black"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      {modalOpen && selectedProduct && (
        <Modal onClose={closeModal}>
          {/* Content for the modal */}
          <div className="w-full h-full">
            <div className="flex h-full justify-between gap-10">
              <div className="flex h-full items-center">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="h-72 object-cover mb-4"
                />
              </div>
              <div className="me-10 w-2/4 h-full items-center justify-center flex flex-col">
                <h1 className="text-4xl text-center font-bold line-clamp-1 mb-4">
                  {selectedProduct.title}
                </h1>
                <p className="text-center mb-4">
                  {selectedProduct.description}
                </p>
                <p className="text-center mb-4">
                  Rating: {selectedProduct.rating.rate}
                </p>
                <button
                  onClick={() => handelOpenModalCart(selectedProduct)}
                  className="w-full text-white font-semibold bg-gradient-to-r from-white via-pink-500 to-red-500 p-2 rounded-md mb-2 shadow-black"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {modalCartOpen && selectedProductCart && (
        <CartModal onClose={handelCloseModal}>
          {/* Content for the modal */}
          <div className="flex flex-col justify-center h-full w-full">
            <div className="w-full h-11/12">
              <div className="flex h-full justify-between flex-col">
                {cart.map((item, index) => {
                  return (
                    <div key={index} className="mb-4">
                      <div className="w-full h-24 flex bg-white rounded-lg shadow-2xl justify-between items-center px-8">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full object-cover"
                        />
                        <p className="text-xl text-center font-bold line-clamp-0.1">{item.title}</p>
                        <p className="text-xl text-center font-bold line-clamp-0.1">${item.price * counters}</p>
                        <div className="w-20 flex justify-center gap-4 border-2 border-black rounded-xl"><button onClick={IncreaseCounter}>+</button><span>{counters}</span><button onClick={DecreaseCounter}>-</button></div>
                      </div>                      
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CartModal>
      )}
    </div>
  );
}

export default Main;
