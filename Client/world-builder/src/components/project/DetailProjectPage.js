import React, { Component } from 'react'
import NavbarComponent from '../navigation/Navbar'
import { Link } from 'react-router-dom'
import IosArrowBack from 'react-ionicons/lib/IosArrowBack'
import IosAdd from 'react-ionicons/lib/IosAdd'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const GET_PROJECT = gql `
  query getProject ($id: ID!) {
    project(_id: $id) {
        _id
      name
      description
      characters {
        name
      }
      userID
    }
}
`

const GET_CHARACTERS = gql `
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

const GET_SCENARIOS = gql `
    query getScenariosForProject($id: ID!) {
        projectScenarios(_id: $id) {
        _id
        description
        projectID
        }
  }
`


class DetailProjectPageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.location.state.id,
        }
        this.getProject = this.getProject.bind(this);
        this.getCharacters = this.getCharacters.bind(this);
        this.getScenarios = this.getScenarios.bind(this);
    }

    getCharacters(){
        const { loading, error, data } = useQuery(GET_CHARACTERS, {
            variables: { id : this.state.id }
        })
        if (loading) return <div>
            Loading
        </div>
        if (error) return `ERROR : ${error.message}`

        return <div className="charactersCard elementCard">
            { data.projectCharacters.map ((character, number) => 
                <div key={number.toString()}>
                    <Link className="linkToProject" to={{
                                pathname: `/detailCharacter/${character._id}`,
                                state: { id: character._id }
                                }}>
                        <div className="characterCardRow">
                            <p>
                                {character.name}
                                &nbsp;
                                {character.firstname}
                            </p>
                            <p>{character.gender}</p>
                        </div>
                    </Link>
                    <hr className="line"/>
                </div>
            )}
        </div>
    }

    getScenarios() {
        const { loading, error, data } = useQuery(GET_SCENARIOS, {
            variables: { id : this.state.id }
        })
        if (loading) return <div>
            Loading
        </div>
        if (error) return `ERROR : ${error.message}`

        console.log(data)

        return <div className="scenariosCard elementCard">
            { data.projectScenarios.map ((project, number) => 
                <div key={number.toString()}>
                    <p>{project.description}</p>
                    <hr className="line"/>
                </div>
            )}
        </div>
    }

    getProject(){
        const { loading, error, data } = useQuery(GET_PROJECT, {
            variables: { id : this.state.id }
        })
        if (loading) return <div>
            Loading
        </div>
        if (error) return `ERROR : ${error.message}`
    
        return <div>
            <div className="containerProjectDetail contenu">
                <div className="containerTitreProjectDetail">
                    <Link className="linkAdd" to="/projects">
                        <IosArrowBack className="btnMenu" color="#E30549" fontSize="30px"></IosArrowBack>
                    </Link>
                    <p className="titleProjectDetail">{data.project.name}</p>

                    <div className="btnAddProject dropdown">
                        
                        <IosAdd className="btnMenu" color="#E30549" fontSize="42px"></IosAdd>
                        <div className="dropdown-content">
                            <Link className="linkToAddCharacter" to={{
                                pathname: `/character/add/${data.project._id}`,
                                state: { id: data.project._id }
                                }}>Add character</Link>
                            <Link className="linkToAddScenario" to={{
                            pathname: `/scenario/add/${data.project._id}`,
                            state: { id: data.project._id }
                            }}>Add scenario</Link>
                        </div>
                        
                    </div>

                </div>
            </div>

            <h4 className="title4">DESCRIPTION</h4>
            <div className="descriptionProjectDetail elementCard">
                <p>{data.project.description}</p>
            </div>
            <h4 className="title4">CHARACTERS</h4>
            <this.getCharacters></this.getCharacters>

            <h4 className="title4">SCENARIOS</h4>
            <this.getScenarios></this.getScenarios>
        </div>
    }

    render() {
        return <div>
            <NavbarComponent></NavbarComponent>
            <this.getProject></this.getProject>
        </div>
    }
}

export default DetailProjectPageComponent
