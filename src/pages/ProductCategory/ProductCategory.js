import React, { useEffect, useState } from 'react';
import {getOneProduct} from '../../service/ProductService';
import Navigation from '../../components/Navigation/Navigation.js';
import { useNavigate,useLocation,Link } from 'react-router-dom';
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
import { Paper, Button } from '@mui/material';
import {connect,useSelector,useDispatch} from "react-redux";
import {updateShoppingCart,refreshShoppingCart} from "../../redux/actions/products.js";
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';
import Pagination from '@mui/material/Pagination';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';

const cookies = new Cookies();

function ProductCategory(props){
    const [productList, setProductList] = useState([]);
    const [cookie,setCookie]=useState('')
    const [searchName,setSearchName]=useState('')
    const [category,setCategory]=useState('')
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState({
        location:"",sortBy:"",priceFrom:"",priceTo:"",name:""
    });
    const [price, setPrice] = useState([0, 100000]);

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

    function reset(){
        setFilter({
            location:"",sortBy:"",priceFrom:"",priceTo:""
        });
        setPrice([0, 100000]);
        fetchProduct();
    }

    const handleSlideChange = (event, newValue) => {
        setPrice(newValue);
        setFilter({
            ...filter,priceFrom:newValue[0],priceTo:newValue[1]
        });
        fetchProduct({
            ...filter,priceFrom:newValue[0],priceTo:newValue[1]
        });
      };

//todo 
    function handleClick(id){
        navigate(`product/${id}`,{replace:true})
    }

    function fetchProduct(filterItem){
        const category=location.pathname.split('/')[2];
        setCategory(category)
        const sortedContent={
            location:filterItem&&filterItem.location=="All"?"":filterItem&&filterItem.location,
            sortBy:filterItem&&filterItem.sortBy,
            sortByItem:(filterItem&&filterItem.sortBy=="Newest"||filterItem&&filterItem.sortBy=="Price:High-Low")?"DESC":"ASC",
            sortByKey:(filterItem&&filterItem.sortBy=="Newest"||filterItem&&filterItem.sortBy=="Oldest")?"created_at":"price",
            priceFrom:filterItem&&filterItem.priceFrom,
            priceTo:filterItem&&filterItem.priceTo,
            name:filterItem&&filterItem.name
        }
        allProducts({category,...sortedContent})
            .then(res => {
                setProductList(res.data);
            })
    }

    const handleSearchName = (event) => {
        const { value } = event.target;
        setFilter({
            ...filter,name:value
        });
        fetchProduct({
            ...filter,name:value
        })
    };


    function handleSearch(){
        fetchProduct({...filter})
    }
    function valuetext(value) {
        return `$ ${value}`;
    }

    function handleSortByChange  (event)  {
        setFilter({
            ...filter,sortBy:event.target.value
        });
        fetchProduct({
            ...filter,sortBy:event.target.value
        })
    };

    function handleLocationChange (event)  {
        const location=event.target.value;
        setFilter({
            ...filter,location
        });
        fetchProduct({...filter,location})
    };
    return (
        <div>
            <ScrollToTop/>
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
                <div className="category_name_container">
                    <Link className="category_name_container_link" to={`http://${window.location.host}/product/${category}`}>
                        {category.toLowerCase()}
                        <ArrowForwardIosIcon/>
                     </Link>
                </div>
                <div className="category_container_content">
                    <div className="category_container_content_left">
                    <FormGroup className="category_container_filter">
                        <div className="category_container_filter_text">Location</div>
                        <RadioGroup
                            className="category_container_radio_group"
                            aria-labelledby="demo-radio-buttons-group-label"
                            // defaultValue={filter.location}
                            onChange={handleLocationChange}
                            name="radio-buttons-group"
                        >
                            <FormControlLabel checked={filter.location=="All"} value="All" control={<Radio />} label="All" />
                            <FormControlLabel checked={filter.location=="Dublin"} value="Dublin" control={<Radio />} label="Dublin" />
                            <FormControlLabel checked={filter.location=="Galway"} value="Galway" control={<Radio />} label="Galway" />
                            <FormControlLabel checked={filter.location=="Cork"} value="Cork" control={<Radio />} label="Cork" />
                            <FormControlLabel checked={filter.location=="Meath"} value="Meath" control={<Radio />} label="Meath" />
                        </RadioGroup>
                        <Divider className="category_container_filter_divider"/>
                        <div className="category_container_filter_text">Price</div>
                        <Slider
                            className="category_container_slider_group"
                            getAriaLabel={() => 'Price range'}
                            value={price}
                            onChange={handleSlideChange}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                        />
                        <Divider className="category_container_filter_divider"/>
                        <div className="category_container_filter_text">Sort By</div>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            // defaultValue="female"
                            onChange={handleSortByChange}
                            className="category_container_radio_group"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel checked={filter.sortBy=="Newest"} value="Newest" control={<Radio />} label="Newest" />
                            <FormControlLabel checked={filter.sortBy=="Oldest"} value="Oldest" control={<Radio />} label="Oldest" />
                            <FormControlLabel checked={filter.sortBy=="Price:High-Low"} value="Price:High-Low" control={<Radio />} label="Price:High-Low" />
                            <FormControlLabel checked={filter.sortBy=="Price:Low-High"} value="Price:Low-High" control={<Radio />} label="Price:Low-High" />
                        </RadioGroup>
                   

                        <Button variant="outlined" className="category_container_reset_btn" onClick={()=>reset()}>Reset</Button>
                    </FormGroup>
                    </div>
                    <div className="category_container_content_right">
                    {
                        productList&&
                        productList.map(product =>
                            <div key={product.uuid} className="products_container_container">
                                <ProductCard prop={product} category={product.category} uuid={product.uuid}/>
                            </div>
                        )
                    }
                          {/* <Pagination count={10} page={page} onChange={handleChange} /> */}

                    </div>
                   
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

