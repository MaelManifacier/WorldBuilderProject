import React, { Component } from 'react';
import NavbarComponent from '../navigation/Navbar.js'
import IosArrowBack from 'react-ionicons/lib/IosArrowBack'
import { Link, Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { createBrowserHistory } from 'history';
import DetailProjectPageComponent from '../project/DetailProjectPage';

const ADD_CHARACTER = gql `
  mutation createCharacter ($name: String!, $firstName: String!, $birthDate: Date!, $birthPlace: String!, $livingPlace: String!, 
    $gender: String!, $size: Int!, $corpulence: String!, $past: String!, $projectID: ID!)
  {
    createCharacter(name: $name, firstName: $firstName, birthDate: $birthDate, birthPlace: $birthPlace, livingPlace: $livingPlace, 
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
export const history = createBrowserHistory();


class AddCharacterPageComponent extends Component {
  constructor(props) {
    super(props);
    //console.log(props.location.state.id)
    this.state = {
        projectID: props.location.state.id
    }
    this.addCharacter = this.addCharacter.bind(this)
  }

  addCharacter() {
    let name;
    let firstName;
    let birthDate;
    let birthPlace;
    let livingPlace;
    let gender;
    let size;
    let corpulence;
    let past;
    let projectID = this.state.projectID;

    const [addCharacter, { loading, error, data }] = useMutation(ADD_CHARACTER);

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
          <form className="generalForm"
            onSubmit={e => {
              e.preventDefault();
              addCharacter({ variables: { name: name.value, firstName: firstName.value, birthDate: birthDate.value, birthPlace: birthPlace.value, 
                livingPlace: livingPlace.value, gender: gender.value, size: parseInt(size.value), corpulence: corpulence.value, past: past.value, projectID: projectID } });
              name.value = '';
              firstName.value = '';
              birthDate.value = '';
              birthPlace.value = '';
              livingPlace.value = '';
              gender.value = '';
              size.value = 0;
              corpulence.value = '';
              past.value = '';
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
                  <p>Ajout Personnage</p>
                </div>
                <this.addCharacter></this.addCharacter>
              </div>
            </div>
        )
    }
}

export default AddCharacterPageComponent
