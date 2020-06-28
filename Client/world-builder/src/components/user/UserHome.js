import React, { Component } from 'react'
import NavbarComponent from '../navigation/Navbar'
import { Link } from 'react-router-dom'
import IosArrowBack from 'react-ionicons/lib/IosArrowBack'
import './user.scss'

class UserHomeComponent extends Component {
    constructor(props) {
        super(props)

        let token = localStorage.getItem('token')
        console.log("token ", token)
        if(token != null) {
            this.setState({isLoggedIn : true})
        }
    }

    render() {
        return <div>
            <NavbarComponent></NavbarComponent>
            <div className="contenuPageUserHome contenu">
                <div className="containerTitreAjout">
                    <Link className="linkAdd" to={{
                                pathname: `/projects`
                                }}>
                        <IosArrowBack className="btnMenu" color="#E30549" fontSize="30px"></IosArrowBack>
                    </Link>
                    <p>Profile</p>
                </div>

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
                    <h4 className="title4">YOUR ID CARD</h4>
                    <div className="descriptionProjectDetail elementCard">
                        <p>Pseudo : pseudo</p>
                        <p>Mail : mail</p>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default UserHomeComponent
