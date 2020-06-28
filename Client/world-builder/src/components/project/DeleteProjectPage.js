import React, { Component } from 'react';
import NavbarComponent from '../navigation/Navbar.js'
import IosArrowBack from 'react-ionicons/lib/IosArrowBack'
import { Link, Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const DELETE_PROJECT = gql `
    mutation delete($id: ID!) {
        deleteProject(_id: $id)
    }
`

class DeleteProjectPageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectID: props.location.state.id
        }
        this.deleteProject = this.deleteProject.bind(this);
    }

    deleteProject() {
      let projectID;
      const [deleteProject, { loading, error }] = useMutation(DELETE_PROJECT);
  
      if (loading) return <div>
              Loading
          </div>
  
      if (error) return `ERROR : ${error.message}`
      
      return <div>
          <div className="contenu">
          <div className="containerTitreAjout">
            <Link className="linkAdd" to={{
                        pathname: `/project/${this.state.projectID}`,
                        state: { id: this.state.projectID }
                        }}>
                <IosArrowBack className="btnMenu" color="#E30549" fontSize="30px"></IosArrowBack>
            </Link>
            <p>Delete Project</p>
          </div>
          <div>
            <h4 className="title">Are you sure to delete this project ?</h4>
            <button className="btnSubmit" style={{margin: "0 5vw"}} onClick={ e=> {
              e.preventDefault();
              deleteProject({variables: {id: projectID} });
              console.log(deleteProject)
              projectID = this.state.projectID;
            }}>Delete</button>
          </div>
        </div>
      </div>
    }


    render() {
      return <div>
      <NavbarComponent></NavbarComponent>
      <this.deleteProject></this.deleteProject>
    </div>
  }
}

export default DeleteProjectPageComponent
