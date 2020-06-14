import React, { Component } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import NavbarComponent from '../navigation/Navbar';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import './user.css'

const LOGIN = gql `
    query auth ($mail: String!, $password: String!) {
        login(mail: $mail, password: $password) {
            userId
            token
            tokenExpiration
        }
  }
`

class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mail: '',
            password: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    validateForm() {
        if(this.state.mail.length > 0 && this.state.password.length > 0) {
            this.login();
        }
    }

    login() {
        // envoyer la requête pour log in
        const { loading, error, data } = useQuery(LOGIN)

        if (loading) return <div>
            Loading
        </div>

        if (error) return `ERROR : ${error.message}`

        return (
            <div> 
                HEY COUCOU
                <p>data.token</p>
            </div>
        )
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
      }

    render() {
        return (
            <div>
                <NavbarComponent></NavbarComponent>
                <div className="Login">
                    <form className="form" onSubmit={() => this.validateForm}>
                        <div className="formGroup">
                            <label className="formLabel">
                                MAIL
                                <input className="formControl"
                                    name="mail"
                                    type="mail"
                                    autoFocus
                                    checked={this.state.mail}
                                    onChange={this.handleInputChange}/>
                            </label>
                        </div>

                        <div className="formGroup">
                            <label className="formLabel">
                                PASSWORD
                                <input className="formControl"
                                    name="password"
                                    type="password"
                                    autoFocus
                                    checked={this.state.password}
                                    onChange={this.handleInputChange}/>
                            </label>
                        </div>

                    {/*
                    <FormGroup className="formGroup" controlId="mail" bsSize="large">
                        <FormLabel className="formLabel">MAIL</FormLabel>
                        <FormControl
                            className="formControl"
                            autoFocus
                            type="mail"
                            value={this.state.mail}
                            onChange={this.handleInputChange}
                        />
                    </FormGroup>
                    <FormGroup className="formGroup" controlId="password" bsSize="large">
                        <FormLabel className="formLabel">PASSWORD</FormLabel>
                        <FormControl
                            className="formControl"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            type="password"
                        />
                    </FormGroup>
                    */}
                    <Button className="btnSubmit" block type="submit">
                        LOGIN
                    </Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginComponent