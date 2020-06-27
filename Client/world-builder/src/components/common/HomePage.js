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
                {/* 
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
                */}

                <div className="titleDiv">
                    <div className="trait"></div>
                    <div className="titleAccueil">BIENVENUE SUR <span id="worldbuilder">WORLDBUILDER</span></div>
                    <div className="trait"></div>
                </div>

                <div className="conteneurCardsAccueilDiv">
                    <div className="card">
                        <div className="row1Accueil">
                            <div className="roundButton green"></div>
                            <div className="roundButton raspberry"></div>
                        </div>
                        <div className="separationLine"></div>
                        <div className="row2Accueil">
                            <p style={{color: '#13CB51'}}> &#62; CREATE YOUR WORLD <span className="AnimLine">_</span></p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="row1Accueil">
                            <div className="roundButton blue"></div>
                            <div className="roundButton raspberry"></div>
                        </div>
                        <div className="separationLine"></div>
                        <div className="row2Accueil">
                            <p style={{color: '#69A6D5'}}> &#62; IMAGINE YOUR STORIES <span className="AnimLine">_</span></p>
                        </div>
                    </div>
                </div>

                <div className="conteneurLog">
                    <Link to="/register"> &#62; create your account</Link>
                    <Link to="/login"> &#62; log in</Link>
                </div>
            </div>
        </div>
    }
}

export default HomePageComponent
