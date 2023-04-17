import React, { useEffect, useState } from 'react';
import Navigation from '../../components/Navigation/Navigation.js';
import Carousel from '../../components/Carousel/Carousel.js';
import {allProducts,latestProducts} from '../../service/ProductService';
import ProductCard from '../../components/ProductCard/ProductCard.js';
import './Home.scss';
import { useNavigate,useLocation } from 'react-router-dom';
import {connect} from "react-redux";
import {removeCountry,addCountry} from "../../redux/actions/index.js";
import InputBase from '@mui/material/InputBase';
import Checkbox from '@mui/material/Checkbox';
import Loading from '../../components/Loading/Loading.js';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';

const category=[
    {name:"Clothes",url:"CLOTHES",img:"https://res.cloudinary.com/raynasun0109/image/upload/v1681416917/myshopaholic/Home-icon/Clothes_kwckj8.png"},
    {name:"Shoes",url:"SHOES",img:"https://res.cloudinary.com/raynasun0109/image/upload/v1681416917/myshopaholic/Home-icon/Shoes_hpsfj7.png"},
    {name:"Sports",url:"SPORTS",img:"https://res.cloudinary.com/raynasun0109/image/upload/v1681501445/myshopaholic/Home-icon/sport_widmel.png"},
    {name:"Bags",url:"clothes",img:"https://res.cloudinary.com/raynasun0109/image/upload/v1681416917/myshopaholic/Home-icon/Bags_h6gmza.png"},
    {name:"Home",url:"HOME",img:"https://res.cloudinary.com/raynasun0109/image/upload/v1681416917/myshopaholic/Home-icon/Home_Appliances_a8daz9.png"},
    {name:"Pets",url:"PETS",img:"https://res.cloudinary.com/raynasun0109/image/upload/v1681736937/myshopaholic/Home-icon/pet_iuw3wu.png"},
    {name:"Health",url:"HEALTH",img:"https://res.cloudinary.com/raynasun0109/image/upload/v1681501444/myshopaholic/Home-icon/health_rs1r61.png"},
    {name:"Electronics",url:"ELECTRONICS",img:"https://res.cloudinary.com/raynasun0109/image/upload/v1681501449/myshopaholic/Home-icon/electronic_kmvrgl.png"},
    {name:"Beauty",url:"clothes",img:"https://res.cloudinary.com/raynasun0109/image/upload/v1681416917/myshopaholic/Home-icon/Bags_h6gmza.png"},
    {name:"Toys",url:"clothes",img:"https://res.cloudinary.com/raynasun0109/image/upload/v1681416917/myshopaholic/Home-icon/Bags_h6gmza.png"},
    {name:"Furniture",url:"clothes",img:"https://res.cloudinary.com/raynasun0109/image/upload/v1681416917/myshopaholic/Home-icon/Bags_h6gmza.png"},
    {name:"Phones",url:"PHONES",img:"https://res.cloudinary.com/raynasun0109/image/upload/v1681643767/myshopaholic/Home-icon/phone_ovi4sn.png"},
    {name:"Games",url:"GAMES",img:"https://res.cloudinary.com/raynasun0109/image/upload/v1681501444/myshopaholic/Home-icon/game_w6v2vc.png"},
    {name:"Garden",url:"GARDEN",img:"https://res.cloudinary.com/raynasun0109/image/upload/v1681416917/myshopaholic/Home-icon/Garden_tjtnk6.png"},
    {name:"Accessories",url:"clothes",img:"https://res.cloudinary.com/raynasun0109/image/upload/v1681416917/myshopaholic/Home-icon/Bags_h6gmza.png"},
]
function Home(prop) {
   const [products, setProducts] = useState([]);
   const [checked,setChecked] = useState(false);
   const navigate = useNavigate()
   const [email,setEmail] = useState("");
   const [isLoading,setLoading]=useState(false);
   const [title,setTitle]=useState();
   const [content,setContent]=useState();
   const [isSetIcon,setIcon]=useState();
   const [isShowLoading,setShowLoading]=useState(false);
   const [isShowCheckedBoxError,setShowCheckedBoxError]=useState(false);
   const [checkedBoxErrorText,setCheckedBoxErrorText]=useState("");

    useEffect(() => {
        latestProducts({number:5}).then(res => {
            setProducts(res.data);
      });
    }, []);

    function jump(category){
        navigate(`product/${category}`)
    }

    // function handleClick(category,id){
    //     navigate(`product/${category}/${id}`)
    // }

    function handleClickCheckbox(){
        setChecked(!checked)
    }

    const handleEmail = (event) => {
        const { value } = event.target;
        setEmail(value);
    };

    function handleSubscribe(){
        if(checked && email){
            setShowCheckedBoxError(false)
            setShowLoading(true);
            setTitle("Subscribe successfully");
            setContent("You will receive our newsletter soon");
            setLoading(false);
        } else if(!checked && !email){
            setShowCheckedBoxError(true)
            setCheckedBoxErrorText("Please check the box above and input the email")
        } else if (!email){
            setShowCheckedBoxError(true)
            setCheckedBoxErrorText("Please input the email")
        } else if (!checked){
            setShowCheckedBoxError(true)
            setCheckedBoxErrorText("Please check the box above")
        }
    }

    return (
        <>
            <ScrollToTop/>
            <Navigation data={prop.state}/>
            <Carousel/>
            {
            isShowLoading&&
            <Loading title={title} content={content} isLoading={isLoading} isSetIcon={isSetIcon}/>
          }
            <div className="container">
                <div className="first_container">
                    <div className="main_container">
                        <div>
                            <div className="main_title">
                                What's NEW
                            </div>
                            <div className="products_container">
                            {
                                products.length > 0 && (
                                    products.map( product =>
                                        <div key={product.uuid} className="products_container_container">
                                            <ProductCard prop={product} category={product.category} uuid={product.uuid}/>
                                        </div>
                                    )
                                )
                            }
                            </div>
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
                            <div key={item.name} className="sec_content_container_block" onClick={()=>jump(item.url)}>
                                <div className="sec_content_container_block_img">
                                    <img src={item.img}/>
                                </div>
                                <div className="sec_content_container_block_text">
                                    {item.name}
                                </div>
                            </div>

                            )
                        }
                    </div>
                </div>
                <div className="third_container">
                    <div className="third_title">
                        SUBSCRIBE AND GET 10% OFF
                    </div>
                    <div className="third_subtitle">
                        Receive product news and updates in your inbox
                    </div>

                    <div className="third_content_container">
                        <InputBase
                            className="third_content_container_input"
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Your email here..."
                            defaultValue={email}
                            onChange={handleEmail}

                            // inputProps={{ 'aria-label': 'search google maps' }}
                        />
                        <div className="third_content_container_btn" onClick={handleSubscribe}>Subscribe</div>

                    </div>
                    <div className="third_content_checkbox">
                    <Checkbox checked={checked} onClick={handleClickCheckbox}/>
                     I acknowledge I have read and understood Privacy Policy and I consent to the processing of my personal data for marketing and profiling purposes.
                    </div>
                    <div className="third_content_checkbox_error">
                        {isShowCheckedBoxError&&checkedBoxErrorText
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
