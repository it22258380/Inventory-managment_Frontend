import React from 'react'
import logo from '../assets/logo.png'; 
function Header() {
  return (
    <div>
      <header className="bg-blue-600 text-white shadow-md">
  <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
    
    {/* Logo / Name */}
    <h1 className="text-xl font-bold tracking-wide">Inventory Management</h1>
    
    {/* Navigation */}
    <nav className="hidden md:flex space-x-6">
      <a href="/" className="hover:text-gray-200">Dashboard</a>
      <a href="/manage-products" className="hover:text-gray-200">Manage</a>
      <a href="" className="hover:text-gray-200">Suppliers</a>
      <a href="" className="hover:text-gray-200">Reports</a>
    </nav>
    
    {/* Right Side */}
    <div className="flex items-center space-x-4">
      <img src={logo} alt="logo" className="w-20 h-20 rounded-full" />
    </div>
  </div>
</header>

    </div>
  )
}

export default Header;
