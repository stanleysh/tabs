import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// import logo from '../../logo.svg';
import './App.css';
import userService from '../../utils/userService';
import NavBar from '../../components/NavBar/NavBar';
import WelcomePage from '../WelcomePage/WelcomePage';

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
        <Switch>
          <Route exact path = '/' render={() =>
          <WelcomePage
          user = {this.state.user}
          handleLogout = {this.handleLogout}  
          />
        }/>
        </Switch>
      </div>
    );
    }
}

export default App;
