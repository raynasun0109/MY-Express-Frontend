import React, { useEffect, useState } from 'react';
import {getOneProduct} from '../../service/ProductService';
import Navigation from '../../components/Navigation/Navigation.js';
import { useNavigate,useLocation } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './ProductCategory.scss';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import ProductCard from '../../components/ProductCard/ProductCard.js';
import {allProducts,latestProducts} from '../../service/ProductService';
import {removeCountry,addCountry} from "../../redux/actions/index.js";
import {addProduct} from "../../redux/actions/products";
import Cookies from 'universal-cookie';
import {retrieve_shopping_cart,update_shopping_cart} from '../../utils/functions';
import { v4 as uuidv4 } from 'uuid';
import {connect,useSelector,useDispatch} from "react-redux";
import {updateShoppingCart,refreshShoppingCart} from "../../redux/actions/products.js";
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const cookies = new Cookies();

  
function ProductCategory(props){
    const [productList, setProductList] = useState([]);
    const [cookie,setCookie]=useState('')
    const [searchName,setSearchName]=useState('')

    const dispatch = useDispatch();


    let location = useLocation();
    const navigate = useNavigate()


    useEffect(() => {
        fetchCookie()
        fetchProduct()
    }, []);
 
    function fetchCookie(){
        setCookie(cookies.get('myShopaholic')?cookies.get('myShopaholic'):'')
    }
   

  
//todo 
    function handleClick(id){

        navigate(`product/${id}`,{replace:true})
    }

 

    function fetchProduct(){
        const category=location.pathname.split('/')[2];
        // console.log('location.pathname',productId,location.pathname)
        allProducts({category,name:searchName})
            .then(res => {
                // console.log(res)
                setProductList(res.data);
                // latestProducts({number:5,category:res.data[0].category}).then(res => {
                //     setRecommendProducts(res.data);
            //   });
            })
    }

    const handleSearchName = (event) => {
        const { value } = event.target;
        setSearchName(value);
    };


    function handleSearch(){
        fetchProduct()
    }

    return (
        <div>
            {console.log(productList)}
            <Navigation data={props.state}/>
            <div className="category_container">
                <div className="category_container_search">
                    <InputBase
                        className="category_container_search_input"
                        sx={{ ml: 1, flex: 1 }}
                        defaultValue={searchName}
                        onChange={handleSearchName}
                    />
                        <div className="category_container_search_btn" onClick={handleSearch}>
                            <SearchIcon/>
                        </div>
                    </div>
                <div className="category_container_content">
                    {
                        productList&&
                        productList.map(product =>
                            <div onClick={()=>handleClick(product.category,product.uuid)} key={product.uuid} className="products_container_container">
                                <ProductCard prop={product}/>
                            </div>
                        )
                    }
                </div>
            </div>
            

            
        </div>
    )
    
}

const mapStateToProps=(state)=>{
    // console.log('state',state)
    return {
        state,

    }
}
const mapDispatchToProps=(dispatch)=>{
    // console.log(dispatch,"dispatch")
    return {
        addProduct(item){
            dispatch(addProduct(item))
        },
        removeCountry(item){
            dispatch(removeCountry(item))
        },
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductCategory);

