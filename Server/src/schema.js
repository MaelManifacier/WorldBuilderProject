import { gql } from 'apollo-server'

const typeDefs = gql`
    type User {
        pseudo : String
        mail : String
        mdp : String
    }

    type Projet {
        charactersList : [Personnage]
    }

    type Personnage {
        id: ID!
        name : String
        firstName : String
        size : int
        corpulence : String
        traits : [String] # personnalité
        activities : [String]
        past : String
        goals : String # ou aims
        Family : [FamilyMember]
    }

    type FamilyMember {
        person : [Personnage]
        role : String
    }
`;

module.exports = typeDefs