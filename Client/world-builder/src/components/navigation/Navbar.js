import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.scss';
import SideBarComponent from './SideBar';
import IosMenu from 'react-ionicons/lib/IosMenu'

class NavbarComponent extends Component {
    constructor(props) {
        super(props)
        // on ajoute un état pour ouvrir ou fermer la sideBar
        this.state={
            sideBarOpen: false,
            isLoggedIn: false
        }
        let token = localStorage.getItem('token')
        //console.log("token ", token)
        if(token != null) {
            this.setState({isLoggedIn : true})
        }
        this.toggleSideBar.bind(this)
    }

    // fonction pour déplier ou replier la sideBar
    toggleSideBar = () => {
        this.setState({
            sideBarOpen: !this.state.sideBarOpen
        })
    }

    render() {
        let loggedButton;
        if(this.state.isLoggedIn) {
            loggedButton = <Link className="btnUserProfile" to="/userHome">account</Link>
        } else {
            loggedButton = <Link className="btnUserProfile" to="/login">Log in</Link>
        }
        return <div>
            <div className="navBar">
                <a className="btnSideBar" onClick={() => this.toggleSideBar()}>
                    {/*<IosMoreOutline className="btnMenu" color="#F6F7EB" fontSize="32px"></IosMoreOutline>*/}
                    <IosMenu className="btnMenu" color="#F6F7EB" fontSize="32px"></IosMenu>
                    {/*menu*/}
                </a>
                <div className="appNameDiv">
                    <Link className="appName" onClick={() => this.toggleSideBar()} to="/">WORLD-BUILDER</Link>
                </div>
                <div className="btnUserProfileDiv">
                    {loggedButton}
                </div>
            </div>
            { this.state.sideBarOpen &&
                <SideBarComponent onClick={() => this.toggleSideBar()}></SideBarComponent>
            }
        </div>
    }
}

export default NavbarComponent


/*
React iconicons : > npm install --save react-ionicons
    doc : https://zamarrowski.github.io/react-ionicons/
IosFlask
IosFlameOutline
IosMoreOutline
IosArrowBack
*/