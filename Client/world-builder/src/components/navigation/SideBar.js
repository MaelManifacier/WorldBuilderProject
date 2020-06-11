import React, { Component } from 'react';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Link } from 'react-router-dom';
import './Navigation.css'

class SideBarComponent extends Component {
    render() {
        return (
            <List className="sideBar" disablePadding dense>
              <ListItem button>
                <Link className="btnLink" to="/userHome">
                  <ListItemText>Profile</ListItemText>
                </Link>
              </ListItem>
              <ListItem button>
                <Link className="btnLink" to="/projects">
                  <ListItemText>Projects</ListItemText>
                </Link>
              </ListItem>
              <ListItem button>
                <Link className="btnLink" to="/">
                  <ListItemText>Settings</ListItemText>
                </Link>
              </ListItem>
            </List>
          )
    }
}

export default SideBarComponent
