import React from 'react';
// import logo from './logo.svg';
import './style/App.css';
import HomePageComponent from './components/common/HomePage';

import { Switch, Route } from 'react-router-dom'
import ProjectsHomePageComponent from './components/project/ProjectsHomePage';
import LoginComponent from './components/user/Login'
import UserHomeComponent from './components/user/UserHome'
import RegisterComponent from './components/user/Register';
import AddProjectPageComponent from './components/project/AddProjectPage';
import AddCharacterPageComponent from './components/character/AddCharacterPage';
import DetailProjectPageComponent from './components/project/DetailProjectPage';

function App() {
  return (
    <div className="App">
      <Switch>
        {/* ProjectsHomePage : liste des projets d'un utilisateur */}
        <Route path="/projects">
          <ProjectsHomePageComponent />
        </Route>

        <Route path="/login">
          <LoginComponent />
        </Route>

        <Route path="/register">
          <RegisterComponent />
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

        <Route path="/character/add">
          <AddCharacterPageComponent />
        </Route>

        {/* ROUTE VERS / EN DERNIER */}
        {/* TJS METTRE LA ROUTE VERS / EN DERNIER */}
        {/* présentation de l'appli et liens vers authentification */}
        <Route path="/">
          <HomePageComponent />
        </Route>
      </Switch>
    </div>
  );
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