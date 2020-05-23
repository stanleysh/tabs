import React, { Component } from 'react';
// import { Route, Switch } from 'react-router-dom';
// import logo from '../../logo.svg';
import './App.css';
import userService from '../../utils/userService';
import NavBar from '../../components/NavBar/NavBar';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser()
    }
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()});
  }

  hand

  render(){
    return (
      <div className='app'>
        <header>
          <NavBar
          hndleLogout = {this.handleLogout}
          user = {this.state.user}
          />
        </header>

      </div>
    );
    }
}

export default App;
