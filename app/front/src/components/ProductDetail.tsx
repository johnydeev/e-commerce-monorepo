import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IProductResponse } from '@ecommerce/shared';
import axios from 'axios';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<IProductResponse | null>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_URL_API}/api/product/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.error(err);
                setError('Error al cargar el producto.');
            }
        };

        fetchProduct();
    }, [id]);

    if (error) return <p className="error">{error}</p>;
    if (!product) return <p className="loading">Cargando producto...</p>;

    return (
        <div className="product-detail">
            {/* Carrusel de imágenes */}
            <div className="image-carousel">
                {product.images?.map((image, index) => (
                    <img
                        key={index}
                        src={image.url}
                        alt={image.alt || product.name}
                        className="carousel-image"
                    />
                ))}
            </div>

            <div className="detail-info">
                <div className='product-header'>
                    <h1>{product.name}</h1>
                    <span className={`status ${product.status}`}>{product.status}</span>  
                </div>
                <p className="sku">SKU: {product.sku}</p>
                <p className="description">{product.description}</p>
                <p className="price">${product.price.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default ProductDetail;

