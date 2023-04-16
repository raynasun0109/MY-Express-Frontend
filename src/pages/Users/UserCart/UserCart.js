import React, { useEffect, useState } from 'react';
import UserLayout from '../UserLayout/UserLayout';
import { v4 as uuidv4 } from 'uuid';
import './UserCart.scss';
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
import {getProductsFromMerchant,deleteOneProduct,updateOneProduct,addOneProduct} from '../../../service/ProductService';
import moment from "moment";
import Box from '@mui/material/Box';
import {retrieve_shopping_cart,calculate_shopping_cart} from '../../../utils/functions';
import {updateOneUser} from '../../../service/UserService';
import NumericInput from 'react-numeric-input';
import {connect,useSelector,useDispatch} from "react-redux";
import {removeCountry,addCountry} from "../../../redux/actions/index.js";
import {updateShoppingCart} from "../../../redux/actions/products.js";
import { useNavigate,useLocation } from 'react-router-dom';

const cookies = new Cookies();

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
    },
    [`&.${tableCellClasses.body}`]: {
    },
}));

function UserCart(prop){
    const [shoppingCart,setShoppingCart]=useState([])
    const [cookie,setCookie]=useState('')
    let location = useLocation();
    const navigate = useNavigate()
    const dispatch = useDispatch();

   useEffect(() => {
        fetchCookie()
    }, []);

    function fetchCookie(){
        setCookie(cookies.get('myShopaholic')?cookies.get('myShopaholic'):'')
    }

    function handleQty (uuid,value,shoppingCart,prop) {
        shoppingCart.forEach((item) => {
            if(item.uuid==uuid){
                item.qty=value
            }
     
        })
        dispatch({type:'updateShoppingCart',data:{shopping_cart:shoppingCart,uuid:cookie.uuid}})
    };

    function checkout(prop){
        navigate('/checkout', {replace: true,state:{products:prop}})

    }

    return (
        <UserLayout key="UserCart">
            <div className="user_cart_container">
            {/* {console.log(console.log('prop',prop) */}

                    <TableContainer className="user_cart_container_left">
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead className="user_cart_container_table_head">
                                <TableRow className="user_cart_container_table_row">
                                    <StyledTableCell>Item</StyledTableCell>
                                    <StyledTableCell>Price</StyledTableCell>
                                    <StyledTableCell>Qty</StyledTableCell>
                                    <StyledTableCell>Total</StyledTableCell>
                                    {/* <StyledTableCell>Updated</StyledTableCell>
                                    <StyledTableCell>Modify</StyledTableCell> */}

                                </TableRow>
                            </TableHead>
                            <TableBody className="merchant_container_bottom_body">
                                {console.log('shoppingCart',prop.state)}
                            {prop.state.products.shoppingCart&&
                            prop.state.products.shoppingCart.map((row) => (
                                <TableRow key={row.uuid}>
                                    <TableCell scope="row" className="user_cart_container_body_img_container">
                                        <img src={row.image}/>{row.name}
                                    </TableCell>
                                    <TableCell>
                                        {row.price}
                                    </TableCell>
                                    <TableCell>
                                    <NumericInput min={1} value={row.qty} precision={0} className="number_input"
                                        onChange={(value) => {handleQty(row.uuid,value,prop.state.products.shoppingCart,prop)}}/>
                                    </TableCell>
                                   
                                    <TableCell>
                                        
                                        {row.price*row.qty}
                                    </TableCell>
                              
                                    {/* <TableCell className="merchant_container_bottom_body_btn_container">
                                        <Button variant="outlined" className="merchant_update_btn" onClick={()=>handleOpenUpdate(row)}>Update</Button>
                                        <Button variant="outlined" className="merchant_delete_btn" onClick={()=>deleteProduct(row.uuid)}>Delete</Button>
                                    </TableCell> */}
                                </TableRow>
                            ))}

                            </TableBody>
                        </Table>
                    </TableContainer>
                 
                <div className="user_cart_container_right">
                    <div className="user_cart_container_right_title">
                        Order Summary
                    </div>
                    <div className="user_cart_container_right_content">
                        <div className="user_cart_container_right_content_left">Subtotal</div>
                        <div className="user_cart_container_right_content_right">${calculate_shopping_cart(prop.state.products.shoppingCart)}</div>
                    </div>
                    <Button fullWidth className="user_cart_checkout_btn" onClick={()=>checkout(prop.state.products.shoppingCart)}>Checkout Now</Button>
                </div>
            </div>
        </UserLayout>
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
  export default connect(mapStateToProps,mapDispatchToProps)(UserCart);