"use client";
import React, { useState } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { TbUserSquareRounded } from "react-icons/tb";
import './navbar.css';
import { IoMdClose } from "react-icons/io";

function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  return (
    <div className="w-full h-20 bg-gradient-to-r from-white via-pink-500 to-red-500 flex justify-between shadow-lg fixed">
      <div className="w-20 h-full mx-5">
        <img
          src="https://dilfoods.in/wp-content/uploads/2023/04/Dil-Foods-new-logo.png"
          alt="Company Logo"
        />
      </div>
      {!isCartOpen && (
        <div className="flex items-center w-20 justify-between me-6">
          <TbUserSquareRounded size={30} className="cursor-pointer" />
          <HiOutlineShoppingCart
            size={30}
            className="cursor-pointer"
            onClick={handleCartClick}
          />
        </div>
      )}
      {isCartOpen && (
        <div className="cart-container">
          <div className="flex justify-between items-center mb-20">
            <h1 className="text-lg">Cart</h1>
            <IoMdClose
              size={30}
              className="cursor-pointer"
              onClick={handleCartClose}
            />
          </div>
          <div className="flex justify-center flex-col items-center">
            <h2>Your Cart is Empty</h2>
            <img src="https://assets.materialup.com/uploads/16e7d0ed-140b-4f86-9b7e-d9d1c04edb2b/preview.png" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
