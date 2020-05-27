const { gql } = require('apollo-server');

export const typeDef = gql`
    type FamilyMember {
        _id : ID!
        person : [Character]
        role : String
    }
`;

module.exports = typeDefs;