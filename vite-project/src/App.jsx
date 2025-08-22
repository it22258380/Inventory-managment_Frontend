import { useState } from 'react'
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddProduct from './pages/AddProduct';
import ManageProducts from './pages/ManageProducts';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/manage-products" element={<ManageProducts />} />
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
