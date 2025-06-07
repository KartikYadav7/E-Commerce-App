import React, { useState } from 'react';
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
    const{user,Logout} = useAuth();

  return (
    <>
    <nav className="py-4 px-6">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="font-bold text-4xl text-black">ECOMMERCE</div>

        {/* Hamburger Icon (mobile only) */}
        <div className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Center Nav Links - hidden on small screens */}
        <ul className="hidden md:flex gap-x-6 font-semibold text-black list-none">
          <li className='cursor-pointer '>Category</li>
          <li className='cursor-pointer'>Sales</li>
          <li className='cursor-pointer'>Clearance</li>
          <li className='cursor-pointer'>New Stock</li>
          <li className='cursor-pointer'>Trending</li>
        </ul>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-x-6 flex-col">
          <ul className="flex gap-x-4 text-sm list-none">
            <li>Help</li>
            <li>Orders & Returns</li>
            <li className='cursor-pointer' onClick={Logout}>{`Hi, ${user.userName}`}</li>
          </ul>
          <div className="flex gap-x-3 text-lg">
            <FaSearch />
            <FaShoppingCart />
          </div>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4">
          <ul className="flex flex-col gap-y-2 font-semibold text-black list-none">
            <li>Category</li>
            <li>Sales</li>
            <li>Clearance</li>
            <li>New Stock</li>
            <li>Trending</li>
          </ul>
          <ul className="flex flex-col gap-y-1 text-sm mt-4 list-none">
            <li>Help</li>
            <li>Orders & Returns</li>
            <li >{`Hi, ${user.userName}`}</li>
          </ul>
          <div className="flex gap-x-4 mt-2 text-lg">
            <FaSearch />
            <FaShoppingCart />
          </div>
        </div>
      )}
    </nav>
    <p className='bg-gray-100 text-center p-2'><span className='text-black font-bold'>&lt;</span> Get 10% off on business sign up <span className='text-black font-bold'>&gt;</span> </p>
    </>
  );
};

export default Header;
