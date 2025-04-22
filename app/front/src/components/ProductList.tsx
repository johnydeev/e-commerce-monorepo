import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './ProductList.css';

interface Product {
    _id: string;
    name: string;
    description: string;
    images: [
        {
            url: string;
            alt: string;
        }
    ]; // Cambiado a un array de strings para las imágenes
    price: number;
    sku: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    variants: any[];
}

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/product`
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

