import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import './Checkout.scss';
import Cookies from 'universal-cookie';
import {calculate_shopping_cart} from '../../utils/functions';
import { useNavigate,useLocation } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Loading from '../../components/Loading/Loading.js';

const cookies = new Cookies();

const steps = [
    'Shipping address',
    'Payment details',
    'Review your order',
  ];
export default function Checkout(props){
    const [activeStep, setActiveStep] = useState(0);
    const [isSubmitOrder, setIsSubmitOrder] = useState(false);

    const [payment, setPayment] = useState({
        cardName:"",cardNumber:"",expDate:"",cvv:""
    });
    const location = useLocation();
    const [productList, setProductList] = useState([]);
    const [cookie,setCookie]=useState('')
    const [address, setAddress] = useState({
        firstName: "", lastName: "",address1: "",
        address2: "",city:"",state:"",zip:"",country:""
      });
      const [isLoading,setLoading]=useState(false);
      const [title,setTitle]=useState();
      const [content,setContent]=useState();
      const [isSetIcon,setIcon]=useState();
      const [isShowLoading,setShowLoading]=useState(false);
      const navigate = useNavigate();

      
    useEffect(() => {
        fetchCookie();
        fetchData()
    }, []);
 
    function fetchData(){
        setProductList(location.state.products)
    }

    function fetchCookie(){
        setCookie(cookies.get('myShopaholic')?cookies.get('myShopaholic'):'')
    }
    console.log('props',location)
    const handleNext = () => {
        setActiveStep(activeStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep(activeStep - 1);
      };

    const handleSubmitAddress = (event)=>{
        event.preventDefault();
        handleNext()
        const form = new FormData(event.currentTarget);
        setAddress({
            firstName:form.get('firstName'),
            lastName:form.get('lastName'),
            address1:form.get('address1'),
            address2:form.get('address2'),
            city:form.get('city'),
            state:form.get('state'),
            zip:form.get('zip'),
            country:form.get('country'),
        })
    }

    const handleSubmitCardName = (event) => {
        const { value } = event.target;
        setPayment({ ...payment, 'cardName': value });
    };

    const handleSubmitCardNumber = (event) => {
        const { value } = event.target;
        setPayment({ ...payment, 'cardNumber': value });
    };

    const handleSubmitExpDate = (event) => {
        const { value } = event.target;
        setPayment({ ...payment, 'expDate': value });
    };

    const handleSubmitCvv = (event) => {
        const { value } = event.target;
        setPayment({ ...payment, 'cvv': value });
    };

    const handlePlaceOrder = ()=>{
        setIsSubmitOrder(true);
        setTitle("Place order successfully");
        setContent("Direct to the home page now");
        setLoading(true);
        setShowLoading(true);
        // setTimeout(() => navigate('/'), 3000);
    }
    
    return (
        <div className="checkout_container">
            {            console.log('address',address,payment)
}
            <Box sx={{ width: '100%' }} className="checkout_container_stepper_box">
                <Stepper activeStep={activeStep} alternativeLabel className="checkout_container_stepper">
                    {steps.map((label) => (
                    <Step key={label} className="checkout_container_step">
                        <StepLabel className="checkout_container_label">{label}</StepLabel>
                    </Step>
                    ))}
                </Stepper>
            </Box>
            {
            activeStep==0 && (
                <form className="checkout_container_content" id="shippingAddress" onSubmit={handleSubmitAddress} component="form">
                    <div className="checkout_container_content_title">
                        Shipping address
                    </div>
                    <Grid container spacing={3} >
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="firstName"
                                name="firstName"
                                label="First name"
                                fullWidth
                                autoComplete="given-name"
                                variant="standard"
                                defaultValue={address.firstName}

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="lastName"
                                name="lastName"
                                label="Last name"
                                fullWidth
                                autoComplete="family-name"
                                variant="standard"
                                defaultValue={address.lastName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="address1"
                                name="address1"
                                label="Address line 1"
                                fullWidth
                                autoComplete="shipping address-line1"
                                variant="standard"
                                defaultValue={address.address1}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="address2"
                                name="address2"
                                label="Address line 2"
                                fullWidth
                                autoComplete="shipping address-line2"
                                variant="standard"
                                defaultValue={address.address2}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="city"
                                name="city"
                                label="City"
                                fullWidth
                                autoComplete="shipping address-level2"
                                variant="standard"
                                defaultValue={address.city}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="state"
                                name="state"
                                label="State/Province/Region"
                                fullWidth
                                variant="standard"
                                defaultValue={address.state}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="zip"
                                name="zip"
                                label="Zip / Postal code"
                                fullWidth
                                autoComplete="shipping postal-code"
                                variant="standard"
                                defaultValue={address.zip}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="country"
                                name="country"
                                label="Country"
                                fullWidth
                                autoComplete="shipping country"
                                variant="standard"
                                defaultValue={address.country}
                            />
                        </Grid>
                        {/* <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                                label="Use this address for payment details"
                            />
                        </Grid> */}
                    </Grid>
                    <Button
                        className="checkout_container_btn_next"
                        variant="contained"
                        type="submit"
                        // onClick={handleNext}
                        sx={{ mt: 3, ml: 1 }}
                        >
                        Next
                    </Button>
                </form>
                )}
              {
                activeStep==1 && (
                <div className="checkout_container_content" id="payment">
                    <div className="checkout_container_content_title">
                        Payment method
                    </div>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                id="cardName"
                                label="Name on card"
                                fullWidth
                                autoComplete="cc-name"
                                variant="standard"
                                defaultValue={payment.cardName}
                                onChange={handleSubmitCardName}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                id="cardNumber"
                                label="Card number"
                                fullWidth
                                autoComplete="cc-number"
                                variant="standard"
                                onChange={handleSubmitCardNumber}
                                defaultValue={payment.cardNumber}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                id="expDate"
                                label="Expiry date"
                                fullWidth
                                autoComplete="cc-exp"
                                variant="standard"
                                onChange={handleSubmitExpDate}
                                defaultValue={payment.expDate}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                id="cvv"
                                label="CVV"
                                helperText="Last three digits on signature strip"
                                fullWidth
                                autoComplete="cc-csc"
                                variant="standard"
                                onChange={handleSubmitCvv}
                                defaultValue={payment.cvv}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox color="secondary" name="saveCard" value="yes" />}
                                label="Remember credit card details for next time"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        className="checkout_container_btn_next"
                        variant="contained"
                        onClick={handleNext}
                        type="button"
                        sx={{ mt: 3, ml: 1 }}
                        >
                        Next
                    </Button>
                </div>
                )}
              {
                activeStep==2 && (
                <div className="checkout_container_content">
                    <div className="checkout_container_content_title">
                        Order summary
                    </div>
                    <List disablePadding>
                        {productList.map((product) => (
                        <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                            <ListItemText className="checkout_container_ordersummary_price" primary={product.name} secondary={product.desc} />
                            <Typography className="checkout_container_ordersummary_price">$ {product.price}</Typography>
                        </ListItem>
                        ))}
                        <Divider/>
                        <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText primary="Total" className="checkout_container_ordersummary_total"/>
                        <div className="checkout_container_ordersummary_total">
                            $ {calculate_shopping_cart(productList)}
                        </div>
                        </ListItem>
                    </List>
                   
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <div sx={{ mt: 2 }} className="checkout_container_ordersummary_subtitle">
                                Shipping
                            </div>
                            <Typography gutterBottom>{address.firstName} {address.lastName}</Typography>
                            <Typography gutterBottom>{address.address1},{address.address2},{address.city},{address.state},{address.country},{address.zip}</Typography>
                        </Grid>
                        <Grid item container direction="column" xs={12} sm={6}>
                        <div className="checkout_container_ordersummary_subtitle">
                            Payment details
                        </div>

                        <Grid container>
                            <React.Fragment>
                                <Grid item xs={6}>
                                <Typography gutterBottom>{payment.cardName}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                <Typography gutterBottom>{payment.cardNumber}</Typography>
                                </Grid>
                                
                            </React.Fragment>
                        </Grid>
                    </Grid>
                </Grid>
                <Button
                        className="checkout_container_btn_next"
                        variant="contained"
                        onClick={handlePlaceOrder}
                        sx={{ mt: 3, ml: 1 }}
                        >
                        Place Order
                    </Button>
            </div>
            )}
            {
                isSubmitOrder&&
                    isShowLoading&&
                    <Loading title={title} content={content} isLoading={isLoading} isSetIcon={isSetIcon}/>
                
            }
            <Box className="checkout_container_btn_container" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button className="checkout_container_btn_back" onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
            </Box>
        </div>
    )
}