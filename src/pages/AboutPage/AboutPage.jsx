import React from 'react';
import './AboutPage.css';
// import Card from 'react-bootstrap/Card';

const AboutPage = () => {
    
    return (
        <div className="About">
            <h1>About</h1>
            <h4>This app was created mainly because I am horrible at keeping track of my finances and my refusal to pay for a finance tracking app service. This project was created using React, Material UI, and postgreSQL.</h4>
            <div className="creator">
                <div>
                    <img src="https://i.imgur.com/kITwQ11.jpg" id="port-pic" alt="portfolio"/>

                </div>
                <div className="contact-info">
                    <h3>Contact Information</h3>
                    <p>Stanley Sham <br/> Engineer/Web Developer </p>
                    <ul>
                        <li><img src='https://image.flaticon.com/icons/svg/281/281769.svg' alt='gmail logo' style={{width:'20px'}}/>stnl.sham@gmail.com</li>
                        <li><a href="https://www.linkedin.com/in/stanley-sham/"><img src="https://1000logos.net/wp-content/uploads/2017/03/LinkedIn-Logo-768x768.png" alt='linked-in logo' style={{width: '20px'}}/>linkedin</a></li>
                        <li><a href="https://github.com/stanleysh/"><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt='github logo' style={{width:'20px'}}/>stanleysh.git</a></li>
                        <li><a href="https://stanleysh.github.io/stansh/"><img src="https://webstockreview.net/images/clipart-world-world-logo-6.png" alt='github logo' style={{width:'20px'}}/>stanleysh.github.io/stansh/</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AboutPage;
