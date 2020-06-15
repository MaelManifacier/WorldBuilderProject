import React, { Component } from 'react';
import NavbarComponent from '../navigation/Navbar';
import { Link } from 'react-router-dom';
import IosArrowBack from 'react-ionicons/lib/IosArrowBack'
import IosAdd from 'react-ionicons/lib/IosAdd'

class DetailProjectPageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
        }
    }

    render() {
        return <div>
            <NavbarComponent></NavbarComponent>
            <div className="containerProjectDetail">
                <div className="containerTitreProjectDetail">
                    <Link className="linkAdd" to="/projects">
                        <IosArrowBack className="btnMenu" color="#E30549" fontSize="30px"></IosArrowBack>
                    </Link>
                    <p className="titleProjectDetail">Project : </p>
                    <div className="btnAddProject">
                        <Link to="/character/add">
                            <IosAdd className="btnMenu" color="#E30549" fontSize="42px"></IosAdd>
                        </Link>
                    </div>
                </div>
            </div>
            {this.state.id}
            Détail pour un projet
            - description
            - liste des personnages créés
            - liste des scenarios créés
            - bouton + pour ajouter personnages et scenarios
        </div>
    }
}

export default DetailProjectPageComponent
