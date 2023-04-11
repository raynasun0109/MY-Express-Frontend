import React, { useEffect, useState } from 'react';
import './UserProfile.scss';
import UserLayout from '../UserLayout/UserLayout';
import Cookies from 'universal-cookie';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import moment from "moment";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {updateOneUser} from '../../../service/UserService';
import Grid from '@mui/material/Grid';
import {user_type} from '../../../utils/functions';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import Base64 from 'crypto-js/enc-base64';
import Loading from '../../../components/Loading/Loading.js';

var CryptoJS = require("crypto-js");

const cookies = new Cookies();

export default function UserProfile(){
    const [cookie,setCookie]=useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading,setLoading]=useState(false);
    const [title,setTitle]=useState();
    const [content,setContent]=useState();
    const [isSetIcon,setIcon]=useState();
    const [isShowLoading,setShowLoading]=useState(false);
    const [psd,setPsd]=useState('')

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
        // console.log(event.currentTarget)
      };
    useEffect(() => {
        fetchCookie()
    }, []);
    
    function fetchCookie(){
        setCookie(cookies.get('myShopaholic')?cookies.get('myShopaholic'):'')
        setPsd(cookies.get('myShopaholic')?CryptoJS.enc.Base64.parse(cookies.get('myShopaholic').password).toString(CryptoJS.enc.Utf8):'')
    }


    function handlePsw(event){
        const { value } = event.target;

        // console.log('value',value)
        setPsd(value)
    }

    const handleUpdateUser=(event)=>{
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const data = {
            shopping_cart:cookie.shopping_cart,
            uuid:cookie.uuid,
            first_name: form.get('first_name'),
            email: form.get('email'),
            password: CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(psd)),
            last_name: form.get('last_name'),
            type:cookie.type
          }
          console.log(data)
          updateOneUser(data).then(res => {
              
            if(res.status==200){
                setShowLoading(true);
                cookies.set('myShopaholic',JSON.stringify(data));
                fetchCookie();
                setCookie(data);
                setTitle("Update successfully");
                setContent("Updating profile");
                setLoading(true);
                setShowLoading(true);
                const timer=setTimeout(() => setShowLoading(false), 3000)
                // clearTimeout(timer);
                } else{
                    setTitle("Update Failed");
                    setContent("Please try again");
                    setLoading(true);
                    setShowLoading(true);                }
        })
    }

    return (
        <UserLayout>
              {
            isShowLoading&&
            <Loading title={title} content={content} isLoading={isLoading} isSetIcon={isSetIcon}/>
          }
            {/* {console.log(CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse('123456')),CryptoJS.enc.Base64.parse("MTIzNDU2").toString(CryptoJS.enc.Utf8) */}
            <div className="user_profile_container">
            <form component="form" className="user_profile_container_box" onSubmit={handleUpdateUser}>
                <Grid container spacing={3} >
                    <Grid item xs={12} sm={6}>

                    <div className="user_profile_container_box_content">
                        <div className="user_profile_container_box_content_title">
                            First Name:
                        </div>
                        <TextField
                            margin="normal"
                            required
                            // fullWidth
                            id="first_name"
                            name="first_name"
                            defaultValue={cookie.first_name}
                            autoFocus
                            className="user_profile_container_box_content_input"
                        />
                    </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>

                    <div className="user_profile_container_box_content" >
                        <div className="user_profile_container_box_content_title">
                            Last Name:
                        </div>
                        <TextField
                            margin="normal"
                            required
                            // fullWidth
                            id="last_name"
                            defaultValue={cookie.last_name}
                            name="last_name"
                            autoFocus
                            className="user_profile_container_box_content_input"
                        />
                    </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>

                    <div className="user_profile_container_box_content">
                        <div className="user_profile_container_box_content_title">
                            Type:
                        </div>
                        <div className="user_profile_container_box_content_type">
                            {user_type(cookie.type)}
                        </div>
                        
                    </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>

                    <div className="user_profile_container_box_content">
                        <div className="user_profile_container_box_content_title">
                            Email:
                        </div>
                        <TextField
                            margin="normal"
                            required
                            // fullWidth
                            id="email"
                            name="email"
                            autoFocus
                            defaultValue={cookie.email}
                            className="user_profile_container_box_content_input"
                        />
                    </div>
                    </Grid>
                    <Grid item xs={12}>

                    <div className="user_profile_container_box_content">
                        <div className="user_profile_container_box_content_title">
                            Password:
                        </div>
                        {
                            cookie.password&&
                            <OutlinedInput
                            name="password"
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            className="user_profile_container_box_content_input"
                            defaultValue={psd}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            onChange={(value) => {handlePsw(value)}}
                        />
                        }
                     
                        {/* <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            name="password"
                            autoFocus
                            defaultValue={cookie.password}
                            className="user_profile_container_box_content_input"
                        /> */}
                    </div>
                    </Grid>
                    <Button
                            type="submit"
                            variant="contained"
                            className="update_confirm_btn"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Update
                        </Button>
                    </Grid>
                </form>
            </div>
        </UserLayout>
    )
}