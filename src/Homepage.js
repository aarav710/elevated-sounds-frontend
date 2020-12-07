import React, { Suspense, useEffect } from 'react';
import ProductsList from './components/ProductsList';
import {Link} from 'react-router-dom';
import './Homepage.css';
import Category from './components/Category';
import { useQuery } from 'react-query';
import DialogComponent from './components/Dialog';
import Loading from './components/Loading';
import Footer from './components/Footer';
import Button from './components/Button';

async function fetchRecommendedProducts () {
    let response = await fetch('https://infinite-crag-03585.herokuapp.com');
    let products = await response.json();
    return products;
};

async function getBanner () {
    let response = await fetch('https://infinite-crag-03585.herokuapp.com/banner');
    let banner = await response.json();
    return banner;
};

const Homepage = ({settingCategory}) => {
    const recommended = useQuery('recommended', fetchRecommendedProducts);
    const banner = useQuery('banner', getBanner);
    useEffect(() => window.scrollTo(0, 0), []);
    if (recommended.isLoading) return <Loading/>;
    if (banner.isLoading) return <Loading/>;
    return (
        <div>
             <div className="container">
        <div className="text">
          <div className="tagline">Plug it, listen to it, feel it.</div>
          <pa className="introline">Introducing our new headphones which you need, the CFMAX-11, you are gonna love it.</pa>
          <div className="buttons">
            <Button todo="Buy now" productId={banner.data.product_id}/>
            <Button todo="Add to cart" productId={banner.data.product_id}/>
          </div>
        </div>
        <img src={'https://infinite-crag-03585.herokuapp.com/banner.jpg'} alt="just like this" width="200px" height="400px" className="image"/>
    </div>
            <div className="box">
                <pa className="recommended-text">Recommended for you</pa>
                <ProductsList products={recommended.data}/>
            </div>
            <div className="categories">
                <pa className="recommended-text">Categories</pa>
                <Suspense fallback={<div>Loading...</div>}>
                    <div className="row-1">
                        <Link to="/products" className="categories" onClick={()=> settingCategory('laptops')}>
                            <Category photo={'https://infinite-crag-03585.herokuapp.com/laptop-cat.jpg'} category={'Laptops'} />
                        </Link>
                        <Link to="/products" className="categories" onClick={()=> settingCategory('headphones')}>
                            <Category photo={'https://infinite-crag-03585.herokuapp.com/headphone-cat.jpg'} category={'Headphones'} />
                        </Link>
                    </div>
                    <div className="row-2">
                        <Link to="/products" className="categories" onClick={()=> settingCategory('tablets')}>
                            <Category photo={'https://infinite-crag-03585.herokuapp.com/tablet-cat.jpg'} category={'Tablets'} />
                        </Link>
                        <Link to="/products" className="categories" onClick={()=> settingCategory('smartphones')}>
                            <Category photo={'https://infinite-crag-03585.herokuapp.com/phone-cat.jpg'} category={'Smartphones'} />
                        </Link>
                    </div>
                </Suspense>
            </div>
            <DialogComponent />
            <Footer/>
        </div>
    );
};

export default Homepage;