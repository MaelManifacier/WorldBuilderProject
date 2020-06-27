import React, { Component } from 'react';
import NavbarComponent from '../navigation/Navbar';
import './user.css'
import IosArrowBack from 'react-ionicons/lib/IosArrowBack'
import { Link, Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { createBrowserHistory } from 'history';

const ADD_ACCOUNT = gql `
  mutation createUser ($pseudo: String!, $password: String!, $mail: String!) {
    createUser(pseudo: $pseudo, password: $password, mail: $mail) {
        _id
        pseudo
        mail
    }
}
`

// userInput : {$pseudo: String!, $password: String!, $mail: String!}

export const history = createBrowserHistory();

function AddAccount() {
    let pseudo;
    let password;
    let mail;

    const [addAccount, { loading, error, data }] = useMutation(ADD_ACCOUNT);

    if (loading) return <div>
            Loading
        </div>

    if (error) return `ERROR : ${error.message}`

    if (data) {
      let route = `/user/${data.createUser._id}`
      console.log(route)
      history.push(route)
      return (
        <Redirect to="/userHome"/>
      )
    }
  
    return (
      <div className="contenu">
        <form className="form"
          onSubmit={e => {
            e.preventDefault();
            addAccount({ variables: { pseudo: pseudo.value, password: password.value, mail: mail.value } });
            pseudo.value = '';
            password.value = '';
            mail.value = '';
          }}>
          <div className="formGroup">
              <label className="formLabel">
                  MAIL
                  <input className="formControl"
                      name="mail"
                      type="email"
                      ref={node => {
                        mail = node;
                      }}
                  />
              </label>
          </div>
        <div className="formGroup">
            <label className="formLabel">
                PSEUDO
                <input className="formControl"
                    name="pseudo"
                    type="text"
                    ref={node => {
                      pseudo = node;
                    }}
                />
            </label>
        </div>
        <div className="formGroup">
            <label className="formLabel">
                MOT DE PASSE
                <input className="formControl"
                    name="password"
                    type="password"
                    ref={node => {
                      password = node;
                    }}
                />
            </label>
        </div>
        <div className="margin-v-m">
          <button type="submit" className="btnSubmit">Create account</button>
        </div>
        </form>
      </div>
    );
}

class RegisterComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pseudo: "",
            password: "",
            mail: ""
        };
    }

    render() {
        return (
            <div>
              <NavbarComponent></NavbarComponent>
              <div className="containerAccountAdd">
                <div className="containerTitreAjoutCompte">
                  <Link className="linkAdd" to="/user">
                    <IosArrowBack className="btnMenu" color="#E30549" fontSize="30px"></IosArrowBack>
                  </Link>
                  <p>Ajout Compte</p>
                </div>
                <AddAccount></AddAccount>
              </div>
            </div>
        )
    }

    /*validateForm() {
        if(this.state.pseudo.length > 0 && this.state.password.length > 0 && this.state.email.length > 0) {
            this.register();
        }
    }

    register() {
        // envoyer la requête pour register
    }

    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <NavbarComponent></NavbarComponent>
                <div className="Register">
                    <form className="form" onSubmit={() => this.handleSubmit}>
                    <FormGroup className="formGroup" controlId="email" bsSize="large">
                        <FormLabel className="formLabel">EMAIL</FormLabel>
                        <FormControl
                            className="formControl"
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup className="formGroup" controlId="pseudo" bsSize="large">
                        <FormLabel className="formLabel">PSEUDO</FormLabel>
                        <FormControl
                            className="formControl"
                            type="pseudo"
                            value={this.state.pseudo}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup className="formGroup" controlId="password" bsSize="large">
                        <FormLabel className="formLabel">PASSWORD</FormLabel>
                        <FormControl
                            className="formControl"
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <Button className="btnSubmit" block disabled={!this.validateForm()} type="submit">
                        REGISTER
                    </Button>
                    </form>
                </div>
            </div>
        );
    }*/
}

export default RegisterComponent