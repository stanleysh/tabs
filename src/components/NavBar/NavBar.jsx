import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar(props) {
    if (props.user) {
        return (
        <div className="App-header">
            <div className='Logo'>
                <Link to="/" className="logo-holder"><p><img src={require("./logo/logo_white.png")} alt="logo" width="40px"/> Preppy</p></Link>
            </div>
            <div className='about-info'>
                <Link to='/about'><button className="nav-buttons info">About Us</button></Link>
            </div>
            <div className='account-info btn-group'>
            <button type="button" class="btn btn-info dropdown-toggle nav-buttons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Hi {props.user.name}
            </button>
            <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="/questions">Your Questions</a>
                <div class="dropdown-divider"></div>
                <Link to='/'><button className="dropdown-item" onClick={props.handleLogout}>Logout</button></Link>
            </div>
        </div>
        </div>
        )
    }
    
    return (
    <div className="App-header">
        <div className='Logo'>
            <Link to="/" className="logo-holder"><p><img src={require("./logo/logo_white.png")} alt="logo" width="40px"/> Preppy</p></Link>
        </div>
        <div className='about-info'>
            <Link to='/about'><button className="nav-buttons info">About Us</button></Link>
        </div>
        <div className='account-info btn-group'>
            <button type="button" class="btn btn-info dropdown-toggle nav-buttons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                My Account
            </button>
            <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="/signup">Signup</a>
                <div class="dropdown-divider"></div>
                <a className="dropdown-item" href="/login">Login</a>
            </div>
        </div>
    </div>
    )
};

export default NavBar;