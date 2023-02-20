import Header from '../../components/Header/Header.js';
import Carousel from '../../components/Carousel/Carousel.js';
import {allProducts} from '../../service/ProductService';
import React, { useEffect,useState } from "react";

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        allProducts().then(res => {
            setProducts(res.data)
      });
    }, []);




    return (
        <>
            <Header/>
            <Carousel/>
            <div>
                {console.log(222,products)}

            </div>
        </>
    );
}