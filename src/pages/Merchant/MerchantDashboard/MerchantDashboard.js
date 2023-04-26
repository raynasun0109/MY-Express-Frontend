import React, { useEffect, useState } from 'react';
import './MerchantDashboard.scss';
import MerchantLayout from '../MerchantLayout/MerchantLayout';
import Cookies from 'universal-cookie';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FactoryIcon from '@mui/icons-material/Factory';
import Badge from '@mui/material/Badge';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer,LineChart, Line  } from 'recharts';
import {getTotalFromTranscation,getDailyTotalFromTranscation,getWeeklyTranscation} from '../../../service/TransactionService';
import moment from "moment";

const cookies = new Cookies();
const currentTime= JSON.stringify(moment().valueOf());

// const data = [
//   {
//     name: 'Page A',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Page B',
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: 'Page C',
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: 'Page D',
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: 'Page E',
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: 'Page F',
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: 'Page G',
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];
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
  const [cookie,setCookie]=useState('')
  const [todayList,setTodayList]=useState([])
  const [todayAmount,setTodayAmount]=useState(0)
  const [estimatedList,setEstimatedList]=useState([])
  const [estimatedAmount,setEstimatedAmount]=useState(0)
  const [weeklyOrderAmount,setWeeklyOrderAmount]=useState(0)
  const [weeklyOrderList,setWeeklyOrderList]=useState([])
  const [dailyAmount,setDailyAmount]=useState(0)
  const [weeklyList,setWeeklyList]=useState([])
  const [weeklyAmount,setWeeklyAmount]=useState([])

  useEffect(() => {
    fetchCookie()
}, []);

function fetchCookie(){
    setCookie(cookies.get('myShopaholic')?cookies.get('myShopaholic'):'')
    fetchTodayAmount(cookies.get('myShopaholic')?cookies.get('myShopaholic'):'')
    fetchTodayList(cookies.get('myShopaholic')?cookies.get('myShopaholic'):'')
    fetchEstimated(cookies.get('myShopaholic')?cookies.get('myShopaholic'):'')
    fetchDaily(cookies.get('myShopaholic')?cookies.get('myShopaholic'):'')
    fetchWeeklyTranscation(cookies.get('myShopaholic')?cookies.get('myShopaholic'):'')

}

function fetchTodayAmount(id){
  const start_time=moment().startOf('day').valueOf();
  const end_time = moment().endOf('day').valueOf();
  // console.log(start_time,end_time)
    getTotalFromTranscation({merchant_uuid:id.uuid,start_time,end_time})
        .then(res => {
          setTodayAmount(res.data.total)
        })
}

function fetchTodayList(id){
  const start_time=moment().startOf('week').valueOf();
  const end_time = moment().endOf('week').valueOf();
  // console.log(start_time,end_time)
    getTotalFromTranscation({merchant_uuid:id.uuid,start_time,end_time,status:'shipped'})
        .then(res => {
          // console.log(res.data)
          setTodayList(res.data.data)
        })
}

function fetchEstimated(id){
  const start_time=moment().startOf('week').valueOf();
  const end_time = moment().endOf('week').valueOf();
    getTotalFromTranscation({merchant_uuid:id.uuid,start_time,end_time})
        .then(res => {
          // console.log(res)
          setEstimatedAmount(res.data.total)
          setEstimatedList(res.data.data)
        })
}

function fetchDaily(id){
  const start_time=moment().startOf('week').valueOf();
  const end_time = moment().endOf('week').valueOf();
    getDailyTotalFromTranscation({merchant_uuid:id.uuid,start_time,end_time})
        .then(res => {
          // console.log(res)
          setWeeklyOrderAmount(res.data.number)
          setWeeklyOrderList(res.data.list)
        })
}

function fetchWeeklyTranscation(id){
  const start_time=moment().startOf('week').valueOf();
  const end_time = moment().endOf('week').valueOf();
    getWeeklyTranscation({merchant_uuid:id.uuid,start_time,end_time})
        .then(res => {
          // console.log(res)
          // setWeeklyOrderAmount(res.data.number)
          setWeeklyList(res.data.list)
        })
}

  return (
    <MerchantLayout key="MerchantDashboard">
      <div className="merchant_dashboard_container">
        {/* <div className="merchant_dashboard_container_title">Bussiness Performance</div> */}
        <div className="merchant_dashboard_container_top">
          <div className="merchant_dashboard_container_content">
            <div className="merchant_dashboard_container_content_left merchant_dashboard_container_block">
              <div className="merchant_dashboard_container_content_title">
                Weekly Sales
              </div>
              <div className="merchant_dashboard_container_content_container">
                  <div className="merchant_dashboard_container_content_chart">
                    <LineChart width={300} height={100} data={todayList}>
                      <Line type="monotone" dataKey="total" stroke="#f8b62b" strokeWidth={2} />
                    </LineChart>
                  </div>
                  <div className="merchant_dashboard_container_content_text">
                    <div className="merchant_dashboard_container_content_text_title">
                      Today
                    </div>
                    <div className="merchant_dashboard_container_content_text_amount">
                      ${todayAmount}
                    </div>
                  </div>
                </div>
            </div>
            <div className="merchant_dashboard_container_content_left merchant_dashboard_container_block">
              <div className="merchant_dashboard_container_content_title">
                Weekly Estimated Sales
              </div>
              <div className="merchant_dashboard_container_content_container">
                  <div className="merchant_dashboard_container_content_chart">
                    <LineChart width={300} height={100} data={estimatedList}>
                      <Line type="monotone" dataKey="total" stroke="#f8b62b" strokeWidth={2} />
                    </LineChart>
                  </div>
                  <div className="merchant_dashboard_container_content_text">
                    <div className="merchant_dashboard_container_content_text_title">
                      This Week
                    </div>
                    <div className="merchant_dashboard_container_content_text_amount">
                      ${estimatedAmount}
                    </div>
                  </div>
                </div>
            </div>
            <div className="merchant_dashboard_container_content_left merchant_dashboard_container_block">
              <div className="merchant_dashboard_container_content_title">
                Weekly Orders
              </div>
              <div className="merchant_dashboard_container_content_container">
                  <div className="merchant_dashboard_container_content_chart">
                    <LineChart width={300} height={100} data={weeklyOrderList}>
                      <Line type="monotone" dataKey="number" stroke="#f8b62b" strokeWidth={2} />
                    </LineChart>
                  </div>
                  <div className="merchant_dashboard_container_content_text">
                    <div className="merchant_dashboard_container_content_text_title">
                      This Week
                    </div>
                    <div className="merchant_dashboard_container_content_text_amount">
                      {weeklyOrderAmount}
                    </div>
                  </div>
                </div>
            </div>
            </div>
        </div>

        <div className="merchant_dashboard_container_bottom merchant_dashboard_container_block">
          <div className="merchant_dashboard_container_content_title">
                Weekly Report
          </div>
          <BarChart
            width={500}
            height={300}
            data={weeklyList}
            margin={{
              top: 20,
              right: 30,
              left: 0,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Paid" fill="#f8b62b" />
            <Bar dataKey="Processing" fill="#e4007f" />
            <Bar dataKey="Shipped" fill="#c85145" />

          </BarChart>
        </div>
      </div>
    </MerchantLayout>
  )
}
