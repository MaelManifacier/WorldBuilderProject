const { gql } = require('apollo-server');

export const typeDef = gql`
    type Scenario {
        _id : ID!
        steps : [Step]
    }
`;

module.exports = typeDefs;