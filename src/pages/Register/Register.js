import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import './Register.scss';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {registerOneUser} from '../../service/UserService';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';
import Loading from '../../components/Loading/Loading.js';
import { useNavigate} from 'react-router-dom';
import Cookies from 'universal-cookie';
var CryptoJS = require("crypto-js");

const cookies = new Cookies();

export default function Register () {
    const [isLoading,setLoading]=useState(false);
    const [title,setTitle]=useState();
    const [content,setContent]=useState();
    const [isSetIcon,setIcon]=useState();
    const [isShowLoading,setShowLoading]=useState(false);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setTitle("Registering");
        setContent("Don't leave the current page");
        setLoading(true);
        const form = new FormData(event.currentTarget);
        const type= form.get('row-radio-buttons-group')=="customer"? 1:2;
        const data = {
          first_name: form.get('first_name'),
          email: form.get('email'),
          password: CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(form.get('password'))),
          last_name: form.get('last_name'),
          type
        }
        registerOneUser(data).then(res => {
              if(res.data.code==1){
                cookies.set('myShopaholic',JSON.stringify(res.data.data),{
                  maxAge: 3600 // Will expire after 1hr (value is in number of sec.)
               })
                setTitle("Registered successfully");
                setContent("Direct to the home page now");
                setLoading(true);
                setShowLoading(true);
                setTimeout(() => navigate('/'), 3000);
              }else{
                setTitle("Your email is used");
                setIcon('error');
                setContent("Please choose another email to register");
                setLoading(false);
                setShowLoading(true);
              }
            });
      };

    return (
      <div className="register_container">
        <ScrollToTop/>
        {
          isShowLoading&&
          <Loading title={title} content={content} isLoading={isLoading} isSetIcon={isSetIcon}/>
        }

      <Container component="main" maxWidth="xs" className="register_container_content">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div className="register_container_content_title">
            Register
          </div>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="first_name"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  className="register_input_field"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="last_name"
                  autoComplete="family-name"
                  className="register_input_field"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  className="register_input_field"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  className="register_input_field"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl className="radio_container">
                    <FormLabel id="demo-row-radio-buttons-group-label">Type</FormLabel>
                    <RadioGroup
                        required
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="customer" control={<Radio />} label="Customer" />
                        <FormControlLabel value="merchant" control={<Radio />} label="Merchant" />
                    </RadioGroup>
                </FormControl>
              </Grid>
                {/** TODO Subscribe marketing */}
             {/**  <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>*/}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className="register_confirm_btn"
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end" className="register_action_container">
              <Grid item>
                <Link href="/signin" variant="body2" className="register_footer">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
        </div>
    );
};