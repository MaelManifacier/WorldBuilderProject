import React, { Component } from 'react';
import NavbarComponent from '../navigation/Navbar.js'
import IosArrowBack from 'react-ionicons/lib/IosArrowBack'
import { Link, Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { createBrowserHistory } from 'history';
import DetailProjectPageComponent from '../project/DetailProjectPage';

const ADD_CHARACTER = gql `
    mutation createScenario($description: String!, $projectID: ID!) {
        createScenario(description: $description, projectID: $projectID) 
        {
            _id
            description
            projectID
        }
    }
`
export const history = createBrowserHistory();


class AddScenarioPageComponent extends Component {
  constructor(props) {
    super(props);
    //console.log(props.location.state.id)
    this.state = {
        projectID: props.location.state.id
    }
    this.addScenario = this.addScenario.bind(this)
  }

  addScenario() {
    let description;
    let projectID = this.state.projectID;

    const [addScenario, { loading, error, data }] = useMutation(ADD_CHARACTER);

    if (loading) return <div>
            Loading
        </div>

    if (error) return `ERROR : ${error.message}`

    if (data) {
      let route = `/project/${projectID}`
      //console.log(route)
      history.push(route)
      return (
        <Redirect to={{
          pathname: route,
          state: { id: projectID }
        }} component={DetailProjectPageComponent}/>
      )
    }
  
    return (
        <div>
          <form className="form"
            onSubmit={e => {
              e.preventDefault();
              addScenario({ variables: { description: description.value, projectID: projectID } });
              description.value = '';
              projectID = this.state.projectID;
            }}>
          <div className="formGroup">
              <label className="formLabel">
                  DESCRIPTION
                  <textarea className="formControl"
                      name="description"
                      type="text"
                      ref={node => {
                        description = node;
                      }}
                  />
              </label>
          </div>
          <div className="margin-v-m">
            <button type="submit" className="btnSubmit">Create scenario</button>
          </div>
          </form>
        </div>
      );
  }

    render() {
        return (
            <div>
              <NavbarComponent></NavbarComponent>
              <div className="containerScenarioAdd contenu">
                <div className="containerTitreAjout">
                  <Link className="linkAdd" to="/projects">
                    <IosArrowBack className="btnMenu" color="#E30549" fontSize="30px"></IosArrowBack>
                  </Link>
                  <p>Ajout Scénario</p>
                </div>
                <this.addScenario></this.addScenario>
              </div>
            </div>
        )
    }
}

export default AddScenarioPageComponent
