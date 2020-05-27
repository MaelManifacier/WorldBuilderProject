const { gql } = require('apollo-server');

export const typeDef = gql`
    type User {
        _id: ID!
        pseudo: String
        mail: String
        mdp: String
    }
`;

module.exports = typeDefs;