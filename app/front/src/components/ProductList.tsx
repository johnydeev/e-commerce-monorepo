import { useEffect, useState } from 'react';
import { IProductResponse } from '@ecommerce/shared';
import axios from 'axios';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState<IProductResponse[]>([]);
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_URL_API}/api/product`
                );
                console.log('Respuesta del backend:', response.data);
                setProducts(response.data);
            } catch (error) {
                console.error('Error al conectar con el backend', error);
                setMessage('Error al conectar con el backend');
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="product-list-container">
            <h2 className="product-list-title">Productos Disponibles</h2>
            {message && <p className="product-list-error">{message}</p>}
            <div className="product-grid">
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <p className="product-list-empty">No hay productos disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default ProductList;

