import { Step } from '../models/Step'

export const typeDef = `
    type Step {
        _id : ID!
        type : String
        description : String
    }

    input StepInput {
        type: String
        description: String
    }

    extend type Query {
        stepSchemaAssert: String
        steps: [Step]
        step(_id: ID!): Step
    }

    extend type Mutation {
        createStep(type: String!, description: String!): Boolean
        createStepWithInput(input: StepInput!): Step
        deleteStep(_id: ID!): Boolean
        updateStep(_id: ID!, type: String!, description: String!): Step
    }
`

export const resolvers = {
    Query: {
        stepSchemaAssert: async () => {
          return "Step schema";
        },
        steps: async () => {
          var steps = await Step.find().populate('steps')
          console.log(steps)
          return steps;
        },
        step: async (root, { _id }, context, info) => {
          return await Step.findOne({_id}).populate('steps')
        },
      },
      Mutation: {
        createStep: async (root, args, context, info) => {
          await Step.create(args);
          return Step.description;
        },
        createStepWithInput: async (root, { input }, context, info) => {
          return Step.create(input);
        },
        deleteStep: async (root, { _id }, context, info) => {
          return Step.remove({ _id });
        },
        updateStep: async (root, { _id, input }) => {
          return Step.findByIdAndUpdate(_id, input, { new: true });
        },
    },
};
