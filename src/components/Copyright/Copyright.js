import Typography from '@mui/material/Typography';

export default function Copyright(props) {
    return (
      <Typography className="copyright_container" variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
       
          MY Shopaholic
        {' '}
        {new Date().getFullYear()}{'.'}
      </Typography>
    );
  }