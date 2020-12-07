import React from 'react';
import Button from './Button';
import './ProductCard.css';
import { useLocation } from 'react-router-dom';
import dotenv from 'dotenv';
dotenv.config();

const ProductCard = ({ item, description, imageURL, price, product_id, cart_id }) => {
    const location = useLocation();
    return (
        <div className="item-card">
            <img loading='lazy' alt='pic of the product' className="image-recommended" src={`${process.env.BACKEND_URL}/${imageURL}`} />
            <div className='holder-of-priceanditem'>
                <div className="item">{item}</div>
                <div className='price'>${price}</div>
            </div>
            <pa className="description">{description}</pa>
            <div className="buttons">
                <Button todo="Buy Now" productId={product_id} cartId={cart_id}/>
                <Button todo={location.pathname === '/cart' ? "Remove" : "Add to cart"} productId={product_id} cartId={cart_id}/>
            </div>
        </div>
    );
};

export default ProductCard;