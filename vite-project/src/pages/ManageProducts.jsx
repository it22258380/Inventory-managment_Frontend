import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products/all");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/products/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error("Failed to delete product");

      toast.success("Product deleted");
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:5000/api/products/update/${selectedProduct._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedProduct),
        }
      );

      if (!res.ok) throw new Error("Failed to update product");

      toast.success("Product updated");
      setEditModal(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product");
    }
  };

  return (
    <div>
      <Header />
    <div className="p-6 w-full min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <Link to="/add-product">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            + Add New
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded border">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Brand</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod._id}>
                <td className="py-2 px-4 border-b">{prod.name}</td>
                <td className="py-2 px-4 border-b">{prod.brand}</td>
                <td className="py-2 px-4 border-b">{prod.category}</td>
                <td className="py-2 px-4 border-b">{prod.quantity}</td>
                <td className="py-2 px-4 border-b">{prod.description}</td>
                <td className="py-2 px-4 border-b space-x-2">
                  <button
                    className="bg-black text-white px-3 py-1 rounded hover:bg-blue-500/90"
                    onClick={() => {
                      setSelectedProduct({ ...prod });
                      setEditModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(prod._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editModal && selectedProduct && (
        <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-xl bg-white/10">
          <div className="bg-white w-[450px] p-6 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Product</h2>

            <form className="space-y-3" onSubmit={handleEditSubmit}>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Name"
                value={selectedProduct.name}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    name: e.target.value,
                  })
                }
                required
              />
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Brand"
                value={selectedProduct.brand}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    brand: e.target.value,
                  })
                }
                required
              />
              <select
                value={selectedProduct.category}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    category: e.target.value,
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Category</option>
                {["Groceries", "Personal Care", "Household", "Stationery"].map(
                  (cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  )
                )}
              </select>

              <input
                type="number"
                className="w-full p-2 border rounded"
                placeholder="Quantity"
                value={selectedProduct.quantity}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    quantity: e.target.value,
                  })
                }
                required
                min="1"
              />
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  id="availability"
                  checked={selectedProduct.availability}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      availability: e.target.checked,
                    })
                  }
                />
                <label
                  htmlFor="availability"
                  className="text-sm text-gray-700 font-medium"
                >
                  Available
                </label>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    <Footer />
    </div>
  );
}

export default ManageProducts;
