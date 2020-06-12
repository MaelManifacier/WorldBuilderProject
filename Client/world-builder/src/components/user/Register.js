import React, { Component } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import NavbarComponent from '../navigation/Navbar';
import './user.css'

class RegisterComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pseudo: "",
            password: "",
            email: ""
        };
    }

    validateForm() {
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
    }
}

export default RegisterComponent