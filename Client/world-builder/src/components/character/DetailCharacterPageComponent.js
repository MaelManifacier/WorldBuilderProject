import React, { Component } from 'react'
import NavbarComponent from '../navigation/Navbar'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import IosArrowBack from 'react-ionicons/lib/IosArrowBack'
import IosArrowDown from 'react-ionicons/lib/IosArrowDown'
import IosArrowUp from 'react-ionicons/lib/IosArrowUp'
import Collapsible from 'react-collapsible'

import './character.scss'

const GET_CHARACTER = gql `
query getCharacter ($id: ID!) {
    character(_id: $id) {
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

        var Trigger;
        if(this.props.triggerDisabled === undefined) {
            Trigger = () => <div className="triggerCollapsible">
                <p>past</p>
                <IosArrowDown className="btnMenu" color="#E30549" fontSize="30px"></IosArrowDown>
            </div>
        } else {
            Trigger = () => <div className="triggerCollapsible">
                <p>past</p>
                <IosArrowUp className="btnMenu" color="#E30549" fontSize="30px"></IosArrowUp>
            </div>
        }

        /* const Trigger = () => <div className="triggerCollapsible">
            <p>past</p>
            { this.props.triggerDisabled (() => {
                <IosArrowDown className="btnMenu" color="#E30549" fontSize="30px"></IosArrowDown>
            })}
        </div> */
    
        return <div>
            <div className="containerTitreAjout contenu">
                <Link className="linkAdd" to={{
                                pathname: `/project/${data.character.projectID}`,
                                state: { id: data.character.projectID }
                                }}>
                    <IosArrowBack className="btnMenu" color="#E30549" fontSize="30px"></IosArrowBack>
                </Link>
                <p>Character detail</p>
            </div>
            <div className="row1CharacterDetail">
                <div>
                    <h4 className="title">{data.character.name}</h4>
                    <h4 className="title">{data.character.firstName}</h4>
                </div>
                <h4 className="title">{data.character.gender}</h4>
            </div>
            <Collapsible trigger={<Trigger/>}>
                <p>{data.character.past}</p>
            </Collapsible>
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
