import React, { Component } from 'react';
import NavbarComponent from '../navigation/Navbar.js'
import IosArrowBack from 'react-ionicons/lib/IosArrowBack'
import { Link, Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { createBrowserHistory } from 'history';

const ADD_PROJECT = gql `
  mutation createProject ($name: String!, $description: String!, $userID: ID) {
    createProject(name: $name, description: $description, userID: $userID) {
        _id
        name
        description
        userID
    }
}
`

export const history = createBrowserHistory();

function AddProject() {
    let name;
    let description;
    // A REMPLACER QUAND ON AURA LA CO
    let userID = '5ee3cba724b880219c7bb60e'
    const [addProject, { loading, error, data }] = useMutation(ADD_PROJECT);

    if (loading) return <div>
            Loading
        </div>

    if (error) return `ERROR : ${error.message}`

    /*
    if (data) return (
      // rediriger vers la page de détail du projet
        <Link to={{
          pathname: `/project/${data.createProject._id}`,
          state: { id: data.createProject._id }
        }}>GO TO PROJECT</Link>
      </div>
    )*/

    if (data) {
      let route = `/project/${data.createProject._id}`
      console.log(route)
      history.push(route)
      return (
        <Redirect to="/projects"/>
      )
    }
  
    return (
      <div>
        <form className="form"
          onSubmit={e => {
            e.preventDefault();
            addProject({ variables: { name: name.value, description: description.value, userID: userID } });
            name.value = '';
            description.value = '';
          }}>
        <div className="formGroup">
            <label className="formLabel">
                NOM
                <input className="formControl"
                    name="name"
                    type="text"
                    autoFocus
                    ref={node => {
                      name = node;
                    }}
                />
            </label>
        </div>
        <div className="formGroup">
            <label className="formLabel">
                DESCRIPTION
                <input className="formControl"
                    name="description"
                    type="text"
                    ref={node => {
                      description = node;
                    }}
                />
            </label>
        </div>
        <div className="margin-v-m">
          <button type="submit" className="btnSubmit">Create project</button>
        </div>
        </form>
      </div>
    );
  }

class AddProjectPageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            // A REMPLACER QUAND ON AURA LA CO
            userID: '5ee3cba724b880219c7bb60e'
        }
    }


    render() {
        return <div>
            <NavbarComponent></NavbarComponent>
            <div className="containerProjectAdd contenu">
              <div className="containerTitreAjout">
                <Link className="linkAdd" to="/projects">
                  <IosArrowBack className="btnMenu" color="#E30549" fontSize="30px"></IosArrowBack>
                </Link>
                <p>Ajout Projet</p>
              </div>
              <AddProject></AddProject>
            </div>
            {/* UNE BIEN BELLE DIV MAIS MALHEUREUSEMENT NON FONCTIONNELLE
            <div className="containerProjectAdd">
                <div className="containerTitreAjoutProjet">
                    <Link className="linkAdd" to="/projects">
                        <IosArrowBack className="btnMenu" color="#E30549" fontSize="30px"></IosArrowBack>
                    </Link>
                    <p>Ajout Projet</p>
                </div>
                <form className="form"
                    onSubmit={() => this.sendForm}>
                    <div className="formGroup">
                        <label className="formLabel">
                            NOM
                            <input className="formControl"
                                name="name"
                                type="text"
                                autoFocus
                                checked={this.state.name}
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
            */}
        </div>
    }
}

export default AddProjectPageComponent
