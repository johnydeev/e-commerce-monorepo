// src/components/ProductList.tsx
import { useEffect, useState } from 'react';
import { IProductResponse } from '@ecommerce/shared';
import axios from 'axios';
import ProductCard from './ProductCard';
import './ProductList.css';

interface Props {
    searchTerm: string;
}

const ProductList = ({ searchTerm }: Props) => {
    const [products, setProducts] = useState<IProductResponse[]>([])
    const [message, setMessage] = useState<string>('')

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_URL_API}/api/product`
                );

                const data = response.data;

                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    console.error("⚠️ Backend returned non-array:", data);
                    setProducts([]);
                    setMessage("Error: respuesta inesperada del servidor.");
                }

            } catch (error) {
                console.error("Error al conectar con el backend", error);
                setMessage("Error al conectar con el backend");
            }
        };

        fetchProducts();
    }, []);


    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="product-list-container">
            <h2 className="product-list-title">Productos Disponibles</h2>
            {message && <p className="product-list-error">{message}</p>}
            <div className="product-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <p className="product-list-empty">No se encontraron productos.</p>
                )}
            </div>
        </div>
    );
};

export default ProductList;




//--------------------------------------------------------------------------------------------------
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import { IProductResponse } from '@ecommerce/shared';

// const ProductList = () => {
//     const [products, setProducts] = useState<IProductResponse[]>([]);
//     const [loading, setLoading] = useState(true);
//     const location = useLocation();
//     const searchParams = new URLSearchParams(location.search);
//     const query = searchParams.get('q')?.toLowerCase() || '';

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const res = await axios.get(`${import.meta.env.VITE_URL_API}/api/product`);
//                 const data: IProductResponse[] = res.data;

//                 if (query) {
//                     setProducts(data.filter(p => p.name.toLowerCase().includes(query)));
//                 } else {
//                     setProducts(data);
//                 }
//             } catch (err) {
//                 console.error('Error al cargar productos', err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProducts();
//     }, [query]);

//     if (loading) return <p>Cargando productos...</p>;

//     return (
//         <div className="product-list">
//             {products.map(p => (
//                 <div key={p._id} className="product-card">
//                     <h3>{p.name}</h3>
//                     <p>${p.price.toFixed(2)}</p>
//                     {/* Link al detalle o más info */}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default ProductList;

