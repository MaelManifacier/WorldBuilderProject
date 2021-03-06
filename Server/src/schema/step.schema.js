import { Step } from '../models/Step'

export const typeDef = `
    type Step {
        _id : ID!
        type : String
        description : String
        scenarioID : ID!
    }

    input StepInput {
        type: String
        description: String
        scenarioID : ID
    }

    extend type Query {
        stepSchemaAssert: String
        steps: [Step]
        step(_id: ID!): Step
    }

    extend type Mutation {
        createStep(type: String!, description: String!, scenarioID : ID!): Step
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
          try {
            let response = await Step.create(args);
            return response;
          } catch(e) {
            return e.message;
          }
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
