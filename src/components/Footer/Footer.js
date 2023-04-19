import './Footer.scss';
import logo from '../../assets/MY-Shopaholic-logo.png';
import Copyright from '../Copyright/Copyright';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';

function Footer(){



    return (
        <div className="footer_container" >
          <div className="footer_container_top">
            <div className="footer_content_container">
                <div className="footer_content_container_img">
                    <img src={logo} alt={logo} />
                </div>
                <div className="footer_content_container_text">
                  Best shopping experience forever
              </div>
            </div>
            <div className="footer_content_container">
                <div className="footer_content_container_content_title">Company</div>
                <ul className="list">
                  <li>
                  <a href={`http://${window.location.host}/about_us`}>
                      <i className="fa fa-angle-right" aria-hidden="true" />
                      {' '}
                      About us
                  </a>
                  </li>
                  <li>
                    <a href="/contact-us">
                      <i
                        className="fa fa-angle-right"
                        aria-hidden="true"
                      />
                      {' '}
                      Contact us
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer_content_container">
              <div className="footer_content_container_content_title">Policy</div>
                <ul className="list">
                  <li>
                    <a href="#">
                      <i className="fa fa-angle-right" aria-hidden="true" />
                      {' '}
                      Support
                    </a>
                  </li>
                  <li>
                    <a href="/privacy">
                      <i className="fa fa-angle-right" aria-hidden="true" />
                      {' '}
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer_content_container">
                <div className="footer_content_container_content_title">Follow Us</div>
                <table className="follow_us_table">
                <tbody>
                  <tr>
                    <td>
                      <a href="#">
                        <InstagramIcon/>
                      </a>
                    </td>
                    <td>
                      <a href="#">
                        <LinkedInIcon/>
                      </a>
                    </td>
                    <td>
                      <a href="#">
                        <FacebookIcon/>
                      </a>
                    </td>
                  </tr>
                  </tbody>
                </table>
            </div>
          </div>
          <div>
           <Copyright/>
          </div>
        </div>


    )
}

export default Footer;