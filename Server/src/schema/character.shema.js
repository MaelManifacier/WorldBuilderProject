const { gql } = require('apollo-server');

export const typeDef = gql`
    type Character {
        _id : ID!
        name : String
        firstName : String
        birthDate : Date
        birthPlace : String
        livingPlace : String
        gender : String
        size : int
        corpulence : String
        traits : [String]
        faults : [String]
        activities : [String]
        characteristics : [String]
        past : String
        aims : [String]
        family : [FamilyMember]
    }
`;

module.exports = typeDefs;