import React, { Component } from 'react'
import NavbarComponent from '../navigation/Navbar'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import IosArrowBack from 'react-ionicons/lib/IosArrowBack'
import IosArrowDown from 'react-ionicons/lib/IosArrowDown'
import IosArrowUp from 'react-ionicons/lib/IosArrowUp'
import IosMore from 'react-ionicons/lib/IosMore'
import Collapsible from 'react-collapsible'

import './character.scss'

const GET_CHARACTER = gql `
query getCharacter ($id: ID!) {
    character(_id: $id) {
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

    formatDate = new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "long",
        day: "2-digit"
    })


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
            <div className="containerTitreProjectDetail contenu">
                    <Link className="linkAdd" to={{
                                pathname: `/project/${data.character.projectID}`,
                                state: { id: data.character.projectID }
                                }}>
                        <IosArrowBack className="btnMenu" color="#E30549" fontSize="30px"></IosArrowBack>
                    </Link>
                    <p className="titleProjectDetail">Character detail</p>

                    <div className="btnAddProject dropdown">
                        <IosMore color="#E30549" fontSize="30px"></IosMore>
                        <div className="dropdown-content">
                            <Link className="linkToAddCharacter" to={{
                                pathname: `/character/edit/${data.character._id}`,
                                state: { id: data.character._id }
                                }}>modify</Link>
                            <Link className="linkToAddScenario" to={{
                            pathname: `/character/delete/${data.character._id}`,
                            state: { id: data.character._id }
                            }}>delete</Link>
                        </div>
                    </div>
                    
                </div>
            
            {/*<div className="row1CharacterDetail">
                <div>
                    <h4 className="title">{data.character.name}</h4>
                    <h4 className="title">{data.character.firstName}</h4>
                </div>
                <h4 className="title">{data.character.gender}</h4>
            </div>*/}
            <h4 className="title4">ID CARD</h4>
            <div className="descriptionProjectDetail elementCard">
                <p>Name : {data.character.name}</p>
                <p>FirstName : {data.character.firstName}</p>
            </div>

            <h4 className="title4">DESCRIPTION</h4>
            <div className="descriptionProjectDetail elementCard">
                <p>Gender : {data.character.gender}</p>
                <p>Size : {data.character.size}</p>
                <p>Corpulence : {data.character.corpulence}</p>
            </div>

            <h4 className="title4">LIVING PLACE</h4>
            <div className="descriptionProjectDetail elementCard">
                <p>{data.character.livingPlace}</p>
            </div>

            <h4 className="title4">BIRTH</h4>
            <div className="descriptionProjectDetail elementCard">
                <p>{data.character.birthPlace}</p>
                <p>{this.formatDate.format(Date.parse(data.character.birthDate))}</p>
            </div>
            <Collapsible trigger={<Trigger/>}>
                <p>{data.character.past}</p>
            </Collapsible>

            <h4 className="title4">FAMILY</h4>
            <div className="descriptionProjectDetail elementCard">
                <p>{data.character.familyMembers}</p>
            </div>
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
