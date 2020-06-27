import React, { Component } from 'react';
import NavbarComponent from '../navigation/Navbar';
import './user.css'

class UserHomeComponent extends Component {
    render() {
        return <div>
            <NavbarComponent></NavbarComponent>
            <div className="contenuPageUserHome contenu">
                <div className="profileDiv">
                    <div className="lines">
                        <div className="linexs"></div>
                        <div className="linem"></div>
                        <div className="linel"></div>
                    </div>
                    <div className="imgUser">
                        
                    </div>
                    <div className="lines">
                        <div className="linel"></div>
                        <div className="linem"></div>
                        <div className="linexs"></div>
                    </div>
                </div>
                <div className="detailsDiv">
                    Profil utilisateur
                    - pseudo
                    - mail
                </div>
            </div>
        </div>
    }
}

export default UserHomeComponent
