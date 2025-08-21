import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Dashboard() {
  const [availability, setAvailability] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    // Fetch availability overview
    fetch("http://localhost:5000/api/products/feat/availability")
      .then((res) => res.json())
      .then((data) => setAvailability(data));

    // Fetch low stock products
    fetch("http://localhost:5000/api/products/feat//low-stock")
      .then((res) => res.json())
      .then((data) => setLowStock(data));

    // Fetch category-wise data
    fetch("http://localhost:5000/api/products/feat/category-distribution")
      .then((res) => res.json())
      .then((data) => setCategoryData(data));
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
  <div>
    <Header />
    <div className="p-6 space-y-8">
      {/* Availability Overview */}
      <div className="bg-white p-4 shadow rounded-lg">
        <h2 className="text-lg font-bold mb-4">Product Availability Overview</h2>
        <ul>
          {availability.map((cat, idx) => (
            <li key={idx} className="flex justify-between border-b py-2">
              <span className="font-medium">{cat.category}</span>
              <span>✅ {cat.available} | ❌ {cat.outOfStock}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Low Stock Alerts */}
      <div className="bg-white p-4 shadow rounded-lg">
        <h2 className="text-lg font-bold mb-4 text-red-600">⚠️ Low Stock Alerts</h2>
        {lowStock.length > 0 ? (
          <ul>
            {lowStock.map((p, idx) => (
              <li key={idx} className="flex justify-between text-red-500 font-medium py-1">
                {p.name} <span>({p.quantity} left)</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No low stock items 🎉</p>
        )}
      </div>

      {/* Category-wise Chart */}
      <div className="bg-white p-4 shadow rounded-lg">
        <h2 className="text-lg font-bold mb-4">Stock Distribution by Category</h2>

        <div className="flex gap-8">
          {/* Pie Chart */}
          <PieChart width={300} height={300}>
            <Pie
              data={categoryData}
              dataKey="count"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {categoryData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>

          {/* Bar Chart */}
          <BarChart width={400} height={300} data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
}
