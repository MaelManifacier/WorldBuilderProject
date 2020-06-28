// liste des projets d'un utilisateur connecté
import React, { Component } from 'react';
// pour faire des requêtes à la base :
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import NavbarComponent from '../navigation/Navbar';
import { Link } from 'react-router-dom'
import IosAdd from 'react-ionicons/lib/IosAdd'
import './project.scss';

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

/*
function DeleteProject(projectID) {
    console.log(projectID)
    const [deleteProject, { loading, error }] = useMutation(DELETE_PROJECT);
    //deleteProject({ variables: { projectID: projectID } });

    if (loading) return <div>
            Loading
        </div>

    if (error) return `ERROR : ${error.message}`
    
    return <div>
        <div onClick={ e=> {
              e.preventDefault();
              deleteProject({variables: {projectID: projectID} });
              console.log(deleteProject)
              projectID = projectID;
            }}>
            delete
        </div>
    </div>
}*/

function ProjectList() {
    const { loading, error, data } = useQuery(GET_PROJECTS)

    if (loading) return <div>
        Loading
    </div>

    if (error) return `ERROR : ${error.message}`
    // <span className="status-error">ERROR</span>

    //sinon création de la liste
    return (
        <ul className="projectsListDiv">
            { data.projects.map ((project, number) => 
            <li key={number.toString()} className="projectCard elementCard">
                    <div className="row1ProjectCard">
                        <div className="titleProjectCard">
                            <Link className="linkToProject" to={{
                                pathname: `/project/${project._id}`,
                                state: { id: project._id }
                                }}>
                                <p>{project.name}</p>
                            </Link>
                            {/*<div onClick={() => DeleteProject(project._id)}>
                                delete
                            </div>*/}
                            <div>
                                <Link className="linkToProject" to={{
                                    pathname: `/project/delete/${project._id}`,
                                    state: { id: project._id }
                                    }}>
                                    <p>delete</p>
                                </Link>
                            </div>
                        </div>
                        <div className="line"></div>
                    </div>
                
                <div className="descProjectCard">
                    {truncate(project.description)}
                </div>
                {/*
                <div className="characterNumber">
                    <p className="characters">CHARACTERS</p>
                    <p className="charactersNumber">{project.characters.length}</p>
                </div> 
                */}
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
            <div className="contenuProjectsHomePage contenu">
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