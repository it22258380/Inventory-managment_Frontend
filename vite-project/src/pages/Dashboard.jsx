import React, { useEffect, useState } from "react";
import {Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid,ResponsiveContainer  } from "recharts";
import Header from "../components/Header";
import Footer from "../components/Footer";
import dash from '../assets/dash.avif';

export default function Dashboard() {
  const [availability, setAvailability] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    // Fetch availability 
    fetch("http://localhost:5000/api/products/feat/availability")
      .then((res) => res.json())
      .then((data) => setAvailability(data));

    // Fetch low stock
    fetch("http://localhost:5000/api/products/feat/low-stock")
      .then((res) => res.json())
      .then((data) => setLowStock(data));

    // Fetch category-wise data for graph
    fetch("http://localhost:5000/api/products/feat/category-graph")
      .then((res) => res.json())
      .then((data) => setCategoryData(data));
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
  <div 
  className="min-h-screen flex flex-col" 
  style={{ backgroundImage: `url(${dash})`, backgroundSize: "cover", backgroundPosition: "center" }}
>
    <Header />
   {/*graph*/}
    <div className="bg-white p-4 shadow rounded-lg mt-3 w-100 mx-auto ">
  <h2 className="text-lg font-bold mb-4">Stock Distribution by Category</h2>
<div className="w-80 h-80 mt-4">
  <ResponsiveContainer width="100%" height="100%">
  <BarChart data={categoryData}>
    <CartesianGrid strokeDasharray="1 1" />
    <XAxis dataKey="category" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="count" fill="#82ca9d" barSize={30} />
  </BarChart>
</ResponsiveContainer>

</div>

</div>
    <div className="flex justify-center gap-6 mt-6">

      {/* Availability  */}
<div className="bg-white p-2 shadow rounded-lg inline-block">
  <h2 className="text-lg font-bold mb-4">Product Availability Overview</h2>

  <table className="w-20 border-collapse">
    <thead>
      <tr className="bg-gray-100 text-left">
        <th className="px-4 py-2 border">Category</th>
        <th className="px-4 py-2 border">Available</th>
        <th className="px-4 py-2 border">Out of Stock</th>
      </tr>
    </thead>
    <tbody>
      {availability.map((cat, idx) => (
        <tr key={idx} className="hover:bg-gray-50">
          <td className="px-4 py-2 border font-medium">{cat.category}</td>
          <td className="px-4 py-2 border text-green-600">✅ {cat.available}</td>
          <td className="px-4 py-2 border text-red-600">❌ {cat.outOfStock}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      {/* Low Stock  */}
<div className="bg-white p-2 shadow rounded-lg inline-block">
  <h2 className="text-lg font-bold mb-4 text-red-600">⚠️ Low Stock Alerts</h2>
  {lowStock.length > 0 ? (
    <table className="w-20 border-collapse">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="px-4 py-2 border">Product</th>
          <th className="px-4 py-2 border">Quantity Left</th>
        </tr>
      </thead>
      <tbody>
        {lowStock.map((p, idx) => (
          <tr key={idx} className="hover:bg-gray-50">
            <td className="px-4 py-2 border font-medium text-red-500">{p.name}</td>
            <td className="px-4 py-2 border text-red-600 font-semibold">{p.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p className="text-gray-500">No low stock items 🎉</p>
  )}
</div>


      
    </div>
    <Footer />
    </div>
  );
}
