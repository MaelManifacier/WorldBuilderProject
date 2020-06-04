// liste des projets d'un utilisateur connecté

import React, { Component } from 'react'

// pour faire des requêtes à la base :
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

// vérif pour voir si la co au serveur fonctionne (utiliser projectSchemaAssert)
const GET_GRAPHQL_INFO = gql `
    {
        projectSchemaAssert
    }
`

// graphql hook (hook = reusable stateful logic function - blocks que l'on va pouvoir appeler comme fonctions)
// ici fonction pour vérifier la configuration et afficher une erreur si elle n'est pas fonctionnelle
// peut être appelé comme un composant dans le jsx : <CheckConfig />
function CheckConfig() {
    const { loading, error, data, networkStatus } = useQuery(GET_GRAPHQL_INFO)
    if (loading) return <span className="status-warning">Chargement en cours</span>
    if (error) return <span className="status-error">ERROR</span>
    return <span className="status-ok">OK</span>
}

class ProjectsHomePageComponent extends Component {
    render() {
        return <div>
            Cette page contiendra la liste des projets d'un utilisateur connecté
            <p>Test de connexion : </p>
            <CheckConfig></CheckConfig>
        </div>
    }
}

export default ProjectsHomePageComponent