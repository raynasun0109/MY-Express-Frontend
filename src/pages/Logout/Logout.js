import React, { useEffect, useState } from 'react';
import './Logout.scss';
import { LoadingButton } from '@mui/lab';
import Cookies from 'universal-cookie';
import { createMemoryHistory } from "history";
import { Link } from 'react-router-dom';
import {connect,useDispatch} from "react-redux";
import {removeCountry,addCountry} from "../../redux/actions/index.js";
import {updateShoppingCart,logoutShoppingCart} from "../../redux/actions/products.js";
import { useNavigate,useLocation } from 'react-router-dom';
 
const cookies = new Cookies();

function Logout(){
    let history = createMemoryHistory();
    const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect(() => {
        cookies.remove('myShopaholic');
        dispatch({type:'logoutShoppingCart'})

        console.log('i am logout');
        // setTimeout(() =>  navigate('/'), 3000);

        setTimeout(() => {
            navigate('/', { replace: true })

            // window.location.href=`http://${window.location.host}`
        }, 3000);
    }, []);

    return (
        <div className="logout_container">
            <div className="logout_title">
                Logout Succsffully
            </div>
            <div className="logout_content">
                Now redirect to the home page
            </div>
            <div className="logout_loading">
                <LoadingButton size="large" loading variant="outlined" className="loading_btn"></LoadingButton>
            </div>
        </div>
    )
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
        updateShoppingCart(shoppingCart,uuid){
            dispatch(updateShoppingCart(shoppingCart,uuid))
        },
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(Logout);