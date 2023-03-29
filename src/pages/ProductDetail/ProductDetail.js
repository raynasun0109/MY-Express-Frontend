import React, { useEffect, useState } from 'react';
import {getOneProduct} from '../../service/ProductService';
import Navigation from '../../components/Navigation/Navigation.js';
import { useNavigate,useLocation } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './ProductDetail.scss';
import TextField from '@mui/material/TextField';
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

  
export default function ProductDetail(){
    const [product, setProduct] = useState([]);
    const [recommendProducts, setRecommendProducts] = useState([]);

    const [qty, setQty] = useState([1]);

    let location = useLocation();
    const navigate = useNavigate()


    useEffect(() => {
        fetchProduct()
    }, []);
 
    function handleQty (value) {
        console.log(value)
    };


    function handleClick(id){
        navigate(`product/${id}`)
    }

    function fetchProduct(){
        const productId=location.pathname.split('/')[2];
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
            {            console.log(product)
}
            <Navigation/>
            <div className="product_detail_container">
                <div className="category_container">
                    {product&&product.category&& product.category.toLowerCase()}  
                     <ArrowForwardIosIcon/>
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
                                <NumericInput min={0} value={1} precision={0} className="number_input"
                                    onChange={(value) => {handleQty(value)}}/>
                            </div>
                        </div>
                        <div className="product_display_container_right_btn_container">
                            <Button className="add_to_cart">Add to cart</Button>
                            <Button className="buy_now">Buy now</Button>
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
                                <div onClick={()=>handleClick(product.uuid)} key={product.uuid} className="products_container_container">
                                    <ProductCard prop={product}/>
                                </div>
                            )
                        )
                    }
                    </div>
            </div>
            
        </div>
    )
    
}