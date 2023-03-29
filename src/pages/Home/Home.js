import React, { useEffect, useState } from 'react';
import Navigation from '../../components/Navigation/Navigation.js';
import Carousel from '../../components/Carousel/Carousel.js';
import {allProducts,latestProducts} from '../../service/ProductService';
import ProductCard from '../../components/ProductCard/ProductCard.js';
import './Home.scss';
import { useNavigate,useLocation } from 'react-router-dom';

export default function Home() {
   const [products, setProducts] = useState([]);
   const navigate = useNavigate()

    useEffect(() => {
        latestProducts({number:5}).then(res => {
            setProducts(res.data);
      });
    }, []);

    function handleClick(id){
        navigate(`product/${id}`)
    }

    return (
        <>
            <Navigation/>
            <Carousel/>
            <div className="container">
            <div className="main_container">
                <div>
                    <div className="main_title">
                        What's NEW
                    </div>
                    <div className="products_container">          
                    {
                        products.length > 0 && (
                            products.map( product =>
                                <div onClick={()=>handleClick(product.uuid)} key={product.uuid} className="products_container_container">
                                    <ProductCard prop={product}/>
                                </div>
                            )
                        )
                    }
                    </div>
                   
                </div>
           

            </div>
            </div>
        </>
    );
}