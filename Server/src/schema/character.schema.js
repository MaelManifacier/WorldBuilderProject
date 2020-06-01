import {Character} from "../models/Character";
//Required for dummy data
const dummy = require('mongoose-dummy');
const ignoredFields = ['_id','created_at', '__v', /detail.*_info/];

/* OLD
type Task {
  name: String
  description: String
  duration: String
  Status: Int
}

input TaskInput{
  name: String
  description: String
  duration: String
  Status: Int
}

*/


export const typeDef = `
scalar Date

type Character {
    _id : ID!
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
    aims : [String]
    family : [FamilyMember]
  }

  input CharacterInput {
    name: String
    firstName: String
  }

  extend type Query {
    characterSchemaAssert: String
    characters: [Character]
    character(_id: ID!): Character
  }

  extend type Mutation {
    createCharacter(name: String!,firstName: String!): Boolean
    createCharacterWithInput(input: CharacterInput!): Character
    deleteCharacter(_id: ID!): Boolean
    updateCharacter(_id: ID!,input: CharacterInput!): Character
  }

`;

export const resolvers = {
  Query: {
    characterSchemaAssert: async () => {
      return "Character schema";
    },
    characters: async () => {
      let characters = [];
      for (let index = 0; index < 5; index++) {
        characters.push(dummy(Character, {
          ignore: ignoredFields,
          returnDate: true
        }))
      } 
      return characters;
    },
    character: async (root, { _id }, context, info) => {
      return dummy(Character, {
        ignore: ignoredFields,
        returnDate: true
      })
    },
  },
  Mutation: {
    createCharacter: async (root, args, context, info) => {
      await Character.create(args);
      return Character.name;
    },
    createCharacterWithInput: async (root, { input }, context, info) => {
      //input.password = await bcrypt.hash(input.password, 10);
      return Character.create(input);
    },
    deleteCharacter: async (root, { _id }, context, info) => {
      return Character.remove({ _id });
    },
    updateCharacter: async (root, { _id, input }) => {
      return Character.findByIdAndUpdate(_id, input, { new: true });
    }
  },
};
