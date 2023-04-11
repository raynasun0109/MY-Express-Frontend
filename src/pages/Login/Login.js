import React, { useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import './Login.scss';
import {userLogin} from '../../service/UserService';
import Loading from '../../components/Loading/Loading.js';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import {connect,useSelector,useDispatch} from "react-redux";
import {removeCountry,addCountry} from "../../redux/actions/index.js";
import {updateShoppingCart,refreshShoppingCart} from "../../redux/actions/products.js";

var CryptoJS = require("crypto-js");

const cookies = new Cookies();

function Login (prop) {
  const [isLoading,setLoading]=useState(false);
  const [title,setTitle]=useState();
  const [content,setContent]=useState();
  const [isSetIcon,setIcon]=useState();
  const [isShowLoading,setShowLoading]=useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch()


    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log('hang',prop)

        const form = new FormData(event.currentTarget);
        const data = {
          email: form.get('email'),
          password: CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(form.get('password'))),
        }
        userLogin(data).then(res => {
          if(res.data.code==1){
            console.log('login',res)
            cookies.set('myShopaholic',JSON.stringify(res.data.data[0]),{
              maxAge: 3600 // Will expire after 1hr (value is in number of sec.)
           })
           dispatch({type:'refreshShoppingCart',data:{shopping_cart:res.data.data[0].shopping_cart}})

            setTitle("Login successfully");
            setContent("Direct to the home page now");
            setLoading(true);
            setShowLoading(true);
            setTimeout(() => navigate('/'), 3000);
          }else{
            setTitle("Login Failed");
            setIcon('error');
            setContent("Please check your email or password");
            setLoading(false);
            setShowLoading(true);
          }
        });
      };

    return (
        <div className="login_container">
          {
            isShowLoading&&
            <Loading title={title} content={content} isLoading={isLoading} isSetIcon={isSetIcon}/>
          }
          <Container component="main" maxWidth="xs" className="login_container_content">
            <CssBaseline />
            <Box
              sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              }}
            >
              <div className="login_container_content_login">
                Login
              </div>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  className="login_input_field"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  className="login_input_field"
                />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="login_confirm_btn"
                sx={{ mt: 3, mb: 2 }}
              >
                Confirm
              </Button>
              <Grid container className="login_action_container">
                <Grid item xs>
                  {/** TODO Forgot password */}
                  <Link href="#" variant="body2" className="signin_footer">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2" className="signin_footer">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
      </Container>

        </div>
    );
};

const mapStateToProps=(state)=>{
  return {
      state,
      }
  }
  
  const mapDispatchToProps=(dispatch)=>{
      return {
          refreshShoppingCart(){
              dispatch(refreshShoppingCart())
          },
          removeCountry(item){
              dispatch(removeCountry(item))
          },
          updateShoppingCart(shoppingCart,uuid){
              dispatch(updateShoppingCart(shoppingCart,uuid))
          },
      }
    }
    export default connect(mapStateToProps,mapDispatchToProps)(Login);