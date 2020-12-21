import React from 'react';
import ProductCard from './ProductCard';
import './ProductsList.css';

const ProductList = ({ products }) => {
    const noItems = <div style={{'fontSize':'8vw'}}>No items.</div>
    return (
        products.length === 0 ? noItems :
            <div className="scrollsidewaysBox">
                {products.map(product => {
                    return (<ProductCard
                        key={product.cart_id === null || product.cart_id === undefined ? product.product_id : product.cart_id}
                        product_id={product.product_id}
                        item={product.item}
                        description={product.description}
                        imageURL={product.imageurl}
                        cart_id = {product.cart_id === null || product.cart_id === undefined ? null : product.cart_id}
                        price={product.price} />);
                })}
            </div>
    );
};

export default ProductList;