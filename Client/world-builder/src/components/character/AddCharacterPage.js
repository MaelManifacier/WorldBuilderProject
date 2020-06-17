import React, { Component } from 'react';
import NavbarComponent from '../navigation/Navbar.js'
import IosArrowBack from 'react-ionicons/lib/IosArrowBack'
import { Link, Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { createBrowserHistory } from 'history';

const ADD_CHARACTER = gql `
  mutation createCharacter ($name: String!, $firstName: String!, $birthDate: Date!, $birthPlace: String!, $livingPlace: String!, 
    $gender: String!, $size: Number!, $corpulence: String!, $past: String!, $projectID: ID)
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

function AddCharacter() {
    let name;
    let firstName;
    let birthDate;
    let birthPlace;
    let livingPlace;
    let gender;
    let size;
    let corpulence;
    let past;
    // A REMPLACER QUAND ON AURA LA CO
    let projectID = "5ee670361261f824d0b3c59f";

    const [addCharacter, { loading, error, data }] = useMutation(ADD_CHARACTER);

    if (loading) return <div>
            Loading
        </div>

    if (error) return `ERROR : ${error.message}`

    if (data) {
      let route = `/character/${data.createCharacter._id}`
      console.log(route)
      history.push(route)
      return (
        <Redirect to="/characters"/>
      )
    }
  
    return (
      <div>
        <form className="form"
          onSubmit={e => {
            e.preventDefault();
            addCharacter({ variables: { name: name.value, firstName: firstName.value, birthDate: birthDate.value, birthPlace: birthPlace.value, 
              livingPlace: livingPlace.value, gender: gender.value, size: size.value, corpulence: corpulence.value, past: past.value, projectID: projectID } });
            name.value = '';
            firstName.value = '';
            birthDate.value = '';
            birthPlace.value = '';
            livingPlace.value = '';
            gender.value = '';
            size.value = '';
            corpulence.value = '';
            past.value = '';
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
                PRENOM
                <input className="formControl"
                    name="firstName"
                    type="text"
                    ref={node => {
                      firstName = node;
                    }}
                />
            </label>
        </div>
        <div className="formGroup">
            <label className="formLabel">
                DATE DE NAISSANCE
                <input className="formControl"
                    name="birthDate"
                    type="date"
                    ref={node => {
                      birthDate = node;
                    }}
                />
            </label>
        </div>
        <div className="formGroup">
            <label className="formLabel">
                LIEU DE NAISSANCE
                <input className="formControl"
                    name="birthPlace"
                    type="text"
                    ref={node => {
                      birthPlace = node;
                    }}
                />
            </label>
        </div>
        <div className="formGroup">
            <label className="formLabel">
                LIEU DE RESIDENCE
                <input className="formControl"
                    name="livingPlace"
                    type="text"
                    ref={node => {
                      livingPlace = node;
                    }}
                />
            </label>
        </div>
        <div className="formGroup">
            <label className="formLabel">
                GENRE
                <input className="formControl"
                    name="gender"
                    type="text"
                    ref={node => {
                      gender = node;
                    }}
                />
            </label>
        </div>
        <div className="formGroup">
            <label className="formLabel">
                TAILLE
                <input className="formControl"
                    name="size"
                    type="number"
                    step="0.1"
                    ref={node => {
                      size = node;
                    }}
                />
            </label>
        </div>
        <div className="formGroup">
            <label className="formLabel">
                CORPULENCE
                <input className="formControl"
                    name="corpulence"
                    type="text"
                    ref={node => {
                      corpulence = node;
                    }}
                />
            </label>
        </div>
        <div className="formGroup">
            <label className="formLabel">
                PASSÉ
                <textarea className="formControl"
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

class AddCharacterPageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        firstName: '',
        birthDate: '',
        birthPlace: '',
        livingPlace: '',
        gender: '',
        size: '',
        corpulence: '',
        past: '',
        // A REMPLACER QUAND ON AURA LA CO
        projectID: '5ee670361261f824d0b3c59f'
    }
  }
    render() {
        return (
            <div>
              <NavbarComponent></NavbarComponent>
              <div className="containerCharacterAdd">
                <div className="containerTitreAjoutPersonnage">
                  <Link className="linkAdd" to="/character">
                    <IosArrowBack className="btnMenu" color="#E30549" fontSize="30px"></IosArrowBack>
                  </Link>
                  <p>Ajout Personnage</p>
                </div>
                <AddCharacter></AddCharacter>
              </div>
            </div>
        )
    }
}

export default AddCharacterPageComponent