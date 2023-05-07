import React, { useEffect, useState } from 'react';
import UserLayout from '../../UserLayout/UserLayout';
import Cookies from 'universal-cookie';
import moment from "moment";
import './UserProcessing.scss';
import {getTranscationFromSameOrder} from '../../../../service/TransactionService';
import {sortTransactionArray} from '../../../../utils/functions';
const cookies = new Cookies();

export default function UserProcessing(){
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

        getTranscationFromSameOrder({uuid:id.uuid,status:"Processing"})
            .then(res => {
                setOrderList(sortTransactionArray(res.data))
            })
    }

    function RowContent({content}){
        let parseData = [{name:'Cannot retrieve data. Please contact the customer service'}]
        try {
            parseData=JSON.parse(content)
        } catch (error) {
        }
        return  <>
        <div className="user_order_container_first_block user_order_transaction_container_body_first_block">
             <img className="user_order_transaction_container_body_img" src={parseData[0].image}/>
             <div className="user_order_transaction_text_container">
                <div className="user_order_transaction_text_name">
                    {parseData[0].name}
                </div>
                <div className="user_order_transaction_text_desc">
                    {parseData[0].description}
                </div>
             </div>
         </div>
         <div className="user_order_container_block user_order_transaction_container_block">
            {parseData[0].price}
         </div>
         <div className="user_order_container_block user_order_transaction_container_block">
            {parseData[0].qty}
         </div>
         <div className="user_order_container_block user_order_transaction_container_block">
            {parseData[0].price&&parseData[0].qty&&Number(parseData[0].price)*parseData[0].qty}
         </div>
    </>   
    }

    return (
        <UserLayout key="UserOrders" className="user_order_container_processing">
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
                       list&& list.map((item)=>(
                            <div key={item.uuid} className="user_order_transaction_container_body">
                                 <RowContent content={item.product_content} />
                                <div className={`user_order_transaction_${item.status} user_order_transaction_ user_order_container_block user_order_transaction_container_block`}>
                                    {item.status}
                                </div>
                            </div>
                        ))
                    }
                </div>
            ))

         }
                
        </UserLayout>
    )
}
