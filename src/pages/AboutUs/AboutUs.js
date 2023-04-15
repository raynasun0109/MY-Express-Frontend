import React, { useEffect, useState } from 'react';
import Navigation from '../../components/Navigation/Navigation.js';
import {connect,useSelector,useDispatch} from "react-redux";
import './AboutUs.scss';

function AboutUs(props){


    return (
        <div>
            <Navigation data={props.state}/>
            <div className="about_us_container">
                <div className="hero_container">
                    <div className="hero_container_title">About Us</div>
                    <img src="https://res.cloudinary.com/raynasun0109/image/upload/v1681558218/myshopaholic/20221116_200021_886eb28e_w1920_rwvu8w.jpg"/>
                </div>
                <div className="person_intro_container">
                    <div className="person_intro_container_left">
                        <img src="https://res.cloudinary.com/raynasun0109/image/upload/v1681552508/myshopaholic/MingyangSun_aqpcma.jpg"/>
                    </div>
                    <div className="person_intro_container_right">
                        <div className="person_intro_container_right_name">
                        Mingyang Sun
                        </div>
                       <div className="person_intro_container_right_text">
                       Software Enginner
                       </div>
                       <div className="person_intro_container_right_text">
                       Linkedln: <a href="https://www.linkedin.com/in/mingyang-sun-569b3b17b/">https://www.linkedin.com/in/mingyang-sun-569b3b17b/</a>
                        </div>
                        <div className="person_intro_container_right_text">
                        Email: mingyangsun980109@gmail.com
                       </div>

                    </div>
                </div>
                <div className="content_container">
                What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Why do we use it?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).


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

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AboutUs);

