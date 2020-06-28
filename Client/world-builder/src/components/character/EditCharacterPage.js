import React, { Component } from 'react';
import NavbarComponent from '../navigation/Navbar.js'
import IosArrowBack from 'react-ionicons/lib/IosArrowBack'
import { Link, Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { createBrowserHistory } from 'history';

const EDIT_CHARACTER = gql `
  mutation editCharacter ($id: ID!, $name: String, $firstName: String, $birthDate: Date, $birthPlace: String, $livingPlace: String, 
    $gender: String, $size: Int, $corpulence: String, $past: String, $projectID: ID)
  {
    updateCharacter(id: $id, name: $name, firstName: $firstName, birthDate: $birthDate, birthPlace: $birthPlace, livingPlace: $livingPlace, 
    gender: $gender, size: $size, corpulence: $corpulence, past: $past, projectID: $projectID) 
    {
        _id
        name
        firstName
        birthDate
        birthPlace
        livingPlace
        gender
        size
        corpulence
        past
        projectID
    }
}
`

const GET_CHARACTER = gql `
query getCharacter ($id: ID!) {
    character(_id: $id) {
      _id
      name
      firstName
      birthDate
      birthPlace
      livingPlace
      gender
      size
      corpulence
      traits
      faults
      activities
      characteristics
      past
      aims
      family {
        _id
      }
      projectID
    }
  }
`

export const history = createBrowserHistory();


class EditCharacterPageComponent extends Component {
  constructor(props) {
    super(props);
    this.getCharacter = this.getCharacter.bind(this)
    this.editCharacter = this.editCharacter.bind(this)

    this.state = {
        characterID: props.location.state.id
    }
  }

    getCharacter(){
        const { loading, error, data } = useQuery(GET_CHARACTER, {
            variables: { id : this.state.id }
        })
        if (loading) return <div>
            Loading
        </div>
        if (error) return `ERROR : ${error.message}`

        // put data in state
        this.state = {
            name : data.character.name,
            firstName : data,
            birthDate : data.character.name,
            birthPlace : data.character.name,
            livingPlace : data.character.name,
            gender : data.character.name,
            size : data.character.name,
            corpulence : data.character.name,
            past : data.character.name,
            projectID : data.character.name
        }
    }

  editCharacter() {
    let id = this.state.characterID;
    let name;
    let firstName;
    let birthDate;
    let birthPlace;
    let livingPlace;
    let gender;
    let size;
    let corpulence;
    let past;
    let projectID;

    const [editCharacter, { loading, error, data }] = useMutation(EDIT_CHARACTER);

    if (loading) return <div>
            Loading
        </div>

    if (error) return `ERROR : ${error.message}`

    if (data) {
      let route = `/character/${id}`
      //console.log(route)
      history.push(route)
      return (
        <Redirect to={{
          pathname: route,
          state: { id: id }
        }}/>
      )
    }
  
    return (
        <div>
          <form className="generalForm"
            onSubmit={e => {
              e.preventDefault();
              editCharacter({ variables: { id: id, name: name.value, firstName: firstName.value, birthDate: birthDate.value, birthPlace: birthPlace.value, 
                livingPlace: livingPlace.value, gender: gender.value, size: parseInt(size.value), corpulence: corpulence.value, past: past.value, projectID: projectID } });
              id = this.state.characterID;
              name.value = this.state.name;
              firstName.value = this.state.firstName;
              birthDate.value = this.state.birthDate;
              birthPlace.value = this.state.birthPlace;
              livingPlace.value = this.state.livingPlace;
              gender.value = this.state.gender;
              size.value = this.state.size;
              corpulence.value = this.state.corpulence;
              past.value = this.state.past;
              projectID = this.state.projectID;
            }}>
          <div className="generalFormGroup">
              <label className="generalFormLabel">
                  lastname
                  <input className="generalFormControl"
                      name="name"
                      type="text"
                      autoFocus
                      ref={node => {
                        name = node;
                      }}
                  />
              </label>
          </div>
          <div className="generalFormGroup">
              <label className="generalFormLabel">
                  firstname
                  <input className="generalFormControl"
                      name="firstName"
                      type="text"
                      ref={node => {
                        firstName = node;
                      }}
                  />
              </label>
          </div>
          <div className="generalFormGroup">
              <label className="generalFormLabel">
                  birth date
                  <input className="generalFormControl"
                      name="birthDate"
                      type="date"
                      ref={node => {
                        birthDate = node;
                      }}
                  />
              </label>
          </div>
          <div className="generalFormGroup">
              <label className="generalFormLabel">
                  birth place
                  <input className="generalFormControl"
                      name="birthPlace"
                      type="text"
                      ref={node => {
                        birthPlace = node;
                      }}
                  />
              </label>
          </div>
          <div className="generalFormGroup">
              <label className="generalFormLabel">
                  living place
                  <input className="generalFormControl"
                      name="livingPlace"
                      type="text"
                      ref={node => {
                        livingPlace = node;
                      }}
                  />
              </label>
          </div>
          <div className="generalFormGroup">
              <label className="generalFormLabel">
                  gender
                  <input className="generalFormControl"
                      name="gender"
                      type="text"
                      ref={node => {
                        gender = node;
                      }}
                  />
              </label>
          </div>
          <div className="generalFormGroup">
              <label className="generalFormLabel">
                  size
                  <input className="generalFormControl"
                      name="size"
                      type="number"
                      step="1"
                      ref={node => {
                        size = node;
                      }}
                  />
              </label>
          </div>
          <div className="generalFormGroup">
              <label className="generalFormLabel">
                  corpulence
                  <input className="generalFormControl"
                      name="corpulence"
                      type="text"
                      ref={node => {
                        corpulence = node;
                      }}
                  />
              </label>
          </div>
          <div className="generalFormGroup">
              <label className="generalFormLabel">
                  past
                  <textarea className="generalFormControl"
                      name="past"
                      type="text"
                      ref={node => {
                        past = node;
                      }}
                  />
              </label>
          </div>
          <div className="margin-v-m">
            <button type="submit" className="btnSubmit">Create character</button>
          </div>
          </form>
        </div>
      );
  }

    render() {
        return (
            <div>
              <NavbarComponent></NavbarComponent>
              <div className="containerCharacterAdd contenu">
                <div className="containerTitreAjout">
                  <Link className="linkAdd" to="/projects">
                    <IosArrowBack className="btnMenu" color="#E30549" fontSize="30px"></IosArrowBack>
                  </Link>
                  <p>Edit Character</p>
                </div>
                <this.editCharacter></this.editCharacter>
              </div>
            </div>
        )
    }
}

export default EditCharacterPageComponent
