"use client";

import React, { useState } from "react";
import { BiUser } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useCart } from "../app/products/context/CartContext";
import CartModal from "./CartModal";

const HeaderMain = () => {
  const { cart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 border-b border-gray-600 py-4 shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="font-extrabold text-3xl sm:text-4xl text-center sm:text-left pb-4 sm:pb-0 text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500">Small</span>
          <span className="italic text-gray-300">Shop</span>
        </div>

        {/* Search Bar */}
        <div className="w-full sm:w-[300px] md:w-[60%] relative mb-4 sm:mb-0">
          <input
            className="border border-gray-500 bg-gray-800 p-2 px-4 rounded-lg w-full text-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
            type="text"
            placeholder="Search for products..."
          />
          <BsSearch
            className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-400 hover:text-white transition duration-300"
            size={20}
          />
        </div>

        {/* Icons */}
        <div className="flex gap-6 text-white text-2xl">
          <BiUser className="cursor-pointer hover:text-indigo-400 transition duration-300" />

          <div className="relative cursor-pointer hover:text-indigo-400">
            <FiHeart />
            <div
              className="bg-indigo-500 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white flex items-center justify-center translate-x-1 -translate-y-1 shadow-md"
            >
              0
            </div>
          </div>

          <div className="relative cursor-pointer hover:text-indigo-400" onClick={handleCartClick}>
            <HiOutlineShoppingBag />
            <div
              className="bg-indigo-500 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white flex items-center justify-center translate-x-1 -translate-y-1 shadow-md"
            >
              {cart.length}
            </div>
          </div>
        </div>
      </div>

      {/* Cart Modal */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default HeaderMain;
