import './MerchantDashboard.scss';
import * as React from 'react';
import MerchantLayout from '../MerchantLayout/MerchantLayout';
import Cookies from 'universal-cookie';
import { v4 as uuidv4 } from 'uuid';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FactoryIcon from '@mui/icons-material/Factory';
import Badge from '@mui/material/Badge';
const cookies = new Cookies();

const my_order_list=[
  {
    name:"Unpaid",
    icon:<MoneyOffIcon/>

  },
  {
    name:"Processing",
    icon:<FactoryIcon/>
    
  },
  {
    name:"Shipped",
    icon:<LocalShippingIcon/>
  }
]

export default function MerchantDashboard() {
  return (
    <MerchantLayout className="user_dashboard_container" key="UserDashboard">
      <div className="user_dashboard_container_order">
        <div className="user_dashboard_container_order_title">My Orders</div>
        <div className="user_dashboard_container_order_content">
          {
            my_order_list.map((item)=>{
                return(
                  <div className="user_dashboard_container_order_item">
                    <div className="order_content_icon">
                      <Badge badgeContent={4} className="order_content_badge">{item.icon}</Badge>
                    </div>
                    <div className="order_content_name">{item.name}</div>
                  </div>
                )
            })
          }
        </div>
      </div>
    </MerchantLayout>
  )
}
