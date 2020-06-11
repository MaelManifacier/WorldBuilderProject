// page pour la description de l'application
// lien vers login ou création de compte

import React, { Component } from 'react';
import NavbarComponent from '../navigation/Navbar';
import { Link } from 'react-router-dom'
import './homePage.css'

class HomePageComponent extends Component {
    render() {
        return <div>
            <NavbarComponent></NavbarComponent>
            <div className="contenuHomePage">
                Future page d'accueil
                - devra contenir : une présentation de l'application
                - un lien vers login ou création de compte
                <div className="btnToProjects">
                    <Link className="btnToProjects" to="/projects">your projects</Link>
                </div>
            </div>
        </div>
    }
}

export default HomePageComponent
