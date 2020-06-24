// liste des projets d'un utilisateur connecté
import React, { Component } from 'react';
// pour faire des requêtes à la base :
import { useQuery } from '@apollo/react-hooks';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import NavbarComponent from '../navigation/Navbar';
import { Link } from 'react-router-dom'
import IosAdd from 'react-ionicons/lib/IosAdd'
import './project.css';


const DELETE_PROJECT = gql `
    mutation delete($id: ID!) {
        deleteProject(_id: $id)
    }
`


const GET_PROJECTS = gql `
{
    projects {
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

// vérif pour voir si la co au serveur fonctionne (utiliser projectSchemaAssert)
/*
const GET_GRAPHQL_INFO = gql `
    {
        projectSchemaAssert
    }
`*/

// graphql hook (hook = reusable stateful logic function - blocks que l'on va pouvoir appeler comme fonctions)
// ici fonction pour vérifier la configuration et afficher une erreur si elle n'est pas fonctionnelle
// peut être appelé comme un composant dans le jsx : <CheckConfig />
/*
function CheckConfig() {
    const { loading, error, data, networkStatus } = useQuery(GET_GRAPHQL_INFO)
    if (loading) return <span className="status-warning">Chargement en cours</span>
    if (error) return <span className="status-error">ERROR</span>
    return <span className="status-ok">OK</span>
}*/

function DeleteProject(project) {
    console.log(project._id)
    const [{ loading, error }] = useMutation(DELETE_PROJECT);

    if (loading) return <div>
            Loading
        </div>

    if (error) return `ERROR : ${error.message}`
    return null
}

function ProjectList() {
    const { loading, error, data } = useQuery(GET_PROJECTS)

    if (loading) return <div>
        Loading
    </div>

    if (error) return `ERROR : ${error.message}`

    //sinon création de la liste
    return (
        <ul className="projectsListDiv">
            { data.projects.map (project => 
            <li className="projectCard">
                    <div className="row1ProjectCard">
                        <div className="titleProjectCard">
                            <Link className="linkToProject" to={{
                                pathname: `/project/${project._id}`,
                                state: { id: project._id }
                                }}>
                                <p>{project.name}</p>
                            </Link>
                            <div onClick={() => DeleteProject({project})}>
                                delete
                            </div>
                        </div>
                        <div className="line"></div>
                    </div>
                
                <div className="descProjectCard">
                    {truncate(project.description)}
                </div>
                <div className="characterNumber">
                    <p className="characters">CHARACTERS</p>
                    <p className="charactersNumber">{project.characters.length}</p>
                </div>
            </li>
            )}
        </ul>
    )
}

function truncate(str) {
    if (str.length > 100) {
        return str.substring(0, 100) + "...";
    } else {
        return str;
    }
}

class ProjectsHomePageComponent extends Component {
    render() {
        return <div>
            <NavbarComponent></NavbarComponent>
            <div className="contenuProjectsHomePage">
                <div className="titleLine">
                    <div className="title">
                        YOUR PROJECTS
                    </div>
                    <div className="btnAddProject">
                        <Link to="/addProject">
                            {/* IosAddCircle */}
                            <IosAdd className="btnMenu" color="#E30549" fontSize="42px"></IosAdd>
                        </Link>
                    </div>
                </div>
                
                {/*<p>Test de connexion à mongoDB : </p>
                <CheckConfig></CheckConfig>*/}
                <div className="projectsDiv">
                    {/* liste des projets */}
                    <ProjectList></ProjectList>
                </div>
            </div>
        </div>
    }
}

/*
https://www.alsacreations.com/article/lire/1209-display-inline-block.html

*/

export default ProjectsHomePageComponent