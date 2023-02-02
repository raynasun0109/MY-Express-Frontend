import Navigation from '../Navigation/Navigation';
import logo from './../../assets/MY-Shopaholic-big-text.png';
import './Header.scss';

export default function Header (){
    return (
        <>
            <div className="logo-container">
                <img src={logo}></img>
            </div>
            <Navigation/>
        </>
    )

};