import React, { useEffect, useState } from 'react';
import UserLayout from '../UserLayout/UserLayout';
import Cookies from 'universal-cookie';
import moment from "moment";
import './UserOrders.scss';
import {getTranscationFromSameOrder} from '../../../service/TransactionService';
import {sortTransactionArray} from '../../../utils/functions';
const cookies = new Cookies();

export default function UserOrders(){
    const [orderList, setOrderList] = useState([]);
    const [cookie,setCookie]=useState('')
    
    useEffect(() => {
        fetchCookie()
    }, []);

    function fetchCookie(){
        setCookie(cookies.get('myShopaholic')?cookies.get('myShopaholic'):'')
        fetchOrderList(cookies.get('myShopaholic')?cookies.get('myShopaholic'):'')
    }

    function fetchOrderList(id){

        getTranscationFromSameOrder({uuid:id.uuid})
            .then(res => {
                setOrderList(sortTransactionArray(res.data))
            })
    }

    return (
        <UserLayout key="UserOrders" className="user_order_container">
            <div className="user_order_container_head">
                <div className="user_order_container_head_block user_order_container_first_block">Product</div>
                <div className="user_order_container_head_block user_order_container_block user_order_container_head_cell">Item</div>
                <div className="user_order_container_head_block user_order_container_block user_order_container_head_cell">Qty</div>
                <div className="user_order_container_head_block user_order_container_block user_order_container_head_cell">Price</div>
                <div className="user_order_container_head_block user_order_container_block user_order_container_head_cell">Status</div>
            </div>
            
            {
            orderList&&orderList.map((list) => (
                <div key={list[0].uuid} className="user_order_transaction_container">
                    <div className="user_order_transaction_container_head">
                            <span className="user_order_transaction_head_date">{moment(JSON.parse(list[0].created_at)).format('YYYY-MM-DD')} </span> 
                            <span className="user_order_transaction_head_order">Order#</span>
                            <span className="user_order_transaction_head_order_uuid">{list[0].order_uuid}</span> 
                    </div>

                    {
                        list.map((item)=>(
                            <div key={item.uuid} className="user_order_transaction_container_body">
                                <div className="user_order_container_first_block user_order_transaction_container_body_first_block">
                                    <img className="user_order_transaction_container_body_img" src={JSON.parse(item.product_content)[0].image}/>
                                    <div className="user_order_transaction_text_container">
                                        <div className="user_order_transaction_text_name">
                                            {JSON.parse(item.product_content)[0].name}
                                        </div>
                                        <div className="user_order_transaction_text_desc">
                                            {JSON.parse(item.product_content)[0].description}
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="user_order_container_block user_order_transaction_container_block">
                                    {JSON.parse(item.product_content)[0].price}
                                </div>
                                <div className="user_order_container_block user_order_transaction_container_block">
                                    {JSON.parse(item.product_content)[0].qty}
                                </div>
                                <div className="user_order_container_block user_order_transaction_container_block">
                                    {JSON.parse(item.product_content)[0].price*JSON.parse(item.product_content)[0].qty}
                                </div>
                                <div className={`user_order_transaction_${item.status} user_order_transaction_ user_order_container_block user_order_transaction_container_block`}>
                                    {item.status}
                                </div>
                            {/* {console.log(item.merchant_uuid,JSON.parse(item.product_content))} */}
                            </div>
                        ))
                           
                        
                    }
                </div>
            ))

         }
                
        </UserLayout>
    )
}
