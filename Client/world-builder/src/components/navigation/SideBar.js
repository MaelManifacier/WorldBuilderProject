import React, { Component } from 'react';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Link } from 'react-router-dom';
import './Navigation.scss'

class SideBarComponent extends Component {
    render() {
        return (
            <List className="sideBar contenu" disablePadding dense>
              <ListItem button>
                <Link className="btnLink" to="/userHome">
                  <ListItemText>PROFILE</ListItemText>
                </Link>
              </ListItem>
              <ListItem button>
                <Link className="btnLink" to="/projects">
                  <ListItemText>PROJECTS</ListItemText>
                </Link>
              </ListItem>
              <ListItem button>
                <Link className="btnLink" to="/">
                  <ListItemText>settings</ListItemText>
                </Link>
              </ListItem>
            </List>
          )
    }
}

export default SideBarComponent
