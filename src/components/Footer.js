import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className='box-2'>
                <div className='headings'>Search.</div>
                <ul>
                    <Link to="/" className='list-items'>
                        <li className='list-items'>Home</li>
                    </Link>
                    <Link to="/products" className='list-items'>
                        <li className='list-items'>Products</li>
                    </Link>
                </ul>
            </div>
            <div className='box-3'>
                <div className='headings'>Contact us.</div>
                <ul>
                    <li className='list-items'>Instagram</li>
                    <li className='list-items'>Facebook</li>
                    <li className='list-items'>Twitter</li>
                </ul>
            </div>
            <div className='box-1'>
                <div className='headings'>Elevated sounds.</div>
            </div>
        </footer>
    );
};

export default Footer;