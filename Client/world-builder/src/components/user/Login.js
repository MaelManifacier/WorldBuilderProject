import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import NavbarComponent from '../navigation/Navbar'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import './user.scss'

import AuthContext from '../../context/auth-context'

const LOGIN = gql `
    mutation auth ($mail: String!, $password: String!) {
        login(mail: $mail, password: $password) {
            userId
            token
            tokenExpiration
        }
    }
`

function Login() {
    let mail;
    let password;

    //var contextType = AuthContext;

    // envoyer la requête pour log in
    const [log, { loading, error, data }] = useMutation(LOGIN);

    if (loading) return <div>
            Loading
        </div>

    if (error) return `ERROR : ${error.message}`

    if (data) {
        localStorage.setItem('token', data.token);
        //contextType.token = data.token;
        //contextType.userId = data.userId
        //login(data.token, data.userId, data.tokenExpiration)
        return (
            <Redirect to="/"/>
        )
    }

    return (
      <div className="contenu">
        <form className="form"
          onSubmit={e => {
            e.preventDefault();
            log({ variables: { mail: mail.value, password: password.value } });
            mail.value = '';
            password.value = '';
          }}>
            <div className="formGroup">
                <label className="formLabel">
                    MAIL
                    <input className="formControl"
                        name="mail"
                        type="mail"
                        autoFocus
                        ref={node => {
                        mail = node;
                        }}
                    />
                </label>
            </div>
            <div className="formGroup">
                <label className="formLabel">
                    PASSWORD
                    <input className="formControl"
                        name="password"
                        type="password"
                        ref={node => {
                        password = node;
                        }}
                    />
                </label>
            </div>
            {/*
            <div className="margin-v-m">
                <button type="submit" className="btnSubmit">LOGIN</button>
            </div>
            */}
            <div className="loginOrCreateAccountDiv">
                <button type="submit" className="btnSubmit">LOGIN</button>
                <Link to="/register">create account</Link>
            </div>
        </form>
      </div>
    );
  }

class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mail: '',
            password: ''
        };
    }

    static contextType = AuthContext;

    render() {
        return (
            <div>
                <NavbarComponent></NavbarComponent>
                <AuthContext.Provider
                    value={{
                        state: this.state
                    }}>
                    <Login></Login>
                </AuthContext.Provider>
                {/*
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
                        <div className="loginOrCreateAccountDiv">
                            <Button className="btnSubmit" block type="submit">
                                LOGIN
                            </Button>
                            <Link to="/register">create account</Link>
                        </div>
                    </form>
                </div>
                */}
            </div>
        );
    }
}

export default LoginComponent