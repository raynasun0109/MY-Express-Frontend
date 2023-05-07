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
import { styled, useTheme } from '@mui/material/styles';
import AppsIcon from '@mui/icons-material/Apps';
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
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PersonIcon from '@mui/icons-material/Person';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import BarChartIcon from '@mui/icons-material/BarChart';

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
      name:'My Orders',
      url:'orders',
      collapse:true,
      collapse_key:"openOrder",
      key:'orders',
      icon:<EventNoteIcon/>,
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
      icon:<ShoppingCartIcon/>

    },
    {
      name:'Logout',
      key:'logout',
      url:'/logout',
      collapse:false,
      icon:<LogoutIcon/>
    }
  ];
  const drawerWidth = 240;
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
  
function UserLayout({children},props) {
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
                 <List className="user_layout_container_content_left_menu hideOnTablet hideOnMobile" >
                    {setting_content.map((item)=>{
                        return (
                            <div key={item.key}>
                                {item.key!=="dashboard"&&<Divider />}
                                <div className={activeTab==item.key?"active_menu_tbn":"inactive_menu_tbn"}>
                                    <div onClick={()=>{jumpTo(item)}} className="left_menu_item_container">
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

                                        {/* <ListItemButton className="left_menu_item_btn" >
                                        {item.icon} {item.name}
                                            <span className="left_menu_item_icon">
                                                {item.collapse &&<ExpandMore/>}
                                            </span>
                                        </ListItemButton> */}
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