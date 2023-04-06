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
import {retrieve_shopping_cart} from '../../../utils/functions';
import {updateOneUser} from '../../../service/UserService';
import NumericInput from 'react-numeric-input';
import {connect} from "react-redux";
import {removeCountry,addCountry} from "../../../redux/actions/index.js";
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

   useEffect(() => {
        fetchCookie()
    }, []);

    function fetchCookie(){
        setCookie(cookies.get('myShopaholic')?cookies.get('myShopaholic'):'')
        setShoppingCart(cookies.get('myShopaholic')?JSON.parse(retrieve_shopping_cart(cookies.get('myShopaholic').shopping_cart)):[])
    }

    function handleQty (uuid,value) {
        console.log(uuid,value)
        // setQty(value)
        // shoppingCart.forEach((item) => {
        //     if(item.uuid==uuid){
        //         item.qty=JSON.stringify(value)
        //     }
        //   });
          const {first_name, last_name,password,email,type,created_at,update_at}=cookie;
          const data={
              first_name, last_name,password,email,type,uuid:cookie.uuid,
              shopping_cart:JSON.stringify(shoppingCart)
          }
          
          const newCookie={
            created_at,update_at,first_name, last_name,password,email,type,uuid:cookie.uuid,shopping_cart:JSON.stringify(shoppingCart)
          }
        //   updateOneUser(data)
        //       .then(res => {
        //          console.log("Res",res)
        //          setShoppingCart(shoppingCart)
        //          setCookie(newCookie)
        //          cookies.set('myShopaholic',JSON.stringify(newCookie))
        //       })
        console.log(shoppingCart)
        console.log(data,cookie)

    };

    function checkout(prop){
        // const productList=[];
        // product.qty=qty;
        // productList.push(product)
        // console.log('ssss',prop)
        navigate('/checkout', {replace: true,state:{products:prop}})

    }

    return (
        <UserLayout key="UserCart">
            <div className="user_cart_container">
            {console.log(console.log('prop',prop)
)}
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
                                {/* {console.log('shoppingCart',shoppingCart)} */}
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
                                    <NumericInput min={0} value={row.qty} precision={0} className="number_input"
                                        onChange={(value) => {handleQty(row.uuid,value)}}/>
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
                        <div className="user_cart_container_right_content_right">$</div>
                    </div>
                    <Button fullWidth className="user_cart_checkout_btn" onClick={()=>checkout(prop.state.products.shoppingCart)}>Checkout Now</Button>
                </div>
            </div>
        </UserLayout>
    )
}

const mapStateToProps=(state)=>{
        console.log('statssse',state)

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
  export default connect(mapStateToProps,mapDispatchToProps)(UserCart);