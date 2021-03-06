import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import userService from '../../utils/userService';
import NavBar from '../../components/NavBar/NavBar';
import WelcomePage from '../WelcomePage/WelcomePage';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import AboutPage from '../AboutPage/AboutPage';
import HomePage from '../HomePage/HomePage';
import DemoPage from '../DemoPage/DemoPage';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser(),
    };
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  }

  render() {
    return (
      <div className="app">
        <header>
          <NavBar
            handleLogout={this.handleLogout}
            user={this.state.user}
          />
        </header>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <WelcomePage
                user={this.state.user}
                handleLogout={this.handleLogout}
              />
        )}
          />
          <Route
            exact
            path="/about"
            render={() => <AboutPage />}
          />
          <Route
            exact
            path="/signup"
            render={({ history }) => (
              <SignupPage
                history={history}
                handleSignupOrLogin={this.handleSignupOrLogin}
              />
        )}
          />
          <Route
            exact
            path="/login"
            render={({ history }) => (
              <LoginPage
                history={history}
                handleSignupOrLogin={this.handleSignupOrLogin}
              />
        )}
          />
          <Route
            exact
            path="/home"
            render={() => (
              <HomePage
                user={this.state.user}
              />
        )}
          />
          <Route
            exact
            path="/demo"
            render={({ history }) => <DemoPage />}
          />
        </Switch>

      </div>
    );
  }
}

export default App;
