import React, { Component } from 'react';
import NavbarComponent from '../navigation/Navbar.js'
import IosArrowBack from 'react-ionicons/lib/IosArrowBack'
import { Link, Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const DELETE_CHARACTER = gql `
    mutation deleteCharacter($id: ID!) {
      deleteCharacter(_id: $id) {
        _id
      }
    }
`

class DeleteCharacterPageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            characterID: props.location.state.id
        }
        this.deleteCharacter = this.deleteCharacter.bind(this);
    }

    deleteCharacter() {
      let characterID;
      const [deleteCharacter, { loading, error }] = useMutation(DELETE_CHARACTER);
  
      if (loading) return <div>
              Loading
          </div>
  
      if (error) return `ERROR : ${error.message}`
      
      return <div>
          <div className="contenu">
            <div className="containerTitreAjout">
              <Link className="linkAdd" to={{
                          pathname: `/detailCharacter/${this.state.characterID}`,
                          state: { id: this.state.characterID }
                          }}>
                  <IosArrowBack className="btnMenu" color="#E30549" fontSize="30px"></IosArrowBack>
              </Link>
              <p>Delete Character</p>
            </div>
            <div>
              <h4 className="title">Are you sure to delete this character ?</h4>
              <button className="btnSubmit" style={{margin: "0 5vw"}} onClick={ e=> {
                e.preventDefault();
                deleteCharacter({variables: {id: characterID} });
                console.log(deleteCharacter)
                characterID = this.state.characterID;
              }}>Delete</button>
            </div>
          </div>
        </div>
    }


    render() {
      return <div>
      <NavbarComponent></NavbarComponent>
      <this.deleteCharacter></this.deleteCharacter>
    </div>
  }
}

export default DeleteCharacterPageComponent
