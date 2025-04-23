import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IProductResponse } from '@ecommerce/shared';
import axios from 'axios';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<IProductResponse | null>(null);
    const [error, setError] = useState<string>('');
    const [quantity, setQuantity] = useState(1);

    const addToCart = (item: { productId: string; quantity: number; price: number }) => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const updatedCart = [...cart, item];
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        alert('Producto agregado al carrito!');
    };

    const handleAddToCart = () => {

        if(!product) return;
        if (quantity < 1) {
            alert('La cantidad debe ser al menos 1.');
            return;
        }
        const item = {
            productId: product?._id,
            quantity,
            price: product?.price,
            // variantId: selectedVariantId || null,
        };

        // Aquí podrías llamar a una función que guarde en localStorage o contexto
        addToCart(item);
    };

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
                <div className="cart-controls">
                    <label htmlFor="quantity" className="quantity-label">Cantidad:</label>
                    <input
                        id="quantity"
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="quantity-input"
                    />
                    <button className="add-to-cart-btn" onClick={handleAddToCart}>
                        Agregar al carrito
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ProductDetail;

