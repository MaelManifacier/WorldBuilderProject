import { makeExecutableSchema } from 'graphql-tools';
import { gql } from 'apollo-server'

const typeDefs = gql`
    scalar Date

    type User {
        pseudo : String
        mail : String
        mdp : String
    }

    type Project {
        characters : [Character]
        scenarii : [Scenario]
    }

    type Character {
        id: ID!
        name : String
        firstName : String
        birthDate : Date
        birthPlace : String
        livingPlace : String
        gender : String
        size : Int
        corpulence : String
        traits : [String] # personnalité
        faults : [String] # défauts
        activities : [String]
        characteristics : [String]
        past : String
        goals : String # ou aims
        Family : [FamilyMember]
    }

    type FamilyMember {
        person : [Character]
        role : String
    }

    type Scenario {
        id: ID!
        description: String
        etats : [Etat]
    }

    type Etat {
        type: String
        description: String
    }

    type Query {
        me: User

        projects: [Project]
        
        characters: [Character]
        character(id: ID!): Character
    }

    type Mutation {
        login(pseudo: String, mdp: String): String # token

        addProjects: ProjectResponse!
        addCharacter(projectID: ID!) : CharacterResponse!
        deleteCharacter(characterID: ID!) : CharacterResponse!
        modifyCharacter(characterID: ID!) : CharacterResponse!
    }

    type ProjectResponse {
        success: Boolean!
        message: String
        project: Project
    }

    type CharacterResponse {
        success: Boolean!
        message: String
        character: Character
    }
`;

/*
const resolvers = {};

import {
    typeDef as User,
} from './schema/user.schema';

import {
    typeDef as Character,
} from './schema/character.shema';

import {
    typeDef as FamilyMember,
} from './schema/familyMember.schema';

import {
    typeDef as Project,
} from './schema/project.schema';

import {
    typeDef as Scenario,
} from './schema/scenario.schema';

import {
    typeDef as Step,
} from './schema/step.schema';

/*export const schema = makeExecutableSchema({
    typeDefs : [Query, User, Character, FamilyMember, Project, Scenario, Step],
    
})*/

module.exports = typeDefs