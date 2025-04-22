import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

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
    image?: string; // Asegúrate de tener esta propiedad en tu backend también
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    return (
        <Link to={`/product/${product._id}`} className="product-card">
            <div className="product-card">

                {product.images && product.images.length > 0 && (
                    <img
                        src={product.images[0].url}
                        alt={product.images[0].alt || product.name}
                        className="product-image"
                    />
                )}
                <div className="product-content">
                    <h3>{product.name}</h3>
                    <p className="sku">SKU: {product.sku}</p>
                    <p className="description">{product.description}</p>
                    <div className="price-status">
                        <span className="price">${product.price.toFixed(2)}</span>
                        <span className={`status ${product.status}`}>
                            {product.status}
                        </span>
                    </div>
                    
                    <div className="product-card__button">
                        Ver más
                    </div>

                </div>
            </div>
        </Link>
    );
};

export default ProductCard;

