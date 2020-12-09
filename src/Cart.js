import React, { useEffect } from 'react';
import './Cart.css';
import ProductsList from './components/ProductsList';
import { useQuery } from 'react-query';
import DialogComponent from './components/Dialog';
import { useHistory } from 'react-router-dom';
import Loading from './components/Loading';
import Footer from './components/Footer';

async function getCartItems() {
    let response = await fetch(`${REACT_APP_BACKEND_URL}/cart`, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    let cart = await response.json();
    return cart;
};

const Cart = () => {
    const { isLoading, data } = useQuery('cart', getCartItems);
    const history = useHistory();
    useEffect(() => {
        fetch(`${REACT_APP_BACKEND_URL}/checkUser`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json()).then(res => {
            if (res.user_id === null) {
                history.push("/signin");
            }
        })
    }, []);
    return (
        <div>
            <div className='capsule'>
                <div className='recommended-text'>Cart</div>
                {isLoading ? <Loading/> : <ProductsList products={data} />}
                <DialogComponent />
            </div>
            <Footer />
        </div>
    );
};

export default Cart;