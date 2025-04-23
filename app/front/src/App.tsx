import ProductList from './components/ProductList';
import { Routes, Route } from 'react-router-dom';
import ProductDetail from './components/ProductDetail';
import './App.css';
import Navbar from './components/Navbar';

const App = () => {
  
  return (
    <>
      <Navbar  />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </>
  );
}

export default App;
