import React from 'react';
import './WelcomePage.css'


const WelcomePage = (props) => {
    if (props.user) {
        return (
            <>
                <div className="welcome-banner fade-in-1">
                    <p>Nice to meet you! Im your personal interview assistant :{")"}</p>
                </div>
                <div className="welcome-message fade-in-2">
                    <p>I'm here to provide you with the most relevant interview questions for the industry of your choice, curated answer scripts and tools to help you prep with confidence!</p>
                </div> 
            </>
        )
    }

    return (
        <div className="fade-in-1">
        </div>
    )
}

export default WelcomePage