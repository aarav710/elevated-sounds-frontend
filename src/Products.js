import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import './Products.css';
import TextField from '@material-ui/core/TextField';
import ProductCard from './components/ProductCard';
import { Select, MenuItem, InputLabel } from '@material-ui/core';
import DialogComponent from './components/Dialog';
import Loading from './components/Loading';
import Footer from './components/Footer';

async function fetchProducts () {
    let response = await fetch(`${REACT_APP_BACKEND_URL}/products`);
    let products = await response.json();
    return products;
};

const Products = ({ settingCategory, category }) => {
    const { isLoading, data } = useQuery('products', fetchProducts);
    const [text, setText] = useState('');
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (isLoading) return <Loading/>;

    const filtering = () => {
        const filtered = data.filter(product => {
            if (category === 'all') return product.item.toLowerCase().includes(text.toLowerCase());
            else return product.category === category && product.item.toLowerCase().includes(text.toLowerCase());
        });
        return filtered;
    };
    const noItems = <div style={{'fontSize':'8vw'}}>No items.</div>
    const settingText = event => setText(event.target.value);
    const filteredProducts = filtering();
    return (
        <div>
        <div className="holder">
            <div className="categoriesSection">
                <TextField onChange={settingText} id="standard-basic" label="Search" style={{ 'width': '35%' }} color='secondary'>{text}</TextField>
                <div>
                    <InputLabel id="label">Category</InputLabel >
                    <Select labelId="label" id="select" value={category} placeholder='Category' color='secondary'>
                        <MenuItem value="all" onClick={()=> settingCategory('all')}>All</MenuItem>
                        <MenuItem value="headphones" onClick={()=> settingCategory('headphones')}>Headphones</MenuItem>
                        <MenuItem value="smartphones" onClick={()=> settingCategory('smartphones')}>Smartphones</MenuItem>
                        <MenuItem value="tablets" onClick={()=> settingCategory('tablets')}>Tablets</MenuItem>
                        <MenuItem value="laptops" onClick={()=> settingCategory('laptops')}>Laptops</MenuItem>
                    </Select>
                </div>
            </div>
            <div className="productsList">
                {
                    filteredProducts.length === 0 ? noItems
                    :
                    filteredProducts.map(product => {
                        return (<ProductCard
                            key={product.product_id}
                            product_id={product.product_id}
                            item={product.item}
                            description={product.description}
                            imageURL={product.imageurl}
                            price={product.price} />);
                    })
                };
            </div>
            <DialogComponent />
        </div>
        <Footer/>
        </div>
    );
};

export default Products;