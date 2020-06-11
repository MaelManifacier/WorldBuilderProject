import React, { Component } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import NavbarComponent from '../navigation/Navbar';
import gql from 'graphql-tag';
import './user.css'

const LOGIN = gql `
    mutation login($pseudo: String!, $password: String!) {
        login(pseudo: $pseudo, password: $password) {
            pseudo
            mail
        }
  }
`

class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pseudo: "",
            password: ""
        };
    }

    validateForm() {
        if(this.state.pseudo.length > 0 && this.state.password.length > 0) {
            this.login();
        }
    }

    login() {
        // envoyer la requête pour log in
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
                <div className="Login">
                    <form className="form" onSubmit={() => this.handleSubmit}>
                    <FormGroup className="formGroup" controlId="pseudo" bsSize="large">
                        <FormLabel className="formLabel">PSEUDO</FormLabel>
                        <FormControl
                            className="formControl"
                            autoFocus
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
                        LOGIN
                    </Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginComponent