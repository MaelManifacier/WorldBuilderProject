const { gql } = require('apollo-server');

export const typeDef = gql`
    type Project {
        _id : ID!
        charactersList : [Character]
    }
`;

module.exports = typeDefs;