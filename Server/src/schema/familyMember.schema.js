import { FamilyMember } from '../models/FamilyMember'

export const typeDef = `
    type FamilyMember {
        _id : ID!
        person : [Character]
        role : String
    }

    input FamilyMemberInput {
        person: CharacterInput
        role: String
    }

    extend type Query {
        familyMemberSchemaAssert: String
        familyMembers: [FamilyMember]
        familyMember(_id: ID!): FamilyMember
    }

    extend type Mutation {
        createFamilyMember(person: CharacterInput!, role: String!): Boolean
        createFamilyMemberWithInput(input: FamilyMemberInput!): FamilyMember
        deleteFamilyMember(_id: ID!): Boolean
        updateFamilyMember(_id: ID!, person: CharacterInput!, role: String!): FamilyMember
    }
`

export const resolvers = {
    Query: {
        familyMemberSchemaAssert: async () => {
          return "FamilyMember schema";
        },
        familyMembers: async () => {
          var familyMembers = await Step.find().populate('familyMembers')
          console.log(familyMembers)
          return familyMembers;
        },
        familyMember: async (root, { _id }, context, info) => {
          return await FamilyMember.findOne({_id}).populate('familyMembers')
        },
      },
      Mutation: {
        createFamilyMember: async (root, args, context, info) => {
          await FamilyMember.create(args);
          return FamilyMember.description;
        },
        createFamilyMemberWithInput: async (root, { input }, context, info) => {
          return FamilyMember.create(input);
        },
        deleteFamilyMember: async (root, { _id }, context, info) => {
          return FamilyMember.remove({ _id });
        },
        updateFamilyMember: async (root, { _id, input }) => {
          return FamilyMember.findByIdAndUpdate(_id, input, { new: true });
        },
    },
};
