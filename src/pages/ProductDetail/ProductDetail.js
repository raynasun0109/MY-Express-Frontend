import React, { useEffect, useState } from 'react';
import {getOneProduct} from '../../service/ProductService';
import Navigation from '../../components/Navigation/Navigation.js';
import { useNavigate,useLocation,Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './ProductDetail.scss';
import Button from '@mui/material/Button';
import NumericInput from 'react-numeric-input';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import ProductCard from '../../components/ProductCard/ProductCard.js';
import {allProducts,latestProducts} from '../../service/ProductService';
import {removeCountry,addCountry} from "../../redux/actions/index.js";
import {addProduct} from "../../redux/actions/products";
import {updateOneUser,updateOneShoppingCart,getOneUser} from '../../service/UserService';
import Cookies from 'universal-cookie';
import {retrieve_shopping_cart,update_shopping_cart} from '../../utils/functions';
import { v4 as uuidv4 } from 'uuid';
import {connect,useSelector,useDispatch} from "react-redux";
import {updateShoppingCart,refreshShoppingCart} from "../../redux/actions/products.js";
import { createMemoryHistory } from "history";
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';

const cookies = new Cookies();

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
    className="product_detail_container_accordin_icon"
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '18px' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
}));

  
function ProductDetail(props){
    const [product, setProduct] = useState({});
    const [recommendProducts, setRecommendProducts] = useState([]);
    const [cookie,setCookie]=useState('')
    const [currentShoppingCart,setCurrentShoppingCart]=useState([])

    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();


    let location = useLocation();
    const navigate = useNavigate()
    let history = createMemoryHistory();
    const selectedData = useSelector((state) => state.shoppingCart);


    useEffect(() => {
        fetchCookie()
        fetchProduct()
    }, []);
 
    function fetchCookie(){
        setCookie(cookies.get('myShopaholic')?cookies.get('myShopaholic'):'')
        getCurrentShoppingCart(cookies.get('myShopaholic')?cookies.get('myShopaholic').uuid:'')
    }
    function handleQty (value) {
        setQty(value)
    };

    function getCurrentShoppingCart(uuid){
        // console.log('ddd',cookies.get('myShopaholic')?cookies.get('myShopaholic'):'')
        getOneUser({uuid})
            .then(res=>{
                // console.log('res',res)
                setCurrentShoppingCart(JSON.parse(res.data[0].shopping_cart))
            })
    }

    function handleAddToCart(){
     
        product['qty']= qty;
        const newShoppingCart = update_shopping_cart(product,currentShoppingCart)
        // console.log("qty",qty)
        dispatch({type:'updateShoppingCart',data:{shopping_cart:newShoppingCart,uuid:cookie.uuid}})
        getCurrentShoppingCart(cookie.uuid)
    }

    function buynow(){
        const productList=[];
        product.qty=qty;
        productList.push(product)
        navigate('/checkout', {replace: true,state:{products:productList}})
    }

    function fetchProduct(){
        const productId=location.pathname.split('/')[3];
        getOneProduct({uuid:productId})
            .then(res => {
                setProduct(res.data[0]);
                latestProducts({number:5,category:res.data[0].category}).then(res => {
                    setRecommendProducts(res.data);
              });
            })
    }

    return (
        <div>
            <ScrollToTop/>{        console.log('currentShoppingCart',currentShoppingCart)
}
            <Navigation data={props.state}/>
            <div className="product_detail_container">
                <div className="category_container">
                    <Link to={`http://${window.location.host}/product/${product.category}`}>
                        {product&&product.category&& product.category.toLowerCase()}  
                        <ArrowForwardIosIcon/>
                     </Link>
                </div>
                <div className="product_display_container">
                    <div className="product_display_container_left">
                        <img src={product.image}/>
                    </div>
                    <div className="product_display_container_right">
                        <div className="product_display_container_right_name">
                            {product.name}
                        </div>
                        <div className="product_display_container_right_detail">
                            <div className="product_display_container_right_detail_left">
                             Price:
                            </div>
                            <div className="product_display_container_right_detail_right">
                            $ {product.price}
                            </div>
                        </div>
                        <div className="product_display_container_right_detail">
                            <div className="product_display_container_right_detail_left">
                            Location:
                            </div>
                            <div className="product_display_container_right_detail_right">
                            {product.location}
                            </div>
                        </div>
                        <div className="product_display_container_right_detail">
                            <div className="product_display_container_right_detail_left">
                            Quantity:
                            </div>
                            <div className="product_display_container_right_detail_right">
                                <NumericInput snap min={1} value={Number(qty)} precision={0} max={Number(product.stock)} className="number_input"
                                    onChange={(value) => {handleQty(value)}}/>
                            </div>
                        </div>
                        <div className="product_display_container_right_btn_container">
                            <Button className="add_to_cart" onClick={()=>handleAddToCart()}>Add to cart</Button>
                            <Button className="buy_now" onClick={()=>buynow()}>Buy now</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="product_detail_container">
                <Divider className="divider"/>

                <Accordion className="product_detail_container_accordin">
                    <AccordionSummary
                       aria-controls="panel1d-content" id="panel1d-header"
                        className="product_detail_container_accordin_title"
                    >
                        <Typography>Description</Typography>
                    </AccordionSummary>
                    <AccordionDetails className="product_detail_container_accordin_content">
                        <Typography>
                           {product.description}
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Divider className="divider"/>

            </div>

            <div className="product_detail_container">
                {recommendProducts.length > 0 &&<div className="product_detail_container_title">You may also like</div>}
                <div className="products_container">
                    {
                        recommendProducts.length > 0 && (
                            recommendProducts.map( product =>
                                <div key={product.uuid} className="products_container_container">
                                    <ProductCard prop={product} uuid={product.uuid} category={location.pathname.split('/')[2]}/>
                                </div>
                            )
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

export default connect(mapStateToProps,mapDispatchToProps)(ProductDetail);