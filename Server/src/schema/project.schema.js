import {Project} from "../models/Project";
import {Character} from "../models/Character";
import {Scenario} from "../models/Scenario";
//Mock les data
//const dummy = require('mongoose-dummy');
//const ignoredFields = ['_id','created_at', '__v', /detail.*_info/];

/* OLD
type Project {
    _id: ID!
    name: String
    description: String
    tasks: [Task]
}
*/

export const typeDef = `
  type Project {
    _id : ID!
    name : String
    description : String
    characters : [Character]
    scenarii : [Scenario]
    userID : ID
  }

  # à l'ajout, juste un projet "vide" -> juste nom et description
  input ProjectInput{
    name: String
    description: String
    userID: ID
  }

  extend type Query {
    projectSchemaAssert: String
    projects: [Project]
    project(_id: ID!): Project
    projectCharacters(_id: ID!): [Character]
    projectScenarios(_id: ID!): [Scenario]
  }

  extend type Mutation {
    createProject(name: String!,description: String!, userID: ID): Project
    createProjectWithInput(input: ProjectInput!): Project
    deleteProject(_id: ID!): Project
    updateProject(_id: ID!,input: ProjectInput!): Project
    addCharacterToProject(_id: ID!, input: CharacterInput!): Boolean
  }
`;

export const resolvers = {
  Query: {
    projectSchemaAssert: async () => {
      return "Project schema";
    },
    projects: async () => {
      /* Avec des 'dummy datas' :
      let projects = [];
      for (let index = 0; index < 5; index++) {
        projects.push(dummy(Project, {
          ignore: ignoredFields,
          returnDate: true
        }))
      } */
      var projects = await Project.find().populate('characters')
      //console.log(projects)
      return projects;
    },
    project: async (root, { _id }, context, info) => {
      /*return dummy(Project, {
        ignore: ignoredFields,
        returnDate: true
      })*/
      return await Project.findOne({_id}).populate('characters')
    },
    projectCharacters : async(root, { _id }, context, info) => {
      const characters = await Character.find({ projectID: _id }).exec();
      return characters;
    },
    projectScenarios : async(root, { _id }, context, info) => {
      const scenarios = await Scenario.find({ projectID: _id }).exec();
      return scenarios;
    },
  },
  Mutation: {
    createProject: async (root, args, context, info) => {
      try {
        let response = await Project.create(args);
        return response;
      } catch(e) {
        return e.message;
      }
    },
    createProjectWithInput: async (root, { input }, context, info) => {
      return Project.create(input);
    },
    deleteProject: async (root, { _id }, context, info) => {
      return await Project.findByIdAndRemove({_id});
    },
    updateProject: async (root, { _id, input }) => {
      return Project.findByIdAndUpdate(_id, input, { new: true });
    },
    addCharacterToProject: async (root, { _id, input }) => {
      var character = await Character.create(input);
      var project = await Project.findByIdAndUpdate(_id,{
        $push: {
          characters: character
        }
      })
      console.log(character)
      console.log(project)
      project.save();
      return true;
    },
  },
};
