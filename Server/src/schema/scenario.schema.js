import { Scenario } from '../models/Scenario'

export const typeDef = `
    type Scenario {
        _id : ID!
        description : String
        steps : [Step] # états
    }

    input ScenarioInput {
        description: String
    }

    extend type Query {
        scenarioSchemaAssert: String
        scenarios: [Scenario]
        scenario(_id: ID!): Scenario
    }

    extend type Mutation {
        createScenario(description: String!): Boolean
        createScenarioWithInput(input: ScenarioInput!): Scenario
        deleteScenario(_id: ID!): Boolean
        updateScenario(_id: ID!, description: String!): Scenario
        addStepToScenario(_id: ID!, step: StepInput!): Boolean
    }
`

export const resolvers = {
    Query: {
        scenarioSchemaAssert: async () => {
          return "Scenario schema";
        },
        scenarios: async () => {
          var scenarios = await Scenario.find().populate('scenarios')
          console.log(scenarios)
          return scenarios;
        },
        scenario: async (root, { _id }, context, info) => {
          return await Scenario.findOne({_id}).populate('scenarios')
        },
      },
      Mutation: {
        createScenario: async (root, args, context, info) => {
          await Scenario.create(args);
          return Scenario.description;
        },
        createScenarioWithInput: async (root, { input }, context, info) => {
          return Scenario.create(input);
        },
        deleteScenario: async (root, { _id }, context, info) => {
          return Scenario.remove({ _id });
        },
        updateScenario: async (root, { _id, input }) => {
          return Scenario.findByIdAndUpdate(_id, input, { new: true });
        },
        addStepToScenario: async (root, { _id, input }) => {
          var step = await Step.create(input);
          var scenario = await Scenario.findByIdAndUpdate(_id,{
            $push: {
              step: step
            }
          })
          console.log(step)
          console.log(scenario)
          scenario.save();
          return true;
        },
    },
};
