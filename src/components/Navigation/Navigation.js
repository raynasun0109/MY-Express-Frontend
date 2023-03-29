import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import './Navigation.scss';
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import {user_type} from '../../utils/functions.js';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const cookies = new Cookies();
 
// const user_info=cookies.get('myShopaholic');
// console.log(999,user_info);
const Navigation_content = [
  {
    name:'Home'
  },
  {
    name:'About Us'
  }
];

function generate_path (item,user_info){
  const {name,url}=item;
  if(name=="Dashboard"){
      return `${url}/${user_type(user_info.type)}/${user_info.uuid}/dashboard`
  } else{
    return url
  }
}
const setting_content = [
  {
    name:'Profile',
    url:'/profile'
  },
  {
    name:'Dashboard',
    url:'/dashboard'
  },
  {
    name:'Logout',
    url:'logout'
  }
];
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export default function Navigation() {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [cookie,setCookie]=useState('')

  useEffect(() => {
    setCookie(cookies.get('myShopaholic')?cookies.get('myShopaholic'):'')
  }, []);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {Navigation_content.map((item, index) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {item.name % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <AppBar position="static" className="navigation_container">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <div key={'left'}>
                <Button onClick={toggleDrawer('left', true)}>
                  <MenuRoundedIcon className="navigation_container_menu_icon"/>
                </Button>
                <Drawer
                  anchor={'left'}
                  open={state['left']}
                  onClose={toggleDrawer('left', false)}
                >
                  {list('left')}
                </Drawer>
              </div>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={toggleDrawer('left', false)}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {Navigation_content.map((item,index) => (
                <MenuItem key={item.name} onClick={toggleDrawer('left', false)}>
                  <Typography textAlign="center">{item.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {Navigation_content.map((item,index) => (
              <Button
                key={item.name}
                onClick={toggleDrawer('left', false)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {item.name}
              </Button>
            ))}
          </Box>
          <Box className="cart_container">
            <Badge badgeContent={4} className="cart_container_badge">
              <ShoppingCartIcon className="cart_container_cart" />
            </Badge>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {
              cookie
                ?
                <>
                  <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar {...stringAvatar(`${cookie.first_name} ${cookie.last_name}`)} alt={cookie.last_name} src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  className="user_setting_container"
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {setting_content.map((setting) => (
                    <Link to={generate_path(setting,cookie)} key={setting.name}>
                      <MenuItem key={setting.name} onClick={handleCloseUserMenu} >
                        <Typography textAlign="center">{setting.name}</Typography>
                      </MenuItem>

                      {setting.url!=="logout"&&<Divider />}
                    </Link>
                  ))}
                  </Menu>
                </>
                :
                  <div className="login_register_container">
                    <Link to={'/login'}>Login</Link>
                    /
                    <Link to={'/register'}>Register</Link>
                  </div>
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </div>
  );
}