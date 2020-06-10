import React, { Component } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';

class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pseudo: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.pseudo.length > 0 && this.state.password.length > 0;
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
            <div className="Login">
                <form onSubmit={() => this.handleSubmit}>
                <FormGroup controlId="pseudo" bsSize="large">
                    <FormLabel>Pseudo</FormLabel>
                    <FormControl
                        autoFocus
                        type="pseudo"
                        value={this.state.pseudo}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        value={this.state.password}
                        onChange={this.handleChange}
                        type="password"
                    />
                </FormGroup>
                <Button block bsSize="large" disabled={!this.validateForm()} type="submit">
                    Login
                </Button>
                </form>
            </div>
        );
    }
}

export default LoginComponent