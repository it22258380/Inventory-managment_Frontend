import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const navigate = useNavigate();

  const categories = ['Groceries', 'Personal Care', 'Household', 'Stationery'];

  const validateForm = () => {
    if (!name.trim()) { toast.error('Product is required'); return false; }
    if (!brand.trim()) { toast.error('Brand is required'); return false; }
    if (!category) { toast.error('Please select a category'); return false; }
    if (description && description.trim().length === 0) { toast.error('Description cannot be just spaces'); return false; }
    if (!quantity || Number(quantity) <= 0) { toast.error('Quantity must be greater than 0'); return false; }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const productData = {
      name,
      brand,
      category,
      description: description.trim(),
      quantity: Number(quantity),
    };

    try {
      const res = await fetch('http://localhost:5000/api/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error('API error:', data);
        throw new Error('Failed to add product');
      }

      toast.success('Product added successfully!');
      setName('');
      setBrand('');
      setCategory('');
      setDescription('');
      setQuantity('');
       navigate('/manage-products');
    } catch (error) {
      console.error(error);
      toast.error('Failed to add product');
    }
  };

  const handleCancel = () => {
    setName('');
    setBrand('');
    setCategory('');
    setDescription('');
    setQuantity('');
    navigate('/admin/products/manage');
  };
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-md bg-white p-8 shadow-xl rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add New Product</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="text"
            placeholder="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min={1}
          />

          <div className="flex flex-col items-center gap-3 pt-4">
            <button
              type="submit"
              className="w-full bg-blue-500/90 text-white py-3 rounded-lg font-semibold hover:bg-black transition"
            >
              Add Product
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-blue-500/90 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;


