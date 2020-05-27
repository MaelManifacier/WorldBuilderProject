const { gql } = require('apollo-server');

export const typeDef = gql`
    type Step {
        _id : ID!
        type : String
        description : String
    }
`;

module.exports = typeDefs;