import React, { Component } from 'react';

class NavbarComponent extends Component {
    constructor(props) {
        super(props)
        // on ajoute un état pour ouvrir ou fermer la sideBar
        this.state={
            sideBarOpen: false
        }
        this.toggleSideBar.bind(this)
    }

    // fonction pour déplier ou replier la sideBar
    toggleSideBar(){
        this.setState({
            sideBarOpen: !this.sideBarOpen
        })
    }

    render() {
        return <div>
            <div className="btnMenu">
                <IosMoreOutline></IosMoreOutline>
            </div>
            <div className="appName">
                <span>WORLD-BUILDER</span>
            </div>
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