import React, { useEffect, useState } from 'react';
import Navigation from '../../components/Navigation/Navigation.js';
import Carousel from '../../components/Carousel/Carousel.js';
import {allProducts,latestProducts} from '../../service/ProductService';
import ProductCard from '../../components/ProductCard/ProductCard.js';
import './Home.scss';
import { useNavigate,useLocation } from 'react-router-dom';
import {connect} from "react-redux";
import {removeCountry,addCountry} from "../../redux/actions/index.js";

function Home(prop) {
   const [products, setProducts] = useState([]);
   const navigate = useNavigate()

    useEffect(() => {
        // window.location.reload();
        latestProducts({number:5}).then(res => {
            setProducts(res.data);
      });
    }, []);

    function handleClick(id){
        navigate(`product/${id}`)
    }
  

    return (
        <>
            <Navigation data={prop.state}/>
            <Carousel/>
            <div className="container">
                {/* <button onClick={()=>{addCountry('item')}}>myyyyyy</button> */}
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

const mapStateToProps=(state)=>{
    // console.log('333',state)
    return {
        state,

    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        addCountry(item){
            dispatch(addCountry(item))
        },
        removeCountry(item){
            dispatch(removeCountry(item))
        },
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);
