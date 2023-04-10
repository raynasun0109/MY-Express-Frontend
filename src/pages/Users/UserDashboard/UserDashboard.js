import React, { useEffect, useState } from 'react';
import './UserDashboard.scss';
import UserLayout from '../UserLayout/UserLayout';
import Cookies from 'universal-cookie';
import { v4 as uuidv4 } from 'uuid';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FactoryIcon from '@mui/icons-material/Factory';
import Badge from '@mui/material/Badge';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import {getTranscationFromSameOrder} from '../../../service/TransactionService';
import {sortTransactionArray} from '../../../utils/functions';

const cookies = new Cookies();



export default function UserDashboard() {
  const [paidNumber,setPaidNumber]=useState(0)
  const [processingNumber,setProcessingNumber]=useState(0)
  const [shippedNumber,setShippedNumber]=useState(0)
  const [cookie,setCookie]=useState('')

  const my_order_list=[
    {
      name:"Paid",
      icon:<CurrencyExchangeIcon/>,
      total:paidNumber
  
    },
    {
      name:"Processing",
      icon:<FactoryIcon/>,
      total:processingNumber
      
    },
    {
      name:"Shipped",
      icon:<LocalShippingIcon/>,
      total:shippedNumber
    }
  ]

  useEffect(() => {
    fetchCookie()
}, []);

  function fetchCookie(){
    setCookie(cookies.get('myShopaholic')?cookies.get('myShopaholic'):'')
    fetchOrderList(cookies.get('myShopaholic')?cookies.get('myShopaholic'):'')
  }

  function fetchOrderList(id){
    getTranscationFromSameOrder({uuid:id.uuid,status:"Shipped"})
        .then(res => {
          setShippedNumber(sortTransactionArray(res.data).length)
        })
    getTranscationFromSameOrder({uuid:id.uuid,status:"Processing"})
      .then(res => {
        setProcessingNumber(sortTransactionArray(res.data).length)
      })
    getTranscationFromSameOrder({uuid:id.uuid,status:"Paid"})
      .then(res => {
        setPaidNumber(sortTransactionArray(res.data).length)
      })
    }

  return (
    <UserLayout className="user_dashboard_container" key="UserDashboard">
      <div className="user_dashboard_container_order">
        <div className="user_dashboard_container_order_title">My Orders</div>
        <div className="user_dashboard_container_order_content">
          {
            my_order_list.map((item)=>{
                return(
                  <div className="user_dashboard_container_order_item">
                    <div className="order_content_icon">
                      <Badge badgeContent={item.total} className="order_content_badge">{item.icon}</Badge>
                    </div>
                    <div className="order_content_name">{item.name}</div>
                  </div>
                )
            })
          }
        </div>
      </div>
    </UserLayout>
  )
}
