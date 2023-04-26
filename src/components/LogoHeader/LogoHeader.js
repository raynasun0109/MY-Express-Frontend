import './LogoHeader.scss';
import logo from './../../assets/MY-Shopaholic-logo.png';

export default function LogoHeader (){
    return(
        <div className="logo-container">
            <a data-testid="logo-header-button" href={`http://${window.location.host}`}>
                <img src={logo}></img>
            </a>
        </div>
    )
}