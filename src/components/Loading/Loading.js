import React, { useEffect, useState } from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import './Loading.scss';
import { LoadingButton } from '@mui/lab';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';


const icon_list={
    error:<ErrorIcon className="error_icon" color="error"/>,
    register:<AppRegistrationIcon className="register_icon"/>
}

export default function Loading(prop){
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [isOpen,setOpen]=useState(true);
    const [isLoading,setLoading]=useState(prop.isLoading);

    const onOpen =(e)=>{
        e.preventDefault();
        setOpen(false)
    }

    return(
        <>
            <Dialog
                fullWidth
                className="loading_container"
                fullScreen={fullScreen}
                open={isOpen}
                aria-labelledby="responsive-dialog-title"
            >
              
                <IconButton
                    aria-label="close"
                    onClick={onOpen}
                    sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
                >
                    <CloseIcon />
                </IconButton>
                <div className="icon_container">
                    {icon_list[prop.isSetIcon]}
                </div>
                <DialogTitle id="responsive-dialog-title" className="loading_container_title">
                    {prop.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText className="loading_container_content">
                        {prop.content}
                    </DialogContentText>
                </DialogContent>
                <div className="loading_btn_container">

                {
                    isLoading&&<LoadingButton size="large" loading variant="outlined" className="loading_btn"></LoadingButton>

                }
                </div>
            </Dialog>
        </>
    )
}