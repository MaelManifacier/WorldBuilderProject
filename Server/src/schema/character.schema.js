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
    projectID : ID
  }

  input CharacterInput {
    _id: ID
    name: String
    firstName: String
    birthDate : Date
    birthPlace : String
    livingPlace : String
    gender : String
    size : Int
    corpulence : String
    past : String
    projectID : ID
  }

  extend type Query {
    characterSchemaAssert: String
    characters: [Character]
    character(_id: ID!): Character
  }

  extend type Mutation {
    createCharacter(name: String!,firstName: String!, birthDate: Date, birthPlace: String, livingPlace:String, gender:String, size:Int, corpulence:String, past:String, projectID : ID!): Character
    createCharacterWithInput(input: CharacterInput!): Character
    deleteCharacter(_id: ID!): Character
    updateCharacterWithInput(input: CharacterInput!): Character
    updateCharacter(_id: ID!, name: String, firstName: String, birthDate: Date, birthPlace: String, livingPlace:String, gender:String, size:Int, corpulence:String, past:String, projectID : ID): Character
  }

`;

export const resolvers = {
  Query: {
    characterSchemaAssert: async () => {
      return "Character schema";
    },
    characters: async () => {
      /*let characters = [];
      for (let index = 0; index < 5; index++) {
        characters.push(dummy(Character, {
          ignore: ignoredFields,
          returnDate: true
        }))
      } 
      return characters;*/
      return await Character.find().populate('family')
    },
    character: async (root, { _id }, context, info) => {
      /*return dummy(Character, {
        ignore: ignoredFields,
        returnDate: true
      })*/
      return await Character.findOne({_id}).populate('family')
    },
  },
  Mutation: {
    createCharacter: async (root, args, context, info) => {
      try {
        let response = await Character.create(args);
        return response;
      } catch(e) {
        return e.message;
      }
    },
    createCharacterWithInput: async (root, { input }, context, info) => {
      return Character.create(input);
    },
    deleteCharacter: async (root, { _id }, context, info) => {
      //return Character.remove({ _id });
      return await Character.findByIdAndRemove({_id});
    },
    updateCharacterWithInput: async (root, { input }) => {
      return Character.findByIdAndUpdate(input._id, input, { new: true });
    },
    updateCharacter: async (root, { _id, name, firstName, birthDate, birthPlace, livingPlace, gender, size, corpulence, past, projectID }) => {
      return Character.findByIdAndUpdate(_id, {name, firstName, birthDate, birthPlace, livingPlace, gender, size, corpulence, past, projectID}, { new: true });
    }
  },
};
