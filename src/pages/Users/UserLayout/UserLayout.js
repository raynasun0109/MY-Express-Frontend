import './UserLayout.scss';
import React, { useEffect, useState,useCallback } from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Navigation from '../../../components/Navigation/Navigation';
import Copyright from '../../../components/Copyright/Copyright.js';
import Cookies from 'universal-cookie';
import {user_type} from '../../../utils/functions.js';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate,useLocation } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading.js';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { createMemoryHistory } from "history";
import {connect} from "react-redux";
import {removeCountry,addCountry} from "../../../redux/actions/index.js";
import ScrollToTop from '../../../components/ScrollToTop/ScrollToTop';

const cookies = new Cookies();

function generate_path (item,user_info){
    const {name,url}=item;
    let new_path='';
    if(name=="Logout"){
        new_path=url;
    } else{
        new_path=`/dashboard/${user_type(user_info.type)}/${user_info.uuid}/${url}`
    }
    return new_path;
}

const setting_content = [
    {
        name:'My Dashboard',
        url:'dashboard',
        collapse:false,
        key:'dashboard'
    },
    {
        name:'My Profile',
        url:'profile',
        collapse:false,
        key:'profile'
      },
    {
      name:'My Orders',
      url:'orders',
      collapse:true,
      collapse_key:"openOrder",
      key:'orders',
      children:[
        {
            name:'Paid',
            url:'orders/paid',
            key:'paid',
        },
        {
            name:'Processing',
            url:'orders/processing',
            key:'processing',
        },
        {
            name:'Shipped',
            url:'orders/shipped',
            key:'shipped',
        }
      ]
    },
    {
      name:'My Cart',
      url:'carts',
      key:'carts',
      collapse:false,

    },
    {
      name:'Logout',
      key:'logout',
      url:'/logout',
      collapse:false,
    }
  ];

function UserLayout({children},props) {
    const [cookie,setCookie]=useState('')
    const [isSetIcon,setIcon]=useState();
    const [isShowLoading,setShowLoading]=useState(false);
    const [isLoading,setLoading]=useState(false);
    const [title,setTitle]=useState();
    const [content,setContent]=useState();
    const [activeTab,setActiveTab]=useState(setting_content[0]['name']);
    const [activeChildTab,setActiveChildTab]=useState(setting_content[0]['name']);

    const navigate = useNavigate()
    let location = useLocation();
    let history = createMemoryHistory();

    function checkActiveTab(){
        const currentPath=location.pathname.split('/')[4];
        const currentChildPath=location.pathname.split('/')[5];
        setActiveTab(currentPath)

        setActiveChildTab(currentChildPath)
    }

    function fetchCookie(){
        setCookie(cookies.get('myShopaholic')?cookies.get('myShopaholic'):'')
    }

    function checkCookie(){
        setShowLoading(cookies.get('myShopaholic')?false:true);
        setTitle("Login details expired");
        setContent("Direct to the login page now");
        setLoading(true);
        if(cookies.get('myShopaholic')==undefined){
            setTimeout(() => navigate('/login'), 3000);
        }
    }

    useEffect(() => {
        fetchCookie()
        checkCookie()
        checkActiveTab()
      }, []);

    function jumpTo(prop){
        // console.log(prop)
        checkActiveTab();
        const path=generate_path(prop,cookie);
        if (path=="/logout"){
            navigate(path, { replace: true })

            // console.log("history")
            // history.replace(path)
        }else{
            // console.log("navigate")

            navigate(path)
        }
    }

  return (
    <div className="user_layout_container" key={uuidv4()}>
        <ScrollToTop/>
        {/* {console.log(props)} */}
          {
            isShowLoading&&
            <Loading title={title} content={content} isLoading={isLoading} isSetIcon={isSetIcon}/>
          }
        <Navigation/>
        <div className="user_layout_container_content">
        <div className="user_layout_container_content_left">
                 <List className="user_layout_container_content_left_menu" >
                    {setting_content.map((item)=>{
                        return (
                            <>
                               {item.key!=="dashboard"&&<Divider />}
                                <div key={uuidv4()} className={activeTab==item.key?"active_menu_tbn":"inactive_menu_tbn"}>
                                    <div onClick={()=>{jumpTo(item)}} key={item.name} className="left_menu_item_container">
                                        <ListItemButton className="left_menu_item_btn" >
                                            {item.name}
                                            <span className="left_menu_item_icon">
                                                {item.collapse &&<ExpandMore/>}
                                            </span>
                                        </ListItemButton>
                                    </div>
                                    {item.collapse &&
                                        <Collapse in={true} timeout="auto" unmountOnExit>
                                            <Divider />
                                            <List component="div">
                                                {
                                                    item.children.map((child)=>{
                                                        return (
                                                            <div onClick={()=>{jumpTo(child)}} className={activeChildTab==child.key?"active_child_child_menu_tbn":"inactive_child_child_menu_tbn"}>
                                                                <ListItemButton sx={{ pl: 4 }}>
                                                                    {child.name}
                                                                </ListItemButton>
                                                            </div>
                                                        )
                                                    })
                                                }
                                             
                                            </List>
                                          </Collapse>
                                            }
                                </div>
                            </>
                            )
                        })
                    }
                </List>
            </div>
            <div className="user_layout_container_content_right">
                {children}
            </div>
        </div>
    </div>
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
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(UserLayout);