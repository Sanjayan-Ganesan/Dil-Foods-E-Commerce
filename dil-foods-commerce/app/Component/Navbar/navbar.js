import React from 'react'
import { TbUserSquareRounded } from "react-icons/tb"; 
import { HiOutlineShoppingCart } from "react-icons/hi";

function Navbar() {
  return (
    <div className="w-full h-20 bg-gradient-to-r from-white via-pink-500 to-red-500 flex justify-between shadow-lg fixed">
      <div className="w-20 h-full mx-5">
        <img src="https://dilfoods.in/wp-content/uploads/2023/04/Dil-Foods-new-logo.png" />
      </div>
      <div className="flex items-center w-20 justify-between me-6"> 
      <TbUserSquareRounded size={30} className="cursor-pointer"/>
      <HiOutlineShoppingCart size={30} className="cursor-pointer" />
      </div>
    </div>
  )
}

export default Navbar