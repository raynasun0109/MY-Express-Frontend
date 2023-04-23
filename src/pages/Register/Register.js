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
import FormHelperText from '@mui/material/FormHelperText';

var CryptoJS = require("crypto-js");

const cookies = new Cookies();

export default function Register () {
    const [isLoading,setLoading]=useState(false);
    const [title,setTitle]=useState();
    const [email,setEmail]=useState();
    const [okSubmit,setOkSubmit]=useState(false);
    const [content,setContent]=useState();
    const [isSetIcon,setIcon]=useState();
    const [isShowLoading,setShowLoading]=useState(false);
    const [isError, setError] = useState({
      first_name:false,last_name:false,email:false,password:false,type:false
  });
    const [errorText, setErrorText] = useState({
    first_name:"",last_name:"",email:"",password:"",type:""
});
    const navigate = useNavigate();

   const handleChangeEmail = (event) => {
      const email = event.target.value;
      this.setState({ email });
  }

    const handleSubmit = (event) => {
        setOkSubmit(true);
        event.preventDefault();
        // fetch inputs
        const form = new FormData(event.currentTarget);
        const first_name= form.get('first_name').trim();
        const email= form.get('email').trim();
        const inputPwd=form.get('password');
        const password= CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(inputPwd));
        const last_name=form.get('last_name').trim();
        const type= form.get('row-radio-buttons-group')=="customer"
                    ? 1
                    :form.get('row-radio-buttons-group')=="merchant"
                      ? 2:"";
        const inputError={};
        const inputErrorText={};

        // form validation
        // check first name
        if(first_name==''){
          inputError['first_name']=true;
          inputErrorText['first_name']="Please input your first name";
          setOkSubmit(false);
        } else{
          inputError['first_name']=false;
          inputErrorText['first_name']="";
        }

        // check last name
        if(!last_name){
          inputError['last_name']=true;
          inputErrorText['last_name']="Please input your last name";
          setOkSubmit(false);
        }else{
          inputError['last_name']=false;
          inputErrorText['last_name']="";
        }

        //check email
        let emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let emailExp = new RegExp(emailReg);
        if(!email){
          inputError['email']=true;
          inputErrorText['email']="Please input your email";
          setOkSubmit(false);
        }else{
          if(email.match(emailExp) === null){
            inputError['email']=true;
            inputErrorText['email']="Please input the correct email address";
            setOkSubmit(false);
          } else{
            inputError['email']=false;
            inputErrorText['email']="";
          }
        }

        // check password
        let pswReg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/
        let pswExp = new RegExp(pswReg);

        if(!inputPwd){
          inputError['password']=true;
          inputErrorText['password']="Please input your password";
          setOkSubmit(false);
        }else{
          if(inputPwd.match(pswExp) === null){
            inputError['password']=true;
            inputErrorText['password']="Please make sure your password contains at least six characters, including at least one number and includes both lower and uppercase letters and special characters";
            setOkSubmit(false);
          } else{
            inputError['password']=false;
            inputErrorText['password']="";
          }
        }

        // check type
        if(!type){
          inputError['type']=true;
          inputErrorText['type']="Please choose the register type";
          setOkSubmit(false);
        }else{
          inputError['type']=false;
          inputErrorText['type']="";
        }

        setError(inputError);
        setErrorText(inputErrorText);

        const data = {
          first_name,
          email,
          password,
          last_name,
          type
        }
 
        if(okSubmit){
          setTitle("Registering");
          setContent("Don't leave the current page");
          setLoading(true);
        registerOneUser(data).then(res => {
              if(res.data.code==1){
                cookies.set('myShopaholic',JSON.stringify(res.data.data[0]),{
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
          }
      };

    return (
      <div className="register_container">{console.log('ok',okSubmit)}
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
              <FormControl variant="standard" error={isError.first_name}>
                <TextField
                  autoComplete="given-name"
                  name="first_name"
                  // required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  className="register_input_field"
                />
                </FormControl>
                <FormHelperText className="form_help_text">{isError.first_name&&errorText.first_name}</FormHelperText>
              </Grid>
              <Grid item xs={12} sm={6}>
              <FormControl variant="standard" error={isError.last_name}>
                <TextField
                  // required
                  id="outlined-error-helper-text"
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="last_name"
                  autoComplete="family-name"
                  className="register_input_field"
                />
                </FormControl>
                <FormHelperText className="form_help_text">{isError.last_name&&errorText.last_name}</FormHelperText>
              </Grid>
              <Grid item xs={12}>
              <FormControl variant="standard" className="form_full_width">
                <TextField
                  // required
                  // error={isError.email}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  className="register_input_field"
                />
                </FormControl>
                <FormHelperText className="form_help_text">{isError.email&&errorText.email}</FormHelperText>
              </Grid>
              <Grid item xs={12}>
              <FormControl className="form_full_width" variant="standard" error={isError.password}>
                <TextField
                  // required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  className="register_input_field"
                />
                  <FormHelperText className="form_help_text form_help_text_psw">{isError.password&&errorText.password}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl className="radio_container">
                    <FormLabel id="demo-row-radio-buttons-group-label">Type</FormLabel>
                    <RadioGroup
                        // required
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="customer" control={<Radio />} label="Customer" />
                        <FormControlLabel value="merchant" control={<Radio />} label="Merchant" />
                    </RadioGroup>
                    <FormHelperText className="form_help_text form_help_text_type">{isError.type&&errorText.type}</FormHelperText>
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