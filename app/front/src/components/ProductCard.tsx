import React from 'react';
import { Link } from 'react-router-dom';
import { IProductResponse } from '@ecommerce/shared';
import './ProductCard.css';

const ProductCard: React.FC<{ product: IProductResponse }> = ({ product }) => {
    return (
        <Link to={`/product/${product._id}`}>
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

