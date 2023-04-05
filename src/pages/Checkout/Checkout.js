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
const products = [
    {
      name: 'Product 1',
      desc: 'A nice thing',
      price: '$9.99',
    },
    {
      name: 'Product 2',
      desc: 'Another thing',
      price: '$3.45',
    },
    {
      name: 'Product 3',
      desc: 'Something else',
      price: '$6.51',
    },
    {
      name: 'Product 4',
      desc: 'Best thing of all',
      price: '$14.11',
    },
    { name: 'Shipping', desc: '', price: 'Free' },
  ];
  
  const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
  const payments = [
    { name: 'Card type', detail: 'Visa' },
    { name: 'Card holder', detail: 'Mr John Smith' },
    { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
    { name: 'Expiry date', detail: '04/2024' },
  ];
const steps = [
    'Shipping address',
    'Payment details',
    'Review your order',
  ];
export default function Checkout(prop){
    const [activeStep, setActiveStep] = React.useState(0);
    const [payment, setPayment] = React.useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep(activeStep - 1);
      };
    return (
        <div className="checkout_container">
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
                <div className="checkout_container_content">
                    <div className="checkout_container_content_title">
                        Shipping address
                    </div>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="firstName"
                                name="firstName"
                                label="First name"
                                fullWidth
                                autoComplete="given-name"
                                variant="standard"
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
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="state"
                                name="state"
                                label="State/Province/Region"
                                fullWidth
                                variant="standard"
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
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                                label="Use this address for payment details"
                            />
                        </Grid>
                    </Grid>
                </div>
                )}
              {
                activeStep==1 && (
                <div className="checkout_container_content">
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
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox color="secondary" name="saveCard" value="yes" />}
                                label="Remember credit card details for next time"
                            />
                        </Grid>
                    </Grid>
                </div>
                )}
              {
                activeStep==2 && (
                <div className="checkout_container_content">
                    <div className="checkout_container_content_title">
                        Order summary
                    </div>
                    <List disablePadding>
                        {products.map((product) => (
                        <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={product.name} secondary={product.desc} />
                            <Typography variant="body2">{product.price}</Typography>
                        </ListItem>
                        ))}

                        <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText primary="Total" />
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                            $34.06
                        </Typography>
                        </ListItem>
                    </List>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                                Shipping
                            </Typography>
                            <Typography gutterBottom>John Smith</Typography>
                            <Typography gutterBottom>{addresses.join(', ')}</Typography>
                        </Grid>
                        <Grid item container direction="column" xs={12} sm={6}>
                        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                            Payment details
                        </Typography>
                        <Grid container>
                            {payments.map((payment) => (
                            <React.Fragment key={payment.name}>
                                <Grid item xs={6}>
                                <Typography gutterBottom>{payment.name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                <Typography gutterBottom>{payment.detail}</Typography>
                                </Grid>
                            </React.Fragment>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            )}
            <Box className="checkout_container_btn_container" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button className="checkout_container_btn_back" onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                className="checkout_container_btn_next"
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
            </Box>
        </div>
    )
}