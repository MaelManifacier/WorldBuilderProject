import React, { Component } from 'react';
import NavbarComponent from '../navigation/Navbar.js'
import IosArrowBack from 'react-ionicons/lib/IosArrowBack'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const ADD_PROJECT = gql `
  mutation createProject ($name: String!, $description: String!, $userID: String) {
    createProject(name: $name, description: $description, userID: $userID) {
        _id
        name
        description
        userID
    }
}
`

class AddProjectPageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nom: '',
            description: ''
        }
        this.addProject = this.addProject.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.sendForm = this.sendForm.bind(this);
    }

    validateForm() {
        if(this.state.nom.length > 0 && this.state.description.length > 0) {
            this.sendForm();
        }
    }

    sendForm() {
        const { loading, error, data } = useQuery(ADD_PROJECT)

        if (loading) return <div>
            Loading
        </div>

        if (error) return `ERROR : ${error.message}`

        return (
            <div> 
                HEY COUCOU
                <p>{data._id}</p>
            </div>
        )
    }

    render() {
        return <div>
            <NavbarComponent></NavbarComponent>
            <div className="containerProjectAdd">
                <div className="containerTitreAjoutProjet">
                    <Link className="linkAddToProjects" to="/projects">
                        <IosArrowBack className="btnMenu" color="#E30549" fontSize="30px"></IosArrowBack>
                    </Link>
                    <p>Ajout Projet</p>
                </div>
                <form className="form" onSubmit={() => this.validateForm}>
                    <div className="formGroup">
                        <label className="formLabel">
                            NOM
                            <input className="formControl"
                                name="nom"
                                type="text"
                                autoFocus
                                checked={this.state.nom}
                                onChange={this.handleInputChange}/>
                        </label>
                    </div>
                    <div className="formGroup">
                        <label className="formLabel">
                            DESCRIPTION
                            <input className="formControl"
                                name="description"
                                type="text"
                                checked={this.state.description}
                                onChange={this.handleInputChange}/>
                        </label>
                    </div>
                    <Button className="btnSubmit" block type="submit">
                        ADD
                    </Button>
                </form>
            </div>
        </div>
    }

    addProject() {

    }
}

export default AddProjectPageComponent
