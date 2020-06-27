import React, { Component } from 'react'
import NavbarComponent from '../navigation/Navbar'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const GET_CHARACTER = gql `
query getCharactersForProject ($id: ID!) {
    projectCharacters(_id: $id) {
      _id
      name
      firstName
      birthDate
      birthPlace
      livingPlace
      gender
      size
      corpulence
      traits
      faults
      activities
      characteristics
      past
      aims
      family {
        _id
      }
      projectID
    }
  }
`


class DetailCharacterPageComponent extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            id: props.location.state.id,
        }
        this.getCharacter = this.getCharacter.bind(this);
    }

    getCharacter(){
        const { loading, error, data } = useQuery(GET_CHARACTER, {
            variables: { id : this.state.id }
        })
        if (loading) return <div>
            Loading
        </div>
        if (error) return `ERROR : ${error.message}`
    
        return <div>
            -data-
        </div>
    }

    render() {
        return <div>
            <NavbarComponent></NavbarComponent>
            <this.getCharacter></this.getCharacter>
        </div>
    }
}

export default DetailCharacterPageComponent
