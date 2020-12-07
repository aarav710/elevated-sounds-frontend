import React from 'react';
import './Category.css'

const Category = ({category, photo}) => {
    const backgroundimage = {
        backgroundImage : `url(${photo})`
    }
return <button style={backgroundimage} className="category">{category}</button>;
};

export default Category;