// page pour la description de l'application
// lien vers login ou création de compte

import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import NavbarComponent from '../navigation/Navbar';
import { Link } from 'react-router-dom'
import './homePage.css'

class HomePageComponent extends Component {
    render() {
        return <div>
            <NavbarComponent></NavbarComponent>
            <div className="contenuHomePage">
                <h1>Bienvenue sur WorldBuilder !</h1>
                <div className="descriptionApp">
                    Description :
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consectetur scelerisque blandit. 
                    Fusce porttitor, mauris ac scelerisque blandit, mi diam placerat quam, eu convallis nisl urna id mauris. 
                    Nulla porta posuere eros ac eleifend. In nulla justo, eleifend vel erat vel, fermentum elementum dolor. 
                    Integer et pellentesque mi. Sed convallis risus et scelerisque sagittis. Nam ultricies accumsan egestas. 
                    Morbi ornare dapibus hendrerit. Vivamus blandit arcu ipsum. Mauris ac nulla volutpat, rhoncus enim non, bibendum tortor. 
                    Nulla semper condimentum nulla, eu malesuada metus scelerisque sed. Mauris id iaculis massa, non sodales dui.
                </div>
                <div className="cardRegister" style={{ marginTop: 20+"px" }}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Pas encore de compte ?</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </Card.Text>
                            <Button href="/register">En créer un</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div className="cardLogIn" style={{ marginTop: 20+"px" }}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Vous avez déja un compte ?</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </Card.Text>
                            <Button href="/login">Connexion</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div className="btnToProjects">
                    <Link className="btnToProjects" to="/projects">your projects</Link>
                </div>
            </div>
        </div>
    }
}

export default HomePageComponent
