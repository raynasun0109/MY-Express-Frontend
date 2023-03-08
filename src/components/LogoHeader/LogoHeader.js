import './LogoHeader.scss';
import logo from './../../assets/MY-Shopaholic-big-text.png';

export default function LogoHeader (){
    return(
        <div className="logo-container">
                <img src={logo}></img>
            </div>
    )
}