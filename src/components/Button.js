import React, { useContext } from 'react';
import userIDContext from '../Context';
import './Button.css';
import { useHistory } from 'react-router-dom';
import { queryCache, useMutation } from 'react-query';
import DialogContext from '../DialogContext';
import dotenv from 'dotenv';
dotenv.config();

async function addToCart({ productId }) {
    let response = await fetch(`${process.env.BACKEND_URL}/addToCart`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_id: productId }),
    });
    return response.status;
};

async function buyNow({ productId }) {
    let response = await fetch(`${process.env.BACKEND_URL}/buyItem`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_id: productId }),
    });
    let product = await response.json();
    return product;
};

async function deleteFromCart({ cartId }) {
    await fetch(`${process.env.BACKEND_URL}/deleteFromCart`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart_id: cartId }),
    });
    return cartId;
};

const Button = ({ todo, productId, cartId }) => {
    const history = useHistory();
    const dialogFunctions = useContext(DialogContext);
    const userSignedInID = useContext(userIDContext);
    const addItem = useMutation(addToCart);
    const buyItem = useMutation(buyNow);
    const deleteItem = useMutation(deleteFromCart, 
        {onSuccess: cart_id => queryCache.setQueryData('cart', currentCart => {
            const newCart = currentCart.filter(cartItem => cartItem.cart_id !== cart_id);
            return newCart;
        })}
    );
    const action = IDofUser => {
        if (IDofUser === null) history.push('/signin');
        else {
            switch (todo) {
                case 'Add to cart':
                    addItem[0]({productId}); 
                    break;
                case 'Buy Now':
                    buyItem[0]({productId});
                    if (cartId !== null || cartId !== undefined) deleteItem[0]({cartId})
                    break; 
                case 'Remove': 
                    deleteItem[0]({cartId});
                    break;
                default:

            };
            dialogFunctions.handleClickOpen();
        };
    };
    return (<button className="styleButton" onClick={() => action(userSignedInID)}>{todo}</button>);
};

export default Button;