import React, { useEffect, useState } from 'react';
import './Logout.scss';
import { LoadingButton } from '@mui/lab';
import Cookies from 'universal-cookie';
import { createMemoryHistory } from "history";
import { Link } from 'react-router-dom';

import { useNavigate,useLocation } from 'react-router-dom';
 
const cookies = new Cookies();

export default function Logout(){
    let history = createMemoryHistory();
    const navigate = useNavigate()

    useEffect(() => {
        cookies.remove('myShopaholic');
        console.log('i am logout');
        // setTimeout(() =>  navigate('/'), 3000);

        setTimeout(() => window.location.href=`http://${window.location.host}`, 3000);
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