import React, { Component } from 'react';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

class SideBarComponent extends Component {
    render() {
        return (
            <List className="sideBar" disablePadding dense>
              <ListItem button>
                <ListItemText>Profile</ListItemText>
              </ListItem>
              <ListItem button>
                <ListItemText>Projects</ListItemText>
              </ListItem>
              <ListItem button>
                <ListItemText>Settings</ListItemText>
              </ListItem>
            </List>
          )
    }
}

export default SideBarComponent
