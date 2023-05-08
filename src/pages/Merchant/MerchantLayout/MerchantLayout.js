import './MerchantLayout.scss';
import React, { useEffect, useState,useCallback } from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Navigation from '../../../components/Navigation/Navigation';
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
import ScrollToTop from '../../../components/ScrollToTop/ScrollToTop';
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import LogoutIcon from '@mui/icons-material/Logout';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import IconButton from '@mui/material/IconButton';
import { styled, useTheme } from '@mui/material/styles';
import AppsIcon from '@mui/icons-material/Apps';

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
        key:'dashboard',
        icon:<BarChartIcon/>
    },
    {
        name:'My Profile',
        url:'profile',
        collapse:false,
        key:'profile',
        icon:<PersonIcon/>
    },
    {
        name:'Transaction Management',
        url:'transaction',
        collapse:true,
        collapse_key:"openOrder",
        key:'transaction',
        icon:<AccountBalanceIcon/>,
        children:[
        {
            name:'Paid',
            url:'transaction/paid',
            key:'paid',
        },
        {
            name:'Processing',
            url:'transaction/processing',
            key:'processing',
        },
        {
            name:'Shipped',
            url:'transaction/shipped',
            key:'shipped',
        }
      ]
    },
    {
      name:'Product Management',
      url:'products',
      key:'products',
      collapse:false,
      icon:<InventoryIcon/>
    },
    {
      name:'Logout',
      key:'logout',
      url:'/logout',
      collapse:false,
      icon:<LogoutIcon/>
    }
  ];
  const drawerWidth = 270;
  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });
  
  const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });
  
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  
  
  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
  );

export default function MerchantLayout({children}) {
    const [cookie,setCookie]=useState('')
    const [isSetIcon,setIcon]=useState();
    const [isShowLoading,setShowLoading]=useState(false);
    const [isLoading,setLoading]=useState(false);
    const [title,setTitle]=useState();
    const [content,setContent]=useState();
    const [activeTab,setActiveTab]=useState(setting_content[0]['name']);
    const [activeChildTab,setActiveChildTab]=useState(setting_content[0]['name']);
    const [open, setOpen] = useState(false);
    
    const handleDrawerClose = () => {
        setOpen(!open);
    };

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
        // console.log(cookie)
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
        checkActiveTab();
        const path=generate_path(prop,cookie);
     
        if (path=="/logout"){
            navigate(path, { replace: true })
            // history.replace(path)
        }else{
            navigate(path)
        }
    }

  return (
    <div className="merchant_layout_container" key={uuidv4()}>
        <ScrollToTop/>
          {
            isShowLoading&&
            <Loading title={title} content={content} isLoading={isLoading} isSetIcon={isSetIcon}/>
          }
        <Navigation/>
        <div className="merchant_layout_container_content">
            <div className="merchant_layout_container_content_left">
                <Drawer className="mobile_menu_container hideOnDesktop" variant="permanent" open={open}>
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {open?<ChevronLeftIcon />: <AppsIcon/>}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                        <List>
                        {setting_content.map((item, index) => (
                            <div key={`mobile_menu_${item.key}`}>
                            <ListItem className={activeTab==item.key?"active_menu_tbn":"inactive_menu_tbn"} key={`mobile_menu_${item.key}`} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                            </ListItem>
                            {open&&item.collapse &&
                                <List component="div">
                                    <Divider />
                                    {item.children.map((child)=>{
                                        return (
                                            <div key={`mobile_menu_container${child.key}`} onClick={()=>{jumpTo(child)}} className={activeChildTab==child.key?"active_child_child_menu_tbn":"inactive_child_child_menu_tbn"}>
                                                <ListItemButton sx={{ pl: 4 }}>
                                                    {child.name}
                                                </ListItemButton>
                                            </div>
                                        )
                                    })
                                    }
                                    <Divider />
                                </List>
                            }
                            </div>
                        ))}
                        </List>
                        <Divider />
                </Drawer>
                <List className="merchant_layout_container_content_left_menu hideOnTablet hideOnMobile" >
                    {setting_content.map((item)=>{
                        return (
                            <div key={item.key}>
                               {item.key!=="dashboard"&&<Divider />}
                                <div key={uuidv4()} className={activeTab==item.key?"active_menu_tbn":"inactive_menu_tbn"}>
                                    <div onClick={()=>{jumpTo(item)}} key={item.name} className="left_menu_item_container">
                                        {/* <ListItemButton className="left_menu_item_btn" >
                                            {item.name}
                                            <span className="left_menu_item_icon">
                                                {item.collapse &&<ExpandMore/>}
                                            </span>
                                        </ListItemButton> */}
                                             <ListItemButton
                                            sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                            }}
                                        >
                                            <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                            >
                                                {item.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={item.name} />
                                        </ListItemButton>
                                    </div>
                                    {item.collapse &&
                                        <Collapse in={true} timeout="auto" unmountOnExit>
                                            <Divider />
                                            <List component="div">
                                                {
                                                    item.children.map((child)=>{
                                                        return (
                                                            <div key={child.key} onClick={()=>{jumpTo(child)}} className={activeChildTab==child.key?"active_child_child_menu_tbn":"inactive_child_child_menu_tbn"}>
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
                            </div>
                            )
                        })
                    }
                </List>
            </div>
            <div className="merchant_layout_container_content_right">
                {children}
            </div>
        </div>
    </div>
  )
}
