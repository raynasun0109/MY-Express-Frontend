import React, { useEffect, useState } from 'react';
import Navigation from '../../components/Navigation/Navigation.js';
import Carousel from '../../components/Carousel/Carousel.js';
import {allProducts,latestProducts} from '../../service/ProductService';
import ProductCard from '../../components/ProductCard/ProductCard.js';
import './Home.scss';
import { useNavigate,useLocation } from 'react-router-dom';
import {connect} from "react-redux";
import {removeCountry,addCountry} from "../../redux/actions/index.js";
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

const category=[
    {name:"Clothes",url:"clothes"},
    {name:"Shoes",url:"clothes"},
    {name:"Sports",url:"clothes"},
    {name:"Jewlery",url:"clothes"},
    {name:"Home Appliances",url:"clothes"},
    {name:"Pet Supplies",url:"clothes"},
    {name:"Health",url:"clothes"},
    {name:"Electronics",url:"clothes"},
    {name:"Beauty",url:"clothes"},
    {name:"Toys",url:"clothes"},
    {name:"Furniture",url:"clothes"},
    {name:"Phones",url:"clothes"},
    {name:"Games",url:"clothes"},
    {name:"Garden",url:"clothes"},
    {name:"Accessories",url:"clothes"},

]
function Home(prop) {
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
                <div className="sec_container">
                    <div className="sec_title">
                        Shop By Category
                    </div>
                    <div className="sec_content_container">
                        {
                            category&&
                            category.map((item)=>
                            <div>
                                {item.name}
                            </div>

                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

const mapStateToProps=(state)=>{
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
