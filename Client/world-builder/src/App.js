import React, { Component } from 'react'
// import logo from './logo.svg';
import './style/App.scss'
import HomePageComponent from './components/common/HomePage'

import { Switch, Route, Redirect } from 'react-router-dom'
import ProjectsHomePageComponent from './components/project/ProjectsHomePage'
import LoginComponent from './components/user/Login'
import UserHomeComponent from './components/user/UserHome'
import RegisterComponent from './components/user/Register'
import AddProjectPageComponent from './components/project/AddProjectPage'
import AddCharacterPageComponent from './components/character/AddCharacterPage'
import AddScenarioPageComponent from './components/scenario/AddScenarioPage'
import DetailProjectPageComponent from './components/project/DetailProjectPage'
import DetailCharacterPageComponent from './components/character/DetailCharacterPageComponent'

//import requiresAuth from './components/requiresAuth'

import AuthContext from './context/auth-context'

/*
const IS_AUTHENTICATED = gql `
{
    me (token: String!) {
        _id
    }
}
`*/

class App extends Component {
  constructor(props) {
    super(props);

    let tokenAuth = (localStorage.getItem('token') != null ? true : false);

    this.state = {
      token: tokenAuth,
      userId: null
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

    this.isAuthenticated = this.isAuthenticated.bind(this);
  }
  
  // on mappe en-dessous le contexte sur ces fonctions
  login(token, userId, tokenExpiration) {
    this.setState({
      token: token,
      userId: userId
    })
  }

  isAuthenticated() {
    if (localStorage.getItem('token') != null) {
      /*
      const { loading, error, data } = useQuery(IS_AUTHENTICATED)

      if (loading) return <div>
          Loading
      </div>
  
      if (error) return `ERROR : ${error.message}`
  
      return (
        <div>YAAAAY</div>
      )*/
    }
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
          <Route exact path="/login">
            <LoginComponent />
          </Route>

          <Route exact path="/register">
            <RegisterComponent />
          </Route>

          {/* ProjectsHomePage : liste des projets d'un utilisateur 
          <Route path="/app" component={requiresAuth(App)}>*/}
              <Route exact path="/projects">
                <ProjectsHomePageComponent />
              </Route>

              <Route exact path="/userHome">
                <UserHomeComponent />
              </Route>

              <Route exact path="/addProject">
                <AddProjectPageComponent />
              </Route>

              <Route exact path="/detailCharacter/:id" component={DetailCharacterPageComponent}>
              </Route>

              <Route exact path="/project/:id" component={DetailProjectPageComponent}>
              </Route>

              <Route exact path="/character/add/:id" component={AddCharacterPageComponent}>
              </Route>

              <Route exact path="/scenario/add/:id" component={AddScenarioPageComponent}>
              </Route>
              
          {/*</Route>*/}

          {!this.tokenAuth && 
              <Redirect from="/projects" to="/login" exact />
          }

          {!this.tokenAuth &&
              <Redirect from="/userHome" to="/login" exact />
          }

          {this.tokenAuth && 
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