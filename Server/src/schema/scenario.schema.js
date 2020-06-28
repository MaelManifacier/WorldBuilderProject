import { Scenario } from '../models/Scenario'

export const typeDef = `
    type Scenario {
        _id : ID!
        title : String
        description : String
        steps : [Step] # états
        projectID : ID
    }

    input ScenarioInput {
        title : String
        description: String
        projectID : ID
    }

    extend type Query {
        scenarioSchemaAssert: String
        scenarios: [Scenario]
        scenario(_id: ID!): Scenario
    }

    extend type Mutation {
        createScenario(title: String, description: String!, projectID : ID!): Scenario
        createScenarioWithInput(input: ScenarioInput!): Scenario
        deleteScenario(_id: ID!): Scenario
        updateScenario(_id: ID!, title: String, description: String!): Scenario
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
          //return Scenario.description;
          try {
            let response = await Scenario.create(args);
            return response;
          } catch(e) {
            return e.message;
          }
        },
        createScenarioWithInput: async (root, { input }, context, info) => {
          return Scenario.create(input);
        },
        deleteScenario: async (root, { _id }, context, info) => {
          //return Scenario.remove({ _id });
          return await Scenario.findByIdAndRemove({ _id });
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
