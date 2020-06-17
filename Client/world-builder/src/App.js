import React, { Component } from 'react';
// import logo from './logo.svg';
import './style/App.css';
import HomePageComponent from './components/common/HomePage';

import { Switch, Route, Redirect } from 'react-router-dom'
import ProjectsHomePageComponent from './components/project/ProjectsHomePage';
import LoginComponent from './components/user/Login'
import UserHomeComponent from './components/user/UserHome'
import RegisterComponent from './components/user/Register';
import AddProjectPageComponent from './components/project/AddProjectPage';
import AddCharacterPageComponent from './components/character/AddCharacterPage';
import DetailProjectPageComponent from './components/project/DetailProjectPage';

import AuthContext from './context/auth-context'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
      userId: null
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  
  // on mappe en-dessous le contexte sur ces fonctions
  login(token, userId, tokenExpiration) {
    this.setState({
      token: token,
      userId: userId
    })
  }

  logout() {
    this.setState({
      token: null,
      userId: null
    })
  }

  render() {
    return (
      // ce que l'on passe en value au contexte va être accessible aux enfants
      <AuthContext.Provider value={{
        token: this.state.token,
        userId: this.state.userId,
        login: this.login,
        logout: this.logout}}>
      <div className="App">
        <Switch>
          <Route path="/login">
            <LoginComponent />
          </Route>

          <Route path="/register">
            <RegisterComponent />
          </Route>

          <Route path="/character/add">
            <AddCharacterPageComponent />
          </Route>

          {/* ProjectsHomePage : liste des projets d'un utilisateur */}
          {this.state.token && 
            <div>
              <Route path="/projects">
                <ProjectsHomePageComponent />
              </Route>

              <Route path="/userHome">
                <UserHomeComponent />
              </Route>

              <Route path="/project/add">
                <AddProjectPageComponent />
              </Route>

              <Route path="/project/:id">
                <DetailProjectPageComponent />
              </Route>
            </div>
          }

          {!this.state.token && 
              <Redirect from="/projects" to="/login" exact />
          }

          {!this.state.token &&
              <Redirect from="/userHome" to="/login" exact />
          }

          {this.state.token && 
            <Redirect from="/register" to="/projects" exact />
          }

          {/* ROUTE VERS / EN DERNIER */}
          {/* TJS METTRE LA ROUTE VERS / EN DERNIER */}
          {/* présentation de l'appli et liens vers authentification */}
          <Route path="/">
            <HomePageComponent />
          </Route>

        </Switch>
      </div>
    </AuthContext.Provider>
    )
  }
}

export default App;

/*
* Anciennement dans return(<div className="App"></div>)
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <p>
      Edit <code>src/App.js</code> and save to reload.
    </p>
    <a
      className="App-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn React
    </a>
  </header>
*/