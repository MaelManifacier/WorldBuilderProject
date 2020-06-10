// page pour la description de l'application
// lien vers login ou création de compte

import React, { Component } from 'react';
import NavbarComponent from '../navigation/Navbar';

class HomePageComponent extends Component {
    render() {
        return <div>
            <NavbarComponent></NavbarComponent>
            <div className="contenuHomePage">
                Future page d'accueil
                - devra contenir : une présentation de l'application
                - un lien vers login ou création de compte
            </div>
        </div>
    }
}

export default HomePageComponent
